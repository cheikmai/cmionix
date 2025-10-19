// ======================================================
// CMIONIX CONTACT FORM (EmailJS + Glow + Spinner + Fade + Slide + Lock)
// ======================================================

emailjs.init("YOUR_PUBLIC_KEY"); // replace later

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  const sendButton = contactForm.querySelector("button[type='submit']");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const alertBox = this.querySelector(".form-alert");

    const name = this.user_name.value.trim();
    const email = this.user_email.value.trim();
    const message = this.message.value.trim();

    if (!name || !email || !message) {
      showAlert(alertBox, "⚠️ Please fill in all fields.", "#ff4f4f");
      return;
    }

    sendButton.disabled = true;
    sendButton.classList.add("disabled");
    showAlert(alertBox, "Sending...", "#00e0ff", true);

    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this).then(
      () => {
        showAlert(alertBox, "✅ Message sent successfully!", "#00e0ff");
        this.reset();
        restoreButton(sendButton);
      },
      (error) => {
        console.error("EmailJS error:", error);
        showAlert(alertBox, "❌ Error sending message. Please try again.", "#ff4f4f");
        restoreButton(sendButton);
      }
    );
  });
}

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
