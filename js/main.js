/* =====================================================================
   DATI DEL LOCALE: tutto quello che si cambia sta qui.
   "DA VERIFICARE" nei commenti = dato non ancora confermato dal locale
   (elenco completo nel README). Fonti: STUDIO.md §5 e DECISIONI.md.
   ===================================================================== */
const DATI = {
  nome: "Docks Dora Wine Bar",
  tipo: "Vineria con cucina",                     // locandina
  // Claim e pilastri della locandina stanno in index.html (sezione "Il posto").

  indirizzo: {
    via: "Via Valprato 68",
    citta: "Torino",
    complesso: "dentro i Docks Dora",
  },

  // DA VERIFICARE: fonte terza (vivoin.it, giugno 2026).
  comeTrovarlo: "Piazzetta Mulassano, manica centrale, di fronte all'ingresso carraio",

  // DA VERIFICARE: dal brief.
  telefono: {
    numero: "+393451490333",                      // per il link tel:
    testo: "+39 345 149 0333",                    // come si legge
  },

  // DA VERIFICARE: dal brief.
  // Orari per giorno: 0 = domenica ... 6 = sabato. null = chiuso.
  // Ore "HH:MM"; "24:00" = mezzanotte. Se si chiude dopo mezzanotte
  // basta scrivere per esempio ["18:00", "01:00"].
  orari: {
    giorni: {
      0: null,
      1: null,
      2: ["17:00", "24:00"],
      3: ["17:00", "24:00"],
      4: ["17:00", "24:00"],
      5: ["17:00", "24:00"],
      6: ["17:00", "24:00"],
    },
  },

  // null finché il locale non conferma quale account è il suo
  // (brief: @docksdorawinebar, locandina: @winebardocksdora).
  instagram: null,

  // Serate: nomi dal brief. Sul sito compaiono solo quelle con confermato: true
  // (data: "2026-11-11"). Se nessuna è confermata, la sezione Serate non c'è.
  eventi: [
    // MOCKUP: date e dettagli di esempio (esempio: true => etichetta "esempio")
    { nome: "San Martino alla Salentina", dettaglio: "Negroamaro e panini", data: "2026-11-11", confermato: true, esempio: true },
    { nome: "Aperisharing", dettaglio: "Taglieri da dividere al tavolo", data: "2026-11-20", confermato: true, esempio: true },
  ],

  // Menu: una voce per riga, solo cose confermate dal locale.
  // Finché è vuoto, la sezione Menu non c'è.
  menu: [],
};

/* ===================================================================== */

(function () {
  "use strict";

  const GIORNI = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
  const ORDINE = [1, 2, 3, 4, 5, 6, 0]; // la tabella parte da lunedì

  const tutti = (sel) => Array.from(document.querySelectorAll(sel));
  // Mostra una sezione nascosta e il suo link nella testata
  const mostraSezione = (id) => {
    const s = document.getElementById(id);
    if (s) s.hidden = false;
    tutti(`[data-link="${id}"]`).forEach((a) => (a.hidden = false));
  };
  const minuti = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };
  const ora = (hhmm) => (hhmm === "24:00" ? "24:00" : hhmm);
  const capitale = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  // Ora attuale a Torino, qualunque sia il fuso del telefono
  function adessoATorino() {
    const parti = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Rome",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const val = (t) => parti.find((p) => p.type === t).value;
    const giorno = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(val("weekday"));
    return { giorno, min: Number(val("hour")) * 60 + Number(val("minute")) };
  }

  // Intervallo [inizio, fine] in minuti, con fine oltre la mezzanotte se serve
  function intervallo(fascia) {
    const a = minuti(fascia[0]);
    let b = minuti(fascia[1]);
    if (b <= a) b += 24 * 60;
    return [a, b];
  }

  function statoApertura() {
    const g = DATI.orari.giorni;
    const { giorno, min } = adessoATorino();

    // Ancora aperti dalla sera prima (chiusura dopo mezzanotte)
    const ieri = g[(giorno + 6) % 7];
    if (ieri) {
      const [, fine] = intervallo(ieri);
      if (fine > 1440 && min < fine - 1440) return { aperto: true, fino: ieri[1] };
    }
    const oggi = g[giorno];
    if (oggi) {
      const [inizio, fine] = intervallo(oggi);
      if (min >= inizio && min < fine) return { aperto: true, fino: oggi[1] };
      if (min < inizio) return { aperto: false, quando: "oggi", da: oggi[0] };
    }
    for (let i = 1; i <= 7; i++) {
      const d = (giorno + i) % 7;
      if (g[d]) return { aperto: false, quando: i === 1 ? "domani" : GIORNI[d], da: g[d][0] };
    }
    return null;
  }

  function mostraStato() {
    const box = document.querySelector("[data-stato]");
    const testo = document.querySelector("[data-stato-testo]");
    if (!box || !testo) return;
    const s = statoApertura();
    if (!s) return;
    box.classList.toggle("stato--aperto", s.aperto);
    box.classList.toggle("stato--chiuso", !s.aperto);
    testo.textContent = s.aperto
      ? `Aperto ora, fino alle ${ora(s.fino)}`
      : `Chiuso ora · apre ${s.quando} alle ${s.da}`;
  }

  function mostraOrari() {
    const tbody = document.querySelector("[data-orari] tbody");
    if (!tbody) return;
    const oggi = adessoATorino().giorno;
    tbody.textContent = "";
    ORDINE.forEach((d) => {
      const tr = document.createElement("tr");
      if (d === oggi) tr.className = "oggi";
      const th = document.createElement("th");
      th.scope = "row";
      th.textContent = capitale(GIORNI[d]);
      const td = document.createElement("td");
      const f = DATI.orari.giorni[d];
      td.textContent = f ? `${f[0]}–${ora(f[1])}` : "Chiuso";
      tr.append(th, td);
      tbody.append(tr);
    });
  }

  function mostraContatti() {
    const t = DATI.telefono;
    tutti("[data-tel]").forEach((a) => (a.href = "tel:" + t.numero));
    tutti("[data-tel-testo]").forEach((a) => (a.textContent = t.testo));

    const mappa = "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(`${DATI.indirizzo.via}, ${DATI.indirizzo.citta}`);
    tutti("[data-mappa]").forEach((a) => (a.href = mappa));

    tutti('[data-campo="via"]').forEach((el) => (el.textContent = DATI.indirizzo.via));
    tutti('[data-campo="citta"]').forEach((el) => (el.textContent = DATI.indirizzo.citta));
    tutti('[data-campo="complesso"]').forEach((el) => (el.textContent = DATI.indirizzo.complesso));
    tutti('[data-campo="tipo"]').forEach((el) => (el.textContent = DATI.tipo));

    tutti('[data-campo="trovarlo"]').forEach((el) => (el.textContent = DATI.comeTrovarlo));

    const ig = document.querySelector("[data-instagram]");
    if (ig && DATI.instagram) {
      const nome = DATI.instagram.replace(/^@/, "");
      const a = document.createElement("a");
      a.href = `https://www.instagram.com/${nome}/`;
      a.rel = "noopener";
      a.textContent = "Instagram @" + nome;
      ig.append(a);
      ig.hidden = false;
    }
  }

  // "Da martedì a sabato, dalle 17 a mezzanotte." quando i giorni aperti sono di fila
  // e con lo stesso orario; altrimenti la riga sparisce (la tabella completa è in fondo).
  function mostraRiassunto() {
    const p = document.querySelector("[data-riassunto]");
    if (!p) return;
    const aperti = ORDINE.filter((d) => DATI.orari.giorni[d]);
    const fasce = new Set(aperti.map((d) => DATI.orari.giorni[d].join("-")));
    const diFila = aperti.every((d, i) => i === 0 || ORDINE.indexOf(d) === ORDINE.indexOf(aperti[i - 1]) + 1);
    if (!aperti.length || fasce.size !== 1 || !diFila) { p.hidden = true; return; }
    const [da, a] = DATI.orari.giorni[aperti[0]];
    const ore = (hhmm) => {
      if (hhmm === "24:00" || hhmm === "00:00") return "mezzanotte";
      const [h, m] = hhmm.split(":");
      return m === "00" ? String(Number(h)) : `${Number(h)}:${m}`;
    };
    const giorni = aperti.length === 7 ? "Tutti i giorni"
      : aperti.length === 1 ? capitale(GIORNI[aperti[0]])
      : `Da ${GIORNI[aperti[0]]} a ${GIORNI[aperti[aperti.length - 1]]}`;
    const prep = (s) => (s === "mezzanotte" ? "a mezzanotte" : s === "1" ? "all'una" : `alle ${s}`);
    const dalle = (s) => (s === "1" ? "dall'una" : `dalle ${s}`);
    p.textContent = `${giorni}, ${dalle(ore(da))} ${prep(ore(a))}.`;
  }

  function mostraEventi() {
    const ul = document.querySelector("[data-eventi]");
    const confermati = DATI.eventi.filter((ev) => ev.confermato);
    if (!ul || !confermati.length) return;
    const fmt = new Intl.DateTimeFormat("it-IT", { weekday: "long", day: "numeric", month: "long" });
    confermati.forEach((ev) => {
      const li = document.createElement("li");
      li.className = "serata";
      const nome = document.createElement("p");
      nome.className = "serata__nome";
      nome.textContent = ev.nome;
      li.append(nome);
      if (ev.dettaglio) {
        const d = document.createElement("p");
        d.className = "serata__dettaglio";
        d.textContent = ev.dettaglio;
        li.append(d);
      }
      if (ev.data) {
        const t = document.createElement("time");
        t.dateTime = ev.data;
        t.className = "serata__dettaglio";
        t.textContent = capitale(fmt.format(new Date(ev.data + "T12:00:00")));
        li.append(t);
      }
      if (ev.esempio) {
        const e = document.createElement("span");
        e.className = "esempio";
        e.textContent = "esempio";
        li.append(e);
      }
      ul.append(li);
    });
    mostraSezione("serate");
  }

  function mostraMenu() {
    const ul = document.querySelector("[data-menu]");
    if (!ul || !DATI.menu.length) return;
    DATI.menu.forEach((voce) => {
      const li = document.createElement("li");
      li.className = "serata";
      li.textContent = voce;
      ul.append(li);
    });
    mostraSezione("menu");
  }

  // La barra fissa compare quando Chiama / Come arrivare della prima schermata escono dallo schermo
  function gestisciBarra() {
    const barra = document.querySelector(".barra");
    const azioni = document.querySelector(".azioni");
    if (!barra || !azioni || !("IntersectionObserver" in window)) return;
    new IntersectionObserver(([voce]) => {
      barra.classList.toggle("barra--nascosta", voce.isIntersecting);
    }).observe(azioni);
  }

  mostraContatti();
  gestisciBarra();
  mostraRiassunto();
  mostraOrari();
  mostraStato();
  mostraEventi();
  mostraMenu();
  setInterval(mostraStato, 60 * 1000);
})();
