const fs=require('fs');
// Séance guidée des programmes de force (26 novembre 2026) : S'y remettre en 6 semaines, Tonicité & fermeté,
// Force & carrure. Une page par programme, à une adresse non listée (jeton), « noindex », absente du plan du site.
// Le carnet (charges, répétitions, dates) reste dans le navigateur ; la sauvegarde en ligne par lien personnel
// viendra avec la vente. Les données sont dans prog-data.js, partagé avec les PDF.
const {EX,PROGS}=require('./prog-data.js');
const die=m=>{console.error('PROG',m);process.exit(1)};
const adresse=p=>'/programme/'+p.slug+'/'+p.jeton;
const fichier=p=>'prog-'+p.slug+'-'+p.jeton+'.html';
const pdf=p=>'Alpha_'+p.slug.replace(/-/g,'_')+'_'+p.jeton+'.pdf';

const CSS=`
:root{--ink:#12110C;--cream:#E4E1B8;--khaki:#807C3A;--olive:#4A4620;--sand:#C9C49A;--y:#F2E415}
*{box-sizing:border-box}html,body{margin:0;background:var(--cream);color:var(--ink);font:17px/1.45 'Roboto Condensed','Arial Narrow',system-ui,sans-serif}
button,input{font:inherit}button{cursor:pointer}a{color:inherit}
.top{background:var(--khaki);padding:10px 16px;display:flex;align-items:center;justify-content:space-between}
.top img{height:40px}.top b{font-size:13px;letter-spacing:.12em}
.wrap{max-width:600px;margin:0 auto;padding:18px 16px 70px}
h1,h2,h3{font-family:Anton,Impact,sans-serif;font-weight:400;text-transform:uppercase;line-height:1.05;margin:0}
h1{font-size:36px;margin:6px 0 8px}h2{font-size:23px;margin:26px 0 10px}h3{font-size:19px}
.lead{margin:0 0 14px}.muted{color:var(--olive);font-size:15px}
.seg{display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(0,1fr))}
.seg button{border:2px solid var(--ink);background:transparent;border-radius:14px;padding:10px 8px;text-align:left;color:var(--ink)}
.seg button b{display:block;font-size:16px}.seg button span{font-size:13px;line-height:1.35;display:block;color:var(--olive)}.seg.col{grid-template-columns:1fr}
.seg button[aria-pressed=true]{background:var(--ink);color:var(--cream)}.seg button[aria-pressed=true] span{color:var(--sand)}
.wk{background:#fff;border:1px solid var(--sand);border-radius:14px;padding:10px 12px;margin:0 0 8px}
.wk.cur{outline:3px solid var(--khaki)}
.wk p{margin:0 0 6px;font-size:14px;color:var(--olive)}.wk p b{color:var(--ink);font-size:16px}
.ses{display:flex;flex-wrap:wrap;gap:6px}
.ses button{border:1px solid var(--ink);background:transparent;border-radius:999px;padding:6px 12px;font-size:14px;font-weight:700;color:var(--ink)}
.ses .ok{background:var(--ink);color:var(--y)}.ses .fac{border-style:dashed}.ses .now{background:var(--y);border-color:var(--y)}
.btn-y{display:block;width:100%;border:0;background:var(--y);color:var(--ink);border-radius:999px;min-height:58px;font-weight:700;font-size:19px;margin:18px 0 8px;text-align:center;text-decoration:none;line-height:58px}
.btn-o{display:block;width:100%;border:2px solid var(--ink);background:transparent;border-radius:999px;min-height:50px;font-weight:700;margin:8px 0;text-align:center;text-decoration:none;line-height:46px;color:var(--ink)}
.box{background:var(--ink);color:var(--cream);border-radius:16px;padding:14px 16px;margin:12px 0}.box b{color:var(--y)}.box p{margin:6px 0}
.box .btn-y{margin:12px 0 4px}
.back{background:none;border:0;padding:0;font-weight:700;margin:0 0 6px;color:var(--ink)}
.ex{background:#fff;border:1px solid var(--sand);border-radius:16px;padding:14px;margin:0 0 12px}
.ex h3{margin:0 0 2px}.ex .v{font-weight:700;margin:0 0 2px}.ex .tg{font-size:15px;color:var(--olive);margin:0 0 8px}
.ex details{font-size:15px;margin:4px 0 8px}.ex details ul{margin:6px 0;padding-left:20px}
.find{border:2px dashed var(--khaki);border-radius:12px;padding:10px 12px;margin:8px 0;font-size:15px}.find p{margin:4px 0}.find .big{font-family:Anton,Impact,sans-serif;font-size:30px;color:var(--ink)}.find .row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin:8px 0}.find .row button,.find .go{border:2px solid var(--ink);background:#fff;border-radius:12px;padding:8px 4px;font-weight:700;font-size:14px;color:var(--ink)}.find .go{width:100%;background:var(--ink);color:var(--y);border-color:var(--ink);min-height:44px}.find small{display:block;color:var(--olive);font-size:13px;line-height:1.35}
.last{font-size:14.5px;background:var(--cream);border-radius:10px;padding:6px 10px;margin:6px 0}
.adv{font-size:14.5px;font-weight:700;margin:4px 0 8px}
.vers{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0}.vers button{border:1px solid var(--sand);background:transparent;border-radius:999px;padding:3px 10px;font-size:13px;color:var(--ink)}
.vers button[aria-pressed=true]{background:var(--ink);color:var(--cream);border-color:var(--ink)}
.set{display:grid;grid-template-columns:24px 1fr 1fr 58px;gap:8px;align-items:center;margin:6px 0}
.set.chr{grid-template-columns:28px 1fr 120px}
.set i{font-style:normal;font-weight:700;color:var(--olive)}
.set label{display:flex;align-items:center;gap:4px;font-size:13px;color:var(--olive)}
.set input{width:100%;min-width:0;border:1px solid var(--sand);border-radius:10px;padding:9px 8px;font-size:18px;background:#fff;color:var(--ink)}
.set button{border:0;border-radius:12px;min-height:44px;background:var(--ink);color:var(--y);font-weight:700}
.set.done button{background:var(--khaki);color:var(--cream)}.set.done input{background:var(--cream)}
.list{margin:6px 0 0;padding-left:20px}
table{width:100%;border-collapse:collapse;font-size:15px;margin:8px 0}td,th{padding:7px 4px;border-bottom:1px solid var(--sand);text-align:left;vertical-align:top}
th{font-size:13px;color:var(--olive)}
.tin{display:grid;grid-template-columns:1fr 110px;gap:10px;align-items:center;margin:8px 0}
.tin input{border:1px solid var(--sand);border-radius:10px;padding:9px 8px;font-size:18px;width:100%;background:#fff}
.pl{position:fixed;inset:0;background:var(--olive);color:var(--cream);display:flex;flex-direction:column;z-index:9}
.pl.go{background:var(--ink)}
.pl-mid{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 18px}
.pl-kind{font-size:14px;letter-spacing:.16em;text-transform:uppercase;color:var(--sand)}
.pl-name{font-family:Anton,Impact,sans-serif;font-size:30px;line-height:1.05;text-transform:uppercase;margin:6px 0 4px}
.pl-time{font-family:Anton,Impact,sans-serif;font-size:min(34vw,170px);line-height:1;color:var(--y);font-variant-numeric:tabular-nums}
.pl-next{font-size:15px;color:var(--sand);margin-top:12px;max-width:460px}
.pl-ctl{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:14px 16px calc(14px + env(safe-area-inset-bottom))}
.pl-ctl button{border:2px solid var(--cream);background:transparent;color:var(--cream);border-radius:999px;min-height:54px;font-weight:700}
.pl-ctl .main{background:var(--y);border-color:var(--y);color:var(--ink)}
`;

const APP=String.raw`
(function(){
var D=window.PROG,P=D.p,EX=D.ex,K='alpha.prog.'+P.slug+'.v1',app=document.getElementById('app');
var S;try{S=JSON.parse(localStorage.getItem(K))}catch(e){}
S=S||{};S.cfg=S.cfg||{niv:null,lieu:'maison',ver:{}};S.cfg.ver=S.cfg.ver||{};S.faits=S.faits||{};S.carnet=S.carnet||{};S.hist=S.hist||{};S.first=S.first||{};S.tests=S.tests||{debut:{},fin:{}};S.pauses=S.pauses||[];S.reprises=S.reprises||0;S.seances=S.seances||0;
function save(){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function key(w,k){return w+'-'+k}
function mmss(s){s=Math.max(0,Math.ceil(s));return Math.floor(s/60)+':'+('0'+s%60).slice(-2)}
function dur(s){return s>=60?(s%60?Math.floor(s/60)+' min '+(s%60):(s/60)+' min'):s+' s'}
function ladate(t){return new Date(t).toLocaleDateString('fr-FR',{day:'numeric',month:'long'})}
var SEQ=[];P.plan.forEach(function(W){W.seances.forEach(function(s){if(!s.fac)SEQ.push([W.w,s.k])})});
function suivante(){for(var i=0;i<SEQ.length;i++)if(!S.faits[key(SEQ[i][0],SEQ[i][1])])return SEQ[i];return null}
function semaine(){var n=suivante();return n?n[0]:P.semaines}
function dernier(){var t=0;for(var k in S.faits)if(S.faits[k]>t)t=S.faits[k];return t}
function pause(){var t=dernier();return t<1e12?0:Math.floor((Date.now()-t)/864e5)}
var vue=null;function hash(h){vue=h?'#'+h:'';if(location.hash!==vue&&!(vue===''&&location.hash==='#'))location.hash=h}
function W_(w){return P.plan[w-1]}
function se(w,k){var r=null;W_(w).seances.forEach(function(s){if(s.k===k)r=s});return r}
function finProg(){return !suivante()}

/* ---------- audio, vibration, écran allumé ---------- */
var AC=null,lock=null;
function beep(f,d){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();var o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f;o.connect(g);g.connect(AC.destination);g.gain.setValueAtTime(.25,AC.currentTime);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+d);o.start();o.stop(AC.currentTime+d)}catch(e){}}
function vib(p){try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}}
function veille(on){try{if(on&&navigator.wakeLock&&!lock)navigator.wakeLock.request('screen').then(function(l){lock=l}).catch(function(){});if(!on&&lock){lock.release();lock=null}}catch(e){}}

/* ---------- chrono plein écran (repos ou effort) ---------- */
var tm=null;
function chrono(o){ // o: {kind,name,sec,next,go,mid}
 stopChrono();veille(true);
 var el=document.createElement('div');el.className='pl'+(o.go?' go':'');el.id='pl';
 el.innerHTML='<div class="pl-mid"><div class="pl-kind">'+esc(o.kind)+'</div><div class="pl-name">'+esc(o.name)+'</div><div class="pl-time" id="plt">'+mmss(o.sec)+'</div><div class="pl-next">'+esc(o.next||'')+'</div></div><div class="pl-ctl"><button type="button" data-p="plus">+15 s</button><button type="button" class="main" data-p="stop">'+(o.go?'Terminé':'Passer le repos')+'</button></div>';
 document.body.appendChild(el);
 var fin=Date.now()+o.sec*1000,last=-1,midDone=false;
 el.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;if(b.getAttribute('data-p')==='plus'){fin+=15000}else{stopChrono();o.done&&o.done()}});
 tm=setInterval(function(){var r=(fin-Date.now())/1000,s=Math.ceil(r);var t=document.getElementById('plt');if(t)t.textContent=mmss(r);
  if(o.mid&&!midDone&&r<=o.sec/2){midDone=true;beep(660,.25);vib(200);var k=el.querySelector('.pl-kind');if(k)k.textContent='Change de côté !'}
  if(s!==last&&s<=3&&s>0){beep(520,.12)}last=s;
  if(r<=0){beep(880,.45);vib([200,100,200]);stopChrono();o.done&&o.done()}},200);
}
function stopChrono(){if(tm){clearInterval(tm);tm=null}var el=document.getElementById('pl');if(el)el.remove();veille(false)}

/* ---------- trouver sa charge ---------- */
var DEP={squat:[4,8,'un haltère'],squatGob:[4,8,'un haltère'],pont:[4,8,'sur les hanches'],hipThrust:[6,12,'sur les hanches'],hipThrust1:[2,4,'sur les hanches'],pontExplo:[4,8,'sur les hanches'],
 sdtr:[3,6,'par main'],sdtr1:[3,5,'un haltère'],rowing:[4,8,'un haltère'],rowPenche:[3,6,'par main'],devEp:[2,4,'par main'],devMil:[3,6,'par main'],devCouche:[4,8,'par main'],devIncl:[3,6,'par main'],
 fente:[2,4,'par main'],bulgare:[2,4,'par main'],stepUp:[2,4,'par main'],marche:[2,4,'par main'],elevLat:[1,2,'par main'],curl:[3,5,'par main'],extTri:[3,6,'un haltère']};
var F=null; // essai en cours : {i,e,kg,n}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function sexe(){return S.cfg.sexe||(P.fem?'f':P.slug==='force-carrure'?'h':null)}
function mat(x){var sl=S.cfg.lieu==='salle'&&x.sl&&x.sl!=='Identique'?x.sl:'';
 if(sl&&/barre/i.test(sl)&&!/haltère/i.test(sl))return {u:'au total, barre comprise (une barre olympique pèse souvent 20 kg)',st:[20,20],r:2.5};
 if(sl&&/machine|poulie|presse/i.test(sl))return {u:'sur la machine',st:[10,20],r:2.5};
 if(x.v&&/sac/i.test(x.v[verIdx(x)]))return {u:'dans le sac à dos',st:[3,5],r:0.5};
 var d=DEP[x.e];return {u:d[2],st:[d[0],d[1]],r:0}}
function arrondi(kg,m){var r=m.r||(kg<10?0.5:1);return Math.max(0,Math.round(kg/r)*r)}
function cherche(x){if(!x.ch||!DEP[x.e]||x.sec||x.chrono)return false;if(!x.v)return true;var v=x.v[verIdx(x)];return /sac|haltère|bouteille/i.test(v)}
var RES=[['0 ou 1',0.9],['2 ou 3',1],['4 à 6',1.15],['7 à 10',1.3],['Plus de 10, facile',1.6]];
function depart(x){var m=mat(x),k=m.st[sexe()==='f'?0:1]*(S.cfg.xp?1.6:1);return arrondi(k,m)}
function panneau(x,i){var m=mat(x),h='<div class="find">';
 if(!F||F.i!==i){var st=S.start&&S.start[x.e];
  return h+(st?'<p>Charge de départ : <b>'+st+' kg</b> ('+m.u+').</p><button type="button" class="go" data-find="'+i+'">Refaire l’essai</button>':'<p><b>Quelle charge prendre ?</b></p><div class="tin" style="margin:6px 0"><label for="kn'+i+'" style="font-size:14px">Tu la connais déjà pour '+x.r[0]+' à '+x.r[1]+' répétitions ? (kg, '+m.u+')</label><input id="kn'+i+'" inputmode="decimal" placeholder="kg"></div><button type="button" class="go" data-known="'+i+'" style="background:#fff;color:var(--ink)">Je la connais</button><button type="button" class="go" data-find="'+i+'" style="margin-top:6px">Je ne sais pas : la trouver</button>')+'</div>'}
 if(F.kg==null){h+='<p>Pour proposer un premier essai adapté :</p>';if(!sexe())h+='<div class="row" style="grid-template-columns:1fr 1fr"><button type="button" data-sexe="f">Je suis une femme</button><button type="button" data-sexe="h">Je suis un homme</button></div>';else h+='<div class="row" style="grid-template-columns:1fr 1fr"><button type="button" data-xp="0">Je débute</button><button type="button" data-xp="1">J’ai déjà pratiqué</button></div>';return h+'<button type="button" class="go" data-find-x="1" style="background:#fff;color:var(--ink)">Annuler</button></div>'}
 if(F.ok)return h+'<p>Ta charge de départ :</p><p class="big">'+F.kg+' kg</p><small>'+cap(m.u)+'. Elle est notée dans tes séries. Si toutes tes séries atteignent '+x.r[1]+' répétitions, la séance guidée te dira de monter.</small><button type="button" class="go" data-find-x="1" style="margin-top:8px">C’est noté</button></div>';
 h+='<p>Essai '+F.n+' : fais <b>'+x.r[0]+' répétitions'+(x.par?' (par '+x.par+')':'')+'</b> propres avec</p><p class="big">'+F.kg+' kg</p><small>'+cap(m.u)+'.'+(F.n===1?' Un premier essai léger, qui sert aussi d’échauffement.':'')+'</small><p><b>Combien aurais-tu pu en faire de plus ?</b></p><div class="row" style="grid-template-columns:repeat(3,1fr)">';
 RES.forEach(function(r,j){h+='<button type="button" data-fr="'+i+':'+j+'">'+r[0]+'</button>'});
 return h+'</div><small>Sois honnête : il en reste peu quand la vitesse ralentit nettement, que la respiration se bloque ou que la position se dégrade. L’appli ajuste la charge de l’essai suivant selon ta réponse (jusqu’à +60 % si c’était facile) : 2 ou 3 essais suffisent.</small><button type="button" class="go" data-find-x="1" style="margin-top:8px;background:#fff;color:var(--ink)">Annuler</button></div>'}

/* ---------- version d'un exercice ---------- */
function niv(){return S.cfg.niv==null?0:S.cfg.niv}
function verIdx(x){var v=S.cfg.ver[x.e];return v==null?niv():v}
function nomVersion(x){if(x.v)return x.v[verIdx(x)];if(S.cfg.lieu==='salle'&&x.sl)return x.sl==='Identique'?(x.m||''):x.sl;return x.m||''}
function secCible(x){if(x.chrono)return x.chrono[verIdx(x)];var h=S.hist[x.e];return x.sec[0]===x.sec[1]||!h?x.sec[0]:x.sec[1]}
function par(x){return x.par?' par '+x.par:''}

/* ---------- accueil ---------- */
function home(){
 hash('');var n=suivante(),cw=semaine(),h='<h1>'+esc(P.titre)+'</h1><p class="lead">'+esc(P.accroche)+'</p>';
 h+='<p class="muted">'+esc(P.rythme)+'.</p>';
 if(P.niveaux){h+='<h2>Ton niveau de départ</h2><p class="muted">'+esc(P.regleNiveau)+' Fais d’abord les tests du jour 1.</p><div class="seg col">';
  P.niveaux.forEach(function(v,i){h+='<button type="button" data-niv="'+i+'" aria-pressed="'+(S.cfg.niv===i)+'"><b>'+esc(v.n)+'</b><span>'+esc(v.s)+'</span></button>'});h+='</div>'}
 if(P.entree){h+='<div class="box"><b>Avant de commencer</b>';P.entree.forEach(function(t){h+='<p>'+esc(t.n)+' : <b>'+esc(t.s)+'</b></p>'});h+='<p>'+esc(P.regleNiveau)+'</p></div>'}
 if(P.lieux){h+='<h2>Où t’entraînes-tu ?</h2><div class="seg"><button type="button" data-lieu="maison" aria-pressed="'+(S.cfg.lieu==='maison')+'"><b>À la maison</b><span>Haltères et matériel simple</span></button><button type="button" data-lieu="salle" aria-pressed="'+(S.cfg.lieu==='salle')+'"><b>En salle</b><span>Barres, machines, poulies</span></button></div>'}
 var nd=0;for(var k in S.tests.debut)if(S.tests.debut[k]!=='')nd++;
 h+='<button type="button" class="btn-o" data-tests="debut">'+(nd?'Tes repères de départ ✓ ('+nd+'/'+P.tests.length+')':'Tes repères de départ : à faire avant la semaine 1')+'</button>';
 var p=pause();
 if(p>=8&&n&&dernier()){var r=null;for(var i=0;i<P.reprise.length;i++)if(p<=P.reprise[i][0]){r=P.reprise[i];break}
  var x=r[1]===0?cw:r[1]>0?Math.max(1,cw-r[1]):r[1]===-2?W_(cw).debutPhase:1;
  h+='<div class="box"><b>Pause de '+p+' jours : tu n’es pas reparti'+(P.fem?'e':'')+' de zéro.</b><p>La force se garde bien deux à trois semaines, puis baisse, et se reprend plus vite qu’elle ne s’est construite. Où reprendre : '+esc(r[2])+'.</p><button type="button" class="btn-y" data-reprise="'+x+'" data-regle="'+P.reprise.indexOf(r)+'">Reprendre à la semaine '+x+'</button><p class="muted" style="color:var(--sand)">Une blessure ou une maladie ? Avis médical d’abord, puis reprends une semaine plus tôt.</p></div>'}
 if(S.reduc){h+='<div class="box"><b>Reprise :</b> '+esc(S.reduc)+'</div>'}
 if(n){var s=se(n[0],n[1]);h+='<button type="button" class="btn-y" data-seance="'+n[0]+':'+n[1]+'">Semaine '+n[0]+' · '+(s.test?'Tests':'Séance '+esc(n[1]))+'</button>'}
 else h+='<button type="button" class="btn-y" data-bilan="1">Ton bilan de fin</button>';
 h+='<h2>Tes semaines</h2>';
 P.plan.forEach(function(W){h+='<div class="wk'+(W.w===cw&&n?' cur':'')+'"><p><b>Semaine '+W.w+'</b> · '+esc(W.phase)+(W.rir&&W.rir!=='—'?' · réserve '+esc(W.rir):'')+'</p><div class="ses">';
  W.seances.forEach(function(s){var kk=key(W.w,s.k),c=S.faits[kk]?'ok':(n&&n[0]===W.w&&n[1]===s.k?'now':'');h+='<button type="button" class="'+c+(s.fac?' fac':'')+'" data-seance="'+W.w+':'+s.k+'">'+(S.faits[kk]?'✓ ':'')+(s.test?'Tests':esc(s.k))+(s.fac?' (facultative)':'')+'</button>'});
  h+='</div></div>'});
 if(dernier())h+='<button type="button" class="btn-o" data-bilan="1">Où j’en suis : mon parcours</button>';
 h+='<a class="btn-o" href="/docs/'+esc(D.pdf)+'" download>Télécharger le PDF du programme</a>';
 h+='<p class="muted">Ton carnet (charges, répétitions, dates) reste sur ce téléphone. Une gêne, une question : <a href="mailto:alphasince.contact@gmail.com">alphasince.contact@gmail.com</a></p>';
 app.innerHTML=h;window.scrollTo(0,0)}

/* ---------- une séance ---------- */
function seance(w,k){
 var s=se(w,k);if(!s){home();return}
 hash('s'+w+'-'+k);
 if(s.test){tests('fin',w,k);return}
 var W=W_(w),kk=key(w,k),C=S.carnet[kk]=S.carnet[kk]||{};
 var h='<button type="button" class="back" data-home="1">← Mes semaines</button><h1>Semaine '+w+' · Séance '+esc(k)+'</h1><p class="lead"><b>'+esc(s.t)+'</b><br><span class="muted">'+esc(W.phase)+(W.rir&&W.rir!=='—'?' · garde '+esc(W.rir)+' répétitions en réserve':'')+'</span></p>';
 if(s.note)h+='<div class="box">'+esc(s.note)+'</div>';
 if(S.reduc)h+='<div class="box"><b>Reprise :</b> '+esc(S.reduc)+'</div>';
 h+='<details class="ex"><summary><b>Échauffement</b></summary><ul class="list">'+P.echauffement.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></details>';
 s.items.forEach(function(x,i){var e=EX[x.e];h+='<div class="ex" id="x'+i+'"><h3>'+esc(e.n)+(x.fac?' <span class="muted">(facultatif)</span>':'')+'</h3>';
  var v=nomVersion(x);if(v)h+='<p class="v">'+esc(v)+'</p>';
  if(x.v){h+='<div class="vers">';['Départ','Interm.','Confirmé'].forEach(function(l,j){h+='<button type="button" data-ver="'+x.e+':'+j+'" aria-pressed="'+(verIdx(x)===j)+'">'+l+'</button>'});h+='</div>'}
  h+='<details><summary>Comment faire</summary><ul class="list">'+e.c.map(function(c){return '<li>'+esc(c)+'</li>'}).join('')+'</ul><p><b>Repère :</b> '+esc(e.r)+'</p></details>';
  if(x.libre){var d=C[i]&&C[i][0];h+='<p class="tg">'+esc(x.libre)+'</p><div class="set chr'+(d?' done':'')+'"><i>✓</i><span>'+(d?'Fait':'À faire')+'</span><button type="button" data-libre="'+i+'">'+(d?'Fait ✓':'C’est fait')+'</button></div></div>';return}
  var chr=!!(x.sec||x.chrono),sec=chr?secCible(x):0;
  h+='<p class="tg">'+x.s+' × '+(chr?dur(sec)+par(x):(x.r[0]===x.r[1]?x.r[0]:x.r[0]+' à '+x.r[1])+' répétitions'+par(x))+' · repos '+dur(x.rep)+'</p>';
  var hi=S.hist[x.e];
  if(cherche(x)&&(!hi||(F&&F.i===i)))h+=panneau(x,i);
  if(hi&&!chr){h+='<p class="last">Dernière fois (semaine '+hi.w+') : '+hi.sets.map(function(z){return (z[0]?z[0]+' kg × ':'')+z[1]}).join(' · ')+'</p>';
   var top=hi.sets.length>=x.s&&hi.sets.every(function(z){return +z[1]>=x.r[1]});
   h+='<p class="adv">'+(top?'Haut de la fourchette atteint : monte d’un cran (+1 à 2 kg, ou la version suivante), et repars du bas.':'Même charge : vise une répétition de plus que la dernière fois.')+'</p>'}
  for(var j=0;j<x.s;j++){var z=(C[i]||[])[j],done=!!z;
   if(chr)h+='<div class="set chr'+(done?' done':'')+'"><i>'+(j+1)+'</i><span>'+(done?'Fait':dur(sec)+(x.par==='côté'?' × 2 côtés':''))+'</span><button type="button" data-chr="'+i+':'+j+'">'+(done?'Refaire':'Lancer')+'</button></div>';
   else{var kg=done?z[0]:(hi&&hi.sets[j]?hi.sets[j][0]:(hi&&hi.sets[0]?hi.sets[0][0]:(S.start&&S.start[x.e]||'')));
    h+='<div class="set'+(done?' done':'')+'"><i>'+(j+1)+'</i>'+(x.ch?'<label><input inputmode="decimal" type="number" step="0.5" min="0" placeholder="kg" aria-label="Charge série '+(j+1)+'" id="kg'+i+'_'+j+'" value="'+esc(kg)+'">kg</label>':'<span class="muted">poids du corps</span>')+'<label><input inputmode="numeric" type="number" min="0" placeholder="rép." aria-label="Répétitions série '+(j+1)+'" id="rp'+i+'_'+j+'" value="'+esc(done?z[1]:'')+'">rép.</label><button type="button" data-set="'+i+':'+j+'">'+(done?'✓':'OK')+'</button></div>'}}
  h+='</div>'});
 h+='<details class="ex"><summary><b>Retour au calme</b></summary><ul class="list">'+P.calme.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul></details>';
 h+='<button type="button" class="btn-y" data-fin="'+w+':'+k+'">'+(S.faits[kk]?'Séance enregistrée ✓':'Séance terminée')+'</button>';
 app.innerHTML=h;window.scrollTo(0,0);app.dataset.w=w;app.dataset.k=k}

function apresSerie(w,k,i,j){var s=se(w,k),x=s.items[i],fin=(i===s.items.length-1&&j===x.s-1);
 seance(w,k);var el=document.getElementById('x'+i);if(el)el.scrollIntoView({block:'center'});
 if(fin)return;var nx=j<x.s-1?EX[x.e].n+' · série '+(j+2):EX[s.items[i+1].e].n;
 chrono({kind:'Repos',name:EX[x.e].n,sec:x.rep,next:'Ensuite : '+nx,done:function(){var e2=document.getElementById('x'+(j<x.s-1?i:i+1));if(e2)e2.scrollIntoView({block:'center'})}})}

function noter(w,k){var kk=key(w,k),p=pause(),t=Date.now();if(S.pnote){S.pnote=0;p=0}if(p>=8)S.pauses.push(p);if(!S.debut)S.debut=t;S.seances++;S.faits[kk]=t;
 var s=se(w,k),C=S.carnet[kk]||{};(s.items||[]).forEach(function(x,i){var c=C[i];if(!c||x.libre||x.sec||x.chrono)return;var sets=c.filter(Boolean);if(!sets.length)return;
  S.hist[x.e]={w:w,sets:sets};var mx=Math.max.apply(null,sets.map(function(z){return +z[0]||0}));if(x.ch&&mx){if(S.first[x.e]==null)S.first[x.e]=mx;S.last=S.last||{};S.last[x.e]=mx}});
 S.reduc='';save()}

/* ---------- tests ---------- */
function tests(q,w,k){
 var h='<button type="button" class="back" data-home="1">← Mes semaines</button><h1>'+(q==='debut'?'Tes repères de départ':'Les tests de fin')+'</h1>';
 h+='<p class="lead">'+(q==='debut'?'Avant la semaine 1. Échauffe-toi 10 minutes, 2 minutes de repos entre chaque test. Note ce que tu fais proprement : c’est ton point de comparaison.':'Les mêmes tests qu’au départ, dans les mêmes conditions. Compare : c’est la preuve de ton progrès.')+'</p>';
 if(P.slug==='force-carrure'&&q==='fin')h+='<p class="muted">Deux séances séparées de 48 h : tractions, pompes, planche et mesures, puis les charges pour 8 répétitions.</p>';
 P.tests.forEach(function(t){var v=(S.tests[q]||{})[t.k],d=(S.tests.debut0||S.tests.debut||{})[t.k];
  h+='<div class="tin"><label for="t_'+t.k+'">'+esc(t.n)+(q==='fin'&&d?' <span class="muted">(départ : '+esc(d)+' '+esc(t.u)+')</span>':'')+'</label><input id="t_'+t.k+'" inputmode="decimal" placeholder="'+esc(t.u)+'" value="'+esc(v==null?'':v)+'"></div>'});
 h+='<button type="button" class="btn-y" data-savetests="'+q+(w?':'+w+':'+k:'')+'">Enregistrer</button>';
 app.innerHTML=h;window.scrollTo(0,0)}

/* ---------- bilan / parcours ---------- */
function bilan(){
 var fin=finProg(),deb=S.debut,last=dernier(),nj=deb?Math.round((last-deb)/864e5)+1:0,pz=S.pauses,lg=pz.length?Math.max.apply(null,pz):0,nb=SEQ.length;
 var h='<button type="button" class="back" data-home="1">← Mes semaines</button><h1>'+(fin?'Ton bilan de fin':'Où tu en es')+'</h1>';
 h+='<div class="box"><b>Ton parcours</b>'+(deb?'<p>Commencé le '+ladate(deb)+' : '+nj+' jours'+(fin?' pour boucler les '+P.semaines+' semaines.':' jusqu’ici.')+'</p>':'')+'<p>'+S.seances+' séances faites'+(S.seances>nb?', dont '+(S.seances-nb)+' refaites ou facultatives':'')+'.</p><p>'+(pz.length?pz.length+' pause'+(pz.length>1?'s':'')+' de plus d’une semaine (la plus longue : '+lg+' jours), et tu es revenu'+(P.fem?'e':'')+' à chaque fois.':'Aucune pause de plus d’une semaine.')+'</p>'+(S.reprises?'<p>'+S.reprises+' reprise'+(S.reprises>1?'s':'')+' avec un pas en arrière, pour mieux repartir.</p>':'')+'<p>Chaque marche franchie compte, même celles qu’il a fallu remonter.</p></div>';
 var rows='';for(var e in S.first){if(S.last&&S.last[e]&&EX[e])rows+='<tr><td>'+esc(EX[e].n)+'</td><td>'+S.first[e]+' kg</td><td>'+S.last[e]+' kg</td><td><b>'+(S.last[e]-S.first[e]>0?'+':'')+(Math.round((S.last[e]-S.first[e])*10)/10)+' kg</b></td></tr>'}
 if(rows)h+='<h2>Tes charges</h2><table><tr><th></th><th>Au début</th><th>Aujourd’hui</th><th>Écart</th></tr>'+rows+'</table>';
 var a=S.tests.debut0||S.tests.debut||{},b=S.tests.fin||{},tr='';
 P.tests.forEach(function(t){var x=a[t.k],y=b[t.k];if(x||y)tr+='<tr><td>'+esc(t.n)+'</td><td>'+esc(x||'–')+'</td><td>'+esc(y||'–')+'</td><td><b>'+(x&&y&&!isNaN(x)&&!isNaN(y)?((y-x>0?'+':'')+(Math.round((y-x)*10)/10))+' '+esc(t.u):'–')+'</b></td></tr>'});
 if(tr)h+='<h2>Tes tests</h2><table><tr><th></th><th>Départ</th><th>Fin</th><th>Écart</th></tr>'+tr+'</table>';
 if(fin)h+='<p>'+esc(P.suite)+'</p><a class="btn-o" href="/programmes">Voir les programmes</a>';
 app.innerHTML=h;window.scrollTo(0,0)}

/* ---------- événements ---------- */
app.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var a;
 if((a=b.getAttribute('data-niv'))!=null){S.cfg.niv=+a;S.cfg.ver={};save();home()}
 else if((a=b.getAttribute('data-lieu'))){S.cfg.lieu=a;save();home()}
 else if(b.hasAttribute('data-home')){home()}
 else if(b.hasAttribute('data-bilan')){hash('bilan');bilan()}
 else if((a=b.getAttribute('data-tests'))){hash('tests');tests(a)}
 else if((a=b.getAttribute('data-seance'))){a=a.split(':');seance(+a[0],a[1])}
 else if((a=b.getAttribute('data-ver'))){a=a.split(':');S.cfg.ver[a[0]]=+a[1];save();seance(+app.dataset.w,app.dataset.k)}
 else if((a=b.getAttribute('data-set'))){a=a.split(':').map(Number);var w=+app.dataset.w,k=app.dataset.k,kk=key(w,k),kgE=document.getElementById('kg'+a[0]+'_'+a[1]),kg=kgE?kgE.value:'',rp=document.getElementById('rp'+a[0]+'_'+a[1]).value;
  if(rp===''){var x=se(w,k).items[a[0]];rp=String(x.r[1])}
  var C=S.carnet[kk]=S.carnet[kk]||{};C[a[0]]=C[a[0]]||[];C[a[0]][a[1]]=[kg===''?0:+kg,+rp];save();apresSerie(w,k,a[0],a[1])}
 else if((a=b.getAttribute('data-chr'))){a=a.split(':').map(Number);var w2=+app.dataset.w,k2=app.dataset.k,x2=se(w2,k2).items[a[0]],sec=secCible(x2),two=x2.par==='côté';
  chrono({kind:'Effort',name:EX[x2.e].n,sec:two?sec*2:sec,mid:two,go:true,next:two?'Change de côté à mi-temps.':'',done:function(){var C=S.carnet[key(w2,k2)]=S.carnet[key(w2,k2)]||{};C[a[0]]=C[a[0]]||[];C[a[0]][a[1]]=[0,sec];save();apresSerie(w2,k2,a[0],a[1])}})}
 else if((a=b.getAttribute('data-find'))!=null){var x5=se(+app.dataset.w,app.dataset.k).items[+a],m5=mat(x5),sx=sexe();F={i:+a,e:x5.e,n:1,kg:sx&&S.cfg.xp!=null?depart(x5):null};seance(+app.dataset.w,app.dataset.k);var e5=document.getElementById('x'+a);if(e5)e5.scrollIntoView({block:'start'})}
 else if((a=b.getAttribute('data-known'))!=null){var v9=(document.getElementById('kn'+a).value||'').replace(',','.');if(v9===''||isNaN(v9))return;var x9=se(+app.dataset.w,app.dataset.k).items[+a];F={i:+a,e:x9.e,n:1,kg:+v9,ok:1};S.start=S.start||{};S.start[x9.e]=+v9;save();seance(+app.dataset.w,app.dataset.k);var e9=document.getElementById('x'+a);if(e9)e9.scrollIntoView({block:'start'})}
 else if((a=b.getAttribute('data-sexe'))){S.cfg.sexe=a;save();seance(+app.dataset.w,app.dataset.k)}
 else if((a=b.getAttribute('data-xp'))!=null){S.cfg.xp=+a;save();if(F){F.kg=depart(se(+app.dataset.w,app.dataset.k).items[F.i])}seance(+app.dataset.w,app.dataset.k)}
 else if(b.hasAttribute('data-find-x')){var fi=F&&F.i;F=null;seance(+app.dataset.w,app.dataset.k);var e7=document.getElementById('x'+fi);if(e7)e7.scrollIntoView({block:'start'})}
 else if((a=b.getAttribute('data-fr'))){a=a.split(':').map(Number);var w8=+app.dataset.w,k8=app.dataset.k,x8=se(w8,k8).items[a[0]],m8=mat(x8),rr=RES[a[1]][1];
  var cible=arrondi(F.kg*rr,m8);if(cible===F.kg&&rr>1)cible=arrondi(F.kg+(m8.r||(F.kg<10?0.5:1)),m8);
  if(a[1]===1||F.n>=4||cible===F.kg){F.ok=1}
  else if(a[1]===0){F.kg=cible;F.ok=1}
  else{F.kg=cible;F.n++;chrono({kind:'Repos avant l’essai suivant',name:EX[F.e].n,sec:90,next:'Ensuite : '+cible+' kg',done:function(){}})}
  if(F.ok){S.start=S.start||{};S.start[F.e]=F.kg;save()}
  seance(w8,k8);var e8=document.getElementById('x'+a[0]);if(e8)e8.scrollIntoView({block:'start'})}
 else if((a=b.getAttribute('data-libre'))!=null){var w3=+app.dataset.w,k3=app.dataset.k,C3=S.carnet[key(w3,k3)]=S.carnet[key(w3,k3)]||{};C3[a]=C3[a]&&C3[a][0]?[]:[1];save();seance(w3,k3)}
 else if((a=b.getAttribute('data-fin'))){a=a.split(':');if(!S.faits[key(+a[0],a[1])])noter(+a[0],a[1]);home()}
 else if((a=b.getAttribute('data-savetests'))){a=a.split(':');var q=a[0],o={};P.tests.forEach(function(t){o[t.k]=document.getElementById('t_'+t.k).value.trim().replace(',','.')});S.tests[q]=o;
  if(a[1]&&!S.faits[key(+a[1],a[2])])noter(+a[1],a[2]);save();home()}
 else if((a=b.getAttribute('data-reprise'))){var x4=+a,rg=+b.getAttribute('data-regle');S.reprises++;var pp=pause();if(pp>=8){S.pauses.push(pp);S.pnote=1}
  if(x4===1&&P.reprise[rg][1]===-1){if(!S.tests.debut0)S.tests.debut0=S.tests.debut;S.tests.debut={}}
  for(var kk4 in S.faits){if(+kk4.split('-')[0]>=x4)delete S.faits[kk4]}
  S.reduc=rg===0?'charges −10 % à la première séance, puis comme avant.':rg===1?'charges −15 à 20 % cette semaine, puis double progression.':'nouvelle recherche des charges : monte série après série jusqu’à la bonne difficulté.';
  save();home()}});
window.addEventListener('hashchange',function(){if(document.getElementById('pl'))return;if(location.hash===vue||(vue===''&&location.hash==='#'))return;var m=location.hash.match(/^#s(\d+)-(\w+)$/);if(m)seance(+m[1],m[2]);else if(location.hash==='#bilan')bilan();else if(location.hash==='#tests')tests('debut');else if(!location.hash||location.hash==='#')home()});
var m=location.hash.match(/^#s(\d+)-(\w+)$/);if(m)seance(+m[1],m[2]);else if(location.hash==='#bilan')bilan();else home();
})();
`;

function page(p){
 const ex={};p.plan.forEach(W=>W.seances.forEach(s=>s.items.forEach(x=>{ex[x.e]=EX[x.e]})));
 const data=JSON.stringify({p:p,ex:ex,pdf:pdf(p)}).replace(/</g,'\\u003c');
 return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="#12110C">
<title>${p.titre} · Ta séance guidée | Alpha Since</title>
<link rel="icon" href="/img/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Roboto+Condensed:wght@400;500;700&display=swap" rel="stylesheet">
<style>${CSS}</style></head><body>
<header class="top"><a href="/" aria-label="Alpha Since"><img src="/img/logo.png" alt="Alpha Since 1982"></a><b>${p.court}</b></header>
<main class="wrap" id="app"><p>Chargement…</p></main>
<script>window.PROG=${data};</script>
<script>${APP}</script>
</body></html>`;
}

module.exports=function(T){
 for(const p of PROGS){
  T[fichier(p)]=page(p);
  for(const k of Object.keys(T))if(typeof T[k]==='string'&&k!==fichier(p)&&T[k].includes(p.jeton))die('le jeton de '+p.slug+' apparaît dans '+k);
  const src='sources/programmes/'+pdf(p).replace('_'+p.jeton,'');
  if(fs.existsSync(src)){fs.mkdirSync('out/docs',{recursive:true});fs.copyFileSync(src,'out/docs/'+pdf(p))}
  else console.log('PROG PDF absent pour',p.slug,'(',src,')');
  console.log('PROG ok',adresse(p));
 }
};
module.exports.adresse=adresse;module.exports.pdf=pdf;
