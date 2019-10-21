export default redirect_to

function redirect_to (router, step) {
  switch (step) {
    case 0 :
      router.push('/account')
      break
    case 1:
      router.push('/accept')
      break
    case 2:
      router.push('/confirm')
      break
    case 3:
      router.push('/setpwd')
      break
    case 4:
      console.log ("here we go")
      router.push('/dashboard')
      break
    case 11:
      router.push('/login')
      break
    default:
      router.push('/account')
      break
  }
}
