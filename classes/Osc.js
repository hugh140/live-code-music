import Instrument from "./Instrument";
import { audioCtx } from "../main";
import getNote from "../js/Note";
import shuffleArr from "../js/shuffleArr";

class Osc extends Instrument {
  constructor(type = "sine") {
    super();
    this.type = type;
    this.notes = [];
    this.chordSection = 0;
    this.playingNotes = [];
  }

  chord(notes, holdTime = 16) {
    this.notes.push({
      notes: notes.map((note) => getNote(note)),
      holdTime: holdTime,
    });
    return this;
  }

  arp(chord, speed = 4, mode = "up") {
    switch (mode) {
      case "up":
        chord.forEach((note) =>
          this.notes.push({ notes: [getNote(note)], holdTime: speed })
        );
        break;

      case "down":
        chord
          .reverse()
          .forEach((note) =>
            this.notes.push({ notes: [getNote(note)], holdTime: speed })
          );
        break;

      case "updown":
        chord.forEach((note) =>
          this.notes.push({ notes: [getNote(note)], holdTime: speed })
        );
        chord
          .reverse()
          .slice(1)
          .forEach((note) =>
            this.notes.push({ notes: [getNote(note)], holdTime: speed })
          );
        break;

      case "downup":
        chord.forEach((note) =>
          this.notes.push({ notes: [getNote(note)], holdTime: speed })
        );
        chord
          .reverse()
          .slice(1)
          .forEach((note) =>
            this.notes.push({ notes: [getNote(note)], holdTime: speed })
          );
        break;

      case "random":
        shuffleArr(chord).forEach((note) => {
          this.notes.push({ notes: [getNote(note)], holdTime: speed });
        });
        break;
    }
    console.log(this.notes);
    return this;
  }

  play() {
    if (this.beat) {
      if (this.notes[this.chordSection].holdTime - 1 < this.beat + 1) {
        this.playingNotes.forEach((note) => note.stop());
        this.playingNotes = [];

        this.beat = 0;
        this.chordSection++;
        if (this.chordSection > this.notes.length - 1) this.chordSection = 0;

        return;
      }

      this.beat++;
      return;
    }

    if (!this.effectChain.length) this.gainNode.connect(audioCtx.destination);
    else this.effectChain.at(-1).connect(audioCtx.destination);

    this.notes[this.chordSection].notes.forEach((note) => {
      const oscNote = new OscillatorNode(audioCtx, {
        type: this.type,
        frequency: note,
      });
      this.playingNotes.push(oscNote);

      oscNote.connect(this.gainNode);
      oscNote.start();
    });
    this.beat++;
  }
}

export default Osc;
