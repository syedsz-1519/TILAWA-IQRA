'use client'

import React, { ReactNode } from 'react'
import { logError, getErrorLogs, clearErrorLogs, type ErrorContext } from '@/lib/error-handler'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, reset: () => void) => ReactNode
  context?: ErrorContext
  onError?: (error: Error) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorCount: number
}

/**
 * Error Boundary Component - Catches React rendering errors
 * Automatically logs and provides recovery UI
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorCount: 0,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorCount = this.state.errorCount + 1

    this.setState({ errorCount })

    // Log the error
    logError(error, {
      ...this.props.context,
      component: this.props.context?.component || 'ErrorBoundary',
      context: {
        ...this.props.context?.context,
        componentStack: errorInfo.componentStack,
        errorCount,
      },
    })

    // Call custom error handler if provided
    this.props.onError?.(error)

    // Automatically reset after 5 seconds if same error repeats 3+ times
    if (errorCount >= 3) {
      console.warn(`Error boundary triggered ${errorCount} times. Auto-resetting...`)
      setTimeout(() => this.resetError(), 5000)
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError)
      }

      return (
        <div
          style={{
            padding: '20px',
            margin: '20px',
            border: '2px solid #ff4444',
            borderRadius: '8px',
            backgroundColor: '#fff3f3',
          }}
        >
          <h2 style={{ color: '#cc0000', marginTop: 0 }}>⚠️ Something went wrong</h2>
          <p style={{ color: '#333', marginBottom: '10px' }}>
            {this.state.error.message || 'An unexpected error occurred'}
          </p>
          <details style={{ marginBottom: '15px', cursor: 'pointer' }}>
            <summary style={{ color: '#666', userSelect: 'none' }}>Error details</summary>
            <pre
              style={{
                backgroundColor: '#f5f5f5',
                padding: '10px',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '12px',
              }}
            >
              {this.state.error.stack}
            </pre>
          </details>
          <button
            onClick={this.resetError}
            style={{
              padding: '8px 16px',
              marginRight: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Go Home
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Debug Panel - Shows error logs (dev only)
 */
export function ErrorDebugPanel() {
  const [isOpen, setIsOpen] = React.useState(false)
  const logs = getErrorLogs()

  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '8px 12px',
          backgroundColor: '#ff9800',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: isOpen ? '10px' : '0',
        }}
      >
        📋 Errors ({logs.length})
      </button>

      {isOpen && (
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '15px',
            maxWidth: '400px',
            maxHeight: '500px',
            overflow: 'auto',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ marginTop: 0 }}>Error Logs</h3>

          {logs.length === 0 ? (
            <p style={{ color: '#666', fontSize: '14px' }}>No errors logged</p>
          ) : (
            <>
              <div style={{ fontSize: '12px', maxHeight: '350px', overflowY: 'auto' }}>
                {logs.map((log: any, idx: number) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px',
                      marginBottom: '10px',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '4px',
                      borderLeft: '3px solid #ff9800',
                    }}
                  >
                    <strong style={{ color: '#ff9800' }}>{log.type}</strong>
                    <p style={{ margin: '5px 0', color: '#333' }}>{log.message}</p>
                    <small style={{ color: '#999' }}>{log.timestamp}</small>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  clearErrorLogs()
                  setIsOpen(false)
                }}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '10px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Clear Logs
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
