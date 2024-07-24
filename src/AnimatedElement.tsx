import React from "react";
import { Animation, combineAnimations, useAnimation } from "./useAnimation";

export interface AnimatedElementProps {
  animationIn?: Animation | Animation[];
  animationOut?: Animation | Animation[];
  durationInFrames: number;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  animationIn,
  animationOut,
  durationInFrames,
  children,
  className,
}) => {
  const inStyle = useAnimation(
    combineAnimations(animationIn),
    durationInFrames,
    false
  );
  const outStyle = useAnimation(
    combineAnimations(animationOut),
    durationInFrames,
    true
  );

  const combinedStyle = React.useMemo(() => {
    const result = { ...inStyle } as { [key: string]: any };
    Object.entries(outStyle).forEach(([key, value]) => {
      if (key === "transform") {
        result[key] = `${result[key] || ""} ${value || ""}`.trim();
      } else if (
        key in result &&
        typeof result[key] === "number" &&
        typeof value === "number"
      ) {
        result[key] = result[key] * value;
      } else {
        result[key] = value;
      }
    });
    return result as React.CSSProperties;
  }, [inStyle, outStyle]);

  return (
    <div style={combinedStyle} className={className}>
      {children}
    </div>
  );
};

// Re-export Animation
export { Animation };

// Export a more flexible combine function
export const combine = (
  ...animations: (Animation | Animation[] | undefined)[]
): Animation[] => {
  return animations
    .flat()
    .filter((anim): anim is Animation => anim !== undefined)
    .reduce((acc, curr) => {
      const existingAnim = acc.find((a) => a.property === curr.property);
      if (existingAnim) {
        // Merge animations for the same property
        return acc.map((a) =>
          a.property === curr.property
            ? {
                ...a,
                from: Math.min(a.from, curr.from),
                to: Math.max(a.to, curr.to),
                durationInFrames: Math.max(
                  a.durationInFrames,
                  curr.durationInFrames
                ),
                delay: Math.min(a.delay || 0, curr.delay || 0),
                ease: (t: number) => (a.ease(t) + curr.ease(t)) / 2, // Average the easing functions
              }
            : a
        );
      } else {
        // Add new animation
        return [...acc, curr];
      }
    }, [] as Animation[]);
};
