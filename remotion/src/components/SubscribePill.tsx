import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";
import { Icon } from "../icons/Icon";
import { msToFrames } from "../constants";

type Props = {
  startMs?: number;
  label?: string;
};

export const SubscribePill: React.FC<Props> = ({
  startMs = 0,
  label = "Like & Subscribe",
}) => {
  const frame = useCurrentFrame();
  const startFrame = msToFrames(startMs);

  if (frame < startFrame) return null;

  const progress = interpolate(
    frame,
    [startFrame, startFrame + 12, startFrame + 22],
    [0, 1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scale = interpolate(progress, [0, 1], [0.92, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: colors.card,
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: 999,
        padding: "10px 18px 10px 14px",
        opacity,
        transform: `scale(${scale})`,
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          paddingRight: 8,
          borderRight: `1px solid ${colors.cardBorder}`,
        }}
      >
        <Icon name="thumbs_up" size={22} />
        <span style={{ color: colors.white, fontSize: 20, fontWeight: 600 }}>Like</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Icon name="bell" size={22} />
        <span style={{ color: colors.accentBright, fontSize: 20, fontWeight: 700 }}>
          {label}
        </span>
      </div>
    </div>
  );
};
