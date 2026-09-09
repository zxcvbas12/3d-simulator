# Internal Combustion Engine — Model

> **Core question: how does exploding fuel turn into the rotation that spins the wheels?**
> An **inline-4 DOHC gasoline engine**, the kind that's been powering cars for over a century. A piston repeats the 4-stroke cycle (intake → compression → power → exhaust), and a connecting rod converts that linear motion into the crankshaft's rotation. A contrasting model to view alongside the [EV Battery](../ev-battery/) and [Drive Motor](../drive-motor/).

## Structure (top → bottom)

| Part id | Part | Representation |
|---|---|---|
| `valvecover` | Valve cover | A brushed-aluminum cover |
| `camshaft` | Camshafts (DOHC ×2) | Oval cam lobes + timing sprockets |
| `head` | Cylinder head | 4 spark plugs (gold) + combustion chambers |
| `block` | Cylinder block | A cast-iron-toned body with 4 bores |
| `piston` | Pistons ×4 | Crown + ring grooves — **heights differ according to crank phase** |
| `conrod` | Connecting rods ×4 | I-beam + big-end ring |
| `crankshaft` | Crankshaft | Offset pins + counterweights + flywheel |
| `oilpan` | Oil pan | A steel tray + drain plug |

## Behavior — vertical exploding in service-teardown order

Follows the order a real engine is torn down: **the valve cover opens** → camshafts → the head lifts off → **all 4 pistons are pulled up out of their bores** → connecting rods → the crankshaft and oil pan separate downward. Clicking a piston or rod shows "n" (`layer`).

**Detail**: the 4 exploded pistons sit at different heights — reflecting their actual crank phase (pistons 1 and 4 at top dead center, 2 and 3 at bottom dead center). This shows, through the geometry itself, how the four cylinders fire in alternating 1-3-4-2 order to keep rotation smooth.

- **4-stroke motion animation**: with auto-rotate on, the crank turns, all 4 pistons reciprocate in firing order, and the connecting rods tilt accordingly (slider-crank kinematics). Exploding it pauses the animation and returns it to a static phase pose.
- **Cutaway option**: splits the block to reveal the **piston, combustion chamber, and crankshaft in cross-section inside the bore** — combine it with the motion animation to watch a piston reciprocate inside its bore in cross-section.

## Key specs (info panel / catalog)

Inline-4 DOHC · ≈ 2.0 L · 4-stroke (Otto cycle) · compression ratio ≈ 10-13:1 · firing order 1-3-4-2 · up to ≈ 6,500 rpm · thermal efficiency ≈ 30-40%

## Learning points

1. **4 strokes**: intake, compression, power, exhaust — only the power stroke actually produces force, so the 4 cylinders take turns.
2. Piston (linear) → connecting rod → crankshaft (rotational) — the same principle as a leg pedaling a bicycle.
3. The camshaft turns at **half the crank's speed**, opening and closing valves (2 crank revolutions = 1 valve cycle).
4. A contrast with the electric powertrain — two different answers to the same problem (energy → wheel rotation).

## Files

- [`model.tsx`](model.tsx) — geometry, materials, service-order explode vectors, crank-phase calculation
- [`data.ts`](data.ts) — descriptions for the 8 parts, in 4 languages (lead / detail / facts / spec / sources)
- [`CLAUDE.md`](CLAUDE.md) — AI-collaboration model spec and remaining follow-ups

## Implementation notes

- Built with no new procedural textures — only the valve cover uses `makeBrushedMetalTexture`, everything else is PBR materials plus edges.
- Connecting rods vary in length by phase, generated via a variable builder (`buildConrod(len)`).
- Simplified for education: valves, injectors, and the timing chain are folded into the camshaft and head descriptions.
