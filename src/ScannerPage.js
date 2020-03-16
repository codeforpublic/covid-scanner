import QrReader from 'react-qr-reader'
import React, { useMemo, useState } from 'react'

import { decodeJWT } from './utils/jwt'
import { Result } from './Result'

const ScannerPage = () => {
  const [qrData, setQrData] = useState(null)
  const [error, setError] = useState({})

  const decoded = useMemo(() => {
    if (qrData) {
      const result = decodeJWT(qrData)
      console.log(result)
      const { error } = result
      if (!error && result.color !== undefined) {
        return result
      }
      setError({
        title: error || 'ข้อมูลไม่ถูกต้อง'
      })
      setTimeout(() => {
        setError({})
      }, 4000)
      return null
    }
    return null
  }, [qrData])
  return (
    <div className="container mx-auto relative p-4 mt-20">
      <div className="mb-4">
        <h1 className="font-semibold text-4xl">สแกน QR CODE</h1>
        <p className="font-light text-sm" style={{ color: '#F1F5FA' }}>
          สแกน QR Code เพื่อดูความเสี่ยง COVID-19
        </p>
      </div>
      <QrReader
        delay={300}
        style={{ width: '100%' }}
        onScan={data => {
          if (data) setQrData(data)
        }}
      />
      {error.title && (
        <div
          className={`animated fadeOut text-center p-4 text-xl`}
          style={{
            animationDuration: '200ms',
            animationDelay: '3s'
          }}
        >
          {error.title}
        </div>
      )}

      <div className={`${qrData ? 'block' : 'hidden'}`}>
        <Result result={decoded} onRescan={() => setQrData(null)} />
      </div>
    </div>
  )
}

export default ScannerPage
