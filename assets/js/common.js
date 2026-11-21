/* Comportamentos compartilhados entre as páginas. */
(function () {
  "use strict";

  /* Ano atual no rodapé */
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  /* Revela os blocos ao rolar a página */
  var itens = document.querySelectorAll(".rev");
  if (!("IntersectionObserver" in window)) {
    itens.forEach(function (el) { el.classList.add("on"); });
    return;
  }
  var io = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("on");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  itens.forEach(function (el) { io.observe(el); });
})();
