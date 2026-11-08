import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(root, 'dist');
if (!output.startsWith(root + path.sep)) throw Error('Output fuori dal progetto');
try {
  const stat = await fs.lstat(output);
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw Error('Output non sicuro');
} catch (error) { if (error.code !== 'ENOENT') throw error; }
await fs.mkdir(output, {recursive:true});
for (const item of await fs.readdir(output)) await fs.rm(path.join(output, item), {recursive:true, force:true});
let html = await fs.readFile(path.join(root, 'index.html'), 'utf8');
const images = JSON.parse(await fs.readFile(path.join(root, 'img/immagini.json'), 'utf8'));
const generatedCount = Object.values(images).filter(image => image.generata).length;
html = html.replace(/<p class="immagini-nota">[^<]*<\/p>/, generatedCount
  ? `<p class="immagini-nota">${generatedCount === 3 ? 'Le tre immagini di atmosfera sono illustrative, create per questa anteprima.' : 'Alcune immagini di atmosfera sono illustrative, create per questa anteprima.'}</p>`
  : '');
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
html = html.replace(/<img\b[^>]*\bdata-media="([^"]+)"[^>]*>/g, (tag, key) => {
  const image = images[key];
  if (!image) throw Error('Immagine mancante: ' + key);
  for (const [attribute, value] of Object.entries({src:image.src, srcset:image.srcset, width:image.width, height:image.height, alt:image.alt, style:`object-position:${image.position}`})) {
    tag = tag.replace(new RegExp('\\s+' + attribute + '="[^"]*"', 'g'), '');
    tag = tag.replace(/>$/, ` ${attribute}="${escape(value)}">`);
  }
  return tag;
});
for (const folder of ['css', 'js', 'fonts', 'img']) {
  await fs.cp(path.join(root, folder), path.join(output, folder), {
    recursive:true, filter: source => !source.endsWith('PROVENIENZA.json') && !source.endsWith('immagini.json') && !source.endsWith('.md')
  });
}
await fs.writeFile(path.join(output, 'index.html'), html);
await fs.copyFile(path.join(root, 'robots.txt'), path.join(output, 'robots.txt'));
for (const [, reference] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (/^(https?:|tel:)/.test(reference)) continue;
  const file = path.resolve(output, reference.split(/[?#]/)[0]);
  if (!file.startsWith(output + path.sep)) throw Error('Percorso fuori output');
  await fs.access(file);
}
console.log('Build statica pronta in dist/: HTML, CSS, JavaScript, font e immagini. Nessuna dipendenza runtime.');
