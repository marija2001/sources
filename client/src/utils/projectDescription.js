export function normalizeDescription(raw) {
  if (raw == null) return "";
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw)) return raw.filter(Boolean).join("\n\n");
  return String(raw);
}

/** Prisma Studio / Atlas often flatten newlines — recover ## sections and paragraphs. */
export function prepareDescriptionText(text) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\s+##\s+/g, "\n\n## ")
    .replace(/\s+#(?!\#)\s+/g, "\n\n# ")
    .trim();
}

function splitProseSentences(block) {
  if (block.startsWith("#")) return [block];
  return block
    .split(/(?<=[.!?])\s+(?=[A-Z"'])/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function splitDescriptionBlocks(raw) {
  const text = prepareDescriptionText(normalizeDescription(raw));
  if (!text) return [];

  return text
    .split(/\n\s*\n+/)
    .map((b) => b.trim())
    .filter(Boolean)
    .flatMap(splitProseSentences);
}

export function renderInline(text) {
  const parts = text.split(/(\*\*[^*\n]+\*\*)/g);
  return parts.map((part, i) => {
    if (/^\*\*[^*\n]+\*\*$/.test(part)) {
      return { type: "strong", key: i, text: part.slice(2, -2) };
    }
    return { type: "text", key: i, text: part };
  });
}

export function parseHeadingBlock(block) {
  if (block.startsWith("## ")) {
    return { level: 2, rest: block.slice(3).trim() };
  }
  if (block.startsWith("# ")) {
    return { level: 3, rest: block.slice(2).trim() };
  }
  return null;
}

/** "## Highlights - a - b" or "## Capabilities demonstrated ..." */
export function parseHeadingSection(rest) {
  if (rest.startsWith("Capabilities demonstrated")) {
    return {
      title: "Capabilities demonstrated",
      items: [],
      body: rest.slice("Capabilities demonstrated".length).trim(),
    };
  }
  if (rest.startsWith("Status")) {
    return {
      title: "Status",
      items: [],
      body: rest.slice("Status".length).trim(),
    };
  }
  if (rest.startsWith("Highlights")) {
    const listPart = rest.slice("Highlights".length).replace(/^\s*-\s*/, "");
    const items = listPart
      .split(/\s+-\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    return { title: "Highlights", items, body: "" };
  }
  if (rest.includes(" - ")) {
    const parts = rest.split(/\s+-\s+/).map((s) => s.trim()).filter(Boolean);
    return { title: parts[0], items: parts.slice(1), body: "" };
  }
  return { title: rest, items: [], body: "" };
}
