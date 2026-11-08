# RAPPORTO: Docks Dora Wine Bar (demo)

## Aggiornamento 8 novembre 2026 — restyling

Nuova hero con accensione senza sfarfallio, fotografia reale ampia su mobile, tre immagini
illustrative generate e sostituibili, galleria editoriale, animazioni in scroll e interazioni.
Logo, foto dell’ingresso e tutti i dati del locale sono conservati. Menu e serate non
confermati restano nascosti. Dettagli e motivazioni: `DECISIONI.md`, sezione Restyling.

Controlli locali: 13 test superati, sintassi valida e build statica pronta. La verifica
grafica copre desktop, tablet e mobile; reduced-motion è verificato con test di logica e
regole CSS. Il sito resta fruibile senza JavaScript. Questi controlli non equivalgono a un
audit completo con lettore di schermo o a una misurazione Lighthouse.

Le immagini provvisorie sono `calice`, `tavola` e `sera`, in `img/generate/`; i riferimenti
si modificano in `img/immagini.json`. La generazione è stata espressamente richiesta
dall’utente e riguarda solo immagini di atmosfera, non fatti o fotografie documentarie.
Il build esclude gli originali e la documentazione dalla pubblicazione.

Restano da richiedere: foto autentiche ad alta definizione di facciata, sala, bancone e
proposta gastronomica; carta vini/menu e prezzi; conferma di orari, telefono, collocazione
nel complesso, account Instagram, eventi e dati aziendali. Il risultato va mostrato al
titolare e a 2–3 persone reali: gli schemi di design non misurano la clientela del locale.

Il progetto Vercel esistente appartiene a `coste1`, mentre il connettore disponibile usa
un altro account. L’esito della pubblicazione va seguito tramite il controllo Vercel
su GitHub e verificando il dominio pubblico; non viene creato un progetto scollegato.

Le sezioni seguenti conservano lo storico delle verifiche e delle decisioni precedenti.

Stato: **demo pubblicata su Vercel con link pubblico** (scelta dell'utente, 2 novembre 2026),
deploy automatico dal branch `main` di `siti-web-torino/docks-dora` (repo pubblica, scelta
dell'utente). Resta `noindex` + `robots.txt` chiuso. Il sito dice in cima e nel piè di pagina
che è dimostrativo e non ufficiale. Nessun contatto con il locale. Attenzione: logo e foto della
locandina sono online senza permesso del locale.

## Cosa è pronto
- Sito one-page mobile-first (`index.html`), direzione "Neon sul mattone" (DECISIONI.md).
- Prima schermata da telefono: nome, "Vineria con cucina", aperto/chiuso adesso, indirizzo,
  Chiama, Come arrivare. Barra Chiama/Come arrivare sempre raggiungibile scorrendo.
- Sezioni: Il posto (claim e tre pilastri della locandina), Menu (riquadro vuoto dichiarato),
  Serate (solo nomi), Dove e quando (indirizzo, posizione nel complesso, orari, telefono).
- Tutti i dati in `DATI` in cima a `js/main.js`; istruzioni in README.md.
- Verifica: 0 errori, 0 file mancanti, nessuno scorrimento orizzontale da 320 a 1280 px,
  tastiera e contrasto AA ok. Dettagli e difetti residui in `docs/VERIFICA.md`.

Aggiornamento: tolti i riquadri [DA CONFERMARE] dal sito; Menu e Serate nascosti finché non
ci sono contenuti veri (DECISIONI.md P2–P3). Nulla è stato inventato.

## Cosa controllare per primo
1. **Orari e telefono**: vengono solo dal brief e ora sul sito **sembrano certi** (resta solo una
   nota nel piè di pagina). Il sito dice "Aperto ora" o "Chiuso ora" in base a quegli orari: se
   sono sbagliati, afferma una cosa falsa in prima schermata a chiunque abbia il link.
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

## Mockup per il gestore
Ramo `mockup-gestore`, anteprima Vercel **protetta** (serve un account del team):
<https://docks-dora-git-mockup-gestore-coste1.vercel.app/>. Stesso sito con carta dei vini,
piatti, prezzi e date delle serate **inventati** e tre foto di Wikimedia Commons (CC0, CC BY,
CC BY-SA, crediti nel sito). Ogni elemento inventato ha l'etichetta gialla ESEMPIO. Serve a far
vedere al gestore come verrebbe il sito con i suoi contenuti. **Non va mai unito a `main`.**
Dettagli in `docs/anteprime-mockup/LEGGIMI.md` sul ramo.

## Foto da fare (la cosa che cambia di più il sito)
Di sera, senza persone riconoscibili (o con il loro consenso), dal telefono va bene, in
orizzontale salvo dove indicato:
1. Facciata con il neon acceso, da lontano, tutta in quadro (orizzontale e verticale).
2. Insegna "DOCKS DORA" da vicino.
3. Porta ad arco aperta con la luce dentro.
4. La sala vuota, vista d'insieme, luci accese.
5. Il bancone, con bottiglie e calici.
6. Calici versati (un rosso e un bianco) sul bancone o sul tavolo.
7. Un tagliere vero del locale, dall'alto.
8. Un piatto caldo della cucina, dall'alto e di tre quarti.
9. La lavagna o la carta dei vini (serve anche per trascrivere il menu).
10. Un dettaglio: mattoni, orologio della facciata, una bottiglia con l'etichetta.
Più: il **file originale del logo** e la **carta dei vini/menu** con i prezzi.

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
