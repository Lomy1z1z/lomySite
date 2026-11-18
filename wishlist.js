// The WISHLIST button: everyone sees how many shamans are waiting; a press adds you once (the counter is a small
// Cloudflare Worker that counts each visitor one time, and this browser remembers that you're on the list).
// If the counter can't be reached, the buttons stay hidden rather than show a number that isn't real.
const WISHLIST_API = 'https://shamagon-wishlist.shamagon.workers.dev/wishlist';
const WISHLIST_KEY = 'shamagon.wishlisted';

function wishlistRemembered() {
  try { return localStorage.getItem(WISHLIST_KEY) === '1'; } catch { return false; }
}
function wishlistRemember() {
  try { localStorage.setItem(WISHLIST_KEY, '1'); } catch { /* a private window: the counter still knows */ }
}

async function prepareWishlist() {
  const buttons = [...document.querySelectorAll('.wishlist-button')];
  const counts = [...document.querySelectorAll('.wishlist-count')];
  if (!WISHLIST_API || !buttons.length) return;

  let joined = wishlistRemembered();
  let count = null;

  function render(burst) {
    buttons.forEach(button => {
      button.classList.toggle('is-joined', joined);
      button.setAttribute('aria-pressed', joined ? 'true' : 'false');
      button.querySelector('.wish-label').textContent = joined ? 'On your wishlist' : 'Wishlist';
      if (burst) { button.classList.remove('is-burst'); void button.offsetWidth; button.classList.add('is-burst'); }
    });
    const text = count === null ? '' : count === 0 ? 'Be the first shaman on the list'
      : count === 1 ? '1 shaman is waiting' : `${count.toLocaleString('en-US')} shamans are waiting`;
    counts.forEach(line => { line.textContent = text; line.hidden = !text; });
  }

  try {
    const response = await fetch(WISHLIST_API, { cache: 'no-store' });
    if (!response.ok) return;
    count = (await response.json()).count;
  } catch {
    return;
  }
  buttons.forEach(button => { button.hidden = false; });
  render(false);

  buttons.forEach(button => button.addEventListener('click', async () => {
    if (joined) return;
    joined = true;
    render(true);
    try {
      const response = await fetch(WISHLIST_API, { method: 'POST', cache: 'no-store' });
      if (response.ok) count = (await response.json()).count;
    } catch { /* (shown as joined anyway: the next visit tries the count again) */ }
    wishlistRemember();
    render(false);
  }));
}

prepareWishlist();
