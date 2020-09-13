import Cookies from 'js-cookie'
export const getSession = () => {
  const jwt = Cookies.get('__session')
  let session
  try {
    if (jwt) {
      const base64Url = jwt.split('.')[1]
      const base64 = base64Url.replace('-', '+').replace('_', '/')
      session = JSON.parse(window.atob(base64))
    }
  } catch (error) {
    console.log(error)
  }
  return session
}
export const logOut = () => {
  Cookies.remove('__session')
}
export const login=(username,password)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch('/v1/login',requestOptions).then((resp)=>resp.json()).then((data)=>{
        console.log(data)
        Cookies.set('__session',`${data.token}`)
        Cookies.set('__session2',`set`)
        console.log(Cookies.get("__session2")=="set")
        Cookies.set('__exp',data.expire)
    })
}