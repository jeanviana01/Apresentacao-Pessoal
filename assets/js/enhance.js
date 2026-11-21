/* Marca a página como "com JavaScript" antes da pintura, para as animações de entrada.
   Fica em arquivo próprio para funcionar com a política de segurança (CSP) sem scripts inline. */
document.documentElement.classList.add("js");
