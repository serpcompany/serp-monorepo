import { sendEmail } from '@serp/utils/server';
import { render } from '@vue-email/render';
import LoginNotification from '../../../emails/login-notification.vue';

export default defineEventHandler(async (event) => {
  // Get user data from the request body
  const { user } = await readBody(event);
  if (!user?.name || !user?.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required user information'
    });
  }

  // Get location information from Cloudflare headers if available
  const city = event.context.cf?.city;
  const country = event.context.cf?.country;

  // Only send email if we have location information
  try {
    const htmlTemplate = await render(LoginNotification, {
      userName: user.name,
      city,
      country
    });

    if (!process.env.MOCK_EMAIL) {
      await sendEmail({
        to: user.email,
        subject: 'Login from a new location',
        html: htmlTemplate
      });
    }
    return { success: true };
  } catch (error) {
    console.error('Failed to send login notification email:', error);
    // Don't throw error as this is not critical
    return { success: false };
  }
});
