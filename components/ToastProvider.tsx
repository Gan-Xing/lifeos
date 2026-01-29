'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type ToastTone = 'success' | 'info' | 'warning' | 'danger'

type ToastVariant = 'toast' | 'modal'

type Toast = {
  id: string
  message: string
  tone: ToastTone
  duration: number
  variant: ToastVariant
  title?: string
  actionLabel?: string
}

type ToastContextValue = {
  addToast: (
    message: string,
    options?: {
      tone?: ToastTone
      duration?: number
      variant?: ToastVariant
      title?: string
      actionLabel?: string
    },
  ) => string
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

const toneStyles: Record<ToastTone, string> = {
  success: 'var(--success)',
  info: 'var(--primary)',
  warning: 'var(--warning)',
  danger: 'var(--danger)',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const addToast = useCallback(
    (message: string, options?: { tone?: ToastTone; duration?: number; variant?: ToastVariant; title?: string; actionLabel?: string }) => {
      const id = uid()
      const duration = Math.max(1200, options?.duration ?? 2600)
      const tone = options?.tone ?? 'info'
      const variant = options?.variant ?? 'toast'
      const toast: Toast = {
        id,
        message,
        tone,
        duration: variant === 'modal' ? 0 : duration,
        variant,
        title: options?.title,
        actionLabel: options?.actionLabel,
      }
      setToasts((prev) => [...prev, toast])
      if (variant !== 'modal') {
        window.setTimeout(() => removeToast(id), duration)
      }
      return id
    },
    [removeToast],
  )

  const value = useMemo(() => ({ addToast, removeToast }), [addToast, removeToast])

  const modal = [...toasts].reverse().find((toast) => toast.variant === 'modal')
  const activeToasts = toasts.filter((toast) => toast.variant === 'toast')

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {activeToasts.map((toast) => (
          <div
            key={toast.id}
            className="toast-card pointer-events-auto max-w-sm rounded-2xl border px-4 py-3 text-sm font-semibold"
            style={{ ['--toast-tone' as string]: toneStyles[toast.tone] }}
          >
            {toast.message}
          </div>
        ))}
      </div>

      {modal ? (
        <div className="toast-modal fixed inset-0 z-50 flex items-center justify-center">
          <div className="toast-modal-backdrop absolute inset-0" onClick={() => removeToast(modal.id)} />
          <div
            className="toast-card relative z-10 w-[min(90vw,420px)] rounded-3xl border px-6 py-5 text-sm"
            style={{ ['--toast-tone' as string]: toneStyles[modal.tone] }}
          >
            {modal.title ? (
              <p className="text-xs uppercase tracking-[0.3em] text-subtle">{modal.title}</p>
            ) : null}
            <p className="mt-3 text-base text-aura">{modal.message}</p>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => removeToast(modal.id)}
                className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted hover:text-aura"
              >
                {modal.actionLabel ?? 'OK'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return ctx
}
