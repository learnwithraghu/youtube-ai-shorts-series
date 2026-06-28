import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Scene } from "../types";
import { BrandedBackground } from "../components/BrandedBackground";
import { CaptionOverlay } from "../components/CaptionOverlay";
import { AnimatedElement } from "../components/AnimatedElement";
import { SubscribePill } from "../components/SubscribePill";
import { pickFollowCaption } from "../utils/animations";
import { Icon } from "../icons/Icon";

const OUTRO_ICONS = [
  { name: "neural" as const, top: "15%", left: "8%" },
  { name: "sparkle" as const, top: "20%", right: "10%" },
  { name: "chip" as const, bottom: "18%", right: "12%" },
];

export const SeriesOutroScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const { visual, captions = [] } = scene;
  const frame = useCurrentFrame();

  return (
    <BrandedBackground background={visual.background}>
      {OUTRO_ICONS.map((item, i) => {
        const opacity = interpolate(frame, [i * 8, i * 8 + 20], [0, 0.45], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={item.name}
            style={{
              position: "absolute",
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              opacity,
            }}
          >
            <Icon name={item.name} size={34} animated />
          </div>
        );
      })}

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 64,
          gap: 24,
        }}
      >
        {visual.elements?.map((element, index) => {
          const hasExplicit = element.startMs != null;
          // Default the CTA and title to align with "follow / subscribe" spoken line
          const followish = pickFollowCaption(captions)?.startMs ?? 2200;
          const defaultStart = index === 0 ? followish - 300 : followish + index * 180;
          return (
            <AnimatedElement
              key={`${element.type}-${index}`}
              {...element}
              startMs={hasExplicit ? element.startMs : defaultStart}
              delayFrames={hasExplicit ? undefined : index * 8}
            />
          );
        })}

        {(() => {
          // Show Like & Subscribe pill synced to the "follow for the next" voiceover moment
          const followCaption = pickFollowCaption(captions);
          const pillStart = followCaption ? Math.max(800, followCaption.startMs - 150) : 2400;
          return (
            <div style={{ marginTop: 8 }}>
              <SubscribePill startMs={pillStart} />
            </div>
          );
        })()}
      </AbsoluteFill>
      <CaptionOverlay captions={captions} />
    </BrandedBackground>
  );
};
