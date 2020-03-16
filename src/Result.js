import { useMemo, useState, useCallback } from 'react'
import moment from 'moment-timezone'
import { decodeJWT } from './utils/jwt'

const MOCK = {
  color: 'red',
  label: 'เสี่ยงมาก'
}
const BG_COLOR = {
  red: '#F03636',
  green: '#2FC20B',
  orange: '#E37D04',
  yellow: '#F0DC26'
}
const LABEL = {
  red: 'เสี่ยงมาก',
  orange: 'เสี่ยง',
  yellow: 'เสี่ยงน้อย',
  green: 'เสี่ยงน้อยมาก'
}
const FONT_COLOR = {
  red: '#470505',
  green: '#124804',
  orange: '#484105',
  yellow: '#4B2901'
}
const GENDER = {
  M: 'ชาย',
  F: 'หญิง'
}

const Item = ({ label, value }) => (
  <div className="mr-10">
    <div className="font-light text-sm" style={{ color: '#A6A6A6' }}>
      {label}
    </div>
    <div className="font-semibold">{value}</div>
  </div>
)
const ListItem = ({ label, icon, secondLine }) => (
  <div className="flex">
    <div className="w-12 mr-6">icon</div>
    <div>
      <div className="font-semibold">{label}</div>
      <div className="font-light text-sm" style={{ color: '#A6A6A6' }}>
        {secondLine}
      </div>
    </div>
  </div>
)

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
  const createdAt = moment(decoded.iat * 1000).locale('th')
  return (
    <div
      className={`animated ${
        closing ? 'fadeOutDownBig' : 'fadeInUpBig'
      } fixed w-full h-full left-0 top-0 z-10 overflow-auto`}
      style={{
        animationDuration: '200ms',
        backgroundColor: '#303342',
        boxShadow: '0px 0px 5px rgba(0,0,0,0.3)'
      }}
    >
      <div
        style={{ backgroundColor: BG_COLOR[MOCK.color] }}
        className="h-3"
      ></div>
      <div className="container py-4">
        {/* {result.toString()} */}
        <div
          className="font-light text-lg px-6 pt-6"
          style={{ color: '#A6A6A6' }}
        >
          ระดับเสี่ยง
        </div>
        <div
          className="text-3xl px-16 rounded-lg py-2 text-center inline-block mb-6 mt-3 mx-4"
          style={{ backgroundColor: BG_COLOR[decoded.data.color] }}
        >
          <span
            style={{ color: FONT_COLOR[decoded.data.color] }}
            className="font-semibold"
          >
            {LABEL[decoded.data.color]}
          </span>
        </div>
        <hr />
        <div className="flex py-10 mx-6">
          <Item label="อายุ" value={decoded.data.age} />
          <Item label="เพศ" value={GENDER[decoded.data.gender]} />
          <Item
            label="สร้างเมื่อ"
            value={`${createdAt.format('D MMM')} ${createdAt
              .add(543, 'year')
              .year()}`}
          />
        </div>
        <div className="flex py-10 mx-6">
          <ListItem label="มีประวัติเดินทาง" secondLine="ในประเทศกลุ่มเสี่ยง" />
        </div>
        <div className="fixed bottom-0">
          <button
            className="py-4 px-24 rounded-full font-semibold mx-auto"
            style={{ backgroundColor: '#666' }}
            onClick={handleClose}
          >
            สแกนใหม่
          </button>
        </div>
      </div>
    </div>
  )
}
