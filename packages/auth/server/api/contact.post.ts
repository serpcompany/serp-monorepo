import { sendEmail } from '@serp/utils/server'
import { validateBody } from '@serp/utils/server/utils/bodyValidation'
import { render } from '@vue-email/render'
import { z } from 'zod'
import ContactForm from '../../emails/contact-form.vue'

const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(200, 'Subject must be less than 200 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),
})

export default defineEventHandler(async (event) => {
  try {
    // Validate request body
    const { name, email, subject, message } = await validateBody(
      event,
      contactSchema,
    )

    // Get runtime config for email destination
    const runtimeConfig = useRuntimeConfig()
    const contactEmail
      = process.env.CONTACT_EMAIL
        || runtimeConfig.public.contactEmail
        || 'contact@serp.co'

    // Render email template
    const htmlTemplate = await render(ContactForm, {
      name,
      email,
      subject,
      message,
    })

    // Send email (skip in mock mode)
    if (!process.env.MOCK_EMAIL) {
      await sendEmail({
        to: contactEmail,
        subject: `Contact Form: ${subject}`,
        html: htmlTemplate,
        replyTo: email, // Allow direct replies to the sender
      })
    }

    return {
      success: true,
      message:
        'Your message has been sent successfully. We\'ll get back to you soon!',
    }
  }
  catch (error) {
    console.error('Contact form submission error:', error)

    // Re-throw validation errors as-is (they're already properly formatted)
    if (error?.statusCode === 400) {
      throw error
    }

    // Handle other errors
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send message. Please try again later.',
    })
  }
})
