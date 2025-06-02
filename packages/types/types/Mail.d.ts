export interface SendEmailOptions {
  to: string | string[]
  subject: string
  text?: string
  html?: string
}
