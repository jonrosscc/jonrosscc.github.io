'use strict';

function imageClick(element) {
  // Get the modal
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = element.src;
  captionText.innerHTML = element.title;

  console.log(element.title);
};

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
};