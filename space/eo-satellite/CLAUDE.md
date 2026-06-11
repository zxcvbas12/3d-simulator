# 지구관측 위성 (eo-satellite) 모델 지침

> 설계·구조·색·치수·구현 방식은 **가족 지침 `../satellite/CLAUDE.md`** 를 따른다(공유 코어 + 2종). 여기엔 이 변형 고유 사항만.

## 이 변형의 정체
- **궤도**: 저궤도 LEO ≈ 600 km. **임무**: 지표 촬영.
- **탑재체(payload)**: 지구를 향한(−Y, nadir) 관측 카메라 — 망원 배럴 + 차양 + 골드 조리개. (`model.tsx`의 `buildCamera`)
- **안테나(antenna)**: 고이득 dish ×1(상단, 안티-네이디르 통신). 공유 `buildDish` 재사용.
- 나머지 5부품(버스·태양전지판×2·반작용 휠·추진·배터리)은 **공유 코어**(`../satellite/parts.tsx`) 그대로.

## 파일
- `model.tsx` — 코어 import + `buildCamera` + dish 배치(방사형 분해).
- `data.ts` — `...commonSatInfo`(`../satellite/info.ts`) + 고유 `antenna`·`payload` 설명.
- 등록: `registry.tsx`의 `space/eo-satellite`, catalog `eo-satellite`(live).
