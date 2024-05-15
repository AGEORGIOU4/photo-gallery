import { restApiGet } from 'src/common/apis';
import { unsplash_url } from 'src/common/urls';

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
