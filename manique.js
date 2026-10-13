// Page produit /manique (13 octobre 2026) : la manique a sa propre page, lisible par Google
// (titre, description, données produit), au lieu d'un simple passage de l'accueil.
// Le bloc produit est repris tel quel de l'accueil (mêmes photos, même prix, même lien de paiement Stripe),
// avec le gabarit (en-tête, menu, pied de page) de la page Bilan. Les liens « Boutique » mènent ici.
const OLD='https://alpha-since.vercel.app';
const die=m=>{console.error('MANIQUE',m);process.exit(1)};

// Garde, dans une feuille de style, les règles qui citent une des classes (y compris dans les @media).
function pick(css,classes){
 const has=sel=>classes.some(c=>new RegExp('\\.'+c+'(?![\\w-])').test(sel));
 let out='',i=0;
 while(i<css.length){
  const o=css.indexOf('{',i);if(o<0)break;
  const head=css.slice(i,o).trim();
  if(head.startsWith('@media')){
   let d=1,j=o+1;while(j<css.length&&d){if(css[j]==='{')d++;else if(css[j]==='}')d--;j++}
   const inner=pick(css.slice(o+1,j-1),classes);if(inner)out+=head+'{'+inner+'}';i=j;
  }else{
   const c=css.indexOf('}',o);if(c<0)break;
   if(has(head))out+=head+css.slice(o,c+1);i=c+1;
  }
 }
 return out;
}

module.exports=function(T){
 const M=T['Main.dc.html'],B=T['Bilan.html'];
 // 1. Le bloc produit de l'accueil.
 const a=M.indexOf('<section id="manique" class="a-sec t-ink">'),b=M.indexOf('</section>',a);
 if(a<0||b<0)die('bloc produit introuvable sur l’accueil');
 let prod=M.slice(a,b+10);
 const one=(x,y)=>{if(prod.split(x).length!==2)die('repère du bloc produit : '+x.slice(0,50));prod=prod.split(x).join(y)};
 one('<section id="manique" class="a-sec t-ink">','<section class="a-sec t-ink"><div class="a-wrap"><p class="a-kick a-crumb" style="margin:0 0 28px"><a href="/" style="color:inherit">Accueil</a> · Boutique</p></div>');
 one('<h2 class="a-h2">Manique X-Trm Confort</h2>','<h1 class="a-h1 a-h1-sm">Manique X-Trm Confort</h1>');
 one('<a class="a-btn a-btn-o" href="#video">Comment la placer</a>','<a class="a-btn a-btn-o" href="#questions">Questions fréquentes</a>');
 prod=prod.replace(/<p class="a-soon" id="video">.*?<\/p>\n?/s,'');
 const css=pick((M.match(/<style[^>]*>([\s\S]*?)<\/style>/)||[])[1]||'',['a-gal','a-gal-t','a-howto','a-ship']);
 if(!css.includes('.a-gal{')||!css.includes('.a-howto'))die('styles du bloc produit introuvables');

 // 2. Le gabarit : en-tête et pied de page de /bilan, sans son script.
 const h=B.indexOf('<section class="a-sec t-ink a-pghead">'),f=B.indexOf('<footer ');
 if(h<0||f<h)die('gabarit Bilan introuvable');
 let head=B.slice(0,h);
 const TITLE='Manique de musculation X-Trm Confort, cuir retourné | Alpha Since';
 const DESC='Manique de musculation en cuir retourné et néoprène, vendue par paire : le grip des mains nues sans les ampoules. 34,95 €, livraison en point relais comprise.';
 const rep=(re,v,n)=>{const c=(head.match(re)||[]).length;if(c!==n)die('balise '+re+' : '+c);head=head.replace(re,v)};
 rep(/<title>[^<]*<\/title>/g,'<title>'+TITLE+'</title>',1);
 rep(/<meta property="og:title" content="[^"]*">/g,'<meta property="og:title" content="'+TITLE+'">',1);
 rep(/<meta name="description" content="[^"]*">/g,'<meta name="description" content="'+DESC+'">',1);
 rep(/<meta property="og:description" content="[^"]*">/g,'<meta property="og:description" content="'+DESC+'">',1);
 rep(/(<meta property="og:url" content="[^"]*?)\/bilan">/g,'$1/manique">',1);
 rep(/(<link rel="canonical" href="[^"]*?)\/bilan">/g,'$1/manique">',1);
 head=head.replace(/<script src="\/bilan[^"]*"[^>]*><\/script>\n?/g,'');
 // Dans la navigation, la page en cours est la Boutique, pas le Bilan.
 rep(/<a href="\/bilan" aria-current="page">Bilan<\/a>/g,'<a href="/bilan">Bilan</a>',1);
 rep(/<a href="\/#manique">Boutique<\/a>/g,'<a href="/#manique" aria-current="page">Boutique</a>',1);
 head=head.replace('</head>','<style>'+css+'.a-faq{display:flex;flex-direction:column;gap:10px}.a-faq details{border:1px solid rgba(18,17,12,.18);border-radius:14px;padding:14px 18px;background:rgba(255,255,255,.35)}.a-faq summary{cursor:pointer;font-weight:700;font-size:17px;list-style-position:outside}.a-faq details p{margin:10px 0 0;line-height:1.55}.a-faq a{color:inherit;font-weight:700}</style>\n'+
  '<script type="application/ld+json">'+JSON.stringify({
   '@context':'https://schema.org','@type':'Product',
   name:'Manique X-Trm Confort',
   description:'Manique de musculation en cuir retourné et néoprène, vendue par paire. Taille unique, 20 × 8 cm. Pour la musculation, le crossfit et les tractions.',
   brand:{'@type':'Brand',name:'Alpha Since'},
   image:[OLD+'/img/manique-face.avif',OLD+'/img/manique-poignet.avif',OLD+'/img/manique-a-plat.avif'],
   url:OLD+'/manique',
   offers:{'@type':'Offer',price:'34.95',priceCurrency:'EUR',availability:'https://schema.org/InStock',url:OLD+'/manique',itemCondition:'https://schema.org/NewCondition',
    seller:{'@type':'Organization',name:'Alpha Since'},
    shippingDetails:{'@type':'OfferShippingDetails',shippingRate:{'@type':'MonetaryAmount',value:'0',currency:'EUR'},shippingDestination:{'@type':'DefinedRegion',addressCountry:'FR'}},
    hasMerchantReturnPolicy:{'@type':'MerchantReturnPolicy',applicableCountry:'FR',returnPolicyCategory:'https://schema.org/MerchantReturnFiniteReturnWindow',merchantReturnDays:14}}
  })+'</script>\n</head>');
 if(head.split('application/ld+json').length!==2)die('données produit');

 // 3. Contenu propre à la page.

 const pourquoi='<section class="a-sec t-cream"><div class="a-wrap a-narrow a-stack">\n'+
  '<h2 class="a-h2">Pourquoi une manique ?</h2>\n'+
  '<p class="a-lead">Sur une barre de traction ou une barre de musculation, c’est souvent la peau de la paume qui lâche avant le muscle : ampoules, callosités qui s’arrachent, séance écourtée.</p>\n'+
  '<p>La manique protège la paume avec une bande de cuir retourné, tenue au poignet par un bracelet à scratch. Les doigts restent libres : tu gardes le contact de la barre, comme à mains nues.</p>\n'+
  '<p>Pour aller plus loin : <a href="/conseils/ampoules-callosites">Ampoules et callosités</a> · <a href="/conseils/force-de-prehension">La force de préhension</a> · <a href="/conseils/premiere-traction">Ta première traction</a></p>\n'+
  '</div></section>\n';
 const Q=[
  ['Quelle taille choisir ?','La manique X-Trm Confort existe en taille unique : 20 × 8 cm, avec un bracelet à scratch qui s’ajuste au poignet.'],
  ['En quoi est-elle faite ?','Cuir retourné pour la partie qui protège la paume, néoprène pour le confort au poignet, bracelet à scratch et écusson Alpha Since 1982.'],
  ['Pour quels exercices ?','Musculation, crossfit et tractions : tous les exercices où la barre frotte contre la paume.'],
  ['Elle est vendue à l’unité ou par paire ?','Par paire, au prix de 34,95 €, livraison en point relais comprise.'],
  ['Quand est-ce que je la reçois ?','Le colis part le jour ouvré qui suit ton paiement, depuis l’Aveyron, en point relais Mondial Relay. On t’écrit pour confirmer le point relais le plus proche de chez toi.'],
  ['Comment je paie ?','Par carte bancaire, sur une page de paiement sécurisée Stripe. Tu reçois la confirmation par e-mail.'],
  ['Et si elle ne me convient pas ?','Tu as 14 jours pour nous la retourner. Les conditions sont détaillées dans nos <a href="/legal#cgv">conditions générales de vente</a>.'],
  ['Une autre question ?','Écris-nous à <a href="mailto:alphasince.contact@gmail.com?subject=Question%20%C2%B7%20Manique%20X-Trm%20Confort">alphasince.contact@gmail.com</a>, on te répond.']
 ];
 const faq='<section class="a-sec t-khaki" id="questions"><div class="a-wrap a-narrow a-stack">\n<h2 class="a-h2">Questions fréquentes</h2>\n<div class="a-faq">'+
  Q.map(([q,r])=>'<details><summary>'+q+'</summary><p>'+r+'</p></details>').join('')+'</div>\n'+
  '<div class="a-ctas"><a class="a-btn a-btn-y" href="https://buy.stripe.com/00w5kw8ev44w9zJ6E0a3u00" target="_blank" rel="noopener">Commander · 34,95 €</a></div>\n</div></section>\n';
 if(!M.includes('https://buy.stripe.com/00w5kw8ev44w9zJ6E0a3u00'))die('lien de paiement de l’accueil changé : mettre à jour manique.js');

 T['Manique.html']=head+prod+'\n'+pourquoi+faq+B.slice(f);

 // 4. Les liens « Boutique » de tout le site mènent à la page produit ; l'accueil y renvoie aussi.
 let n=0;
 for(const k of Object.keys(T)){
  if(typeof T[k]!=='string'||!k.endsWith('.html'))continue;
  const c=T[k].split('href="/#manique"').length-1;if(c){n+=c;T[k]=T[k].split('href="/#manique"').join('href="/manique"')}
 }
 let H=T['Main.dc.html'];
 const x='<a class="a-btn a-btn-o" href="#video">Comment la placer</a>';
 if(H.split(x).length!==2)die('bouton « Comment la placer » de l’accueil introuvable');
 H=H.split(x).join('<a class="a-btn a-btn-o" href="/manique">Tous les détails</a>');
 H=H.replace(/<p class="a-soon" id="video">.*?<\/p>\n?/s,'');
 T['Main.dc.html']=H;
 console.log('MANIQUE ok page /manique,',n,'liens Boutique redirigés vers la page');
};
