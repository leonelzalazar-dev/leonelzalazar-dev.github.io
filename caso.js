// Pestañas y comparador antes/después de las páginas de caso de estudio
(function(){
  document.querySelectorAll('.cmp').forEach(function(cmp){
    var tabs=[].slice.call(cmp.querySelectorAll('[role=tab]')), panels=[].slice.call(cmp.querySelectorAll('.cmp-panel'));
    function show(i){ tabs.forEach(function(t,j){ t.setAttribute('aria-selected',j===i); t.tabIndex=j===i?0:-1; panels[j].hidden=j!==i; }); }
    tabs.forEach(function(t,i){
      t.addEventListener('click',function(){ show(i); });
      t.addEventListener('keydown',function(e){ var n=e.key==='ArrowRight'?i+1:e.key==='ArrowLeft'?i-1:null; if(n===null)return; n=(n+tabs.length)%tabs.length; show(n); tabs[n].focus(); e.preventDefault(); });
    });
    // las capturas de pestañas ocultas se bajan apenas el mouse o el dedo se acercan
    var tl=cmp.querySelector('.tabs');
    if(tl) ['pointerenter','focusin','touchstart'].forEach(function(ev){ tl.addEventListener(ev,function(){ cmp.querySelectorAll('img[loading=lazy]').forEach(function(im){ im.loading='eager'; }); },{once:true,passive:true}); });
    cmp.querySelectorAll('.stage').forEach(function(st){
      var r=st.querySelector('input');
      if(r) r.addEventListener('input',function(){ st.style.setProperty('--pos', r.value+'%'); });
    });
  });
})();
