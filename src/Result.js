import { useMemo, useState, useEffect, useCallback } from 'react'
import { decodeJWT } from './utils/jwt'

export const Result = ({ result, onRescan }) => {
  const [closing, setClosing] = useState(false)

  const decoded = useMemo(() => {
    if (result) return decodeJWT(result)
    return null
  }, [result])
  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      onRescan()
      setClosing(false)
    }, 200)
  }, [setClosing, onRescan])
  console.log('decoded -> decoded', decoded)
  if (!decoded) return null
  return (
    <div
      className={`animated ${
        closing ? 'fadeOutDownBig' : 'fadeInUpBig'
      } fixed w-full h-full left-0 top-0 z-10 overflow-auto p-16`}
      style={{
        animationDuration: '200ms',
        backgroundColor: '#303342',
        boxShadow: '0px 0px 5px rgba(0,0,0,0.3)'
      }}
    >
      {JSON.stringify(decoded)}
      <button onClick={handleClose}>สแกนใหม่</button>
    </div>
  )
}
