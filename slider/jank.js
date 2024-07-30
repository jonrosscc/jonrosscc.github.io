// The point of this file is to
//  1. Introduce artifical jank at some cadence, and
//  2. Provide controls for this jank.
// We will assume that we are janking every frame, so we'll have a single
// slider for how much we jank.
(function(scope) {
  "use strict"

  // On the range [0,1].
  let sliderValue = 0.0;
  let active = false;
  const MAX_DELAY_MS = 100.0;
  const MAX_PULSE_DELAY = 32.0;
  const PULSE_DURATION = 256;
  const timestamps = [];
  const NUM_BARS = 150;
  const NUM_CARDS = 50;

  function delay() {
    const start = Date.now();
    let pulseDelay = 0;
    if (active) {
      // [0, 511]
      pulseDelay = start % (PULSE_DURATION * 2);
      // [-255, 255]
      pulseDelay -= PULSE_DURATION;
      if (pulseDelay < 0) {
        pulseDelay = 0;
      } else {
        // [-127, 127]
        pulseDelay -= PULSE_DURATION / 2;
        // [0, 127]
        pulseDelay = Math.abs(pulseDelay);
        // [0.0, 1.0]
        pulseDelay /= 0.5 * PULSE_DURATION;
        pulseDelay = (1.0 - pulseDelay) * MAX_PULSE_DELAY;
      }
    }
    let duration = Math.max(pulseDelay, sliderValue * MAX_DELAY_MS);
    while (Date.now() - start < duration) {}
    window.requestAnimationFrame(delay);
  }

  function constructFpsMeter() {
    const meter = document.createElement("DIV");
    meter.id = "fps-meter";
    meter.style = "display:flex;flex-direction:row;align-items:flex-end;height:100vh;position:fixed;top:0";
    for (var i = 0; i < NUM_BARS; i++) {
      const bar = document.createElement("DIV");
      bar.classList.add("fps-bar");
      bar.id = `fps-bar-${i}`;
      meter.appendChild(bar);
    }
    document.body.appendChild(meter);

    // TODO make button to toggle the meter on and off (after checking that
    // this is needed, of course).
  }

  function constructCards() {
    for (var i = 0; i < NUM_CARDS; i++) {
      const card = document.createElement("DIV");
      card.style = "width:100px;height:100px;margin:10px;background:green";
      card.classList.add("card");
      document.body.appendChild(card);
    }
  }

  function presentTimestamps() {
    let spew = '';
    for (var i = 0; i < timestamps.length - 1; i++) {
      const bar = document.getElementById(`fps-bar-${i}`);
      const height = timestamps[i+1] - timestamps[i];
      bar.style = `width:2px;height:${height}px;background:orange`;
    }
  }

  let tick = () => {
    timestamps.push(Date.now());
    if (timestamps.length > NUM_BARS) {
      timestamps.shift();
    }
    presentTimestamps();
    window.requestAnimationFrame(tick);
  };

  function handleScroll() {
    if (!active) {
      let target = document.querySelector("IFRAME");
      if (target) {
        target.contentWindow.postMessage("scroll", "*");
      } else {
        window.parent.postMessage("scroll", "*");
      }
      active = true;
    }
  }

  function handleMessage() {
    active = false;
  }

  function init() {
    constructCards();
    const pre = document.createElement('pre');
    pre.style = "position:fixed;left:0;top:0px;z-index:2";
    document.body.appendChild(pre);
    const slider = document.createElement('input');
    slider.type = "range";
    slider.style = "position:fixed;top:90%;left:20%;width:60%;z-index:2";
    document.body.appendChild(slider);
    slider.value = sliderValue;
    slider.oninput = (e) => {
      sliderValue = e.target.value / 100.0;
      pre.innerText = `${sliderValue * 100}%`;
    };
    onmessage = handleMessage;
    document.scrollingElement.onscroll = handleScroll;
    delay();
    constructFpsMeter();
    tick();
  }

  window.onload = init;
})(self);
