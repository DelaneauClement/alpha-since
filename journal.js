// Journal (Conseils) : une page par article, index /conseils, bloc accueil, sitemap.
// Un article n'est publié que si sa date (dimanche 20 h, heure de Paris) est passée au moment du build.
module.exports=function(T,NOW){
const B='https://alpha-since.vercel.app';
const C='Conseils.html',H='Main.dc.html';
const MOIS=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
const frDate=d=>{const [y,m,j]=d.slice(0,10).split('-').map(Number);return j+(j===1?'er':'')+' '+MOIS[m-1]+' '+y};
const esc=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const ARROW='<span class="a-go"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="13 6 19 12 13 18"></polyline></svg></span>';
const need=(s,a,n)=>{const i=s.indexOf(a);if(i<0)throw new Error('J :: '+n);return i};

// 1. Coquille (en-tête, pied de page) et anciens articles tirés de la page Conseils finale
const P=T[C];
const iHead=need(P,'<section class="a-sec t-ink a-pghead">','head');
const iTail=need(P,'<section class="a-sec t-ink">\n<div class="a-wrap a-narrow a-stack">\n<p class="a-note">','tail');
const HEAD=P.slice(0,iHead),TAIL=P.slice(iTail);
const LEG={'premiere-seance':['premiere-seance','2026-09-13T20:00:00+02:00','Débuter','Échauffement, choix des charges, et ce qu’on ne fait jamais le premier jour.'],
 'ampoules':['ampoules-callosites','2026-09-20T20:00:00+02:00','Mains et grip','Pourquoi elles apparaissent, et comment tenir la barre sans t’abîmer les mains.'],
 'traction':['premiere-traction','2026-09-27T20:00:00+02:00','Progresser','Les exercices qui mènent à ta première traction, dans l’ordre, sans brûler les étapes.']};
const legacy=[];
for(const m of P.matchAll(/<article id="([^"]+)" class="a-sec t-[a-z]+ a-art">\n<div class="a-wrap a-narrow">\n<p class="a-kick">[^<]*?(\d+) min de lecture<\/p>\n<h2 class="a-h2">([^<]+)<\/h2>\n<p class="a-lead">([^<]+)<\/p>\n([\s\S]*?)\n<\/div>\n<\/article>/g)){
  const L=LEG[m[1]];if(!L)throw new Error('J legacy '+m[1]);
  legacy.push({slug:L[0],old:m[1],date:L[1],cat:L[2],read:+m[2],title:m[3],lead:m[4],desc:L[3],body:m[5].replace(/<p class="a-cta-line">[\s\S]*?<\/p>\s*$/,'').trim(),cta:(m[5].match(/<p class="a-cta-line"><a class="a-btn a-btn-y" href="([^"]+)">([^<]+)<\/a><\/p>/)||[]).slice(1),sources:[]});
}
if(legacy.length!==3)throw new Error('J legacy count '+legacy.length);
const ALL=[...legacy,...require('./art1.js'),...require('./art2.js'),...require('./art3.js')];
const seen=new Set();for(const a of ALL){if(seen.has(a.slug))throw new Error('J dup '+a.slug);seen.add(a.slug);if(isNaN(Date.parse(a.date)))throw new Error('J date '+a.slug)}
const PUB=ALL.filter(a=>Date.parse(a.date)<=NOW).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
const NEXT=ALL.filter(a=>Date.parse(a.date)>NOW).sort((a,b)=>Date.parse(a.date)-Date.parse(b.date))[0];
const url=a=>'/conseils/'+a.slug;
const kick=a=>esc(a.cat)+' · '+frDate(a.date)+' · '+a.read+' min';

// 2. <head> propre à chaque page
function head(title,desc,path,type,ld){
  let h=HEAD;
  const rep=(re,v,n)=>{if(!re.test(h))throw new Error('J head '+n);h=h.replace(re,()=>v)};
  rep(/<title>[^<]*<\/title>/,'<title>'+esc(title)+'</title>','title');
  rep(/<meta name="description" content="[^"]*">/,'<meta name="description" content="'+esc(desc)+'">','desc');
  rep(/<meta property="og:title" content="[^"]*">/,'<meta property="og:title" content="'+esc(title)+'">','ogt');
  rep(/<meta property="og:description" content="[^"]*">/,'<meta property="og:description" content="'+esc(desc)+'">','ogd');
  rep(/<meta property="og:url" content="[^"]*">/,'<meta property="og:url" content="'+B+path+'">\n<link rel="canonical" href="'+B+path+'">','ogu');
  rep(/<meta property="og:type" content="[^"]*">/,'<meta property="og:type" content="'+type+'">','ogtype');
  if(ld)h=h.replace('</head>',()=>'<script type="application/ld+json">'+JSON.stringify(ld).replace(/</g,'\\u003c')+'</script>\n</head>');
  return h;
}
const card=a=>'<a class="a-route" href="'+url(a)+'"><span class="a-route-t"><i class="a-meta">'+kick(a)+'</i><b>'+esc(a.title)+'</b><span>'+esc(a.desc)+'</span></span>'+ARROW+'</a>';
const nextLine=NEXT?'<p class="a-next">Prochain article : dimanche '+frDate(NEXT.date).replace(/ \d{4}$/,'')+', 20 h.</p>':'';

// 3. Pages article
for(const a of PUB){
  const others=PUB.filter(x=>x!==a).slice(0,2);
  const ld={'@context':'https://schema.org','@type':'Article',headline:a.title,description:a.desc,datePublished:a.date,dateModified:a.date,inLanguage:'fr-FR',mainEntityOfPage:B+url(a),image:B+'/img/logo.png',author:{'@type':'Person',name:'Clément',jobTitle:'Fondateur d’Alpha Since'},publisher:{'@type':'Organization',name:'Alpha Since 1982',logo:{'@type':'ImageObject',url:B+'/img/logo.png'}}};
  const src=a.sources&&a.sources.length?'\n<h3>Sources</h3>\n<ul class="a-src">'+a.sources.map(s=>'<li>'+s+'</li>').join('')+'</ul>':'';
  const cta=a.cta&&a.cta.length?'\n<p class="a-cta-line"><a class="a-btn a-btn-y" href="'+a.cta[0]+'">'+a.cta[1]+'</a></p>':'';
  const body='<section class="a-sec t-ink a-pghead">\n<div class="a-wrap a-narrow">\n<p class="a-kick a-crumb"><a href="/conseils">Conseils</a> · '+kick(a)+'</p>\n<h1 class="a-h1 a-h1-art">'+esc(a.title)+'</h1>\n<p class="a-lead">'+esc(a.lead)+'</p>\n</div>\n</section>\n\n<article class="a-sec t-cream a-art">\n<div class="a-wrap a-narrow">\n'+a.body+src+cta+'\n</div>\n</article>\n'+
   (others.length?'\n<section class="a-sec t-khaki">\n<div class="a-wrap">\n<h2 class="a-h2">À lire aussi</h2>\n<div class="a-list a-list2">'+others.map(card).join('\n')+'</div>\n<p class="a-cta-line"><a class="a-btn a-btn-o a-btn-ink" href="/conseils">Tous les conseils</a></p>\n</div>\n</section>\n':'');
  T['conseils/'+a.slug+'.html']=head(a.title+' — Alpha Since',a.desc,url(a),'article',ld)+body+'\n'+TAIL;
}

// 4. Index /conseils
{
  const [f,...rest]=PUB;
  const redirect='<script>(function(){var m='+JSON.stringify(Object.fromEntries(legacy.map(a=>[a.old,url(a)])))+',h=location.hash.slice(1);if(m[h])location.replace(m[h])})()</script>';
  const body='<section class="a-sec t-ink a-pghead">\n<div class="a-wrap a-narrow">\n<h1 class="a-h1 a-h1-sm">Conseils</h1>\n<p class="a-lead">S’entraîner, récupérer, reprendre après une pause. Un nouvel article chaque dimanche à 20 h.</p>\n'+nextLine+'\n</div>\n</section>\n'+
   '<section class="a-sec t-cream">\n<div class="a-wrap">\n<a class="a-feat" href="'+url(f)+'"><i class="a-meta">À la une · '+kick(f)+'</i><b>'+esc(f.title)+'</b><span>'+esc(f.lead)+'</span><em>Lire l’article</em></a>\n'+
   (rest.length?'<h2 class="a-h2 a-h2-sm">Tous les articles</h2>\n<div class="a-list a-list2">'+rest.map(card).join('\n')+'</div>\n':'')+'</div>\n</section>\n'+redirect+'\n';
  T[C]=head('Conseils — Alpha Since','S’entraîner, récupérer, reprendre après une pause : un nouvel article chaque dimanche à 20 h.','/conseils','website',null)+body+TAIL;
}

// 5. Accueil : bloc « Le conseil du dimanche », placé juste après la boutique
{
  let M=T[H];
  const i=need(M,'<section id="conseils" class="a-sec t-cream">','home sec'),j=M.indexOf('</section>',i)+10;
  M=M.slice(0,i)+M.slice(j);
  const [f,...rest]=PUB;
  const sec='<section id="conseils" class="a-sec t-cream">\n<div class="a-wrap">\n<div class="a-stack"><p class="a-kick">Chaque dimanche, 20 h</p><h2 class="a-h2">Le conseil du dimanche</h2></div>\n<div class="a-journal">\n<a class="a-feat" href="'+url(f)+'"><i class="a-meta">'+kick(f)+'</i><b>'+esc(f.title)+'</b><span>'+esc(f.lead)+'</span><em>Lire l’article</em></a>\n<div class="a-list a-list1">'+rest.slice(0,3).map(card).join('\n')+'</div>\n</div>\n<p class="a-cta-line"><a class="a-btn a-btn-o a-btn-ink" href="/conseils">Tous les conseils</a></p>\n</div>\n</section>\n';
  const k=need(M,'<section id="outils"','home anchor');
  M=M.slice(0,k)+sec+M.slice(k);
  if(/\{\{/.test(sec))throw new Error('J braces');
  T[H]=M;
}

// 6. Liens et menus
const MAP=Object.fromEntries(legacy.map(a=>['/conseils#'+a.old,url(a)]));
for(const n of Object.keys(T).filter(n=>n.endsWith('.html'))){
  for(const [a,b] of Object.entries(MAP))T[n]=T[n].split('href="'+a+'"').join('href="'+b+'"');
  T[n]=T[n].split('<b>Conseils</b><span>Débuter, grip, progresser</span>').join('<b>Conseils</b><span>Un article chaque dimanche</span>');
}

// 7. Styles
const CSS=`
.a-h1-art{font-size:clamp(34px,7vw,64px);line-height:.98;overflow-wrap:break-word}
.a-pghead .a-crumb{color:var(--cream);opacity:.75;margin-bottom:22px}.a-crumb a{color:inherit}
.a-meta{font-style:normal;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;opacity:.7}
.a-next{margin:16px 0 0;font-weight:700;color:var(--y)}
.a-feat{display:flex;flex-direction:column;gap:12px;padding:28px;border-radius:20px;background:var(--ink);color:var(--cream);text-decoration:none;margin-top:32px}
.a-feat b{font:400 clamp(28px,4.4vw,48px)/1.02 Anton,Impact,sans-serif;text-transform:uppercase}
.a-feat span{font-size:17px;line-height:1.5;opacity:.85;max-width:40em}
.a-feat em{font-style:normal;font-weight:700;align-self:flex-start;border-bottom:2px solid var(--y);padding-bottom:2px;margin-top:4px}
.a-journal{display:grid;gap:8px}
.a-list1{grid-template-columns:1fr!important}
.a-list2{grid-template-columns:1fr!important}
.a-h2-sm{font-size:clamp(28px,4vw,40px);margin-top:48px}
.a-btn-ink{color:var(--ink)!important;border-color:var(--ink)!important}
.a-src{font-size:14px;opacity:.8}
@media (min-width:960px){.a-journal{grid-template-columns:1.1fr 1fr;gap:40px;align-items:start}.a-list2{grid-template-columns:1fr 1fr!important}.a-feat{padding:40px}}
@media (hover:hover){.a-feat:hover{background:#000}.a-feat:hover em{color:var(--y)}}
`;
T['site.css']+=CSS;
T[H]=T[H].replace('</style>',()=>CSS+'</style>');

// 8. Sitemap et robots
const pages=['/','/bilan','/preparation','/outils','/coaching','/conseils','/legal'];
T['sitemap.xml']='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+pages.map(p=>'<url><loc>'+B+p+'</loc></url>').join('\n')+'\n'+PUB.map(a=>'<url><loc>'+B+url(a)+'</loc><lastmod>'+a.date.slice(0,10)+'</lastmod></url>').join('\n')+'\n</urlset>\n';
T['robots.txt']='User-agent: *\nAllow: /\nSitemap: '+B+'/sitemap.xml\n';
return {published:PUB.map(a=>a.slug),next:NEXT&&NEXT.slug};
};
