import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRoute } from "../state/route";
import { useAppStore } from "../state/store";
import { useT } from "../i18n";

/**
 * 사용자 피드백 — 우하단 플로팅 버튼 + 모달. 푸터 링크도 같은 모달을 연다(route 스토어).
 * 전송은 Web3Forms(백엔드 없음) — 환경변수 VITE_WEB3FORMS_ACCESS_KEY 로 네 메일로 보낸다.
 * 보던 화면(모델·언어·페이지)을 자동으로 함께 보내 1인 운영 시 분류가 쉽다.
 */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "";
type FType = "idea" | "bug" | "other";
type Status = "idle" | "sending" | "success" | "error" | "unconfigured";

const CHAT_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z" />
  </svg>
);

export function Feedback() {
  const t = useT();
  const open = useRoute((s) => s.feedbackOpen);
  const openFeedback = useRoute((s) => s.openFeedback);
  const closeFeedback = useRoute((s) => s.closeFeedback);

  return (
    <>
      <button className="fb-fab" onClick={openFeedback}>
        {CHAT_ICON}
        {t.feedback.open}
      </button>
      {open && <FeedbackModal onClose={closeFeedback} />}
    </>
  );
}

function trapTab(e: KeyboardEvent, container: HTMLElement | null) {
  if (!container) return;
  const f = container.querySelectorAll<HTMLElement>(
    'button:not([disabled]), [href], input:not([tabindex="-1"]), textarea, [tabindex]:not([tabindex="-1"])',
  );
  if (!f.length) return;
  const first = f[0],
    last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function FeedbackModal({ onClose }: { onClose: () => void }) {
  const t = useT();
  const lang = useAppStore((s) => s.lang);
  const view = useRoute((s) => s.view);
  const category = useRoute((s) => s.category);
  const model = useRoute((s) => s.model);

  const [type, setType] = useState<FType>("idea");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState(""); // 허니팟
  const [status, setStatus] = useState<Status>("idle");

  const taRef = useRef<HTMLTextAreaElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // 보던 화면 맥락
  const screenName = model
    ? model.name[lang]
    : view === "category"
      ? t.cat[category]
      : view === "home" || view === "model"
        ? t.nav.home
        : t.nav[view];
  const typeText = type === "idea" ? t.feedback.typeIdea : type === "bug" ? t.feedback.typeBug : t.feedback.typeOther;

  // 열릴 때: 포커스 이동 · 스크롤 잠금 · ESC/탭 트랩 · 닫힐 때 포커스 복귀
  useEffect(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    taRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "Tab") trapTab(e, dialogRef.current);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      openerRef.current?.focus?.();
    };
  }, [onClose]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (hp) {
      setStatus("success"); // 봇: 조용히 성공 처리(스팸 차단)
      return;
    }
    if (!message.trim()) {
      taRef.current?.focus();
      return;
    }
    if (!ACCESS_KEY) {
      setStatus("unconfigured");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `[STRATA] ${typeText} · ${screenName}`,
          from_name: "STRATA Feedback",
          replyto: email || undefined,
          유형: typeText,
          화면: model ? `${screenName} (${model.cat}/${model.id})` : screenName,
          언어: lang,
          페이지: location.href,
          기기: `${window.innerWidth}×${window.innerHeight}`,
          내용: message.trim(),
          "회신 이메일": email || "(미입력)",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setTimeout(onClose, 2200);
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fb-overlay" onClick={onClose}>
      <div
        className="fb-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fb-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="fb-close" onClick={onClose} aria-label={t.feedback.close}>
          ✕
        </button>
        <div className="fb-accent" />
        <h2 id="fb-title" className="fb-title">
          {t.feedback.title}
        </h2>
        <p className="fb-intro">{t.feedback.intro}</p>

        {status === "success" ? (
          <p className="fb-status ok" role="status">
            {t.feedback.success}
          </p>
        ) : (
          <form onSubmit={submit}>
            <div className="fb-field">
              <span className="fb-label">{t.feedback.typeLabel}</span>
              <div className="fb-chips" role="radiogroup" aria-label={t.feedback.typeLabel}>
                {(["idea", "bug", "other"] as FType[]).map((ty) => (
                  <button
                    type="button"
                    key={ty}
                    role="radio"
                    aria-checked={type === ty}
                    className={`fb-chip${type === ty ? " on" : ""}`}
                    onClick={() => setType(ty)}
                  >
                    {ty === "idea" ? t.feedback.typeIdea : ty === "bug" ? t.feedback.typeBug : t.feedback.typeOther}
                  </button>
                ))}
              </div>
            </div>

            <label className="fb-field">
              <span className="fb-label">{t.feedback.messageLabel}</span>
              <textarea
                ref={taRef}
                className="fb-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.feedback.messagePlaceholder}
                rows={4}
                required
              />
            </label>

            <label className="fb-field">
              <span className="fb-label">{t.feedback.emailLabel}</span>
              <input
                className="fb-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.feedback.emailPlaceholder}
              />
            </label>

            {/* 허니팟 — 사람에겐 안 보이고, 봇이 채우면 전송을 막는다 */}
            <input
              className="fb-hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              aria-hidden
            />

            <p className="fb-context">
              <span>{t.feedback.context}</span> {screenName} · {lang.toUpperCase()}
            </p>

            {status === "error" && (
              <p className="fb-status err" role="alert">
                {t.feedback.error}
              </p>
            )}
            {status === "unconfigured" && (
              <p className="fb-status err" role="alert">
                {t.feedback.unconfigured}
              </p>
            )}

            <div className="fb-actions">
              <button type="submit" className="fb-submit" disabled={status === "sending"}>
                {status === "sending" ? t.feedback.sending : t.feedback.submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
