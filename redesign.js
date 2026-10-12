module.exports=function(T){
const one=(s,a,b,tag)=>{if(s.split(a).length!==2)throw new Error('ONE '+tag);return s.replace(a,()=>b)};
const arrow='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="13 6 19 12 13 18"></polyline></svg>';
const cartSvg='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2"></path><circle cx="9" cy="19" r="1.4"></circle><circle cx="17" cy="19" r="1.4"></circle></svg>';

const CSS=`
:root{--ink:#12110C;--ink2:#1C1B13;--ink3:#3F3C22;--cream:#E4E1B8;--khaki:#807C3A;--olive:#4A4620;--sand:#C9C49A;--mute:#A8A36A;--y:#F2E415;--side:max(20px,calc((100% - 1120px)/2));--tool:max(20px,calc((100% - 720px)/2))}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
body{margin:0;background:var(--ink)}
[id]{scroll-margin-top:80px}
#dc-root .sc-host>*{width:100%!important;max-width:none!important}
.a-root{width:100%;min-height:100vh;display:flex;flex-direction:column;box-sizing:border-box;font-family:'Roboto Condensed','Arial Narrow',system-ui,sans-serif;font-size:17px;line-height:1.55;overflow-x:clip}
.a-root *,.a-root *::before,.a-root *::after{box-sizing:border-box}
.a-tool>main,.a-tool>section,.a-tool>div{padding-left:var(--tool)!important;padding-right:var(--tool)!important}
.a-tool>main{padding-top:36px!important;padding-bottom:64px!important}

.a-hd{position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:8px;height:64px;padding:0 max(8px,calc((100% - 1136px)/2));background:var(--khaki);color:var(--ink);box-shadow:0 1px 0 rgba(18,17,12,.15)}
.a-ic{width:48px;height:48px;display:flex;align-items:center;justify-content:center;background:none;border:0;padding:0;color:inherit;cursor:pointer;border-radius:999px;text-decoration:none;flex-shrink:0}
.a-ic:hover{background:rgba(18,17,12,.08)}
.a-logo{display:flex;align-items:center;height:64px;text-decoration:none;margin-right:auto}
.a-logo img{height:50px;width:auto;display:block}
.a-nav{display:none;align-items:center;gap:4px}
.a-nav a{display:flex;align-items:center;min-height:44px;padding:0 14px;border-radius:999px;color:var(--ink);text-decoration:none;font-weight:700;font-size:16px}
.a-nav a:hover{background:rgba(18,17,12,.08);color:var(--ink)}
.a-nav a[aria-current]{background:var(--ink);color:var(--cream)}
@media (min-width:960px){.a-nav{display:flex}.a-burger{display:none}.a-logo{margin-left:12px}}
@media (max-width:959px){.a-logo{position:absolute;left:50%;transform:translateX(-50%);margin:0}.a-hd .a-cart{margin-left:auto}}

.a-menu{position:fixed;inset:0;z-index:60;overflow-y:auto;display:flex;flex-direction:column;gap:8px;padding:8px 20px 32px;background:var(--ink);color:var(--cream);animation:a-fade .2s ease}
@keyframes a-fade{from{opacity:0}to{opacity:1}}
.a-menu-top{display:flex;align-items:center;justify-content:space-between;height:56px;margin-bottom:8px}
.a-menu-top img{height:44px;width:auto;display:block}
.a-menu .a-ic{border:1px solid var(--ink3)}
.a-menu-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}
.a-menu-list a{display:flex;flex-direction:column;padding:14px 0;border-bottom:1px solid var(--ink3);color:var(--cream);text-decoration:none}
.a-menu-list a b{font:400 28px/1.05 Anton,Impact,sans-serif;text-transform:uppercase;color:#FFFFFF}
.a-menu-list a span{font-size:15px;color:var(--mute);margin-top:2px}
.a-menu-list a:hover b{color:var(--y)}
.a-menu-legal{display:flex;flex-wrap:wrap;gap:4px 18px;margin-top:18px;font-size:14px}
.a-menu-legal a{color:var(--mute);min-height:40px;display:flex;align-items:center}

.a-wrap{width:100%;max-width:1160px;margin:0 auto;padding:0 20px}
.a-sec{padding:64px 0}
@media (min-width:960px){.a-sec{padding:104px 0}}
.t-ink{background:var(--ink);color:var(--cream)}
.t-cream{background:var(--cream);color:var(--ink)}
.t-khaki{background:var(--khaki);color:var(--ink)}
.t-olive{background:var(--olive);color:var(--cream)}
.a-h1,.a-h2,.a-h3{font-family:Anton,Impact,sans-serif;font-weight:400;text-transform:uppercase;margin:0;letter-spacing:.005em}
.a-h1{font-size:clamp(54px,11.5vw,112px);line-height:.92}
.a-h2{font-size:clamp(38px,6.4vw,68px);line-height:.98}
.a-h3{font-size:clamp(24px,2.6vw,30px);line-height:1.05}
.a-lead{font-size:clamp(18px,1.7vw,21px);line-height:1.5;margin:0;max-width:34em}
.a-p{margin:0;max-width:36em}
.a-y{color:var(--y)}
.a-kick{font-size:15px;font-weight:700;color:var(--mute);margin:0}
.t-cream .a-kick,.t-khaki .a-kick{color:var(--olive)}
.a-stack{display:flex;flex-direction:column;gap:20px}
.a-ctas{display:flex;flex-wrap:wrap;gap:12px}
.a-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:56px;padding:0 28px;border-radius:999px;font-weight:700;font-size:18px;text-decoration:none;border:2px solid transparent;transition:transform .15s ease,background-color .15s ease,color .15s ease;cursor:pointer}
.a-btn:hover{transform:translateY(-1px)}
.a-btn-y{background:var(--y);color:var(--ink)}
.a-btn-y:hover{background:#FFFFFF;color:var(--ink)}
.a-btn-o{border-color:currentColor;color:inherit;background:transparent}
.t-ink .a-btn-o:hover,.t-olive .a-btn-o:hover{background:var(--cream);color:var(--ink);border-color:var(--cream)}
.t-cream .a-btn-o:hover,.t-khaki .a-btn-o:hover{background:var(--ink);color:var(--cream);border-color:var(--ink)}
@media (max-width:599px){.a-ctas .a-btn{flex:1 1 100%}}
.a-link{display:inline-flex;align-items:center;gap:8px;min-height:44px;font-weight:700;font-size:17px;color:inherit;text-decoration:none;border-bottom:2px solid currentColor;align-self:flex-start}
.a-link:hover{color:inherit;opacity:.75}
.a-ph{position:relative;display:flex;align-items:flex-end;padding:16px;border-radius:20px;overflow:hidden;background:repeating-linear-gradient(135deg,rgba(255,255,255,.035) 0 14px,transparent 14px 28px),var(--olive);color:var(--sand);font-size:14px;line-height:1.35}
.t-cream .a-ph,.t-khaki .a-ph{background:repeating-linear-gradient(135deg,rgba(18,17,12,.05) 0 14px,transparent 14px 28px),var(--sand);color:var(--olive)}

.a-hero{display:grid;gap:36px;align-items:center;padding-top:40px;padding-bottom:64px}
.a-hero .a-ph{aspect-ratio:4/5;max-height:560px}
.a-hero-fr{font-family:Anton,Impact,sans-serif;text-transform:uppercase;font-size:clamp(22px,2.6vw,30px);line-height:1.1;color:var(--y);margin:0}
@media (min-width:960px){.a-hero{grid-template-columns:1.15fr .85fr;gap:64px;padding-top:72px;padding-bottom:104px}}

.a-routes{display:grid;margin-top:36px;border-top:1px solid rgba(18,17,12,.22)}
@media (min-width:760px){.a-routes{grid-template-columns:1fr 1fr;column-gap:40px}}
.a-route{display:flex;align-items:center;gap:18px;padding:24px 0;border-bottom:1px solid rgba(18,17,12,.22);color:inherit;text-decoration:none}
.a-route:hover{color:inherit}
.a-route-t{display:flex;flex-direction:column;gap:6px;flex:1}
.a-route-t b{font:400 clamp(24px,2.6vw,30px)/1.05 Anton,Impact,sans-serif;text-transform:uppercase}
.a-route-t span{font-size:16px;line-height:1.45;color:var(--olive)}
.a-go{width:48px;height:48px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:999px;border:2px solid currentColor;transition:background-color .15s ease,transform .15s ease}
.a-route:hover .a-go{background:var(--y);border-color:var(--y);transform:translateX(3px)}

.a-mani{display:grid;gap:40px}
@media (min-width:960px){.a-mani{grid-template-columns:1fr 1fr;gap:80px;align-items:start}}
.a-steps{display:grid;gap:0;margin-top:8px}
.a-step{display:grid;grid-template-columns:56px 1fr;gap:4px 12px;padding:22px 0;border-top:1px solid rgba(18,17,12,.3)}
.a-step:last-child{border-bottom:1px solid rgba(18,17,12,.3)}
.a-step i{font:400 30px/1 Anton,Impact,sans-serif;font-style:normal;grid-row:span 2}
.a-step b{font:400 26px/1.05 Anton,Impact,sans-serif;text-transform:uppercase}
.a-step span{font-size:16px;line-height:1.5}
.a-strip{display:grid;grid-auto-flow:column;grid-auto-columns:72%;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;margin-top:48px;padding-bottom:6px;scrollbar-width:none}
.a-strip::-webkit-scrollbar{display:none}
.a-strip .a-ph{aspect-ratio:4/5;scroll-snap-align:start}
@media (min-width:760px){.a-strip{grid-auto-flow:row;grid-template-columns:repeat(4,1fr)}}

.a-prod{display:grid;gap:36px}
.a-prod .a-ph{aspect-ratio:1/1}
@media (min-width:960px){.a-prod{grid-template-columns:1fr 1fr;gap:72px;align-items:center}}
.a-tag{display:inline-flex;align-self:flex-start;padding:4px 12px;border-radius:999px;background:var(--y);color:var(--ink);font-weight:700;font-size:14px}
.a-price{font:400 40px/1 Anton,Impact,sans-serif;color:var(--y)}
.a-specs{margin:0;display:grid;border-top:1px solid var(--ink3)}
.a-specs div{display:flex;justify-content:space-between;gap:16px;padding:12px 0;border-bottom:1px solid var(--ink3);font-size:16px}
.a-specs dt{color:var(--mute)}.a-specs dd{margin:0;font-weight:700;text-align:right}
.a-soon{display:flex;flex-wrap:wrap;gap:8px 20px;font-size:15px;color:var(--mute)}
.a-soon b{color:var(--cream);font-weight:700}

.a-tools{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:36px}
@media (min-width:760px){.a-tools{grid-template-columns:repeat(4,1fr);gap:14px}}
.a-toolk{display:flex;flex-direction:column;justify-content:space-between;gap:14px;min-height:132px;padding:18px;border-radius:16px;background:rgba(18,17,12,.06);color:inherit;text-decoration:none;transition:background-color .15s ease}
.a-toolk:hover{background:var(--ink);color:var(--cream)}
.a-toolk b{font-size:18px;line-height:1.2}
.a-toolk span{font-size:14px;line-height:1.4;opacity:.8}

.a-coach{display:grid;gap:32px}
@media (min-width:960px){.a-coach{grid-template-columns:1.3fr .7fr;gap:72px;align-items:end}}
.a-coach-box{display:flex;flex-direction:column;gap:14px;padding:24px;border-radius:20px;background:var(--ink)}
.a-coach-box ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px;font-size:16px}
.a-coach-box li{padding-left:22px;position:relative}
.a-coach-box li::before{content:'';position:absolute;left:2px;top:.55em;width:10px;height:10px;border-radius:999px;background:var(--y)}

.a-list{display:grid;margin-top:32px;border-top:1px solid rgba(18,17,12,.22)}
@media (min-width:960px){.a-list{grid-template-columns:repeat(3,1fr);column-gap:40px;border-top:0}.a-list .a-route{border-top:1px solid rgba(18,17,12,.22);align-items:flex-start}}

.a-ft{padding:64px 0 32px}
.a-ft-top{display:grid;gap:12px;padding-bottom:40px;border-bottom:1px solid var(--ink3)}
.a-ft-claim{font:400 clamp(40px,7vw,80px)/.95 Anton,Impact,sans-serif;text-transform:uppercase;color:#FFFFFF;margin:0}
.a-ft-fr{margin:0;font-size:18px;color:var(--mute)}
.a-ft-cols{display:grid;grid-template-columns:1fr 1fr;gap:28px 20px;padding:36px 0}
@media (min-width:760px){.a-ft-cols{grid-template-columns:repeat(3,1fr)}}
.a-ft-cols h3{margin:0 0 8px;font-size:15px;font-weight:700;color:var(--mute)}
.a-ft-cols a,.a-ft-cols span{display:flex;align-items:center;min-height:40px;color:var(--cream);text-decoration:none;font-size:17px}
.a-ft-cols a:hover{color:var(--y)}
.a-ft-bot{display:flex;flex-wrap:wrap;align-items:center;gap:16px 28px;padding-top:28px;border-top:1px solid var(--ink3);font-size:14px;color:var(--mute)}
.a-ft-bot img{height:64px;width:auto;display:block}
.a-ft-bot nav{display:flex;flex-wrap:wrap;gap:4px 18px}
.a-ft-bot a{color:var(--mute);min-height:40px;display:flex;align-items:center}

.a-tool [style*="text-transform: uppercase"][style*="letter-spacing"]{text-transform:none!important;letter-spacing:.01em!important;font-size:15px!important}
.a-coach-box .a-kick{color:var(--sand)}
@keyframes a-up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
#top .a-rv{animation:a-up .8s cubic-bezier(.2,.7,.2,1) both}
#top .a-rv+.a-rv{animation-delay:.15s}
@media (prefers-reduced-motion:reduce){#top .a-rv{animation:none}}
`;
const RV='';

const HOME='Main.dc.html';
const lk=(page,href)=>{if(href==='/')return page===HOME?'#top':'/';const [f,h]=href.split('#');if(f===HOME)return page===HOME?'#'+h:'/#'+h;if(f===page&&h)return '#'+h;return href};
const header=(page)=>{
  const nav=[['Test.dc.html','Bilan'],['Programme.dc.html','Préparation'],['Outils.dc.html','Outils'],['Suivi.dc.html','Coaching'],[HOME+'#manique','Boutique']];
  return `<header class="a-hd">
<button class="a-ic a-burger" onClick="{{toggleMenu}}" aria-label="Ouvrir le menu" aria-expanded="{{menuOpen}}"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><line x1="4" y1="8" x2="20" y2="8"></line><line x1="4" y1="16" x2="20" y2="16"></line></svg></button>
<a class="a-logo" href="${lk(page,'/')}" aria-label="Alpha Since, accueil"><img src="/img/logo.png" alt="Alpha Since 1982"></a>
<nav class="a-nav" aria-label="Navigation">${nav.map(([h,l])=>`<a href="${lk(page,h)}"${h===page?' aria-current="page"':''}>${l}</a>`).join('')}</nav>
<a class="a-ic a-cart" href="${lk(page,HOME+'#manique')}" aria-label="Boutique">${cartSvg}</a>
</header>
<sc-if value="{{menuOpen}}" hint-placeholder-val="{{ false }}">
<nav class="a-menu" aria-label="Menu principal">
<div class="a-menu-top"><a href="${lk(page,'/')}" onClick="{{closeMenu}}" aria-label="Alpha Since, accueil"><img src="/img/logo-alt.png" alt="Alpha Since 1982"></a><button class="a-ic" onClick="{{closeMenu}}" aria-label="Fermer le menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"></line><line x1="18" y1="6" x2="6" y2="18"></line></svg></button></div>
<ul class="a-menu-list">
${[['Test.dc.html','Bilan physique','7 tests pour savoir d’où tu repars'],['Programme.dc.html','Ma préparation','Un programme à ton vrai niveau'],['Programme.dc.html#nutri','Plan alimentaire','Simple, sans régime'],['Outils.dc.html','Outils gratuits','Charge max, chrono, sommeil, nutrition'],['Suivi.dc.html','Coaching','Un suivi sur WhatsApp, sans engagement'],[HOME+'#manique','La manique','Manique X-Trm Confort, 34,95 €'],[HOME+'#conseils','Conseils','Débuter, grip, progresser'],[HOME+'#quisommesnous','Qui sommes-nous','Pourquoi Alpha existe']].map(([h,b,s])=>`<li><a href="${lk(page,h)}" onClick="{{closeMenu}}"><b>${b}</b><span>${s}</span></a></li>`).join('\n')}
</ul>
<div class="a-menu-legal"><a href="#mentions">Mentions légales</a><a href="#cgv">CGV</a><a href="#confidentialite">Confidentialité</a></div>
</nav>
</sc-if>
`;};
const footer=(page)=>`<footer class="a-ft t-ink" id="contact">
<div class="a-wrap">
<div class="a-ft-top"><p class="a-ft-claim">Be ready<br>where it all <span class="a-y">begins.</span></p><p class="a-ft-fr">Prêt là où tout commence. Et là où tout recommence.</p></div>
<div class="a-ft-cols">
<div><h3>S’entraîner</h3><a href="${lk(page,'Test.dc.html')}">Bilan physique</a><a href="${lk(page,'Programme.dc.html')}">Ma préparation</a><a href="${lk(page,'Programme.dc.html#nutri')}">Plan alimentaire</a><a href="${lk(page,'Outils.dc.html')}">Outils gratuits</a></div>
<div><h3>Alpha</h3><a href="${lk(page,HOME+'#manique')}">La manique</a><a href="${lk(page,'Suivi.dc.html')}">Coaching</a><a href="${lk(page,HOME+'#conseils')}">Conseils</a><a href="${lk(page,HOME+'#quisommesnous')}">Qui sommes-nous</a></div>
<div><h3>Contact</h3><span>[EMAIL DE CONTACT]</span><span>[INSTAGRAM]</span></div>
</div>
<div class="a-ft-bot"><img src="/img/logo-alt.png" alt="Alpha Since 1982"><span>Les estimations des outils ne remplacent pas l’avis d’un coach ou d’un médecin.</span><nav><a href="#mentions">Mentions légales</a><a href="#cgv">CGV</a><a href="#confidentialite">Confidentialité</a></nav></div>
</div>
</footer>
`;

const route=(href,t,s)=>`<a class="a-route" href="${href}"><span class="a-route-t"><b>${t}</b><span>${s}</span></span><span class="a-go">${arrow}</span></a>`;
const tool=(href,t,s)=>`<a class="a-toolk" href="${href}"><b>${t}</b><span>${s}</span></a>`;
const P=HOME;
const homeBody=`<div class="a-root a-home t-cream">
${header(P)}<section id="top" class="t-ink">
<div class="a-wrap a-hero">
<div class="a-stack a-rv">
<h1 class="a-h1">Be ready where it all <span class="a-y">begins.</span></h1>
<p class="a-hero-fr">Prêt là où tout commence.<br>Et là où tout recommence.</p>
<p class="a-lead">Une blessure, un nouveau boulot, un bébé, un hiver loin de la salle. Personne ne progresse en ligne droite. Alpha t’équipe et te guide à chaque reprise.</p>
<div class="a-ctas"><a class="a-btn a-btn-y" href="Test.dc.html">Faire mon bilan gratuit</a><a class="a-btn a-btn-o" href="#manique">Voir la manique</a></div>
</div>
<div class="a-ph a-rv">[PHOTO : main avec la manique sur un disque jaune]</div>
</div>
</section>
<section id="acces" class="a-sec t-cream">
<div class="a-wrap">
<div class="a-stack a-rv"><h2 class="a-h2">Tu repars d’où ?</h2><p class="a-lead">Chaque reprise a son point de départ. Choisis le tien.</p></div>
<div class="a-routes a-rv">
${route('Test.dc.html','Je reprends après une pause','Sept tests simples pour savoir où tu en es vraiment. Gratuit, 30 minutes.')}
${route('Programme.dc.html','J’ai un objectif','Semi, trail, force, muscle : un programme à ton niveau d’aujourd’hui, avec un délai honnête.')}
${route('Programme.dc.html#nutri','Je veux mieux manger','Tes besoins en protéines, en calories et en eau, et une journée type. Sans régime.')}
${route('Suivi.dc.html','Je veux être suivi','Un coach sur WhatsApp, chaque semaine ou chaque mois. Sans engagement.')}
</div>
</div>
</section>
<section id="quisommesnous" class="a-sec t-khaki">
<div class="a-wrap">
<div class="a-mani">
<div class="a-stack a-rv">
<h2 class="a-h2">On ne commence qu’une fois. On recommence toute sa vie.</h2>
<p class="a-lead">Le sport, c’est une suite de reprises. Après une entorse, après un déménagement, après des mois où le travail et la famille passent avant. À chaque fois, il faut retrouver le chemin de la salle, sans se juger.</p>
<p class="a-p">Alpha est né de là. Comme le phénix de notre logo : on tombe, on se relève, on repart.</p>
</div>
<div class="a-steps a-rv">
<div class="a-step"><i>01</i><b>Commencer</b><span>Un bilan honnête et un plan à ton niveau. Pas à celui que tu avais il y a trois ans.</span></div>
<div class="a-step"><i>02</i><b>Tenir</b><span>Des séances calées dans l’agenda, un chrono qui décide pour toi, et un coach si tu en as besoin.</span></div>
<div class="a-step"><i>03</i><b>Recommencer</b><span>Après la coupure, on repart d’où tu es. Pas de culpabilité : juste la prochaine séance.</span></div>
</div>
</div>
<div class="a-strip a-rv">
<div class="a-ph">[PHOTO : paume ouverte]</div><div class="a-ph">[PHOTO : banc de développé couché]</div><div class="a-ph">[PHOTO : barre de traction]</div><div class="a-ph">[PHOTO : gourde et serviette]</div>
</div>
</div>
</section>
<section id="manique" class="a-sec t-ink">
<div class="a-wrap a-prod">
<div class="a-ph a-rv">[PHOTO PRODUIT : la manique kaki « Be ready where it all begins » sur fond sombre]</div>
<div class="a-stack a-rv">
<span class="a-tag">Nouveau</span>
<h2 class="a-h2">Manique X-Trm Confort</h2>
<span class="a-price">34,95 €</span>
<p class="a-lead">Le grip des mains nues, sans les ampoules. Tu sens la barre, tu oublies tes mains.</p>
<dl class="a-specs"><div><dt>Usage</dt><dd>Musculation, crossfit, tractions</dd></div><div><dt>Matière</dt><dd>Cuir retourné et néoprène</dd></div><div><dt>Dimensions</dt><dd>[DIMENSIONS]</dd></div><div><dt>Vendu</dt><dd>Par paire</dd></div></dl>
<div class="a-ctas"><a class="a-btn a-btn-y" href="#acheter">Acheter ${cartSvg}</a><a class="a-btn a-btn-o" href="#video">Comment la placer</a></div>
<p class="a-soon" id="video"><span>[VIDÉO 20 s : comment placer la manique]</span></p>
<p class="a-soon"><span>Bientôt :</span><b>Sangle de tirage Confort-Grip</b><b>Poignet de force X-Trm</b></p>
</div>
</div>
</section>
<section id="outils" class="a-sec t-cream">
<div class="a-wrap">
<div class="a-stack a-rv"><h2 class="a-h2">Les outils</h2><p class="a-lead">Gratuits, sans inscription. À ouvrir entre deux séries.</p></div>
<div class="a-tools a-rv">
${tool('Outils.dc.html#outils','Charge max','Ton 1RM estimé, sans le tenter.')}
${tool('Outils.dc.html#outils','Disques','Quoi mettre de chaque côté.')}
${tool('Outils.dc.html#outils','Chrono','Travail, repos, séries.')}
${tool('Outils.dc.html#recuperer','Routine souplesse','10 minutes guidées.')}
${tool('Outils.dc.html#sommeil','Audit sommeil','5 questions, des conseils.')}
${tool('Outils.dc.html#quiz','Quiz nutrition','Qui est qui dans ton assiette.')}
${tool('Outils.dc.html#manger','Hydratation','Combien boire, et quand.')}
${tool('Outils.dc.html#manger','Compléments','Ce qui marche vraiment.')}
</div>
<div style="margin-top:28px"><a class="a-link" href="Outils.dc.html">Tous les outils ${arrow}</a></div>
</div>
</section>
<section id="suivi" class="a-sec t-olive">
<div class="a-wrap a-coach">
<div class="a-stack a-rv">
<h2 class="a-h2">La motivation te fait commencer. <span class="a-y">Le suivi te fait revenir.</span></h2>
<p class="a-lead">Un coach qui connaît ton histoire, tes contraintes et tes reprises. Il ajuste ton programme quand la vie déborde.</p>
</div>
<div class="a-coach-box a-rv">
<span class="a-kick">À partir de</span>
<span class="a-price">69 € / mois</span>
<ul><li>Sport seul, ou sport et diététique</li><li>Échanges sur WhatsApp, appel en option</li><li>Sans engagement, résiliable en 3 clics</li></ul>
<a class="a-btn a-btn-y" href="Suivi.dc.html">Voir les formules</a>
</div>
</div>
</section>
<section id="conseils" class="a-sec t-cream">
<div class="a-wrap">
<div class="a-stack a-rv"><h2 class="a-h2">Conseils</h2></div>
<div class="a-list a-rv">
${route('#conseils','Ta première séance','Échauffement, choix des charges, et ce qu’on ne fait jamais le premier jour.')}
${route('#conseils','Ampoules et callosités','Pourquoi elles apparaissent, et comment tenir la barre sans t’abîmer les mains.')}
${route('#conseils','Ta première traction','Les exercices qui y mènent, dans l’ordre, sans brûler les étapes.')}
</div>
</div>
</section>
${footer(P)}</div>
`;

const page=(n,kind)=>{
  let s=T[n];
  s=one(s,/<style>#dc-root \.sc-host[^<]*<\/style>/.exec(s)[0],'<style>'+CSS+'</style>'+RV,'css '+n);
  const a=s.indexOf('</helmet>\n')+10,z=s.lastIndexOf('</x-dc>');
  let b=s.slice(a,z);
  if(kind==='home'){s=s.slice(0,a)+homeBody+s.slice(z);T[n]=s;return}
  const m=/^<div style="width: 390px; min-height: 100vh;[^"]*overflow: hidden">/.exec(b);if(!m)throw new Error('ROOT '+n);
  const bg=/background: ([^;]+);/.exec(m[0])[1],fg=/color: ([^;]+);/.exec(m[0])[1];
  b=`<div class="a-root a-tool" style="background: ${bg}; color: ${fg}">`+b.slice(m[0].length);
  const h0=b.indexOf('<header'),mi=b.indexOf('<sc-if value="{{menuOpen}}"'),h1=b.indexOf('</nav>\n</sc-if>\n',mi)+16;
  if(h0<0||mi<0||h1<16)throw new Error('HDR '+n);
  b=b.slice(0,h0)+header(n)+b.slice(h1);
  if(n==='Suivi.dc.html'){b=one(b,'<footer style="flex-grow: 1;','<section style="','sf'+n);b=one(b,'</footer>','</section>','sf2')}
  else if(b.includes('<footer')){const f0=b.indexOf('<footer'),f1=b.indexOf('</footer>')+10;b=b.slice(0,f0)+b.slice(f1)}
  const e=b.lastIndexOf('</div>');b=b.slice(0,e)+footer(n)+b.slice(e);
  // solid titles instead of outlined ones
  b=b.replace(/font-size: \d+px; line-height: 0\.98; text-transform: uppercase; color: transparent; -webkit-text-stroke: [\d.]+px #[0-9A-Fa-f]+/g,'font-size: clamp(48px, 9vw, 84px); line-height: 0.94; text-transform: uppercase; color: inherit');
  T[n]=s.slice(0,a)+b+s.slice(z);
};
page(HOME,'home');
for(const n of ['Outils.dc.html','Programme.dc.html','Test.dc.html','Suivi.dc.html'])page(n,'tool');

// copy on tool pages
const K=(t)=>new RegExp('<div style="font-size: 14px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #F2E415">'+t+'</div>\\n');
const drop=(n,t)=>{const r=K(t);if(!r.test(T[n]))throw new Error('KICK '+t);T[n]=T[n].replace(r,'')};
drop('Programme.dc.html','Outil Alpha · Multisport');
drop('Test.dc.html','Bilan physique · 7 tests reconnus');
drop('Suivi.dc.html','Suivi personnalisé · Sans engagement');
drop('Outils.dc.html','Outils Alpha · gratuits');
const rep=(n,a,b)=>{T[n]=one(T[n],a,b,'rep '+n+' '+a.slice(0,30))};
rep('Programme.dc.html','>Crée ta préparation</h1>','>Ta préparation</h1>');
rep('Programme.dc.html','Semi, marathon, trail, muscle, explosivité ou force pure : on part de là où tu es vraiment, pas de là où tu aimerais être. Et on te dit honnêtement combien de temps il faudra.','Semi, marathon, trail, muscle, force, ou simplement retrouver la forme. On part de ton niveau d’aujourd’hui, pas de celui d’avant la coupure. Et on te donne un délai honnête.');
rep('Test.dc.html','>Où tu en es vraiment</h1>','>D’où tu repars</h1>');
rep('Test.dc.html','Endurance, cœur, force, gainage, jambes, explosivité et souplesse. Des tests utilisés par les préparateurs physiques, avec des barèmes selon ton âge et ton sexe. Pas de jugement : juste une photo de départ.','Sept tests utilisés par les préparateurs physiques, avec des barèmes selon ton âge et ton sexe. Ce n’est pas une note. C’est ton point de départ, pour mesurer le chemin ensuite.');
rep('Suivi.dc.html','>Ton coach dans la poche</h1>','>Un coach pour chaque reprise</h1>');
rep('Suivi.dc.html',"Un programme, c'est bien. Quelqu'un qui te suit, t'ajuste et t'aide à tenir ta discipline quand il pleut un mardi soir, c'est mieux.","Un programme, c’est bien. Quelqu’un qui te suit, ajuste quand la vie déborde et t’aide à revenir après une coupure, c’est mieux.");
rep('Outils.dc.html','>La boîte à outils</h1>','>Les outils</h1>');
rep('Outils.dc.html','Pour t’entraîner, récupérer et manger mieux. Sans inscription, sans carte bancaire.','Pour t’entraîner, récupérer et manger mieux. Gratuits, sans inscription.');

for(const t of ["Pilier 1 · S'entraîner",'Pilier 2 · Récupérer','Pilier 3 · Bien manger','Les outils','Nouveau · Multisport','Le pilier oublié']){
  const esc=t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const r=new RegExp('<(div|span) style="[^"]*letter-spacing: [\\d.]+px; text-transform: uppercase[^"]*">'+esc+'</\\1>\\n?');
  if(!r.test(T['Outils.dc.html']))throw new Error('K2 '+t);T['Outils.dc.html']=T['Outils.dc.html'].replace(r,'');
}
for(const n in T){T[n]=T[n].replace('<title>Alpha Since — Accueil','<title>Alpha Since — Be ready where it all begins')}
};
