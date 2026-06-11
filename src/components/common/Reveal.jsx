import { forwardRef } from "react";
import { motion } from "framer-motion";

const motionTags = {
  article: motion.article,
  aside: motion.aside,
  button: motion.button,
  div: motion.div,
  figure: motion.figure,
  form: motion.form,
  header: motion.header,
  img: motion.img,
  li: motion.li,
  section: motion.section
};

const kindDefaults = {
  card: { direction: "up", distance: 58, scale: 0.965 },
  image: { direction: "left", distance: 72, scale: 1.04 },
  soft: { direction: "up", distance: 34, scale: 1 },
  text: { direction: "up", distance: 46, scale: 1 }
};

function offsetFor(direction, distance) {
  if (direction === "left") return { x: -distance, y: 0 };
  if (direction === "right") return { x: distance, y: 0 };
  if (direction === "down") return { x: 0, y: -distance };
  return { x: 0, y: distance };
}

const revealVariants = {
  hidden: ({ direction, distance, scale }) => ({
    opacity: 0,
    ...offsetFor(direction, distance),
    filter: "blur(8px)",
    scale
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    scale: 1
  }
};

const translateVariants = {
  hidden: ({ direction, distance }) => ({
    ...offsetFor(direction, distance)
  }),
  visible: {
    x: 0,
    y: 0
  }
};

export const Reveal = forwardRef(function Reveal({
  amount = 0.22,
  as = "div",
  children,
  className,
  delay = 0,
  direction,
  distance,
  effect = "reveal",
  kind = "text",
  once = true,
  style,
  ...props
}, ref) {
  const MotionTag = motionTags[as] || motion.div;
  const defaults = kindDefaults[kind] || kindDefaults.text;
  const custom = {
    direction: direction || defaults.direction,
    distance: distance || defaults.distance,
    scale: defaults.scale
  };

  return (
    <MotionTag
      className={className}
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      custom={custom}
      variants={effect === "translate" ? translateVariants : revealVariants}
      transition={{ delay, duration: 0.86, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform, opacity, filter", ...style }}
      {...props}
    >
      {children}
    </MotionTag>
  );
});

export function revealDelay(index, step = 0.08) {
  return Number((index * step).toFixed(2));
}
