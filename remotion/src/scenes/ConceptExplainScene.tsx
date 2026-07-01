import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { msToFrames } from "../constants";
import { Scene } from "../types";
import { BrandedBackground } from "../components/BrandedBackground";
import { CaptionOverlay } from "../components/CaptionOverlay";
import { AnimatedElement } from "../components/AnimatedElement";
import { InfographicSteps } from "../components/InfographicSteps";
import { Icon, IconName } from "../icons/Icon";
import { colors } from "../theme";
import { pickFirstSubstantialCaption, useSceneAnimation } from "../utils/animations";

const DEFAULT_CALLOUT_ICONS: IconName[] = ["search_crossed", "brain_crossed"];
const DEFAULT_CALLOUT_LABELS = ["Search", "Brain"];

export const ConceptExplainScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const { visual, captions = [] } = scene;
  const frame = useCurrentFrame();
  const contextIcons = visual.contextIcons ?? [];
  const calloutIcons = (visual.calloutIcons ?? DEFAULT_CALLOUT_ICONS) as IconName[];

  // Time the callout to appear with the concluding remark
  const last = captions[captions.length - 1];
  const substantial = pickFirstSubstantialCaption(captions);
  const lastCaptionStart = (last ?? substantial)?.startMs ?? Math.floor((scene.durationMs ?? 30000) * 0.65);
  const calloutStart = Math.min(scene.durationMs - 1800, Math.max(12000, lastCaptionStart - 400));
  const calloutStyle = useSceneAnimation("highlight", msToFrames(calloutStart));

  const layout = visual.layout ?? "infographic_stack";

  return (
    <BrandedBackground background={visual.background}>
      {contextIcons.map((item, index) => {
        const startFrame = msToFrames(item.startMs ?? 0);
        const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 0.7], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const floatY = Math.sin((frame + (item.startMs ?? 0) / 100) / 20) * 5;
        return (
          <div
            key={`${item.name}-${index}`}
            style={{
              position: "absolute",
              left: item.x ?? "8%",
              top: item.y ?? "28%",
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
          {visual.elements?.map((element, index) => {
            const hasExplicit = element.startMs != null;
            const defaultStart = index === 0 ? 180 : 280 + index * 120;
            return (
              <AnimatedElement
                key={`${element.type}-${index}`}
                {...element}
                startMs={hasExplicit ? element.startMs : defaultStart}
                delayFrames={hasExplicit ? undefined : index * 5}
              />
            );
          })}
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

        {/* Center SVG layout */}
        {layout === "center_svg" && visual.centerAsset ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "36px 0 20px 0",
              flex: 1,
              maxHeight: 600,
            }}
          >
            <Icon name={visual.centerAsset} size={620} glow animated />
          </div>
        ) : null}

        {/* Code block layout */}
        {layout === "code_block" && visual.codeSnippet ? (
          <div
            style={{
              background: colors.card,
              border: `2px solid ${colors.cardBorder}`,
              borderRadius: 24,
              padding: "28px",
              fontFamily: "Courier New, Courier, monospace",
              fontSize: 24,
              color: colors.white,
              textAlign: "left",
              boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
              margin: "32px 0",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#f87171" }} />
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fbbf24" }} />
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#34d399" }} />
            </div>
            <pre style={{ margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.4 }}>
              {visual.codeSnippet}
            </pre>
          </div>
        ) : null}

        {/* Standard step stacking */}
        {layout !== "code_block" && visual.steps && visual.steps.length > 0 ? (
          <InfographicSteps
            steps={visual.steps}
            compact={layout === "center_svg"}
            calloutStartMs={calloutStart}
          />
        ) : null}

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
            {calloutIcons.length > 0 ? (
              <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
                {calloutIcons.slice(0, 2).map((iconName, index) => (
                  <div
                    key={`${iconName}-${index}`}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
                  >
                    <Icon name={iconName} size={44} />
                    {visual.calloutIcons ? null : (
                      <span style={{ fontSize: 18, color: colors.muted, fontWeight: 500 }}>
                        {DEFAULT_CALLOUT_LABELS[index] ?? ""}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
            {visual.callout.text}
          </div>
        ) : null}
      </AbsoluteFill>
      <CaptionOverlay captions={captions} />
    </BrandedBackground>
  );
};
