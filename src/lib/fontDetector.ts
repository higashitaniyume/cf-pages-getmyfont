export interface FontDetectionResult {
  name: string;
  isAvailable: boolean;
}

export function detectPopularFonts(fonts: string[]): FontDetectionResult[] {
  // We use a span element to measure text widths with different fonts.
  // By comparing the width of a target font to generic fallback fonts,
  // we can guess if the target font is available.
  
  const testString = "mmmmmmmmmmlli"; // Use wide and narrow characters
  const testSize = "72px";
  
  const baseFonts = ["monospace", "sans-serif", "serif"];
  
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "-9999px";
  container.style.visibility = "hidden";
  document.body.appendChild(container);
  
  const span = document.createElement("span");
  span.style.fontSize = testSize;
  span.innerHTML = testString;
  container.appendChild(span);
  
  const defaultWidths: Record<string, number> = {};
  const defaultHeights: Record<string, number> = {};
  
  // Measure baselines
  for (const base of baseFonts) {
    span.style.fontFamily = base;
    defaultWidths[base] = span.offsetWidth;
    defaultHeights[base] = span.offsetHeight;
  }
  
  const results: FontDetectionResult[] = [];
  
  for (const font of fonts) {
    let detected = false;
    for (const base of baseFonts) {
      span.style.fontFamily = `"${font}", ${base}`;
      const matched = (span.offsetWidth !== defaultWidths[base] || span.offsetHeight !== defaultHeights[base]);
      if (matched) {
        detected = true;
        break;
      }
    }
    
    // Generic family names will always match themselves, so just mark them as available
    // as browsers will resolve them to some default font.
    const genericFamilies = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui'];
    if (genericFamilies.includes(font.toLowerCase())) {
        detected = true;
    }
    
    results.push({ name: font, isAvailable: detected });
  }
  
  document.body.removeChild(container);
  return results;
}

export async function detectLocalFonts(): Promise<string[] | null> {
  // The Local Font Access API
  if ('queryLocalFonts' in window) {
    try {
      // @ts-ignore - experimental API
      const fonts = await window.queryLocalFonts();
      // @ts-ignore
      return fonts.map(f => f.fullName);
    } catch (err) {
      console.warn("Failed to query local fonts:", err);
      // Usually means permission denied or not supported
      return null;
    }
  }
  return null;
}
