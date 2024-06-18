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
  const submitFormButton = document.querySelector("#submit-button");
  const body = document.querySelector("body");
  const envelope = document.querySelector(".envelope");
  const envelopeWithoutLetter = document.querySelectorAll(".env");
  const rotateButton = document.querySelector(".rotate");
  const letter = document.querySelector(".letter");
  const dialog = document.querySelector("#rsvp-form");
  const rsvpButton = document.querySelector("#rsvp-button");
  const submitButton = document.querySelector("#submit-button");
  const letterWrapper = document.querySelector(".letter-wrapper");
  const buttons = document.querySelector(".letter-content");
  const photoButton = document.querySelector("#photo");
  const carousel = document.querySelector(".carousel");
  const carouselContainer = document.querySelector(".carousel-container");
  const hideCarouselButton = document.querySelector(".close-icon");
  const attribution = document.querySelector(".attribution");
  const leftSide = document.querySelector(".l");
  const rightSide = document.querySelector(".r");
  const closeModalButton = document.querySelector(".btn-close");
  const previousButton = document.querySelector("#left");
  const nextButton = document.querySelector("#right");
  const windowSize = { width: window.innerWidth, height: window.innerHeight };

  gsap.registerPlugin(MotionPathPlugin);

  let parameters;
  if (window.innerHeight < window.innerWidth) {
    parameters = {
      y: 30,
      width: windowSize.width * 0.6,
      height: windowSize.width * 0.6 * 1.5,
    };
  } else {
    parameters = {
      y: 25,

      width: windowSize.width * 0.9,
      height: windowSize.width * 0.9 * 1.5,
    };
  }
  body.style.backgroundImage = `url("/assets/images/background.jpg")`;
  body.style.backgroundSize = "350%";

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

      envelopeOpenTimeLine.to(letterWrapper, {
        y: `-${parameters.y}vh`,
        duration: 0.5,
      });
      envelopeOpenTimeLine.to(letterWrapper, { zIndex: 4, duration: 0.5 });

      envelopeOpenTimeLine.to(letterWrapper, {
        width: parameters.width,
        height: parameters.height,
        duration: 0.5,
      });

      envelopeOpenTimeLine.to(buttons, {
        top: parameters.height,
        display: "flex",
      });

      envelopeOpenTimeLine.to(rotateButton, { opacity: 1 });
      envelopeOpenTimeLine.to(
        rotateButton,

        {
          scale: 1.3,
          duration: 1,
          yoyo: true,
          repeat: 6,
        }
      );
    }
  }

  envelope.addEventListener("mouseenter", () => {
    envelopeOpen();
    count += 1;
  });

  gsap.set(letterWrapper, { perspective: 800 });
  gsap.set(letter, { transformStyle: "preserve-3d" });
  gsap.set("#letter-front", {
    backfaceVisibility: "hidden",
  });
  gsap.set("#letter-back", {
    backfaceVisibility: "hidden",
  });
  gsap.set("#letter-back", { rotationY: -180 });
  let angle = 0;

  rotateButton.addEventListener("click", showBack);
  letter.addEventListener("click", showBack);

  function showBack() {
    gsap.fromTo(
      letter,
      {
        rotationY: angle,
        duration: 1,
        ease: "Back.ease",
      },
      { rotationY: angle + 180, duration: 1, ease: "Back.ease" }
    );
    angle -= 180;
  }
  function hide(ele) {
    ele.classList.add("hidden");
  }
  function show(ele) {
    ele.classList.remove("hidden");
  }
  function allDescendants(node, func) {
    func(node);
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      func(child);
      allDescendants(child, func);
    }
  }

  function flyIn() {
    hide(rotateButton);
    show(leftSide);
    show(rightSide);

    gsap.fromTo(
      leftSide,
      { x: -100, scale: 0, y: -120, rotation: 180 },
      { x: 0, scale: 1, y: 0, duration: 2, rotation: 0 }
    );
    gsap.fromTo(
      rightSide,
      { x: 1000, scale: 0.5, y: 1200, rotation: 100 },
      { x: 0, scale: 1, duration: 2, y: 0, rotation: 0 }
    );
  }
  function fadeOut() {
    gsap.fromTo(
      leftSide,
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0, duration: 1.5 }
    );
    gsap.fromTo(
      rightSide,
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0, duration: 1.5 }
    );
  }
  function fadeIn() {
    gsap.fromTo(
      carouselContainer,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1.5 }
    );
  }

  function scrollToTop() {
    const html = document.querySelector("html");
    html.scrollTo({ top: 0, behavior: "smooth" });
  }
  photoButton.addEventListener("click", () => {
    scrollToTop();
    flyIn();
    allDescendants(envelope, hide);
    allDescendants(buttons, hide);
    hide(attribution);
    setTimeout(() => {
      //fadeOut();
      fadeIn();
      body.style.overflow = "hidden";
    }, 3000);
    setTimeout(() => {
      leftSide.setAttribute("style", "");
      rightSide.setAttribute("style", "");
      hide(leftSide);
      hide(rightSide);
    }, 3500);
    setTimeout(() => {
      show(carouselContainer);
    }, 3500);
  });
  hideCarouselButton.addEventListener("click", () => {
    hide(carouselContainer);
    show(rotateButton);
    allDescendants(envelope, show);
    allDescendants(buttons, show);
    show(attribution);
    body.style.overflow = "auto";
  });

  closeModalButton.addEventListener("click", () => {
    letterWrapper.style.opacity = 1;
  });

  for (let i = 0; i < 7; i++) {
    const img_li = document.createElement("li");
    const img = document.createElement("img");

    img.src = `./assets/images/${i}.jpeg`;
    img_li.appendChild(img);
    carousel.appendChild(img_li);
  }
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

  let touchstartX = 0;
  let touchendX = 0;

  function swipe() {
    const currentSlide = carousel.querySelector(".current-slide");
    let targetSlide;
    const id = currentSlide.getAttribute("id");
    if (touchendX > touchstartX) {
      if (id != 0) {
        targetSlide = currentSlide.previousElementSibling;
      } else {
        targetSlide = slides[slides.length - 1];
      }
    }
    if (touchendX < touchstartX) {
      if (id != slides.length - 1) {
        targetSlide = currentSlide.nextElementSibling;
      } else {
        targetSlide = slides[0];
      }
    }
    moveSlide(carousel, currentSlide, targetSlide);
  }

  document.addEventListener("touchstart", (e) => {
    touchstartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    swipe();
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

  submitFormButton.addEventListener("click", () => {
    const radios = document.getElementsByTagName("input");
    let allChecked;
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].type === "radio" && radios[i].checked) {
        allChecked = true;
      } else {
        allChecked = false;
      }
      console.log(radios[i].checked);
    }
    if (
      document.querySelector("#firstname").value &&
      document.querySelector("#lastname").value &&
      document.querySelector("#email").value &&
      allChecked == true

      //document.querySelector("#plus-one").value.length > 1
    ) {
      count += 1;

      const guest = {
        firstname: document.querySelector("#firstname").value,
        lastname: document.querySelector("#lastname").value,
        email: document.querySelector("#email").value,
        attendance: document.querySelector('input[name="attendance"]:checked')
          .value,
        plusone: document.querySelector('input[name="plusone"]:checked').value,
        babychair: document.querySelector('input[name="babychair"]:checked')
          .value,
        //plusone: document.querySelector("#plus-one").value,
      };

      post(guest);

      // return;
    } else {
      alert("Please complete the form!");
    }
  });
  // var resizeTimeout;
  // window.addEventListener("resize", function (event) {
  //   clearTimeout(resizeTimeout);
  //   resizeTimeout = setTimeout(function () {
  //     // window.location.reload();
  //     windowSize.width = window.innerWidth;
  //     windowSize.height = window.innerHeight;
  //   }, 500);
  // });
};

async function post(data) {
  fetch("http://horaceandradi.choretracker.se/weddingbackend/post", {
    //fetch("http://localhost:7000/post", {
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
    //fetch("http://localhost:7000/sendMail", {
    method: "GET",
  })
    .then((res) => {
      console.log("Email send successfully! response:", res);
      setTimeout(() => {
        window.location = "/redirect.html";
      }, 500);
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
