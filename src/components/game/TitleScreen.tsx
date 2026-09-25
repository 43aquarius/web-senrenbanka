"use client";

import { Github, Music, Volume2, VolumeX } from "lucide-react";
import type { GameConfig } from "@/lib/game/types";
import type { useBgm } from "./GameShell";
import { CG_LIST } from "@/lib/game/types";

type Props = {
  onNewGame: () => void;
  onContinue: () => void;
  hasSave: boolean;
  onGallery: () => void;
  onAbout: () => void;
  unlockedCount: number;
  bgm: ReturnType<typeof useBgm>;
  config: GameConfig;
  onConfig: (patch: Partial<GameConfig>) => void;
};

/** GitHub 图标按钮（带品牌色的悬停效果） */
export function GitHubButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://github.com/43aquarius/web-senrenbanka"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub 仓库"
      title="GitHub · web-senrenbanka"
      className={`group inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-white/80 backdrop-blur transition-all hover:border-white/60 hover:bg-white/10 hover:text-white ${className}`}
    >
      <Github className="size-4.5 transition-transform group-hover:scale-110" aria-hidden="true" />
      <span className="hidden text-xs font-bold tracking-wider sm:inline">GITHUB</span>
    </a>
  );
}

export default function TitleScreen({
  onNewGame,
  onContinue,
  hasSave,
  onGallery,
  onAbout,
  unlockedCount,
  bgm,
  config,
  onConfig,
}: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 封面背景 */}
      <div
        className="title-bg absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/assets/bg/title.jpg)" }}
        aria-hidden="true"
      />
      <div className="title-vignette absolute inset-0" aria-hidden="true" />

      {/* 左上：版本标识 */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 sm:left-6 sm:top-6">
        <span className="rounded glass-chip px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-white/85">
          FAN-MADE WEB EDITION
        </span>
        <span className="hidden rounded glass-chip px-2.5 py-1 text-[10px] font-bold tracking-widest text-sakura-light sm:inline">
          全年龄向
        </span>
      </div>

      {/* 右上：BGM 控制 */}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2 sm:right-6 sm:top-6">
        <button
          type="button"
          onClick={() => {
            const muted = config.bgmVolume === 0;
            const v = muted ? 0.6 : 0;
            onConfig({ bgmVolume: v });
            bgm.setVolume(v);
            if (!muted) bgm.play("/assets/music/title.mp3", v);
            else bgm.stop();
          }}
          aria-label={config.bgmVolume === 0 ? "开启音乐" : "静音"}
          className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/85 backdrop-blur transition-all hover:border-white/60 hover:text-white"
        >
          {config.bgmVolume === 0 ? (
            <VolumeX className="size-4.5" aria-hidden="true" />
          ) : (
            <Volume2 className="size-4.5" aria-hidden="true" />
          )}
        </button>
        <GitHubButton />
      </div>

      {/* 中央标题 + 菜单 */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-16">
        <p className="ruby-text mb-3 text-[11px] font-medium text-white/70 sm:text-xs">
          ── せんれん＊ばんか ──
        </p>
        <h1 className="font-serif-sc text-center text-[clamp(3rem,12vw,7rem)] font-black leading-[1.05] tracking-[0.06em] text-white [text-shadow:0_2px_0_rgba(142,45,58,0.9),0_4px_10px_rgba(0,0,0,0.7),0_0_60px_rgba(217,122,146,0.45)]">
          千恋<span className="mx-1 inline-block text-[0.68em] align-middle text-[#e8c496]">＊</span>万花
        </h1>
        <p className="mt-3 font-serif-sc text-sm tracking-[0.5em] text-white/85 sm:text-base">
          Web版 · 序章
        </p>

        {/* 菜单 */}
        <nav
          className="mt-10 flex flex-col items-center gap-4 sm:mt-12 sm:gap-5"
          aria-label="主菜单"
        >
          <button
            type="button"
            onClick={onNewGame}
            className="menu-item font-serif-sc text-xl font-bold tracking-[0.35em] text-white/95 sm:text-2xl"
          >
            开始游戏
          </button>
          <button
            type="button"
            onClick={onContinue}
            disabled={!hasSave}
            className={`menu-item font-serif-sc text-xl font-bold tracking-[0.35em] sm:text-2xl ${
              hasSave ? "text-white/95" : "cursor-not-allowed text-white/25 hover:!tracking-[0.35em]"
            }`}
          >
            继续游戏
          </button>
          <button
            type="button"
            onClick={onGallery}
            className="menu-item font-serif-sc text-xl font-bold tracking-[0.35em] text-white/95 sm:text-2xl"
          >
            CG 鉴赏
            <span className="ml-2 align-middle text-xs font-normal tracking-normal text-sakura-light/80">
              {unlockedCount}/{CG_LIST.length}
            </span>
          </button>
          <button
            type="button"
            onClick={onAbout}
            className="menu-item font-serif-sc text-xl font-bold tracking-[0.35em] text-white/95 sm:text-2xl"
          >
            关于本站
          </button>
        </nav>

        <p className="mt-10 max-w-md text-center text-[10px] leading-relaxed text-white/45">
          本作品为粉丝自制的非官方免费体验版 · 与 Yuzu-soft 无关
          <br />
          商业版本请支持官方发售的原作游戏
        </p>
      </div>

      {/* 底部版权栏 + GitHub */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8 text-center text-[10px] tracking-wider text-white/40">
        <span>© Yuzu-soft 千恋＊万花</span>
        <span aria-hidden="true">·</span>
        <span>Fan-made Tribute</span>
        <span aria-hidden="true">·</span>
        <a
          href="https://github.com/43aquarius/web-senrenbanka"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-white/55 underline-offset-2 transition-colors hover:text-white hover:underline"
        >
          <Github className="size-3" aria-hidden="true" />
          web-senrenbanka
        </a>
      </div>
    </div>
  );
}
