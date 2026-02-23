// ======================================================
// CMIONIX CONTACT FORM (EmailJS + Glow + Spinner + Fade + Slide + Lock)
// ======================================================

(() => {
  if (!window.emailjs) return;

  window.emailjs.init("YOUR_PUBLIC_KEY"); // replace later

  const contactForm =
    document.getElementById("contact-form") ||
    document.querySelector("form.contact-form");
  if (!contactForm) return;

  const sendButton = contactForm.querySelector("button[type='submit']");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const alertBox = this.querySelector(".form-alert");

    const nameField =
      this.querySelector('[name="user_name"]') ||
      this.querySelector('[name="name"]');
    const emailField =
      this.querySelector('[name="user_email"]') ||
      this.querySelector('[name="email"]');
    const messageField = this.querySelector('[name="message"]');

    const name = (nameField?.value || "").trim();
    const email = (emailField?.value || "").trim();
    const message = (messageField?.value || "").trim();

    if (!name || !email || !message) {
      showAlert(alertBox, "⚠️ Please fill in all fields.", "#ff4f4f");
      return;
    }

    if (sendButton) {
      sendButton.disabled = true;
      sendButton.classList.add("disabled");
    }
    showAlert(alertBox, "Sending...", "#00e0ff", true);

    window.emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this).then(
      () => {
        showAlert(alertBox, "✅ Message sent successfully!", "#00e0ff");
        this.reset();
        if (sendButton) restoreButton(sendButton);
      },
      (error) => {
        console.error("EmailJS error:", error);
        showAlert(alertBox, "❌ Error sending message. Please try again.", "#ff4f4f");
        if (sendButton) restoreButton(sendButton);
      }
    );
  });
})();

function showAlert(element, text, color, showSpinner = false) {
  element.innerHTML = "";
  if (showSpinner) {
    const spinner = document.createElement("span");
    spinner.className = "cmionix-spinner";
    element.appendChild(spinner);
    element.appendChild(document.createTextNode(" " + text));
  } else {
    element.textContent = text;
  }
  element.style.color = color;
  element.style.opacity = 1;
  element.style.transform = "translateY(0)";
  element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  element.style.textShadow =
    color === "#00e0ff"
      ? "0 0 15px rgba(0,224,255,0.7)"
      : "0 0 10px rgba(255,79,79,0.6)";

  clearTimeout(element.fadeTimer);
  element.fadeTimer = setTimeout(() => {
    element.style.opacity = 0;
    element.style.transform = "translateY(-10px)";
  }, 6000);
}

function restoreButton(button) {
  setTimeout(() => {
    button.disabled = false;
    button.classList.remove("disabled");
  }, 1200);
}
