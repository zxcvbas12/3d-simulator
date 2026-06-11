# 위성 공유 코어 (satellite/) — 모델 아님

> 이 폴더는 **사이트에 등록되는 모델이 아니라**, 두 위성 모델([`eo-satellite/`](../eo-satellite/) 지구관측, [`comsat/`](../comsat/) 통신)이 **공유하는 코어**입니다. 두 위성은 같은 버스(전력·자세·통신·추진·열)를 쓰고 **탑재체와 안테나, 궤도만** 다르므로, 공통 부분을 여기로 모았습니다(중복 최소화 · 1인 유지보수).

## 무엇이 들어 있나

| 파일 | 내용 |
|---|---|
| [`parts.tsx`](parts.tsx) | 공통 부품 **빌더** + 재질 헬퍼 — `buildBus` · `buildSolarWing` · `buildReactionWheels` · `buildPropulsion` · `buildBattery` · `buildDish` |
| [`info.ts`](info.ts) | 공통 부품 **설명** `commonSatInfo` (bus · solar · adcs · propulsion · battery), 4개 언어 |
| [`CLAUDE.md`](CLAUDE.md) | 위성 **가족 지침** — 공유 코어 + 2변형의 설계·구조·색·치수 |

## 어떻게 쓰이나

각 위성 모델은 코어를 import해서 **자기만의 탑재체·안테나만** 덧붙입니다:

```ts
// eo-satellite / comsat 의 data.ts
import { commonSatInfo } from "../satellite/info";
export const eoSatInfo = { ...commonSatInfo, antenna: {…}, payload: {…} };

// eo-satellite / comsat 의 model.tsx
import { buildBus, buildSolarWing, buildDish, … } from "../satellite/parts";
```

- **eo-satellite** — `buildDish` ×1(상단) + 관측 카메라 payload, 저궤도(LEO).
- **comsat** — `buildDish` ×2(지구 방향 반사판) + 중계기 payload, 정지궤도(GEO).

빌드 결과도 두 모델 청크가 코어를 공유해, 위성 청크는 각 ≈4.5 kB gzip으로 작습니다. 부품 간 재질 인스턴스는 공유하지 않아(클릭 강조가 부품별 독립) 텍스처 map만 캐시 공유합니다.
