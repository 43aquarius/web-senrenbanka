"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronRight,
  History,
  Home,
  Pause,
  Play,
  Save,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import type { SceneState } from "@/lib/game/engine";
import { saveGame, loadGame, SCRIPT_TOTAL } from "@/lib/game/engine";
import type { GameConfig, SaveData } from "@/lib/game/types";
import { FIGURES, STORAGE_KEYS } from "@/lib/game/types";
import type { useBgm } from "./GameShell";

type Props = {
  scene: SceneState;
  config: GameConfig;
  onConfig: (patch: Partial<GameConfig>) => void;
  onNext: (fromIndex: number) => void;
  onChoice: (goto: string) => void;
  onExit: () => void;
  onFinishEnding: () => void;
  bgm: ReturnType<typeof useBgm>;
};

const SAVE_SLOTS = [1, 2, 3];

export default function GameScreen({
  scene,
  config,
  onConfig,
  onNext,
  onChoice,
  onExit,
  onFinishEnding,
  bgm,
}: Props) {
  /* ── 打字机 ─────────────────────────── */
  const fullText = scene.say?.text ?? "";
  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(false);
  const [autoMode, setAutoMode] = useState(false);
  const [skipMode, setSkipMode] = useState(false);
  const [backlogOpen, setBacklogOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [history, setHistory] = useState<{ who?: string; text: string }[]>([]);

  const typingTimer = useRef<number | null>(null);
  const autoTimer = useRef<number | null>(null);
  const skipTimer = useRef<number | null>(null);

  // 切换台词时重置打字机并记录历史
  useEffect(() => {
    setTyped(0);
    setDone(false);
    if (scene.say) {
      const entry = { who: scene.say.who, text: scene.say.text };
      setHistory((h) => (h[h.length - 1]?.text === entry.text ? h : [...h, entry]));
    }
    if (scene.ending) {
      setHistory((h) => [...h, { who: "", text: `【${scene.ending!.title}】${scene.ending!.desc}` }]);
    }
  }, [scene.index, fullText]);

  // 打字机 tick
  useEffect(() => {
    if (!scene.say) return;
    if (typed >= fullText.length) {
      setDone(true);
      return;
    }
    typingTimer.current = window.setTimeout(
      () => setTyped((t) => t + 1),
      Math.max(6, config.textSpeed)
    );
    return () => {
      if (typingTimer.current) window.clearTimeout(typingTimer.current);
    };
  }, [typed, fullText, scene.say, config.textSpeed]);

  // BGM 跟随
  useEffect(() => {
    bgm.play(scene.bgm, config.bgmVolume);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene.bgm]);

  /* ── 推进逻辑 ───────────────────────── */
  const canAdvance = !!(scene.say || scene.chapter || scene.fx);

  const advanceOnce = useCallback(() => {
    if (skipMode || autoMode) {
      setSkipMode(false);
      setAutoMode(false);
    }
    if (scene.say && !done) {
      // 跳过打字直接显示
      setTyped(fullText.length);
      setDone(true);
      return;
    }
    if (scene.ending) return; // 结局画面由按钮控制
    if (canAdvance) onNext(scene.index);
  }, [scene, done, fullText, canAdvance, onNext, skipMode, autoMode]);

  // 自动模式
  useEffect(() => {
    if (!autoMode) return;
    if (scene.choice || scene.ending) {
      setAutoMode(false);
      return;
    }
    if (scene.say && done) {
      autoTimer.current = window.setTimeout(
        () => onNext(scene.index),
        config.autoWait + Math.min(fullText.length * 18, 2400)
      );
    }
    return () => {
      if (autoTimer.current) window.clearTimeout(autoTimer.current);
    };
  }, [autoMode, done, scene, config.autoWait, fullText, onNext]);

  // 快进模式
  useEffect(() => {
    if (!skipMode) return;
    if (scene.choice || scene.ending) {
      setSkipMode(false);
      return;
    }
    skipTimer.current = window.setTimeout(() => onNext(scene.index), 120);
    return () => {
      if (skipTimer.current) window.clearTimeout(skipTimer.current);
    };
  }, [skipMode, scene, onNext]);

  // 键盘操作
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (backlogOpen || saveOpen) {
        if (e.key === "Escape") {
          setBacklogOpen(false);
          setSaveOpen(false);
        }
        return;
      }
      switch (e.key) {
        case " ":
        case "Enter":
          e.preventDefault();
          advanceOnce();
          break;
        case "Escape":
          setMenuOpen(true);
          break;
        case "a":
        case "A":
          setAutoMode((v) => !v);
          break;
        case "l":
        case "L":
          setBacklogOpen(true);
          break;
        case "s":
        case "S":
          setSkipMode((v) => !v);
          break;
        case "m":
        case "M": {
          const muted = config.bgmVolume === 0;
          const v = muted ? 0.6 : 0;
          onConfig({ bgmVolume: v });
          bgm.setVolume(v);
          break;
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advanceOnce, backlogOpen, saveOpen, config.bgmVolume, onConfig, bgm]);

  /* ── 自动存档 ───────────────────────── */
  useEffect(() => {
    if (scene.index < 0) return;
    const data: SaveData = {
      cmdIndex: scene.index,
      chapterTitle: scene.chapter?.title ?? "",
      unlockedCgs: [],
      readTexts: [],
      ts: Date.now(),
    };
    saveGame(STORAGE_KEYS.auto, data);
  }, [scene.index, scene.chapter]);

  /* ── 立绘资源 ───────────────────────── */
  const figureInfo = useMemo(() => {
    if (!scene.figure) return null;
    const meta = FIGURES[scene.figure.id];
    const src = meta.portraits[scene.figure.variant ?? "default"] ?? meta.portraits.default;
    return { meta, src, side: scene.figure.side ?? "center", dim: scene.figure.dim };
  }, [scene.figure]);

  const progress = Math.round(((scene.index + 1) / SCRIPT_TOTAL) * 100);

  /* ── 渲染 ───────────────────────────── */
  return (
    <div className="absolute inset-0 select-none" onClick={advanceOnce} role="presentation">
      {/* 背景 */}
      {scene.bg && (
        <div
          key={scene.bg + (scene.bgFx ?? "")}
          className={`bg-layer bg-kosho ${scene.bgFx ?? ""}`}
          style={{ backgroundImage: `url(${scene.bg})` }}
          aria-hidden="true"
        />
      )}

      {/* 立绘 */}
      {figureInfo && (
        <div
          key={figureInfo.src}
          className={`figure-layer ${figureInfo.dim ? "fig-dim" : ""} ${
            figureInfo.side === "left"
              ? "left-[2%] sm:left-[6%]"
              : figureInfo.side === "right"
                ? "right-[2%] sm:right-[6%]"
                : "left-1/2 -translate-x-1/2"
          }`}
          style={{ backgroundImage: `url(${figureInfo.src})` }}
          aria-hidden="true"
        />
      )}

      {/* 章节标题卡 */}
      {scene.chapter && (
        <div
          className="chapter-card absolute inset-0 z-20 flex flex-col items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            onNext(scene.index);
          }}
        >
          <p className="ruby-text mb-4 text-xs text-[#e8c496] sm:text-sm">
            {scene.chapter.sub ?? ""}
          </p>
          <h2 className="font-serif-sc text-4xl font-black tracking-[0.3em] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.8)] sm:text-6xl">
            {scene.chapter.title}
          </h2>
          <div className="chapter-line mt-8 w-56 sm:w-80" />
          <p className="mt-8 animate-pulse text-xs tracking-[0.4em] text-white/60">
            点击继续
          </p>
        </div>
      )}

      {/* 特效大字 */}
      {scene.fx && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <p className="fx-text text-5xl font-black text-[#ffd9e2] sm:text-7xl">{scene.fx}</p>
        </div>
      )}

      {/* 结局画面 */}
      {scene.ending && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/85 px-6">
          {scene.ending.cg && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 blur-[2px]"
              style={{ backgroundImage: `url(${scene.ending.cg})` }}
              aria-hidden="true"
            />
          )}
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="font-serif-sc text-3xl font-bold tracking-[0.2em] text-white sm:text-4xl">
              {scene.ending.title}
            </h2>
            <div className="chapter-line my-6 w-64" />
            <p className="max-w-md text-sm leading-loose text-white/75">{scene.ending.desc}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onFinishEnding();
                }}
                className="rounded-full bg-gradient-to-b from-[#d97a92] to-[#8e2d3a] px-8 py-3 text-sm font-bold tracking-widest text-white shadow-lg transition-transform hover:scale-105"
              >
                返回标题
              </button>
              <a
                href="https://github.com/43aquarius/web-senrenbanka"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded-full border border-white/30 px-8 py-3 text-sm font-bold tracking-widest text-white/85 transition-colors hover:border-white/70 hover:text-white"
              >
                GitHub 项目
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 选项 */}
      {scene.choice && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black/45 px-6"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="font-serif-sc text-lg text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.9)] sm:text-xl">
            {scene.choice.prompt}
          </p>
          <div className="mt-4 flex w-full max-w-xl flex-col gap-4">
            {scene.choice.options.map((opt) => (
              <button
                key={opt.goto}
                type="button"
                onClick={() => onChoice(opt.goto)}
                className="choice-btn group rounded-lg px-6 py-4 text-left"
              >
                <span className="font-serif-sc text-base font-bold tracking-wider text-white sm:text-lg">
                  {opt.label}
                </span>
                {opt.hint && (
                  <span className="mt-1 block text-xs text-white/45">{opt.hint}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 文本框（点击同样推进剧情） */}
      {scene.say && (
        <div
          className="absolute inset-x-0 bottom-0 z-20 px-3 pb-16 sm:px-6 sm:pb-[4.5rem]"
          onClick={advanceOnce}
        >
          <div className="dialog-box mx-auto max-w-4xl rounded-xl px-5 py-4 sm:px-8 sm:py-6">
            {/* 说话人 */}
            {scene.say.who && (
              <div className="mb-2 flex items-baseline gap-2">
                <span
                  className="font-serif-sc text-lg font-bold tracking-[0.2em] sm:text-xl"
                  style={{ color: scene.say.color ?? "#f0a7bb" }}
                >
                  {scene.say.who}
                </span>
                {scene.say.whoRuby && (
                  <span className="text-[10px] tracking-widest text-white/40">
                    {scene.say.whoRuby}
                  </span>
                )}
              </div>
            )}
            {/* 正文 */}
            <p className="dialog-text min-h-[4.5em] text-[15px] text-[#f5ece4] sm:text-[17px]">
              {fullText.slice(0, typed)}
              {!done && <span className="type-cursor" aria-hidden="true" />}
            </p>
          </div>
          {/* 下一步指示 */}
          {done && (
            <div className="pointer-events-none absolute bottom-3 right-4 animate-bounce sm:bottom-4 sm:right-8">
              <ChevronRight className="size-5 rotate-[-45deg] text-[#d97a92]" aria-hidden="true" />
            </div>
          )}
        </div>
      )}

      {/* ── 顶部控制栏 ── */}
      <div
        className="absolute right-2 top-2 z-30 flex items-center gap-1 sm:right-4 sm:top-4 sm:gap-1.5"
        onClick={(e) => e.stopPropagation()}
      >
        <ControlBtn label="自动" active={autoMode} onClick={() => setAutoMode((v) => !v)}>
          {autoMode ? <Pause className="size-4" /> : <Play className="size-4" />}
        </ControlBtn>
        <ControlBtn label="快进" active={skipMode} onClick={() => setSkipMode((v) => !v)}>
          <SkipForward className="size-4" />
        </ControlBtn>
        <ControlBtn label="记录" onClick={() => setBacklogOpen(true)}>
          <History className="size-4" />
        </ControlBtn>
        <ControlBtn
          label="音乐"
          active={config.bgmVolume > 0}
          onClick={() => {
            const muted = config.bgmVolume === 0;
            const v = muted ? 0.6 : 0;
            onConfig({ bgmVolume: v });
            bgm.setVolume(v);
          }}
        >
          {config.bgmVolume === 0 ? (
            <VolumeX className="size-4" />
          ) : (
            <Volume2 className="size-4" />
          )}
        </ControlBtn>
        <ControlBtn label="存档" onClick={() => setSaveOpen(true)}>
          <Save className="size-4" />
        </ControlBtn>
        <ControlBtn label="菜单" onClick={() => setMenuOpen(true)}>
          <Home className="size-4" />
        </ControlBtn>
      </div>

      {/* 进度条 */}
      <div className="absolute left-0 top-0 z-30 h-[3px] w-full bg-black/40">
        <div
          className="h-full bg-gradient-to-r from-[#8e2d3a] to-[#f0a7bb] transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Backlog 弹窗 */}
      {backlogOpen && (
        <Overlay onClose={() => setBacklogOpen(false)} title="对话记录">
          <div className="nice-scroll max-h-[55vh] space-y-4 overflow-y-auto pr-2">
            {history.length === 0 && <p className="text-sm text-white/40">暂无记录。</p>}
            {history.map((h, i) => (
              <div key={i} className="border-l-2 border-[#d97a92]/40 pl-4">
                {h.who && (
                  <p className="mb-0.5 font-serif-sc text-sm font-bold text-[#f0a7bb]">
                    {h.who}
                  </p>
                )}
                <p className="text-sm leading-relaxed text-white/85">{h.text}</p>
              </div>
            ))}
          </div>
        </Overlay>
      )}

      {/* 存档弹窗 */}
      {saveOpen && (
        <Overlay onClose={() => setSaveOpen(false)} title="存档 / 读档">
          <div className="grid gap-3">
            {SAVE_SLOTS.map((n) => {
              const save = loadGame(STORAGE_KEYS.slot(n));
              return (
                <div
                  key={n}
                  className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white/85">存档 {n}</p>
                    <p className="truncate text-xs text-white/45">
                      {save
                        ? `${new Date(save.ts).toLocaleString("zh-CN")} · 进度${save.cmdIndex}/${SCRIPT_TOTAL}`
                        : "—— 空 ——"}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const data: SaveData = {
                          cmdIndex: scene.index,
                          chapterTitle: "",
                          unlockedCgs: [],
                          readTexts: [],
                          ts: Date.now(),
                        };
                        saveGame(STORAGE_KEYS.slot(n), data);
                        setSaveOpen(false);
                      }}
                      className="rounded-full bg-[#d97a92]/90 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#d97a92]"
                    >
                      保存
                    </button>
                    <button
                      type="button"
                      disabled={!save}
                      onClick={() => {
                        if (!save) return;
                        onNext(save.cmdIndex - 1); // 从存档位置推进
                        setSaveOpen(false);
                      }}
                      className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                        save
                          ? "border border-white/30 text-white/85 hover:border-white/70"
                          : "cursor-not-allowed border border-white/10 text-white/25"
                      }`}
                    >
                      读取
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Overlay>
      )}

      {/* 菜单弹窗 */}
      {menuOpen && (
        <Overlay onClose={() => setMenuOpen(false)} title="菜单">
          <div className="flex flex-col gap-3">
            <MenuRow
              label="返回标题"
              hint="当前进度已自动保存"
              onClick={() => {
                setMenuOpen(false);
                bgm.stop();
                onExit();
              }}
            />
            <MenuRow label="语速调节" hint={`当前 ${config.textSpeed}ms / 字`}>
              <input
                type="range"
                min={8}
                max={70}
                value={config.textSpeed}
                onChange={(e) => onConfig({ textSpeed: Number(e.target.value) })}
                className="w-36 accent-[#d97a92]"
                aria-label="打字速度"
              />
            </MenuRow>
            <MenuRow label="音乐音量" hint={config.bgmVolume === 0 ? "静音中" : `${Math.round(config.bgmVolume * 100)}%`}>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(config.bgmVolume * 100)}
                onChange={(e) => {
                  const v = Number(e.target.value) / 100;
                  onConfig({ bgmVolume: v });
                  bgm.setVolume(v);
                }}
                className="w-36 accent-[#d97a92]"
                aria-label="音乐音量"
              />
            </MenuRow>
            <div className="mt-2 rounded-lg border border-white/10 bg-white/5 p-3 text-[11px] leading-relaxed text-white/50">
              快捷键：空格/回车=推进 · A=自动 · S=快进 · L=记录 · M=静音 · Esc=菜单
              <br />
              素材版权归 © Yuzu-soft 所有，本站仅为粉丝自制体验版。
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
}

/* ── 子组件 ─────────────────────────────── */

function ControlBtn({
  children,
  label,
  active,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={`flex size-9 flex-col items-center justify-center rounded-full border backdrop-blur transition-all sm:size-10 ${
        active
          ? "border-[#d97a92] bg-[#d97a92]/25 text-white"
          : "border-white/15 bg-black/40 text-white/70 hover:border-white/50 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Overlay({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-[#d97a92]/30 bg-[#1e141a]/95 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-serif-sc text-lg font-bold tracking-[0.25em] text-white">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/50 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function MenuRow({
  label,
  hint,
  onClick,
  children,
}: {
  label: string;
  hint?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left transition-colors hover:border-[#d97a92]/50 hover:bg-[#d97a92]/10"
      >
        <span>
          <span className="block text-sm font-bold text-white/90">{label}</span>
          {hint && <span className="mt-0.5 block text-xs text-white/40">{hint}</span>}
        </span>
      </button>
    );
  }
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
      <span>
        <span className="block text-sm font-bold text-white/90">{label}</span>
        {hint && <span className="mt-0.5 block text-xs text-white/40">{hint}</span>}
      </span>
      {children}
    </div>
  );
}
