# Reentry Capsule — Model

> **Core question: falling at 28,000 km/h, how does it return without burning up and keep its crew alive?**
> A crewed capsule for the "return" phase, bringing people home from orbit. Its blunt body sheds heat via the shock wave, an ablative heat shield burns away and carries off the remaining heat, the atmosphere decelerates it, and a parachute finishes the job. The **final model** in the space category, closing the launch → orbit → return story.

## Structure (concentric shells + upper/lower sections, 7 parts)

| Part id | Part | Representation |
|---|---|---|
| `heatshield` | Heat shield | An ablative spherical cap at the bottom — copper/charred tones (`makeAblativeTexture`) |
| `backshell` | Backshell / outer shell | A truncated cone of thermal protection + MLI foil patches |
| `pressure-vessel` | Pressure vessel | The titanium structure inside the backshell — maintains 1 atmosphere |
| `interior` | Interior | 3 seats + avionics boxes — absorbs 4-8 g |
| `rcs` | Reaction control thrusters | 8 small nozzles around the shell — controls entry angle and lift |
| `parachute` | Parachute | A canister on top + canopy (white/orange) |
| `hatch` | Hatch / docking | A docking ring on top + a side hatch + window |

## Behavior

- **Exploding**: peeling back concentric shells — the heat shield drops away (direction of travel), the backshell and pressure vessel telescope upward, peeling back 3 layers of shell and revealing the interior (seats, avionics). The parachute moves up, the hatch and RCS move sideways.
- **Clicking**: highlights the part + shows the info panel (dimensions, basic↔detailed toggle, sources).
- Rotation, zoom, selection, and the info panel are handled by the shared engine.

## Key specs

Blunt-cone capsule · base ∅ ≈ 5 m · height ≈ 3.3 m · mass ≈ 9 t · crew of 3-4 · reentry speed ≈ 7.8 km/s (from LEO) · ablative heat shield · deceleration via atmosphere + parachutes (drogue + 3 mains)

## Files

- [`model.tsx`](model.tsx) — concentric-shell geometry (lathe heat shield, cone backshell/pressure vessel, instanced RCS, box seats, torus docking ring), explode vectors
- [`data.ts`](data.ts) — descriptions for the 7 parts, in 4 languages (lead / detail / facts / spec / sources)
- [`CLAUDE.md`](CLAUDE.md) — AI-collaboration model spec

## Implementation notes

- Added a new shared texture, `makeAblativeTexture` (charred ablative surface); the backshell's foil patches reuse the same `makeFoilTexture` used by the satellites.
- Key learning point: a **blunt body** pushes the shock wave ahead of it, shedding most of the heat away from the capsule (counterintuitive), and the ablative shield is deliberately sacrificial, burning away to carry heat off with it. Deceleration is the atmosphere's job, not thrust.
