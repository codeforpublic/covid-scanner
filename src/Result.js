import { useMemo } from 'react'
import { decodeJWT } from './utils/jwt'

export const Result = ({ result, onRescan }) => {
  const decoded = useMemo(() => {
    decodeJWT(result)
  }, [result])
  console.log('decoded -> decoded', decoded)
  return (
    <div>
      {result.toString()}
      <button onClick={onRescan}>สแกนใหม่</button>
    </div>
  )
}
