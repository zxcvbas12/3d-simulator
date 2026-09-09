# Robotics — Category

A category covering the core parts that let a robot **move and sense**, shown as 3D exploded views — a single joint (actuator) → a combination of joints (a hand) → an eye (lidar).

## Model list

| Model | Status | Core question | Exploding style |
|---|---|---|---|
| [`actuator/`](actuator/) Robotic Actuator | ✅ Learnable | **How** does a motor's fast spin become precise joint movement | Axial + concentric |
| `humanoid-hand/` Humanoid Hand | ⏳ Coming soon | **How** do joints come together to form a hand | Multi-joint (planned) |
| `lidar/` Lidar | ⏳ Coming soon | **How** does a robot see distance | Concentric (planned) |

## Shared visual language for this category

- **Explode direction**: axial + concentric — lift the housing off a cylindrical module and spread the interior out in a line along the axis.
- **Colors**: metallic machine tones (silver, steel) with copper/gold functional accents (windings, bearings, cams).
- **Shared terminology**: actuator, harmonic drive / strain wave gear, encoder, torque, degrees of freedom (DOF), hollow bore.

## Folder layout

Each model folder consists of `model.tsx` (geometry) + `data.ts` (4-language part descriptions) + `README.md` (human-facing) + `CLAUDE.md` (AI guidance). Rotation, zoom, exploding, selection, and the info panel are handled by the shared engine in [`src/shared/r3f/`](../src/shared/r3f/).

## On accuracy

Models follow representative real-world structure but are **simplified for educational purposes** (tooth counts, proportions, etc. are adjusted for clarity). The dimensions in each part's `spec` field represent typical value ranges.
