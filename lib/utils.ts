import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// The greeting is shown above a separate "David" signature, so drop a trailing sign-off from the text
export function stripSignature(text?: string) {
  return text?.replace(/[\s,—-]*David\s*$/, '').trim() ?? ''
}
