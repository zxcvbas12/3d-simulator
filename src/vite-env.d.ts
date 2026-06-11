/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms 액세스 키 — 피드백 폼 전송용. https://web3forms.com 에서 발급. */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
