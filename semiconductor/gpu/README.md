# GPU Package — Model

> **Core question: why put memory right next to the processor?**
> An AI-accelerator-class GPU isn't a single chip — it's a package. HBM stacks sit on either side of a large compute die, connected by thousands of traces on a silicon interposer: **2.5D packaging**. Shorter data distances mean higher bandwidth and lower power. A large compute die plus memory beside it is the basic shape of a modern AI accelerator.

## Structure (bottom → top, some planar layout)

| Part id | Part | Representation |
|---|---|---|
| `substrate` | Package substrate | The largest base. Navy routing texture |
| `bga` | BGA solder balls | 16×16 grid of silver balls on the underside of the substrate |
| `interposer` | Silicon interposer | Gray plate carrying both the GPU and the HBM stacks. Gold C4 bumps on the bottom |
| `gpudie` | GPU compute die | The large die in the center. **Teal accent color** + "GPU" mark (distinguishes it from the blue-family memory) |
| `hbm` | HBM stacks ×4 | Two on each side of the GPU. A simplified version of the HBM model's geometry (base + 4 DRAM layers + "HBM" mark) |
| `lid` | Heat-spreader lid | Brushed-metal cover over the whole package |

## Behavior — mixed exploding + 2 stages

- **Vertical**: the lid lifts up, the substrate drops down, the GPU die is raised.
- **Planar**: the 4 HBM stacks fan out **outward** and lift slightly — revealing their placement on the interposer.
- **2 stages**: in the second half of the explode range (t > 0.6), each HBM stack's internal layers spread apart further (`update` hook). Detailed layer structure is handled by the [HBM model](../hbm/), so it's simplified here.

## Options (top-left viewer toggle)

- **HBM stacks** — ×4 (default) / ×2: change how many stacks are configured.
- **Lid** — ON / OFF: view a bare-die look with the lid removed (a common look for datacenter GPUs).

## Key specs (shown in the info panel / catalog)

GPU die + HBM ×4 (2.5D) · package ≈ 70 × 70 mm · compute die ≈ 800 mm² (reticle limit) · 4 nm · HBM ≈ 1 TB/s/stack · Si interposer ≈ 2,500 mm² · BGA 1,000+ balls · Ni-plated Cu lid

## Learning points (reflected in the info panel's facts)

1. Placing HBM a few mm from the GPU shortens and widens the data path — **higher bandwidth, lower power**.
2. The interposer connects the two chips with thousands of fine traces — placing chips side by side and connecting them through silicon is **2.5D**.
3. A compute die pushed to the lithography (reticle) limit, plus memory beside it, is the basic shape of an AI accelerator.

## Files

- [`model.tsx`](model.tsx) — geometry, materials, mixed explode vectors, the stack's 2-stage update hook
- [`data.ts`](data.ts) — descriptions for the 6 parts, in 4 languages (lead / detail / facts / spec)
- [`CLAUDE.md`](CLAUDE.md) — AI-collaboration model spec

## Implementation notes

- The HBM stacks' die and routing textures share the shared module's cache — even with 4 stacks, each texture is generated only once.
- In the assembled state (t=0), the lid normally covers everything — that's the real-world appearance; the explode slider is what reveals the interior.
