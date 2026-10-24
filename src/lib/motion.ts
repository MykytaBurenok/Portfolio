export const motionTiming = {
  hover: 0.22,
  hero: 0.56,
  reveal: 0.64,
  heroStagger: 0.12,
  sectionOffset: 16,
  heroOffset: 14,
} as const;

export const editorialEase = [0.22, 1, 0.36, 1] as const;

export function fadeUpVariants(reduceMotion: boolean, offset = motionTiming.heroOffset) {
  return {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : offset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : motionTiming.hero,
        ease: editorialEase,
      },
    },
  };
}
