# Robotic Actuator — Model

> **Core question: how does a motor's fast spin become large, precise joint movement?**
> A single joint in a collaborative robot or humanoid packs a motor, a reduction gear, sensors, and bearings into one unit — an **integrated joint actuator**. The star of the show is the **harmonic drive**, which achieves roughly a 100:1 reduction ratio with just 3 parts. The first model in the robotics category.

## Structure (an axial cylinder, input → output)

| Part id | Part | Representation |
|---|---|---|
| `housing` | Housing | An aluminum cylindrical shell + cable grommet |
| `encoder` | Encoder | A slit disk (36 graduations) + reader PCB — the joint's eye |
| `motor` | Frameless BLDC | Stator + copper winding bands + a donut-shaped magnet rotor ring |
| `wavegen` | Wave generator | An **elliptical cam** + gold bearing ring — the harmonic drive's input |
| `flexspline` | Flexspline | A thin, **flexible steel cup** with external teeth — the harmonic drive's output |
| `circspline` | Circular spline | A fixed ring gear (internal teeth) — the reference |
| `crossroller` | Cross-roller bearing | 16 rollers arranged in a **90°-crossed** pattern |
| `flange` | Output flange | A bolt circle + a hollow-shaft hole — connects to the next link |

## Behavior

- **Axial exploding**: the housing opens upward → the encoder moves toward the input side (-x) → the three harmonic-drive layers (cam, cup, ring), bearing, and flange spread out **in a line** toward the output side (+x) — the concentric structure becomes visible at a glance.
- **Reduction-ratio animation**: with auto-rotate on, the input (wave generator) spins fast while the output (cup and flange) spins **slowly, in the opposite direction**. The real reduction ratio (≈100:1) would make the output look motionless, so the demo exaggerates it to 12:1 (the real figure is stated in `data.ts`).
- **Cutaway option**: reveals the concentric structure (motor ring, windings, harmonic drive, bearing) in cross-section while assembled.

## Key specs (info panel / catalog)

Frameless BLDC + strain-wave gear · reduction ratio ≈ 100:1 · rated torque ≈ 50-200 N·m · repeatability ≈ ±0.01° · absolute encoder 17-20 bit · 1 cross-roller bearing · hollow-shaft cable pass-through

## Learning points

1. **The harmonic drive's trick**: a flexible cup with 2 fewer teeth than the outer ring — for every full turn of the elliptical cam, the cup only rotates by that 2-tooth difference. 3 parts = dozens of gear stages worth of reduction, with near-zero backlash.
2. A motor is fast but weak → the reduction gear converts **speed into torque**. The output spins opposite to the input.
3. A single cross-roller bearing handles axial, radial, and moment loads all at once — keeping the joint short and rigid.
4. Chain **6-7 of these modules together and you get a robot arm** (6-7 degrees of freedom). Cables pass through the hollow shaft.

## Files

- [`model.tsx`](model.tsx) — geometry, materials, axial exploding, the reduction-ratio animation, circular-instancing helpers
- [`data.ts`](data.ts) — descriptions for the 8 parts, in 4 languages (lead / detail / facts / spec / sources)
- [`CLAUDE.md`](CLAUDE.md) — AI-collaboration model spec and remaining follow-ups

## Implementation notes

- Zero new procedural textures — only the housing reuses brushed metal; the teeth, rollers, bolts, and graduations are all placed via circular instancing (`ringInstances`).
- Simplified for education: tooth counts (hundreds in reality) and proportions are adjusted for clarity. A torque sensor and brake are omitted (mentioned in the description only).
- Making a **humanoid hand** as the next model continues the "joint → combination of joints" flow.
