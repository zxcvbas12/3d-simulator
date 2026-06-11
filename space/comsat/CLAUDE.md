# 통신 위성 (comsat) 모델 지침

> 설계·구조·색·치수·구현 방식은 **가족 지침 `../satellite/CLAUDE.md`** 를 따른다(공유 코어 + 2종). 여기엔 이 변형 고유 사항만.

## 이 변형의 정체
- **궤도**: 정지궤도 GEO 35,786 km. **임무**: 신호 중계.
- **탑재체(payload)**: 중계기(transponder) 전자 박스 + 도파관 혼(−Z, 안티-지구). (`model.tsx`의 `buildTransponder`)
- **안테나(antenna)**: 지구를 향한 대형 반사판 ×2(+Z). 공유 `buildDish`를 `rotation.x=-π/2`로 돌려 좌우 배치(`buildReflectors`).
- 나머지 5부품(버스·태양전지판×2·반작용 휠·추진·배터리)은 **공유 코어**(`../satellite/parts.tsx`) 그대로. EO 위성과 버스 동일.

## 파일
- `model.tsx` — 코어 import + `buildReflectors`·`buildTransponder` + 배치(방사형 분해).
- `data.ts` — `...commonSatInfo`(`../satellite/info.ts`) + 고유 `antenna`·`payload` 설명.
- 등록: `registry.tsx`의 `space/comsat`, catalog `comsat`(live).
