# Remotion Kit (in development)

Remotion Kit is a library that provides a set of reusable components and utilities for creating animations in Remotion. It includes components for animating elements and text, as well as utilities for creating and combining animations.

```jsx
import { AnimatedElement, AnimatedText, presets } from "remotion-kit";


<AnimatedElement
  animationIn={[presets.scaleIn, presets.fadeIn]}
  animationOut={[presets.fadeOut, presets.scaleOut]}
  durationInFrames={durationInFrames}
  className="m-auto max-w-[720px]"
>
  <img src="https://placehold.co/960x540?text=Fade+and+scale" />
</AnimatedElement>

<AnimatedText
    durationInFrames={durationInFrames}
    wordAnimation={{
        animation: presets.fadeIn,
        overlap: 0.5,
    }}
    className="m-auto max-w-[960px] text-center"
>
  Staggered bouncy text example
</AnimatedText>
```
