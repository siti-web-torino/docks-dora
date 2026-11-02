# DECISIONI: Docks Dora Wine Bar

Scelte fatte in autonomia e perché. Fonti abbreviate come in STUDIO.md: [brief], [logo], [locandina], [folla].

## Dati e contenuti

| # | Decisione | Motivo |
|---|---|---|
| D1 | `facciata-folla.png` esclusa dal sito e da git (`.gitignore`). | Decine di persone riconoscibili [folla]; nessun consenso. Usata solo per campionare luce e colori. |
| D2 | **Instagram: nessun link.** Nel sito c'è un riquadro [DA CONFERMARE] che riporta i due nomi. | Il brief dice @docksdorawinebar, la locandina (riga in basso) dice @winebardocksdora. La ricerca web non trova nessuno dei due. Un link sbagliato manda il cliente da un'altra parte. Nell'oggetto dati c'è `instagram: null`: quando il locale conferma, basta scrivere il nome giusto e il link compare. |
| D3 | Nessuna data storica, nessun "Magazzini Dora", nessun "ex magazzini/ex scalo". | Date contraddittorie nel brief (1912, 1911, 2026); la targa in [locandina] è illeggibile. vivoin.it parla di "Magazzini Docks Dora del 1912", ma riguarda l'edificio ed è fonte terza. |
| D4 | "Chi siamo" diventa "Il posto" e dice solo cose confermate: vineria con cucina, Via Valprato 68, dentro i Docks Dora, il claim e i tre pilastri della locandina. | Nessuna storia, nessun nome di gestori nel materiale. |
| D5 | Apertura "settembre 2026" non citata come fatto; niente "Save the date", niente inaugurazione. | Dal brief, non verificata. In più vivoin.it segnala un evento al bar il 12/06/2026 e lo dice "di recente apertura": contraddice settembre. Da chiarire con il locale. |
| D6 | Orari mar–sab 17–24 mostrati, ma con etichetta [DA CONFERMARE] accanto, anche nell'indicatore "Aperto adesso". | Solo dal brief. Una scheda Apple Maps trovata in ricerca dice lo stesso, ma potrebbe riferirsi al complesso. |
| D7 | Telefono +39 345 149 0333 usato per il pulsante Chiama, con [DA CONFERMARE] vicino al numero scritto. | È l'unico canale di prenotazione indicato [brief]. Senza un numero il sito non ha un'azione; il rischio è segnalato in chiaro e in RAPPORTO.md. |
| D8 | Posizione dentro il complesso ("piazzetta Mulassano, manica centrale di fronte all'ingresso carraio") mostrata come [DA CONFERMARE]. | Viene da una fonte terza (vivoin.it, giugno 2026), non dal brief. Ma è l'informazione che serve a chi arriva di sera in un complesso grande: meglio mostrarla marcata che tacerla. |
| D9 | Eventi: compaiono "San Martino alla Salentina" e "Aperisharing" solo come nomi, senza date né descrizioni, in riquadro [DA CONFERMARE]. "Negroamaro e panini" citato perché sta nel brief. | Brief. Niente dettagli inventati. |
| D10 | Menu e carta vini: sezione presente con i tre pilastri della locandina e un riquadro [DA CONFERMARE]; invito a chiamare. Niente PDF. | Brief: menu non fornito. |
| D11 | Footer: un solo riquadro [DA CONFERMARE] per dati aziendali (P.IVA, ragione sociale). Niente sezione eventi privati, niente inglese, niente parcheggio. | Brief. |
| D12 | "Come arrivare" = link a Google Maps con ricerca per indirizzo (`maps/search/?api=1&query=...`), nessun iframe. | CLAUDE.md. Link per indirizzo e non per coordinate, così non dipende da un segnaposto che potrebbe essere di un omonimo. |
| D13 | Nessuna galleria. | Un solo ritaglio usabile (STUDIO.md §1). |
| D14 | Hero con ritaglio della facciata dalla locandina (x 320–632, y 0–740), come ripiego di demo. | Unica foto del locale senza persone. Risoluzione insufficiente per un hero pieno (circa 312×740 px): la uso in un riquadro verticale contenuto, non a tutto schermo, e lo segnalo in RAPPORTO.md. |
| D15 | Logo mostrato com'è; angoli bianchi nascosti con `clip-path: circle()` in CSS. | Brief. Il file è tagliato di ~5 px in alto e a sinistra: non lo correggo, lo segnalo. |
| D16 | Contraddizione tra testo "Vineria con cucina" e "wine and cocktail bar" (vivoin.it): uso solo "Vineria con cucina". | È quello che dice la locandina del locale. |

## Direzioni visive

### A. Neon sul mattone
- **Concetto**: il sito è la facciata di sera: nero caldo, mattone, una sola scritta rossa che "si accende" e la luce ambra della porta come colore delle azioni.
- **Palette**: notte `#0f0b09` (fondo, dal mattone in ombra `#170d06`); mattone `#2a1d15` (superfici, da `#251a13`/`#271d15`); crema `#ece6da` (testo, dal titolo `#e8e6dd`); neon `#e0474a` (accento e titolo, dal nucleo `#d34041`); rosso insegna `#a8211f` (fondo del pulsante Chiama, dall'alone `#931b18`); ambra `#e0a458` (link e secondo pulsante, da `#cb8e41`); oro spento `#b1a995` (solo filetti).
- **Font**: Bodoni Moda (serif ad alto contrasto, come "WINE" e "DOCKS DORA" della locandina) + Jost (sans geometrico, richiama il "WINE BAR" stretto del logo, leggibile da telefono). Corsivo di Bodoni Moda solo per "bar".
- **Foto e logo**: un riquadro verticale con la facciata (ritaglio locandina); logo piccolo nella testata.
- **Dettaglio memorabile**: il nome nella prima schermata ha un leggero alone come il neon, e l'indicatore "Aperto adesso" è un piccolo neon che si accende o resta spento.
- **Rischio**: il nero e il rosso possono scivolare nel "locale notturno" o nel cliché; il bagliore va dosato e tolto con prefers-reduced-motion.
- **Giustificazione**: [locandina] e [folla] mostrano proprio questo (neon rosso, mattone, luce ambra); criteri 1, 4, 6.

### B. Locandina Déco
- **Concetto**: estendere la locandina d'inaugurazione: nero pieno, oro, filetti con punto centrale, maiuscoletti spaziati, monogramma DD come elemento ricorrente.
- **Palette**: nero `#000000`; crema `#e8e6dd`; oro `#b1a995`/`#a78f5c` per titoli e filetti; nessun rosso.
- **Font**: Cormorant Garamond (serif classico) + Josefin Sans (maiuscoletto spaziato, gusto anni '20); corsivo calligrafico per "bar".
- **Foto e logo**: foto in secondo piano; il monogramma della locandina come separatore (ma è grafica della locandina, non il logo: andrebbe chiesto).
- **Dettaglio memorabile**: i tre pilastri con le icone a filo come nella locandina.
- **Rischio**: elegante ma freddo e "da evento", rischio snob (contro la preferenza "non snob"); l'oro spento su nero è sotto AA per testo piccolo (`#a78f5c` su nero ≈ 6:1 ok, ma `#8b7e63` del "Save the date" no); copia troppo da vicino una grafica fatta per un'inaugurazione passata.
- **Giustificazione**: [locandina]; criterio 6.

### C. Tabellone serale
- **Concetto**: il sito come un tabellone orari: la prima cosa è una tabella grande "oggi aperto 17–24", il resto in righe da bacheca, grotesk condensato e cifre grandi; richiamo all'orologio della facciata.
- **Palette**: antracite `#1c1c1c` (dal grigio del logo `#4b4b4b` scurito); bianco `#ffffff`; ambra `#e0a458` per le cifre; rosso solo per "chiuso".
- **Font**: Barlow Condensed (cifre e titoli) + Barlow (testo).
- **Foto e logo**: logo in grande (è grigio e bianco come la palette); foto ridotta a dettaglio dell'orologio.
- **Dettaglio memorabile**: orario di oggi come cifra gigante.
- **Rischio**: funziona benissimo per "è aperto?", ma l'identità diventa da stazione/ufficio e richiama la storia ferroviaria del complesso, che non possiamo usare; si perde il calore chiesto e il neon che i clienti vedono arrivando.
- **Giustificazione**: criteri 1 e 3; [logo] (grigio e bianco), orologio in [locandina].

### Scelta: A, "Neon sul mattone"
È quella più fedele al locale: rosso neon, mattone e luce ambra sono le tre cose che si vedono in **entrambe** le foto della facciata, e il neon è anche il segno con cui si trova la porta di sera dentro un complesso grande (criterio 4). Da C prendo l'indicatore "Aperto adesso / fino alle 24" in cima (criterio 3); da B il serif maiuscolo e il corsivo usato una volta sola, che sono la tipografia reale della locandina. Scarto B perché ricalca un'inaugurazione già passata e rischia lo snob; scarto C perché è freddo e spinge su una storia non verificata.

## Costruzione
(vedi sotto, aggiornato durante la fase 4)
