import type { SendEmailOptions } from '@serp/types'
import process from 'node:process'
import { useEmail } from 'use-email'

const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || 'mailgun'
const emailService = useEmail(EMAIL_PROVIDER)

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: SendEmailOptions): Promise<void> {
  try {
    const from = process.env.FROM_EMAIL

    if (!from) {
      throw new Error('Missing FROM_EMAIL environment variable')
    }
    await emailService.send({
      from,
      to,
      subject,
      text,
      html,
    })
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send email',
    })
  }
}
