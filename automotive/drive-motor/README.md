# Drive Motor — Model

> **Core question: how does the battery's electricity become the force that turns the wheels?**
> This is the EV standard: a **permanent-magnet synchronous motor (PMSM)**. Three-phase current in the stator windings creates a rotating magnetic field, and a rotor embedded with permanent magnets follows it around. Paired with the [EV Battery Pack](../ev-battery/), it completes the "storage → drive" electric powertrain.

## Structure (a cylinder lying along the axis, outside → in)

| Part id | Part | Representation |
|---|---|---|
| `housing` | Motor housing | An aluminum cylindrical shell with cooling fins |
| `endcap` | End caps ×2 | Disks at each end + hub + bolts (bearing holders) |
| `bearing` | Bearings ×2 | An outer race + 10 steel balls (instanced) |
| `stator` | Stator | A ring of laminated steel sheets (stationary) |
| `winding` | Windings | Copper end-windings + 12 slot bars |
| `rotor` | Rotor | A steel cylinder with 16 embedded (IPM) V-shaped magnets — the V cross-section is visible at the end face |
| `shaft` | Shaft (output) | The central axle + a splined section |

## Behavior — the site's first "axial" exploding

Follows the actual order a motor is disassembled in: **the housing opens up** → the end caps and bearings slide out along the axis on either side → **the rotor and shaft slide out along the axis** → the copper windings and stator separate. Clicking an end cap or bearing shows "n" (`layer`).

- **Motion animation**: with auto-rotate on, the rotor and shaft actually spin — visible even while exploded, showing "which part rotates."
- **Cutaway option**: a clipping plane reveals the stator slots and windings in cross-section, along with the **IPM V-shaped magnet arrangement** inside the rotor. Combine it with the rotation animation to watch the cross-section spin.

## Key specs (info panel / catalog)

PMSM (IPM) · ≈ 150-300 kW · up to ≈ 16,000 rpm · 3-phase AC (inverter-driven) · NdFeB rare-earth magnets · water-jacket/oil cooling · shaft → reduction gear ≈ 9:1

## Learning points

1. Three-phase current in the stator creates a **rotating magnetic field**, and the rotor's permanent magnets follow it — hence the name "synchronous" motor.
2. Laminated steel sheets (reduce eddy-current loss), hairpin windings (improve copper fill), and embedded IPM magnets (stable at high speed) — the three pillars of modern EV motor design.
3. Rotation above 10,000 rpm passes through a reduction gear that **converts speed into torque** before it reaches the wheels.

## Files

- [`model.tsx`](model.tsx) — geometry, materials, axial explode vectors
- [`data.ts`](data.ts) — descriptions for the 7 parts, in 4 languages (lead / detail / facts / spec / sources)
- [`CLAUDE.md`](CLAUDE.md) — AI-collaboration model spec and remaining follow-ups

## Implementation notes

- Built with no new procedural textures — only the housing uses `makeBrushedMetalTexture`, everything else is PBR materials plus torus/instanced elements (fins, bolts, balls, magnets, winding bars).
- Simplified for education: magnets are actually embedded in a V shape inside the rotor (IPM), but shown here as surface slabs. The real hundreds of winding strands are also abstracted into 12 bars.
- View alongside: the category screen's "recommended order" guides viewers from [EV Battery Pack](../ev-battery/) to the drive motor.
