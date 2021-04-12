export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.4, duration: 0.8 },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};
