import { audioCtx } from "../main";

const Effect = {
  gain(gain) {
    const gainNode = new GainNode(audioCtx, {
      gain: gain,
    });
    this._putEffect(gainNode);

    return this;
  },

  filter(frecuency, type = "lowpass") {
    const filter = new BiquadFilterNode(audioCtx, {
      frequency: frecuency,
      type: type,
    });
    this._putEffect(filter);

    return this;
  },

  _putEffect(effect) {
    if (!this.effectChain.length) this.gainNode.connect(effect);
    else this.effectChain.at(-1).connect(effect);
    this.effectChain.push(effect);
  },
};
export default Effect;
