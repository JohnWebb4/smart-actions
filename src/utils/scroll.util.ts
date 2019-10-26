const SCROLL_DELAY = 50; // milliseconds

function scrollTo(targetX: number, targetY: number, duration: number = 1000) {
  const callsLeft = Math.max(duration / SCROLL_DELAY, 1);
  const diffX = (targetX - window.scrollX) / callsLeft;
  const diffY = (targetY - window.scrollY) / callsLeft;

  if (diffX !== 0 || (diffY !== 0 && duration > 0)) {
    window.scroll(window.scrollX + diffX, window.scrollY + diffY);

    setTimeout(
      () => scrollTo(targetX, targetY, duration - SCROLL_DELAY),
      SCROLL_DELAY
    );
  }
}

export { scrollTo };
