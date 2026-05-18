import * as React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Icon stroke/fill color. Defaults to `"currentColor"`. */
  color?: string;
  /** Icon width in px. Defaults to `15`. */
  width?: number | string;
  /** Icon height in px. Defaults to `15`. */
  height?: number | string;
}

// ─── Shared SVG defaults (Radix-style) ───────────────────────────────────────
const defaultProps: React.SVGAttributes<SVGSVGElement> = {
  width: 15,
  height: 15,
  viewBox: "0 0 15 15",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
};

// ─── 1. ElectronicsIcon ───────────────────────────────────────────────────────
export const ElectronicsIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", ...props }, ref) => (
    <svg ref={ref} {...defaultProps} {...props} aria-label="Electronics">
      {/* Laptop body */}
      <rect x="1" y="2.5" width="13" height="8" rx="1" stroke={color} strokeWidth="1.1" />
      {/* Screen inner */}
      <rect x="2.5" y="3.8" width="10" height="5.2" rx="0.4" stroke={color} strokeWidth="0.9" />
      {/* Keyboard base */}
      <path
        d="M0.5 10.5H14.5L13.5 12.5H1.5L0.5 10.5Z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      {/* Trackpad */}
      <rect x="6" y="11.1" width="3" height="1.2" rx="0.3" fill={color} opacity="0.5" />
      {/* Power dot */}
      <circle cx="7.5" cy="6.4" r="0.9" fill={color} />
    </svg>
  )
);
ElectronicsIcon.displayName = "ElectronicsIcon";

// ─── 2. JewelryIcon ──────────────────────────────────────────────────────────
export const JewelryIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", ...props }, ref) => (
    <svg ref={ref} {...defaultProps} {...props} aria-label="Jewelry">
      {/* Diamond top facets */}
      <path
        d="M3 5.5L7.5 2L12 5.5"
        stroke={color}
        strokeWidth="1.1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Diamond middle bar */}
      <path d="M1.5 5.5H13.5" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
      {/* Diamond bottom point */}
      <path
        d="M1.5 5.5L7.5 13.5L13.5 5.5"
        stroke={color}
        strokeWidth="1.1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Inner facet lines */}
      <path
        d="M3 5.5L7.5 13.5M12 5.5L7.5 13.5"
        stroke={color}
        strokeWidth="0.7"
        strokeOpacity="0.5"
        strokeLinecap="round"
      />
      <path
        d="M3 5.5L7.5 8.5L12 5.5"
        stroke={color}
        strokeWidth="0.7"
        strokeOpacity="0.5"
        strokeLinejoin="round"
      />
    </svg>
  )
);
JewelryIcon.displayName = "JewelryIcon";

// ─── 3. MensClothingIcon ─────────────────────────────────────────────────────
export const MensClothingIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", ...props }, ref) => (
    <svg ref={ref} {...defaultProps} {...props} aria-label="Men's Clothing">
      {/* T-shirt body */}
      <path
        d="M4.5 2H10.5L13 5L11 6V13H4V6L2 5L4.5 2Z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Collar V-neck */}
      <path
        d="M4.5 2L6 4.5H7.5M10.5 2L9 4.5H7.5"
        stroke={color}
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Button line */}
      <line
        x1="7.5"
        y1="5.5"
        x2="7.5"
        y2="12"
        stroke={color}
        strokeWidth="0.7"
        strokeDasharray="1 1.2"
        strokeLinecap="round"
      />
    </svg>
  )
);
MensClothingIcon.displayName = "MensClothingIcon";

// ─── 4. WomensClothingIcon ───────────────────────────────────────────────────
export const WomensClothingIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", ...props }, ref) => (
    <svg ref={ref} {...defaultProps} {...props} aria-label="Women's Clothing">
      {/* Dress top bodice */}
      <path
        d="M4.5 1.5H10.5V2.5C10.5 2.5 9 4 7.5 4C6 4 4.5 2.5 4.5 2.5V1.5Z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      {/* Shoulder straps */}
      <path
        d="M4.5 1.5L3 3.5M10.5 1.5L12 3.5"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Skirt flare */}
      <path
        d="M3 3.5L2 13.5H13L12 3.5C12 3.5 10.5 5.5 7.5 5.5C4.5 5.5 3 3.5 3 3.5Z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      {/* Waist seam */}
      <path
        d="M3 7H12"
        stroke={color}
        strokeWidth="0.7"
        strokeOpacity="0.55"
        strokeLinecap="round"
      />
    </svg>
  )
);
WomensClothingIcon.displayName = "WomensClothingIcon";

// ─── Demo ─────────────────────────────────────────────────────────────────────
interface IconEntry {
  Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  label: string;
}

const icons: IconEntry[] = [
  { Icon: ElectronicsIcon, label: "Electronics" },
  { Icon: JewelryIcon, label: "Jewelry" },
  { Icon: MensClothingIcon, label: "Men's Clothing" },
  { Icon: WomensClothingIcon, label: "Women's Clothing" },
];

const sizes: number[] = [15, 24, 36, 48];

interface ColorSwatch {
  bg: string;
  fg: string;
  name: string;
}

const colorSwatches: ColorSwatch[] = [
  { bg: "#1c1917", fg: "#fafaf9", name: "Dark" },
  { bg: "#0ea5e9", fg: "#fff", name: "Sky" },
  { bg: "#f59e0b", fg: "#fff", name: "Amber" },
  { bg: "#10b981", fg: "#fff", name: "Emerald" },
  { bg: "#8b5cf6", fg: "#fff", name: "Violet" },
];

export default function CategoryIconsDemo(): React.JSX.Element {
  return (
    <main
      style={{
        fontFamily: "'DM Mono', 'Fira Mono', monospace",
        background: "#fafaf9",
        minHeight: "100vh",
        padding: "48px 32px",
        color: "#1c1917",
      }}
    >
      <header style={{ marginBottom: 48 }}>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "#78716c",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Radix-style · TypeScript
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 600, margin: 0 }}>Category Icons</h1>
      </header>

      {/* Icon grid */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 24,
          marginBottom: 64,
        }}
      >
        {icons.map(({ Icon, label }) => (
          <div
            key={label}
            style={{
              background: "#fff",
              border: "1px solid #e7e5e4",
              borderRadius: 12,
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <Icon width={36} height={36} color="#1c1917" />
            <span style={{ fontSize: 12, letterSpacing: "0.08em", color: "#57534e" }}>{label}</span>
          </div>
        ))}
      </section>

      {/* Size scale */}
      <section style={{ marginBottom: 64 }}>
        <h2
          style={{
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#78716c",
            marginBottom: 24,
            fontWeight: 500,
          }}
        >
          Size scale
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {icons.map(({ Icon, label }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "16px 20px",
                background: "#fff",
                border: "1px solid #e7e5e4",
                borderRadius: 10,
              }}
            >
              <span style={{ fontSize: 11, color: "#a8a29e", width: 130, flexShrink: 0 }}>
                {label}
              </span>
              {sizes.map((s) => (
                <div
                  key={s}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
                >
                  <Icon width={s} height={s} color="#1c1917" />
                  <span style={{ fontSize: 9, color: "#a8a29e" }}>{s}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Color variants */}
      <section>
        <h2
          style={{
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#78716c",
            marginBottom: 24,
            fontWeight: 500,
          }}
        >
          Color variants
        </h2>
        {colorSwatches.map(({ bg, fg, name }) => (
          <div
            key={name}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              background: bg,
              borderRadius: 12,
              padding: "16px 20px",
              marginRight: 12,
              marginBottom: 12,
            }}
          >
            {icons.map(({ Icon, label }) => (
              <Icon key={label} width={22} height={22} color={fg} />
            ))}
          </div>
        ))}
      </section>

      {/* Usage snippet */}
      <section style={{ marginTop: 64 }}>
        <h2
          style={{
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#78716c",
            marginBottom: 16,
            fontWeight: 500,
          }}
        >
          Usage
        </h2>
        <pre
          style={{
            background: "#1c1917",
            color: "#d6d3d1",
            borderRadius: 10,
            padding: "20px 24px",
            fontSize: 12,
            lineHeight: 1.7,
            overflowX: "auto",
          }}
        >
          {`import type { IconProps } from "@/components/CategoryIcons";
import {
  ElectronicsIcon,
  JewelryIcon,
  MensClothingIcon,
  WomensClothingIcon,
} from "@/components/CategoryIcons";

// Default (15×15, currentColor)
<ElectronicsIcon />

// Custom size & color — fully typed
<JewelryIcon width={24} height={24} color="#8b5cf6" />

// Forwarded ref
const ref = React.useRef<SVGSVGElement>(null);
<MensClothingIcon ref={ref} />

// Spread any SVGAttributes
<WomensClothingIcon className="text-emerald-500" aria-hidden />`}
        </pre>
      </section>
    </main>
  );
}