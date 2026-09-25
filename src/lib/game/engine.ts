import { SCRIPT } from "./script";
import type { Cmd, SaveData, GameConfig } from "./types";
import { STORAGE_KEYS, DEFAULT_CONFIG } from "./types";

/** 剧本标签 → 指令索引 */
export const LABEL_INDEX: Record<string, number> = (() => {
  const map: Record<string, number> = {};
  SCRIPT.forEach((cmd, i) => {
    if (cmd.t === "label") map[cmd.id] = i;
  });
  return map;
})();

/** 从指定索引执行到下一条「可等待」指令（say / choice / ending / chapter / fx），返回新的演出状态 */
export type SceneState = {
  index: number;
  bg: string | null;
  bgFx: string | null;
  bgm: string | null;
  figure: NonNullable<Cmd extends { t: "say"; figure: infer F } ? F : never> | null;
  chapter: { title: string; sub?: string } | null;
  current: Cmd | null;
  /** say 的内容 */
  say: { who?: string; whoRuby?: string; text: string; color?: string } | null;
  choice: { prompt: string; options: { label: string; hint?: string; goto: string }[] } | null;
  fx: string | null;
  ending: { id: string; title: string; desc: string; cg?: string } | null;
};

export function createInitialState(): SceneState {
  return {
    index: -1,
    bg: null,
    bgFx: null,
    bgm: null,
    figure: null,
    chapter: null,
    current: null,
    say: null,
    choice: null,
    fx: null,
    ending: null,
  };
}

/**
 * 从 start+1 开始执行指令，直到遇到需要用户交互的指令（say/choice/ending/fx）。
 * label/bg/bgm/show/hide/jump 等即时指令会被连续处理。
 */
export function advance(
  state: SceneState,
  start: number,
  seenSet: Set<string>
): SceneState {
  const next: SceneState = {
    ...state,
    chapter: null,
    say: null,
    choice: null,
    fx: null,
    ending: null,
    current: null,
  };
  let i = start;
  let guard = 0;
  while (i < SCRIPT.length && guard < 10000) {
    guard++;
    const cmd = SCRIPT[i];
    switch (cmd.t) {
      case "bg":
        next.bg = cmd.src;
        next.bgFx = cmd.fx ?? null;
        i++;
        continue;
      case "bgm":
        next.bgm = cmd.src;
        i++;
        continue;
      case "show":
        next.figure = cmd.figure;
        i++;
        continue;
      case "hide":
        next.figure = null;
        i++;
        continue;
      case "jump":
        i = LABEL_INDEX[cmd.id] ?? i + 1;
        continue;
      case "label":
        i++;
        continue;
      case "unlock":
        i++;
        continue;
      case "chapter":
        next.chapter = { title: cmd.title, sub: cmd.sub };
        next.index = i;
        next.current = cmd;
        return next;
      case "say":
        next.say = { who: cmd.who, whoRuby: cmd.whoRuby, text: cmd.text, color: cmd.color };
        if (cmd.figure) next.figure = cmd.figure;
        next.index = i;
        next.current = cmd;
        if (seenSet) seenSet.add(cmd.text);
        return next;
      case "choice":
        next.choice = { prompt: cmd.prompt, options: cmd.options };
        next.index = i;
        next.current = cmd;
        return next;
      case "fx":
        next.fx = cmd.text;
        next.index = i;
        next.current = cmd;
        return next;
      case "ending":
        next.ending = { id: cmd.id, title: cmd.title, desc: cmd.desc, cg: cmd.cg };
        next.index = i;
        next.current = cmd;
        return next;
      default:
        i++;
    }
  }
  next.index = SCRIPT.length;
  return next;
}

/** 选择分支后，跳转到目标标签并继续 */
export function advanceFromChoice(state: SceneState, goto: string, seenSet: Set<string>): SceneState {
  const target = LABEL_INDEX[goto] ?? state.index + 1;
  return advance(state, target + 1, seenSet);
}

/* ── 存档工具 ─────────────────────────────── */
export function saveGame(key: string, data: SaveData) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function loadGame(key: string): SaveData | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as SaveData;
  } catch {
    return null;
  }
}

export function getUnlockedCgs(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.unlocked);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function unlockCg(src: string) {
  const list = getUnlockedCgs();
  if (!list.includes(src)) {
    list.push(src);
    try {
      localStorage.setItem(STORAGE_KEYS.unlocked, JSON.stringify(list));
    } catch {
      /* noop */
    }
  }
}

export function getConfig(): GameConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.config);
    if (raw) return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    /* noop */
  }
  return { ...DEFAULT_CONFIG };
}

export function saveConfig(cfg: GameConfig) {
  try {
    localStorage.setItem(STORAGE_KEYS.config, JSON.stringify(cfg));
  } catch {
    /* noop */
  }
}

/** 从剧本开头收集某索引前最近使用的 CG（用于自动解锁鉴赏） */
export function collectCgsUpTo(index: number): string[] {
  const out = new Set<string>();
  for (let i = 0; i <= index && i < SCRIPT.length; i++) {
    const cmd = SCRIPT[i];
    if (cmd.t === "bg" && cmd.src.includes("/cg/")) out.add(cmd.src);
    if (cmd.t === "ending" && cmd.cg) out.add(cmd.cg);
  }
  return [...out];
}

export const SCRIPT_TOTAL = SCRIPT.length;
