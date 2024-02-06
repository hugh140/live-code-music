import Instrument from "./Instrument";
import { audioCtx, audioAnalyzer } from "../scripts/audioMain";
import getNote from "../scripts/getNote";
import shuffleArr from "../scripts/shuffleArr";

class Osc extends Instrument {
  static instances = [];

  constructor(type = "sine") {
    super();
    this.type = type;
    this.notes = [];
    this.chordSection = 0;
    this.playingNotes = [];
    this.isPlaying = false;
    this.changeNote = false;

    Osc.instances.push(this);
  }

  chord(notes, holdTime = 16) {
    this.notes.push({
      notes: notes.map((note) => getNote(note)),
      holdTime: holdTime,
    });
    return this;
  }

  arp(chord, times = 16, mode = "up", speed = 2) {
    switch (mode) {
      case "up":
        for (let i = 0; i < times; i++)
          this.notes.push({
            notes: [getNote(chord[i % chord.length])],
            holdTime: speed,
          });
        break;

      case "down":
        const reverseChord = chord.reverse();
        for (let i = 0; i < times; i++)
          this.notes.push({
            notes: [getNote(reverseChord[i % chord.length])],
            holdTime: speed,
          });
        break;

      case "updown":
        const upDownChord = [...chord].concat([...chord].reverse().slice(1));
        for (let i = 0; i < times; i++)
          this.notes.push({
            notes: [getNote(upDownChord[i % chord.length])],
            holdTime: speed,
          });
        break;

      case "downup":
        const downUpChord = [...chord].reverse().concat([...chord].slice(1));
        for (let i = 0; i < times; i++)
          this.notes.push({
            notes: [getNote(downUpChord[i % chord.length])],
            holdTime: speed,
          });
        break;

      case "random":
        const shuffleChord = shuffleArr(chord);
        for (let i = 0; i < times; i++)
          this.notes.push({
            notes: [getNote(shuffleChord[i % chord.length])],
            holdTime: speed,
          });
        break;
    }
    return this;
  }

  play() {
    if (this.notes[this.chordSection].holdTime - 1 <= this.beat) {
      this.beat = -1;
      this.changeNote = true;
    }

    if (this.changeNote && this.beat === 0) {
      this.playingNotes.forEach((note) => note.stop());
      this.playingNotes = [];
      this.isPlaying = false;
      this.changeNote = false;

      // this.beat = -1;
      this.chordSection++;
      if (this.chordSection > this.notes.length - 1) this.chordSection = 0;
    }

    if (this.isPlaying) {
      this.beat++;
      return;
    }

    if (!this.effectChain.length) this.gainNode.connect(audioAnalyzer);
    else this.effectChain.at(-1).connect(audioAnalyzer);
    audioAnalyzer.connect(audioCtx.destination);

    this.notes[this.chordSection].notes.forEach((note) => {
      const oscNote = new OscillatorNode(audioCtx, {
        type: this.type,
        frequency: note,
      });
      this.playingNotes.push(oscNote);
      this.isPlaying = true;

      oscNote.connect(this.gainNode);
      oscNote.start();
    });
    this.beat++;
  }

  static getAllInstances() {
    return Osc.instances;
  }
}

export default Osc;
