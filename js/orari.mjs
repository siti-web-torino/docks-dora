// Pure functions shared by the page and the boundary tests.
const GIORNI = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
export function adessoATorino(data = new Date()) {
  const parti = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  }).formatToParts(data);
  const valore = tipo => parti.find(parte => parte.type === tipo).value;
  return {
    giorno: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(valore('weekday')),
    min: Number(valore('hour')) * 60 + Number(valore('minute'))
  };
}
function minuti(testo) {
  const [ore, minuti] = testo.split(':').map(Number);
  return ore * 60 + minuti;
}
function intervallo(fascia) {
  const inizio = minuti(fascia[0]);
  let fine = minuti(fascia[1]);
  if (fine <= inizio) fine += 1440;
  return [inizio, fine];
}
export function statoApertura(giorni, data = new Date()) {
  const {giorno, min} = adessoATorino(data);
  const ieri = giorni[(giorno + 6) % 7];
  if (ieri) {
    const [, fine] = intervallo(ieri);
    if (fine > 1440 && min < fine - 1440) return {aperto:true, fino:ieri[1]};
  }
  const oggi = giorni[giorno];
  if (oggi) {
    const [inizio, fine] = intervallo(oggi);
    if (min >= inizio && min < fine) return {aperto:true, fino:oggi[1]};
    if (min < inizio) return {aperto:false, quando:'oggi', da:oggi[0]};
  }
  for (let distanza = 1; distanza <= 7; distanza++) {
    const prossimo = (giorno + distanza) % 7;
    if (giorni[prossimo]) return {aperto:false, quando:distanza === 1 ? 'domani' : GIORNI[prossimo], da:giorni[prossimo][0]};
  }
  return null;
}
