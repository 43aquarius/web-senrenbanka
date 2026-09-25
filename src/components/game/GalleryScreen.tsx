"use client";

import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { CG_LIST } from "@/lib/game/types";

export default function GalleryScreen({
  unlocked,
  onBack,
}: {
  unlocked: string[];
  onBack: () => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="absolute inset-0 overflow-y-auto bg-[#160f13]">
      {/* 头部 */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#160f13]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              aria-label="返回标题"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition-colors hover:border-white/60 hover:text-white"
            >
              <ArrowLeft className="size-4.5" />
            </button>
            <div>
              <h2 className="font-serif-sc text-xl font-bold tracking-[0.25em] text-white">
                CG 鉴赏
              </h2>
              <p className="text-[10px] tracking-[0.3em] text-white/40">GALLERY</p>
            </div>
          </div>
          <p className="text-sm font-bold text-[#f0a7bb]">
            {unlocked.length}
            <span className="text-white/40"> / {CG_LIST.length}</span>
          </p>
        </div>
      </div>

      {/* 网格 */}
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 py-6 sm:grid-cols-3 sm:gap-4 sm:px-6 lg:grid-cols-4">
        {CG_LIST.map((cg) => {
          const isOpen = unlocked.includes(cg.src);
          return (
            <button
              key={cg.src}
              type="button"
              disabled={!isOpen}
              onClick={() => setPreview(cg.src)}
              className={`cg-card group relative aspect-[4/3] overflow-hidden rounded-xl border ${
                isOpen
                  ? "border-[#d97a92]/30 hover:border-[#f0a7bb]"
                  : "cg-locked cursor-not-allowed border-white/5"
              }`}
              aria-label={isOpen ? `查看 ${cg.title}` : "未解锁"}
            >
              {isOpen ? (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${cg.src})` }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 pt-8">
                    <p className="truncate font-serif-sc text-sm font-bold text-white">
                      {cg.title}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2">
                  <span className="font-serif-sc text-3xl text-white/15">?</span>
                  <span className="text-[10px] tracking-[0.3em] text-white/25">LOCKED</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <p className="mx-auto max-w-6xl px-4 pb-10 text-center text-[11px] leading-relaxed text-white/35 sm:px-6">
        随游戏进度逐步解锁 · 图片素材版权归 © Yuzu-soft 所有
      </p>

      {/* 大图预览 */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setPreview(null)}
        >
          <button
            type="button"
            aria-label="关闭预览"
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white/60 hover:text-white"
          >
            <X className="size-5" />
          </button>
          <div
            className="max-h-full w-full max-w-4xl overflow-hidden rounded-xl border border-[#d97a92]/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="CG 预览" className="max-h-[82vh] w-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
