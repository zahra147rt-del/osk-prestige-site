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
