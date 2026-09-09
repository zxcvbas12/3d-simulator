# Rocket Engine — Model

> **Core question: how is thrust produced?**
> Exploring a liquid-propellant rocket engine (gas-generator cycle · LOX/kerosene). A turbopump forces propellant in at high pressure, injectors spray and mix it, it burns in the combustion chamber, and the nozzle accelerates the exhaust to supersonic speed, producing thrust as the reaction. The site's **first body-of-revolution (cylinder/cone/bell) geometry** model.

## Structure (top → bottom, vertical thrust axis)

| Part id | Part | Representation |
|---|---|---|
| `gimbal` | Gimbal mount | Structural ring + struts at the very top — transmits thrust and steers direction (TVC) |
| `turbopump` | Turbopump | Cylindrical assembly on the side (pump + turbine + gas generator) — pressurizes the propellant |
| `injector` | Injector dome | Dome over the combustion chamber + a grid of injection orifices (instanced) |
| `chamber` | Combustion chamber | Copper-walled cylinder + throat, restrained gold glow |
| `nozzle` | Nozzle bell | The large expansion bell (lathe) — regenerative cooling channels on the surface |
| `feedlines` | Propellant lines | Oxidizer (gold) and fuel (blue) tubing + manifold ring |

## Behavior

- **Exploding**: mixed — the nozzle separates far downward, exposing the throat and injector, while the gimbal and injector move up and the turbopump and lines swing out to the side. Stagger + easing.
- **Clicking**: highlights the part (emissive) + shows the info panel (dimensions, a basic↔detailed toggle, sources).
- Rotation, zoom, selection, and the info panel are all handled by the shared engine — this folder's code is only geometry and descriptions.

## Key specs (shown in the info panel / catalog)

Thrust (sea level) ≈ 845 kN · specific impulse Isp ≈ 283 s (SL) / 312 s (vac) · chamber pressure ≈ 100 bar · propellants LOX/RP-1 (O/F ≈ 2.3) · cycle: gas generator · nozzle expansion ratio ε ≈ 16 · overall height ≈ 3.1 m

## Files

- [`model.tsx`](model.tsx) — body-of-revolution geometry (lathe nozzle/chamber, injector, turbopump, lines, gimbal), materials, explode vectors
- [`data.ts`](data.ts) — descriptions for the 6 parts, in 4 languages (lead / detail / facts / spec / sources)
- [`CLAUDE.md`](CLAUDE.md) — AI-collaboration model spec

## Implementation notes

- Added a new shared texture, `makeChannelTexture` (regenerative cooling channels); other parts reuse the existing die/metal textures.
- The chamber and nozzle use the category's accent color, copper/bronze (real regenerative-cooling chambers are a copper alloy). A restrained gold glow at the throat hints at combustion.
- Future extensions: a cross-section of the nozzle cooling channels, a 2-stage explode like HBM's.
