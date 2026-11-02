# Docks Dora Wine Bar: sito demo

Sito one-page per **Docks Dora Wine Bar**, vineria con cucina in Via Valprato 68, Torino,
dentro i Docks Dora. **Demo non pubblica**: `noindex` e `robots.txt` chiuso. Il locale non è
stato contattato.

HTML, CSS e JavaScript puri, nessuna build. Generato dal template `template-vetrina`
(regole in `CLAUDE.md`).

## Aprire il sito
- Doppio clic su `index.html` (si apre nel browser), oppure
- da un terminale in questa cartella: `python -m http.server 8765` e poi
  <http://localhost:8765/>.

## Dove si cambiano i contenuti
Tutti i dati modificabili stanno nell'oggetto `DATI` in cima a **`js/main.js`**:

| Cosa | Campo in `DATI` |
|---|---|
| Orari (per giorno, `null` = chiuso) | `orari.giorni` |
| Togliere [da confermare] dagli orari | `orari.confermato: true` |
| Telefono | `telefono.numero` (per il link), `telefono.testo` (come si legge), `telefono.confermato` |
| Dove si trova dentro i Docks Dora | `comeTrovarlo.testo`, `comeTrovarlo.confermato` |
| Instagram | `instagram: "nomeaccount"` (oggi `null`: nessun link) |
| Serate | `eventi`: `nome`, `dettaglio`, `data` ("2026-11-11"), `confermato` |
| Menu | `menu`: elenco di voci; finché è vuoto resta il riquadro [DA CONFERMARE] |
| Indirizzo, tipo, claim, pilastri | `indirizzo`, `tipo`, `claim`, `pilastri` |

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
