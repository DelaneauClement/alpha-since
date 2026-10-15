// Inscription au « conseil du dimanche » (15 octobre 2026) : un formulaire e-mail sous « Prochain article »
// sur /conseils et à la fin de chaque article, envoyé à /api/inscription (liste Brevo).
const die=m=>{console.error('NEWSLETTER',m);process.exit(1)};
const form=(dark,src)=>'<form class="a-news'+(dark?' a-news-d':'')+'" data-news="'+src+'" novalidate>'+
 '<p class="a-news-t">Reçois le conseil du dimanche par e-mail</p>'+
 '<div class="a-news-row"><input type="email" name="email" inputmode="email" autocomplete="email" placeholder="Ton e-mail" aria-label="Ton e-mail" required>'+
 '<button class="a-btn a-btn-y" type="submit">Je m’inscris</button></div>'+
 '<input type="text" name="site" tabindex="-1" autocomplete="off" aria-hidden="true" class="a-news-hp">'+
 '<p class="a-news-s">Un e-mail par semaine, le dimanche soir. Désinscription à tout moment. <a href="/legal#confidentialite">Confidentialité</a></p>'+
 '<p class="a-news-ok" role="status" hidden></p></form>';
const CSS='\n.a-news{margin:28px 0 0;padding:22px;border-radius:18px;background:#fff;border:1px solid var(--sand,#C9C49A);color:var(--ink,#12110C)}'+
 '.a-news-d{background:transparent;border-color:rgba(228,225,184,.35);color:var(--cream,#E4E1B8)}'+
 '.a-news-t{margin:0 0 12px;font-weight:700;font-size:19px}'+
 '.a-news-row{display:flex;flex-wrap:wrap;gap:10px}'+
 '.a-news-row input{flex:1 1 220px;min-width:0;min-height:56px;padding:0 18px;border-radius:999px;border:2px solid currentColor;background:transparent;color:inherit;font:inherit;font-size:17px}'+
 '.a-news-row input::placeholder{color:inherit;opacity:.6}'+
 '.a-news-row .a-btn{flex:0 0 auto}'+
 '.a-news-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}'+
 '.a-news-s{margin:10px 0 0;font-size:14px;opacity:.8}.a-news-s a{color:inherit}'+
 '.a-news-ok{margin:10px 0 0;font-weight:700}'+
 '@media (max-width:480px){.a-news-row .a-btn{width:100%}}\n';
const JS='\n(function(){document.addEventListener("submit",function(e){var f=e.target;if(!f.matches||!f.matches("[data-news]"))return;e.preventDefault();'+
 'var i=f.querySelector("input[name=email]"),hp=f.querySelector("input[name=site]"),bt=f.querySelector("button"),ok=f.querySelector(".a-news-ok"),v=(i.value||"").trim();'+
 'var say=function(t){ok.hidden=false;ok.textContent=t};'+
 'if(!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(v)){say("Indique un e-mail valide.");i.focus();return}'+
 'if(bt.disabled)return;bt.disabled=true;var lab=bt.textContent;bt.textContent="Envoi…";'+
 'var fail=function(){bt.disabled=false;bt.textContent=lab;say("L’inscription n’a pas fonctionné. Réessaie dans un instant, ou écris-nous à alphasince.contact@gmail.com.")};'+
 'fetch("/api/inscription",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({email:v,site:hp?hp.value:"",source:f.getAttribute("data-news")})})'+
 '.then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(r.ok&&j.ok){bt.textContent="Inscrit ✓";i.value="";say("C’est noté ! Un e-mail de bienvenue arrive dans ta boîte (pense à regarder aussi dans l’onglet Promotions ou les indésirables).")}else fail()})},fail)})})();\n';
module.exports=function(T){
 let C=T['Conseils.html'];if(typeof C!=='string')die('Conseils.html absent');
 const m=C.match(/<p class="a-next">[^<]*<\/p>/);
 if(m)C=C.replace(m[0],m[0]+'\n'+form(true,'conseils'));
 else{const a='<p class="a-lead">S’entraîner, récupérer, reprendre après une pause. Un nouvel article chaque dimanche à 20 h.</p>';if(C.split(a).length!==2)die('en-tête Conseils');C=C.replace(a,a+'\n'+form(true,'conseils'))}
 T['Conseils.html']=C;
 let n=0;
 for(const k of Object.keys(T)){
  if(!/^conseils\/[^/]+\.html$/.test(k)||typeof T[k]!=='string')continue;
  const s=T[k],i=s.indexOf('</article>');if(i<0)die('article sans </article> : '+k);
  const j=s.lastIndexOf('</div>',i);if(j<0)die('article sans </div> : '+k);
  T[k]=s.slice(0,j)+form(false,k.slice(9,-5))+'\n'+s.slice(j);n++;
 }
 if(!n)die('aucun article trouvé');
 T['site.css']+=CSS;
 let L=T['Legal.html'];const li='<li><b>Contact</b> : les messages échangés avec toi, pour y répondre.</li>';
 if(L.split(li).length!==2)die('Legal : ligne Contact');
 T['Legal.html']=L.replace(li,li+'<li><b>Conseil du dimanche</b> : ton e-mail (et ton prénom si tu l’as donné avec ton bilan), pour t’envoyer nos conseils, au plus une fois par semaine, via Brevo. Base : ton consentement. Durée : jusqu’à ta désinscription, possible à tout moment depuis chaque e-mail ou en nous écrivant.</li>');
 T['news.js']=JS.trim()+'\n';
 const tag='<script src="/news.js" defer></script>\n</body>';
 for(const k of Object.keys(T)){if(typeof T[k]==='string'&&k.endsWith('.html')&&T[k].includes('data-news="')){if(T[k].split('</body>').length!==2)die('</body> : '+k);T[k]=T[k].replace('</body>',tag)}}
 console.log('NEWSLETTER ok formulaire sur /conseils et',n,'articles');
};
