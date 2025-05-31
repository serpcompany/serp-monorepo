import { z } from 'zod'

export const registerUserSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
  name: z.string().min(1).max(100),
  inviteToken: z.string().min(32).max(32).optional(),
})

export const loginUserSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
})

export const updateUserPasswordSchema = z.object({
  password: z.string().min(8),
})

export const emailSchema = z.object({
  email: z.string().email(),
})

export const linkPasskeySchema = z.object({
  userName: z.string().email(),
  displayName: z.string().trim().optional(),
})

export const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      'Phone number must be in E.164 format (e.g. +12125551234)',
    ),
})

export const phoneVerificationSchema = z.object({
  phoneNumber: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      'Phone number must be in E.164 format (e.g. +12125551234)',
    ),
  code: z.string().length(6),
})

export const otpLoginSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
})

export const otpVerificationSchema = z.object({
  email: z.string().email(),
  code: z.number().min(6).max(6),
})
