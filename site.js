const PHONE_DISPLAY = "(937) 408-2497";
const PHONE_TEL = "+19374082497";
const EMAIL = "jason@macdoorsllc.com";

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
    '<div><strong>Mac Doors LLC</strong><p>' + PHONE_DISPLAY + ' · Columbus and surrounding areas.</p></div>',
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
