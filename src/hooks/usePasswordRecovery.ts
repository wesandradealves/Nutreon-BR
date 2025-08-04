'use client'

import { useCallback } from 'react'
import { useApiRequest } from './useApiRequest'
import { toast } from 'react-hot-toast'

interface PasswordResetRequestResponse {
  message: string
}

interface PasswordResetResponse {
  message: string
}

export function usePasswordRecovery() {
  const requestResetApi = useApiRequest<PasswordResetRequestResponse>()
  const resetPasswordApi = useApiRequest<PasswordResetResponse>()

  const requestPasswordReset = useCallback(async (email: string) => {
    const result = await requestResetApi.request('/api/auth/request-password-reset', {
      method: 'POST',
      data: { email }
    })

    if (result.success && result.data) {
      const message = result.data.message || 'Email de recuperação enviado! Verifique sua caixa de entrada.'
      toast.success(message)
      return true
    }
    
    if (result.error) {
      toast.error(result.error)
    }
    return false
  }, [requestResetApi])

  const resetPassword = useCallback(async (token: string, password: string) => {
    const result = await resetPasswordApi.request('/api/auth/reset-password', {
      method: 'POST',
      data: { token, password }
    })

    if (result.success && result.data) {
      const message = result.data.message || 'Senha redefinida com sucesso!'
      toast.success(message)
      return true
    }
    
    if (result.error) {
      toast.error(result.error)
    }
    return false
  }, [resetPasswordApi])

  const loading = requestResetApi.loading || resetPasswordApi.loading
  const error = requestResetApi.error || resetPasswordApi.error

  return {
    loading,
    error,
    requestPasswordReset,
    resetPassword
  }
}