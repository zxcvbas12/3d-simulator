import * as THREE from "three";

/**
 * 반도체 모델 공용 절차적 텍스처 — 캔버스로 1회 생성해 모델들이 재사용.
 * (HBM에서 출발, CPU/GPU 등 다른 다이·기판 모델이 파라미터만 바꿔 공유한다.)
 * 모든 텍스처는 sRGB + anisotropy 4 로 마감.
 * 같은 파라미터 호출은 캐시로 1장만 만든다(텍스처 예산 — 예: GPU 모델의 HBM 스택 ×4가 한 장을 공유).
 * 모듈 스코프에 살아 모델 재진입에도 재사용된다(의도된 영속 — dispose 하지 않는다).
 */
const cache = new Map<string, THREE.CanvasTexture>();
function cached(
  key: string,
  make: () => HTMLCanvasElement,
): THREE.CanvasTexture {
  let tex = cache.get(key);
  if (!tex) {
    tex = new THREE.CanvasTexture(make());
    tex.anisotropy = 4;
    tex.colorSpace = THREE.SRGBColorSpace;
    cache.set(key, tex);
  }
  return tex;
}

/** 다이 윗면 — 규칙적인 셀(뱅크/코어) 격자 + 미세 라인 + 콘택트 점. marks가 있으면 레이저 각인처럼 표기. */
export function makeDieTexture(
  hue: number,
  marks?: string[],
): THREE.CanvasTexture {
  return cached(`die:${hue}:${marks?.join("|") ?? ""}`, () => {
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
    return c;
  });
}

/** 배선층(인터포저·기판 윗면) — 촘촘한 직교 미세 배선 + 콘택트 패드 격자. line은 'A' 자리에 알파를 넣는 hsla 템플릿. */
export function makeRoutingTexture(
  base: string,
  line: string,
  density: number,
): THREE.CanvasTexture {
  return cached(`routing:${base}:${line}:${density}`, () => {
    const s = 512;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const x = c.getContext("2d")!;
    x.fillStyle = base;
    x.fillRect(0, 0, s, s);
    x.lineWidth = 1;
    for (let i = 0; i < density; i++) {
      x.strokeStyle = line.replace(
        "A",
        (0.05 + Math.random() * 0.22).toFixed(2),
      );
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
    return c;
  });
}

/** 로직/베이스 다이 윗면 — 큰 컨트롤러/PHY 블록들. */
export function makeBaseTexture(): THREE.CanvasTexture {
  return cached("base", () => {
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
    return c;
  });
}

/** 재생냉각 채널(노즐·연소실 벽) — 원통에 감기는 촘촘한 세로 채널 + 미세 결. hue로 구리/강철 톤. */
export function makeChannelTexture(hue: number): THREE.CanvasTexture {
  return cached(`channel:${hue}`, () => {
    const s = 512;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const x = c.getContext("2d")!;
    x.fillStyle = `hsl(${hue},38%,30%)`;
    x.fillRect(0, 0, s, s);
    const n = 64,
      cw = s / n; // 세로 채널(원통 둘레 방향 = U)
    for (let i = 0; i < n; i++) {
      const cx = i * cw;
      x.fillStyle = `hsla(${hue},34%,24%,1)`; // 채널 골(어두움)
      x.fillRect(cx, 0, cw * 0.45, s);
      x.fillStyle = `hsla(${hue},48%,46%,.9)`; // 리브 능선(밝음)
      x.fillRect(cx + cw * 0.45, 0, cw * 0.55, s);
      x.strokeStyle = `hsla(${hue},60%,72%,.18)`; // 하이라이트
      x.lineWidth = 1;
      x.beginPath();
      x.moveTo(cx + cw * 0.7, 0);
      x.lineTo(cx + cw * 0.7, s);
      x.stroke();
    }
    // 세로를 가로지르는 미세 용접/제조 결
    for (let i = 0; i < 90; i++) {
      const y = Math.random() * s;
      x.strokeStyle = `hsla(${hue},30%,${Math.random() < 0.5 ? 18 : 60}%,${Math.random() * 0.08})`;
      x.beginPath();
      x.moveTo(0, y);
      x.lineTo(s, y + (Math.random() - 0.5) * 2);
      x.stroke();
    }
    return c;
  });
}

/** MLI 금박 단열재(위성 버스) — 따뜻한 골드 + 불규칙하게 구겨진 주름/패싯. hue로 골드/구리 톤. */
export function makeFoilTexture(hue: number): THREE.CanvasTexture {
  return cached(`foil:${hue}`, () => {
    const s = 512;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const x = c.getContext("2d")!;
    const g = x.createLinearGradient(0, 0, s, s);
    g.addColorStop(0, `hsl(${hue},66%,54%)`);
    g.addColorStop(0.5, `hsl(${hue},72%,45%)`);
    g.addColorStop(1, `hsl(${hue},62%,52%)`);
    x.fillStyle = g;
    x.fillRect(0, 0, s, s);
    // 구겨진 포일 패싯 — 밝기 다른 작은 삼각형
    for (let i = 0; i < 460; i++) {
      const cx = Math.random() * s,
        cy = Math.random() * s,
        r = 6 + Math.random() * 24;
      x.fillStyle = `hsla(${hue},${48 + Math.random() * 28}%,${28 + Math.random() * 48}%,${0.05 + Math.random() * 0.12})`;
      x.beginPath();
      x.moveTo(cx, cy);
      x.lineTo(cx + r * (Math.random() - 0.5), cy + r * (Math.random() * 0.7 + 0.2));
      x.lineTo(cx + r * (Math.random() - 0.5), cy - r * (Math.random() * 0.7 + 0.2));
      x.closePath();
      x.fill();
    }
    // 주름선
    for (let i = 0; i < 150; i++) {
      x.strokeStyle = `hsla(${hue},42%,${Math.random() < 0.5 ? 18 : 82}%,${Math.random() * 0.18})`;
      x.lineWidth = Math.random() < 0.3 ? 1.6 : 0.8;
      let px = Math.random() * s,
        py = Math.random() * s;
      x.beginPath();
      x.moveTo(px, py);
      const segs = 2 + Math.floor(Math.random() * 3);
      for (let k = 0; k < segs; k++) {
        px += (Math.random() - 0.5) * 90;
        py += (Math.random() - 0.5) * 90;
        x.lineTo(px, py);
      }
      x.stroke();
    }
    return c;
  });
}

/** 태양전지 셀 격자 — 짙은 청색 셀 + 가는 핑거 라인 + 버스바(실버 세로띠). */
export function makeSolarTexture(): THREE.CanvasTexture {
  return cached("solar", () => {
    const s = 512;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const x = c.getContext("2d")!;
    x.fillStyle = "#0a1426"; // 셀 사이 갭(어두움)
    x.fillRect(0, 0, s, s);
    const cols = 8,
      rows = 16,
      pad = 5;
    const cw = (s - pad) / cols,
      ch = (s - pad) / rows;
    for (let i = 0; i < cols; i++)
      for (let j = 0; j < rows; j++) {
        const bx = pad + i * cw,
          by = pad + j * ch;
        const g = x.createLinearGradient(bx, by, bx + cw, by + ch);
        g.addColorStop(0, "#1c3a72");
        g.addColorStop(0.5, "#152b54");
        g.addColorStop(1, "#21407c");
        x.fillStyle = g;
        x.fillRect(bx, by, cw - pad, ch - pad);
        x.strokeStyle = "rgba(150,180,225,.12)"; // 셀 핑거
        x.lineWidth = 1;
        for (let k = 5; k < cw - pad; k += 6) {
          x.beginPath();
          x.moveTo(bx + k, by);
          x.lineTo(bx + k, by + ch - pad);
          x.stroke();
        }
      }
    x.strokeStyle = "rgba(205,218,238,.22)"; // 버스바
    x.lineWidth = 2;
    for (let i = 0; i <= cols; i++) {
      const bx = pad + i * cw - pad / 2;
      x.beginPath();
      x.moveTo(bx, 0);
      x.lineTo(bx, s);
      x.stroke();
    }
    return c;
  });
}

/** 브러시드 메탈(히트 스프레더 IHS) — 옅은 실버 + 미세 가로 결. */
export function makeBrushedMetalTexture(): THREE.CanvasTexture {
  return cached("brushed", () => {
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
      x.strokeStyle = light
        ? `rgba(255,255,255,${Math.random() * 0.06})`
        : `rgba(60,70,85,${Math.random() * 0.06})`;
      x.lineWidth = 1;
      x.beginPath();
      x.moveTo(0, y);
      x.lineTo(s, y + (Math.random() - 0.5) * 3);
      x.stroke();
    }
    return c;
  });
}
