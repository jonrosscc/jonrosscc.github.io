(function(scope) {
  "use strict"

  const NUM_CARDS = 50;

  function init() {
    for (var i = 0; i < NUM_CARDS; i++) {
      const card = document.createElement("DIV");
      card.classList.add("card");
      document.body.appendChild(card);
    }
  }

  init();
})(self);
