function getRangeBetweenMinaAndMax(min, max) {
  return min + Math.random() * (max - min);
}

const path = [
  { x: 70, y: "-45vh" },
  { x: 30, y: "-40vh" },
  { x: 0, y: "-30vh" },
  { x: -70, y: "-20vh" },
  { x: -30, y: "-10vh" },
  { x: -10, y: "-5vh" },
  { x: 0, y: 0 },
];
function twirl(element, motionPath) {
  gsap.fromTo(
    element,
    {
      y: "-60vh",
      x: 0,
      rotationZ: getRangeBetweenMinaAndMax(0, 360),
      rotationX: getRangeBetweenMinaAndMax(0, 360),
      rotationY: getRangeBetweenMinaAndMax(0, 360),
    },
    {
      ease: "ease.in",
      motionPath: {
        path: motionPath,

        //autoRotate: true,
        //alignOrigin: [0.5, 0.5],
      },
      rotationZ: 0,
      rotationX: 0,
      rotationY: 0,
      duration: 2,
    }
  );
}
function bounce(element) {
  gsap.from(element, {
    y: "-60vh",
    x: 100,
    ease: "elastic",
    duration: 2,
  });
}
//bounce(envelope);

window.onload = function () {
  //document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(MotionPathPlugin);
  //});
  const body = document.querySelector("body");
  //const background = document.querySelector(".background");
  const width = window.innerWidth;
  const height = window.innerHeight;
  let parameters;
  if (window.innerHeight < window.innerWidth) {
    parameters = {
      y: 30,
      width: width * 0.6,
      height: width * 0.6 * 1.5,
    };
    // } else if (width < 350 || height < 350) {
    //   parameters = {
    //     y: 25,

    //     width: width * 0.9,
    //     height: width * 0.9 * 1.5,
    //   };
  } else {
    parameters = {
      y: 25,

      width: width * 0.9,
      height: width * 0.9 * 1.5,
    };
  }
  body.style.backgroundImage = `url("/assets/images/background.jpg")`;

  body.style.backgroundSize = "350%";

  const envelope = document.querySelector(".envelope");
  const envelopeWithoutLetter = document.querySelectorAll(".env");
  console.log(envelopeWithoutLetter);
  twirl(envelope, path);

  let count = 0;

  function envelopeOpen() {
    const envelopeOpenTimeLine = gsap.timeline();

    if (count < 1) {
      envelopeOpenTimeLine.to(".heart", {
        duration: 0.5,
        y: 100,
        opacity: 0,
        rotationX: 180,
      });
      envelopeOpenTimeLine.to(".envelope-top", {
        duration: 0.5,
        rotationX: 0,
      });
      envelopeOpenTimeLine.to(".envelope-top", { zIndex: 1 });

      envelopeOpenTimeLine.to(".letter-wrapper", {
        y: `-${parameters.y}vh`,
        duration: 0.5,
      });

      // envelopeWithoutLetter.forEach((item) => {
      //   gsap.to(item, { y: `${parameters.y}vh`, duration: 0.5 });
      // });

      envelopeOpenTimeLine.to(".letter-wrapper", { zIndex: 4, duration: 0.5 });

      envelopeOpenTimeLine.to(".letter-wrapper", {
        width: parameters.width,
        height: parameters.height,
        duration: 0.5,
      });

      if (window.innerWidth > window.innerHeight) {
        // envelopeOpenTimeLine.to(".letter-wrapper", {
        //   overflowY: "scroll",
        // });
        envelopeOpenTimeLine.to(".letter-content", {
          top: parameters.height,
          display: "flex",
        });
      } else {
        envelopeOpenTimeLine.to(".letter-content", {
          top: parameters.height + 50,
          display: "flex",
        });
      }
      envelopeOpenTimeLine.to(".rotate", { opacity: 1 });
      envelopeOpenTimeLine.to(".rotate", {
        rotationY: 360,
        duration: 3,
        yoyo: true,
        repeat: 6,
      });
    }
  }

  envelope.addEventListener("mouseenter", () => {
    envelopeOpen();
    count += 1;
  });
  const rotateButton = document.querySelector(".rotate");
  gsap.set(".letter-wrapper", { perspective: 800 });
  gsap.set(".letter", { transformStyle: "preserve-3d" });
  gsap.set("#letter-front", {
    backfaceVisibility: "hidden",
  });
  gsap.set("#letter-back", {
    backfaceVisibility: "hidden",
  });
  gsap.set("#letter-back", { rotationY: -180 });
  let angle = 0;
  rotateButton.addEventListener("click", showBack);

  function showBack() {
    gsap.fromTo(
      ".letter",
      {
        rotationY: angle,
        duration: 1,
        ease: "Back.ease",
      },
      { rotationY: angle + 180, duration: 1, ease: "Back.ease" }
    );
    angle -= 180;
  }

  function flyIn() {
    const rotateButton = document.querySelector(".rotate");
    rotateButton.style.display = "none";
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
  const hideCarouselButton = document.querySelector(".close-icon");
  function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  photoButton.addEventListener("click", () => {
    scrollToTop();
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
  hideCarouselButton.addEventListener("click", () => {
    carouselContainer.classList.add("hidden");
    const rotateButton = document.querySelector(".rotate");
    rotateButton.style.display = "block";
    showEnvelope();
  });
  const dialog = document.querySelector("#rsvp-form");

  const rsvpButton = document.querySelector("#rsvp-button");
  const submitButton = document.querySelector("#submit-button");
  const letter = document.querySelector(".letter-wrapper");
  // rsvpButton.addEventListener("click", () => {
  //   letter.style.opacity = 0;
  // });

  // "Close" button closes the dialog
  // rsvpButton.addEventListener("click", () => {
  //   window.open("./redirect.html");
  // });
  const closeModalButton = document.querySelector(".btn-close");
  closeModalButton.addEventListener("click", () => {
    letter.style.opacity = 1;
  });
  // submitButton.addEventListener("click", () => {
  //   dialog.hide();
  //   // letter.style.opacity = 1;
  // });

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

  //////////////////////////////////////////////

  //const modal = document.querySelector(".modal");

  const submitFormButton = document.querySelector("#submit-button");

  submitFormButton.addEventListener("click", () => {
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

      // submitFormButton.setAttribute("data-bs-dismiss", "modal");

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
  var resizeTimeout;
  window.addEventListener("resize", function (event) {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      // window.location.reload();
    }, 500);
  });
};

async function post(data) {
  fetch("http://horaceandradi.choretracker.se/weddingbackend/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log("Request complete! response:", res);
      get();
    })
    .catch((err) => {
      console.log("Post error", err);
      alert("Opps! Something went wrong. Apologies. Please try again later");
    });
}
async function get() {
  fetch("http://horaceandradi.choretracker.se/weddingbackend/sendMail", {
    method: "GET",
  })
    .then((res) => {
      console.log("Email send successfully! response:", res);
      window.location = "/redirect.html";
    })
    .catch(function (err) {
      console.log("Email send failed error", err);
    });
}

// function updateDiv() {
//   $(".envelope").load(window.location.href + " .envelope");
//   $(".letter-content").load(window.location.href + " .letter-content");
//   if ($(".carousel-container").length) {
//     $(".carousel-container").load(
//       window.location.href + " .carousel-container"
//     );
//   }
//   if ($(".current-slide").length) {
//     $(".current-slide").load(window.location.href + " .current-slide");
//   }
// }
