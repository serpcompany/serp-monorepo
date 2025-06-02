import {
  inviteTeamMember,
  isTeamMember,
} from '@serp/db/server/database/queries/teams'
import { findUserByEmail } from '@serp/db/server/database/queries/users'
import { inviteTeamMemberSchema } from '@serp/db/validations/team'
import {
  generateAlphaNumericCode,
  sendEmail,
  validateBody,
} from '@serp/utils/server'
import { render } from '@vue-email/render'
import TeamInvitation from '../../../../../emails/member-invite.vue'
import { validateTeamOwnership } from '../../../../utils/teamValidation'

export default defineEventHandler(async (event) => {
  // 1. Validate team ownership and get team details
  const teamId = getRouterParam(event, 'id')
  if (!teamId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Team ID is required',
    })
  }
  const { user, team } = await validateTeamOwnership(event, teamId)

  // 2. Validate request body
  const body = await validateBody(event, inviteTeamMemberSchema)

  // 3. Check if user already exists
  const existingUser = await findUserByEmail(body.email)
  if (existingUser && (await isTeamMember(teamId, existingUser.id))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'The user with this email is already a member of this team',
    })
  }

  // 4. Generate invitation token
  const inviteToken = generateAlphaNumericCode(32)

  // 5. Create team invitation
  const invitation = await inviteTeamMember({
    teamId: team.id,
    email: body.email,
    role: body.role || 'member',
    token: inviteToken,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
  })

  // 6. Send invitation email
  const htmlTemplate = await render(TeamInvitation, {
    organizationName: team.name,
    inviterName: user.name,
    inviteLink: `${process.env.NUXT_PUBLIC_URL}/api/teams/verify-invite?token=${inviteToken}`,
  })

  if (process.env.MOCK_EMAIL) {
    console.table({
      email: body.email,
      teamName: team.name,
      inviterName: user.name,
      inviteLink: `${process.env.NUXT_PUBLIC_URL}/api/teams/verify-invite?token=${inviteToken}`,
    })
  }
  else {
    await sendEmail({
      to: body.email,
      subject: `Invitation to join ${team.name} on ${process.env.NUXT_PUBLIC_SITE_NAME}`,
      html: htmlTemplate,
    })
  }

  setResponseStatus(event, 201)
  return invitation
})
