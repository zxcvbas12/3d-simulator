# Earth Observation Satellite — Model

> **Core question: how does a satellite operate itself and observe the Earth?**
> Orbiting in low Earth orbit (LEO) to photograph the surface — essentially a telescope placed in space. Built by attaching a camera to a "bus," the common foundation left over once you remove the mission payload. The site's **first modular (central bus + face-mounted accessories)** structure model.

## Structure (central bus + face-mounted accessories, 7 parts)

| Part id | Part | Representation |
|---|---|---|
| `bus` | Body / bus | A foil (MLI)-wrapped box — the foundation for all the equipment |
| `solar` ×2 | Solar panels | Blue-cell wings on either side (±X) — power generation |
| `antenna` | High-gain antenna | One parabolic dish on top — downlinks imagery to the ground |
| `payload` | Observation camera | A telephoto barrel pointed at Earth (−Y) + gold aperture |
| `propulsion` | Propulsion module | A propellant tank (sphere) + thrusters — orbit maintenance |
| `adcs` | Reaction wheels | A wheel cluster on top — attitude control without using fuel |
| `battery` | Battery | A cell pack — stores power for eclipse periods |

> The bus, solar panels, reaction wheels, propulsion, and battery are built from the [`../satellite/`](../satellite/) shared core — this model adds only **the camera and dish**.

## Behavior

- **Exploding**: radial — each accessory separates from the bus outward along its own face (solar panels ±X, antenna and wheels toward the top, camera toward the bottom, battery +Z). The bus is the anchor.
- **Clicking**: highlights the part + shows the info panel (dimensions, basic↔detailed toggle, sources). Both solar panels share the same description.
- Rotation, zoom, selection, and the info panel are handled by the shared engine.

## Key specs

3-axis-stabilized bus + 2 solar panels · body ≈ 2×2×3 m · mass ≈ 2,000 kg · power ≈ 8 kW · payload: observation camera (GSD ~0.5 m) · antenna: high-gain ∅ ≈ 2 m (X-band) · orbit: LEO ≈ 600 km

## Files

- [`model.tsx`](model.tsx) — imports the shared core + places the camera and dish + explode vectors
- [`data.ts`](data.ts) — `...commonSatInfo` plus this variant's unique antenna/payload descriptions (4 languages)
- [`CLAUDE.md`](CLAUDE.md) — this variant's unique details (family-wide guidance is in `../satellite/CLAUDE.md`)

## Implementation notes

- Uses the **same bus core** as the communications satellite ([`../comsat/`](../comsat/)) — viewing them side by side makes the "bus + payload" structure clear.
- The new shared textures `makeFoilTexture` (MLI foil) and `makeSolarTexture` (cell grid) are shared by both satellites and future space models.
