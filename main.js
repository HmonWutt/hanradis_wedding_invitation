window.onload = function () {
  function flyIn() {
    const leftSide = document.querySelector(".l");
    const rightSide = document.querySelector(".r");
    leftSide.classList.remove("hidden");
    rightSide.classList.remove("hidden");
    gsap.fromTo(
      ".l",
      { x: -1000, scale: 0, y: -1200, rotation: 180 },
      { x: 0, scale: 1, y: 0, duration: 3, rotation: 0 }
    );
    gsap.fromTo(
      ".r",
      { x: 1000, scale: 0.5, y: 1200, rotation: 100 },
      { x: 0, scale: 1, duration: 3, y: 0, rotation: 0 }
    );
  }

  const photoButton = document.querySelector("#photo");
  const carouselContainer = document.querySelector(".carousel-container");
  const hideCaourselButton = document.querySelector("#close");
  photoButton.addEventListener("click", () => {
    flyIn();
    setTimeout(() => {
      setTimeout(() => {
        const leftSide = document.querySelector(".l");
        const rightSide = document.querySelector(".r");
        leftSide.classList.add("hidden");
        rightSide.classList.add("hidden");
      }, 2000);

      carouselContainer.classList.remove("hidden");
    }, 3000);
  });
  hideCaourselButton.addEventListener("click", () =>
    carouselContainer.classList.add("hidden")
  );
  const dialog = document.querySelector("#rsvp-form");
  const rsvpButton = document.querySelector("#rsvp-button");
  const submitButton = document.querySelector("#submit");
  // rsvpButton.addEventListener("click", () => {
  //   dialog.show();
  // });

  // "Close" button closes the dialog
  submitButton.addEventListener("click", () => {
    dialog.hide();
  });

  const carousel = document.querySelector(".carousel");
  for (let i = 0; i < 8; i++) {
    const img_li = document.createElement("li");
    const img = document.createElement("img");

    img.src = `./assets/images/${i}.jpeg`;
    img_li.appendChild(img);
    carousel.appendChild(img_li);
  }

  const previousButton = document.querySelector("#left");
  const nextButton = document.querySelector("#right");

  function setSlidePoisition(slide, index) {
    slides[index].style.left = 100 * index + "vw";
    slides[index].classList.add("slide");
    slides[index].setAttribute("id", index);
    if (index == 0) {
      slides[index].classList.add("current-slide");
    }
  }

  const slides = Array.from(carousel.children);
  slides.forEach(setSlidePoisition);

  const moveSlide = (carousel, currentSlide, targetSlide) => {
    carousel.style.transform = "translateX(-" + targetSlide.style.left + ")";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
  };

  nextButton.addEventListener("click", () => {
    const currentSlide = carousel.querySelector(".current-slide");
    let targetSlide;
    const id = currentSlide.getAttribute("id");
    if (id != slides.length - 1) {
      targetSlide = currentSlide.nextElementSibling;
    } else {
      targetSlide = slides[0];
    }
    moveSlide(carousel, currentSlide, targetSlide);
  });

  previousButton.addEventListener("click", () => {
    const currentSlide = carousel.querySelector(".current-slide");
    let targetSlide;
    const id = currentSlide.getAttribute("id");
    if (id != 0) {
      targetSlide = currentSlide.previousElementSibling;
    } else {
      targetSlide = slides[slides.length - 1];
    }
    moveSlide(carousel, currentSlide, targetSlide);
  });
};
