import { Icon } from "../icons/Icon";
import { useSceneAnimation } from "../utils/animations";
import { VisualElement } from "../types";
import { colors } from "../theme";

type Props = VisualElement & {
  delayFrames?: number;
  fontSize?: number;
};

export const AnimatedElement: React.FC<Props> = ({
  type,
  text,
  asset,
  animation = "fadeIn",
  delayFrames = 0,
  fontSize,
}) => {
  const style = useSceneAnimation(animation, delayFrames);

  if (type === "icon" && asset) {
    const iconSize = fontSize ?? 96;
    return (
      <div style={style}>
        <Icon
          name={asset}
          size={iconSize}
          animated={asset === "chat_bubble" || asset === "loop"}
          glow={asset === "lightbulb_brain" || asset === "chip"}
        />
      </div>
    );
  }

  const base: React.CSSProperties = {
    ...style,
    color: colors.white,
    textAlign: "center",
  };

  switch (type) {
    case "title":
      return (
        <div style={{ ...base, fontSize: fontSize ?? 64, fontWeight: 800 }}>
          {text}
        </div>
      );
    case "subtitle":
      return (
        <div
          style={{
            ...base,
            fontSize: fontSize ?? 34,
            fontWeight: 500,
            color: colors.muted,
            marginTop: 16,
          }}
        >
          {text}
        </div>
      );
    case "headline":
      return (
        <div style={{ ...base, fontSize: fontSize ?? 52, fontWeight: 800, lineHeight: 1.15 }}>
          {text}
        </div>
      );
    case "cta":
      return (
        <div
          style={{
            ...base,
            fontSize: fontSize ?? 38,
            fontWeight: 700,
            color: colors.accentBright,
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <Icon name="bell" size={40} animated />
          {text}
        </div>
      );
    case "badge":
    case "label":
      return (
        <div
          style={{
            ...base,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontSize: fontSize ?? 28,
            fontWeight: 600,
            background: colors.card,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 999,
            padding: "10px 22px",
          }}
        >
          {type === "label" ? <Icon name="chip" size={22} /> : null}
          {text}
        </div>
      );
    default:
      return (
        <div style={{ ...base, fontSize: fontSize ?? 32, fontWeight: 600 }}>
          {text}
        </div>
      );
  }
};
