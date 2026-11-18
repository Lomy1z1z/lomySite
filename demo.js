async function prepareBrowserDemo() {
  const player = document.querySelector('[data-webgl-entry]');
  const entry = new URL(player.dataset.webglEntry, document.baseURI);
  const poster = player.querySelector('.demo-poster');
  const status = player.querySelector('.demo-status');
  const button = player.querySelector('.demo-play');
  const frame = player.querySelector('.demo-frame');

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
  button.addEventListener('click', () => {
    frame.src = entry.href;
    frame.hidden = false;
    poster.hidden = true;
    frame.focus();
  }, { once: true });
}

prepareBrowserDemo();
