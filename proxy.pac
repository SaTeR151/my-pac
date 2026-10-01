// Hiddify selective proxy rules for Windows PAC.
// Add new domain names in the MY SITES section below.
// No protocol, slashes, wildcards or www. needed; subdomains are included.
var HIDDIFY = "PROXY 127.0.0.1:12334";

// Forced DIRECT sites. These bypass Hiddify even if they are added below.
var directDomains = {
  "vk.com": 1, "vk.ru": 1, "vkvideo.ru": 1, "vk.me": 1,
  "userapi.com": 1, "vkuser.net": 1, "vkcdn.net": 1,
  "ya.ru": 1, "yandex.ru": 1, "mail.ru": 1, "ok.ru": 1,
  "gosuslugi.ru": 1, "sberbank.ru": 1, "tbank.ru": 1,
  "tinkoff.ru": 1, "ozon.ru": 1, "wildberries.ru": 1,
  "wb.ru": 1, "avito.ru": 1
};

// Curated developer, AI, social, streaming and other international services.
var proxyDomains = {
  // AI / neural networks
  "chatgpt.com":1, "openai.com":1, "oaistatic.com":1,
  "oaiusercontent.com":1, "anthropic.com":1, "claude.ai":1,
  "claudeusercontent.com":1, "gemini.google.com":1,
  "aistudio.google.com":1, "ai.google.dev":1,
  "generativelanguage.googleapis.com":1, "perplexity.ai":1,
  "copilot.microsoft.com":1, "grok.com":1, "x.ai":1,
  "deepseek.com":1, "huggingface.co":1, "hf.co":1,
  "poe.com":1, "openrouter.ai":1, "mistral.ai":1, "groq.com":1,
  "replicate.com":1, "fal.ai":1, "runwayml.com":1,
  "midjourney.com":1, "leonardo.ai":1, "elevenlabs.io":1,
  "suno.com":1, "udio.com":1, "stability.ai":1,
  "ideogram.ai":1, "luma.ai":1, "character.ai":1,
  "gamma.app":1,

  // Development, docs, registries and coding tools
  "github.com":1, "githubusercontent.com":1, "githubassets.com":1,
  "github.io":1, "ghcr.io":1, "githubcopilot.com":1,
  "gitlab.com":1, "gitlab.io":1, "bitbucket.org":1,
  "atlassian.com":1, "stackexchange.com":1, "stackoverflow.com":1,
  "docker.com":1, "docker.io":1, "dockerstatic.com":1,
  "npmjs.com":1, "npmjs.org":1, "pypi.org":1,
  "pythonhosted.org":1, "go.dev":1, "golang.org":1,
  "proxy.golang.org":1, "sum.golang.org":1,
  "pkg.go.dev":1, "jetbrains.com":1, "jetbrains.ai":1,
  "cursor.com":1, "cursor.sh":1, "windsurf.com":1,
  "codeium.com":1, "replit.com":1, "bolt.new":1,
  "v0.dev":1, "lovable.dev":1, "vercel.com":1,
  "netlify.com":1, "render.com":1, "railway.app":1,
  "supabase.com":1, "firebase.google.com":1,
  "sentry.io":1, "hashicorp.com":1, "terraform.io":1,
  "cloudflare.com":1, "cloudflareaccess.com":1,
  "visualstudio.com":1, "vscode.dev":1,
  "marketplace.visualstudio.com":1,

  // Video, social networks, messengers and entertainment
  "youtube.com":1, "youtu.be":1, "youtube-nocookie.com":1,
  "googlevideo.com":1, "ytimg.com":1, "youtubei.googleapis.com":1,
  "discord.com":1, "discord.gg":1, "discordapp.com":1,
  "discordapp.net":1, "instagram.com":1, "cdninstagram.com":1,
  "facebook.com":1, "fbcdn.net":1, "threads.net":1,
  "twitter.com":1, "x.com":1, "twimg.com":1, "t.co":1,
  "reddit.com":1, "redd.it":1, "redditmedia.com":1,
  "redditstatic.com":1, "twitch.tv":1, "ttvnw.net":1,
  "jtvnw.net":1, "tiktok.com":1, "tiktokcdn.com":1,
  "tiktokv.com":1, "spotify.com":1, "scdn.co":1,
  "linkedin.com":1, "licdn.com":1, "medium.com":1,
  "substack.com":1, "patreon.com":1, "notion.so":1,
  "notion.site":1, "figma.com":1, "canva.com":1,
  "steamcommunity.com":1, "whatsapp.com":1, "whatsapp.net":1,
  "netflix.com":1, "nflxvideo.net":1
};

// ===== MY SITES: add your new domains here =====
// Example: "some-site.com": 1,
var myProxyDomains = {
  "example.invalid": 1,
  "steamdb.info":1
};
// ===============================================

function matches(host, domains) {
  if (domains[host] === 1) return true;
  var dot = host.indexOf('.');
  while (dot !== -1) {
    host = host.substring(dot + 1);
    if (domains[host] === 1) return true;
    dot = host.indexOf('.');
  }
  return false;
}

function FindProxyForURL(url, host) {
  host = host.toLowerCase();
  if (host.charAt(host.length - 1) === '.') {
    host = host.substring(0, host.length - 1);
  }
  if (isPlainHostName(host) || host === "localhost" || host === "127.0.0.1") {
    return "DIRECT";
  }
  if (matches(host, directDomains)) return "DIRECT";
  if (matches(host, myProxyDomains) || matches(host, proxyDomains)) return HIDDIFY;
  return "DIRECT";
}
