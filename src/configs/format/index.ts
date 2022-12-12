import JSEncrypt from 'jsencrypt'
import { includes } from 'lodash'
import i18n from '@/utils/language'

export function formatNumber(value: number | string): string {
  if (!value) return '0'
  // const val = (value / 1).toFixed(0).replace('.', ',')
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function numberWithCommas(value: string): string {
  if (!value) return '0'
  if (includes(value, '.')) {
    const afterDot = value.substr(value.indexOf('.'))
    const beforeDot = value.substring(0, value.indexOf('.'))
    const _beforeDot = +beforeDot
    const temp = _beforeDot.toLocaleString().replaceAll('.', ',')
    return temp + afterDot
  }
  const _value = +value
  // return _value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
  return _value.toLocaleString('en-US')
}

export function roundingNumber(value: number): number | string {
  if (!value) return 0
  return value.toFixed(2)
}

export function convertAmountDecimal(amount: string | number, currency: string): string {
  const objConvert = {
    LYNK: 2,
    CLM: 2,
    USD: 2,
    USDC: 2,
    USDT: 2,
    BNB: 5,
    ETH: 8,
    BTC: 8,
    BUSD: 2,
    PERCENT: 2,
    AREA: 2
  }

  if (!amount) {
    if (currency === 'PERCENT') {
      return '0'
    }
    amount = 0 // case amount = null | ''
    return amount.toLocaleString('en-US', { minimumFractionDigits: objConvert[currency] })
  }

  if (amount >= 100 && currency === 'PERCENT') {
    return '100'
  }

  amount = amount.toString()
  if (includes(amount, '.')) {
    const afterDot = amount.substr(amount.indexOf('.'))
    const _afterDotString = Number(afterDot).toFixed(objConvert[currency])
    const _afterDot = _afterDotString.substr(_afterDotString.lastIndexOf('.') + 1)
    let _beforeDot = 0
    const beforeDot = amount.substring(0, amount.indexOf('.'))
    if (Number(_afterDotString) === 1) {
      _beforeDot = +beforeDot + 1
    } else {
      _beforeDot = +beforeDot
    }

    const temp = _beforeDot.toLocaleString().replaceAll('.', ',')
    return temp + '.' + _afterDot
  }
  const _value = +amount
  return _value.toLocaleString('en-US', { minimumFractionDigits: objConvert[currency] })
}

export function formatMMDDYY(value: string | number): any {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return (
    (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
    '/' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
    '/' +
    date.getFullYear() +
    ' ' +
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':' +
    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  )
}
export function formatMMDDYYWithoutHours(value: string | number): any {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/' + date.getFullYear()
}

export function encryptPassword(pass: string): string | boolean {
  const PUBLIC_KEY =
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgw0IeOV0DZL1ZfzsSSbZDRu9XPPBkb4EVsFKYODFJnEEMdVK3IBhCyehoUbJFufIvdQD78LyfRo46fB5B6k+EsLC/4vofQiYyE/R13r+Fd+xufTXpxDKkj544LtfBfvsh/fYFx+vUH1/5XtuCplBX4cOsIdMni026zZv46clJswIDAQAB'
  const RSAEncrypt = new JSEncrypt()
  RSAEncrypt.setPublicKey(PUBLIC_KEY)
  return RSAEncrypt.encrypt(pass)
}

export function timeAgo(time: string | number): string | undefined {
  if (time && time !== '') {
    const thisTime = new Date(time).getTime()
    const now = new Date().getTime()
    const elapsed = now - thisTime

    const msPerMinute = 60 * 1000
    const msPerHour = msPerMinute * 60
    const msPerDay = msPerHour * 24
    const msPerMonth = msPerDay * 30
    const msPerYear = msPerDay * 365

    if (elapsed < 1000) {
      return i18n.tc('time.just-now')
    } else if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + i18n.tc('time.second-ago')
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + i18n.tc('time.minute-ago')
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + i18n.tc('time.hours-ago')
    } else if (elapsed < msPerMonth) {
      const day = Math.round(elapsed / msPerDay)
      if (day < 7) {
        return day + i18n.tc('time.day-ago')
      } else {
        return Math.round(day / 7) + i18n.tc('time.week-ago')
      }
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + i18n.tc('time.month-ago')
    } else {
      return Math.round(elapsed / msPerYear) + i18n.tc('time.year-ago')
    }
  }
}

export function formatTransactionCode(code: string | null, number = 10): string {
  if (!code) return ''
  const before = code.substring(0, number)
  const after = code.substring(code.length - number)
  return before + '...' + after
}

export function convertCurrency(amount) {
  if (!amount) return 0
  //@ts-ignore
  return Math.abs(amount) > 999 ? Math.sign(amount) * (Math.abs(amount) / 1000).toFixed(1) + 'k' : Math.sign(amount) * Math.abs(amount)
}

export function formatDDMMYY(value: string | number): any {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/' + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/' + date.getFullYear()
}

export function bytesToSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = Math.floor(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

export function convertMs(ms) {
  if (!ms) return ''
  const days = Math.floor(ms / (24 * 60 * 60 * 1000))
  const daysms = ms % (24 * 60 * 60 * 1000)
  const hours = Math.floor(daysms / (60 * 60 * 1000))
  const hoursms = ms % (60 * 60 * 1000)
  const minutes = Math.floor(hoursms / (60 * 1000))
  const minutesms = ms % (60 * 1000)
  const sec = Math.floor(minutesms / 1000)

  if (days >= 1) {
    const textDay = days < 2 ? ' day ' : ' days '
    const textHour = hours < 2 ? ' hour ' : ' hours '
    if (hours) {
      return days + textDay + hours + textHour
    }
    return days + textDay
  }
  if (hours >= 1) {
    const textMinutes = minutes < 2 ? ' minute ' : ' minutes '
    const textHour = hours < 2 ? ' hour ' : ' hours '
    if (minutes) {
      return hours + textHour + minutes + textMinutes
    }
    return hours + textHour
  }
  if (minutes >= 1) {
    const textMinutes = minutes < 2 ? ' minute ' : ' minutes '
    const textSec = sec < 2 ? ' second ' : ' seconds '
    if (sec) {
      return minutes + textMinutes + sec + textSec
    }
    return minutes + textMinutes
  }

  return sec + ' seconds'
}
