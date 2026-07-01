import { interpolate, useCurrentFrame } from "remotion";
import { msToFrames } from "../constants";
import { InfographicStep } from "../types";
import { colors } from "../theme";
import { useSceneAnimation } from "../utils/animations";
import { Icon } from "../icons/Icon";

type Props = {
  steps?: InfographicStep[];
  compact?: boolean;
  calloutStartMs?: number;
};

export const InfographicSteps: React.FC<Props> = ({ steps = [], compact = false, calloutStartMs }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, width: "100%", position: "relative" }}>
      {steps.map((step, index) => (
        <InfographicStepRow
          key={`${step.label}-${index}`}
          step={step}
          index={index}
          isLast={index === steps.length - 1}
          nextStartMs={steps[index + 1]?.startMs}
          compact={compact}
          calloutStartMs={calloutStartMs}
        />
      ))}
    </div>
  );
};

const InfographicStepRow: React.FC<{
  step: InfographicStep;
  index: number;
  isLast: boolean;
  nextStartMs?: number;
  compact?: boolean;
  calloutStartMs?: number;
}> = ({ step, index, isLast, nextStartMs, compact = false, calloutStartMs }) => {
  const frame = useCurrentFrame();
  const delayFrames = step.startMs ? msToFrames(step.startMs) : index * 12;
  const style = useSceneAnimation(step.animation ?? "slideUp", delayFrames);
  const activeEnd = nextStartMs ? msToFrames(nextStartMs) : Infinity;
  const isActive = frame >= delayFrames && frame < activeEnd;
  const glow = isActive
    ? interpolate(Math.sin(frame / 8), [-1, 1], [0.15, 0.35])
    : 0;

  // Fade out steps when callout appears
  const fadeOutFrame = calloutStartMs ? msToFrames(calloutStartMs) : Infinity;
  const opacityScale = interpolate(frame, [fadeOutFrame - 10, fadeOutFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  const finalStyle: React.CSSProperties = {
    ...style,
    opacity: (style.opacity as number ?? 1) * opacityScale,
    display: "flex",
    alignItems: "center",
    justifyContent: compact ? "center" : "flex-start",
    gap: compact ? 0 : 24,
    background: isActive ? "rgba(129,140,248,0.12)" : colors.card,
    border: `1px solid ${isActive ? colors.accent : colors.cardBorder}`,
    borderRadius: compact ? 14 : 20,
    padding: compact ? "12px 18px" : "22px 28px",
    marginBottom: isLast ? 0 : (compact ? 8 : 12),
    boxShadow: isActive ? `0 0 24px rgba(129,140,248,${glow})` : "none",
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={finalStyle}>
        {!compact ? (
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(15,23,42,0.5)",
              borderRadius: 16,
              border: `1px solid ${colors.cardBorder}`,
              flexShrink: 0,
            }}
          >
            {step.icon ? (
              <Icon
                name={step.icon}
                size={44}
                animated={step.icon === "loop" || step.icon === "keyboard"}
                glow={isActive}
              />
            ) : (
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors.accent }} />
            )}
          </div>
        ) : null}
        
        <div style={{
          color: colors.white,
          fontSize: compact ? 24 : 34,
          fontWeight: 600,
          lineHeight: 1.25,
          textAlign: compact ? "center" : "left",
          flex: compact ? "none" : 1,
        }}>
          {step.label}
        </div>
        
        {isActive && !compact ? (
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: colors.accentBright,
              boxShadow: `0 0 12px ${colors.accent}`,
            }}
          />
        ) : null}
      </div>
      {!isLast && !compact ? (
        <div
          style={{
            position: "absolute",
            left: 58,
            bottom: -2,
            width: 2,
            height: 14,
            background: `linear-gradient(180deg, ${colors.accent} 0%, transparent 100%)`,
            opacity: frame >= delayFrames ? 0.6 : 0.15,
          }}
        />
      ) : null}
    </div>
  );
};
