# Remotion Kit

Remotion Kit is a library of small helper components and presets to simplify the animation and prototyping process in Remotion.

This is an early development version so be warned that there probably will be breaking changes in the future.

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Components](#components)
   - [AnimatedElement](#animatedelement)
   - [AnimatedText](#animatedtext)
4. [API Reference](#api-reference)
   - [Animation](#animation)
   - [useAnimation](#useanimation)
   - [combine](#combine)
   - [presets](#presets)
5. [Examples](#examples)
6. [Building and Contributing](#building-and-contributing)

## Installation

To install Remotion Kit in your project, run:

```bash
npm install remotion-kit
```

Make sure you have Remotion and its peer dependencies installed in your project as well.

## Quick Start

Here's a simple example of how to use Remotion Kit in your Remotion project:

```jsx
import { AnimatedElement, AnimatedText, presets } from "remotion-kit";
import { useVideoConfig } from "remotion";

export const MyComposition = () => {
  const { durationInFrames } = useVideoConfig();

  return (
    <div>
      {/* Animation in and out of an element */}
      <Sequence from={0} duration={100}>
        <AnimatedElement
          animationIn={presets.fadeIn}
          animationOut={presets.fadeOut}
          durationInFrames={durationInFrames}
        >
          <img src="my-image.jpg" alt="Animated image" />
        </AnimatedElement>
      </Sequence>

      <AnimatedText
        durationInFrames={durationInFrames}
        wordAnimation={{
          animation: presets.fadeIn,
          overlap: 0.5,
        }}
      >
        Welcome to Remotion Kit!
      </AnimatedText>
    </div>
  );
};
```

## Components

### AnimatedElement

`AnimatedElement` is a wrapper component that applies animations to its content.

#### Props

- `animationIn`: Animation or array of animations to apply when the element enters.
- `animationOut`: Animation or array of animations to apply when the element exits.
- `durationInFrames`: Total duration of the animation in frames.
- `children`: React node to be animated.
- `className`: Optional CSS class name.

#### Example

```jsx
<AnimatedElement
  animationIn={presets.fadeIn}
  animationOut={presets.fadeOut}
  durationInFrames={60}
>
  <div>This content will fade in and out</div>
</AnimatedElement>
```

### AnimatedText

`AnimatedText` is a component for animating text content with word-level and letter-level animations.

#### Props

- `children`: Text content to animate.
- `durationInFrames`: Total duration of the animation in frames.
- `wordAnimation`: Optional configuration for word-level animations.
- `letterAnimation`: Optional configuration for letter-level animations.
- `className`: Optional CSS class name.

#### Example

```jsx
<AnimatedText
  durationInFrames={90}
  wordAnimation={{
    animation: presets.fadeIn,
    overlap: 0.3,
  }}
>
  This text will animate word by word
</AnimatedText>
```

## API Reference

### Animation

The `Animation` interface defines the structure for creating custom animations:

```typescript
interface Animation {
  property: keyof React.CSSProperties | string;
  from: number;
  to: number;
  durationInFrames: number;
  ease: (t: number) => number;
  delay?: number;
}
```

### useAnimation

`useAnimation` is a custom hook that applies animations to a component.

```typescript
const style = useAnimation(animations, totalDurationInFrames, isOut);
```

### combine

`combine` is a utility function for merging multiple animations:

```typescript
const combinedAnimation = combine(animation1, animation2, animation3);
```

Using an array of object will automatically use `combine`.

### presets

`presets` is an object containing pre-defined animations.

| Preset        | Property   | From | To  | Duration (frames) | Easing            |
| ------------- | ---------- | ---- | --- | ----------------- | ----------------- |
| `fadeIn`      | opacity    | 0    | 1   | 30                | Easing.ease       |
| `fadeOut`     | opacity    | 1    | 0   | 30                | Easing.ease       |
| `scaleIn`     | scale      | 0    | 1   | 30                | Easing.elastic(1) |
| `scaleOut`    | scale      | 1    | 0.5 | 30                | Easing.ease       |
| `slideIn`     | translateY | 50   | 0   | 30                | Easing.linear     |
| `wordFadeIn`  | opacity    | 0    | 1   | 30                | Easing.linear     |
| `wordFadeOut` | opacity    | 1    | 0   | 30                | Easing.linear     |

You can use these presets as starting point and customize them to your needs like so:

```jsx
const customAnimation = {
  ...presets.fadeIn,
  durationInFrames: 60,
  ease: Easing.elastic(1),
};
```

## Examples

### Combining Animations

```jsx
import { AnimatedElement, combine, presets } from "remotion-kit";

const MyComponent = () => (
  <AnimatedElement
    animationIn={combine(presets.fadeIn, presets.scaleIn)}
    durationInFrames={60}
  >
    <div>This element will fade and scale in</div>
  </AnimatedElement>
);
```

### Staggered Text Animation

```jsx
import { AnimatedText, presets } from "remotion-kit";

const MyComponent = () => (
  <AnimatedText
    durationInFrames={120}
    wordAnimation={{
      animation: presets.fadeIn,
      overlap: 0.5,
    }}
    letterAnimation={{
      animation: presets.scaleIn,
      overlap: 0.8,
    }}
  >
    This text will have staggered word and letter animations
  </AnimatedText>
);
```

### Roadmap

- [ ] Add more presets
- [ ] Add more documentation
- [ ] Add an animatedHtml component
      This component should both apply aniimations of animatedElement on each html element and animate their text with animatedText.

## Building and Contributing

To build the project:

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`

To contribute:

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request
