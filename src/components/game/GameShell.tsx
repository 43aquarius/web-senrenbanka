"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SceneState } from "@/lib/game/engine";
import {
  advance,
  advanceFromChoice,
  createInitialState,
  collectCgsUpTo,
  unlockCg,
  getUnlockedCgs,
  getConfig,
  saveConfig,
} from "@/lib/game/engine";
import type { GameConfig } from "@/lib/game/types";
import { CG_LIST } from "@/lib/game/types";
import TitleScreen from "./TitleScreen";
import GameScreen from "./GameScreen";
import GalleryScreen from "./GalleryScreen";
import AboutScreen from "./AboutScreen";

export type Screen = "title" | "playing" | "gallery" | "about";

/** 全局 BGM 控制（单一实例，跨画面共享） */
export function useBgm() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = new Audio();
    el.loop = true;
    el.preload = "auto";
    audioRef.current = el;
    return () => {
      el.pause();
      audioRef.current = null;
    };
  }, []);

  const play = useCallback((src: string | null, volume: number) => {
    const el = audioRef.current;
    if (!el) return;
    if (src == null) {
      el.pause();
      setPlaying(false);
      return;
    }
    if (!el.src.endsWith(src)) {
      el.src = src;
      el.volume = volume;
      el.play().then(
        () => setPlaying(true),
        () => setPlaying(false)
      );
    }
  }, []);

  const stop = useCallback(() => {
    const el = audioRef.current;
    if (el) {
      el.pause();
    }
    setPlaying(false);
  }, []);

  const setVolume = useCallback((v: number) => {
    const el = audioRef.current;
    if (el) el.volume = v;
  }, []);

  return { play, stop, setVolume, playing };
}

export default function GameShell() {
  const [screen, setScreen] = useState<Screen>("title");
  const [scene, setScene] = useState<SceneState>(createInitialState);
  const [readTexts, setReadTexts] = useState<Set<string>>(new Set());
  const [hasSave, setHasSave] = useState(false);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [config, setConfig] = useState<GameConfig>(getConfig());
  const bgm = useBgm();

  useEffect(() => {
    // 初始化：读取本地存储（微任务中执行，避免级联渲染）
    Promise.resolve().then(() => {
      setHasSave(
        !!localStorage.getItem("sb_save_auto") || !!localStorage.getItem("sb_save_1")
      );
      setUnlocked(getUnlockedCgs());
    });
  }, []);

  /** 场景推进时同步解锁已见 CG（事件驱动，避免 effect 内 setState） */
  const unlockUpTo = useCallback(
    (index: number) => {
      const cgs = collectCgsUpTo(index);
      let changed = false;
      cgs.forEach((c) => {
        if (!unlocked.includes(c)) {
          unlockCg(c);
          changed = true;
        }
      });
      if (changed) setUnlocked(getUnlockedCgs());
    },
    [unlocked]
  );

  /** 开始新游戏 */
  const startNew = useCallback(() => {
    const fresh = createInitialState();
    const next = advance(fresh, 0, new Set());
    setScene(next);
    setScreen("playing");
    unlockUpTo(next.index);
  }, [unlockUpTo]);

  /** 从存档继续 */
  const continueGame = useCallback(() => {
    const save =
      JSON.parse(localStorage.getItem("sb_save_auto") || "null") ||
      JSON.parse(localStorage.getItem("sb_save_1") || "null");
    if (!save) return;
    const restored = advance(createInitialState(), save.cmdIndex, new Set());
    setScene(restored);
    unlockUpTo(restored.index);
    setScreen("playing");
  }, [unlockUpTo]);

  /** 游戏内推进（由 GameScreen 调用） */
  const handleNext = useCallback(
    (fromIndex: number) => {
      const next = advance(scene, fromIndex + 1, readTexts);
      setScene(next);
      unlockUpTo(next.index);
      // 通关奖励：抵达结局后，鉴赏室全开
      if (next.ending) {
        CG_LIST.forEach((cg) => unlockCg(cg.src));
        setUnlocked(CG_LIST.map((cg) => cg.src));
      }
    },
    [readTexts, scene, unlockUpTo]
  );

  const handleChoice = useCallback(
    (goto: string) => {
      const next = advanceFromChoice(scene, goto, readTexts);
      setScene(next);
      unlockUpTo(next.index);
    },
    [readTexts, scene, unlockUpTo]
  );

  const updateConfig = useCallback((patch: Partial<GameConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...patch };
      saveConfig(next);
      return next;
    });
  }, []);

  return (
    <div className="game-stage">
      {screen === "title" && (
        <TitleScreen
          onNewGame={startNew}
          onContinue={continueGame}
          hasSave={hasSave}
          onGallery={() => setScreen("gallery")}
          onAbout={() => setScreen("about")}
          unlockedCount={unlocked.length}
          bgm={bgm}
          config={config}
          onConfig={updateConfig}
        />
      )}
      {screen === "playing" && (
        <GameScreen
          scene={scene}
          config={config}
          onConfig={updateConfig}
          onNext={handleNext}
          onChoice={handleChoice}
          onExit={() => {
            setScreen("title");
          }}
          bgm={bgm}
          onFinishEnding={() => setScreen("title")}
        />
      )}
      {screen === "gallery" && (
        <GalleryScreen unlocked={unlocked} onBack={() => setScreen("title")} />
      )}
      {screen === "about" && <AboutScreen onBack={() => setScreen("title")} />}
    </div>
  );
}
