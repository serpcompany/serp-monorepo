export default defineNuxtRouteMiddleware((to, _from) => {
  // Read the invite-email cookie into state data for rendering in the login/register forms
  const inviteEmail = useState<string>('inviteEmail')
  const inviteEmailCookie = useCookie('invite-email')
  if (inviteEmailCookie.value) {
    inviteEmail.value = inviteEmailCookie.value
  }
  if (to.path === '/auth/register') {
    // Read the invite-token cookie into state data for registering with email verification bypass
    const inviteToken = useState<string>('inviteToken')
    const inviteTokenCookie = useCookie('invite-token')
    if (inviteTokenCookie.value) {
      inviteToken.value = inviteTokenCookie.value
    }
  }
})
