'use client'

import { useState, useCallback } from 'react'
import { useBFF } from './useBFF'
import { toast } from 'react-hot-toast'

interface PasswordRecoveryState {
  loading: boolean
  error: string | null
}

export function usePasswordRecovery() {
  const { request } = useBFF()
  const [state, setState] = useState<PasswordRecoveryState>({
    loading: false,
    error: null
  })

  const requestPasswordReset = useCallback(async (email: string) => {
    setState({ loading: true, error: null })

    try {
      const response = await request('/auth/request-password-reset', {
        method: 'POST',
        body: JSON.stringify({ email })
      })

      if (response && response.success) {
        const message = (response as { message?: string }).message || 'Email de recuperação enviado! Verifique sua caixa de entrada.'
        toast.success(message)
        return true
      }
      return false
    } catch (error) {
      const message = (error as Error & { response?: { data?: { message?: string } } }).response?.data?.message || 'Erro ao solicitar recuperação'
      setState({ loading: false, error: message })
      toast.error(message)
      return false
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }, [request])

  const resetPassword = useCallback(async (token: string, password: string) => {
    setState({ loading: true, error: null })

    try {
      const response = await request('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password })
      })

      if (response && response.success) {
        const message = (response as { message?: string }).message || 'Senha redefinida com sucesso!'
        toast.success(message)
        return true
      }
      return false
    } catch (error) {
      const message = (error as Error & { response?: { data?: { message?: string } } }).response?.data?.message || 'Erro ao redefinir senha'
      setState({ loading: false, error: message })
      toast.error(message)
      return false
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }, [request])

  return {
    ...state,
    requestPasswordReset,
    resetPassword
  }
}