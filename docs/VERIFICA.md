# VERIFICA: critica del sito demo

> Aggiornamento 2 novembre 2026: i riquadri [da confermare] citati sotto non ci sono più e
> Menu e Serate sono nascoste finché non ci sono dati (DECISIONI.md P3). Gli screenshot in
> `docs/anteprime/` mostrano la versione nuova. Ricontrollato dopo il cambio: 0 errori in
> console, 0 file 404, nessuno scorrimento orizzontale a 390, 768, 1280.

Screenshot in `docs/anteprime/` (prima schermata e pagina intera a 390, 768, 1280 px),
fatti con Chrome headless a densità 1. Data: 2 novembre 2026 (lunedì, quindi lo stato
mostrato è "Chiuso ora · apre domani alle 17:00").

## Controlli tecnici
| Controllo | Esito |
|---|---|
| Errori in console | 0 a 390, 768, 1280 |
| File 404 | 0 |
| Scorrimento orizzontale | nessuno a 320, 390, 768, 1280 (`scrollWidth` = larghezza) |
| Tastiera | ordine: salta al contenuto, logo, Menu, Serate, Dove e quando, Chiama, Come arrivare…; anello di focus ambra visibile (provato a 390) |
| Bersagli touch | pulsanti 48 px, link di navigazione 44 px |
| Contrasto | testo `#ece6da` su `#0f0b09` 15.8:1; secondario 10.8:1; ambra 9:1; Chiama bianco su `#a8211f` 7.2:1; rosso neon `#e0474a` solo su testo grande (4.8:1) |
| Testi alternativi | foto facciata descritta; logo in testata con nome; logo nel piè decorativo (`alt=""`) |
| prefers-reduced-motion | toglie l'accensione del neon, lo scorrimento morbido e le transizioni |
| Apertura da file (`index.html` con doppio clic) | font e JS funzionano (provato in Chrome) |
| Logica "aperto adesso" | usa l'ora di Torino; mar 18:00 aperto fino alle 24, dom → "apre martedì alle 17:00" (ragionata sul codice; provata dal vivo solo il lunedì) |

## Test dei 5 secondi (390 px, prima schermata)
Un estraneo vede: **Wine bar Docks Dora, vineria con cucina**, se è aperto, **Via Valprato 68,
Torino, dentro i Docks Dora**, e due azioni: **Chiama** e **Come arrivare**. Più la foto della
facciata col neon. Passa.
Cosa **non** capisce: che cosa si beve e si mangia e a che prezzo. Non è un difetto del design:
il materiale non c'è.

## Scenario: venerdì sera, telefono, per strada
- **È aperto?** Risposta nella prima schermata, zero tocchi. Ma l'orario è [da confermare]: se
  è sbagliato, il sito dice con sicurezza una cosa falsa. È il rischio più grosso della demo.
- **Dov'è?** Indirizzo nella prima schermata; "Come arrivare" = 1 tocco verso Google Maps.
  Dove sta il bar dentro il complesso: 1 tocco su "Dove e quando" (o scorrendo), ed è [da
  confermare].
- **Cosa si beve o mangia?** 1 tocco su "Menu" e si trova solo il riquadro "non ancora qui,
  chiama". Punto più debole.
- **Prenotare**: 1 tocco su Chiama, sempre a portata (barra fissa che compare quando i
  pulsanti iniziali escono dallo schermo).

## Difetti trovati e cosa ho fatto
| # | Dove, larghezza | Difetto | Perché conta | Esito |
|---|---|---|---|---|
| 1 | Prima schermata, 390 | Pallino dello stato da solo su una riga, testo sotto | Sembrava un elemento rotto proprio nell'informazione più importante | Corretto (griglia pallino + testo) |
| 2 | Prima schermata, 390 | "Chiama" più stretto di "Come arrivare", allineati male | Gerarchia confusa tra le due azioni | Corretto (pulsanti a tutta larghezza su telefono) |
| 3 | Barra fissa, 375–390 | "Come arrivare" andava a capo su due righe | Pulsante alto e sbilanciato | Corretto |
| 4 | Prima schermata, 390 | Due "Chiama" e due "Come arrivare" visibili insieme (pulsanti + barra fissa), 75 px persi | Rumore nella schermata più preziosa | Corretto: la barra compare solo quando i pulsanti iniziali escono dallo schermo; senza JS resta sempre visibile |
| 5 | "Il posto", tutte | Titolo "Il posto" e claim della stessa taglia e font | Gerarchia piatta: non si capiva quale fosse il messaggio | Corretto: "Il posto" diventa etichetta piccola, il claim è il titolo vero |
| 6 | "Il posto", 1280 | Colonna destra vuota, testo schiacciato a sinistra | Squilibrio evidente su desktop | Corretto: testo a destra del claim |
| 7 | Prima schermata, 1280 | Stato e indirizzo minuscoli rispetto al nome | Le informazioni utili si perdevano | Corretto (taglie aumentate su desktop) |
| 8 | Testo "Il posto", tutte | Ripeteva l'indirizzo per la terza volta | Riempitivo | Riscritto: "Vino, cucina e una porta ad arco dentro i Docks Dora. Di sera la riconosci dall'insegna rossa." (porta ad arco e insegna rossa si vedono nelle foto) |

## Difetti che restano
- **Foto piccola** (310×740 px, ritagliata dalla locandina). A 1280 è mostrata a 310 px CSS:
  su schermi ad alta densità è morbida. A 390 regge perché è stretta (~116 px). Serve una foto
  vera della facciata, di sera, senza persone riconoscibili.
- **Una sola foto**: sotto la prima schermata il sito è solo tipografia su nero e mattone.
  Coerente, ma piatto. Niente galleria finché non ci sono almeno 3 foto.
- **Il nome a 1280**: in "DOCKS DORA" la gamba della R di Bodoni Moda lascia un vuoto prima
  della A che sembra uno spazio. Difetto del carattere a quella taglia; lasciato.
- **Riga "Demo non pubblica"** in cima: 55 px su telefono. Va tolta quando il sito diventa vero.
- **"Atmosfera unica"** suona da brochure, ma è scritto sulla locandina del locale: non lo
  sostituisco (regola: le frasi del locale si riusano come sono).
- **Identità**: grazie a neon, mattone e tipografia della locandina sembra il locale nella
  prima schermata. Sotto, senza foto e senza menu, rischia di sembrare un buon template scuro.
  Si risolve con contenuti veri, non con il design.
