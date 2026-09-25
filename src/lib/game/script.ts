import type { Cmd } from "./types";

/**
 * 《千恋＊万花》Web版 剧本（序章·改）
 * 文本为本站原创改写，基于原作公开的故事设定。
 * 路径均相对于 /assets/。
 */
export const SCRIPT: Cmd[] = [
  // ─────────────── 序幕 ───────────────
  { t: "bgm", src: "/assets/music/theme.mp3" },
  { t: "bg", src: "/assets/bg/field.jpg" },
  {
    t: "chapter",
    title: "序章",
    sub: "通往穗织之路 ── 穂織への道",
  },
  {
    t: "say",
    text: "蝉鸣声由远及近，新干线换成摇晃的乡间巴士。窗外，都市的喧嚣被层层山峦一点点吞没。",
  },
  { t: "say", text: "我叫有地将臣，随处可见的高中二年级学生。这个夏天，我应祖父之邀，来到他经营的温泉旅馆帮忙。" },
  { t: "say", text: "目的地，是被群山环抱的温泉之乡——穗织。传闻这里自古便是刀匠聚集之地，名汤与传统养育了这座小镇。" },
  { t: "say", who: "将臣", text: "（这就是爷爷的旅馆所在的镇子啊……空气里都是树木和温泉的味道。）" },
  { t: "bg", src: "/assets/bg/inn.jpg" },
  {
    t: "chapter",
    title: "第一话",
    sub: "志那都庄的夏日 ── 志那都荘の夏",
  },
  { t: "say", text: "木质的老建筑沉稳地立在眼前。这就是祖父经营的旅馆——「志那都庄」。据说连外国游客都赞不绝口。" },
  { t: "say", who: "玄十郎", text: "哦，将臣吗。一路上辛苦了。……别愣着，先把行李放下。", color: "#b08d57" },
  { t: "say", who: "将臣", text: "（爷爷还是老样子，严厉得让人不敢直视……不过，能再回到穗织，总归是令人怀念的。）" },
  { t: "say", text: "在志那都庄安顿下来后，表弟廉太郎和表妹小春立刻找上门来。" },
  { t: "say", who: "小春", text: "将臣哥！好久不见！今晚要不要一起去逛祭典的摊子呀？", color: "#9bc47a" },
  { t: "say", who: "廉太郎", text: "小春，别太黏人……不过说真的，明天正好有个地方想带将臣去看看。", color: "#c9a06c" },
  { t: "say", text: "夜里的旅馆木地板吱呀作响。带着旅途的疲惫，我早早睡下了——毕竟明天，还有「那个地方」等着我。" },

  // ─────────────── 神社 ───────────────
  { t: "bg", src: "/assets/bg/shrine.jpg" },
  { t: "bgm", src: null },
  {
    t: "chapter",
    title: "第二话",
    sub: "巫女与神刀 ── 巫女と神刀",
  },
  { t: "say", text: "翌日清晨。长长的石阶尽头，朱红的鸟居在夏日的阳光里熠熠生辉。" },
  { t: "say", who: "廉太郎", text: "到了，这里就是穗织的神社。那块「石头」，就在里面。", color: "#c9a06c" },
  { t: "say", text: "穿过参道，在后山的树影之间——我看到了它。" },
  { t: "bg", src: "/assets/bg/sword_rock.jpg", fx: "fx-dim" },
  { t: "fx", text: "——嗖" },
  { t: "say", text: "一块巨大的岩石上，深深地插着一把刀。刀身历经风霜，却隐隐流转着不属于人间的光泽。" },
  { t: "say", who: "将臣", text: "（这就是传说中的神刀……「丛雨丸」。据说是几百年前，为封印灾厄而插在这里的。）" },
  { t: "say", text: "谁都无法拔出，谁都无法撼动——镇上的人们如此代代相传。" },
  { t: "say", who: "将臣", text: "（可是……为什么，我觉得它在「呼唤」我？）" },
  { t: "say", text: "鬼使神差地，我伸出了手。指尖触碰到刀柄的瞬间，一股电流般的感觉窜遍全身。" },
  { t: "fx", text: "咔 嚓 ——" },
  { t: "bg", src: "/assets/bg/sword_rock.jpg", fx: "fx-flash" },
  { t: "say", text: "一声脆响，回荡在寂静的山林里。" },
  { t: "say", text: "神刀·丛雨丸——在数百年的岁月之后，折断了。" },
  { t: "say", who: "将臣", text: "（断、断了……？我我我、我做了什么——！）" },

  // ─────────────── 芳乃登场 ───────────────
  { t: "bgm", src: "/assets/music/title.mp3" },
  { t: "bg", src: "/assets/cg/yoshino_shrine.jpg" },
  { t: "show", figure: { id: "yoshino", side: "center" } },
  { t: "say", who: "？？？", text: "——何人，在此放肆。", color: "#e05c74" },
  { t: "say", text: "清冷的声音自背后响起。回头一看——白衣红袴的巫女，正一步步走近。乌黑的长发随风轻扬，锐利的目光直直钉在我身上。" },
  { t: "say", who: "朝武芳乃", whoRuby: "あさむら・よしの", text: "神刀丛雨丸，乃穗织至高之神器。汝——折断了它。", color: "#e05c74" },
  { t: "say", who: "将臣", text: "（完蛋了完蛋了完蛋了——）" },
  { t: "say", who: "朝武芳乃", text: "此事，须有人承担责任。……听好了。", color: "#e05c74" },
  { t: "say", text: "巫女大人深吸一口气，以宣读神谕般的庄严口吻说道——" },
  { t: "show", figure: { id: "yoshino", side: "center", variant: "alt" } },
  { t: "say", who: "朝武芳乃", text: "「责任を取って、いただきます」——请你，与我结婚。", color: "#e05c74" },
  { t: "fx", text: "？！？！？！" },
  { t: "say", who: "将臣", text: "（等等等等——责任是这么负的吗？！）" },

  // ─────────────── 茉子登场 ───────────────
  { t: "show", figure: { id: "mako", side: "center" } },
  { t: "say", who: "常陆茉子", whoRuby: "ひたち・まこ", text: "哎呀哎呀，芳乃还是老样子，一板一眼的。", color: "#a78bdc" },
  { t: "say", text: "不知何时，一位少女笑吟吟地立在那里。紫色的头发，狡黠的眼神——以及，和这神社格格不入的、利落的装束。" },
  { t: "say", who: "常陆茉子", text: "我是常陆茉子，芳乃的……嗯，「护卫」兼「幼驯染」。请多指教啦，折断神刀的勇士君。", color: "#a78bdc" },
  { t: "say", who: "将臣", text: "（这个称呼让人完全高兴不起来啊！）" },

  // ─────────────── 丛雨现身 ───────────────
  { t: "bg", src: "/assets/bg/sword_rock.jpg", fx: "fx-dim" },
  { t: "fx", text: "——沙沙" },
  { t: "say", text: "就在此时，折断的神刀周围，泛起了淡淡的光尘。" },
  { t: "show", figure: { id: "murasame", side: "center" } },
  { t: "say", who: "？？？", text: "……唔。睡了数百年，竟被这般吵醒。", color: "#8fd0d8" },
  { t: "say", text: "光尘凝聚成人形——一位娇小的少女，就这样浮现于刀前。银白的双马尾，古色古香的装束，还有……非人的、通透的气息。" },
  { t: "say", who: "丛雨", whoRuby: "ムラサメ", text: "吾乃宿于此刀之灵——丛雨是也。汝，折了吾的刀身。", color: "#8fd0d8" },
  { t: "say", who: "丛雨", text: "……罢了。既如此，汝便是吾新主人。好好听吾言、随吾行。", color: "#8fd0d8" },
  { t: "say", who: "将臣", text: "（信息量太大了……我的脑子要烧了……）" },

  // ─────────────── 分歧选项 ───────────────
  { t: "bg", src: "/assets/bg/shrine.jpg" },
  { t: "hide" },
  {
    t: "choice",
    prompt: "面对「结婚」的宣告，你的回答是——",
    options: [
      { label: "「……总之，先道歉吧。」", hint: "正视巫女姬的视线", goto: "route_yoshino" },
      { label: "「三十六计，走为上策！」", hint: "逃跑是自保的本能", goto: "route_mako" },
      { label: "「我想知道……这把刀的事。」", hint: "直面神刀之谜", goto: "route_murasame" },
    ],
  },

  // ─────────────── 芳乃线片段 ───────────────
  { t: "label", id: "route_yoshino" },
  { t: "bg", src: "/assets/cg/yoshino_close.jpg", fx: "fx-dim" },
  { t: "show", figure: { id: "yoshino", side: "center" } },
  { t: "say", who: "将臣", text: "对、对不起！我真的不是故意的！该赔偿的我会赔偿，但是结婚什么的……未免太重大了吧？！" },
  { t: "say", who: "朝武芳乃", text: "……哼。汝倒还算诚实。", color: "#e05c74" },
  { t: "say", text: "巫女大人别过脸去。严肃的表情之下，耳根却微微泛红。" },
  { t: "say", who: "朝武芳乃", text: "也罢。穗织自古便有「结缘」之传说。既然神刀择汝为主……今后，便在穗织好好表现吧。", color: "#e05c74" },
  { t: "say", who: "将臣", text: "（总、总觉得……被她认真注视着的时候，心跳漏了一拍。）" },
  { t: "jump", id: "converge" },

  // ─────────────── 茉子线片段 ───────────────
  { t: "label", id: "route_mako" },
  { t: "say", who: "将臣", text: "（不妙，非常不妙！趁现在——）" },
  { t: "fx", text: "嗖——！" },
  { t: "say", text: "我拔腿就跑。然而下一秒，眼前一花——" },
  { t: "bg", src: "/assets/cg/mako_carry.jpg", fx: "fx-dim" },
  { t: "show", figure: { id: "mako", side: "center" } },
  { t: "say", who: "常陆茉子", text: "想跑？在忍者面前，可是大忌哟～？", color: "#a78bdc" },
  { t: "say", text: "苦无擦着发梢钉进树干。等我回过神来，已经被反剪双臂制住了。" },
  { t: "say", who: "常陆茉子", text: "哎呀，反应还不赖嘛。不过呢——逃跑对象选错人啦。", color: "#a78bdc" },
  { t: "say", who: "将臣", text: "（这个少女……到底是巫女的护卫，还是猎手啊？！）" },
  { t: "jump", id: "converge" },

  // ─────────────── 丛雨线片段 ───────────────
  { t: "label", id: "route_murasame" },
  { t: "bg", src: "/assets/cg/murasame_sword1.jpg", fx: "fx-dim" },
  { t: "show", figure: { id: "murasame", side: "center" } },
  { t: "say", who: "将臣", text: "比起结婚……我更想知道这把刀的事。它为什么会呼唤我？穗织到底藏着什么秘密？" },
  { t: "say", text: "闻言，刀之灵睁大了眼睛——随后，露出了数百年来的第一个笑容。" },
  { t: "say", who: "丛雨", text: "哦……？数百年间，向吾问出此问者，汝乃第一人。", color: "#8fd0d8" },
  { t: "say", who: "丛雨", text: "穗织之地，古来封有「灾厄」。丛雨丸，便是其封印之楔。……而如今，楔断了。", color: "#8fd0d8" },
  { t: "say", who: "将臣", text: "（封印……灾厄……这个夏天，恐怕不会平静了。）" },
  { t: "jump", id: "converge" },

  // ─────────────── 汇合·蕾娜登场 ───────────────
  { t: "label", id: "converge" },
  { t: "bgm", src: "/assets/music/theme.mp3" },
  { t: "hide" },
  { t: "bg", src: "/assets/cg/rena_cover.jpg" },
  {
    t: "chapter",
    title: "第三话",
    sub: "北欧来客 ── 北欧からの来客",
  },
  { t: "say", text: "骚动平息后，我拖着疲惫的身体回到志那都庄——大堂里，却传来一阵元气十足的招呼声。" },
  { t: "show", figure: { id: "rena", side: "center" } },
  { t: "say", who: "蕾娜", whoRuby: "レナ・リヒテナウアー", text: "啊！是マサオミ对吧？我是蕾娜！在这家旅馆打工的留学生哟！", color: "#e8b64c" },
  { t: "say", text: "金发的少女笑容灿烂，日语说得磕磕绊绊，却热情得让人无法招架。" },
  { t: "say", who: "蕾娜", text: "从北欧的祖国，追随着对日本文化的爱，来到这里！温泉！武士！忍者！全部都好喜欢！", color: "#e8b64c" },
  { t: "say", who: "将臣", text: "（……多么纯粹的眼神。被那样的眼睛注视着，连疲惫都被治愈了几分。）" },

  // ─────────────── 尾声 ───────────────
  { t: "bgm", src: "/assets/music/title.mp3" },
  { t: "hide" },
  { t: "bg", src: "/assets/cg/starry_night.jpg", fx: "fx-dim" },
  {
    t: "chapter",
    title: "尾声",
    sub: "夏日的预感 ── 夏の予感",
  },
  { t: "say", text: "入夜，温泉街亮起暖黄的灯火。汤气袅袅升起，与星空融成一片。" },
  { t: "say", text: "折断的神刀、庄严的巫女、神秘的忍者、古老的灵、以及来自远方的留学生——" },
  { t: "say", text: "这个夏天邂逅的一切，如同散落的花瓣，在心中久久不散。" },
  { t: "say", who: "将臣", text: "（神刀择我为主……穗织的秘密，还有我未知的命运——）" },
  { t: "say", text: "千朵恋花，就此发芽。" },
  {
    t: "ending",
    id: "prologue_end",
    title: "—— 序章 · 完 ——",
    desc: "感谢游玩！完整的故事，请在正式版《千恋＊万花》中继续。",
    cg: "/assets/cg/heroines.jpg",
  },
];
