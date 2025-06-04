export default defineNuxtRouteMiddleware((_to, _from) => {
  const toast = useToast()
  const { user, loggedIn } = useUserSession()
  if (!loggedIn.value) {
    toast.add({
      title: 'You must be logged in to access this page',
      color: 'error',
    })
    return navigateTo('/auth/login')
  }
  if (!user.value?.superAdmin) {
    toast.add({
      title: 'You are not authorized to access this page',
      color: 'error',
    })
    return navigateTo('/dashboard')
  }
})
