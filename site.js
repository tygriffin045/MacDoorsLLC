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
