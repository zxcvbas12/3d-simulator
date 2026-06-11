import type { PartInfoMap } from "@app/shared/r3f/model";

/**
 * 재진입 캡슐(유인) 부품 설명(다국어).
 * 핵심: 무딘 몸체가 충격파로 열을 떼어내고, 융제 차폐막이 타며 열을 가져가고,
 * 대기가 감속하고, 낙하산이 마무리한다. 여압 동체·좌석이 승무원을 지킨다.
 */
export const reentryCapsuleInfo: PartInfoMap = {
  heatshield: {
    tag: { ko: "HEAT SHIELD", en: "HEAT SHIELD", ja: "HEAT SHIELD", zh: "HEAT SHIELD" },
    spec: "ablative · base ∅ ≈ 5 m · 2,500–3,000°C",
    sources: [
      { label: "Wikipedia · Heat shield", url: "https://en.wikipedia.org/wiki/Heat_shield" },
      { label: "Wikipedia · Atmospheric entry", url: "https://en.wikipedia.org/wiki/Atmospheric_entry" },
    ],
    title: { ko: "열 차폐막 (Heat Shield)", en: "Heat Shield", ja: "ヒートシールド", zh: "热防护盾" },
    lead: {
      ko: "바닥의 둥근 방패예요. 재진입 때 가장 뜨거운 면으로, 캡슐과 승무원을 불길에서 지킵니다.",
      en: "The round shield on the bottom — the hottest surface on reentry, protecting capsule and crew from the fire.",
      ja: "底の丸い盾。再突入で最も高温になる面で、カプセルと乗員を炎から守ります。",
      zh: "底部的圆形盾——再入时最热的面，保护舱体与乘员免受烈焰。",
    },
    detail: {
      ko: "캡슐은 시속 28,000 km로 대기에 부딪히며 앞 공기를 압축해 3,000°C에 가까운 불덩이를 만듭니다. 비결은 \"무딘\" 모양이에요. 뾰족하면 열이 표면에 달라붙지만, 무딘 바닥은 충격파를 캡슐에서 멀찍이 앞으로 밀어내 열의 대부분을 공기로 흘려보냅니다. 그래도 남는 열은 융제(ablative) 차폐막이 받아냅니다 — 표면이 일부러 타고 증발하면서 그 열을 함께 가지고 떨어져 나가, 안쪽은 차갑게 유지돼요. 그래서 차폐막은 한 번 쓰면 새까맣게 탑니다.",
      en: "The capsule slams into the atmosphere at 28,000 km/h, compressing the air ahead into a fireball near 3,000°C. The trick is the \"blunt\" shape: a sharp nose would let the heat cling to the surface, but a blunt base pushes the shock wave well ahead of the capsule, shedding most of the heat into the air. The remainder is taken by the ablative shield — its surface deliberately chars and vaporizes, carrying that heat away as it peels off, so the inside stays cool. That is why the shield comes back charred black.",
      ja: "カプセルは時速 28,000 km で大気に突入し、前方の空気を圧縮して 3,000°C 近い火球を作ります。鍵は「鈍い」形。尖っていると熱が表面に張り付きますが、鈍い底面は衝撃波をカプセルのずっと前へ押し出し、熱の大半を空気へ逃がします。残りは融除（ablative）シールドが受け止めます。表面がわざと焦げて気化し、その熱を持って剥がれ落ちるため内側は冷たいまま。だからシールドは真っ黒に焦げて戻ります。",
      zh: "舱体以时速 28,000 km 撞入大气，把前方空气压缩成接近 3,000°C 的火球。诀窍在于“钝”形：尖头会让热量贴附表面，而钝底把激波远远推到舱体前方，将大部分热量带入空气。剩余的由烧蚀（ablative）盾承担——其表面故意烧焦汽化，携热剥落，因此内部保持凉爽。这就是热盾返回时焦黑的原因。",
    },
    facts: {
      ko: ["역할 — 재진입 열로부터 보호", "무딘 몸체가 충격파로 열을 떼어냄", "융제: 타며 열을 가져감(희생식)"],
      en: ["Role — shield from reentry heat", "Blunt body sheds heat via shock wave", "Ablative: chars away, taking heat (sacrificial)"],
      ja: ["役割 — 再突入熱から保護", "鈍い形が衝撃波で熱を逃がす", "融除：焦げて熱を持ち去る（犠牲式）"],
      zh: ["作用 — 抵御再入热", "钝体借激波带走热量", "烧蚀：焦化携热剥落（牺牲式）"],
    },
  },
  backshell: {
    tag: { ko: "BACKSHELL · TPS", en: "BACKSHELL · TPS", ja: "BACKSHELL · TPS", zh: "BACKSHELL · TPS" },
    spec: "conical TPS · half-angle ~ 33°",
    sources: [{ label: "Wikipedia · Thermal protection system", url: "https://en.wikipedia.org/wiki/Thermal_protection_system_(spacecraft)" }],
    title: { ko: "백셸 / 외피 (Backshell)", en: "Backshell", ja: "バックシェル（外殻）", zh: "后壳（外壳）" },
    lead: {
      ko: "캡슐의 옆·뒤를 덮는 원뿔 껍데기예요. 바닥만큼은 아니어도 옆면의 열을 막습니다.",
      en: "The conical shell over the sides and back — it blocks the side heating, though less intense than the base.",
      ja: "カプセルの側面・後方を覆う円錐の殻。底ほどではない側面の熱を防ぎます。",
      zh: "覆盖舱体侧面与后部的锥形外壳，抵御侧向加热（不及底面剧烈）。",
    },
    detail: {
      ko: "재진입 때 가장 뜨거운 곳은 바닥(열 차폐막)이지만, 옆면과 뒤쪽에도 뜨거운 가스가 휘감겨 흐릅니다. 백셸은 이 부분을 덮는 더 가벼운 열보호(TPS)예요. 무딘 원뿔 모양은 단지 열 때문만이 아니라, 무게중심을 한쪽으로 살짝 치우치게 해 캡슐이 \"양력\"을 약간 내도록 합니다. 이 양력을 RCS로 굴려 진입 각도와 착륙 지점을 조절하죠. 겉의 금박 패치는 위성과 같은 다층 단열(MLI)로, 우주 구간의 온도차를 막습니다.",
      en: "The hottest spot on reentry is the base (heat shield), but hot gas also wraps around the sides and back. The backshell is the lighter thermal protection (TPS) covering those areas. Its blunt cone shape is not only about heat: with the center of mass offset slightly, the capsule generates a little \"lift,\" which the RCS rolls around to steer the entry angle and landing point. The gold MLI patches on the outside are the same multi-layer insulation as on satellites, handling the temperature swings of the space phase.",
      ja: "再突入で最も高温なのは底（ヒートシールド）ですが、側面や後方にも高温ガスが回り込みます。バックシェルはそこを覆う、より軽い熱防護（TPS）です。鈍い円錐形は熱だけでなく、重心を少しずらすことでカプセルにわずかな「揚力」を生ませます。この揚力を RCS で回して進入角と着地点を調整します。外側の金箔パッチは衛星と同じ多層断熱（MLI）で、宇宙区間の温度差に対応します。",
      zh: "再入时最热的是底部（热盾），但侧面与后部也会有高温气体绕流。后壳是覆盖这些区域的较轻热防护（TPS）。其钝锥外形不只为隔热：把质心稍微偏置，可让舱体产生少许“升力”，再由 RCS 滚转来调节进入角与落点。外侧的金箔贴片与卫星相同，是多层隔热（MLI），应对太空段的温差。",
    },
    facts: {
      ko: ["역할 — 옆·뒤 열보호(가벼운 TPS)", "무게중심 치우침 → 약한 양력으로 조향", "겉 금박 = MLI 단열(위성과 동일)"],
      en: ["Role — side/back thermal protection", "Offset CoM → lift for steering", "Gold patches = MLI insulation"],
      ja: ["役割 — 側面・後方の熱防護", "重心ずらし → 揚力で操舵", "金箔 = MLI 断熱（衛星と同じ）"],
      zh: ["作用 — 侧后热防护（轻 TPS）", "质心偏置 → 升力操控", "金箔 = MLI 隔热（同卫星）"],
    },
  },
  "pressure-vessel": {
    tag: { ko: "PRESSURE VESSEL", en: "PRESSURE VESSEL", ja: "PRESSURE VESSEL", zh: "PRESSURE VESSEL" },
    spec: "holds 1 atm · titanium structure",
    sources: [{ label: "Wikipedia · Space capsule", url: "https://en.wikipedia.org/wiki/Space_capsule" }],
    title: { ko: "여압 동체 (Pressure Vessel)", en: "Pressure Vessel", ja: "与圧構体", zh: "增压舱体" },
    lead: {
      ko: "열보호 껍데기 안쪽의 진짜 \"방\"이에요. 진공 속에서 사람이 숨 쉴 공기를 가둡니다.",
      en: "The real \"room\" inside the thermal shells — it holds the breathable air against the vacuum.",
      ja: "熱防護の殻の内側にある本当の「部屋」。真空の中で呼吸できる空気を閉じ込めます。",
      zh: "热防护外壳内部真正的“房间”——在真空中封住可供呼吸的空气。",
    },
    detail: {
      ko: "우주는 진공이라 안과 밖의 압력 차(약 1기압)가 동체를 풍선처럼 밖으로 밀어냅니다. 여압 동체는 이 힘을 견디며 내부를 1기압으로 유지하는 튼튼한 금속 구조예요. 보통 가볍고 강한 티타늄 합금으로 만들고, 바깥의 열 차폐막·백셸이 열을 막는 동안 이 안쪽 구조는 기밀과 강도를 책임집니다. 즉 \"열은 바깥 껍질이, 공기·구조는 안쪽 동체가\" 나눠 맡는 셈이죠. 작은 창도 이 동체에 압력을 견디는 두꺼운 유리로 답니다.",
      en: "Space is a vacuum, so the pressure difference (about 1 atm) pushes the hull outward like a balloon. The pressure vessel is the strong metal structure that resists this and keeps the interior at 1 atmosphere. It is usually made of light, strong titanium alloy; while the outer heat shield and backshell block the heat, this inner structure handles airtightness and strength. In other words, the outer shells take the heat while the inner vessel takes the air and loads. The small windows are thick pressure-rated glass set into this vessel.",
      ja: "宇宙は真空なので、内外の圧力差（約 1 気圧）が構体を風船のように外へ押します。与圧構体はこれに耐え、内部を 1 気圧に保つ頑丈な金属構造です。多くは軽く強いチタン合金製で、外側のヒートシールドやバックシェルが熱を防ぐ間、この内側構造が気密と強度を担います。つまり「熱は外殻、空気と構造は内側構体」が分担します。小さな窓もこの構体に圧力対応の厚いガラスで取り付けます。",
      zh: "太空是真空，内外约 1 个大气压的压差像气球一样把舱体往外推。增压舱体是抵御此力、把内部维持在 1 个大气压的坚固金属结构，通常用轻而强的钛合金制成；外侧热盾与后壳挡热的同时，这一内层结构负责气密与强度。也就是“外壳挡热、内体承气与受力”分工。小舷窗也用耐压厚玻璃嵌入该舱体。",
    },
    facts: {
      ko: ["역할 — 1기압 유지 + 구조 강도", "진공의 압력 차를 견딤", "보통 티타늄 합금(가볍고 강함)"],
      en: ["Role — holds 1 atm + structural strength", "Resists the vacuum pressure difference", "Usually titanium alloy (light, strong)"],
      ja: ["役割 — 1気圧維持 + 構造強度", "真空の圧力差に耐える", "多くはチタン合金（軽く強い）"],
      zh: ["作用 — 维持 1 atm + 结构强度", "承受真空压差", "多为钛合金（轻而强）"],
    },
  },
  interior: {
    tag: { ko: "CREW INTERIOR", en: "CREW INTERIOR", ja: "CREW INTERIOR", zh: "CREW INTERIOR" },
    spec: "3–4 crew · absorbs 4–8 g",
    sources: [{ label: "Wikipedia · g-force (human tolerance)", url: "https://en.wikipedia.org/wiki/G-force#Human_tolerance" }],
    title: { ko: "내부 — 좌석·항전 (Interior)", en: "Interior — Seats & Avionics", ja: "内部 — 座席・アビオニクス", zh: "内部 — 座椅与航电" },
    lead: {
      ko: "승무원이 타는 공간이에요. 좌석과 컴퓨터가 사람을 충격과 혼란 없이 데려옵니다.",
      en: "The space the crew rides in — seats and computers bring them home without shock or chaos.",
      ja: "乗員が乗る空間。座席とコンピュータが、衝撃も混乱もなく人を連れ帰ります。",
      zh: "乘员乘坐的空间——座椅与计算机让人平稳无虞地返回。",
    },
    detail: {
      ko: "재진입과 착륙 순간에는 몸무게의 4~8배에 달하는 힘(g)이 승무원을 짓누릅니다. 좌석(couch)은 몸을 눕혀 이 힘을 등 전체로 고르게 받게 하고, 충격 흡수 장치로 착륙 충격을 누그러뜨려요. 항전 컴퓨터는 진입 각도를 실시간으로 계산해 RCS와 낙하산을 제때 작동시키고, 생명유지장치는 공기·온도·이산화탄소를 관리합니다. 우주선에서 가장 중요한 \"탑재체\"가 바로 사람이라, 이 모든 설계의 목적은 그들을 안전하게 살려 보내는 것입니다.",
      en: "During reentry and landing, forces of 4–8 times body weight (g) press on the crew. The couches lay the body down so the load spreads evenly across the back, and shock absorbers soften the landing impact. The avionics computer calculates the entry angle in real time and fires the RCS and parachutes on cue, while life support manages air, temperature and carbon dioxide. The most important \"payload\" of a spacecraft is the people — so the purpose of all this design is to bring them home alive.",
      ja: "再突入と着陸の瞬間、乗員には体重の 4〜8 倍の力（g）がかかります。座席（カウチ）は体を寝かせてこの力を背中全体で均一に受けさせ、衝撃吸収装置で着陸の衝撃を和らげます。アビオニクスは進入角をリアルタイムで計算し、RCS と落下傘を適時作動させ、生命維持装置は空気・温度・二酸化炭素を管理します。宇宙船で最も重要な「ペイロード」は人なので、これら設計の目的は彼らを無事に連れ帰ることです。",
      zh: "在再入与着陆瞬间，乘员承受体重 4–8 倍的力（g）。座椅（卧式）让身体平躺，把载荷均匀分散到整个背部，并由缓冲装置减轻着陆冲击。航电计算机实时计算进入角，按时触发 RCS 与降落伞，生命保障系统管理空气、温度与二氧化碳。航天器最重要的“载荷”就是人，因此这一切设计的目的就是把他们安全带回。",
    },
    facts: {
      ko: ["역할 — 승무원 보호·제어", "좌석이 4~8 g 충격을 분산·흡수", "항전이 진입·낙하산 타이밍 계산"],
      en: ["Role — protect & control the crew", "Couches spread/absorb 4–8 g", "Avionics times entry & parachutes"],
      ja: ["役割 — 乗員保護・制御", "座席が 4〜8 g を分散・吸収", "アビオニクスが進入・落下傘を計時"],
      zh: ["作用 — 保护与控制乘员", "座椅分散吸收 4–8 g", "航电计算进入与开伞时机"],
    },
  },
  rcs: {
    tag: { ko: "ATTITUDE · RCS", en: "ATTITUDE · RCS", ja: "ATTITUDE · RCS", zh: "ATTITUDE · RCS" },
    spec: "thrusters · controls entry angle & lift",
    sources: [{ label: "Wikipedia · Reaction control system", url: "https://en.wikipedia.org/wiki/Reaction_control_system" }],
    title: { ko: "자세 제어 추력기 (RCS)", en: "RCS Thrusters", ja: "姿勢制御スラスタ（RCS）", zh: "姿态控制推力器（RCS）" },
    lead: {
      ko: "캡슐 둘레의 작은 분사구들이에요. 어느 쪽을 향할지, 어디로 떨어질지를 조절합니다.",
      en: "The small jets around the capsule — they control which way it faces and where it comes down.",
      ja: "カプセル周りの小さな噴射口。どちらを向き、どこへ降りるかを制御します。",
      zh: "舱体周围的小喷口——控制朝向与落点。",
    },
    detail: {
      ko: "재진입에서 가장 위험한 건 각도예요. 너무 얕으면 대기에 튕겨 우주로 되돌아가고, 너무 가파르면 감속이 급해 타버리거나 승무원이 못 견딥니다. RCS(반작용 제어 시스템)는 작은 추력기를 콕콕 분사해 열 차폐막이 정확히 진행 방향을 향하도록 자세를 잡고, 캡슐이 내는 약한 양력을 좌우로 \"굴려\"(roll) 진입 경로와 착륙 지점을 미세 조정합니다. 위성의 반작용 휠과 목적은 같지만, 빠르게 변하는 대기 진입에는 즉각 반응하는 추력기를 씁니다.",
      en: "The most dangerous thing about reentry is the angle: too shallow and the capsule skips off the atmosphere back into space; too steep and the deceleration burns it up or crushes the crew. The RCS (reaction control system) fires small thrusters in pulses to hold the attitude so the heat shield faces exactly forward, and rolls the capsule's slight lift left or right to fine-tune the entry path and landing point. Its purpose is like a satellite's reaction wheels, but the fast, changing dynamics of atmospheric entry call for instantly responsive thrusters.",
      ja: "再突入で最も危険なのは角度です。浅すぎると大気で弾かれて宇宙へ戻り、急すぎると減速が激しく燃え尽きるか乗員が耐えられません。RCS（反作用制御系）は小さなスラスタをパルス噴射して、ヒートシールドが正確に進行方向を向くよう姿勢を保ち、カプセルのわずかな揚力を左右に「ロール」して進入経路と着地点を微調整します。目的は衛星のリアクションホイールと同じですが、速く変化する大気進入には即応するスラスタを使います。",
      zh: "再入最危险的是角度：太浅会被大气弹回太空，太陡则减速过猛、烧毁或压垮乘员。RCS（反作用控制系统）以脉冲喷射小推力器，保持姿态使热盾正对前进方向，并把舱体的少许升力左右“滚转”，微调进入路径与落点。其目的与卫星的反作用轮相同，但快速多变的大气进入需要即时响应的推力器。",
    },
    facts: {
      ko: ["역할 — 진입 자세·경로 제어", "차폐막이 앞을 보게 자세 유지", "양력을 굴려 착륙 지점 조정"],
      en: ["Role — control entry attitude & path", "Keeps heat shield facing forward", "Rolls lift to adjust landing point"],
      ja: ["役割 — 進入姿勢・経路制御", "シールドが前を向くよう維持", "揚力をロールし着地点調整"],
      zh: ["作用 — 控制进入姿态与路径", "保持热盾正对前方", "滚转升力调整落点"],
    },
  },
  parachute: {
    tag: { ko: "DESCENT · PARACHUTE", en: "DESCENT · PARACHUTE", ja: "DESCENT · PARACHUTE", zh: "DESCENT · PARACHUTE" },
    spec: "drogue + 3 mains",
    sources: [{ label: "Wikipedia · Parachute", url: "https://en.wikipedia.org/wiki/Parachute" }],
    title: { ko: "낙하산 (Parachute)", en: "Parachutes", ja: "パラシュート", zh: "降落伞" },
    lead: {
      ko: "상단에 접혀 있는 낙하산이에요. 마지막 몇 km에서 펴져 캡슐을 부드럽게 내립니다.",
      en: "The parachutes folded at the top — they open in the final few kilometers to land the capsule gently.",
      ja: "上部に畳まれた落下傘。最後の数 km で開き、カプセルを柔らかく降ろします。",
      zh: "顶部折叠的降落伞——在最后几公里展开，让舱体柔和着陆。",
    },
    detail: {
      ko: "대기 마찰만으로 캡슐은 시속 28,000 km에서 음속 근처까지 줄지만, 그 속도로 땅에 닿으면 안 됩니다. 마지막 몇 km부터 낙하산이 단계적으로 펼쳐져요. 먼저 작은 드로그(drogue) 낙하산이 나와 속도를 더 줄이고 자세를 세운 뒤, 큰 메인 낙하산 여러 개(보통 3개)가 펴져 내림 속도를 사람이 견딜 수 있는 수준(시속 ~20 km)까지 떨어뜨립니다. 한 번에 펴면 충격이 너무 커서 단계를 나누고, 하나가 실패해도 나머지로 버티도록 여러 개를 답니다. 바다 또는 에어백·역추진으로 마무리 착륙해요.",
      en: "Atmospheric drag alone slows the capsule from 28,000 km/h to near the speed of sound, but it must not hit the ground at that speed. In the last few kilometers the parachutes deploy in stages: first a small drogue chute comes out to slow it further and stabilize the attitude, then several large main chutes (usually three) open to bring the descent down to a survivable rate (around 20 km/h). Opening all at once would jolt too hard, so it is staged; multiple mains are used so the rest can hold if one fails. Final touchdown is on water, or by airbags or retro-rockets.",
      ja: "大気抵抗だけでカプセルは時速 28,000 km から音速近くまで減速しますが、その速度で着地してはいけません。最後の数 km から落下傘が段階的に展開します。まず小さなドローグ傘が出て速度をさらに落とし姿勢を整え、次に大きなメイン傘が複数（通常 3 つ）開いて、人が耐えられる降下速度（時速約 20 km）まで下げます。一度に開くと衝撃が大きすぎるため段階に分け、1 つ失敗しても残りで支えられるよう複数備えます。最後は着水、またはエアバッグや逆噴射で着陸します。",
      zh: "仅靠大气阻力，舱体就能从时速 28,000 km 减到接近音速，但不能以此速度落地。在最后几公里，降落伞分级展开：先放出小型减速伞（drogue）进一步减速并稳定姿态，再开多顶大型主伞（通常 3 顶），把下降速度降到人能承受的程度（约时速 20 km）。一次性全开冲击太大，故分级进行；用多顶主伞以便一顶失效时其余仍能支撑。最后以入水、气囊或反推完成着陆。",
    },
    facts: {
      ko: ["역할 — 최종 감속·연착륙", "드로그 → 메인 단계 전개", "여러 개로 충격 분산·이중화"],
      en: ["Role — final braking & soft landing", "Drogue → mains, staged deploy", "Multiple chutes spread shock & add redundancy"],
      ja: ["役割 — 最終減速・軟着陸", "ドローグ → メインの段階展開", "複数で衝撃分散・冗長化"],
      zh: ["作用 — 最终减速与软着陆", "减速伞 → 主伞分级展开", "多顶分散冲击并冗余"],
    },
  },
  hatch: {
    tag: { ko: "HATCH · DOCKING", en: "HATCH · DOCKING", ja: "HATCH · DOCKING", zh: "HATCH · DOCKING" },
    spec: "crew hatch + docking adapter",
    sources: [{ label: "Wikipedia · Docking and berthing of spacecraft", url: "https://en.wikipedia.org/wiki/Docking_and_berthing_of_spacecraft" }],
    title: { ko: "해치 / 도킹 (Hatch)", en: "Hatch & Docking", ja: "ハッチ・ドッキング", zh: "舱门与对接" },
    lead: {
      ko: "출입문이자 우주에서 다른 우주선과 연결하는 문이에요.",
      en: "The doorway — for crew to enter and to connect to another spacecraft in space.",
      ja: "出入口であり、宇宙で他の宇宙船とつなぐ扉でもあります。",
      zh: "出入口，也是在太空中与其他航天器相连的门。",
    },
    detail: {
      ko: "승무원은 이 해치로 타고 내립니다. 우주에서는 같은 해치 둘레의 도킹 어댑터가 우주정거장이나 다른 우주선과 맞물려, 진공을 사이에 두고 단단히 연결하고 기밀 통로를 만들어요. 그래서 두 우주선의 사람이 우주복 없이 오갈 수 있습니다. 문 하나가 진공·압력·도킹 충격을 다 견뎌야 하므로 정교한 밀봉과 잠금장치가 들어가고, 옆의 작은 창으로 승무원이 밖을 보고 도킹을 확인합니다. 재진입 동안엔 단단히 잠겨 기밀을 유지합니다.",
      en: "The crew climb in and out through this hatch. In space, a docking adapter around the same hatch latches onto a station or another spacecraft, joining them firmly across the vacuum and forming an airtight passage — so people can move between two vehicles without spacesuits. Because one door must withstand vacuum, pressure and docking impact, it carries precise seals and latches, and a small window beside it lets the crew see out and confirm docking. During reentry it stays firmly locked to hold the seal.",
      ja: "乗員はこのハッチで乗り降りします。宇宙では同じハッチ周りのドッキングアダプタがステーションや他の宇宙船とかみ合い、真空を隔てて固く連結し気密の通路を作ります。だから二つの宇宙船の人が宇宙服なしで行き来できます。一つの扉が真空・圧力・ドッキング衝撃に耐えねばならないため精密なシールと施錠機構を備え、横の小窓で乗員が外を見てドッキングを確認します。再突入中は固く施錠して気密を保ちます。",
      zh: "乘员通过这道舱门进出。在太空中，舱门周围的对接适配器与空间站或另一航天器锁合，跨真空牢固连接并形成气密通道——使两船人员无需航天服即可往来。由于一道门要承受真空、压力与对接冲击，配有精密密封与锁紧机构，旁边的小窗让乘员观察并确认对接。再入期间紧锁以保持气密。",
    },
    facts: {
      ko: ["역할 — 출입구 + 우주 도킹", "도킹 어댑터로 기밀 통로 형성", "진공·압력·충격을 견디는 밀봉"],
      en: ["Role — doorway + space docking", "Adapter forms an airtight passage", "Seals against vacuum, pressure, impact"],
      ja: ["役割 — 出入口 + 宇宙ドッキング", "アダプタが気密通路を形成", "真空・圧力・衝撃に耐える密封"],
      zh: ["作用 — 出入口 + 太空对接", "适配器形成气密通道", "密封抵御真空、压力、冲击"],
    },
  },
};
