import { audioCtx } from "../audioMain";

const Effect = {
  gain(gain) {
    const gainNode = new GainNode(audioCtx, {
      gain: gain,
    });
    this._putEffect(gainNode);

    return this;
  },

  filter(frecuency, type = "lowpass") {
    const filterNode = new BiquadFilterNode(audioCtx, {
      frequency: frecuency,
      type: type,
    });
    this._putEffect(filterNode);

    return this;
  },

  pan(pan) {
    const panNode = new StereoPannerNode(audioCtx, {
      pan: pan,
    });
    this._putEffect(panNode);

    return this;
  },

  _putEffect(effect) {
    if (!this.effectChain.length) this.gainNode.connect(effect);
    else this.effectChain.at(-1).connect(effect);
    this.effectChain.push(effect);
  },
};
export default Effect;
