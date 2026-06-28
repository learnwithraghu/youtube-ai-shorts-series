import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { backgrounds } from "../theme";

type Props = {
  background?: string;
  children: React.ReactNode;
  animated?: boolean;
};

export const BrandedBackground: React.FC<Props> = ({
  background = "gradient_dark_blue",
  children,
  animated = true,
}) => {
  const frame = useCurrentFrame();
  const orb1Y = animated ? Math.sin(frame / 40) * 12 : 0;
  const orb2X = animated ? Math.cos(frame / 35) * 10 : 0;

  return (
    <AbsoluteFill
      style={{
        background: backgrounds[background] ?? backgrounds.gradient_dark_blue,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 20% 10%, rgba(129,140,248,0.18), transparent 35%), radial-gradient(circle at 80% 85%, rgba(99,102,241,0.12), transparent 30%)",
        }}
      />
      {animated ? (
        <>
          <div
            style={{
              position: "absolute",
              top: `calc(8% + ${orb1Y}px)`,
              right: "12%",
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "15%",
              left: `calc(8% + ${orb2X}px)`,
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <AbsoluteFill
            style={{
              opacity: interpolate(Math.sin(frame / 60), [-1, 1], [0.02, 0.05]),
              backgroundImage:
                "linear-gradient(rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.15) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              pointerEvents: "none",
            }}
          />
        </>
      ) : null}
      {children}
    </AbsoluteFill>
  );
};
