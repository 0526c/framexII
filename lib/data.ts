import { CreatorIdentity, StoryConfig, Shot, ScriptScene, UserProfile } from "@/types";

export const identities: { id: CreatorIdentity; name: string; icon: string; desc: string }[] = [
  { id: "video", name: "视频创作者", icon: "🎬", desc: "短视频 / Vlog / 社交媒体" },
  { id: "ad", name: "广告创作者", icon: "📢", desc: "品牌片 / 产品视频 / 营销" },
  { id: "short", name: "短剧创作者", icon: "✨", desc: "剧情短片 / 系列内容" },
  { id: "tv", name: "剧集创作者", icon: "📺", desc: "网剧 / 电视剧 / 分集" },
  { id: "film", name: "电影创作者", icon: "🎞️", desc: "电影 / 艺术短片 / 实验" },
];

export const styles = [
  { id: "film" as const, name: "胶片 Film" },
  { id: "cool" as const, name: "冷色 Cool" },
  { id: "warm" as const, name: "暖色 Warm" },
  { id: "noir" as const, name: "黑色 Noir" },
];

export const genres = [
  { id: "romance" as const, name: "爱情 Romance" },
  { id: "thriller" as const, name: "悬疑 Thriller" },
  { id: "drama" as const, name: "剧情 Drama" },
  { id: "scifi" as const, name: "科幻 Sci-Fi" },
];

export const durations = [
  { value: 0.25, name: "15秒" },
  { value: 0.5, name: "30秒" },
  { value: 1, name: "1分钟" },
  { value: 3, name: "3分钟" },
  { value: 5, name: "5分钟" },
];

export const defaultConfig: StoryConfig = {
  identity: "video",
  identityName: "视频创作者",
  style: "film",
  styleName: "胶片 Film",
  genre: "romance",
  genreName: "爱情 Romance",
  duration: 1,
  durationName: "1分钟",
};

export const mockUser: UserProfile = {
  name: "创作者",
  avatar: "U",
  credits: 10,
  tier: "starter",
  projects: 3,
};

export function generateMockShots(genre: string): Shot[] {
  const movements: Record<string, string[]> = {
    romance: ["缓慢推镜", "环绕", "肩扛跟随", "低角度仰拍"],
    thriller: ["快速横移", "手持晃动", "窥视角度", "突然变焦"],
    drama: ["静止长镜", "缓慢横摇", "过肩镜头", "特写"],
    scifi: ["轨道环绕", "无人机俯视", "推轨变焦", "分屏"],
  };
  
  const descs: Record<string, string[]> = {
    romance: ["雨夜街道全景", "便利店相遇", "眼神交汇特写", "背影远去"],
    thriller: ["黑暗房间", "电话特写", "窗外人影", "紧张对峙"],
    drama: ["天台黄昏", "回忆闪回", "沉默对话", "城市夜景"],
    scifi: ["未来都市", "全息投影", "飞船起降", "控制室"],
  };
  
  const moves = movements[genre] || movements.romance;
  const descriptions = descs[genre] || descs.romance;
  
  return Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    number: `SHOT 0${i + 1}`,
    description: descriptions[i],
    movement: moves[i],
  }));
}

export function generateMockScript(genre: string): ScriptScene[] {
  const scripts: Record<string, ScriptScene[]> = {
    romance: [
      { scene: "EXT. 城市街道 — 雨夜", action: "雨滴敲打着便利店玻璃窗。霓虹灯在潮湿的地面上投下斑驳光影。" },
      { character: "主角", dialog: "（望着窗外，低声）这是一个人的夜晚..." },
      { action: "门铃响起。一个身影走进来，收起滴水的雨伞。两人在货架间的目光相遇。" },
      { character: "陌生人", dialog: "你也喜欢这款咖啡？" },
    ],
    thriller: [
      { scene: "INT. 房间 — 深夜", action: "时钟滴答声在黑暗中格外清晰。窗帘被风吹动，月光在墙上投下摇曳的影子。" },
      { action: "（电话铃声）" },
      { character: "主角", dialog: "（接起电话，声音颤抖）喂...？" },
      { action: "电话那头只有沉重的呼吸声。" },
    ],
    drama: [
      { scene: "EXT. 天台 — 黄昏", action: "夕阳将云层染成金红色。城市的天际线在余晖中渐渐暗淡。" },
      { character: "主角", dialog: "（背对镜头）有些选择，一旦做出就无法回头。" },
      { action: "身后传来脚步声。" },
      { action: "两人并肩站在天台边缘，望着远处的灯火。" },
    ],
    scifi: [
      { scene: "EXT. 未来都市 — 夜", action: "全息广告在雨幕中闪烁。飞行器的尾迹划过霓虹照亮的天空。" },
      { character: "AI 系统", dialog: "系统启动。正在加载记忆模块..." },
      { character: "主角", dialog: "这一次，我要改变结局。" },
      { action: "远处传来警报声。城市开始闪烁着红色的光芒。" },
    ],
  };
  
  return scripts[genre] || scripts.romance;
}
