import type { ThumbType } from "@shared/catalog";

/**
 * 카드/뷰어 placeholder용 CSS 모티프. (바닐라 thumbs.ts → JSX 이식)
 * 스타일은 shared/styles/shell.css의 .m-* / .stack 클래스를 그대로 쓴다.
 */
export function Thumb({ type }: { type: ThumbType }) {
  switch (type) {
    case "layers":
      return (
        <div className="m m-layers">
          {[0, 1, 2, 3, 4].map((i) => (
            <i key={i} style={{ top: i * 16 }} />
          ))}
        </div>
      );
    case "orbit":
      return (
        <div className="m m-orbit">
          <i style={{ width: 118, height: 118 }} />
          <i style={{ width: 82, height: 82 }} />
          <i style={{ width: 46, height: 46 }} />
          <i className="core" />
        </div>
      );
    case "coil":
      return (
        <div className="m m-coil">
          <i style={{ width: 116, height: 116 }} />
          <i style={{ width: 86, height: 86 }} />
          <i style={{ width: 56, height: 56 }} />
          <i className="core" />
        </div>
      );
    case "cells":
      return (
        <div className="m m-cells">
          {Array.from({ length: 8 }).map((_, i) => (
            <i key={i} />
          ))}
        </div>
      );
    case "blades":
      return (
        <div className="m m-blades">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <i key={i} style={{ transform: `translate(-50%,-100%) rotate(${i * 60}deg)` }} />
          ))}
          <span className="hub" />
        </div>
      );
    case "wave":
      return (
        <div className="m m-wave">
          <i style={{ width: 106, height: 106 }} />
          <i style={{ width: 72, height: 72 }} />
          <i style={{ width: 38, height: 38 }} />
          <span className="cross" />
        </div>
      );
    case "joint":
      return (
        <div className="m m-joint">
          <span className="seg s1" />
          <span className="seg s2" />
          <span className="pivot" />
        </div>
      );
  }
}

/** 히어로/뷰어 placeholder의 회전하는 적층 판 모티프. */
export function Stack() {
  return (
    <div className="stack">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="plate"
          style={{ transform: `translateZ(${i * 26}px)`, opacity: 0.55 + i * 0.09 }}
        />
      ))}
      {[
        [14, 14],
        [200, 14],
        [14, 200],
        [200, 200],
      ].map(([x, y], i) => (
        <div key={`pin${i}`} className="pin" style={{ left: x, top: y, transform: "translateZ(146px)" }} />
      ))}
    </div>
  );
}
