# Automotive — Category

A category covering a car's **powertrain** as 3D exploded views — the structure that stores energy (battery), converts it (motor/engine), and sends it to the wheels.

## Model list

| Model | Status | Core question | Exploding style |
|---|---|---|---|
| [`ev-battery/`](ev-battery/) EV Battery Pack | ✅ Learnable | **How** do small cells scale up into large energy storage | Mixed (vertical + planar) |
| [`drive-motor/`](drive-motor/) Drive Motor | ✅ Learnable | **How** is electricity converted into rotational force | Axial |
| [`combustion-engine/`](combustion-engine/) Internal Combustion Engine | ✅ Learnable | **How** is fuel converted into power | Vertical, in service-teardown order |

**Recommended order: EV Battery → Drive Motor → Internal Combustion Engine** — see the electric powertrain (storage → drive) first, then compare it to the combustion engine, which does the same job via fuel explosion.

## Shared visual language for this category

- **Explode direction**: mixed — since parts are nested and arranged within a single housing, covers/upper sections lift vertically while internal modules spread out on a plane.
- **Colors**: cyan-to-teal-green as a secondary accent for energy/electric-drive tones (cooling, cells). Metals use copper, silver, gold.
- **Shared terminology**: cell, module, pack, BMS, busbar, stator/rotor.

## Folder layout

Each model folder consists of `model.tsx` (geometry) + `data.ts` (4-language part descriptions) + `README.md` (human-facing) + `CLAUDE.md` (AI guidance). Rotation, zoom, exploding, selection, and the info panel are not in the model code — they're handled by the shared engine in [`src/shared/r3f/`](../src/shared/r3f/).

## On accuracy

Models follow representative real-world structure but are **simplified for educational purposes** (cell counts, proportions, etc. are adjusted for clarity). The dimensions in each part's `spec` field represent typical value ranges.
