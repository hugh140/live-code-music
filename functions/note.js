function getNote(note, octave = 4) {
  const findNote = notes.find((elNote) => note.toUpperCase() === elNote.note);

  if (octave === 1) return findNote.frecuency;
  else return findNote.frecuency * (2 * octave);
}

export default getNote;

const notes = [
  { note: "C", frecuency: 32.7032 },
  { note: "C#", frecuency: 34.6478 },
  { note: "D", frecuency: 36.7081 },
  { note: "D#", frecuency: 38.8909 },
  { note: "E", frecuency: 41.2034 },
  { note: "F", frecuency: 43.6535 },
  { note: "F#", frecuency: 46.2493 },
  { note: "G", frecuency: 48.9994 },
  { note: "G#", frecuency: 51.9131 },
  { note: "A", frecuency: 55 },
  { note: "A#", frecuency: 58.2705 },
  { note: "B", frecuency: 61.7354 },
];
