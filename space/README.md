# Space — Category

A category covering space hardware built to survive extreme environments, shown as 3D exploded views. Four models trace a single space journey: **launch → orbit → return**.

## Model list

| Model | Status | Core question | Geometry / exploding |
|---|---|---|---|
| [`rocket-engine/`](rocket-engine/) Rocket Engine | ✅ Learnable | **How** is thrust produced | Bodies of revolution (bell, combustion chamber), vertical + radial exploding |
| [`eo-satellite/`](eo-satellite/) Earth Observation Satellite | ✅ Learnable | **How** does a satellite operate itself | Modular (bus + payload), radial exploding |
| [`comsat/`](comsat/) Communications Satellite | ✅ Learnable | **How** does a comms satellite relay signals | Modular — **shares its bus core** with eo-satellite |
| [`reentry-capsule/`](reentry-capsule/) Reentry Capsule | ✅ Learnable | **How** does it return without burning up | Blunt cone + spherical heat shield, concentric-shell exploding |

> [`satellite/`](satellite/) is **not a model** — it's the shared core folder used by both satellites (builder + shared descriptions). It is not registered on the site.

**Recommended order**: Rocket Engine → Satellites (EO, Comms) → Reentry Capsule.
Launch propulsion (rocket engine) gets you to orbit, where a satellite does its work, and the journey closes with a capsule returning through the atmosphere. The two satellite models are the same bus with a different payload on top, so viewing them side by side makes the "bus + payload" structure clear.

## Shared visual language for this category

- **Geometry**: unlike semiconductor's "stacked boxes," this category is built around **bodies of revolution (cylinders, cones, bells), flat panels, and concentric shells**. Uses `LatheGeometry`/`CylinderGeometry`/`TubeGeometry`/`TorusGeometry`, but still plugs into the same shared `<Viewer>` engine.
- **Explode direction**: mostly vertical (along the thrust/symmetry axis), with some radial exploding (plumbing, accessories, shell separation).
- **Colors**: **copper/bronze** (high-heat metals like combustion chambers, nozzles, heat shields) as the accent, against cool steel/silver structure, plus fuel blue, oxidizer gold, and solar-cell blue. Restrained gold glow on hot sections (no neon).
- **Surfaces**: procedural canvas textures — cooling channels, MLI foil, solar-cell grid, ablative charring. Patterns for visual realism.
- **Shared terminology**: nozzle, combustion chamber, injector, turbopump, regenerative cooling, gimbal, propellant, specific impulse (Isp) / bus, payload, reaction wheel, MLI / ablative heat shield, reentry — kept consistent across `locales/` and each model's `data.ts`.

## Folder layout

Each model folder consists of two files plus docs:

```
<model>/
  model.tsx   # 3D geometry — parts (PartDef[]) and explode vectors. Plugs into the shared <Viewer> engine.
  data.ts     # Part descriptions — 4 languages per part id (tag, title, spec, lead, detail, facts, sources)
  README.md   # human-facing: what the model shows, its parts, its behavior
  CLAUDE.md   # AI collaboration guidance: structure, colors, explode spec
```

Rotation, zoom, exploding, selection, and the info panel are not in the model code at all — they're all handled by the shared engine in [`src/shared/r3f/`](../src/shared/r3f/). Procedural textures are also shared from [`src/shared/r3f/textures.ts`](../src/shared/r3f/textures.ts) by varying only the parameters (cached per parameter set).

## On accuracy

Rather than copying any specific real vehicle, these are educational models that **generalize the representative structure** of the field (thrust, dimensions, layer counts, angles, etc. are adjusted for clarity and ease of understanding). The dimensions in each part's `spec` field represent typical value ranges for real hardware, and each part links standard/encyclopedia-level `sources`.
