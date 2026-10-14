// Bilan Alpha : une seule page /bilan remplace le bilan (7 tests), la préparation et le plan alimentaire.
module.exports=function(T){
const fs=require('fs');
const B='https://alpha-since.vercel.app';
const C='Conseils.html',H='Main.dc.html',O='Outils.dc.html',S='Suivi.dc.html',L='Legal.html';
const HTML=()=>Object.keys(T).filter(n=>n.endsWith('.html'));
const R=(n,a,b)=>{if(T[n].split(a).length<2)throw new Error('BP '+n+' :: '+a.slice(0,60));T[n]=T[n].split(a).join(b)};

// 1. Les anciennes pages disparaissent
delete T['Test.dc.html'];delete T['Programme.dc.html'];

// 2. Liens, menus et pieds de page, partout
for(const n of HTML()){
  let s=T[n];
  s=s.replace(/<a href="\/preparation"( aria-current="page")?>Préparation<\/a>/g,'');
  s=s.replace(/<li><a href="\/preparation"[^>]*><b>Préparation<\/b><span>[^<]*<\/span><\/a><\/li>\n?/g,'');
  s=s.replace(/<li><a href="\/preparation#nutri"[^>]*><b>Plan alimentaire<\/b><span>[^<]*<\/span><\/a><\/li>\n?/g,'');
  s=s.split('<b>Bilan</b><span>7 tests pour savoir d’où tu repars</span>').join('<b>Bilan Alpha</b><span>Ton profil, ton programme, ton assiette</span>');
  s=s.split('<a href="/bilan">Bilan physique</a><a href="/preparation">Ma préparation</a><a href="/preparation#nutri">Plan alimentaire</a>').join('<a href="/bilan">Bilan Alpha</a>');
  s=s.split('href="/preparation#nutri"').join('href="/bilan"').split('href="/preparation"').join('href="/bilan"');
  if(/\/preparation(?![\w-])/.test(s.replace(/<script type="text\/x-dc"[\s\S]*$/,'')))throw new Error('BP link left '+n);
  T[n]=s;
}

// 3. Accueil : une seule porte d'entrée
{
  const i=T[H].indexOf('<section id="acces"'),j=T[H].indexOf('</section>',i)+10;if(i<0)throw new Error('BP acces');
  const arrow='<span class="a-go"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="13 6 19 12 13 18"></polyline></svg></span>';
  const sec='<section id="acces" class="a-sec t-cream">\n<div class="a-wrap">\n<div class="a-stack"><p class="a-kick">Gratuit · 5 minutes · sans inscription</p><h2 class="a-h2">Tu repars d’où ?</h2><p class="a-lead">Un seul bilan, le même pour tout le monde. Que tu sortes de dix ans de foot ou que tu n’aies jamais fait de sport, tu sais où tu en es et quoi faire.</p></div>\n'+
  '<a class="a-feat" href="/bilan"><i class="a-meta">Le Bilan Alpha</i><b>Ton profil, ton programme, ton assiette</b><span>Ton histoire sportive, trois tests simples et ton objectif. À la fin : ta condition physique, ton niveau en salle, tes 3 priorités et ta semaine d’entraînement, expliquée avec des mots simples.</span><em>Faire mon bilan</em></a>\n'+
  '<div class="a-list a-list1"><a class="a-route" href="/coaching"><span class="a-route-t"><b>Je veux être suivi</b><span>Un coach qui part de ton bilan et ajuste ton programme. Sans engagement.</span></span>'+arrow+'</a></div>\n</div>\n</section>';
  T[H]=T[H].slice(0,i)+sec+T[H].slice(j);
  R(H,'<b>Audit sommeil</b>','<b>Quiz sommeil</b>');
}

// 4. Outils et coaching : les anciens « audits » renvoient au bilan unique
R(O,'Crée ta préparation physique','Fais ton Bilan Alpha');
R(O,'Audit, test express, objectif (semi, marathon, trail, muscle, explosivité, force) et un avis honnête sur le temps qu\'il te faudra.','Ton histoire sportive, trois tests simples et ton objectif. À la fin : ton profil, tes priorités et ta semaine d\'entraînement.');
R(O,'>Commencer mon audit<','>Commencer mon bilan<');
R(O,'Mini-audit sommeil · 5 questions','Quiz sommeil · 5 questions');
R(O,'>Audit alimentaire<','>Bilan Alpha<');
R(O,'Ton plan alimentaire sur mesure','Tes repères pour l\'assiette');
R(O,'Un audit honnête de tes habitudes, tes besoins en protéines, en calories et en eau, et une journée type. Juste après ton audit de préparation.','Tes besoins en protéines, en calories et en eau, calculés à partir de ton bilan.');
R(O,'>Faire mon audit →<','>Faire mon bilan →<');
T[O]=T[O].split('audit sommeil, nutrition').join('quiz sommeil, nutrition');
R(S,'Commence par l\'audit gratuit. Ton programme t\'attend, sans carte bancaire.','Commence par le Bilan Alpha, gratuit. Ton programme t\'attend, sans carte bancaire.');
R(S,'>Faire mon audit gratuit<','>Faire mon bilan gratuit<');
R(L,'Les réponses saisies dans le bilan physique, l’audit de préparation, l’audit alimentaire, l’audit sommeil et les calculateurs (âge, taille, poids, résultats)','Le Bilan Alpha garde tes réponses dans ton navigateur pour que tu les retrouves : elles ne quittent ton appareil que si tu choisis d’envoyer ton résumé par e-mail. Les réponses saisies dans le Bilan Alpha, les quiz et les calculateurs (âge, taille, poids, passé sportif, habitudes, résultats)');

// 5. La page /bilan, dans la même coquille que les autres pages
{
  const P=T[C];
  const iH=P.indexOf('<section class="a-sec t-ink a-pghead">'),iF=P.indexOf('<footer class="a-ft');if(iH<0||iF<0)throw new Error('BP shell');
  let head=P.slice(0,iH);
  const rep=(re,v,n)=>{if(!re.test(head))throw new Error('BP head '+n);head=head.replace(re,()=>v)};
  const title='Bilan Alpha — Alpha Since',desc='Un seul bilan, le même pour tous : ton profil, tes 3 priorités, ta semaine d’entraînement et tes repères pour l’assiette. Gratuit, 5 minutes.';
  rep(/<title>[^<]*<\/title>/,'<title>'+title+'</title>','title');
  rep(/<meta name="description" content="[^"]*">/,'<meta name="description" content="'+desc+'">','desc');
  rep(/<meta property="og:title" content="[^"]*">/,'<meta property="og:title" content="'+title+'">','ogt');
  rep(/<meta property="og:description" content="[^"]*">/,'<meta property="og:description" content="'+desc+'">','ogd');
  rep(/<meta property="og:url" content="[^"]*">\n<link rel="canonical" href="[^"]*">/,'<meta property="og:url" content="'+B+'/bilan">\n<link rel="canonical" href="'+B+'/bilan">','ogu');
  rep(/<a href="\/bilan">Bilan<\/a>/,'<a href="/bilan" aria-current="page">Bilan</a>','nav');
  rep(/<a href="\/conseils" aria-current="page">Conseils<\/a>/,'<a href="/conseils">Conseils</a>','nav2');
  rep(/<script src="\/site\.js" defer><\/script>/,'<script src="/site.js" defer></script>\n<script src="/bilan-app.js" defer></script>','js');
  const body='<section class="a-sec t-ink a-pghead">\n<div class="a-wrap a-narrow">\n<p class="a-kick a-crumb">Gratuit · 5 minutes · sans inscription</p>\n<h1 class="a-h1 a-h1-sm">Bilan Alpha</h1>\n<p class="a-lead">Où tu en es, et quoi faire maintenant.</p>\n</div>\n</section>\n'+
   '<section class="a-sec t-cream b-sec">\n<div class="a-wrap a-narrow" id="bilan"><noscript><p>Le bilan a besoin de JavaScript pour fonctionner.</p></noscript></div>\n</section>\n';
  T['Bilan.html']=head+body+P.slice(iF);
  T['bilan-app.js']=fs.readFileSync(__dirname+'/bilan-app.js','utf8');
}

// 6. Styles
T['site.css']+=`
.b-sec{padding-top:40px}
#bilan{display:flex;flex-direction:column;gap:20px}
#bilan p{margin:0}
.b-prog{display:flex;flex-direction:column;gap:8px;font-size:14px;font-weight:700;color:var(--olive)}
.b-prog i{display:block;height:6px;border-radius:99px;background:rgba(18,17,12,.15);overflow:hidden}
.b-prog u{display:block;height:100%;background:var(--ink);border-radius:99px}
.b-q{border:0;padding:0;margin:8px 0 0;display:flex;flex-direction:column;gap:10px;min-width:0}
.b-q legend{padding:0;font-weight:700;font-size:19px;line-height:1.3;margin-bottom:8px}
.b-q legend i{font-style:normal;font-weight:400;font-size:14px;color:var(--olive)}
.b-bad{outline:2px solid #B3261E;outline-offset:10px;border-radius:8px}
.b-help{font-size:15px;line-height:1.5;color:var(--olive)}
.b-opts{display:grid;gap:8px}
.b-row{grid-template-columns:repeat(auto-fit,minmax(72px,1fr))}
.b-opt{display:flex;flex-direction:column;gap:2px;align-items:flex-start;text-align:left;min-height:52px;justify-content:center;padding:10px 16px;border:2px solid var(--ink);border-radius:14px;background:transparent;color:var(--ink);font:inherit;font-size:17px;cursor:pointer}
.b-row .b-opt{align-items:center;text-align:center;padding:10px 6px}
.b-opt b{font-weight:700}
.b-opt span{font-size:14px;opacity:.75}
.b-opt[aria-pressed="true"]{background:var(--ink);color:var(--cream)}
.b-num{display:flex;align-items:center;gap:12px}
.b-num input{width:140px;min-height:52px;padding:0 14px;border:2px solid var(--ink);border-radius:14px;background:#fff;color:var(--ink);font:inherit;font-size:20px;font-weight:700}
.b-num span{font-weight:700}
.b-more{display:flex;flex-direction:column;gap:4px;margin-top:20px;padding-top:20px;border-top:1px solid rgba(18,17,12,.25)}
.b-more b{font:400 24px/1.1 Anton,Impact,sans-serif;text-transform:uppercase}
.b-more span{font-size:15px;color:var(--olive)}
.b-err{color:#B3261E;font-weight:700}
.b-nav{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}
.b-nav .a-btn{border:2px solid transparent;cursor:pointer;font:inherit;font-weight:700}
.b-nav .a-btn-o{border-color:currentColor;background:transparent}
.b-steps{margin:0;padding-left:22px;display:flex;flex-direction:column;gap:6px;font-size:17px}
.b-get,.b-card{padding:22px;border-radius:18px;background:var(--ink);color:var(--cream);display:flex;flex-direction:column;gap:12px}
.b-get ul{margin:0;padding-left:20px;display:flex;flex-direction:column;gap:6px}
.b-intro{display:flex;flex-direction:column;gap:20px}
.b-profile .a-kick{color:var(--y)}
.b-profile .a-h2{color:var(--cream)}
.b-axes{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:4px}
.b-axes div{display:flex;flex-direction:column;gap:6px}
.b-axes span{font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;opacity:.7}
.b-axes b{font:400 22px/1.1 Anton,Impact,sans-serif;text-transform:uppercase;color:var(--y)}
.b-bar{display:flex;gap:4px}
.b-bar u{flex:1;height:8px;border-radius:99px;background:rgba(128,124,58,.35);max-width:40px;min-width:14px}
.b-bar u.on{background:var(--y)}
.b-rows .b-bar u{background:rgba(18,17,12,.15)}
.b-rows .b-bar u.on{background:var(--ink)}
.b-code{font-size:14px;font-weight:700;padding-top:12px;border-top:1px solid rgba(228,225,184,.25)}
.b-h{font:400 clamp(26px,3.4vw,34px)/1.1 Anton,Impact,sans-serif;text-transform:uppercase;margin:28px 0 0}
.b-prio{margin:0;padding-left:24px;display:flex;flex-direction:column;gap:14px}
.b-prio li::marker{font-weight:700}
.b-prio b,.b-prio span{display:block}
.b-prio b{font-size:18px}
.b-rows{display:grid;border-top:1px solid rgba(18,17,12,.25)}
.b-rows>div{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid rgba(18,17,12,.25)}
.b-rows span{display:flex;flex-direction:column;gap:4px;font-size:15px}
.b-rows span:last-child{align-items:flex-end}
.b-rows b{font-size:17px}
.b-rows em{font-style:normal;font-weight:700;font-size:14px}
.b-sess{border:2px solid var(--ink);border-radius:16px;padding:0 18px}
.b-sess summary{display:flex;flex-direction:column;gap:2px;padding:16px 0;cursor:pointer;list-style:none}
.b-sess summary::-webkit-details-marker{display:none}
.b-sess summary span{font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--olive)}
.b-sess summary b{font:400 24px/1.1 Anton,Impact,sans-serif;text-transform:uppercase}
.b-sess[open]{padding-bottom:18px}
.b-sess>*+*{margin-top:12px!important}
.b-sess ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}
.b-sess li{display:flex;flex-direction:column;gap:2px;padding:12px 0;border-top:1px solid rgba(18,17,12,.2)}
.b-sess li b{font-size:17px}
.b-sess li em{font-style:normal;font-weight:700}
.b-sess li span{font-size:15px;color:var(--olive)}
.b-notes{margin:0;padding-left:20px;display:flex;flex-direction:column;gap:6px;font-size:15px}
.b-phases{display:grid;gap:10px}
.b-phases div{display:flex;flex-direction:column;gap:2px;padding:14px 16px;border-radius:14px;background:rgba(18,17,12,.07)}
.b-phases span{font-size:13px;font-weight:700;text-transform:uppercase;color:var(--olive)}
.b-phases em{font-style:normal;font-size:15px}
.b-stats{display:grid;gap:10px}
.b-stats div{display:flex;align-items:baseline;gap:12px;padding:14px 16px;border-radius:14px;background:var(--ink);color:var(--cream)}
.b-stats b{font:400 30px/1 Anton,Impact,sans-serif;color:var(--y);white-space:nowrap}
.b-stats span{font-size:15px}
.b-share{margin-top:28px}
.b-share h3{margin:0;font:400 26px/1.1 Anton,Impact,sans-serif;text-transform:uppercase}
.b-share pre{margin:0;padding:14px;border-radius:12px;background:rgba(228,225,184,.1);font:14px/1.5 ui-monospace,Menlo,monospace;white-space:pre-wrap;overflow-wrap:anywhere}
.b-share .b-help{color:var(--y)}
.b-lex{border-top:1px solid rgba(18,17,12,.25);padding-top:16px}
.b-lex summary{font-weight:700;cursor:pointer;min-height:44px;display:flex;align-items:center}
.b-lex dl{margin:8px 0 0;display:grid;gap:10px}
.b-lex dt{font-weight:700}
.b-lex dd{margin:0;font-size:15px}
.b-warn{border:2px solid #B3261E;background:transparent}
@media (min-width:700px){.b-phases,.b-stats{grid-template-columns:repeat(3,1fr)}.b-stats div{flex-direction:column;gap:6px}}
`;

// 7. Sitemap
T['sitemap.xml']=T['sitemap.xml'].replace('<url><loc>'+B+'/preparation</loc></url>\n','');
if(/\/preparation<\/loc>/.test(T['sitemap.xml']))throw new Error('BP sitemap');
};
