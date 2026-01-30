type ParsedUserAgent = {
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  device: "Desktop" | "Mobile";
  arch: string;
  engine: string;
};

export function parseUserAgent(ua: string): ParsedUserAgent {
  const lower = ua.toLowerCase();

  // Device
  const device = /mobile|android|iphone|ipad/.test(lower)
    ? "Mobile"
    : "Desktop";

  // OS
  let os = "Unknown";
  let osVersion = "Unknown";

  if (/windows nt/.test(lower)) {
    os = "Windows";
    const match = ua.match(/Windows NT ([0-9.]+)/);
    osVersion = match?.[1] === "10.0" ? "10 / 11" : match?.[1] || "Unknown";
  } else if (/mac os x/.test(lower)) {
    os = "macOS";
    const match = ua.match(/Mac OS X ([0-9_]+)/);
    osVersion = match?.[1]?.replace(/_/g, ".") || "Unknown";
  } else if (/android/.test(lower)) {
    os = "Android";
    const match = ua.match(/Android ([0-9.]+)/);
    osVersion = match?.[1] || "Unknown";
  } else if (/iphone|ipad/.test(lower)) {
    os = "iOS";
    const match = ua.match(/OS ([0-9_]+)/);
    osVersion = match?.[1]?.replace(/_/g, ".") || "Unknown";
  }

  // Browser
  let browser = "Unknown";
  let browserVersion = "Unknown";

  if (/edg\//.test(lower)) {
    browser = "Edge";
    browserVersion = ua.match(/Edg\/([0-9.]+)/)?.[1] || "Unknown";
  } else if (/chrome\//.test(lower)) {
    browser = "Chrome";
    browserVersion = ua.match(/Chrome\/([0-9.]+)/)?.[1] || "Unknown";
  } else if (/firefox\//.test(lower)) {
    browser = "Firefox";
    browserVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1] || "Unknown";
  } else if (/safari\//.test(lower)) {
    browser = "Safari";
    browserVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || "Unknown";
  }

  // Architecture
  let arch = "Unknown";
  if (/x64|win64|amd64/.test(lower)) arch = "x64";
  if (/arm|aarch64/.test(lower)) arch = "ARM";

  // Engine
  let engine = "Unknown";
  if (/applewebkit/.test(lower)) engine = "WebKit";
  if (/gecko\//.test(lower)) engine = "Gecko";

  return {
    browser,
    browserVersion,
    os,
    osVersion,
    device,
    arch,
    engine,
  };
}
