# CPU Chiplet Package — Model

> **Core question: why split a chip up?**
> Modern CPUs aren't one large die holding every core — they gather several small **chiplets** into a single package. The bigger a die is, the higher its defect probability, so splitting it up smaller means **higher yield, lower cost**, and adding more chiplets scales the core count flexibly. This model shows the **planar layout** that contrasts with HBM's vertical stacking.

## Structure (bottom → top, chiplets arranged on a plane)

| Part id | Part | Representation |
|---|---|---|
| `substrate` | Package substrate | Base. Brown-family routing texture |
| `lga` | LGA land grid | 16×16 grid of **flat gold contacts** on the underside of the substrate (not balls — the pins are on the socket side) |
| `iod` | I/O die | Center. Hub for memory, PCIe, and inter-chiplet communication. Gold tone + "IOD" mark |
| `ccd` | Compute chiplets ×2 | On either side of the I/O die. Small dies containing the cores. Blue + "CCD" mark |
| `tim` | TIM (thermal interface material) | Thin translucent layer between the dies and the lid |
| `ihs` | Integrated heat spreader | Brushed-metal cover |

## Behavior — planar-centered mixed exploding

- The IHS and TIM move up (vertical), the substrate moves down.
- **The two compute chiplets spread outward to either side** (planar), revealing the chiplet layout on the substrate — a contrast to HBM's "spreads upward" exploding.

## Key specs (shown in the info panel / catalog)

CCD ×2 + I/O die · package ≈ 40 × 40 mm · compute chiplet ≈ 70 mm² (5 nm) · I/O die ≈ 120 mm² (6 nm) · LGA 1,000+ lands · Ni-plated Cu IHS

## Learning points (reflected in the info panel's facts)

1. Chiplets = splitting a large die into several small dies → only defective dies need to be discarded, so **yield goes up, cost goes down**.
2. The I/O die is the hub connecting the chiplets to memory and the outside world — the compute chiplets focus purely on computation.
3. The IHS and TIM spread heat that would otherwise concentrate in one spot, passing it on to the cooler.
4. LGA (flat lands) vs. PGA (pins) vs. BGA (solder balls) — a comparison of package-to-board connection methods.

## Files

- [`model.tsx`](model.tsx) — geometry, materials, mixed explode vectors
- [`data.ts`](data.ts) — descriptions for the 6 parts, in 4 languages (lead / detail / facts / spec)
- [`CLAUDE.md`](CLAUDE.md) — AI-collaboration model spec

## Implementation notes

- The shared procedural texture module (`src/shared/r3f/textures.ts`) was split out from this model — textures that had been HBM-specific were parameterized so CPU and GPU could reuse them.
- Worth viewing alongside the GPU model: GPU is "one large die + memory beside it," CPU is "several small dies" — the same packaging technology solving a different problem.
