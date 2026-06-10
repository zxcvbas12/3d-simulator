import * as THREE from "three";

/**
 * 반도체 모델 공용 절차적 텍스처 — 캔버스로 1회 생성해 모델들이 재사용.
 * (HBM에서 출발, CPU/GPU 등 다른 다이·기판 모델이 파라미터만 바꿔 공유한다.)
 * 모든 텍스처는 sRGB + anisotropy 4 로 마감.
 */
function finish(c: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** 다이 윗면 — 규칙적인 셀(뱅크/코어) 격자 + 미세 라인 + 콘택트 점. marks가 있으면 레이저 각인처럼 표기. */
export function makeDieTexture(hue: number, marks?: string[]): THREE.CanvasTexture {
  const s = 512;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const x = c.getContext("2d")!;
  x.fillStyle = `hsl(${hue},42%,15%)`;
  x.fillRect(0, 0, s, s);
  const pad = 28,
    cells = 8,
    gap = 6,
    cw = (s - pad * 2 - gap * (cells - 1)) / cells;
  for (let i = 0; i < cells; i++)
    for (let j = 0; j < cells; j++) {
      const bx = pad + i * (cw + gap),
        by = pad + j * (cw + gap);
      x.fillStyle = `hsla(${hue},44%,${20 + Math.random() * 8}%,.85)`;
      x.fillRect(bx, by, cw, cw);
      x.strokeStyle = `hsla(${hue},60%,62%,.16)`;
      x.lineWidth = 1;
      x.strokeRect(bx, by, cw, cw);
      x.strokeStyle = `hsla(${hue},55%,60%,.07)`;
      for (let k = 4; k < cw; k += 4) {
        x.beginPath();
        x.moveTo(bx, by + k);
        x.lineTo(bx + cw, by + k);
        x.stroke();
      }
    }
  x.fillStyle = `hsla(${hue},50%,30%,.6)`;
  x.fillRect(0, s / 2 - 7, s, 14);
  x.strokeStyle = `hsla(${hue},70%,70%,.25)`;
  x.strokeRect(0, s / 2 - 7, s, 14);
  for (let i = 0; i < 160; i++) {
    x.fillStyle = `hsla(${hue},55%,72%,${Math.random() * 0.5})`;
    x.fillRect(Math.random() * s, Math.random() * s, 2, 2);
  }
  if (marks && marks.length) {
    x.fillStyle = "rgba(220,232,255,.55)";
    x.font = "bold 30px monospace";
    x.fillText(marks[0], 30, s - 46);
    if (marks[1]) {
      x.font = "18px monospace";
      x.fillStyle = "rgba(180,200,235,.4)";
      x.fillText(marks[1], 30, s - 22);
    }
  }
  return finish(c);
}

/** 배선층(인터포저·기판 윗면) — 촘촘한 직교 미세 배선 + 콘택트 패드 격자. line은 'A' 자리에 알파를 넣는 hsla 템플릿. */
export function makeRoutingTexture(base: string, line: string, density: number): THREE.CanvasTexture {
  const s = 512;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const x = c.getContext("2d")!;
  x.fillStyle = base;
  x.fillRect(0, 0, s, s);
  x.lineWidth = 1;
  for (let i = 0; i < density; i++) {
    x.strokeStyle = line.replace("A", (0.05 + Math.random() * 0.22).toFixed(2));
    x.beginPath();
    let px = Math.random() * s,
      py = Math.random() * s;
    x.moveTo(px, py);
    const segs = 2 + Math.floor(Math.random() * 3);
    for (let k = 0; k < segs; k++) {
      if (Math.random() < 0.5) px += (Math.random() - 0.5) * 120;
      else py += (Math.random() - 0.5) * 120;
      x.lineTo(px, py);
    }
    x.stroke();
  }
  for (let i = 0; i < 24; i++)
    for (let j = 0; j < 24; j++) {
      if (Math.random() < 0.4) continue;
      x.fillStyle = line.replace("A", (0.1 + Math.random() * 0.3).toFixed(2));
      x.fillRect(8 + i * 21, 8 + j * 21, 3, 3);
    }
  return finish(c);
}

/** 로직/베이스 다이 윗면 — 큰 컨트롤러/PHY 블록들. */
export function makeBaseTexture(): THREE.CanvasTexture {
  const s = 512;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const x = c.getContext("2d")!;
  x.fillStyle = "#1b2533";
  x.fillRect(0, 0, s, s);
  const blocks = [
    [24, 24, 200, 150],
    [250, 24, 238, 150],
    [24, 200, 150, 288],
    [200, 200, 288, 160],
    [200, 380, 288, 108],
  ];
  blocks.forEach((b) => {
    x.fillStyle = "rgba(90,130,200,.16)";
    x.fillRect(b[0], b[1], b[2], b[3]);
    x.strokeStyle = "rgba(140,180,255,.28)";
    x.lineWidth = 1.5;
    x.strokeRect(b[0], b[1], b[2], b[3]);
    for (let k = 8; k < b[2]; k += 8) {
      x.strokeStyle = "rgba(120,160,230,.06)";
      x.beginPath();
      x.moveTo(b[0] + k, b[1]);
      x.lineTo(b[0] + k, b[1] + b[3]);
      x.stroke();
    }
  });
  return finish(c);
}

/** 브러시드 메탈(히트 스프레더 IHS) — 옅은 실버 + 미세 가로 결. */
export function makeBrushedMetalTexture(): THREE.CanvasTexture {
  const s = 512;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const x = c.getContext("2d")!;
  const g = x.createLinearGradient(0, 0, s, s);
  g.addColorStop(0, "#ced4dc");
  g.addColorStop(0.5, "#aab2bd");
  g.addColorStop(1, "#c6ccd5");
  x.fillStyle = g;
  x.fillRect(0, 0, s, s);
  for (let i = 0; i < 2600; i++) {
    const y = Math.random() * s;
    const light = Math.random() < 0.5;
    x.strokeStyle = light ? `rgba(255,255,255,${Math.random() * 0.06})` : `rgba(60,70,85,${Math.random() * 0.06})`;
    x.lineWidth = 1;
    x.beginPath();
    x.moveTo(0, y);
    x.lineTo(s, y + (Math.random() - 0.5) * 3);
    x.stroke();
  }
  return finish(c);
}
