/* Mobile nav — hamburger toggle (≤860px). Desktop is unaffected. */
(function () {
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("navlinks");
  if (!nav || !toggle || !links) return;

  function setOpen(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("open"));
  });

  // Close after picking a destination.
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });

  // Close on Escape.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset state if the viewport grows back to desktop.
  const mq = window.matchMedia("(min-width: 861px)");
  mq.addEventListener("change", function (e) {
    if (e.matches) setOpen(false);
  });
})();
