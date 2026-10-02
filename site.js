const PHONE_DISPLAY = "(937) 408-2497";
const PHONE_TEL = "+19374082497";
const EMAIL = "jason@macdoorsllc.com";
const path = location.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "");
const isHome = path === "" || path.endsWith("/MacDoorsLLC");
const brandName = isHome ? "Mac Doors LLC" : "Mac Doors";

if (!document.querySelector("link[rel='icon']")) {
  const icon = document.createElement("link");
  icon.rel = "icon";
  icon.type = "image/svg+xml";
  icon.href = "favicon.svg";
  document.head.appendChild(icon);
}

if (!isHome) document.title = document.title.replace("Mac Doors LLC", "Mac Doors");
document.querySelectorAll(".brand span").forEach((el) => {
  el.textContent = isHome ? "LLC \u00b7 Columbus and surrounding areas" : "Columbus and surrounding areas";
});

const markCss = document.createElement("style");
markCss.textContent = `
.brand img { display: none; }
.door-mark { width: 42px; height: 42px; display: grid; align-content: center; gap: 4px; flex: none; overflow: hidden; }
.door-mark i { display: block; height: 5px; border-radius: 1px; background: #1c2b4a; animation: door-cycle 7.5s ease-in-out infinite; }
.door-mark i:nth-child(3) { background: #b08d57; }
.door-mark i:nth-child(4) { animation-delay: 0s; }
.door-mark i:nth-child(3) { animation-delay: .28s; }
.door-mark i:nth-child(2) { animation-delay: .56s; }
.door-mark i:nth-child(1) { animation-delay: .84s; }
@keyframes door-cycle {
  0%, 12% { transform: translateY(0); opacity: 1; }
  38%, 62% { transform: translateY(-18px); opacity: 0; }
  88%, 100% { transform: translateY(0); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .door-mark i { animation: none; }
}
`;
document.head.appendChild(markCss);

document.querySelectorAll(".brand").forEach((brand) => {
  if (brand.querySelector(".door-mark")) return;
  const mark = document.createElement("span");
  mark.className = "door-mark";
  mark.setAttribute("aria-hidden", "true");
  mark.innerHTML = "<i></i><i></i><i></i><i></i>";
  const img = brand.querySelector("img");
  if (img) img.replaceWith(mark);
  else brand.prepend(mark);
});

document.querySelectorAll("[data-phone]").forEach((el) => {
  el.textContent = PHONE_DISPLAY;
  if (el.tagName === "A") el.href = "tel:" + PHONE_TEL;
});
document.querySelectorAll("[data-email]").forEach((el) => {
  el.textContent = EMAIL;
  if (el.tagName === "A") el.href = "mailto:" + EMAIL;
});

const menu = document.querySelector(".menu-btn");
const links = document.querySelector(".links");
if (menu && links) {
  menu.addEventListener("click", () => links.classList.toggle("open"));
}

const foot = document.querySelector("footer .foot");
if (foot) {
  foot.innerHTML = [
    "<div><strong>" + brandName + "</strong><p>" + PHONE_DISPLAY + " \u00b7 Columbus and surrounding areas.</p></div>",
    '<div><a href="index.html">Home</a><br><a href="doors.html">New doors</a><br><a href="repair.html">Repair</a><br><a href="services.html">Services</a></div>',
    '<div><a href="about.html">About</a><br><a href="contact.html">Contact</a><br><a data-phone href="tel:' + PHONE_TEL + '">Call</a><br><a data-email href="mailto:' + EMAIL + '">Email</a></div>'
  ].join("");
  foot.querySelectorAll("[data-phone]").forEach((el) => {
    el.textContent = PHONE_DISPLAY;
    el.href = "tel:" + PHONE_TEL;
  });
  foot.querySelectorAll("[data-email]").forEach((el) => {
    el.textContent = EMAIL;
    el.href = "mailto:" + EMAIL;
  });
}

const form = document.querySelector("#quote");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const body = [
      "Mac Doors quote request",
      "Name: " + data.get("name"),
      "Phone: " + data.get("phone"),
      "Email: " + data.get("email"),
      "City: " + data.get("city"),
      "Need: " + data.get("need"),
      "Details: " + data.get("details")
    ].join("\n");
    const subject = encodeURIComponent("Quote request from macdoors.org");
    window.location.href = "mailto:" + EMAIL + "?subject=" + subject + "&body=" + encodeURIComponent(body);
    const status = document.querySelector("#form-status");
    if (status) status.textContent = "Your email app should open with this request. If it does not, call " + PHONE_DISPLAY + ".";
  });
}
