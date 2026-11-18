import { playMove, warmMove } from './character-travel.js';
(() => {
  const $ = id => document.getElementById(id);
  const characters = window.SHAMAGON_CHARACTERS;
  const tabs = [...document.querySelectorAll('[data-character]')];
  const panel = $('characterPanel');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const icons = {
    heart:'<path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"/><path d="M7 12h3l2-4 2 7 2-3h2"/>',
    blades:'<path d="m3 3 7 3 10 12-3 3L5 9 3 3Zm18 0-7 3-3 4m-3 4-4 4 3 3 3-3M14 17l5-4M5 13l5 4"/>',
    shield:'<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"/><path d="m12 6 5 2v4c0 3-5 6-5 6s-5-3-5-6V8l5-2Z"/>',
    arrow:'<path d="M4 20 20 4m-9 0h9v9M3 14v7h7m0-4v4H6"/><path d="m5 3 1 3m-3 4 3 1m9 8 1 3"/>',
    fire:'<path d="M13 2c1 5-4 6-3 10 3 0 4-3 4-3s6 5 6 9a8 8 0 0 1-16-1c0-4 4-7 4-7-1 4 2 4 2 4-2-6 3-7 3-12Z"/>',
    drop:'<path d="M12 2s8 8 8 13a8 8 0 0 1-16 0c0-5 8-13 8-13Z"/><path d="M8 15a4 4 0 0 0 4 4m0-11v6m-3-3h6"/>'
  };
  let current = 0, generation = 0, frameIndex = -1, activeFrames = null, inView = false;
  const canvas = $('chibiCanvas'), context = canvas.getContext('2d'), stage = canvas.parentElement;
  const cache = new Map();
  function loadFrames(character) {
    if(cache.has(character.id)) return cache.get(character.id);
    const promise = Promise.all(character.frames.map(src => new Promise(resolve => {
      const image = new Image(); image.onload = () => resolve(image); image.onerror = () => resolve(null); image.src = src;
    })));
    cache.set(character.id,promise); return promise;
  }
  async function select(index,{focus=false,announce=true}={}) {
    current = (index + characters.length) % characters.length;
    const character = characters[current], ticket = ++generation;
    panel.style.setProperty('--character-color',character.color);
    panel.setAttribute('aria-labelledby',`tab-${character.id}`);
    const text = {characterName:character.name,characterClass:character.className,characterCount:`${String(current+1).padStart(2,'0')} / 06`,characterSpirit:character.spirit,characterAge:character.age,characterLine:character.line,characterDescription:character.description,abilityName:character.ability,abilityText:character.abilityText,portraitIndex:String(current+1).padStart(2,'0')};
    Object.entries(text).forEach(([id,value]) => { $(id).textContent = value; });
    $('personalityLabel').textContent = character.personalityLabel;
    $('characterPersonality').textContent = character.personality;
    $('characterOriginTitle').textContent = character.originTitle;
    const traits = character.traits.map(text => { const tag = document.createElement('span'); tag.textContent = text; return tag; });
    $('characterTraits').replaceChildren(...traits);
    const origin = character.origin.map(text => { const paragraph = document.createElement('p'); paragraph.textContent = text; return paragraph; });
    $('characterOrigin').replaceChildren(...origin);
    $('abilityIcon').innerHTML = `<svg viewBox="0 0 24 24">${icons[character.icon]}</svg>`;
    tabs.forEach((tab,i) => { tab.setAttribute('aria-selected',String(i===current)); tab.tabIndex = i===current ? 0 : -1; });
    document.querySelectorAll('[data-portrait]').forEach(image => { const selected = image.dataset.portrait === character.id; image.classList.toggle('is-active',selected); image.setAttribute('aria-hidden',String(!selected)); });
    $('chibiFallback').src = character.sprite; $('chibiFallback').alt = `${character.name} in the original chibi game style`;
    activeFrames = null; frameIndex = -1; stage.classList.remove('is-animated');
    if(focus) tabs[current].focus({preventScroll:true});
    if(announce) $('characterAnnouncement').textContent = `${character.name}, ${character.className}, age ${character.age}. ${character.ability}. ${character.abilityText}`;
    if (!reduced.matches) warmMove(character.transition);
    const frames = await loadFrames(character);
    if(ticket !== generation || frames.some(image => !image)) return;
    canvas.width = character.frameSize[0]; canvas.height = character.frameSize[1];
    activeFrames = frames; context.clearRect(0,0,canvas.width,canvas.height); context.drawImage(frames[0],0,0,canvas.width,canvas.height); stage.classList.add('is-animated');
  }
  let travel = null;
  const previous = $('previousCharacter'), next = $('nextCharacter');
  function navigate(index, source, focus = false) {
    const destination = (index + characters.length) % characters.length;
    const from = travel?.destination ?? current;
    if (destination === from) return;
    travel?.cancel();
    travel = null;
    if (reduced.matches || destination === current) {
      select(destination,{focus});
      return;
    }
    const outgoing = characters[current];
    const commit = () => select(destination,{focus});
    const cancel = playMove(outgoing.transition,stage,source,outgoing.sprite,commit,() => { travel = null; });
    travel = {destination, cancel, commit};
  }
  const warmCurrent = () => { if (!reduced.matches) warmMove(characters[current].transition); };
  [...tabs,previous,next].forEach(control => {
    control.addEventListener('pointerenter',warmCurrent,{passive:true});
    control.addEventListener('focus',warmCurrent);
  });
  tabs.forEach((tab,index) => {
    tab.addEventListener('click',() => navigate(index,tab));
    tab.addEventListener('keydown',event => {
      const from = travel?.destination ?? index;
      const move = {ArrowRight:from+1,ArrowLeft:from-1,Home:0,End:characters.length-1};
      if(Object.hasOwn(move,event.key)) { event.preventDefault(); navigate(move[event.key],tab,true); }
    });
  });
  previous.addEventListener('click',() => navigate((travel?.destination ?? current)-1,previous));
  next.addEventListener('click',() => navigate((travel?.destination ?? current)+1,next));
  reduced.addEventListener('change',() => {
    if (!reduced.matches || !travel) return;
    const pending = travel;
    travel = null;
    pending.cancel();
    if (pending.destination !== current) pending.commit();
  });
  new IntersectionObserver(entries => { inView = entries[0].isIntersecting; },{rootMargin:'100px'}).observe(stage);
  function draw(now) {
    if(activeFrames && inView && !document.hidden) {
      const next = reduced.matches ? 0 : activeFrames.length === 2 ? (now % 6000 > 5830 ? 1 : 0) : Math.floor(now/(1000/12)) % activeFrames.length;
      if(next !== frameIndex) { context.clearRect(0,0,canvas.width,canvas.height); context.drawImage(activeFrames[next],0,0,canvas.width,canvas.height); frameIndex = next; }
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw); select(0,{announce:false});
  const menu = $('menuToggle'), nav = $('mainNav');
  function closeMenu() { menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Open navigation'); nav.classList.remove('is-open'); }
  menu.addEventListener('click',() => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded',String(open)); menu.setAttribute('aria-label',open ? 'Close navigation' : 'Open navigation'); nav.classList.toggle('is-open',open); });
  const portal = $('spiritPortal'), traveler = $('portalTraveler');
  const routes = ['home','characters','world','worldRules','download'].map($);
  const sectionFor = target => target.id === 'worldRules' ? 'world' : target.id;
  const tones = {home:'#93c6ff',characters:'#d3aeff',world:'#77f5e9',download:'#ffc888'};
  const jumpPaths = ['jump-00','jump-01','jump-02','jump-03','presenting'];
  let jumpImages;
  function prepareJump() {
    if (jumpImages || reduced.matches) return;
    jumpImages = jumpPaths.map(name => {
      const pose = new Image(); pose.alt = ''; pose.decoding = 'async';
      pose.src = `assets/samurai-about/${name}.webp`;
      return pose;
    });
    traveler.replaceChildren(...jumpImages);
  }
  // Warm the original Kairo frames on intent without delaying initial rendering.
  document.addEventListener('pointerover',event => {
    if(event.target.closest('a[href^="#"]:not(.skip-link)')) prepareJump();
  },{passive:true});
  document.addEventListener('focusin',event => {
    if(event.target.closest('a[href^="#"]:not(.skip-link)')) prepareJump();
  });
  window.addEventListener('load',prepareJump,{once:true});
  let midpoint, finish, flight, pendingTarget, scheduled = false;
  function clearPortal() {
    clearTimeout(midpoint); clearTimeout(finish); clearTimeout(flight);
    portal.classList.remove('is-active'); pendingTarget = null;
  }
  function activeRoute() {
    const marker = Math.max(110,innerHeight * .34);
    return routes.findLast(target => target.getBoundingClientRect().top <= marker) || routes[0];
  }
  function syncNav() {
    scheduled = false;
    const active = sectionFor(activeRoute());
    nav.querySelectorAll('a').forEach(link => {
      if (link.hash === `#${active}`) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  }
  function scheduleNav() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(syncNav); }
  }
  function arrive(target,hash) {
    if (hash && location.hash !== hash) history.pushState(null,'',hash);
    target.scrollIntoView({block:'start',behavior:'instant'});
    const heading = target.querySelector('h1,h2,h3') || target;
    if (!heading.hasAttribute('tabindex')) heading.tabIndex = -1;
    heading.focus({preventScroll:true});
    syncNav();
  }
  document.addEventListener('click',event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = $(link.hash.slice(1));
    if (!routes.includes(target)) return;
    event.preventDefault(); closeMenu();
    const currentRoute = activeRoute();
    clearPortal();
    if (reduced.matches || link.classList.contains('skip-link') || currentRoute === target) {
      arrive(target,link.hash); return;
    }
    prepareJump();
    portal.style.setProperty('--portal-tone',tones[sectionFor(target)]);
    portal.dataset.direction = routes.indexOf(target) < routes.indexOf(currentRoute) ? 'back' : 'forward';
    // Restart the same travel animation if the visitor picks another destination.
    traveler.dataset.pose = '0';
    void portal.offsetWidth;
    portal.classList.add('is-active'); pendingTarget = {target,hash:link.hash};
    const start = performance.now();
    function drawJump() {
      const elapsed = performance.now() - start;
      const pose = Math.min(jumpPaths.length - 1,Math.floor(elapsed / 150));
      traveler.dataset.pose = String(pose);
      if (pose < jumpPaths.length - 1) flight = setTimeout(drawJump,(pose + 1) * 150 - elapsed);
    }
    flight = setTimeout(drawJump,150);
    midpoint = setTimeout(() => { arrive(target,link.hash); pendingTarget = null; }, 390);
    finish = setTimeout(clearPortal, 890);
  });
  reduced.addEventListener('change',() => {
    if (!reduced.matches) return;
    const pending = pendingTarget;
    clearPortal();
    if (pending) arrive(pending.target,pending.hash);
  });
  document.addEventListener('keydown',event => { if(event.key === 'Escape') closeMenu(); });
  window.addEventListener('resize',() => { if(innerWidth > 760) closeMenu(); scheduleNav(); });
  window.addEventListener('scroll',scheduleNav,{passive:true});
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.addEventListener('popstate',() => {
    clearPortal(); closeMenu();
    const target = $(location.hash.slice(1)) || $('home');
    if (routes.includes(target)) arrive(target);
    else scheduleNav();
  });
  window.addEventListener('hashchange',scheduleNav);
  syncNav();
  const release = window.SHAMAGON_RELEASE, link = $('downloadLink');
  if(release?.url) {
    try {
      const url = new URL(release.url,location.href);
      if(!['https:','http:'].includes(url.protocol)) throw new Error('Unsupported download URL');
      link.href = url.href; link.removeAttribute('aria-disabled'); link.removeAttribute('tabindex'); link.classList.replace('button-unavailable','button-red');
      if(release.fileName) link.setAttribute('download',release.fileName);
      $('downloadLabel').textContent = 'Download SHAMAGON'; $('releaseTitle').textContent = 'Available now';
      $('releaseDescription').textContent = 'Download SHAMAGON and step into the world of shamans.';
      if(release.version) { $('releaseVersion').textContent = release.version; $('releaseVersion').hidden = false; }
      link.closest('.download-card').hidden = false;
    } catch { /* An unavailable release retains the honest coming-soon state. */ }
  }
})();
