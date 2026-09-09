# HBM High Bandwidth Memory — Model

> **Core question: why do we stack memory?**
> Stacking thin DRAM dies vertically and wiring them straight through with through-silicon vias (TSV) gets you large capacity and a very wide data path (bandwidth) in a small footprint. This is the site's **first model and its quality benchmark**.

## Structure (bottom → top)

| Part id | Part | Representation |
|---|---|---|
| `substrate` | Package substrate | The largest base. PCB routing texture on top |
| `bga` | BGA solder balls | 14×14 grid of silver balls on the underside of the substrate (external connections) |
| `interposer` | Silicon interposer | Thin gray plate. Fine traces on top, gold C4 bumps on the bottom |
| `base` | Base (logic) die | Memory controller/PHY. Large functional-block texture on top |
| `dram` | DRAM dies ×8-16 (layer-count option) | Blue family (brightness varies per layer). The top die has an "HBM" laser mark |
| `tsv` | TSV (through-silicon vias) | 5×5 grid of copper pillars — **stretches to match the stack height** and passes through every layer when exploded |
| `microbump` | Micro bumps | Grid of gold solder balls on the underside of each die |

## Behavior

- **Exploding**: vertical — layers fan out bottom-first with stagger + easing. TSVs update their length every frame to keep piercing through the expanded stack (`update` hook).
- **Clicking a DRAM die**: the info panel shows "layer n" (the `layer` field).
- Rotation, zoom, selection, and the info panel are all handled by the shared engine — this folder's code is only geometry and descriptions.

## Options (top-left viewer toggle)

- **Layer count** — 8-Hi (default) / 12-Hi / 16-Hi: change the stack height. TSV length, the top die's laser mark (`...·{n}H`), and camera distance all follow automatically.
- **Cutaway** — see inside the stack (layer structure, TSV copper-pillar cross-section) via a clipping plane. Can be combined with the explode slider.

## Key specs (shown in the info panel / catalog)

8-Hi DRAM + logic die · die ≈ 11 × 11 mm · stack ≈ 0.72 mm · DRAM ≈ 50 μm/layer · TSV ∅ ≈ 10 μm · bandwidth ≈ 1 TB/s/stack · 2.5D (Si interposer) packaging

## Files

- [`model.tsx`](model.tsx) — geometry, materials, explode vectors, the TSV update hook
- [`data.ts`](data.ts) — descriptions for the 7 parts, in 4 languages (lead / detail / facts / spec)
- [`CLAUDE.md`](CLAUDE.md) — AI-collaboration model spec (visual/interaction reference)

## Implementation notes

- The original was a single-file vanilla Three.js prototype, [`/hbm-3d-space.html`](../../hbm-3d-space.html) — its geometry, textures, and animation were ported into an R3F `ModelDef`.
- Repeated elements (BGA, C4, micro bumps, TSVs) use InstancedMesh. Procedural textures are cached and shared from a shared module.
- Future extension ideas: cutaway sectioning, layer-count selection (12/16-Hi).
