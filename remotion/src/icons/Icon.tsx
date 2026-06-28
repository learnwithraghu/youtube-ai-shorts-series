import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";
import {
  ArrowRightIcon,
  BellIcon,
  BooksIcon,
  BrainIcon,
  ChatBubbleIcon,
  ChatCompleteIcon,
  CheckIcon,
  ChipIcon,
  DatabaseXIcon,
  GlobeIcon,
  KeyboardIcon,
  LightbulbBrainIcon,
  LoopIcon,
  NeuralIcon,
  PatternIcon,
  PredictIcon,
  SearchIcon,
  SparkleIcon,
  ThumbsUpIcon,
} from "./icons";

export type IconName =
  | "lightbulb_brain"
  | "chat_bubble"
  | "keyboard"
  | "arrow_right"
  | "loop"
  | "chat_bubble_complete"
  | "books"
  | "globe"
  | "search"
  | "search_crossed"
  | "brain"
  | "brain_crossed"
  | "chip"
  | "check"
  | "predict"
  | "pattern"
  | "database_x"
  | "bell"
  | "sparkle"
  | "neural"
  | "thumbs_up";

type Props = {
  name: IconName | string;
  size?: number;
  animated?: boolean;
  glow?: boolean;
  color?: string;
};

const iconComponents: Record<
  string,
  React.FC<{ size?: number; color?: string; animated?: boolean; crossed?: boolean }>
> = {
  lightbulb_brain: LightbulbBrainIcon,
  chat_bubble: ChatBubbleIcon,
  keyboard: KeyboardIcon,
  arrow_right: ArrowRightIcon,
  loop: LoopIcon,
  chat_bubble_complete: ChatCompleteIcon,
  books: BooksIcon,
  globe: GlobeIcon,
  search: SearchIcon,
  search_crossed: (p) => <SearchIcon {...p} crossed />,
  brain: BrainIcon,
  brain_crossed: (p) => <BrainIcon {...p} crossed />,
  chip: ChipIcon,
  check: CheckIcon,
  predict: PredictIcon,
  pattern: PatternIcon,
  database_x: DatabaseXIcon,
  bell: BellIcon,
  sparkle: SparkleIcon,
  neural: NeuralIcon,
  thumbs_up: ThumbsUpIcon,
};

export const Icon: React.FC<Props> = ({
  name,
  size = 56,
  animated = false,
  glow = false,
  color,
}) => {
  const frame = useCurrentFrame();
  const Component = iconComponents[name];
  const floatY = animated ? Math.sin(frame / 12) * 4 : 0;
  const glowOpacity = glow
    ? interpolate(Math.sin(frame / 10), [-1, 1], [0.3, 0.7])
    : 0;

  if (!Component) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 12,
          background: colors.card,
          border: `1px solid ${colors.cardBorder}`,
        }}
      />
    );
  }

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateY(${floatY}px)`,
      }}
    >
      {glow ? (
        <div
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(129,140,248,${glowOpacity}) 0%, transparent 70%)`,
          }}
        />
      ) : null}
      <Component
        size={size}
        color={color}
        animated={animated && (name === "chat_bubble" || name === "loop")}
      />
    </div>
  );
};
