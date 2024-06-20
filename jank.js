// The point of this file is to
//  1. Introduce artifical jank at some cadence, and
//  2. Provide controls for this jank.
// We will assume that we are janking every frame, so we'll have a single
// slider for how much we jank.
(function(scope) {
  "use strict"

  // On the range [0,1].
  let sliderValue = 0.0;
  const MAX_DELAY_MS = 100.0;

  function delay() {
    const start = Date.now();
    while (Date.now() - start < MAX_DELAY_MS * sliderValue) {}
    window.requestAnimationFrame(delay);
  }

  function init() {
    const pre = document.createElement('pre');
    pre.style = "position:fixed;left:0;top:0px;z-index:2";
    document.body.appendChild(pre);
    const slider = document.createElement('input');
    slider.type = "range";
    slider.style = "position:fixed;top:0;z-index:2";
    document.body.appendChild(slider);
    slider.value = sliderValue;
    slider.oninput = (e) => {
      sliderValue = e.target.value / 100.0;
      pre.innerText = `${sliderValue * 100}%`;
    };
    delay();
  }

  init();
})(self);
