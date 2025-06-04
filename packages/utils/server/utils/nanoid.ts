import { customAlphabet, nanoid } from 'nanoid'

export function generateNumericCode(length = 6): string {
  return customAlphabet('0123456789', length)()
}

export function generateAlphaNumericCode(length = 6): string {
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', length)()
}

export function generateRandomId(length = 16): string {
  return nanoid(length)
}
