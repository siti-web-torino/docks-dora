// Optional motion. Text and images never depend on a class or event to appear.
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const running = new Set();
  const hero = document.querySelector('.apertura');
  const header = document.querySelector('.testata');
  let reveals;
  let heroVisible = true;
  let frame = 0;

  function animate(element, frames, delay = 0) {
    if (preference.matches || !element?.animate) return;
    const animation = element.animate(frames, {
      duration: 850, easing: 'cubic-bezier(.16,1,.3,1)', delay, fill: 'backwards'
    });
    running.add(animation);
    const release = () => running.delete(animation);
    animation.finished.then(release, release);
  }
  function cancelMotion() {
    running.forEach(animation => animation.cancel());
    running.clear();
  }
  function observeReveals() {
    if (preference.matches || !('IntersectionObserver' in window)) return;
    reveals = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reveals.unobserve(entry.target);
        const section = entry.target.closest('section');
        if (entry.target.contains(document.activeElement) || section === document.activeElement || (section?.id && location.hash === '#' + section.id)) return;
        const index = entry.target.matches('.pilastri li') ? [...entry.target.parentElement.children].indexOf(entry.target) : 0;
        animate(entry.target, [{opacity: .5, transform: 'translateY(22px)'}, {opacity: 1, transform: 'none'}], index * 90);
      });
    }, {threshold: .1});
    document.querySelectorAll('.claim, .posto__testo, .pilastri li, .dove__blocco, .dove__foto').forEach(element => {
      if (element.getBoundingClientRect().top >= innerHeight) reveals.observe(element);
    });
  }
  function updateScroll() {
    frame = 0;
    header.classList.toggle('is-scrolled', scrollY > 30);
    if (heroVisible && !preference.matches) {
      const shift = Math.max(-8, Math.min(8, -hero.getBoundingClientRect().top * .018));
      hero.style.setProperty('--photo-shift', shift + 'px');
    }
  }
  function scheduleScroll() {
    if (!frame) frame = requestAnimationFrame(updateScroll);
  }
  addEventListener('scroll', scheduleScroll, {passive: true});
  addEventListener('resize', scheduleScroll, {passive: true});
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      scheduleScroll();
    }).observe(hero);
    const links = [...document.querySelectorAll('.testata__nav a')];
    const visibility = new Map();
    const sections = new IntersectionObserver(entries => {
      entries.forEach(entry => visibility.set(entry.target.id, entry.isIntersecting));
      const active = links.find(link => visibility.get(link.hash.slice(1)));
      links.forEach(link => link === active ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current'));
    }, {rootMargin: '-20% 0px -65% 0px'});
    document.querySelectorAll('main section[id]').forEach(section => sections.observe(section));
  }
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      cancelMotion();
      target.setAttribute('tabindex', '-1');
      target.focus({preventScroll: true});
    });
  });
  document.addEventListener('keydown', cancelMotion, {capture: true});
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelMotion();
  });
  preference.addEventListener('change', () => {
    cancelMotion();
    reveals?.disconnect();
    hero.style.removeProperty('--photo-shift');
    observeReveals();
  });
  if (!location.hash && scrollY < 10) {
    document.querySelectorAll('.apertura__testo > :not(h1), .insegna__wine, .insegna__nome>span').forEach((element, index) => {
      animate(element, [{opacity: .75, transform: 'translateY(14px)'}, {opacity: 1, transform: 'none'}], index * 35);
    });
    animate(document.querySelector('.apertura__scena'), [{opacity: .8, transform: 'translateY(20px)'}, {opacity: 1, transform: 'none'}], 100);
  }
  observeReveals();
  scheduleScroll();
})();
