/** 游戏类型定义 */

export type FigureId = "yoshino" | "mako" | "murasame" | "rena";

export type Figure = {
  id: FigureId;
  /** 立绘变体（对应 portrait 目录下的文件名） */
  variant?: string;
  /** 显示位置 */
  side?: "left" | "center" | "right";
  /** 是否暗化（非说话人） */
  dim?: boolean;
};

export type Cmd =
  | { t: "chapter"; title: string; sub?: string }
  | { t: "bg"; src: string; /** 附加滤镜类名 */ fx?: string }
  | { t: "bgm"; src: string | null }
  | { t: "show"; figure: Figure }
  | { t: "hide" }
  | {
      t: "say";
      /** 说话人（空=旁白） */
      who?: string;
      whoRuby?: string;
      text: string;
      /** 说话时的演出图（可选，切换显示） */
      figure?: Figure;
      /** 说话人主题色 */
      color?: string;
    }
  | { t: "choice"; prompt: string; options: { label: string; hint?: string; goto: string }[] }
  | { t: "label"; id: string }
  | { t: "jump"; id: string }
  | { t: "fx"; text: string }
  | {
      t: "ending";
      id: string;
      title: string;
      desc: string;
      cg?: string;
    };

/** 存档结构 */
export type SaveData = {
  cmdIndex: number;
  chapterTitle: string;
  unlockedCgs: string[];
  readTexts: string[];
  ts: number;
};

export const STORAGE_KEYS = {
  auto: "sb_save_auto",
  slot: (n: number) => `sb_save_${n}`,
  unlocked: "sb_unlocked_cgs",
  config: "sb_config",
} as const;

export type GameConfig = {
  bgmVolume: number;
  textSpeed: number;
  autoWait: number;
};

export const DEFAULT_CONFIG: GameConfig = {
  bgmVolume: 0.6,
  textSpeed: 28,
  autoWait: 1600,
};

export const FIGURES: Record<
  FigureId,
  { name: string; ruby: string; color: string; portraits: Record<string, string> }
> = {
  yoshino: {
    name: "朝武芳乃",
    ruby: "あさむら・よしの",
    color: "#e05c74",
    portraits: { default: "/assets/portrait/yoshino.jpg", alt: "/assets/portrait/yoshino_alt.jpg" },
  },
  mako: {
    name: "常陆茉子",
    ruby: "ひたち・まこ",
    color: "#a78bdc",
    portraits: { default: "/assets/portrait/mako.jpg" },
  },
  murasame: {
    name: "丛雨",
    ruby: "ムラサメ",
    color: "#8fd0d8",
    portraits: {
      default: "/assets/portrait/murasame.jpg",
      umbrella: "/assets/portrait/murasame_umbrella.jpg",
    },
  },
  rena: {
    name: "蕾娜",
    ruby: "レナ・リヒテナウアー",
    color: "#e8b64c",
    portraits: { default: "/assets/portrait/rena.jpg" },
  },
};

export const CG_LIST: { src: string; title: string }[] = [
  { src: "/assets/cg/yoshino_shrine.jpg", title: "神社的巫女姬" },
  { src: "/assets/cg/yoshino_close.jpg", title: "遥远的距离" },
  { src: "/assets/cg/murasame_sword1.jpg", title: "神刀之主" },
  { src: "/assets/cg/murasame_sit.jpg", title: "丛雨丸的灵" },
  { src: "/assets/cg/murasame_umbrella_cg.jpg", title: "红伞之下" },
  { src: "/assets/cg/murasame_sakura.jpg", title: "樱花树下的约定" },
  { src: "/assets/cg/murasame_tatami.jpg", title: "静静的午后" },
  { src: "/assets/cg/murasame_room.jpg", title: "房间里的日常" },
  { src: "/assets/cg/mako_carry.jpg", title: "忍者的恶作剧" },
  { src: "/assets/cg/mako_cover.jpg", title: "紫之刃" },
  { src: "/assets/cg/rena_cover.jpg", title: "北欧来客" },
  { src: "/assets/cg/rena_lie.jpg", title: "悠闲时光" },
  { src: "/assets/cg/rena_sport.jpg", title: "活力少女" },
  { src: "/assets/cg/starry_night.jpg", title: "星降之夜" },
  { src: "/assets/cg/heroines.jpg", title: "四位少女" },
  { src: "/assets/cg/everyone.jpg", title: "穗织的众人" },
  { src: "/assets/cg/group_photo.jpg", title: "热闹的一大家子" },
  { src: "/assets/cg/murasame_battle.jpg", title: "斩击之姿" },
  { src: "/assets/cg/murasame_two.jpg", title: "双影" },
  { src: "/assets/cg/murasame_umbrella2.jpg", title: "油纸伞" },
];
