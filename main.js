window.onload = function () {
  const envelope = document.querySelector(".envelope");
  let count = 0;

  function envelopeOpen() {
    if (count < 1) {
      gsap.fromTo(
        ".heart",
        { rotationX: 180, y: 0, opacity: 1 },
        { duration: 1, y: 100, opacity: 0, rotationX: 0 }
      );
      gsap.fromTo(
        ".envelope-top",
        { rotationX: 180 },
        { duration: 1, rotationX: 0 }
      );
      gsap.fromTo(
        ".envelope-top",
        { zIndex: 3 },
        { zIndex: 1, duration: 1, delay: 0.5 }
      );
      gsap.fromTo(".letter", { y: 0 }, { y: " -30vh", duration: 1, delay: 1 });
      gsap.fromTo(
        ".letter",
        { zIndex: 2 },
        { zIndex: 4, duration: 1, delay: 2 }
      );
      gsap.to(".envelope-top", {
        opacity: 0,
        delay: 2.5,
      });
      gsap.to(".letter", {
        y: "-15vh",
        width: "90vw",
        height: "60vh",
        duration: 1,
        delay: 2.5,
      });
      gsap.to(".letter-content", {
        opacity: 1,
        delay: 2.8,
      });

      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width < 350 || height < 350) {
        gsap.fromTo(
          ".heading",
          { fontSize: "0.8em" },
          {
            fontSize: "1em",
            ease: Sine.easeOut,
            autoRound: false,
            duration: 1,
            delay: 2.5,
          }
        );
        gsap.fromTo(
          ".bride-and-groom",
          { fontSize: "0.7em" },
          {
            fontSize: "1em",
            ease: Sine.easeOut,
            autoRound: false,
            duration: 1,
            delay: 2.5,
          }
        );

        gsap.fromTo(
          ".letter-content",
          { fontSize: "0.3em" },
          {
            fontSize: "0.6em",
            ease: Sine.easeOut,
            autoRound: false,
            duration: 1,
            delay: 2.5,
          }
        );
      } else {
        gsap.fromTo(
          ".heading",
          { fontSize: "0.8em" },
          {
            fontSize: "1.5em",
            ease: Sine.easeOut,
            autoRound: false,
            duration: 1,
            delay: 2.5,
          }
        );
        gsap.fromTo(
          ".bride-and-groom",
          { fontSize: "0.7em" },
          {
            fontSize: "1.5em",
            ease: Sine.easeOut,
            autoRound: false,
            duration: 1,
            delay: 2.5,
          }
        );

        gsap.fromTo(
          ".letter-content",
          { fontSize: "0.3em" },
          {
            fontSize: "1em",
            ease: Sine.easeOut,
            autoRound: false,
            duration: 1,
            delay: 2.5,
          }
        );
      }

      gsap.to(".mask", {
        opacity: 1,
        delay: 2.2,
      });
      gsap.to(".mask", { y: "150%", duration: 1.5, delay: 3.5 });
    }
  }

  envelope.addEventListener("mouseenter", () => {
    envelopeOpen();
    count += 1;
  });

  function flyIn() {
    const leftSide = document.querySelector(".l");
    const rightSide = document.querySelector(".r");
    leftSide.classList.remove("hidden");
    rightSide.classList.remove("hidden");
    gsap.fromTo(
      ".l",
      { x: -100, scale: 0, y: -120, rotation: 180 },
      { x: 0, scale: 1, y: 0, duration: 2, rotation: 0 }
    );
    gsap.fromTo(
      ".r",
      { x: 1000, scale: 0.5, y: 1200, rotation: 100 },
      { x: 0, scale: 1, duration: 2, y: 0, rotation: 0 }
    );
  }
  function fadeOut() {
    gsap.fromTo(
      ".l",
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0, duration: 1.5 }
    );
    gsap.fromTo(
      ".r",
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0, duration: 1.5 }
    );
  }
  function fadeIn() {
    gsap.fromTo(
      ".carousel-container",
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 1.5 }
    );
  }
  function hideEnvelope() {
    const envelope = document.querySelector(".envelope");
    envelope.style.opacity = 0;
  }
  function showEnvelope() {
    const envelope = document.querySelector(".envelope");
    envelope.style.opacity = 1;
  }

  const photoButton = document.querySelector("#photo");
  const carouselContainer = document.querySelector(".carousel-container");
  const hideCaourselButton = document.querySelector(".close-icon");
  photoButton.addEventListener("click", () => {
    flyIn();
    hideEnvelope();
    setTimeout(() => {
      //fadeOut();

      fadeIn();
    }, 3000);
    setTimeout(() => {
      const leftSide = document.querySelector(".l");
      const rightSide = document.querySelector(".r");
      leftSide.setAttribute("style", "");
      rightSide.setAttribute("style", "");
      leftSide.classList.add("hidden");
      rightSide.classList.add("hidden");
    }, 3500);
    setTimeout(() => {
      carouselContainer.classList.remove("hidden");
    }, 3500);
  });
  hideCaourselButton.addEventListener("click", () => {
    carouselContainer.classList.add("hidden");
    showEnvelope();
  });
  const dialog = document.querySelector("#rsvp-form");
  const rsvpButton = document.querySelector("#rsvp-button");
  const submitButton = document.querySelector("#submit");
  const letter = document.querySelector(".letter");
  // rsvpButton.addEventListener("click", () => {
  //   letter.style.opacity = 0;
  // });

  // "Close" button closes the dialog
  const closeModalButton = document.querySelector(".btn-close");
  closeModalButton.addEventListener("click", () => (letter.style.opacity = 1));
  // submitButton.addEventListener("click", () => {
  //   dialog.hide();
  //   // letter.style.opacity = 1;
  // });

  const carousel = document.querySelector(".carousel");
  for (let i = 0; i < 31; i++) {
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

  //////////////////////////////////////////////

  const modal = document.querySelector(".modal");

  const submitFormButton = document.querySelector("#submit");
  submitFormButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (
      !document.querySelector("#firstname").value ||
      !document.querySelector("#lastname").value ||
      !document.querySelector("#email").value ||
      !document.querySelector('input[name="attendance"]:checked').value ||
      document.querySelector("#plus-one").value.length > 1
    ) {
      alert("Please complete the form!");
      // return;
    } else {
      /*   console.log(firstName.value, lastName.value); */
      count += 1;
      const yesNo = document.querySelector(
        'input[name="attendance"]:checked'
      ).value;

      submitFormButton.setAttribute("data-bs-dismiss", "modal");

      const guest = {
        firstname: document.querySelector("#firstname").value,
        lastname: document.querySelector("#lastname").value,
        email: document.querySelector("#email").value,
        attendance: document.querySelector('input[name="attendance"]:checked')
          .value,
        plusone: document.querySelector("#plus-one").value,
      };
      post(guest);
    }
  });
};

async function post(data) {
  fetch("http://127.0.0.1:5000/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log("Request complete! response:", res);
      alert("Form submitted successfully. Thank you.");
      submitButton.click((e) => e.preventDefault());
    })
    .catch(function (err) {
      console.log("Post error", err);
    });
}
