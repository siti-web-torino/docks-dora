import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync(new URL('../js/movimento.js', import.meta.url), 'utf8');
function mount({reduced = false, observers = true, animations = true} = {}) {
  const played = [];
  const frames = new Map();
  const preference = Object.assign(new EventTarget(), {matches: reduced});
  const document = Object.assign(new EventTarget(), {hidden:false});
  class Element extends EventTarget {
    style = {values: new Map(),setProperty(key,value) {this.values.set(key,value);},removeProperty(key) {this.values.delete(key);}};
    classList = {toggle() {}};
    parentElement = {children:[this]};
    getBoundingClientRect() {return {top:1000};}
    closest() {return null;}
    contains(element) {return element === this;}
    matches() {return false;}
    animate() {
      const result = {cancelled:false,finished:new Promise(() => {}),cancel() {this.cancelled = true;}};
      played.push(result); return result;
    }
  }
  if (!animations) Element.prototype.animate = undefined;
  const hero = new Element();
  const header = new Element();
  const scene = new Element();
  const elements = [new Element(), new Element()];
  document.activeElement = new Element();
  document.querySelector = selector => selector === '.apertura' ? hero : selector === '.testata' ? header : scene;
  document.querySelectorAll = selector => selector.startsWith('.apertura__testo') ? elements : selector.startsWith('.claim') ? [new Element()] : [];
  const window = new EventTarget();
  class Observer {observe() {} unobserve() {} disconnect() {}}
  if (observers) window.IntersectionObserver = Observer;
  vm.runInNewContext(source, {
    document, window, IntersectionObserver: observers ? Observer : undefined,
    matchMedia: () => preference, location:{hash:''}, innerHeight:800,scrollY:0,
    addEventListener:window.addEventListener.bind(window),
    requestAnimationFrame: callback => {frames.set(1, callback);return 1;}
  });
  return {hero,preference,played,frames,window,document};
}
test('reduced-motion all’avvio: nessuna animazione e nessuna parallasse', () => {
  const page = mount({reduced:true});
  for (const callback of page.frames.values()) callback();
  assert.equal(page.played.length, 0);
  assert.equal(page.hero.style.values.size, 0);
});
test('cambio della preferenza: annulla tutti gli effetti in corso', () => {
  const page = mount();
  assert.ok(page.played.length > 0);
  page.preference.matches = true;
  page.preference.dispatchEvent(new Event('change'));
  assert.ok(page.played.every(animation => animation.cancelled));
  assert.equal(page.hero.style.values.size, 0);
});
test('tastiera interrompe il movimento; scroll accodato in un solo frame', () => {
  const page = mount();
  page.document.dispatchEvent(new Event('keydown'));
  assert.ok(page.played.every(animation => animation.cancelled));
  page.window.dispatchEvent(new Event('scroll'));
  page.window.dispatchEvent(new Event('scroll'));
  assert.equal(page.frames.size, 1);
});
test('API opzionali mancanti: la pagina resta funzionante', () => {
  assert.doesNotThrow(() => mount({observers:false}));
  assert.equal(mount({animations:false}).played.length, 0);
});
