import { Component, type ReactNode } from "react";

/**
 * 에러 경계 — lazy 3D 모델의 로드/렌더 중 예외가 앱 전체를 흰 화면으로 만들지 않게 막는다.
 * 모델별 model.tsx에 문제가 있어도 뷰어 영역만 폴백으로 대체된다.
 * model id를 key로 주면 다른 모델로 이동할 때 에러 상태가 리셋된다.
 */
interface Props {
  fallback: ReactNode;
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[Viewer] 3D model failed to render:", error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
