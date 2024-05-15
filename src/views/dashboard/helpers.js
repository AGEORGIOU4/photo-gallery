export const typewriterEffect = (text, setText, intervalTime = 100) => {
  let currentIndex = 0;
  const interval = setInterval(() => {
    if (currentIndex <= text.length) {
      setText(text.slice(0, currentIndex));
      currentIndex++;
    } else {
      clearInterval(interval);
    }
  }, intervalTime);
  return () => clearInterval(interval);
};
