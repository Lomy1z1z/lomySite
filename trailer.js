// The trailer: in its own section under the hero, and in a window over the page from the hero's "Watch trailer" button.
// The window plays it at once and stops it when closed (the close button, Esc or a click beside the video).
// Where a browser has no <dialog>, the button simply scrolls to the section.
function prepareTrailer() {
  const section = document.querySelector('.trailer-video');
  const dialog = document.querySelector('.trailer-dialog');
  const openers = document.querySelectorAll('.trailer-open');
  if (!section || !dialog || typeof dialog.showModal !== 'function') return;

  const video = dialog.querySelector('.trailer-dialog-video');
  const closeButton = dialog.querySelector('.trailer-dialog-close');
  const source = section.querySelector('source');
  let opener = null;

  function open(event) {
    event.preventDefault();
    opener = event.currentTarget;
    section.pause();
    if (!video.src) video.src = source.src;
    // (from where the section stopped, if it was being watched there)
    if (section.currentTime > 0 && !section.ended) video.currentTime = section.currentTime;
    dialog.showModal();
    const playing = video.play();
    if (playing && playing.catch) playing.catch(() => {});
  }

  function close() { if (dialog.open) dialog.close(); }

  // The big play button over the section's video: gone while it plays, back when it ends
  const play = document.querySelector('.trailer-play');
  if (play) {
    play.addEventListener('click', () => {
      const playing = section.play();
      if (playing && playing.catch) playing.catch(() => {});
      section.focus();
    });
    section.addEventListener('play', () => { play.hidden = true; });
    section.addEventListener('ended', () => { play.hidden = false; });
  }

  openers.forEach(button => button.addEventListener('click', open));
  closeButton.addEventListener('click', close);
  // (a click on the dark backdrop, outside the video)
  dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
  dialog.addEventListener('close', () => {
    video.pause();
    if (opener) opener.focus();
  });
}

prepareTrailer();
