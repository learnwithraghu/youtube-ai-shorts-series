import { AbsoluteFill } from "remotion";
import { Scene } from "../types";
import { BrandedBackground } from "../components/BrandedBackground";
import { CaptionOverlay } from "../components/CaptionOverlay";
import { AnimatedElement } from "../components/AnimatedElement";
import { Icon, IconName } from "../icons/Icon";
import { colors } from "../theme";
import { msToFrames } from "../constants";
import { pickFirstSubstantialCaption, useSceneAnimation } from "../utils/animations";

const DEFAULT_BULLET_ICONS: IconName[] = ["predict", "pattern", "database_x"];

function getRecapStartMs(captions: Scene["captions"]): number {
  const first = pickFirstSubstantialCaption(captions);
  if (!first) return 0;
  // Start the takeaway UI a touch before or at the spoken recap so it feels synced
  return Math.max(0, first.startMs - 120);
}

export const KeyTakeawayScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const { visual, captions = [] } = scene;
  const bulletIcons = (visual.bulletIcons ?? DEFAULT_BULLET_ICONS) as IconName[];
  const recapStart = getRecapStartMs(captions);

  // Spread bullets nicely across the remaining time after the recap starts
  const bulletStartOffset = 520; // ms after recap header starts
  const bulletStagger = 420; // ms between bullets

  return (
    <BrandedBackground background={visual.background}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 56,
          gap: 28,
        }}
      >
        {visual.elements?.map((element, index) => {
          const hasExplicit = element.startMs != null;
          const startMs = hasExplicit ? element.startMs : recapStart + index * 80;
          return (
            <AnimatedElement
              key={`${element.type}-${index}`}
              {...element}
              startMs={startMs}
              delayFrames={hasExplicit ? undefined : index * 6}
            />
          );
        })}

        <div
          style={{
            width: "100%",
            background: colors.card,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 24,
            padding: "36px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {visual.bullets?.map((bullet, index) => {
            const text = typeof bullet === "string" ? bullet : bullet.text ?? String(bullet);
            const explicitStart = typeof bullet === "object" ? bullet.startMs : undefined;
            const computedStart = recapStart + bulletStartOffset + index * bulletStagger;
            return (
              <BulletRow
                key={index}
                text={text}
                icon={bulletIcons[index] ?? "check"}
                startMs={explicitStart ?? computedStart}
              />
            );
          })}
        </div>
      </AbsoluteFill>
      <CaptionOverlay captions={captions} />
    </BrandedBackground>
  );
};

const BulletRow: React.FC<{ text: string; icon: IconName; startMs: number }> = ({
  text,
  icon,
  startMs,
}) => {
  const delayFrames = msToFrames(startMs);
  const style = useSceneAnimation("slideUp", delayFrames);

  return (
    <div style={{ ...style, display: "flex", alignItems: "center", gap: 18 }}>
      <div
        style={{
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={32} glow />
      </div>
      <div style={{ color: colors.white, fontSize: 34, fontWeight: 600, lineHeight: 1.3 }}>
        {text}
      </div>
    </div>
  );
};
