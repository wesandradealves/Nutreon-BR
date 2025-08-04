'use client'

import { useState } from 'react'
import { useApiRequest } from './useApiRequest'

interface UseResendVerificationReturn {
  loading: boolean
  success: boolean
  error: string | null
  resendEmail: (email: string) => Promise<void>
  reset: () => void
}

export function useResendVerification(): UseResendVerificationReturn {
  const [success, setSuccess] = useState(false)
  const { loading, error, request, clearError } = useApiRequest()

  const resendEmail = async (email: string) => {
    setSuccess(false)

    const response = await request('/api/auth/resend-verification', {
      method: 'POST',
      data: { email }
    })

    if (response.success) {
      setSuccess(true)
    }
  }

  const reset = () => {
    setSuccess(false)
    clearError()
  }

  return {
    loading,
    success,
    error,
    resendEmail,
    reset
  }
}