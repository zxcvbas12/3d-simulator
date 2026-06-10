import { useRoute } from "./shared/state/route";
import { Nav } from "./shared/ui/Nav";
import { Sidebar } from "./shared/ui/Sidebar";
import { MainView } from "./shared/ui/views";
import { Footer } from "./shared/ui/Footer";

/**
 * 앱 셸 — 상단 네비 + 2단계 사이드바 + 본문 라우팅 + 모바일 드로어.
 * (바닐라 class App → React 컴포넌트로 이식. shell.css 클래스 구조는 그대로 재사용.)
 * 실제 3D 뷰어는 4단계에서 ModelView의 .viewer에 연결한다.
 */
export default function App() {
  const drawerOpen = useRoute((s) => s.drawerOpen);
  const closeDrawer = useRoute((s) => s.closeDrawer);

  return (
    <>
      <Nav />
      <div className={`backdrop${drawerOpen ? " show" : ""}`} onClick={closeDrawer} />
      <div className="shell">
        <Sidebar />
        <main className="main">
          <MainView />
          <Footer />
        </main>
      </div>
    </>
  );
}
