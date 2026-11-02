# RAPPORTO: Docks Dora Wine Bar (demo)

Stato: **demo locale, non pubblicata**. Solo commit locali, nessun push, nessun deploy,
nessun contatto con il locale. `noindex` + `robots.txt` chiuso.

## Cosa è pronto
- Sito one-page mobile-first (`index.html`), direzione "Neon sul mattone" (DECISIONI.md).
- Prima schermata da telefono: nome, "Vineria con cucina", aperto/chiuso adesso, indirizzo,
  Chiama, Come arrivare. Barra Chiama/Come arrivare sempre raggiungibile scorrendo.
- Sezioni: Il posto (claim e tre pilastri della locandina), Menu (riquadro vuoto dichiarato),
  Serate (solo nomi), Dove e quando (indirizzo, posizione nel complesso, orari, telefono).
- Tutti i dati in `DATI` in cima a `js/main.js`; istruzioni in README.md.
- Verifica: 0 errori, 0 file mancanti, nessuno scorrimento orizzontale da 320 a 1280 px,
  tastiera e contrasto AA ok. Dettagli e difetti residui in `docs/VERIFICA.md`.

## Cosa controllare per primo
1. **Orari e telefono**: vengono solo dal brief. Il sito dice "Aperto ora" o "Chiuso ora" in
   base a quegli orari: se sono sbagliati, il sito afferma una cosa falsa in prima schermata.
2. **Data di apertura**: brief "settembre 2026", ma vivoin.it riporta un evento al bar il
   12/06/2026 e lo dice "di recente apertura". Non usata nel sito, ma va chiarita.
3. **Instagram**: due nomi diversi (brief @docksdorawinebar, locandina @winebardocksdora).
   Nessun link finché non si sa.
4. **Posizione nel complesso** ("piazzetta Mulassano, manica centrale…"): da fonte terza.
5. **Foto e logo**: serve il permesso d'uso. La foto della facciata è un ritaglio della
   locandina: **circa 310×740 px**, insufficiente per un hero a schermo pieno; per questo è
   mostrata in una striscia verticale. Va sostituita con una foto vera, di sera, senza persone
   riconoscibili. Il logo è tagliato di ~5 px in alto e a sinistra: chiedere il file originale.
6. `facciata-folla.png` **non è nel sito né in git**: decine di persone riconoscibili.

## Cosa non si sa
Menu, carta vini, prezzi; foto di interno, bancone, piatti; ragione sociale e P.IVA; date e
formula delle serate; storia dell'edificio (date contraddittorie: non usata); recensioni dei
clienti (non trovate). Elenco completo dei [DA CONFERMARE] nel README.

## Strumenti
Pillow e i pacchetti dei font scaricati in `strumenti/` (ignorata da git, non nel sito).
Screenshot con Chrome headless via `strumenti/anteprime.mjs`. Nessuno strumento mancante.

## Limite di questo lavoro
L'IA conosce gli schemi che funzionano per i siti di locali, ma **non misura la clientela reale
di questo locale**. Prima di considerarlo giusto, il sito va fatto vedere a 2-3 persone vere
(e al cliente). Il contatto con i gestori e la proposta commerciale restano all'umano.
