import QrReader from 'react-qr-reader'
import React, { useMemo, useState } from 'react'

import { decodeJWT, TEST_TOKEN } from './utils/jwt'
import { Result } from './Result'

const ScannerPage = () => {
  const [qrData, setQrData] = useState(null)
  const [error, setError] = useState({})

  const decoded = useMemo(() => {
    if (qrData) {
      const { error } = decodeJWT(qrData)
      if (!error) return decoded
      console.log(error)
      setError({
        title: error
      })

      setTimeout(() => {
        console.log('set error')
        setError({})
      }, 5000)
      return null
    }
    return null
  }, [qrData])

  console.log(qrData)
  return (
    <div className="container mx-auto relative  p-4 mt-20">
      <h1 className="font-semibold text-4xl">สแกน QR CODE</h1>
      <p className="font-light">สแกน QR Code เพื่อดูความเสี่ยง COVID-19</p>
      <div
        onClick={() => {
          setQrData(TEST_TOKEN)
        }}
      >
        CLICK
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
