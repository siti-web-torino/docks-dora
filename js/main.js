/* =====================================================================
   DATI DEL LOCALE: tutto quello che si cambia sta qui.
   confermato: false  =>  accanto al dato compare [da confermare].
   Fonti di ogni dato: STUDIO.md §5 e DECISIONI.md.
   ===================================================================== */
const DATI = {
  nome: "Docks Dora Wine Bar",
  tipo: "Vineria con cucina",                     // locandina
  claim: "Dove il vino incontra il gusto",        // locandina, testo esatto
  pilastri: [                                     // locandina, testo esatto
    ["Vini", "selezionati"],
    ["Cucina", "di qualità"],
    ["Atmosfera", "unica"],
  ],

  indirizzo: {
    via: "Via Valprato 68",
    citta: "Torino",
    complesso: "dentro i Docks Dora",
  },

  // Fonte terza (vivoin.it, giugno 2026): da far confermare al locale.
  comeTrovarlo: {
    testo: "Piazzetta Mulassano, manica centrale, di fronte all'ingresso carraio",
    confermato: false,
  },

  telefono: {
    numero: "+393451490333",                      // per il link tel:
    testo: "+39 345 149 0333",                    // come si legge
    confermato: false,
  },

  // Orari per giorno: 0 = domenica ... 6 = sabato. null = chiuso.
  // Ore "HH:MM"; "24:00" = mezzanotte. Se si chiude dopo mezzanotte
  // basta scrivere per esempio ["18:00", "01:00"].
  orari: {
    confermato: false,
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

  // Serate: nomi dal brief. data: "2026-11-11" quando è confermata.
  eventi: [
    { nome: "San Martino alla Salentina", dettaglio: "Negroamaro e panini", data: null, confermato: false },
    { nome: "Aperisharing", dettaglio: null, data: null, confermato: false },
  ],

  // Menu: quando arriva, si scrive qui; finché è vuoto resta il riquadro.
  menu: [],
};

/* ===================================================================== */

(function () {
  "use strict";

  const GIORNI = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
  const ORDINE = [1, 2, 3, 4, 5, 6, 0]; // la tabella parte da lunedì

  const tutti = (sel) => Array.from(document.querySelectorAll(sel));
  const etichettaDc = (testo) => {
    const s = document.createElement("span");
    s.className = "dc";
    s.textContent = testo || "da confermare";
    return s;
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
    const dc = document.querySelector("[data-orari-dc]");
    if (dc) dc.hidden = DATI.orari.confermato;
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
    if (t.confermato) {
      tutti(".contatto .dc, .azioni__nota .dc").forEach((el) => el.remove());
    }

    const mappa = "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(`${DATI.indirizzo.via}, ${DATI.indirizzo.citta}`);
    tutti("[data-mappa]").forEach((a) => (a.href = mappa));

    tutti('[data-campo="via"]').forEach((el) => (el.textContent = DATI.indirizzo.via));
    tutti('[data-campo="citta"]').forEach((el) => (el.textContent = DATI.indirizzo.citta));
    tutti('[data-campo="complesso"]').forEach((el) => (el.textContent = DATI.indirizzo.complesso));
    tutti('[data-campo="tipo"]').forEach((el) => (el.textContent = DATI.tipo));
    tutti('[data-campo="claim"]').forEach((el) => (el.textContent = DATI.claim));

    const trovarlo = document.querySelector('[data-campo="trovarlo"]');
    if (trovarlo) {
      trovarlo.textContent = DATI.comeTrovarlo.testo;
      const dc = trovarlo.nextElementSibling;
      if (dc && DATI.comeTrovarlo.confermato) dc.remove();
    }

    const ig = document.querySelector("[data-instagram]");
    if (ig && DATI.instagram) {
      const nome = DATI.instagram.replace(/^@/, "");
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.href = `https://www.instagram.com/${nome}/`;
      a.rel = "noopener";
      a.textContent = "Instagram @" + nome;
      p.append(a);
      ig.replaceWith(p);
    }
  }

  function mostraPilastri() {
    const ul = document.querySelector("[data-pilastri]");
    if (!ul) return;
    ul.textContent = "";
    DATI.pilastri.forEach(([parola, resto]) => {
      const li = document.createElement("li");
      const s = document.createElement("span");
      s.className = "pilastri__parola";
      s.textContent = parola;
      li.append(s, " " + resto);
      ul.append(li);
    });
  }

  function mostraEventi() {
    const ul = document.querySelector("[data-eventi]");
    if (!ul) return;
    ul.textContent = "";
    const fmt = new Intl.DateTimeFormat("it-IT", { weekday: "long", day: "numeric", month: "long" });
    DATI.eventi.forEach((ev) => {
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
      if (!ev.confermato || !ev.data) {
        li.append(etichettaDc(ev.data ? "dettagli da confermare" : "data e dettagli da confermare"));
      }
      ul.append(li);
    });
  }

  function mostraMenu() {
    const box = document.querySelector("[data-menu]");
    if (!box || !DATI.menu.length) return;
    const ul = document.createElement("ul");
    ul.className = "serate__elenco";
    DATI.menu.forEach((voce) => {
      const li = document.createElement("li");
      li.className = "serata";
      li.textContent = voce;
      ul.append(li);
    });
    box.replaceWith(ul);
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
  mostraPilastri();
  mostraOrari();
  mostraStato();
  mostraEventi();
  mostraMenu();
  setInterval(mostraStato, 60 * 1000);
})();
