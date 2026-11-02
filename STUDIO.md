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
