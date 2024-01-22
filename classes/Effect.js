import { audioCtx } from "../main";

const Effect = {
  gain(gain) {
    const gainNode = new GainNode(audioCtx, {
      gain: gain,
    });

    if (this.lastEffect) this.lastEffect.connect(gainNode);
    this.lastEffect = gainNode;
    return this;
  },
};
export default Effect;
