/* ============================================================
   Contact form — lead capture via Web3Forms (https://web3forms.com)
   Static, no backend. Submissions are emailed to the owner.

   SETUP: paste your Web3Forms access key below. Get one free at
   https://web3forms.com — enter the destination email, confirm it,
   and copy the access key into ACCESS_KEY.
   ============================================================ */

const ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

(function () {
  const form = document.getElementById("contact-form");
  const confirm = document.getElementById("form-confirm");
  const errorEl = document.getElementById("form-error");
  const btn = document.getElementById("send-btn");
  if (!form) return;

  const nameEl = document.getElementById("f-name");
  const emailEl = document.getElementById("f-email");
  const msgEl = document.getElementById("f-message");

  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  function showError(text) {
    errorEl.textContent = text;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    showError("");

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = msgEl.value.trim();

    if (!name || !email || !message) {
      showError("Please fill in your name, email, and a message.");
      return;
    }
    if (!emailOk(email)) {
      showError("That email address doesn't look right.");
      return;
    }
    if (ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
      showError("The form isn't configured yet. Reach me on LinkedIn in the meantime.");
      return;
    }

    btn.disabled = true;
    const originalLabel = btn.textContent;
    btn.textContent = "Sending…";

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "Portfolio inquiry" + (name ? ": " + name : ""),
          from_name: name,
          name: name,
          email: email,
          message: message,
          botcheck: form.botcheck ? form.botcheck.checked : false,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        form.hidden = true;
        confirm.hidden = false;
        confirm.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        showError("Something went wrong sending that. Please try again, or reach me on LinkedIn.");
        btn.disabled = false;
        btn.textContent = originalLabel;
      }
    } catch (err) {
      showError("Couldn't reach the network. Please try again, or reach me on LinkedIn.");
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  });
})();
