let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;
onPageLoad();

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; i++) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`;
  }
}

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += " dark-theme";
    localStorage.setItem("dark-theme", true);
  } else {
    document.body.classList.remove("dark-theme");
    localStorage.clear();
  }
}

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";
  emailjs
    .sendForm(
      "service_cbf58to",
      "template_jq378rc",
      event.target,
      "user_kIMIfbJhdf4ZjlDLVDNqv"
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please contact me directly on email@email.com"
      );
    });
}

function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  // toggle modal
  document.body.classList += " modal--open";
}

window.scroll({ top: 0, behavior: "smooth" });

function onPageLoad() {
  if (localStorage.getItem("dark-theme")) {
    contrastToggle = localStorage.getItem("dark-theme");
    document.body.classList += " dark-theme";
  } else {
    document.body.classList.remove("dark-theme");
  }
}