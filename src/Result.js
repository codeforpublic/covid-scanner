import { useMemo, useState, useCallback } from 'react'
import { css } from '@emotion/core'
import moment from 'moment-timezone'
import { decodeJWT } from './utils/jwt'

import { ReactComponent as YesIcon } from './assets/yes.svg'
import { ReactComponent as NoIcon } from './assets/no.svg'

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
const CONDITION = {
  red: { symptom: true, environmentRisk: true },
  orange: { symptom: false, environmentRisk: true },
  yellow: { symptom: true, environmentRisk: false },
  green: { symptom: false, environmentRisk: false }
}
const CONDITION_LABEL = {
  symptom: {
    true: 'มีอาการ',
    false: 'ไม่มีอาการ'
  },
  environmentRisk: {
    true: 'ไปประเทศเสี่ยง หรือ ใกล้ชิดกลุ่มเสี่ยง',
    false: 'ไม่ได้ไปประเทศเสี่ยง และ ไม่ได้ใกล้ชิดกลุ่มเสี่ยง'
  }
}
const GENDER = {
  M: 'ชาย',
  F: 'หญิง'
}

const Item = ({ label, value, className }) => (
  <div className={className}>
    <div className="font-light text-sm" style={{ color: '#A6A6A6' }}>
      {label}
    </div>
    <div className="font-semibold">{value}</div>
  </div>
)
const ListItem = ({ label, checked, color }) => (
  <div className="flex mb-8 mr-2 items-start">
    <div
      className="w-12"
      css={css`
        svg {
          path {
            fill: ${color};
          }
        }
      `}
    >
      {checked ? <YesIcon /> : <NoIcon />}
    </div>
    <div className="flex-1 mt-1">
      <div className="font-semibold">{label}</div>
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
  const { iat, data = {} } = decoded
  const { color, age, gender } = data
  const createdAt = moment(iat * 1000).locale('th')
  const scanAt = moment().locale('th')
  const hasSymptom = CONDITION[color].symptom
  const hasEnvRisk = CONDITION[color].environmentRisk
  return (
    <div
      className={`animated ${
        closing ? 'slideOutDown' : 'fadeInUpBig'
      } fixed w-full h-full left-0 top-0 z-10 overflow-auto`}
      style={{
        animationDuration: '200ms',
        backgroundColor: '#303342',
        boxShadow: '0px 0px 5px rgba(0,0,0,0.3)'
      }}
    >
      <div style={{ backgroundColor: BG_COLOR[color] }} className="h-3"></div>
      <div className="container py-4">
        {/* {result.toString()} */}
        <div
          className="font-light text-lg px-8 pt-6"
          style={{ color: '#A6A6A6' }}
        >
          ระดับเสี่ยง
        </div>
        <div
          className="text-3xl px-12 rounded-lg py-2 text-center inline-block mb-6 mt-3 mx-4"
          style={{ backgroundColor: BG_COLOR[color] }}
        >
          <span style={{ color: FONT_COLOR[color] }} className="font-semibold">
            {LABEL[color]}
          </span>
        </div>
        <hr style={{ borderColor: '#666666' }} />
        <div className="flex py-10 mx-6">
          <Item label="อายุ" value={age || '-'} className="mr-12" />
          <Item label="เพศ" value={GENDER[gender] || '-'} className="mr-12" />
          <Item label="สร้างเมื่อ" value={`${createdAt.fromNow()}`} />
        </div>
        <div className="flex flex-col mx-6">
          <ListItem
            label={CONDITION_LABEL.symptom[hasSymptom]}
            checked={hasSymptom}
            color={hasSymptom ? BG_COLOR[color] : '#fff'}
          />
          <ListItem
            label={CONDITION_LABEL.environmentRisk[hasEnvRisk]}
            checked={hasEnvRisk}
            color={hasEnvRisk ? BG_COLOR[color] : '#fff'}
          />
        </div>
        <div className="fixed bottom-0 w-full text-center pb-10">
          <div className="font-light text-xs pb-1" style={{ color: '#A6A6A6' }}>
            สแกนเมื่อ: {scanAt.format('D MMM')} {scanAt.add(543, 'year').year()}
          </div>
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
