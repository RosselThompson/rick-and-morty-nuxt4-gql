export const scrollToTop = () => {
  if (!import.meta.client) return;

  window.scrollTo({
    top: 0,
  });
};
