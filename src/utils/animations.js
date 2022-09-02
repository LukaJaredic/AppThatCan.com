export const fadeIn = (duration = 0.5) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration },
});

export const slideIn = (duration = 0.5, direction = "left", start) => {
  return {
    initial: {
      x: start ? start : direction === "left" ? "-100vw" : "100vw",
    },
    animate: { x: "0" },
    transition: { duration },
  };
};
export const slideInY = (duration = 0.5, direction = "top", start) => {
  return {
    initial: {
      y: start ? start : direction === "top" ? "-100vh" : "100vh",
    },
    animate: { y: "0" },
    transition: { duration },
  };
};
