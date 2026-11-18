// The browser demo: shown only when its WebGL page is really there. Once opened it can be closed (the game stops and
// frees its memory; opening it again is quick, the browser keeps its files), played full screen, or opened in a tab
// of its own. Where a page can't go full screen (iPhone's Safari), full screen opens it in its own tab instead.
async function prepareBrowserDemo() {
  const player = document.querySelector('[data-webgl-entry]');
  if (!player) return;
  const entry = new URL(player.dataset.webglEntry, document.baseURI);
  const poster = player.querySelector('.demo-poster');
  const status = player.querySelector('.demo-status');
  const button = player.querySelector('.demo-play');
  const frame = player.querySelector('.demo-frame');
  const bar = document.querySelector('.demo-bar');
  const fullscreenButton = bar && bar.querySelector('.demo-fullscreen');
  const newTab = bar && bar.querySelector('.demo-newtab');
  const closeButton = bar && bar.querySelector('.demo-close');

  try {
    const response = await fetch(entry, { cache: 'no-cache' });
    if (!response.ok) return;

    // Some static hosts return the site's homepage for a missing path.
    const html = await response.text();
    if (!/\b(?:createUnityInstance\s*\(|UnityLoader\.instantiate\s*\()/.test(html)) return;
  } catch {
    return;
  }

  status.textContent = 'Play in your browser';
  button.hidden = false;
  if (newTab) newTab.href = entry.href;

  const canFullscreen = !!(frame.requestFullscreen || frame.webkitRequestFullscreen) &&
    !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);

  function open() {
    frame.src = entry.href;
    frame.hidden = false;
    poster.hidden = true;
    if (bar) bar.hidden = false;
    frame.focus();
  }

  function close() {
    if (document.fullscreenElement === frame && document.exitFullscreen) document.exitFullscreen();
    // (a blank page in its place: the game stops and lets its memory go)
    frame.src = 'about:blank';
    frame.hidden = true;
    poster.hidden = false;
    if (bar) bar.hidden = true;
    status.textContent = 'Play again';
    button.focus();
  }

  function fullscreen() {
    if (document.fullscreenElement === frame) { document.exitFullscreen(); return; }
    if (!canFullscreen) {
      // (no full screen for a page here: the game in its own tab fills the screen)
      window.open(entry.href, '_blank', 'noopener');
      close();
      return;
    }
    const request = frame.requestFullscreen || frame.webkitRequestFullscreen;
    request.call(frame);
    frame.focus();
  }

  button.addEventListener('click', open);
  if (closeButton) closeButton.addEventListener('click', close);
  if (fullscreenButton) fullscreenButton.addEventListener('click', fullscreen);
  // (opened in a tab of its own: the one here closes, so the game doesn't run twice)
  if (newTab) newTab.addEventListener('click', () => setTimeout(close, 0));
  document.addEventListener('fullscreenchange', () => {
    if (fullscreenButton) fullscreenButton.lastChild.textContent = document.fullscreenElement === frame ? ' Exit full screen' : ' Full screen';
  });
}

prepareBrowserDemo();
