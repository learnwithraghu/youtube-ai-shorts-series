import { interpolate, useCurrentFrame } from "remotion";
import { msToFrames } from "../constants";
import { InfographicStep } from "../types";
import { colors } from "../theme";
import { useSceneAnimation } from "../utils/animations";
import { Icon } from "../icons/Icon";

type Props = {
  steps?: InfographicStep[];
};

export const InfographicSteps: React.FC<Props> = ({ steps = [] }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, width: "100%", position: "relative" }}>
      {steps.map((step, index) => (
        <InfographicStepRow
          key={`${step.label}-${index}`}
          step={step}
          index={index}
          isLast={index === steps.length - 1}
          nextStartMs={steps[index + 1]?.startMs}
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
}> = ({ step, index, isLast, nextStartMs }) => {
  const frame = useCurrentFrame();
  const delayFrames = step.startMs ? msToFrames(step.startMs) : index * 12;
  const style = useSceneAnimation(step.animation ?? "slideUp", delayFrames);
  const activeEnd = nextStartMs ? msToFrames(nextStartMs) : Infinity;
  const isActive = frame >= delayFrames && frame < activeEnd;
  const glow = isActive
    ? interpolate(Math.sin(frame / 8), [-1, 1], [0.15, 0.35])
    : 0;

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          gap: 24,
          background: isActive ? "rgba(129,140,248,0.12)" : colors.card,
          border: `1px solid ${isActive ? colors.accent : colors.cardBorder}`,
          borderRadius: 20,
          padding: "22px 28px",
          marginBottom: isLast ? 0 : 12,
          boxShadow: isActive ? `0 0 24px rgba(129,140,248,${glow})` : "none",
        }}
      >
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
        <div style={{ color: colors.white, fontSize: 34, fontWeight: 600, lineHeight: 1.25, flex: 1 }}>
          {step.label}
        </div>
        {isActive ? (
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
      {!isLast ? (
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
