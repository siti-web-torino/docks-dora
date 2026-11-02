# STUDIO: Docks Dora Wine Bar

Fonti usate in questo file:
- **[brief]** = messaggio iniziale dell'utente (2 novembre 2026).
- **[logo]** = `img-originali/logo.png`
- **[locandina]** = `img-originali/inaugurazione.png`
- **[folla]** = `img-originali/facciata-folla.png` (solo studio, non va nel sito)
- Colori campionati con Pillow (script in `strumenti/`, fuori da git): medie e quantizzazione su zone precise.

## 1. Catalogo foto

| File | Cosa mostra | Qualità | Ritaglio possibile | Uso nel sito |
|---|---|---|---|---|
| `logo.png` | Cerchio grigio pieno con monogramma "DD" bianco (due D sovrapposte, aste doppie) e scritta "WINE BAR" in maiuscolo bianco, sans stretto con terminali decorativi (stile anni '20). | 311×308 px, PNG RGBA ma **senza trasparenza** (alpha sempre 255): angoli bianchi. Il cerchio è **tagliato di circa 5 px in alto e a sinistra** (bordo piatto lungo 80 px sui lati alto e sinistro, contro 18 px sui lati opposti). | Nessuno: si usa com'è. Gli angoli bianchi si nascondono con `clip-path: circle()` in CSS. | Testata e piè di pagina, piccolo (max ~120 px). A quella misura il taglio di 5 px quasi non si vede, ma va chiesto al locale il file originale (vettoriale o PNG più grande). |
| `inaugurazione.png` | Locandina dell'inaugurazione. Metà sinistra: testi su nero. Metà destra: foto notturna della facciata in mattoni, orologio, targa illeggibile, insegna al neon rossa "DOCKS DORA", neon verticale corsivo "Wine Bar", porta ad arco aperta con luce ambra, scalini, una botte in basso a destra. | 632×856 px. La parte fotografica utile (senza testi sovrapposti) è circa x 320–632, y 0–740: **circa 310×740 px**, troppo poco per un hero a schermo pieno (a 390 px CSS su un telefono a 3x servirebbero ~1170 px di larghezza). Non so se la foto è ritoccata o un fotomontaggio. | Ritaglio verticale facciata+neon+porta (x 320–632, y 0–740). Altri ritagli (orologio, porta) sono pezzi della stessa foto piccola: non fanno una galleria. | Solo come ripiego di demo, ritagliata, mai la locandina intera. Fonte dei testi (slogan, pilastri). |
| `facciata-folla.png` | La stessa facciata di sera dal piazzale: neon "DOCKS DORA" e "Wine Bar", orologio, porta aperta, decine di persone riconoscibili in primo piano. | 463×651 px. | Nessuno: le persone occupano tutta la metà inferiore. | **Non usare nel sito**: persone riconoscibili, serve il consenso. Esclusa da git (`.gitignore`). Serve solo per studiare luce e colori. |

Ritagli usabili davvero diversi: **1** (facciata dalla locandina). Quindi **niente galleria** (regola del brief: con meno di 3 ritagli, niente galleria).

Non ci sono foto di interno, bancone, calici o piatti [brief]. La porta aperta della locandina lascia intravedere luce e qualche quadro, ma non abbastanza per descrivere l'interno: non lo descrivo.

## 2. Identità visiva reale

### Palette campionata
| Ruolo osservato | Hex | Dove |
|---|---|---|
| Nero di fondo | `#000000` | [locandina] fondo della metà sinistra (79% dei pixel della striscia x 0–30) |
| Crema del titolo | `#e8e6dd` | [locandina] lettere "WINE" |
| Oro spento / kaki | `#b1a995` | [locandina] corsivo "bar" |
| Oro del monogramma | `#a78f5c` | [locandina] "DD" in basso, pixel più chiari |
| Rosso neon (nucleo) | `#d34041` | [folla] insegna "DOCKS DORA" |
| Rosso neon (alone, foto ritoccata) | `#931b18` / `#881414` | [locandina] insegna e neon "Wine Bar" |
| Ambra della porta | `#cb8e41` / `#b2702d` | [locandina] luce dentro la porta |
| Ambra delle finestre | `#c5ab83` / `#e4cd9f` | [folla] finestra a sinistra |
| Mattone di sera | `#514435` / `#251a13` | [folla] parete alta |
| Mattone in ombra | `#170d06` / `#271d15` | [locandina] parete a destra |
| Grigio del logo | `#4b4b4b` | [logo] cerchio |
| Bianco del logo | `#ffffff` | [logo] monogramma e scritta |

Nota: il logo è **grigio e bianco**, non rosso né oro. Il rosso e l'ambra vengono dall'edificio e dai neon, l'oro dalla grafica della locandina.

### Scritte
- **Logo** [logo]: monogramma "DD" geometrico con aste doppie, "WINE BAR" in sans condensato maiuscolo con piccole grazie decorative, gusto Art Déco.
- **Locandina** [locandina]: serif ad alto contrasto in maiuscolo per "WINE" e "DOCKS DORA" (tipo Didone); corsivo calligrafico per "bar" e "Save the date"; maiuscoletto spaziato sans per "VINERIA CON CUCINA", "INAUGURAZIONE", il claim; filetti sottili oro con un punto al centro.
- **Neon** [locandina, folla]: "DOCKS DORA" in serif maiuscolo rosso; "Wine Bar" in corsivo rosso verticale.

### Materiali, luce, atmosfera
- Mattone pieno scuro, cornici in pietra/intonaco chiaro, finestre industriali a griglia, orologio sulla facciata, scalini in pietra, selciato [locandina, folla].
- Luce: sera, neon rosso che tinge il mattone, luce calda ambra che esce da porta e finestre [locandina, folla].
- Atmosfera: [folla] mostra un piazzale pieno di persone in piedi con bicchieri, informale, tra adulti di età varia. Ne deduco (supposizione) un posto di quartiere più che un locale esclusivo.

## 3. Tono di voce
Testi copiati dalla locandina [locandina], da riusare solo come scritti:
- "Vineria con cucina"
- "Dove il vino incontra il gusto"
- "Vini selezionati" / "Cucina di qualità" / "Atmosfera unica"
- "Inaugurazione", "Save the date", "18 / 19 settembre" (evento passato: non si usa)

Il tono della locandina è sobrio ed elegante, frasi di due-tre parole, nessun aggettivo enfatico oltre "unica". Il brief chiede: caldo, frasi brevi, niente linguaggio da brochure.

## 4. Menu
**Nessun menu né carta vini forniti** [brief]. Niente da trascrivere. La sezione resta un riquadro [DA CONFERMARE].

## 5. Dati: cosa c'è, cosa no

| Dato | Valore | Stato | Fonte |
|---|---|---|---|
| Nome | Docks Dora Wine Bar | confermato | [locandina] "WINE bar DOCKS DORA" + [brief] |
| Tipo | Vineria con cucina | confermato | [locandina] |
| Indirizzo | Via Valprato 68, Torino | confermato | [locandina] |
| Dentro i Docks Dora | sì | dal brief | [brief]; la foto conferma l'insegna "DOCKS DORA" ma non lo stato del complesso |
| Claim | "Dove il vino incontra il gusto" | confermato | [locandina] |
| Pilastri | Vini selezionati / Cucina di qualità / Atmosfera unica | confermato | [locandina] |
| Orari | mar–sab 17:00–24:00, dom e lun chiuso | **[DA CONFERMARE]** | [brief] |
| Telefono | +39 345 149 0333 | **[DA CONFERMARE]** | [brief] |
| Instagram | @docksdorawinebar (brief) vs @winebardocksdora (locandina) | **[DA CONFERMARE]**, discrepanza | [brief], [locandina] riga in basso |
| Apertura | settembre 2026 | **[DA CONFERMARE]** | [brief]; la locandina dice solo "18 / 19 settembre", senza anno |
| Date storiche | "Est. 1912 & 2026", insegna 1911 | **non usare** | [brief]; la targa nella locandina è illeggibile |
| Eventi (San Martino alla Salentina, Aperisharing) | solo i nomi | **[DA CONFERMARE]** | [brief] |
| Prenotazioni | canale non definito; CTA = Chiama | — | [brief] |
| Menu, carta vini, prezzi | — | mancano | [brief] |
| Foto interno, piatti, vini | — | mancano | [brief] |
| Eventi privati, inglese, parcheggio, P.IVA | — | non forniti, non esistono nel sito | [brief] |
| Email, sito esistente | — | non lo so | — |

### Cosa non si può sapere dal materiale
- Se il locale è davvero aperto adesso e con quali orari reali.
- Che cosa si mangia e si beve, a che prezzo.
- La storia dell'edificio (date contraddittorie nel brief).
- Quale dei due account Instagram è quello giusto.
- Se la foto della locandina è di proprietà del locale e se possiamo usarla.

---

## 6. Contesto e criteri di design

Ricerca fatta il 2 novembre 2026 con ricerca web e lettura diretta delle pagine. Legenda: **[oss]** = osservato in una fonte; **[sup]** = mia supposizione.

### 6.1 Cosa cerca chi arriva sul sito di una vineria
- Le informazioni di base: chi sei, dove sei, orari, telefono, menu, prenotazione [oss: articolo BentoBox, [getbento.com](https://getbento.com/blog/how-to-make-best-restaurant-website-design)]. Fonti di settore, spesso venditori di siti: le prendo come indicazione, non come misura.
- Da telefono si cercano soprattutto posizione, orari e indicazioni; il traffico da mobile sale a ridosso dei pasti [oss: dati Restaurants Canada citati da [gfs.ca](https://gfs.ca/ideas/the-importance-of-mobile-friendly-websites/); BentoBox]. I numeri sono vecchi (2013–2016).
- Menu difficili da leggere e siti che sembrano vecchi allontanano i clienti [oss: infografica 1MGH 2019, testo frammentato: la cito solo come tendenza].
- Ordine probabile per una vineria serale [sup]: 1) è aperto stasera e fino a che ora? 2) dov'è esattamente? 3) che cosa si beve e si mangia, a che prezzo? 4) come prenoto (qui: chiamando).

### 6.2 Siti analizzati (principi, nulla copiato)
| Sito | Sopra la piega | Azioni | Cosa funziona | Cosa no |
|---|---|---|---|---|
| Banco vini e alimenti, Torino ([bancoviniealimenti.it](https://www.bancoviniealimenti.it/)) [oss] | Logo, menu a 6 voci, due titoli grandi, breve testo, un pulsante verso la carta vini | Solo carta vini e Instagram; niente chiama/mappa | Orari su righe separate, chiusura detta chiaramente, nota "no prenotazioni" scritta senza giri | Orari e indirizzo non in alto; nessun tasto chiama |
| 10 Cases, Londra ([10cases.co.uk](https://www.10cases.co.uk/)) [oss] | Foto, poi titolo che dice tipo + zona e **l'indirizzo subito sotto** | "Find a table" fisso nell'header; menu e carta vini per sezione | Tipo + quartiere + indirizzo nella prima schermata | Menu solo in PDF (scomodo da telefono); orari in fondo |
| Noble Rot, Londra ([noblerot.co.uk](https://www.noblerot.co.uk/)) [oss] | Una riga di presentazione e tre pulsanti | "Reserve a table" ripetuto in header, hero, sezioni, footer | Un'azione principale ripetuta ovunque | Nessun orario in home; link mappa che puntano alla sede sbagliata |
| Dante, New York ([dante-nyc.com](https://www.dante-nyc.com/)) [oss] | Grande foto di un cocktail e premi | Blocchi impilati: prenota, eventi, shop, menu | Ogni blocco ha un titolo, una riga e un'azione | Orari e indirizzo non in home: un tocco in più per la cosa più chiesta |
| Still.a Wine Bar, Torino (scheda [italia.it](https://www.italia.it/it/piemonte/torino/dove-mangiare/stilla-wine-bar)) [oss] | Scheda: orari per giorno, prenotazione via TheFork | Prenota | Orari divisi per giorno con i giorni di chiusura | Non è un sito proprio |
| Tut vin, Torino (schede raisin.digital dai risultati di ricerca) [oss] | Carta vini e cibo su piattaforma esterna | — | Carta aggiornabile senza toccare il sito | Dipende da un servizio terzo; pagina non leggibile (403) |
| Tregalli ([tregalli.it](https://www.tregalli.it/)) [oss] | È un e-commerce di vini, probabilmente **non** la Vineria Tre Galli di Torino: lo scarto come omonimo | — | — | Telefono e indirizzo solo nel footer |

Non raggiunti: Rabezzana (connessione rifiutata), The Ten Bells (connessione interrotta).

Principi ricavati:
1. Le pagine migliori dicono **tipo + zona + indirizzo** nella prima schermata (10 Cases). Molte nascondono orari e telefono in fondo (Dante, Noble Rot, Tregalli): è il difetto più comune.
2. Un'unica azione principale ripetuta (Noble Rot) funziona meglio di molti pulsanti alla pari.
3. Orari su righe per giorno, con i giorni di chiusura scritti (Banco, Still.a).
4. Menu in PDF = scomodo da telefono (10 Cases). Qui il menu non c'è comunque.

### 6.3 Cosa dicono le fonti pubbliche su questo locale
- Indirizzo Via Valprato 68 confermato da [vivoin.it](https://www.vivoin.it/locations/docks-dora-wine-bar/) (scheda "Docks Dora wine bar", nessuna descrizione, nessun contatto).
- [vivoin.it, evento del 12/06/2026](https://www.vivoin.it/events/aperi-cementoarmato-libro-mostra-fotografica-tour-porcheddu/): colloca il bar in "piazzetta Mulassano (manica centrale di fronte all'ingresso carraio)" e lo chiama "wine and cocktail bar" "di recente apertura". **Contraddizione con il brief**: un evento al bar a giugno 2026 contro "apertura settembre 2026". Forse l'inaugurazione del 18/19 settembre è venuta dopo un'apertura in sordina: non lo so. La posizione dentro il complesso è utilissima per chi arriva, ma è una fonte terza: nel sito va come [DA CONFERMARE]. "Cocktail" non è nel brief né in locandina: non lo uso.
- Una scheda Apple Maps per "Docks Dora" a quell'indirizzo riporta mar–sab 17–24, dom e lun chiuso (dal riassunto della ricerca, non sono riuscito ad aprirla; potrebbe riferirsi al complesso). Coincide col brief, ma resta [DA CONFERMARE].
- Il complesso Docks Dora: ex scalo ferroviario con atelier e spazi creativi, Barriera di Milano, bus 46, 49, 77, accessibilità parziale per sedie a rotelle [oss: [openhousetorino.it](https://www.openhousetorino.it/edifici/docks-dora/)]. Fonte terza: nel sito uso solo il fatto che il bar sta "dentro i Docks Dora" (dal brief), nessuna storia, nessun "ex".
- **Recensioni**: non ne ho trovate di specifiche sul wine bar. Non so cosa apprezzino i clienti.
- **Instagram**: nessuno dei due nomi (@docksdorawinebar, @winebardocksdora) compare nei risultati di ricerca. Non verificabile da qui.
- **Omonimi da non attribuire**: "Amen (Docks Dora)" e "Spazio Docks" sono altri locali/spazi del complesso; la scheda Wanderlog "Docks Dora" in via Perugia 32 è un altro posto. Il "1912" dei magazzini citato da vivoin.it riguarda l'edificio, non il bar, e il brief dice di non usare date.

### 6.4 Preferenze dell'utente a confronto con le prove
- Serale, nero/antracite con rosso neon e ambra: **coerente** con [locandina] e [folla]. Tengo.
- Serif classico per i titoli, sans pulito, corsivo pochissimo: **coerente** con la locandina. Tengo, con il corsivo su una sola parola.
- Rosso vino: non compare nelle foto (il rosso è neon, non bordeaux). Lo uso al massimo come tono scuro di supporto, non come colore d'identità.
- Pulsante chiama sempre raggiungibile + orari e chi/dove nella prima schermata: **coerente** con i principi 1–2. Tengo.
- Unico punto di attrito: sfondo nero + testo piccolo, letto di sera per strada, rischia poca leggibilità se si esagera con grigi e oro spento. Seguo il contrasto AA, non l'effetto.

### 6.5 Criteri di design
1. **Prima schermata a 390 px**: nome, "Vineria con cucina", "Via Valprato 68, dentro i Docks Dora", orari di oggi e i due pulsanti Chiama / Come arrivare. [oss: principio 1; brief]
2. **Azione principale: Chiama** (tel:), in una barra fissa in basso su telefono insieme a "Come arrivare". [brief; oss: principio 2]
3. **"Aperto adesso?" in chiaro**: il sito calcola dagli orari nell'oggetto dati se è aperto e fino a che ora, sempre con l'etichetta [DA CONFERMARE] finché il locale non conferma. [sup: è la prima domanda di sera]
4. **Trovare la porta**: il complesso è grande; dire dove sta il bar dentro i Docks Dora (piazzetta, manica centrale, [DA CONFERMARE]) e usare il neon rosso come segno di riconoscimento. [oss: vivoin.it, openhousetorino.it; sup]
5. **Onestà sul menu**: la sezione "Cosa si beve e si mangia" esiste, a un tocco dalla prima schermata, con i tre pilastri della locandina e un riquadro chiaro sul menu che manca. Niente piatti inventati. [brief; oss: principio 4]
6. **Identità presa dal posto**: mattone, neon rosso, luce ambra, tipografia della locandina (serif maiuscolo + un solo corsivo). Logo grigio usato com'è e piccolo. [locandina, folla, logo]
7. **Leggero e leggibile di sera**: una sola immagine, due famiglie di font locali, testo principale ≥ 17 px, contrasto AA su nero. [sup]
8. **Niente link incerti**: Instagram non diventa un link finché non si sa quale account è giusto. [brief]
