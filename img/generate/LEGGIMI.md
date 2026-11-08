# Immagini provvisorie di atmosfera

Generate con lo strumento immagini integrato l’8 novembre 2026 su richiesta dell’utente.
Non raffigurano interni, bottiglie in carta o piatti realmente serviti da Docks Dora.

| Slot | Soggetto | Versioni pubblicate |
|---|---|---|
| `calice` | Vino rosso versato in un calice, legno e mattoni | `calice-640.webp`, `calice-1280.webp` |
| `tavola` | Pane, formaggi, olive e calici come composizione illustrativa | `tavola-640.webp`, `tavola-1280.webp` |
| `sera` | Lampada, calici e bottiglie senza etichette | `sera-640.webp`, `sera-1280.webp` |

Prompt completi e provenienza: `PROVENIENZA.json`. Le foto originali del locale restano
`../facciata.webp` e `../insegna.webp`; il logo non è stato modificato.

Per sostituire un’immagine carica il nuovo file, modifica il relativo slot in
`../immagini.json` e imposta `generata` a `false`. Aggiorna alt, dimensioni e punto di
ritaglio; `srcset` può essere vuoto per una sola versione. Esegui `npm run build`.
La nota pubblica viene adattata automaticamente. Layout e animazioni restano indipendenti
dai nomi dei file. I PNG originali generati sono consegnati separatamente.
