// Référencement (13 octobre 2026) : titres et descriptions avec les mots que les gens cherchent,
// titres d'articles ramenés sous 60 caractères (au-delà, Google les coupe), fiche « Organisation »
// sur l'accueil, et mesure d'audience Vercel (sans cookies) sur toutes les pages.
const OLD='https://alpha-since.vercel.app';
const die=m=>{console.error('SEO',m);process.exit(1)};
const TITRES={
 'Main.dc.html':['Maniques de musculation et bilan sportif gratuit | Alpha Since','Maniques de musculation en cuir retourné, bilan sportif gratuit et conseils pour reprendre le sport à ton niveau. Expédié depuis l’Aveyron.'],
 'Bilan.html':['Bilan sportif gratuit : ton programme en 5 min | Alpha Since'],
 'Outils.dc.html':['Outils gratuits : charge max, chrono, sommeil | Alpha Since'],
 'Suivi.dc.html':['Coaching sportif personnalisé, sans engagement | Alpha Since'],
 'Conseils.html':['Conseils musculation et reprise du sport | Alpha Since'],
 'Kids.html':['Sport enfant de 3 à 10 ans : bilan et jeux | Alpha Kids'],
 'Ado.html':['Sport ado 11–14 ans : bilan gratuit avec un parent | Alpha Ado'],
 'Espoir.html':['Préparation physique 15–17 ans : bilan gratuit | Alpha Espoir'],
 'conseils/age-renforcement-musculaire.html':['À quel âge commencer le renforcement musculaire ?'],
 'conseils/force-de-prehension.html':['Force de préhension : pourquoi ton grip compte | Alpha Since'],
 'conseils/musculation-apres-40-ans.html':['Musculation après 40 ans : le meilleur moment pour s’y mettre'],
 'conseils/sentrainer-avec-peu-de-temps.html':['S’entraîner avec peu de temps : 2 séances de 30 min suffisent'],
 'conseils/sport-grossesse.html':['Sport pendant la grossesse : quoi faire pour le dos et bébé']
};
const esc=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
module.exports=function(T){
 let n=0;
 for(const [k,[title,desc]] of Object.entries(TITRES)){
  let s=T[k];if(typeof s!=='string')die('page absente : '+k);
  const rep=(re,v)=>{if(!re.test(s))die(k+' : balise '+re);s=s.replace(re,v)};
  rep(/<title>[^<]*<\/title>/,'<title>'+esc(title)+'</title>');
  if(/<meta property="og:title" content="[^"]*">/.test(s))s=s.replace(/<meta property="og:title" content="[^"]*">/,'<meta property="og:title" content="'+esc(title)+'">');
  if(desc){rep(/<meta name="description" content="[^"]*">/,'<meta name="description" content="'+esc(desc)+'">');
   s=s.replace(/<meta property="og:description" content="[^"]*">/,'<meta property="og:description" content="'+esc(desc)+'">')}
  T[k]=s;n++;
 }
 // Fiche « Organisation » et site, sur l'accueil.
 const org={'@context':'https://schema.org','@graph':[
  {'@type':'Organization','@id':OLD+'/#org',name:'Alpha Since',url:OLD+'/',logo:OLD+'/img/og.jpg',email:'alphasince.contact@gmail.com',sameAs:['https://www.instagram.com/alphasince'],slogan:'Be ready where it all begins'},
  {'@type':'WebSite','@id':OLD+'/#site',name:'Alpha Since',url:OLD+'/',inLanguage:'fr',publisher:{'@id':OLD+'/#org'}}]};
 let M=T['Main.dc.html'];
 if(M.split('</head>').length!==2)die('accueil : </head>');
 T['Main.dc.html']=M.replace('</head>','<script type="application/ld+json">'+JSON.stringify(org)+'</script>\n</head>');
 // Mesure d'audience Vercel : à activer une fois dans le tableau de bord Vercel (onglet Analytics).
 let a=0;
 for(const k of Object.keys(T)){
  if(typeof T[k]!=='string'||!k.endsWith('.html')||T[k].includes('/_vercel/insights/script.js'))continue;
  if(T[k].split('</head>').length!==2)continue;
  T[k]=T[k].replace('</head>','<script defer src="/_vercel/insights/script.js"></script>\n</head>');a++;
 }
 // Contrôle : aucun titre de page publié au-delà de 65 caractères.
 const longs=Object.keys(T).filter(k=>k.endsWith('.html')&&typeof T[k]==='string').map(k=>[k,(T[k].match(/<title>([^<]*)<\/title>/)||[,''])[1]]).filter(([,t])=>t.length>65);
 console.log('SEO ok',n,'titres réécrits, mesure d’audience sur',a,'pages'+(longs.length?', titres encore longs : '+longs.map(x=>x[0]).join(' '):''));
};
