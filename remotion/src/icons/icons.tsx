import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";

type IconSvgProps = {
  size?: number;
  color?: string;
  accent?: string;
};

const stroke = (color: string) => ({
  fill: "none",
  stroke: color,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const LightbulbBrainIcon: React.FC<IconSvgProps> = ({
  size = 64,
  color = colors.white,
  accent = colors.accentBright,
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="22" r="14" style={stroke(accent)} />
    <path d="M26 36h12M28 40h8M30 44h4" style={stroke(color)} />
    <path d="M22 18c-2 4-2 8 0 12M42 18c2 4 2 8 0 12" style={stroke(accent)} />
    <path
      d="M18 48c0-4 3-7 7-8 2-1 4-1 6 0 4 1 7 4 7 8"
      style={stroke(color)}
    />
    <circle cx="28" cy="20" r="2" fill={accent} />
    <circle cx="36" cy="20" r="2" fill={accent} />
  </svg>
);

export const ChatBubbleIcon: React.FC<IconSvgProps & { animated?: boolean }> = ({
  size = 64,
  color = colors.white,
  accent = colors.accent,
  animated = false,
}) => {
  const frame = useCurrentFrame();
  const dot1 = animated ? interpolate(Math.sin(frame / 6), [-1, 1], [0.3, 1]) : 1;
  const dot2 = animated ? interpolate(Math.sin((frame + 8) / 6), [-1, 1], [0.3, 1]) : 1;
  const dot3 = animated ? interpolate(Math.sin((frame + 16) / 6), [-1, 1], [0.3, 1]) : 1;

  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect x="8" y="10" width="48" height="36" rx="10" style={stroke(accent)} fill="rgba(129,140,248,0.12)" />
      <path d="M22 46l-6 10 8-10" style={stroke(accent)} />
      {animated ? (
        <>
          <circle cx="22" cy="28" r="3" fill={color} opacity={dot1} />
          <circle cx="32" cy="28" r="3" fill={color} opacity={dot2} />
          <circle cx="42" cy="28" r="3" fill={color} opacity={dot3} />
        </>
      ) : (
        <path d="M20 28h24M20 34h16" style={stroke(color)} />
      )}
    </svg>
  );
};

export const KeyboardIcon: React.FC<IconSvgProps> = ({
  size = 64,
  color = colors.white,
  accent = colors.accent,
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <rect x="6" y="18" width="52" height="32" rx="6" style={stroke(accent)} fill="rgba(15,23,42,0.5)" />
    {[0, 1, 2, 3].map((row) =>
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].slice(0, row === 3 ? 6 : 10).map((col) => (
        <rect
          key={`${row}-${col}`}
          x={10 + col * 4.5}
          y={22 + row * 6}
          width={3.5}
          height={3.5}
          rx={0.8}
          fill={row === 0 && col < 3 ? accent : color}
          opacity={row === 0 && col < 3 ? 1 : 0.5}
        />
      )),
    )}
    <rect x="18" y="44" width="28" height="3" rx="1" fill={color} opacity={0.6} />
  </svg>
);

export const ArrowRightIcon: React.FC<IconSvgProps> = ({
  size = 64,
  color = colors.accentBright,
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <path d="M12 32h32M36 22l14 10-14 10" style={stroke(color)} />
    <circle cx="20" cy="32" r="4" fill={color} opacity={0.4} />
  </svg>
);

export const LoopIcon: React.FC<IconSvgProps & { animated?: boolean }> = ({
  size = 64,
  color = colors.accentBright,
  animated = false,
}) => {
  const frame = useCurrentFrame();
  const rotation = animated ? (frame * 3) % 360 : 0;

  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <g transform={`rotate(${rotation} 32 32)`}>
        <path
          d="M44 24a16 16 0 0 0-28 8M20 40a16 16 0 0 0 28-8"
          style={stroke(color)}
        />
        <path d="M44 16v8h-8M20 48v-8h8" style={stroke(color)} />
      </g>
      <text x="32" y="36" textAnchor="middle" fill={color} fontSize="10" fontWeight="700">
        word
      </text>
    </svg>
  );
};

export const ChatCompleteIcon: React.FC<IconSvgProps> = ({
  size = 64,
  color = colors.white,
  accent = "#34d399",
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="22" fill="rgba(52,211,153,0.15)" stroke={accent} strokeWidth="2" />
    <path d="M22 32l8 8 16-16" style={{ ...stroke(accent), strokeWidth: 3 }} />
    <rect x="38" y="8" width="18" height="14" rx="4" style={stroke(color)} fill="rgba(129,140,248,0.2)" />
    <path d="M42 15h10M42 18h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const BooksIcon: React.FC<IconSvgProps> = ({
  size = 48,
  color = colors.white,
  accent = colors.accent,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <rect x="6" y="10" width="12" height="30" rx="2" style={stroke(accent)} fill="rgba(129,140,248,0.15)" />
    <rect x="18" y="6" width="12" height="34" rx="2" style={stroke(color)} fill="rgba(148,163,184,0.1)" />
    <rect x="30" y="12" width="12" height="28" rx="2" style={stroke(accent)} fill="rgba(129,140,248,0.15)" />
    <path d="M9 16h6M21 12h6M33 18h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />
  </svg>
);

export const GlobeIcon: React.FC<IconSvgProps> = ({
  size = 48,
  color = colors.white,
  accent = colors.accent,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="16" style={stroke(accent)} />
    <ellipse cx="24" cy="24" rx="7" ry="16" style={stroke(color)} opacity={0.7} />
    <path d="M8 24h32M10 16h28M10 32h28" style={stroke(color)} opacity={0.5} />
  </svg>
);

export const SearchIcon: React.FC<IconSvgProps & { crossed?: boolean }> = ({
  size = 48,
  color = colors.white,
  accent = colors.highlight,
  crossed = false,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <circle cx="20" cy="20" r="10" style={stroke(color)} />
    <path d="M28 28l10 10" style={stroke(color)} />
    {crossed ? (
      <path d="M12 12l24 24" style={{ ...stroke(accent), strokeWidth: 3 }} />
    ) : null}
  </svg>
);

export const BrainIcon: React.FC<IconSvgProps & { crossed?: boolean }> = ({
  size = 48,
  color = colors.white,
  accent = colors.highlight,
  crossed = false,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path
      d="M16 20c-4 0-6 3-6 7 0 4 2 7 6 8-1 4 2 8 8 8 2 0 4-1 6-2 2 1 4 2 6 2 6 0 9-4 8-8 4-1 6-4 6-8 0-4-2-7-6-7-1-6-6-10-12-10s-11 4-12 10z"
      style={stroke(color)}
      fill="rgba(129,140,248,0.1)"
    />
    <path d="M24 18v20" style={stroke(color)} opacity={0.4} />
    {crossed ? (
      <path d="M10 10l28 28" style={{ ...stroke(accent), strokeWidth: 3 }} />
    ) : null}
  </svg>
);

export const ChipIcon: React.FC<IconSvgProps> = ({
  size = 48,
  color = colors.white,
  accent = colors.accentBright,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <rect x="12" y="12" width="24" height="24" rx="4" style={stroke(accent)} fill="rgba(129,140,248,0.2)" />
    {[14, 20, 26, 32].map((y) => (
      <g key={y}>
        <path d={`M8 ${y}h4M36 ${y}h4`} style={stroke(color)} />
      </g>
    ))}
    {[14, 20, 26, 32].map((x) => (
      <g key={x}>
        <path d={`M${x} 8v4M${x} 36v4`} style={stroke(color)} />
      </g>
    ))}
    <text x="24" y="27" textAnchor="middle" fill={accent} fontSize="7" fontWeight="800">
      LLM
    </text>
  </svg>
);

export const CheckIcon: React.FC<IconSvgProps> = ({
  size = 28,
  accent = "#34d399",
}) => (
  <svg width={size} height={size} viewBox="0 0 28 28">
    <circle cx="14" cy="14" r="12" fill="rgba(52,211,153,0.15)" stroke={accent} strokeWidth="2" />
    <path d="M8 14l4 4 8-8" style={{ ...stroke(accent), strokeWidth: 2.5 }} />
  </svg>
);

export const PredictIcon: React.FC<IconSvgProps> = ({
  size = 28,
  color = colors.accentBright,
}) => (
  <svg width={size} height={size} viewBox="0 0 28 28">
    <path
      d="M4 20 L8 14 L12 18 L16 8 L20 12 L24 4"
      style={{ ...stroke(color), strokeWidth: 2 }}
    />
    <circle cx="24" cy="4" r="2" fill={color} />
  </svg>
);

export const PatternIcon: React.FC<IconSvgProps> = ({
  size = 28,
  color = colors.accent,
}) => (
  <svg width={size} height={size} viewBox="0 0 28 28">
    <rect x="3" y="3" width="8" height="8" rx="2" fill="rgba(129,140,248,0.3)" stroke={color} strokeWidth="1.5" />
    <rect x="17" y="3" width="8" height="8" rx="2" fill="rgba(129,140,248,0.2)" stroke={color} strokeWidth="1.5" />
    <rect x="3" y="17" width="8" height="8" rx="2" fill="rgba(129,140,248,0.2)" stroke={color} strokeWidth="1.5" />
    <rect x="17" y="17" width="8" height="8" rx="2" fill="rgba(129,140,248,0.3)" stroke={color} strokeWidth="1.5" />
    <path d="M11 7h6M7 11v6M21 11v6M11 21h6" stroke={color} strokeWidth="1" opacity={0.5} />
  </svg>
);

export const DatabaseXIcon: React.FC<IconSvgProps> = ({
  size = 28,
  color = colors.white,
  accent = colors.highlight,
}) => (
  <svg width={size} height={size} viewBox="0 0 28 28">
    <ellipse cx="14" cy="8" rx="9" ry="4" style={stroke(color)} />
    <path d="M5 8v12c0 2.2 4 4 9 4s9-1.8 9-4V8" style={stroke(color)} />
    <path d="M5 14c0 2.2 4 4 9 4s9-1.8 9-4" style={stroke(color)} opacity={0.5} />
    <path d="M6 6l16 16" style={{ ...stroke(accent), strokeWidth: 2.5 }} />
  </svg>
);

export const BellIcon: React.FC<IconSvgProps> = ({
  size = 48,
  color = colors.white,
  accent = colors.accentBright,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path
      d="M24 8c-6 0-10 5-10 11v8l-4 6h28l-4-6v-8c0-6-4-11-10-11z"
      style={stroke(accent)}
      fill="rgba(129,140,248,0.15)"
    />
    <path d="M20 38a4 4 0 0 0 8 0" style={stroke(color)} />
    <circle cx="34" cy="12" r="5" fill={accent} />
  </svg>
);

export const SparkleIcon: React.FC<IconSvgProps> = ({
  size = 32,
  color = colors.accentBright,
}) => (
  <svg width={size} height={size} viewBox="0 0 32 32">
    <path d="M16 4v24M4 16h24M8 8l16 16M24 8L8 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={0.7} />
    <circle cx="16" cy="16" r="3" fill={color} />
  </svg>
);

export const NeuralIcon: React.FC<IconSvgProps> = ({
  size = 32,
  color = colors.accent,
}) => (
  <svg width={size} height={size} viewBox="0 0 32 32">
    {[
      [8, 8], [24, 8], [16, 16], [8, 24], [24, 24],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="3" fill={color} opacity={0.8} />
    ))}
    <path
      d="M8 8l8 8M24 8l-8 8M8 24l8-8M24 24l-8-8M8 8l16 0M8 24l16 0"
      stroke={color}
      strokeWidth="1"
      opacity={0.4}
    />
  </svg>
);
