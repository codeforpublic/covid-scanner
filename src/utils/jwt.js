import jwtDecode from 'jwt-decode'

export const decodeJWT = token => {
  return jwtDecode(token, { header: true })
}
