import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export interface Animation {
  property: keyof React.CSSProperties | string;
  from: number;
  to: number;
  durationInFrames: number;
  ease: (t: number) => number;
  delay?: number;
}
type PropertyHandler = (value: number) => React.CSSProperties;

const createPropertyHandler = (): Record<string, PropertyHandler> => ({
  scale: (value: number) => ({ transform: `scale(${value})` }),
  opacity: (value: number) => ({ opacity: value }),
  translateX: (value: number) => ({ transform: `translateX(${value}px)` }),
  translateY: (value: number) => ({ transform: `translateY(${value}px)` }),
  rotate: (value: number) => ({ transform: `rotate(${value}deg)` }),
  default: () => ({}),
});

const interpolateValue = (frame: number, animation: Animation): number => {
  const { from, to, durationInFrames, ease } = animation;
  const safeFrom = Number(from);
  const safeTo = Number(to);
  const safeDuration = Math.max(1, Number(durationInFrames || 1));

  if (isNaN(safeFrom) || isNaN(safeTo)) {
    console.error("Invalid animation values:", {
      from,
      to,
      durationInFrames,
      property: animation.property,
    });
    return safeFrom;
  }

  if (durationInFrames === undefined) {
    console.warn(
      `durationInFrames is undefined for animation: ${animation.property}. Using 1 frame as default.`
    );
  }

  return interpolate(frame, [0, safeDuration], [safeFrom, safeTo], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
};

const calculateStyle = (
  animation: Animation,
  frame: number,
  totalDurationInFrames: number,
  isOut: boolean
): React.CSSProperties => {
  const { property, delay = 0, durationInFrames = 1 } = animation;
  const startFrame = isOut
    ? totalDurationInFrames - durationInFrames - delay
    : delay;
  const adjustedFrame = frame - startFrame;
  const value = interpolateValue(adjustedFrame, animation);

  const propertyHandler = createPropertyHandler();
  return (propertyHandler[property] || propertyHandler.default)(value);
};

export const useAnimation = (
  animations: Animation[],
  totalDurationInFrames: number,
  isOut: boolean = false
): React.CSSProperties => {
  const frame = useCurrentFrame();

  return React.useMemo(() => {
    if (animations.length === 0) return {};

    return animations.reduce<React.CSSProperties>((style, anim) => {
      if (anim.from === undefined || anim.to === undefined) {
        console.error("Invalid animation object:", anim);
        return style;
      }
      const newStyle = calculateStyle(
        anim,
        frame,
        totalDurationInFrames,
        isOut
      );
      return { ...style, ...newStyle };
    }, {});
  }, [animations, frame, totalDurationInFrames, isOut]);
};

export const combineAnimations = (
  animations: Animation | Animation[] | undefined
): Animation[] => {
  if (!animations) return [];
  return Array.isArray(animations) ? animations : [animations];
};
