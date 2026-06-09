import type { ThumbType } from "@shared/catalog";

/**
 * 카드/뷰어용 CSS 모티프 마크업. (시안 homepage-mockup-v2.html의 thumbMarkup/stackMarkup 이식)
 * 실제 3D 뷰어가 붙기 전까지의 시각적 자리표시이자, 카테고리별 시각 정체성.
 */
export function thumbMarkup(type: ThumbType): string {
  switch (type) {
    case "layers": {
      let s = "";
      for (let i = 0; i < 5; i++) s += `<i style="top:${i * 16}px"></i>`;
      return `<div class="m m-layers">${s}</div>`;
    }
    case "orbit":
      return `<div class="m m-orbit"><i style="width:118px;height:118px"></i><i style="width:82px;height:82px"></i><i style="width:46px;height:46px"></i><i class="core"></i></div>`;
    case "coil":
      return `<div class="m m-coil"><i style="width:116px;height:116px"></i><i style="width:86px;height:86px"></i><i style="width:56px;height:56px"></i><i class="core"></i></div>`;
    case "cells": {
      let s = "";
      for (let i = 0; i < 8; i++) s += "<i></i>";
      return `<div class="m m-cells">${s}</div>`;
    }
    case "blades": {
      let s = "";
      for (let i = 0; i < 6; i++) s += `<i style="transform:translate(-50%,-100%) rotate(${i * 60}deg)"></i>`;
      return `<div class="m m-blades">${s}<span class="hub"></span></div>`;
    }
    case "wave":
      return `<div class="m m-wave"><i style="width:106px;height:106px"></i><i style="width:72px;height:72px"></i><i style="width:38px;height:38px"></i><span class="cross"></span></div>`;
    case "joint":
      return `<div class="m m-joint"><span class="seg s1"></span><span class="seg s2"></span><span class="pivot"></span></div>`;
  }
}

/** 히어로/뷰어 placeholder의 회전하는 적층 판 모티프. */
export function stackMarkup(): string {
  let plates = "";
  for (let i = 0; i < 5; i++) {
    plates += `<div class="plate" style="transform:translateZ(${i * 26}px);opacity:${0.55 + i * 0.09}"></div>`;
  }
  const corners = [
    [14, 14],
    [200, 14],
    [14, 200],
    [200, 200],
  ];
  for (const [x, y] of corners) {
    plates += `<div class="pin" style="left:${x}px;top:${y}px;transform:translateZ(146px)"></div>`;
  }
  return `<div class="stack">${plates}</div>`;
}
