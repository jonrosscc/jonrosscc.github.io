(function(scope) {
  "use strict"

  const timestamps = [];
  const NUM_BARS = 150;

  function constructFpsMeter() {
    const meter = document.getElementById("fps-meter");
    for (var i = 0; i < NUM_BARS; i++) {
      const bar = document.createElement("DIV");
      bar.classList.add("fps-bar");
      bar.id = `fps-bar-${i}`;
      meter.appendChild(bar);
    }
  }

  function presentTimestamps() {
    let spew = '';
    for (var i = 0; i < timestamps.length - 1; i++) {
      const bar = document.getElementById(`fps-bar-${i}`);
      const height = timestamps[i+1] - timestamps[i];
      bar.style = `width:2px;height:${height}px`;
    }
  }

  let tick = () => {
    timestamps.push(Date.now());
    if (timestamps.length > NUM_BARS) {
      timestamps.shift();
    }
    presentTimestamps();
    // TODO delay.
    window.requestAnimationFrame(tick);
  };

  constructFpsMeter();
  tick();

})(self);
