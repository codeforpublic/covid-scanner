import QrReader from 'react-qr-reader'
import React, { useState } from 'react'

import { Result } from './Result'

const ScannerPage = () => {
  const [qrData, setQrData] = useState(null)
  console.log(qrData)
  if (qrData) return <Result result={qrData} onRescan={() => setQrData(null)} />
  return (
    <div className="container mx-auto">
      <h1 className="font-semibold text-4xl">สแกน QR CODE</h1>
      <p className="font-light">สแกน QR Code เพื่อดูความเสี่ยง COVID-19</p>
      <QrReader
        delay={300}
        style={{ width: '100%' }}
        onScan={data => setQrData(data)}
      />
    </div>
  )
}

export default ScannerPage
