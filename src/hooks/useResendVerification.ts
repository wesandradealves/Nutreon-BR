'use client'

import { useState } from 'react'
import axios from 'axios'

interface UseResendVerificationReturn {
  loading: boolean
  success: boolean
  error: string | null
  resendEmail: (email: string) => Promise<void>
  reset: () => void
}

export function useResendVerification(): UseResendVerificationReturn {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resendEmail = async (email: string) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await axios.post('/api/auth/resend-verification', { email })

      if (response.data.success) {
        setSuccess(true)
      } else {
        setError('Erro ao enviar email. Tente novamente.')
      }
    } catch (err) {
      console.error('Erro ao reenviar email:', err)
      setError('Erro ao processar solicitação. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setSuccess(false)
    setError(null)
  }

  return {
    loading,
    success,
    error,
    resendEmail,
    reset
  }
}