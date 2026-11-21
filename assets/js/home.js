/* Página inicial: nome digitando e troca de fotos. */
(function () {
  "use strict";

  var FOTOS = ["assets/img/foto-perfil-1.jpg", "assets/img/foto-perfil-2.jpg"];
  var POSICOES = ["50% 25%", "50% 12%"];
  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };

  document.querySelectorAll("[data-abrir-projetos]").forEach(function (controle) {
    controle.addEventListener("click", function (evento) {
      evento.preventDefault();
      $("projetos-dialog").showModal();
    });
  });

  /* ---- Nome digitando (clique para repetir) ---- */
  var nome = $("nome");
  var partes = Array.prototype.slice.call(nome.querySelectorAll("b"));
  var linhas = partes.map(function (b) { return b.textContent; });
  var cursor = document.createElement("i");
  cursor.className = "caret";
  cursor.setAttribute("aria-hidden", "true");
  var ocupado = false;

  function digitar() {
    if (ocupado) return;
    ocupado = true;
    partes.forEach(function (b) { b.textContent = ""; });

    if (reduz) {
      partes.forEach(function (b, i) { b.textContent = linhas[i]; });
      partes[partes.length - 1].after(cursor);
      ocupado = false;
      return;
    }

    var l = 0, c = 0;
    (function passo() {
      partes[l].after(cursor);
      c++;
      partes[l].textContent = linhas[l].slice(0, c);
      if (c >= linhas[l].length) {
        l++; c = 0;
        if (l >= linhas.length) { ocupado = false; return; }
        setTimeout(passo, 300);
        return;
      }
      setTimeout(passo, 100);
    })();
  }
  nome.addEventListener("click", digitar);
  digitar();

  /* ---- Fotos: clique ou Enter troca ---- */
  var moldura = $("photo");
  var img = $("img");
  var pontos = $("dots");
  var atual = 0;

  pontos.innerHTML = FOTOS.map(function () { return "<i></i>"; }).join("");

  function mostrar(i, suave) {
    atual = (i + FOTOS.length) % FOTOS.length;
    Array.prototype.forEach.call(pontos.children, function (d, k) {
      d.classList.toggle("on", k === atual);
    });
    function trocar() {
      img.src = FOTOS[atual];
      img.style.objectPosition = POSICOES[atual] || "50% 20%";
      img.style.opacity = 1;
    }
    if (suave && !reduz) {
      img.style.opacity = 0;
      setTimeout(trocar, 220);
    } else {
      trocar();
    }
  }

  mostrar(0, false);
  moldura.addEventListener("click", function () { mostrar(atual + 1, true); });
  moldura.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      mostrar(atual + 1, true);
    }
  });
})();
