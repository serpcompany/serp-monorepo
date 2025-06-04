import { saveOneTimePassword } from '@serp/db/server/database/queries/auth'
import { findUserByPhoneNumber } from '@serp/db/server/database/queries/users'
import { phoneSchema } from '@serp/db/validations/auth'
import { validateBody } from '@serp/utils/server/utils/bodyValidation'
import { generateNumericCode } from '@serp/utils/server/utils/nanoid'
import { OneTimePasswordTypes } from '../../../../constants'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const data = await validateBody(event, phoneSchema)

  // Check if phone number is already in use by another user
  const existingUser = await findUserByPhoneNumber(data.phoneNumber)
  if (existingUser && existingUser.id !== user.id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'This phone number is already in use by another account',
    })
  }

  const oneTimePassword = generateNumericCode(6)

  await saveOneTimePassword({
    userId: user.id,
    identifier: data.phoneNumber,
    code: oneTimePassword,
    type: OneTimePasswordTypes.login,
    expiresAt: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes
  })
  try {
    await $fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          Body: `Your verification code for ${process.env.NUXT_PUBLIC_SITE_NAME} is: ${oneTimePassword}`,
          To: data.phoneNumber,
          From: process.env.TWILIO_PHONE_NUMBER,
        }).toString(),
      },
    )
  }
  catch (error) {
    console.log(error)
  }

  sendNoContent(event)
})
