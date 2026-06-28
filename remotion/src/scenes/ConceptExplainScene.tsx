import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { msToFrames } from "../constants";
import { Scene } from "../types";
import { BrandedBackground } from "../components/BrandedBackground";
import { CaptionOverlay } from "../components/CaptionOverlay";
import { AnimatedElement } from "../components/AnimatedElement";
import { InfographicSteps } from "../components/InfographicSteps";
import { Icon } from "../icons/Icon";
import { colors } from "../theme";
import { useSceneAnimation } from "../utils/animations";

const CONTEXT_ICONS = [
  { name: "books" as const, startMs: 14000, x: "8%", y: "28%" },
  { name: "globe" as const, startMs: 19000, x: "78%", y: "32%" },
  { name: "pattern" as const, startMs: 23000, x: "82%", y: "52%" },
];

export const ConceptExplainScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const { visual, captions } = scene;
  const frame = useCurrentFrame();
  const calloutStyle = useSceneAnimation("highlight", msToFrames(47000));

  return (
    <BrandedBackground background={visual.background}>
      {CONTEXT_ICONS.map((item) => {
        const startFrame = msToFrames(item.startMs);
        const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 0.7], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const floatY = Math.sin((frame + item.startMs / 100) / 20) * 5;
        return (
          <div
            key={item.name}
            style={{
              position: "absolute",
              left: item.x,
              top: item.y,
              opacity,
              transform: `translateY(${floatY}px)`,
              zIndex: 0,
            }}
          >
            <Icon name={item.name} size={52} animated glow />
          </div>
        );
      })}

      <AbsoluteFill style={{ padding: "56px 48px", justifyContent: "flex-start", zIndex: 1 }}>
        <div style={{ marginTop: 120, marginBottom: 36 }}>
          {visual.elements?.map((element, index) => (
            <AnimatedElement key={`${element.type}-${index}`} {...element} delayFrames={index * 6} />
          ))}
          {visual.metaphor ? (
            <div
              style={{
                marginTop: 20,
                color: colors.muted,
                fontSize: 28,
                textAlign: "center",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <Icon name="predict" size={24} />
              {visual.metaphor}
            </div>
          ) : null}
        </div>

        <InfographicSteps steps={visual.steps} />

        {visual.callout ? (
          <div
            style={{
              ...calloutStyle,
              marginTop: 36,
              alignSelf: "center",
              background: "rgba(239, 68, 68, 0.15)",
              border: `2px solid ${colors.highlight}`,
              borderRadius: 18,
              padding: "18px 28px",
              color: colors.white,
              fontSize: 32,
              fontWeight: 700,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <Icon name="search_crossed" size={44} />
                <span style={{ fontSize: 18, color: colors.muted, fontWeight: 500 }}>Search</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <Icon name="brain_crossed" size={44} />
                <span style={{ fontSize: 18, color: colors.muted, fontWeight: 500 }}>Brain</span>
              </div>
            </div>
            {visual.callout.text}
          </div>
        ) : null}
      </AbsoluteFill>
      <CaptionOverlay captions={captions} />
    </BrandedBackground>
  );
};
