"use strict";

(() => {
  function positionImage() {
    let image = document.querySelector(".faq-background");
    let top = image.getBoundingClientRect().top;
    image.style.marginTop = `${200 - top}px`;
  }

  addEventListener("DOMContentLoaded", () => {
    positionImage();
    addEventListener("resize", positionImage, false, false);
    addEventListener("scroll", positionImage, false, false);
  });
})();
