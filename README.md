# Docks Dora Wine Bar: sito demo

Sito one-page per **Docks Dora Wine Bar**, vineria con cucina in Via Valprato 68, Torino,
dentro i Docks Dora. **Demo non ufficiale**, pubblicata su Vercel con deploy automatico dal
branch `main` (ogni push va online). `noindex` e `robots.txt` chiuso. Il locale non è stato
contattato.

HTML, CSS e JavaScript puri, senza framework o dipendenze runtime. Il restyling dell’8 novembre
2026 aggiunge un confezionamento statico con Node per applicare il manifest delle immagini e
pubblicare solo i file necessari in `dist/`. Generato dal template `template-vetrina`
(regole in `CLAUDE.md`; aggiornamenti autorizzati in `DECISIONI.md`).

## Aprire e verificare il sito
Node 22 o successivo, nessuna installazione necessaria:

```sh
npm run build
npm start
npm run check
npm test
```

L’anteprima su `http://127.0.0.1:4174/` serve la stessa cartella `dist/` pubblicata da Vercel.
Il build applica `img/immagini.json`, controlla i riferimenti e copia solo HTML, CSS, JS,
font, immagini ottimizzate e robots.txt. Originali, strumenti e documenti restano fuori dal sito.
L’HTML conserva contenuti e immagini come fallback statico; gli script vanno provati tramite
il server locale, perché il file degli orari è un modulo.

## Sostituire le immagini provvisorie
Le immagini generate sono `calice`, `tavola` e `sera`, in `img/generate/`, con due versioni
WebP da 640 e 1280 pixel. I riferimenti per la pubblicazione sono centralizzati in
`img/immagini.json`: percorso, varianti, dimensioni, testo alternativo, punto di ritaglio e
indicatore `generata`. Modifica questo file, poi esegui `npm run build`.

Per usare una foto del titolare puoi caricare un nuovo file e cambiare `src`, `width`,
`height`, `alt`, `position` e `generata: false`; `srcset` può essere una stringa vuota se
hai una sola versione. Layout e animazioni non cambiano. La nota sulle immagini illustrative
viene aggiornata automaticamente e scompare quando tutte e tre sono reali.

`img/generate/PROVENIENZA.json` contiene prompt e provenienza, non viene pubblicato nel sito.
Le nuove immagini evocano un’atmosfera e non documentano interni, vini o piatti del locale.
La facciata, l’ingresso e il logo originali sono conservati.

## Dove si cambiano i contenuti
Tutti i dati modificabili stanno nell'oggetto `DATI` in cima a **`js/main.js`**:

| Cosa | Campo in `DATI` |
|---|---|
| Orari (per giorno, `null` = chiuso) | `orari.giorni` |
| Telefono | `telefono.numero` (per il link), `telefono.testo` (come si legge) |
| Dove si trova dentro i Docks Dora | `comeTrovarlo` |
| Instagram | `instagram: "nomeaccount"` (oggi `null`: nessun link) |
| Serate | `eventi`: `nome`, `dettaglio`, `data` ("2026-11-11"), `confermato: true` per mostrarla. Senza serate confermate la sezione non compare |
| Menu | `menu`: elenco di voci. Finché è vuoto la sezione Menu non compare |

Sul sito non ci sono più riquadri [DA CONFERMARE]: orari, telefono e posizione si vedono come
dati normali e una nota nel piè di pagina dice che vanno verificati. Nel codice i dati non
confermati sono segnati con `// DA VERIFICARE`. **Prima di andare dal locale vanno tutti
controllati**, perché il sito li mostra come certi.
| Indirizzo, tipo | `indirizzo`, `tipo` |
| Claim e pilastri (testi della locandina, con icone) | direttamente in `index.html`, sezione "Il posto" |
| Riga "Da martedì a sabato, dalle 17 a mezzanotte." | si calcola da `orari.giorni`; sparisce se gli orari non sono uguali tutti i giorni |

L'HTML contiene gli stessi testi come riserva per chi ha JavaScript spento: se cambi un dato
in `DATI`, il sito mostra quello di `DATI`. I riquadri fissi in HTML (P.IVA nel piè di pagina)
si cambiano direttamente in `index.html`.

L'indicatore "Aperto ora / Chiuso ora" si calcola da `orari.giorni` con l'ora di Torino.

## Elenco dei [DA CONFERMARE]
1. **Orari** mar–sab 17:00–24:00, domenica e lunedì chiuso (solo dal brief).
2. **Telefono** +39 345 149 0333 (solo dal brief). È anche il pulsante Chiama.
3. **Posizione dentro i Docks Dora**: "piazzetta Mulassano, manica centrale, di fronte
   all'ingresso carraio" (da vivoin.it, fonte terza).
4. **Instagram**: brief @docksdorawinebar, locandina @winebardocksdora. Nessun link finché non
   si sa quale è giusto.
5. **Menu e carta vini**: non forniti.
6. **Serate** "San Martino alla Salentina" (Negroamaro e panini) e "Aperisharing": date e
   dettagli mancanti.
7. **Ragione sociale e P.IVA**: non forniti.
8. **Data di apertura**: il brief dice settembre 2026, una fonte web segnala un evento al bar
   il 12/06/2026. Non usata nel sito.
9. **Permesso d'uso** della foto della locandina e del logo (file originale del logo, meglio
   se vettoriale: quello attuale è tagliato di ~5 px in alto e a sinistra).

## Cartelle
- `index.html`, `css/style.css`, `js/main.js`: il sito.
- `css/restyling.css`, `js/movimento.js`: direzione visiva e animazioni accessibili.
- `js/orari.mjs`: logica orari pura e verificabile, nel fuso Europe/Rome.
- `img/immagini.json`, `img/generate/`: manifest e immagini illustrative provvisorie.
- `img/`: immagini ottimizzate (WebP senza EXIF). `img-originali/`: originali intatti.
  `facciata-folla.png` è esclusa da git (persone riconoscibili).
- `fonts/`: Bodoni Moda e Jost, licenza SIL OFL (testi in `fonts/OFL-*.txt`).
- `docs/anteprime/`: screenshot a 390, 768, 1280 px.
- `STUDIO.md` (materiale e ricerca), `DECISIONI.md` (scelte), `RAPPORTO.md` (stato),
  `docs/VERIFICA.md` (critica del risultato).
- `strumenti/`: script locali (Pillow, screenshot), ignorati da git.

## Rifare gli screenshot
Con il server acceso su 8765: `node strumenti/anteprime.mjs` (usa Chrome installato).
`strumenti/` non è in git: se manca, gli screenshot vanno rifatti a mano.
