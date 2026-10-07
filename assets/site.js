(function(){
  var b=document.querySelector('.burger'),m=document.getElementById('menu');
  if(!b||!m)return;
  b.addEventListener('click',function(){
    var o=m.classList.toggle('aperto');
    b.setAttribute('aria-expanded',o);
    b.setAttribute('aria-label',o?'Chiudi il menu':'Apri il menu');
  });
  m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('aperto');b.setAttribute('aria-expanded','false');}});
})();
