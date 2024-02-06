import { useEffect, useRef } from "react";
import { audioAnalyzer, firstBeat } from "../scripts/audioMain";

function BackVisuals() {
  const canvasRef = useRef();
  const animationRef = useRef();

  function audioSpectre() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const divisions = audioAnalyzer.frequencyBinCount;
    const dataArray = new Uint8Array(divisions);
    audioAnalyzer.getByteTimeDomainData(dataArray);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const lineDivision = canvas.width / divisions;
    let beat = firstBeat;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "#080808";

    (function draw() {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      audioAnalyzer.getByteTimeDomainData(dataArray);

      let lastPointX = 0;
      let lastPointY = dataArray[0] * 2.5;

      ctx.beginPath();
      for (let i = 0; i < divisions; i++) {
        ctx.moveTo(lastPointX, lastPointY);
        lastPointX = (lineDivision * i + lineDivision * (i + 1)) / 2;
        lastPointY = dataArray[i] * 2.5;
        ctx.lineTo(lastPointX, lastPointY);
      }
      if (beat !== firstBeat) {
        if (firstBeat === 0) ctx.lineWidth = 100;
        else ctx.lineWidth = 10;
        beat = firstBeat;
      } else ctx.lineWidth = 1;

      ctx.closePath();
      ctx.stroke();
      animationRef.current = requestAnimationFrame(draw);
    })();
  }

  useEffect(() => {
    audioSpectre();
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <canvas className="absolute -z-20" id="background" ref={canvasRef}></canvas>
  );
}
export default BackVisuals;
