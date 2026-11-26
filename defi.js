// Défi gainage 30 jours — séance guidée (25 novembre 2026). Page réservée aux acheteurs : adresse
// non listée (jeton ci-dessous, donné dans le PDF), absente du plan du site, « noindex ».
// Le visiteur choisit son niveau, ouvre le jour, et le chrono enchaîne les positions avec des bips.
// Les données (positions, semaines, paliers, pictogrammes) sont dans defi-data.js, partagé avec le PDF.
const D=require('./defi-data.js');
const JETON='g7q2xk9m';
const ADRESSE='/defi-gainage/'+JETON;
const FICHIER='defi-gainage-'+JETON+'.html';
const die=m=>{console.error('DEFI',m);process.exit(1)};

const CSS=`
:root{--ink:#12110C;--cream:#E4E1B8;--khaki:#807C3A;--olive:#4A4620;--sand:#C9C49A;--y:#F2E415}
*{box-sizing:border-box}html,body{margin:0;background:var(--cream);color:var(--ink);font:17px/1.45 'Roboto Condensed','Arial Narrow',system-ui,sans-serif}
button{font:inherit;cursor:pointer}a{color:inherit}
.top{background:var(--khaki);padding:10px 16px;display:flex;align-items:center;justify-content:space-between}
.top img{height:40px}.top b{font-size:13px;letter-spacing:.12em}
.wrap{max-width:560px;margin:0 auto;padding:18px 16px 60px}
h1,h2,.big{font-family:Anton,Impact,sans-serif;font-weight:400;text-transform:uppercase;line-height:1.05;margin:0}
h1{font-size:38px;margin:6px 0 6px}h2{font-size:24px;margin:26px 0 10px}
.lead{margin:0 0 14px}.muted{color:var(--olive);font-size:15px}
.seg{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.seg button,.btn{border:2px solid var(--ink);background:transparent;border-radius:14px;padding:10px 8px;text-align:left}
.seg button b{display:block;font-size:16px}.seg button span{font-size:12.5px;color:var(--olive)}
.seg button[aria-pressed=true]{background:var(--ink);color:var(--cream)}.seg button[aria-pressed=true] span{color:var(--sand)}
.days{display:grid;grid-template-columns:repeat(6,1fr);gap:6px}
.days button{border:1px solid var(--sand);background:#fff;border-radius:10px;padding:8px 4px 6px;min-height:58px;text-align:center}
.days button b{display:block;font-family:Anton,Impact,sans-serif;font-weight:400;font-size:19px}
.days button i{font-style:normal;font-size:10.5px;letter-spacing:.02em;color:var(--olive)}
.days .r{background:var(--sand);border-color:var(--sand)}.days .t{background:var(--y);border-color:var(--y)}
.days .ok{background:var(--ink);color:var(--y);border-color:var(--ink)}.days .ok i{color:var(--sand)}
.days .now{outline:3px solid var(--khaki);outline-offset:1px}
.btn-y{display:block;width:100%;border:0;background:var(--y);color:var(--ink);border-radius:999px;min-height:58px;font-weight:700;font-size:19px;margin:18px 0 8px}
.btn-o{display:block;width:100%;border:2px solid var(--ink);background:transparent;border-radius:999px;min-height:50px;font-weight:700;margin:8px 0}
.card{background:#fff;border:1px solid var(--sand);border-radius:16px;padding:12px 14px;margin:0 0 10px;display:grid;grid-template-columns:96px 1fr;gap:12px;align-items:center}
.card svg{width:96px;height:48px}.card b{display:block}.card span{font-size:14px;color:var(--olive)}
.new{display:inline-block;background:var(--y);font-size:11px;font-weight:700;letter-spacing:.06em;padding:1px 7px;border-radius:99px;margin-left:6px;vertical-align:2px}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0}
.stats div{background:var(--ink);color:var(--cream);border-radius:12px;padding:10px}.stats b{display:block;font-family:Anton,Impact,sans-serif;font-weight:400;font-size:24px;color:var(--y)}
.stats span{font-size:12.5px}
.box{background:var(--ink);color:var(--cream);border-radius:16px;padding:14px 16px;margin:12px 0}.box b{color:var(--y)}
.chk{display:flex;gap:10px;align-items:flex-start;margin:10px 0;font-size:15px}.chk input{width:22px;height:22px;accent-color:var(--ink);flex:none;margin-top:1px}
.back{background:none;border:0;padding:0;font-weight:700;margin:0 0 6px}
/* lecteur */
.pl{position:fixed;inset:0;background:var(--ink);color:var(--cream);display:flex;flex-direction:column;z-index:9}
.pl.rest{background:var(--olive)}.pl.warm{background:#2B2914}
.pl-top{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;font-size:14px;color:var(--sand)}
.pl-mid{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 18px}
.pl-kind{font-size:14px;letter-spacing:.16em;text-transform:uppercase;color:var(--sand)}
.pl-name{font-family:Anton,Impact,sans-serif;font-size:34px;line-height:1.05;text-transform:uppercase;margin:6px 0 4px}
.pl-time{font-family:Anton,Impact,sans-serif;font-size:min(34vw,170px);line-height:1;color:var(--y);font-variant-numeric:tabular-nums}
.pl svg{width:min(70vw,320px);height:auto;margin:6px 0}
.pl-rep{font-size:16px;max-width:460px;margin:4px 0 0}.pl-next{font-size:15px;color:var(--sand);margin-top:12px}
.pl-bar{height:6px;background:rgba(228,225,184,.2)}.pl-bar i{display:block;height:100%;background:var(--y);width:0}
.pl-ctl{display:grid;grid-template-columns:1fr 1.4fr 1fr;gap:10px;padding:14px 16px calc(14px + env(safe-area-inset-bottom))}
.pl-ctl button{border:2px solid var(--cream);background:transparent;color:var(--cream);border-radius:999px;min-height:54px;font-weight:700}
.pl-ctl .main{background:var(--y);border-color:var(--y);color:var(--ink)}
.tm{font-family:Anton,Impact,sans-serif;font-size:72px;color:var(--ink);text-align:center;font-variant-numeric:tabular-nums}
table{width:100%;border-collapse:collapse;font-size:15px}td,th{padding:7px 4px;border-bottom:1px solid var(--sand);text-align:left}
`;

function page(T){
 const tpl=T['Main.dc.html']||'';
 const data=JSON.stringify({P:D.P,POS:D.POS,SEMAINES:D.SEMAINES,PALIERS:D.PALIERS,NIVEAUX:D.NIVEAUX,TOURS:D.TOURS,ENTRE:D.ENTRE_TOURS,REPOS:D.REPOS_JOURS,MER:D.MISE_EN_ROUTE,CALME:D.RETOUR_CALME});
 return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="#12110C">
<title>Défi gainage 30 jours · Ta séance guidée | Alpha Since</title>
<link rel="icon" href="/img/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Roboto+Condensed:wght@400;500;700&display=swap" rel="stylesheet">
<style>${CSS}</style></head><body>
<header class="top"><a href="/" aria-label="Alpha Since"><img src="/img/logo.png" alt="Alpha Since 1982"></a><b>DÉFI GAINAGE</b></header>
<main class="wrap" id="app"><p>Chargement…</p></main>
<script>window.DEFI=${data};</script>
<script>${APP}</script>
</body></html>`;
}

// Application (navigateur). Écrite en ES5 pour les vieux téléphones.
const APP=String.raw`
(function(){
var D=window.DEFI,app=document.getElementById('app'),K='alpha.defi.gainage.v1';
var S={niv:0,faits:{},recul:{},test:{},facile:false};
try{var s=JSON.parse(localStorage.getItem(K));if(s)for(var k in s)S[k]=s[k]}catch(e){}
function save(){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function svg(k,light){var p=D.P[k];if(!p)return'';var ink=light?'#E4E1B8':'#12110C',fl=light?'rgba(228,225,184,.35)':'#C9C49A',ar=light?'#F2E415':'#807C3A';
 var s='<svg viewBox="0 0 200 100" aria-hidden="true"><line x1="0" y1="91" x2="200" y2="91" stroke="'+fl+'" stroke-width="2"/>';
 p.forEach(function(e){if(e.c)s+='<circle cx="'+e.c[0]+'" cy="'+e.c[1]+'" r="'+e.c[2]+'" fill="'+ink+'"/>';
  if(e.l){var pts=[];for(var i=0;i<e.l.length;i+=2)pts.push(e.l[i]+','+e.l[i+1]);s+='<polyline points="'+pts.join(' ')+'" fill="none" stroke="'+ink+'" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'}
  if(e.d){var x1=e.d[0],y1=e.d[1],x2=e.d[2],y2=e.d[3],a=Math.atan2(y2-y1,x2-x1);s+='<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+ar+'" stroke-width="2.5" stroke-dasharray="4 4"/><path d="M'+x2+' '+y2+'L'+(x2-9*Math.cos(a-.5))+' '+(y2-9*Math.sin(a-.5))+'L'+(x2-9*Math.cos(a+.5))+' '+(y2-9*Math.sin(a+.5))+'Z" fill="'+ar+'"/>'}});
 return s+'</svg>'}
function jour(d){if(d===29)return{type:'test',sem:4};if(d===30)return{type:'bilan',sem:4};
 if(D.REPOS.indexOf(d)>=0)return{type:'repos',sem:Math.min(4,Math.ceil(d/7))};return{type:'seance',sem:Math.min(4,Math.ceil(d/7)),test:d===1}}
function palier(sem){var p=sem-1+D.NIVEAUX[S.niv].d;for(var w=1;w<=sem;w++)if(S.recul[w])p--;return Math.max(0,Math.min(D.PALIERS.length-1,p))}
function duree(sem){var pa=D.PALIERS[palier(sem)],n=D.SEMAINES[sem-1].k.length,t=0;
 D.MER.forEach(function(m){t+=m[1]});D.CALME.forEach(function(m){t+=m[1]});t+=D.TOURS*(n*pa[0]+(n-1)*pa[1])+(D.TOURS-1)*D.ENTRE;return Math.round(t/60)}
function mmss(s){s=Math.max(0,Math.ceil(s));return Math.floor(s/60)+':'+('0'+s%60).slice(-2)}
function pause(){var t=0;for(var k in S.faits)if(S.faits[k]>t)t=S.faits[k];return t<1e12?0:Math.floor((Date.now()-t)/864e5)}
function suivant(){for(var d=1;d<=30;d++)if(!S.faits[d])return d;return 30}

/* ---------- accueil ---------- */
function home(){
 var n=suivant(),h='<h1>Défi gainage<br>30 jours</h1><p class="lead">Choisis ton niveau, ouvre ton jour, lance le chrono : il enchaîne les positions et les repos tout seul, avec un bip à chaque changement.</p>';
 var p=pause();
 if(p>=4&&!S.faits[30]){var x=p<=10?Math.max(1,(Math.ceil(n/7)-2)*7+1):1;
  h+='<div class="box"><b>Pause de '+p+' jours : pas de panique.</b><p>Tu as perdu un peu, tu ne repars pas de zéro. '+(p<=10?'Recule d’une semaine pour retrouver le rythme : reprends au jour '+x+'.':'Refais le test du jour 1 : il te donne ton nouveau niveau, souvent au-dessus du premier.')+'</p><button type="button" class="btn-y" data-reprise="'+x+'">Reprendre au jour '+x+'</button><p class="muted">Ou continue au jour '+n+' si tu te sens prêt.</p></div>'}
 h+='<h2>Ton niveau de départ</h2><p class="muted">Fais d’abord le test du jour 1 : ton temps en planche décide de ton niveau.</p><div class="seg">';
 D.NIVEAUX.forEach(function(v,i){h+='<button type="button" data-niv="'+i+'" aria-pressed="'+(S.niv===i)+'"><b>'+v.n+'</b><span>'+v.seuil+'</span></button>'});
 h+='</div><h2>Tes 30 jours</h2><div class="days">';
 for(var d=1;d<=30;d++){var j=jour(d),c=j.type==='repos'?'r':(j.type==='test'||d===1?'t':''),lab=j.type==='repos'?'Récup':j.type==='test'?'Test':j.type==='bilan'?'Bilan':'Palier '+(palier(j.sem)+1);
  if(S.faits[d])c='ok';h+='<button type="button" class="'+c+(d===n?' now':'')+'" data-jour="'+d+'"><b>'+(S.faits[d]?'✓':d)+'</b><i>'+lab+'</i></button>'}
 h+='</div><button type="button" class="btn-y" data-jour="'+n+'">Ouvrir le jour '+n+'</button>';
 h+='<label class="chk"><input type="checkbox" id="fac"'+(S.facile?' checked':'')+'> <span>Afficher les versions plus faciles pendant la séance</span></label>';
 h+='<p class="muted">Tes jours faits et tes résultats restent sur ce téléphone. Une gêne, une question : <a href="mailto:alphasince.contact@gmail.com">alphasince.contact@gmail.com</a></p>';
 app.innerHTML=h;window.scrollTo(0,0)}

/* ---------- un jour ---------- */
function day(d){
 var j=jour(d),h='<button type="button" class="back" data-home>← Mes 30 jours</button>';
 if(j.type==='repos'){h+='<h1>Jour '+d+' · Récupération</h1><p class="lead">Aujourd’hui, tu bouges sans gainer : 20 à 30 minutes de marche, de vélo ou de mobilité douce. Le muscle se renforce pendant la récupération : ce jour fait partie du défi.</p><button type="button" class="btn-y" data-fait="'+d+'">'+(S.faits[d]?'Fait ✓':'C’est fait')+'</button>';app.innerHTML=h;return}
 if(j.type==='test'||j.type==='bilan'){h+=testPage(d);app.innerHTML=h;return}
 var sem=D.SEMAINES[j.sem-1],pi=palier(j.sem),pa=D.PALIERS[pi];
 h+='<h1>Jour '+d+'</h1><p class="lead"><b>Semaine '+j.sem+' · '+esc(sem.t)+'</b></p>';
 if(j.test)h+='<div class="box"><b>Aujourd’hui, d’abord le test.</b> Fais-le avant la séance : il fixe ton niveau de départ.<button type="button" class="btn-o" style="border-color:#E4E1B8;color:#E4E1B8" data-test="1">Faire le test du jour 1</button></div>';
 h+='<div class="stats"><div><b>Palier '+(pi+1)+'</b><span>'+pa[0]+' s d’effort, '+pa[1]+' s de repos</span></div><div><b>'+D.TOURS+' tours</b><span>'+D.ENTRE+' s de pause entre</span></div><div><b>'+duree(j.sem)+' min</b><span>tout compris</span></div></div>';
 sem.k.forEach(function(k,i){var p=D.POS[k];h+='<div class="card">'+svg(p.p)+'<div><b>'+(i+1)+'. '+esc(p.n)+(sem.nv.indexOf(k)>=0?'<span class="new">NOUVEAU</span>':'')+'</b><span>'+esc(p.r)+'</span></div></div>'});
 h+='<button type="button" class="btn-y" data-go="'+d+'">Lancer la séance</button>';
 if(j.sem>1)h+='<label class="chk"><input type="checkbox" data-recul="'+j.sem+'"'+(S.recul[j.sem]?' checked':'')+'> <span>La semaine dernière, je n’ai pas tenu proprement tous les temps : je reste au palier précédent cette semaine.</span></label>';
 h+='<p class="muted">Avant de commencer : si tu es enceinte, si tu as accouché il y a moins de 6 mois, une hernie discale, une douleur de dos qui dure ou une opération récente, demande d’abord l’avis de ton médecin ou de ton kiné.</p>';
 app.innerHTML=h;window.scrollTo(0,0)}

/* ---------- test ---------- */
var TESTS=[['planche','Planche'],['lateraleD','Planche latérale droite'],['lateraleG','Planche latérale gauche']];
function testPage(d){var cle=d===1?'j1':'j29',h='<h1>'+(d===1?'Jour 1 · Ton test de départ':d===29?'Jour 29 · Ton test final':'Jour 30 · Ton bilan')+'</h1>';
 if(d===30){var a=S.test.j1||{},b=S.test.j29||{};h+='<p class="lead">Récupération, et le chemin parcouru :</p><table><tr><th></th><th>Jour 1</th><th>Jour 29</th><th>Écart</th></tr>';
  TESTS.forEach(function(t){var x=a[t[0]],y=b[t[0]];h+='<tr><td>'+t[1]+'</td><td>'+(x?x+' s':'–')+'</td><td>'+(y?y+' s':'–')+'</td><td><b>'+(x&&y?(y-x>0?'+':'')+(y-x)+' s':'–')+'</b></td></tr>'});
  h+='</table><p>Qu’est-ce qui a changé au quotidien ? Le dos le soir, la posture, les escaliers, ta séance de sport ? Le gainage ne suffit pas pour devenir fort : il a préparé le terrain. La suite, ce sont les charges : S’y remettre en 6 semaines pour apprendre les gestes, puis un programme de force de 12 semaines. Garde le circuit de la semaine 4 en échauffement.</p><a class="btn-o" style="text-align:center;line-height:46px;text-decoration:none" href="/programmes">Voir les programmes de force</a><button type="button" class="btn-y" data-fait="30">'+(S.faits[30]?'Défi terminé ✓':'Valider mon défi')+'</button>';return h}
 h+='<p class="lead">Échauffe-toi 2 minutes, puis tiens chaque position le plus longtemps possible <b>en restant parfaitement aligné</b>. Arrête le chrono au premier défaut. 2 minutes de repos entre chaque test.</p>';
 TESTS.forEach(function(t){var v=(S.test[cle]||{})[t[0]];h+='<div class="card">'+svg(t[0])+'<div><b>'+t[1]+'</b><span>'+(v?'Ton temps : '+v+' s':'Pas encore fait')+'</span><button type="button" class="btn-o" data-chrono="'+cle+':'+t[0]+'">'+(v?'Refaire':'Lancer le chrono')+'</button></div></div>'});
 if(d===1){var p=(S.test.j1||{}).planche;if(p){var n=p<45?0:p<=90?1:2;h+='<div class="box">Planche tenue <b>'+p+' s</b> : niveau conseillé <b>'+D.NIVEAUX[n].n+'</b>.<button type="button" class="btn-o" style="border-color:#E4E1B8;color:#E4E1B8" data-niv2="'+n+'">Choisir ce niveau</button></div>'}
  h+='<button type="button" class="btn-y" data-jour="1">Revenir à la séance du jour 1</button>'}
 else h+='<button type="button" class="btn-y" data-fait="29">'+(S.faits[29]?'Test fait ✓':'J’ai fait mes 3 tests')+'</button>';
 return h}
function chrono(cle,k){var t0=Date.now(),run=true,el;
 app.insertAdjacentHTML('beforeend','<div class="pl" id="pl"><div class="pl-top"><span>Test</span><span></span></div><div class="pl-mid"><div class="pl-kind">Tiens le plus longtemps possible</div><div class="pl-name">'+esc(D.POS[k].n)+'</div>'+svg(D.POS[k].p,true)+'<div class="pl-time" id="tt">0:00</div><p class="pl-rep">Arrête au premier défaut.</p></div><div class="pl-ctl" style="grid-template-columns:1fr 2fr"><button type="button" data-stopx>Annuler</button><button type="button" class="main" data-stopt>Stop</button></div></div>');
 el=document.getElementById('tt');lock(true);beep(880,.25);
 (function f(){if(!run)return;el.textContent=mmss((Date.now()-t0)/1000-.999);requestAnimationFrame(f)})();
 document.querySelector('[data-stopt]').onclick=function(){run=false;var s=Math.floor((Date.now()-t0)/1000);S.test[cle]=S.test[cle]||{};S.test[cle][k]=s;save();close();day(cle==='j1'?'T1':29)};
 document.querySelector('[data-stopx]').onclick=function(){run=false;close();day(cle==='j1'?'T1':29)}}

/* ---------- lecteur de séance ---------- */
var ac=null,wl=null;
function beep(f,d){try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();var o=ac.createOscillator(),g=ac.createGain();o.frequency.value=f;o.type='sine';g.gain.setValueAtTime(.0001,ac.currentTime);g.gain.exponentialRampToValueAtTime(.4,ac.currentTime+.02);g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+d);o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+d+.05)}catch(e){}}
function buzz(p){try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}}
function lock(on){try{if(on&&navigator.wakeLock)navigator.wakeLock.request('screen').then(function(w){wl=w});else if(!on&&wl){wl.release();wl=null}}catch(e){}}
function close(){var p=document.getElementById('pl');if(p)p.remove();lock(false)}
function etapes(sem){var s=[],w=D.SEMAINES[sem-1],pa=D.PALIERS[palier(sem)];
 D.MER.forEach(function(m){s.push({k:'warm',n:m[0],t:m[1],p:m[2]})});
 for(var r=1;r<=D.TOURS;r++){w.k.forEach(function(k,i){var p=D.POS[k];s.push({k:'go',n:p.n,t:pa[0],p:p.p,pos:k,tour:r,i:i});
  if(i<w.k.length-1)s.push({k:'rest',n:'Repos',t:pa[1],nx:w.k[i+1]})});
  if(r<D.TOURS)s.push({k:'rest',n:'Pause entre les tours',t:D.ENTRE,nx:w.k[0]})}
 D.CALME.forEach(function(m){s.push({k:'warm',n:m[0],t:m[1],p:m[2],calme:1})});return s}
function play(d){var j=jour(d),st=etapes(j.sem),i=0,left=st[0].t,last=Date.now(),pause=false,raf,tot=0,done=0,lastSec=-1;
 st.forEach(function(e){tot+=e.t});
 app.insertAdjacentHTML('beforeend','<div class="pl" id="pl"><div class="pl-bar"><i id="pb"></i></div><div class="pl-top"><span id="pt"></span><span id="pr"></span></div><div class="pl-mid" id="pm"></div><div class="pl-ctl"><button type="button" data-q>Arrêter</button><button type="button" class="main" data-p>Pause</button><button type="button" data-s>Passer</button></div></div>');
 var pl=document.getElementById('pl');lock(true);
 function show(){var e=st[i],h='';pl.className='pl'+(e.k==='rest'?' rest':e.k==='warm'?' warm':'');
  document.getElementById('pt').textContent=e.k==='warm'?(e.calme?'Retour au calme':'Mise en route'):'Tour '+(e.tour||(st[i+1]&&st[i+1].tour)||'')+' / '+D.TOURS;
  document.getElementById('pr').textContent='Jour '+d;
  if(e.k==='go'){var p=D.POS[e.pos];h='<div class="pl-kind">Position '+(e.i+1)+' / '+D.SEMAINES[j.sem-1].k.length+'</div><div class="pl-name">'+esc(p.n)+'</div>'+svg(p.p,true)+'<div class="pl-time" id="tm"></div><p class="pl-rep">'+esc(p.r)+'</p>'+(S.facile?'<p class="pl-rep" style="color:#C9C49A">Plus facile : '+esc(p.f)+'</p>':'')}
  else if(e.k==='rest'){var n=D.POS[e.nx];h='<div class="pl-kind">'+esc(e.n)+'</div><div class="pl-time" id="tm"></div><div class="pl-next">Ensuite : <b>'+esc(n.n)+'</b></div>'+svg(n.p,true)+'<p class="pl-rep">'+esc(n.i[0])+'</p>'}
  else h='<div class="pl-kind">'+(e.calme?'Retour au calme':'Mise en route')+'</div><div class="pl-name">'+esc(e.n)+'</div>'+(e.p?svg(e.p,true):'')+'<div class="pl-time" id="tm"></div>';
  document.getElementById('pm').innerHTML=h}
 function next(){done+=st[i].t;i++;if(i>=st.length){fin();return}left=st[i].t;lastSec=-1;show();
  if(st[i].k==='go'){beep(990,.45);buzz(300)}else{beep(520,.3);buzz([80,60,80])}}
 function tick(){var now=Date.now();if(!pause){left-=(now-last)/1000}last=now;
  var e=st[i],sec=Math.ceil(left);if(sec!==lastSec){lastSec=sec;if(sec<=3&&sec>=1)beep(700,.12);
   if(e.k==='go'&&(e.pos==='pontUneJambe'||e.pos==='coudeGenou')&&sec===Math.ceil(e.t/2)){beep(880,.2);var r=document.querySelector('.pl-rep');if(r)r.textContent='Change de côté !'}}
  var tm=document.getElementById('tm');if(tm)tm.textContent=mmss(left);
  document.getElementById('pb').style.width=Math.min(100,(done+e.t-left)/tot*100)+'%';
  if(left<=0){next()}if(i<st.length)raf=requestAnimationFrame(tick)}
 function fin(){cancelAnimationFrame(raf);S.faits[d]=Date.now();save();beep(660,.2);setTimeout(function(){beep(880,.2)},220);setTimeout(function(){beep(1100,.4)},440);buzz([200,100,200]);
  document.getElementById('pm').innerHTML='<div class="pl-kind">Jour '+d+'</div><div class="pl-name">Séance faite</div><div class="pl-time">✓</div><p class="pl-rep">Bravo. Un jour de plus de coché : la régularité fait le reste.</p>';
  document.querySelector('.pl-ctl').innerHTML='<button type="button" class="main" style="grid-column:1/-1" data-fin>Revenir à mes 30 jours</button>';lock(false)}
 pl.onclick=function(ev){var b=ev.target.closest('button');if(!b)return;
  if(b.hasAttribute('data-p')){pause=!pause;b.textContent=pause?'Reprendre':'Pause'}
  else if(b.hasAttribute('data-s')){left=0}
  else if(b.hasAttribute('data-q')){if(confirm('Arrêter la séance ?')){cancelAnimationFrame(raf);close();day(d)}}
  else if(b.hasAttribute('data-fin')){close();home()}};
 show();beep(990,.45);raf=requestAnimationFrame(tick)}

/* ---------- événements ---------- */
app.addEventListener('click',function(e){var b=e.target.closest('button');if(!b||b.closest('.pl'))return;
 if(b.hasAttribute('data-niv')){S.niv=+b.getAttribute('data-niv');save();home()}
 else if(b.hasAttribute('data-niv2')){S.niv=+b.getAttribute('data-niv2');save();day(1)}
 else if(b.hasAttribute('data-jour')){day(+b.getAttribute('data-jour'))}
 else if(b.hasAttribute('data-home')){home()}
 else if(b.hasAttribute('data-go')){play(+b.getAttribute('data-go'))}
 else if(b.hasAttribute('data-test')){app.innerHTML='<button type="button" class="back" data-jour="1">← Jour 1</button>'+testPage(1)}
 else if(b.hasAttribute('data-chrono')){var c=b.getAttribute('data-chrono').split(':');chrono(c[0],c[1])}
 else if(b.hasAttribute('data-fait')){var d=+b.getAttribute('data-fait');S.faits[d]=S.faits[d]?0:Date.now();save();day(d)}
 else if(b.hasAttribute('data-reprise')){var x=+b.getAttribute('data-reprise');for(var k in S.faits)if(+k>=x)delete S.faits[k];save();day(x)}});
app.addEventListener('change',function(e){var t=e.target;if(t.id==='fac'){S.facile=t.checked;save()}
 else if(t.hasAttribute('data-recul')){S.recul[t.getAttribute('data-recul')]=t.checked?1:0;save();day(+location.hash.slice(2)||suivant())}});
var _day=day;day=function(d){if(d==='T1'){app.innerHTML='<button type="button" class="back" data-jour="1">← Jour 1</button>'+testPage(1);return}location.hash='j'+d;_day(d)};
window.addEventListener('hashchange',function(){if(!document.getElementById('pl')){var m=location.hash.match(/^#j(\d+)$/);if(m)_day(+m[1]);else home()}});
var m=location.hash.match(/^#j(\d+)$/);if(m)day(+m[1]);else home();
})();
`;

module.exports=function(T){
 T[FICHIER]=page(T);
 // Garde-fous : la page ne doit pas être listée.
 for(const k of Object.keys(T))if(typeof T[k]==='string'&&k!==FICHIER&&T[k].includes(JETON))die('le jeton apparaît dans '+k);
 console.log('DEFI ok séance guidée',ADRESSE);
};
module.exports.ADRESSE=ADRESSE;module.exports.FICHIER=FICHIER;
