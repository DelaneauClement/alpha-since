// Programmes (14 octobre 2026) : Alpha ne propose plus de suivi ni de coaching payant.
// On vend des programmes écrits, à suivre seul, chez soi. Ce module :
// 1. crée la page /programmes (fichier Programmes.html, gabarit de la page Bilan) ;
// 2. remplace partout « Coaching » par « Programmes » (menu, navigation, pied de page, bilan adulte) ;
// 3. remplace sur l'accueil la section « Le suivi te fait revenir » et le raccourci « Je veux être suivi ».
// /coaching redirige vers /programmes (vercel.json). Tant qu'un programme n'est pas en vente,
// il est marqué « Bientôt » avec un bouton « Me prévenir » (e-mail prérempli).
// La mention « relu par un professionnel de santé » ne sera ajoutée qu'une fois la relecture faite.
const OLD='https://alpha-since.vercel.app';
const MAIL='alphasince.contact@gmail.com';
const die=m=>{console.error('PROGRAMMES',m);process.exit(1)};
const enc=s=>encodeURIComponent(s).replace(/'/g,'%27');
const P=[
 {nom:'Défi gainage 30 jours',duree:'30 jours',prix:'9 €',unite:'',pour:'Pour tout le monde, dès le premier jour.',
  txt:'10 minutes par jour pour construire un tronc solide : la base de tous les autres programmes. Au chrono, au poids du corps, sans matériel.'},
 {nom:'Force & fessiers 40+',duree:'12 semaines',prix:'24 €',unite:'soit 2 € par semaine',pour:'Pour les femmes de 40 ans et plus.',
  txt:'Force, fessiers et santé des os. 2 à 3 séances courtes par semaine, à la maison d’abord, avec une version salle si tu y as accès.'},
 {nom:'Enfin t’y mettre',duree:'12 semaines',prix:'24 €',unite:'soit 2 € par semaine',pour:'Pour ceux qui commencent, ou recommencent.',
  txt:'Démarrer à 2 séances par semaine, sans matériel, et progresser par petits paliers. Pour se remettre en forme sans se blesser ni abandonner en route.'}
];
module.exports=function(T){
 const B=T['Bilan.html'];
 const h=B.indexOf('<section class="a-sec t-ink a-pghead">'),f=B.indexOf('<footer ');
 if(h<0||f<h)die('gabarit Bilan introuvable');
 let head=B.slice(0,h);
 const TITLE='Programmes d’entraînement à la maison, dès 9 € | Alpha Since';
 const DESC='Des programmes écrits à suivre chez toi, à ton rythme : Défi gainage 30 jours, Force & fessiers 40+, Enfin t’y mettre. Sans abonnement, dès 9 €.';
 const rep=(re,v,n)=>{const c=(head.match(re)||[]).length;if(c!==n)die('balise '+re+' : '+c);head=head.replace(re,v)};
 rep(/<title>[^<]*<\/title>/g,'<title>'+TITLE+'</title>',1);
 rep(/<meta property="og:title" content="[^"]*">/g,'<meta property="og:title" content="'+TITLE+'">',1);
 rep(/<meta name="description" content="[^"]*">/g,'<meta name="description" content="'+DESC+'">',1);
 rep(/<meta property="og:description" content="[^"]*">/g,'<meta property="og:description" content="'+DESC+'">',1);
 rep(/(<meta property="og:url" content="[^"]*?)\/bilan">/g,'$1/programmes">',1);
 rep(/(<link rel="canonical" href="[^"]*?)\/bilan">/g,'$1/programmes">',1);
 rep(/<a href="\/bilan" aria-current="page">Bilan<\/a>/g,'<a href="/bilan">Bilan</a>',1);
 head=head.replace(/<script src="\/bilan[^"]*"[^>]*><\/script>\n?/g,'');
 head=head.replace('</head>','<style>'+
  '.p-grid{display:grid;gap:16px}@media (min-width:960px){.p-grid{grid-template-columns:repeat(3,1fr)}}'+
  '.p-card{display:flex;flex-direction:column;gap:12px;padding:24px;border-radius:20px;background:var(--ink);color:var(--cream);border:1px solid rgba(228,225,184,.16)}'+
  '.p-card h3{margin:0;font-family:Anton,Impact,sans-serif;font-weight:400;text-transform:uppercase;font-size:28px;line-height:1.05;letter-spacing:.01em}'+
  '.p-card .p-pour{font-weight:700;color:var(--sand)}.p-card p{margin:0;line-height:1.5}'+
  '.p-meta{display:flex;align-items:baseline;flex-wrap:wrap;gap:6px 12px}.p-meta b{font-size:32px;color:var(--yellow,#F2E415);font-weight:700}.p-meta span{opacity:.8;font-size:15px}'+
  '.p-card .a-btn{margin-top:auto}.p-tags{display:flex;gap:8px;flex-wrap:wrap}'+
  '.p-tag{display:inline-block;padding:4px 10px;border-radius:999px;font-size:13px;font-weight:700;background:rgba(228,225,184,.12)}'+
  '.p-list{margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px;line-height:1.5}'+
  '.a-faq{display:flex;flex-direction:column;gap:10px}.a-faq details{border:1px solid rgba(18,17,12,.18);border-radius:14px;padding:14px 18px;background:rgba(255,255,255,.35)}.a-faq summary{cursor:pointer;font-weight:700;font-size:17px}.a-faq details p{margin:10px 0 0;line-height:1.55}.a-faq a{color:inherit;font-weight:700}'+
  '</style>\n<script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org','@type':'ItemList',name:'Programmes Alpha',
   itemListElement:P.map((p,i)=>({'@type':'ListItem',position:i+1,name:p.nom}))})+'</script>\n</head>');

 const cards=P.map(p=>{
  const sujet='Programme '+p.nom+' · préviens-moi à la sortie';
  const corps='Bonjour,\n\nJe veux être prévenu(e) à la sortie du programme « '+p.nom+' ».\n\nMon prénom : \n\nMerci !';
  return '<article class="p-card"><div class="p-tags"><span class="p-tag">'+p.duree+'</span><span class="p-tag">Bientôt</span></div>'+
   '<h3>'+p.nom+'</h3><p class="p-pour">'+p.pour+'</p><p>'+p.txt+'</p>'+
   '<div class="p-meta"><b>'+p.prix+'</b>'+(p.unite?'<span>'+p.unite+'</span>':'')+'</div>'+
   '<a class="a-btn a-btn-y" href="mailto:'+MAIL+'?subject='+enc(sujet)+'&amp;body='+enc(corps)+'">Me prévenir à la sortie</a></article>';
 }).join('');

 const Q=[
  ['C’est un abonnement ?','Non. Tu paies une fois, le programme est à toi. Pas de prélèvement, rien à résilier.'],
  ['Il y a un suivi ou un coach ?','Non. Les programmes sont écrits pour être suivis seul, à ton rythme : chaque séance est expliquée, avec une version plus facile et une version plus dure de chaque exercice. Pour savoir par lequel commencer, fais le <a href="/bilan">bilan Alpha gratuit</a>.'],
  ['Il faut du matériel ?','Non. Tout se fait au poids du corps, à la maison. Une version salle est proposée pour ceux qui y ont accès.'],
  ['Je reprends après une longue pause, ou j’ai un problème de santé.','Demande l’avis de ton médecin avant de commencer. Les programmes ne remplacent pas un avis médical, et en cas de douleur, on s’arrête.'],
  ['Quand seront-ils disponibles ?','Bientôt. Clique sur « Me prévenir à la sortie » sous le programme qui t’intéresse : tu seras prévenu en premier.']
 ];
 const body=
  '<section class="a-sec t-ink a-pghead"><div class="a-wrap a-narrow">\n'+
  '<p class="a-kick a-crumb">Sans abonnement · à suivre chez toi</p>\n'+
  '<h1 class="a-h1 a-h1-sm">Programmes Alpha</h1>\n'+
  '<p class="a-lead">Des programmes écrits, à suivre seul et à ton rythme. Tu paies une fois, le programme est à toi.</p>\n'+
  '</div></section>\n'+
  '<section class="a-sec t-cream"><div class="a-wrap"><div class="p-grid">'+cards+'</div></div></section>\n'+
  '<section class="a-sec t-cream"><div class="a-wrap a-narrow a-stack">\n'+
  '<h2 class="a-h2">Comment ils sont construits</h2>\n'+
  '<ul class="p-list"><li><b>À la maison d’abord</b> : au poids du corps, sans matériel. Une version salle en option.</li>'+
  '<li><b>Au chrono</b> : tu travailles en temps, pas en nombre de répétitions, et tu gardes toujours un peu de réserve.</li>'+
  '<li><b>Par petits paliers</b> : quand c’est facile, tu ajoutes 10 secondes. Pas de saut de niveau brutal.</li>'+
  '<li><b>Le pourquoi de chaque exercice</b> : tu sais ce que tu travailles, et pourquoi.</li>'+
  '<li><b>La base avant tout</b> : sommeil, récupération, régularité. C’est la discipline qui fait progresser, pas une séance héroïque.</li></ul>\n'+
  '<h2 class="a-h2">Qui les écrit</h2>\n'+
  '<p>Clément, plus de 25 ans de terrain : joueur et entraîneur de rugby, responsable d’un pôle jeunes, créateur d’une cellule performance en club, habitué à travailler avec médecin, kinésithérapeute et ostéopathe. Ces programmes reprennent ce qu’il a appliqué pendant toutes ces années.</p>\n'+
  '<p class="a-note">Les programmes sont des conseils d’entraînement généraux. Ils ne remplacent pas l’avis d’un médecin. En cas de douleur, de malaise ou de problème de santé, arrête et consulte.</p>\n'+
  '</div></section>\n'+
  '<section class="a-sec t-khaki"><div class="a-wrap a-narrow a-stack">\n<h2 class="a-h2">Questions fréquentes</h2>\n<div class="a-faq">'+
  Q.map(([q,r])=>'<details><summary>'+q+'</summary><p>'+r+'</p></details>').join('')+'</div>\n'+
  '<div class="a-ctas"><a class="a-btn a-btn-y" href="/bilan">Faire mon bilan gratuit</a></div>\n</div></section>\n';
 T['Programmes.html']=head+body+B.slice(f);

 // 2. « Coaching » devient « Programmes » partout.
 let n=0;
 const swapAll=(a,b)=>{for(const k of Object.keys(T)){if(k==='Suivi.dc.html'||typeof T[k]!=='string'||!(k.endsWith('.html')||k.endsWith('.js')))continue;const c=T[k].split(a).length-1;if(c){n+=c;T[k]=T[k].split(a).join(b)}}};
 swapAll('<b>Coaching</b><span>Un suivi personnalisé, sans engagement</span>','<b>Programmes</b><span>À suivre chez toi, dès 9 €</span>');
 swapAll('<a href="/coaching">Coaching</a>','<a href="/programmes">Programmes</a>');
 swapAll('href="/coaching">Être accompagné par un coach</a>','href="/programmes">Voir les programmes</a>');
 swapAll('href="/coaching"','href="/programmes"');
 // La page Programmes elle-même : lien en cours dans la navigation.
 T['Programmes.html']=T['Programmes.html'].replace('<a href="/programmes">Programmes</a></nav>','<a href="/programmes" aria-current="page">Programmes</a></nav>');
 if(!T['Programmes.html'].includes('aria-current="page">Programmes'))T['Programmes.html']=T['Programmes.html'].replace(/(<nav class="a-nav"[^>]*>[\s\S]*?)<a href="\/programmes">/,'$1<a href="/programmes" aria-current="page">');

 // 3. L'accueil.
 let M=T['Main.dc.html'];
 const a=M.indexOf('<section id="suivi" class="a-sec t-olive">'),b=M.indexOf('</section>',a);
 if(a<0||b<0)die('section « suivi » de l’accueil introuvable');
 const sec=M.slice(a,b+10);
 if(!sec.includes('Le suivi te fait revenir'))die('section « suivi » inattendue');
 M=M.slice(0,a)+'<section id="programmes" class="a-sec t-olive">\n<div class="a-wrap a-coach">\n<div class="a-stack a-rv">\n'+
  '<h2 class="a-h2">La motivation te fait commencer. <span class="a-y">Un bon programme te fait continuer.</span></h2>\n'+
  '<p class="a-lead">Des programmes écrits par Clément, 25 ans de terrain : joueur, entraîneur, préparation physique. À suivre chez toi, à ton rythme, sans abonnement.</p>\n'+
  '</div>\n<div class="a-coach-box a-rv">\n<span class="a-kick">À partir de</span>\n<span class="a-price">9 €</span>\n'+
  '<ul><li>Défi gainage 30 jours</li><li>Force &amp; fessiers 40+</li><li>Enfin t’y mettre</li></ul>\n'+
  '<a class="a-btn a-btn-y" href="/programmes">Voir les programmes</a>\n</div>\n</div>\n</section>'+M.slice(b+10);
 const r='<a class="a-route" href="/programmes"><span class="a-route-t"><b>Je veux être suivi</b><span>Un coach qui part de ton bilan et ajuste ton programme. Sans engagement.</span></span>';
 if(M.split(r).length!==2)die('raccourci « Je veux être suivi » introuvable');
 M=M.split(r).join('<a class="a-route" href="/programmes"><span class="a-route-t"><b>Je veux un programme</b><span>Un programme écrit, à suivre chez toi, à ton rythme. Dès 9 €.</span></span>');
 T['Main.dc.html']=M;

 // Contrôle : plus aucun lien vers /coaching dans les pages publiées (la page Coaching elle-même mise à part).
 const reste=Object.keys(T).filter(k=>k!=='Suivi.dc.html'&&typeof T[k]==='string'&&(k.endsWith('.html')||k.endsWith('.js'))&&T[k].includes('href="/coaching"'));
 if(reste.length)die('liens /coaching restants : '+reste.join(' '));
 console.log('PROGRAMMES ok page /programmes,',n,'liens Coaching remplacés');
};
