(function(){
  var d=document,w=window;
  var reduce=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* menu da telefono */
  var b=d.querySelector('.burger'),m=d.getElementById('menu');
  if(b&&m){
    b.addEventListener('click',function(){
      var o=m.classList.toggle('aperto');
      b.setAttribute('aria-expanded',o);
      b.setAttribute('aria-label',o?'Chiudi il menu':'Apri il menu');
    });
    m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('aperto');b.setAttribute('aria-expanded','false');}});
  }
  /* header compatto + barra di avanzamento + parallasse hero */
  var head=d.querySelector('.site-top'),bar=d.querySelector('.progress'),hero=d.querySelector('.hero:not(.piccolo)'),tick=false;
  function onScroll(){
    var y=w.pageYOffset||d.documentElement.scrollTop;
    if(head)head.classList.toggle('compatto',y>40);
    if(bar){var h=d.documentElement.scrollHeight-w.innerHeight;bar.style.transform='scaleX('+(h>0?Math.min(y/h,1):0)+')';}
    if(hero&&!reduce&&w.innerWidth>760&&y<w.innerHeight){hero.style.backgroundPosition='center calc(68% + '+(y*0.18)+'px)';}
    tick=false;
  }
  w.addEventListener('scroll',function(){if(!tick){tick=true;w.requestAnimationFrame(onScroll);}},{passive:true});
  onScroll();
  if(reduce||/noanim/.test(location.search)||!('IntersectionObserver' in w)){d.documentElement.classList.remove('js');return;}
  /* comparsa allo scroll */
  var sel='.sez .wrap>.eyebrow,.sez .wrap>h2,.sez .wrap>.intro,.sez .wrap>.testo,.sez .wrap>.lista,.sez .wrap>.tw,.sez .wrap>.ctas,.card,.passi li,.perche li,.split-t>div,.split-i,.gal img,details,.modulo,.lato,.faq-g>div:first-child,.band .wrap>*,.stats .wrap>div,.due-col>div';
  var els=[].slice.call(d.querySelectorAll(sel));
  els.forEach(function(el){
    if(el.closest('.hero'))return;
    el.classList.add('rv');
    var sib=el.parentNode?[].slice.call(el.parentNode.children).filter(function(c){return c.classList.contains('rv')||els.indexOf(c)>-1;}):[];
    var i=Math.max(0,sib.indexOf(el));
    el.style.transitionDelay=Math.min(i,5)*70+'ms';
  });
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);if(e.target.matches('.stats .wrap>div'))count(e.target);}
    });
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  d.querySelectorAll('.rv').forEach(function(el){io.observe(el);});
  /* contatori */
  function count(box){
    var s=box.querySelector('[data-count]');if(!s)return;
    var to=+s.getAttribute('data-count'),t0=null,dur=1100;
    function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/dur,1),e=1-Math.pow(1-p,3);s.textContent=Math.round(to*e);if(p<1)w.requestAnimationFrame(step);}
    s.textContent='0';w.requestAnimationFrame(step);
  }
})();
