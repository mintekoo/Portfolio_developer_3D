import { Component } from "react";

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("Canvas rendering encountered an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center w-full h-full text-secondary text-sm p-4 text-center">
            3D visual temporarily unavailable
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default CanvasErrorBoundary;
