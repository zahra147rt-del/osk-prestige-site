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

  // Clé d'accès gratuite à créer sur https://web3forms.com (elle est envoyée par e-mail).
  // Tant qu'elle n'est pas renseignée, le formulaire ouvre la messagerie du visiteur.
  var KEY = "199c130a-5714-46b6-8320-d2bce378edb9";

  var MAIL = "osk.prestige@hotmail.com";
  var TEL = "06 99 53 60 22";
  var statut = document.getElementById("devis-statut");
  var btn = f.querySelector("button[type=submit]");

  function dire(texte, ok) {
    statut.textContent = texte;
    statut.className = "statut " + (ok ? "ok" : "ko");
  }
  function v(id) { return document.getElementById(id).value.trim(); }

  f.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!v("nom") || !v("tel")) {
      dire("Merci d’indiquer votre nom et votre téléphone.", false);
      (v("nom") ? document.getElementById("tel") : document.getElementById("nom")).focus();
      return;
    }
    if (v("email") && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v("email"))) {
      dire("L’adresse e-mail semble incorrecte.", false);
      document.getElementById("email").focus();
      return;
    }
    if (f.botcheck && f.botcheck.checked) return;

    if (KEY === "VOTRE_CLE_WEB3FORMS") {
      var corps = "Nom : " + v("nom") + "\nTéléphone : " + v("tel") + "\nE-mail : " + v("email") +
                  "\nBesoin : " + v("besoin") + "\n\n" + v("msg");
      window.location.href = "mailto:" + MAIL + "?subject=" +
        encodeURIComponent("Demande de devis – " + v("besoin")) + "&body=" + encodeURIComponent(corps);
      return;
    }

    btn.disabled = true;
    dire("Envoi en cours…", true);
    var data = {
      access_key: KEY,
      subject: "Demande de devis – " + v("besoin"),
      from_name: "Site O.S.K Prestige",
      name: v("nom"),
      phone: v("tel"),
      besoin: v("besoin"),
      message: v("msg") || "(aucun message)",
      botcheck: ""
    };
    if (v("email")) data.email = v("email");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!j || !j.success) throw new Error("echec");
        f.reset();
        dire("Merci, votre demande a bien été envoyée. Nous vous répondons rapidement.", true);
      })
      .catch(function () {
        dire("L’envoi a échoué. Appelez-nous au " + TEL + " ou écrivez à " + MAIL + ".", false);
      })
      .then(function () { btn.disabled = false; });
  });
})();
