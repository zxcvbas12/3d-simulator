# EV Battery Pack — Model

> **Core question: how do small, low-voltage cells scale up into the large energy store that moves a car?**
> An EV battery is a 3-tier hierarchy: **cell → module → pack**. Cells of about 3.7 V are wired in a long series to reach hundreds of volts, and cooling, a BMS, and a housing keep it all safe and uniform. The first model in the automotive category.

## Structure (bottom → top, modules arranged on a plane)

| Part id | Part | Representation |
|---|---|---|
| `enclosure` | Pack housing | The aluminum tray + side walls laid under the car's floor |
| `coldplate` | Cold plate | A liquid-cooling plate under the modules (cyan channel texture) |
| `module` | Battery modules ×6 | Arranged 3×2 on a plane. Each module = end plates + a bundle of prismatic cells |
| `cell` | Battery cell | Prismatic cells inside a module (instanced). Cell-format option: prismatic/cylindrical/pouch |
| `busbar` | Busbar | Copper bars connecting module terminals (across the top) |
| `bms` | BMS board | Monitors and protects the cells (green PCB) |
| `lid` | Top cover | The aluminum lid covering the pack |

## Behavior

- **Exploding**: mixed — the cover, busbar, and BMS move up (vertical), while the 6 modules fan outward (planar), revealing the pack's internal arrangement. The cold plate and housing move down.
- **2-stage exploding**: in the second half of the explode range (past 60% on the slider), the cells, terminals, and end plates inside each module spread apart further — so the cell→module→pack hierarchy also reads through the exploding order.
- **Clicking a module**: shows "module n" (`layer`). Cells are selected separately, inside the module.
- Rotation, zoom, selection, and the info panel are all handled by the shared engine — this folder's code is only geometry and descriptions.

## Options (top-left viewer toggle)

- **Cell format** — PRISM (prismatic, default) / CYL (2 rows of cylindrical cells + positive-terminal caps) / POUCH (pouch cells + tabs): compares three cell packaging styles in the same module slot. The 2-stage exploding also applies per format.

## Key specs (info panel / catalog)

Cell → module → pack hierarchy · pack ≈ 2.0 × 1.5 m · cell ≈ 3.7 V (Li-ion) · pack ≈ 400/800 V · liquid cooling (glycol/water) · BMS (voltage/temperature/current + balancing) · sealed aluminum housing

## Learning points

1. A single cell is only about 3.7 V, so cells are **wired in a long series** to reach hundreds of volts — the busbar carries the resulting high current.
2. Grouping into a **pack > module > cell** 3-tier hierarchy makes assembly, replacement, and management easier.
3. The cold plate manages temperature, and the **BMS** watches every cell's voltage and balance — the basis of safety and lifespan.

## Files

- [`model.tsx`](model.tsx) — geometry, materials, mixed explode vectors
- [`data.ts`](data.ts) — descriptions for the 7 parts, in 4 languages (lead / detail / facts / spec / sources)
- [`CLAUDE.md`](CLAUDE.md) — AI-collaboration model spec and remaining follow-ups

## Implementation notes

- No new procedural textures — reuses shared modules: aluminum = `makeBrushedMetalTexture`, cooling channels = `makeChannelTexture`, BMS = `makeRoutingTexture`.
- Simplified for education: real cell counts (thousands per vehicle) and dimensions vary by model. Here it's simplified to 6 modules with 5 cells each, for clarity of structure.
- Making a **drive motor** as the next model completes the "electric powertrain (storage → drive)" pair.
