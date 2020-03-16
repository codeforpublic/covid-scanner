import QrReader from 'react-qr-reader'
import React, { useState } from 'react'

import { Result } from './Result'
import { TEST_TOKEN } from './utils/jwt'

const ScannerPage = () => {
  const [qrData, setQrData] = useState(null)
  console.log(qrData)
  return (
    <div className="container mx-auto relative p-4 mt-20">
      <div className="mb-4">
        <h1 className="font-semibold text-4xl">สแกน QR CODE</h1>
        <p className="font-light text-sm" style={{ color: '#F1F5FA' }}>
          สแกน QR Code เพื่อดูความเสี่ยง COVID-19
        </p>
        <div
          onClick={() => {
            setQrData(TEST_TOKEN)
          }}
        >
          CLICK
        </div>
      </div>
      <QrReader
        delay={300}
        style={{ width: '100%' }}
        onScan={data => {
          if (data) setQrData(data)
        }}
      />

      <div className={`${qrData ? 'block' : 'hidden'}`}>
        <Result result={qrData} onRescan={() => setQrData(null)} />
      </div>
    </div>
  )
}

export default ScannerPage
