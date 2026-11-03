(function () {
  var b = document.querySelector(".burger"), m = document.getElementById("menu");
  if (!b || !m) return;
  function set(open) {
    m.classList.toggle("open", open);
    b.setAttribute("aria-expanded", open ? "true" : "false");
    b.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  }
  b.addEventListener("click", function () { set(!m.classList.contains("open")); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
})();
(function () {
  var f = document.getElementById("devis");
  if (!f) return;
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = function (id) { return document.getElementById(id).value.trim(); };
    if (!v("nom") || !v("tel")) {
      (v("nom") ? document.getElementById("tel") : document.getElementById("nom")).focus();
      return;
    }
    var corps = "Nom : " + v("nom") + "\nTéléphone : " + v("tel") + "\nBesoin : " + v("besoin") + "\n\n" + v("msg");
    window.location.href = "mailto:osk.prestige@hotmail.com?subject=" + encodeURIComponent("Demande de devis – " + v("besoin")) + "&body=" + encodeURIComponent(corps);
  });
})();
