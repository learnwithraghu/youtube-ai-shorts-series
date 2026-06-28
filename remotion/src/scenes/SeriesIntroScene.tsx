import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Scene } from "../types";
import { BrandedBackground } from "../components/BrandedBackground";
import { CaptionOverlay } from "../components/CaptionOverlay";
import { AnimatedElement } from "../components/AnimatedElement";
import { Icon } from "../icons/Icon";

const FLOATING_ICONS = [
  { name: "sparkle" as const, top: "12%", left: "10%", delay: 0 },
  { name: "neural" as const, top: "18%", right: "12%", delay: 15 },
  { name: "chip" as const, bottom: "22%", left: "14%", delay: 30 },
];

export const SeriesIntroScene: React.FC<{ scene: Scene }> = ({ scene }) => {
  const { visual, captions = [] } = scene;
  const frame = useCurrentFrame();

  return (
    <BrandedBackground background={visual.background}>
      {FLOATING_ICONS.map((item) => {
        const opacity = interpolate(frame, [item.delay, item.delay + 20], [0, 0.5], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const floatY = Math.sin((frame + item.delay) / 18) * 6;
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
              transform: `translateY(${floatY}px)`,
            }}
          >
            <Icon name={item.name} size={36} animated />
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
          return (
            <AnimatedElement
              key={`${element.type}-${index}`}
              {...element}
              startMs={hasExplicit ? element.startMs : undefined}
              delayFrames={hasExplicit ? undefined : index * 7}
            />
          );
        })}
      </AbsoluteFill>
      <CaptionOverlay captions={captions} />
    </BrandedBackground>
  );
};
