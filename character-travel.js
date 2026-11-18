const numbered = (prefix, poses) => poses.map(pose =>
  `assets/${prefix}${String(pose).padStart(2, '0')}.webp`
);

const moves = {
  slash: {
    paths: ['assets/samurai-cut/presenting.webp', ...numbered('samurai-cut/pose-', [1, 2, 3, 4, 5])],
    times: [0, 90, 180, 270, 350, 480], release: 350, impact: 520,
    ratio: 1.2, nativeRight: true, tone: '#ffe1a0',
  },
  dagger: {
    paths: numbered('throw-', [0, 1, 2, 3, 4, 5, 6, 7]),
    times: [0, 75, 145, 215, 285, 365, 455, 550], release: 285, impact: 565,
    ratio: 1, nativeRight: true, tone: '#ffacbc',
  },
  magic: {
    paths: numbered('mage-guide/pose-', [0, 2, 3, 5]),
    times: [0, 100, 235, 520], release: 235, impact: 550,
    ratio: 1, nativeRight: true, tone: '#85f1ff',
  },
  arrow: {
    paths: numbered('archer/pose-', [0, 1, 2, 3, 4, 5]),
    times: [0, 85, 170, 245, 345, 510], release: 345, impact: 595,
    ratio: .8, nativeRight: false, tone: '#dfb0ff',
  },
  fire: {
    paths: numbered('blaze/pose-', [0, 1, 2, 3, 4, 5]),
    times: [0, 85, 185, 310, 375, 495], release: 310, impact: 540,
    ratio: .8, nativeRight: true, tone: '#ffac54',
  },
  whip: {
    paths: numbered('layla-guide/pose-', [0, 2, 3, 4, 5]),
    times: [0, 90, 210, 420, 690], release: 210, impact: 810,
    ratio: 1, nativeRight: false, tone: '#ff80b3',
  },
};

const cache = new Map();
const effects = {
  dagger: 'assets/dagger.webp',
  arrow: 'assets/archer/arrow.svg',
};

function loadArt(src) {
  if (!cache.has(src)) {
    const image = new Image();
    image.alt = '';
    image.src = src;
    cache.set(src, image);
  }
  return cache.get(src);
}

export function warmMove(effect) {
  moves[effect].paths.forEach(loadArt);
  if (effects[effect]) loadArt(effects[effect]);
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function playMove(effect, stage, button, fallback, onImpact, onFinish) {
  warmMove(effect);
  const move = moves[effect];
  const bounds = button.getBoundingClientRect();
  const target = { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 };
  const anchor = stage.getBoundingClientRect();
  const viewportWidth = document.documentElement.clientWidth;
  const size = clamp(anchor.height, 120, 210);
  const width = size * move.ratio;
  const stageVisible = anchor.top >= 73 && anchor.bottom <= innerHeight - 8;
  const oppositeSide = target.x < viewportWidth / 2 ? target.x + 108 : target.x - 108;
  const actorX = clamp(stageVisible ? anchor.left + anchor.width / 2 : oppositeSide, width / 2 + 6, viewportWidth - width / 2 - 6);
  const actorY = clamp(stageVisible ? anchor.top : target.y - size * .56, 74, Math.max(74, innerHeight - size - 8));
  const facesRight = target.x >= actorX;
  const hand = { x: actorX + width * (facesRight ? .26 : -.26), y: actorY + size * .48 };
  const chest = { x: actorX, y: actorY + size * .59 };
  const overlay = document.createElement('div');
  overlay.className = 'shaman-move';
  overlay.dataset.move = effect;
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.setProperty('--move-tone', move.tone);
  const timers = [], animations = [];
  let done = false;
  const later = (time, fn) => timers.push(setTimeout(fn, time));
  const animate = (el, frames, options) => animations.push(el.animate(frames, { fill: 'both', ...options }));
  const at = (element, x, y) => {
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  };
  function part(tag, className, point) {
    const element = document.createElement(tag);
    element.className = className;
    if (point) at(element, point.x, point.y);
    overlay.append(element);
    return element;
  }

  const actor = part('img', 'shaman-move-actor', { x: actorX, y: actorY });
  actor.alt = '';
  actor.src = fallback;
  actor.style.width = `${width}px`;
  actor.style.height = `${size}px`;
  actor.style.setProperty('--facing', facesRight === move.nativeRight ? '1' : '-1');
  move.paths.forEach((path, index) => later(move.times[index], () => {
    const pose = loadArt(path);
    if (pose.complete && pose.naturalWidth) actor.src = pose.src;
  }));
  stage.classList.add('is-performing-move');
  button.classList.add('is-move-target');
  document.body.append(overlay);

  const release = part('i', 'shaman-release', hand);
  animate(release, [{ opacity: 0, scale: .2 }, { opacity: 1, scale: 1, offset: .2 }, { opacity: 0, scale: 2.4 }],
    { delay: move.release, duration: 240 });
  const burst = part('i', 'shaman-impact', target);
  const impactDelay = effect === 'whip' ? 430 : move.impact - 25;
  animate(burst, [{ opacity: 0, scale: .3 }, { opacity: 1, scale: 1, offset: .25 }, { opacity: 0, scale: 2 }],
    { delay: impactDelay, duration: 240 });

  if (effect === 'whip') {
    const ns = 'http://www.w3.org/2000/svg';
    const whip = document.createElementNS(ns, 'svg');
    whip.classList.add('shaman-whip');
    const cord = document.createElementNS(ns, 'path');
    cord.setAttribute('d', `M ${hand.x} ${hand.y} Q ${(hand.x + target.x) / 2} ${Math.min(hand.y, target.y) - 65} ${target.x} ${target.y}`);
    cord.setAttribute('pathLength', '1');
    whip.append(cord);
    overlay.append(whip);
    animate(cord, [{ strokeDashoffset: 1, opacity: 1 }, { strokeDashoffset: 0, opacity: 1, offset: .42 }, { strokeDashoffset: 1, opacity: 0 }],
      { delay: move.release, duration: 520 });
    const captured = part('span', 'shaman-captured', target);
    captured.textContent = (button.querySelector('.tab-label')?.firstChild?.textContent ?? button.textContent).trim();
    captured.style.width = `${bounds.width}px`;
    captured.style.height = `${bounds.height}px`;
    later(435, () => button.classList.add('is-whip-captured'));
    animate(captured, [{ opacity: 0, transform: 'translate(0,0)' }, { opacity: 1, offset: .04 },
      { opacity: 0, transform: `translate(${chest.x - target.x}px,${chest.y - target.y}px) scale(.08)` }],
      { delay: 435, duration: 365, easing: 'ease-in' });
  } else {
    const projectile = part(effects[effect] ? 'img' : 'i', `shaman-projectile shaman-${effect}`, hand);
    if (effects[effect]) { projectile.src = loadArt(effects[effect]).src; projectile.alt = ''; }
    const dx = target.x - hand.x, dy = target.y - hand.y;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    projectile.style.setProperty('--beam-length', `${Math.max(45, Math.hypot(dx, dy))}px`);
    animate(projectile, [
      { opacity: 0, transform: `translate(0,0) rotate(${angle}deg) scale(.65)` },
      { opacity: 1, offset: .19 },
      { opacity: 1, transform: `translate(${dx}px,${dy}px) rotate(${angle}deg)`, offset: .91 },
      { opacity: 0, transform: `translate(${dx}px,${dy}px) rotate(${angle}deg) scale(1.18)` },
    ], { delay: move.release, duration: move.impact - move.release + 55, easing: 'ease-out' });
  }
  const duration = move.impact + 240;
  animate(actor, [{ opacity: 1 }, { opacity: 1, offset: .78 }, { opacity: 0 }], { duration });
  later(move.impact, onImpact);
  later(duration, () => { cancel(); onFinish(); });

  function cancel() {
    if (done) return;
    done = true;
    timers.forEach(clearTimeout);
    animations.forEach(animation => animation.cancel());
    overlay.remove();
    stage.classList.remove('is-performing-move');
    button.classList.remove('is-move-target', 'is-whip-captured');
  }
  return cancel;
}
