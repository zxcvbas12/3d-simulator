# Satellite Shared Core (satellite/) — Not a Model

> This folder is **not a model registered on the site** — it's the **shared core** used by the two satellite models ([`eo-satellite/`](../eo-satellite/) Earth observation, [`comsat/`](../comsat/) communications). Both satellites use the same bus (power, attitude, comms, propulsion, thermal) and differ only in **payload, antenna, and orbit**, so the common parts were gathered here (minimizing duplication, easing solo maintenance).

## What's in here

| File | Contents |
|---|---|
| [`parts.tsx`](parts.tsx) | Shared part **builders** + material helpers — `buildBus`, `buildSolarWing`, `buildReactionWheels`, `buildPropulsion`, `buildBattery`, `buildDish` |
| [`info.ts`](info.ts) | Shared part **descriptions**, `commonSatInfo` (bus, solar, adcs, propulsion, battery), in 4 languages |
| [`CLAUDE.md`](CLAUDE.md) | The satellite **family guidance** — design/structure/color/dimensions for the shared core and both variants |

## How it's used

Each satellite model imports the core and adds only **its own payload and antenna**:

```ts
// eo-satellite / comsat's data.ts
import { commonSatInfo } from "../satellite/info";
export const eoSatInfo = { ...commonSatInfo, antenna: {…}, payload: {…} };

// eo-satellite / comsat's model.tsx
import { buildBus, buildSolarWing, buildDish, … } from "../satellite/parts";
```

- **eo-satellite** — `buildDish` ×1 (top) + an observation-camera payload, low Earth orbit (LEO).
- **comsat** — `buildDish` ×2 (Earth-facing reflectors) + a transponder payload, geostationary orbit (GEO).

The build output also shares the core between the two model chunks, keeping each satellite chunk small at ≈4.5 kB gzip. Material instances aren't shared between parts (so highlighting stays independent per part), but texture maps are shared from a cache.
