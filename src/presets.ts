import { Easing } from "remotion";

import { Animation } from "./types";

export const presets: { [key: string]: Animation } = {};

presets["fadeIn"] = {
  property: "opacity",
  from: 0,
  to: 1,
  durationInFrames: 30,
  ease: Easing.linear,
};

presets["fadeOut"] = {
  property: "opacity",
  from: 1,
  to: 0,
  durationInFrames: 30,
  ease: Easing.linear,
};

presets["scaleIn"] = {
  property: "scale",
  from: 0,
  to: 1,
  durationInFrames: 30,
  ease: Easing.ease,
};

presets["scaleOut"] = {
  property: "scale",
  from: 1,
  to: 0.5,
  durationInFrames: 30,
  ease: Easing.ease,
};

presets["slideIn"] = {
  property: "translateY",
  from: 50,
  to: 0,
  durationInFrames: 30,
  delay: 0,
  ease: Easing.ease,
};

presets["wordFadeIn"] = {
  property: "opacity",
  from: 0,
  to: 1,
  durationInFrames: 30, // Duration for each word's animation
  ease: Easing.linear,
  delay: 0, // You can add a delay here if needed
};

presets["wordFadeOut"] = {
  property: "opacity",
  from: 1,
  to: 0,
  durationInFrames: 30,
  ease: Easing.linear,
};
