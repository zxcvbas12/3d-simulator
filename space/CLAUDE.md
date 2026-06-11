# 우주 (Space) 카테고리 지침

> 루트 `../CLAUDE.md`의 공통 규칙 **위에** 적용된다. 충돌 시 이 파일이 우선. 공통 내용은 반복하지 않는다.
> 개별 모델 지침은 각 모델 폴더의 `CLAUDE.md`에 둔다.

## 이 카테고리의 범위
우주 (Space) 분야의 제품들을 분해도로 다룬다.

## 이 카테고리 공통 사항
- **분해 방향**: 주로 **수직(추력/대칭 축) + 일부 방사**. 이 분야는 **회전체(원통·원뿔·벨)** 형상이 핵심 — 반도체의 "적층 박스"와 구분된다. (`LatheGeometry`/`CylinderGeometry`/`TubeGeometry`/`TorusGeometry` 활용, 공통 `<Viewer>`는 그대로.)
- **포인트 색**: **구리/브론즈**(연소실·노즐 등 고열 금속) 강조 + 차가운 강철/실버 구조 + 연료 블루·산화제 골드 코드. 루트의 구리·골드 팔레트 안. 고온부에 **절제된 골드 발광**(네온 금지).
- **썸네일 모티프**: `orbit`(현행). 추후 노즐 벨 실루엣 등 분야 형태 검토.
- **공통 용어**: 노즐(nozzle)·연소실(combustion chamber)·인젝터(injector)·터보펌프(turbopump)·재생냉각(regenerative cooling)·짐벌(gimbal)·추진제(propellant)·비추력(Isp) — locales에서 다국어 표기 통일.

## 이 카테고리의 모델 목록
- **rocket-engine** — 로켓 엔진(액체, 가스발생기 LOX/RP-1) · 상태: 기획 완료(`rocket-engine/CLAUDE.md`), 구현 대기 — 카테고리 첫 모델·사이트 첫 회전체 형상
- (예정) satellite · reentry-capsule — catalog에 `soon`으로 등재됨

## 메모
- 공통 동작(회전/줌/분해/정보패널/사이드바)은 `../shared/`를 그대로 재사용한다.
- 이 분야 특유의 동작이 필요하면 `shared/`를 일반화하되 기존 모델을 깨지 않는다.
- 모든 사용자 노출 텍스트는 `../locales/`의 다국어 키로 둔다.
