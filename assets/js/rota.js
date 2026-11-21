(function(){
  var corpo=document.body;
  function rota(f){
    var h=typeof f==="string"?f:location.hash;
    var sobre=h==="#sobre-mim";
    var era=corpo.classList.contains("v-sobre");
    corpo.classList.toggle("v-sobre",sobre);
    if(sobre){
      document.title="Sobre mim | Jean Viana";
      window.scrollTo(0,0);
    }else{
      document.title="Carta de Apresentação | Jean Viana";
      if(era){
        var alvo=h.length>1?document.getElementById(h.slice(1)):null;
        if(alvo){alvo.scrollIntoView();}else{window.scrollTo(0,0);}
      }
    }
  }
  window.addEventListener("hashchange",rota);
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest('a[href^="#"]');
    if(!a)return;
    var h=a.getAttribute("href");
    if(h==="#sobre-mim"||corpo.classList.contains("v-sobre")){
      e.preventDefault();
      try{if(location.hash!==h)location.hash=h;}catch(_){}
      rota(h);
    }
  });
  rota();
})();
