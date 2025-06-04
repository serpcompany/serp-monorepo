import {
  getFeedbackById,
  updateFeedback,
} from '@serp/db/server/database/queries/admin'
import { sendEmail } from '@serp/utils/server'
import { render } from '@vue-email/render'
import FeedbackReply from '../../../../emails/feedback-reply.vue'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  if (!user.superAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You are not authorized to access this resource',
    })
  }
  const { id, message, email } = await readBody(event)
  const feedback = await getFeedbackById(id)
  if (!feedback) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Feedback not found',
    })
  }
  await updateFeedback(id, { reply: message, status: 'replied' })

  const htmlTemplate = await render(FeedbackReply, {
    userName: feedback.user.name,
    originalMessage: feedback.message,
    replyMessage: message,
  })

  if (process.env.MOCK_EMAIL) {
    console.table({
      email,
      name: feedback.user.name,
      originalMessage: feedback.message,
      replyMessage: message,
    })
  }
  else {
    await sendEmail({
      to: email,
      subject: 'Response to your feedback',
      html: htmlTemplate,
    })
  }

  sendNoContent(event)
})
