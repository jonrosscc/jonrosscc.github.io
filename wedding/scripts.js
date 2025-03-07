'use strict';

function imageClick(element) {
  // Get the modal
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = element.src;
  captionText.innerHTML = element.title;
};

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
};

document.addEventListener('keydown', (event) => {
    if (event.key === "Escape" || event.key === "Backspace" || event.key === "Delete") {
       closeModal();
   }
});