# Semiconductor — Category

A category covering chip- and package-level semiconductor products as 3D exploded views. This is the **first category implemented** on the site, and its models set the quality bar for the other categories.

## Model list

| Model | Status | Core question | Exploding style |
|---|---|---|---|
| [`hbm/`](hbm/) HBM High Bandwidth Memory | ✅ Learnable | **Why** do we stack memory | Vertical stack (8 layers + TSV) |
| [`gpu/`](gpu/) GPU Package | ✅ Learnable | **Why** put memory next to the processor | Mixed (vertical + planar) + 2-stage stack |
| [`cpu/`](cpu/) CPU Chiplet Package | ✅ Learnable | **Why** split a chip up | Mixed (mostly planar) |

**Recommended order**: HBM → GPU → CPU.
Understanding a stacked structure (HBM) first makes it easier to follow why you'd put one next to a processor (GPU's 2.5D package) and why you'd split a chip into chiplets (CPU). The GPU model's HBM stack is a simplified version — go back to the HBM model if you want to see inside it.

## Shared visual language for this category

- **Explode direction**: vertical stacking by default — layers spread apart vertically, revealing the die and interconnects inside.
- **Colors**: dies use a muted blue family (subtle brightness variation per layer), metal interconnects (TSV/bumps/traces) use copper/gold, solder balls use silver. Only the GPU's compute die gets a distinct teal accent.
- **Surfaces**: procedural canvas textures (substrate routing, fine traces, die-cell grid, laser marking) — patterns for visual realism, not real circuit data.
- **Shared terminology**: die, package, substrate, interposer, bump — kept consistent across `locales/` and each model's `data.ts`.

## Folder layout

Each model folder consists of two files plus docs:

```
<model>/
  model.tsx   # 3D geometry — parts (PartDef[]) and explode vectors. Plugs into the shared <Viewer> engine.
  data.ts     # Part descriptions — 4 languages per part id (tag, title, spec, lead, detail, facts)
  README.md   # human-facing: what the model shows, its parts, its behavior
  CLAUDE.md   # AI collaboration guidance: structure, colors, explode spec
```

Rotation, zoom, exploding, selection, and the info panel are not in the model code at all — they're all handled by the shared engine in [`src/shared/r3f/`](../src/shared/r3f/). Procedural textures are also shared from [`src/shared/r3f/textures.ts`](../src/shared/r3f/textures.ts) by varying only the parameters (cached per parameter set).

## On accuracy

Models follow publicly documented, standard/whitepaper-level structure but are **simplified for educational purposes** (layer counts, proportions, bump counts, etc. are adjusted for clarity). The dimensions in each part's `spec` field represent typical value ranges for real products.
