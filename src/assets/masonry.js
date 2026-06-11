"use strict";

(() => {
  let container;
  let images;

  const COLUMN_WIDTH = 373;

  function init() {
    container = document.querySelector(".gallery-images");
    if (!container) return;
    const imageLinks = Array.from(container.querySelectorAll("article"));
    imageLinks.forEach((link) => link.remove());
    images = imageLinks;
  }

  function addColumn(els) {
    const column = document.createElement("div");
    column.classList.add("column");
    els.forEach((el) => column.appendChild(el));
    container.appendChild(column);
  }

  function createMasonryLayout() {
    if (!container) return;
    container.classList.remove("hidden");

    const containerWidth = container.offsetWidth;
    const isMobile = window.innerWidth < 400;

    container.innerHTML = "";

    if (isMobile) {
      addColumn(images);
    } else {
      // masonry layout for larger screens
      const columnCount = Math.floor(containerWidth / COLUMN_WIDTH);
      const columns = Array.from({ length: columnCount }, () => []);

      images.forEach((image, index) => {
        columns[index % columnCount].push(image);
      });

      columns.forEach((column) => {
        addColumn(column);
      });
    }
  }

  addEventListener("DOMContentLoaded", () => {
    init();
    createMasonryLayout();
    addEventListener("resize", createMasonryLayout, false, false);
  });
})();
