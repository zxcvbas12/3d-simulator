# Communications Satellite — Model

> **Core question: how does a comms satellite relay signals?**
> Sitting in geostationary orbit (GEO, 35,786 km), it receives a signal from the ground, amplifies it, and beams it back down — a relay station. It uses **the exact same bus** as the Earth observation satellite, but its payload is a transponder instead of a camera, and it broadcasts to a wide area via a large reflector pointed at Earth.

## Structure (central bus + face-mounted accessories, 7 parts)

| Part id | Part | Representation |
|---|---|---|
| `bus` | Body / bus | A foil (MLI)-wrapped box — the foundation for all the equipment |
| `solar` ×2 | Solar panels | Blue-cell wings on either side (±X) — power generation |
| `antenna` | Reflector antennas ×2 | Large reflectors pointed at Earth (+Z) — relays signals |
| `payload` | Transponder | An electronics box + waveguide horn — receives, amplifies, and retransmits |
| `propulsion` | Propulsion module | A propellant tank (sphere) + thrusters — orbit maintenance |
| `adcs` | Reaction wheels | A wheel cluster on top — attitude control without using fuel |
| `battery` | Battery | A cell pack — stores power for eclipse periods |

> The bus, solar panels, reaction wheels, propulsion, and battery are built from the [`../satellite/`](../satellite/) shared core — this model adds only **the two reflectors and the transponder**.

## Behavior

- **Exploding**: radial — reflectors move toward Earth (+Z), the transponder moves the opposite way (−Z), solar panels move ±X, wheels and battery move toward the top. The bus is the anchor.
- **Clicking**: highlights the part + shows the info panel (dimensions, basic↔detailed toggle, sources).
- Rotation, zoom, selection, and the info panel are handled by the shared engine.

## Key specs

3-axis-stabilized bus + 2 solar panels · body ≈ 2×2×3 m · mass ≈ 2,000 kg · power ≈ 8 kW · payload: transponder (multiple channels) · antenna: 2 reflectors ∅ ≈ 2.5 m (Ku/Ka-band) · orbit: GEO 35,786 km

## Files

- [`model.tsx`](model.tsx) — imports the shared core + places the 2 reflectors and transponder + explode vectors
- [`data.ts`](data.ts) — `...commonSatInfo` plus this variant's unique antenna/payload descriptions (4 languages)
- [`CLAUDE.md`](CLAUDE.md) — this variant's unique details (family-wide guidance is in `../satellite/CLAUDE.md`)

## Implementation notes

- Shares its core with the Earth observation satellite ([`../eo-satellite/`](../eo-satellite/)). "Observation stays close (LEO), communications stays put (GEO)" — the mission determines both the orbit and the payload.
- The reflectors are the shared `buildDish` rotated to face Earth (`rotation.x=-π/2`) and placed on either side.
