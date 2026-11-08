import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const root = new URL('../', import.meta.url);
test('menu, serate e Instagram non vengono inventati', () => {
  const main = fs.readFileSync(new URL('js/main.js', root), 'utf8');
  const dati = vm.runInNewContext(main.slice(main.indexOf('const DATI'), main.indexOf('(function')) + '\nDATI');
  assert.equal(dati.menu.length, 0);
  assert.equal(dati.eventi.filter(evento => evento.confermato).length, 0);
  assert.equal(dati.instagram, null);
  assert.equal(dati.telefono.numero, '+393451490333');
  assert.equal(dati.indirizzo.via, 'Via Valprato 68');
});
test('manifest centralizzato: ogni immagine provvisoria e variante esiste', () => {
  const manifest = JSON.parse(fs.readFileSync(new URL('img/immagini.json', root), 'utf8'));
  assert.equal(Object.keys(manifest).length, 3);
  for (const image of Object.values(manifest)) {
    assert.ok(image.generata);
    assert.match(image.alt, /illustrativa/);
    assert.ok(fs.existsSync(new URL(image.src, root)));
    for (const source of image.srcset.split(',')) assert.ok(fs.existsSync(new URL(source.trim().split(' ')[0], root)));
  }
});
test('fallback HTML: avviso demo, immagini e destinazioni delle ancore', () => {
  const html = fs.readFileSync(new URL('index.html', root), 'utf8');
  assert.match(html, /Sito dimostrativo, non ufficiale/);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), id);
  assert.equal([...html.matchAll(/data-media="/g)].length, 3);
});
