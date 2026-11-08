import test from 'node:test';
import assert from 'node:assert/strict';
import {adessoATorino, statoApertura} from '../js/orari.mjs';
const giorni = {0:null,1:null,2:['17:00','24:00'],3:['17:00','24:00'],4:['17:00','24:00'],5:['17:00','24:00'],6:['17:00','24:00']};
const stato = data => statoApertura(giorni, new Date(data));

test('venerdì: un minuto prima, all’apertura e prima di mezzanotte', () => {
  assert.deepEqual(stato('2026-11-06T15:59:00Z'), {aperto:false,quando:'oggi',da:'17:00'});
  assert.deepEqual(stato('2026-11-06T16:00:00Z'), {aperto:true,fino:'24:00'});
  assert.equal(stato('2026-11-06T22:59:00Z').aperto, true);
});
test('sabato a mezzanotte chiude; domenica e lunedì indicano martedì', () => {
  assert.deepEqual(stato('2026-11-07T23:00:00Z'), {aperto:false,quando:'martedì',da:'17:00'});
  assert.deepEqual(stato('2026-11-08T12:00:00Z'), {aperto:false,quando:'martedì',da:'17:00'});
  assert.deepEqual(stato('2026-11-09T12:00:00Z'), {aperto:false,quando:'domani',da:'17:00'});
});
test('il fuso di Torino viene applicato anche con l’ora legale', () => {
  assert.deepEqual(adessoATorino(new Date('2026-07-10T15:00:00Z')), {giorno:5,min:1020});
  assert.equal(stato('2026-07-10T14:59:00Z').aperto, false);
  assert.equal(stato('2026-07-10T15:00:00Z').aperto, true);
});
test('una futura fascia oltre mezzanotte resta aperta dalla sera prima', () => {
  const notturni = {...giorni,6:['22:00','02:00']};
  assert.deepEqual(statoApertura(notturni, new Date('2026-11-08T00:59:00Z')), {aperto:true,fino:'02:00'});
  assert.equal(statoApertura(notturni, new Date('2026-11-08T01:00:00Z')).aperto, false);
});
test('cambio ora legale durante una fascia notturna', () => {
  const notturni = {...giorni,6:['22:00','04:00']};
  assert.equal(statoApertura(notturni, new Date('2026-03-29T00:30:00Z')).aperto, true);
  assert.equal(statoApertura(notturni, new Date('2026-03-29T01:30:00Z')).aperto, true);
  assert.equal(statoApertura(notturni, new Date('2026-03-29T02:00:00Z')).aperto, false);
});
test('tutti i giorni chiusi: nessuna apertura inventata', () => {
  assert.equal(statoApertura({}, new Date('2026-11-08T12:00:00Z')), null);
});
