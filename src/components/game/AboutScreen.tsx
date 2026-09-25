"use client";

import { ArrowLeft, ExternalLink, Github, Heart } from "lucide-react";

export default function AboutScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="absolute inset-0 overflow-y-auto bg-[#160f13]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {/* 头部 */}
        <div className="mb-8 flex items-center gap-3">
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
              关于本站
            </h2>
            <p className="text-[10px] tracking-[0.3em] text-white/40">ABOUT</p>
          </div>
        </div>

        {/* 卡片 */}
        <div className="space-y-5">
          <section className="rounded-2xl border border-[#d97a92]/25 bg-white/[0.04] p-6">
            <h3 className="font-serif-sc text-lg font-bold tracking-widest text-[#f0a7bb]">
              千恋＊万花 ｜ Web版 · 序章
            </h3>
            <p className="mt-3 text-sm leading-[1.9] text-white/75">
              这是一个由粉丝制作的<strong className="text-white">非官方、非营利</strong>
              的网页版视觉小说体验，旨在用浏览器重现《千恋＊万花》序章的氛围。
              剧情文本为基于原作公开设定的原创改写，包含一条主线与三条分歧小径，
              通关约需 8～12 分钟。支持打字机演出、自动播放、快进、对话记录、存档与 CG
              鉴赏等视觉小说常见功能。
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="font-serif-sc text-lg font-bold tracking-widest text-white">
              版权与致谢
            </h3>
            <div className="mt-3 space-y-3 text-sm leading-[1.9] text-white/70">
              <p>
                《千恋＊万花》（せんれん＊ばんか）是 <strong>Yuzu-soft</strong> 制作的美少女游戏，
                其名称、角色、美术、音乐等一切权利归原权利方所有。本站与 Yuzu-soft
                无任何关联。
              </p>
              <p>
                本站使用的图片与音乐素材搜集自公开网络，仅用于粉丝非营利性质的展示与致敬；
                若权利方提出要求，将立即删除。剧情文本为避免侵权均系原创改写。
                本体验版<strong className="text-white">不包含任何成人（R18）内容</strong>。
              </p>
              <p>
                喜欢本作的话，请务必支持官方版本：PC 版、Steam 全年龄版与 Nintendo Switch
                版正在发售中。
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://www.yuzu-soft.com/senren/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[#d97a92] to-[#8e2d3a] px-5 py-2.5 text-xs font-bold tracking-wider text-white transition-transform hover:scale-105"
              >
                作品官方站点
                <ExternalLink className="size-3.5" />
              </a>
              <a
                href="https://www.yuzu-soft.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-5 py-2.5 text-xs font-bold tracking-wider text-white/85 transition-colors hover:border-white/70"
              >
                Yuzu-soft 官网
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="font-serif-sc text-lg font-bold tracking-widest text-white">
              项目仓库
            </h3>
            <p className="mt-3 text-sm leading-[1.9] text-white/70">
              本项目完全开源（MIT License，不含第三方素材的权利授权）。
              使用 Next.js 构建，同时提供单文件 HTML 版本，欢迎 Star、Fork 与提交改进。
            </p>
            <a
              href="https://github.com/43aquarius/web-senrenbanka"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white/90 transition-all hover:border-white/70 hover:bg-white/10"
            >
              <Github className="size-5" />
              43aquarius/web-senrenbanka
              <ExternalLink className="size-3.5 text-white/50" />
            </a>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="font-serif-sc text-lg font-bold tracking-widest text-white">
              操作指南
            </h3>
            <div className="mt-3 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
              <p>
                <Kbd>空格 / 回车 / 点击</Kbd> 推进剧情
              </p>
              <p>
                <Kbd>A</Kbd> 自动播放
              </p>
              <p>
                <Kbd>S</Kbd> 快进模式
              </p>
              <p>
                <Kbd>L</Kbd> 对话记录
              </p>
              <p>
                <Kbd>M</Kbd> 音乐开关
              </p>
              <p>
                <Kbd>Esc</Kbd> 系统菜单
              </p>
            </div>
          </section>
        </div>

        <p className="mt-10 text-center text-[11px] leading-relaxed text-white/35">
          Fan-made tribute with <Heart className="inline size-3 fill-[#d97a92] text-[#d97a92]" /> ｜
          © Yuzu-soft / 千恋＊万花
        </p>
      </div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="mr-1.5 rounded border border-white/20 bg-white/10 px-2 py-0.5 font-mono text-xs text-white/90">
      {children}
    </kbd>
  );
}
