import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Обновляем состояние, чтобы при следующем рендере показать запасной UI
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Можно также отправить отчет об ошибке в сервис аналитики
    console.error('ErrorBoundary caught an error', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Можно отрендерить любой запасной UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <h2>Что-то пошло не так.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Подробности ошибки</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              backgroundColor: '#4a90e2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Перезагрузить страницу
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
