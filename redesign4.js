// Round 4: naming, coach, micro-entreprise, 1982, visio, nutrition, selection colour, share previews, clean URLs
module.exports=function(T){
const R=(n,a,b,min)=>{const k=T[n].split(a).length-1;if(k<(min||1))throw new Error('R4 '+n+' :: '+a.slice(0,50));T[n]=T[n].split(a).join(b)};
const ALL=Object.keys(T).filter(n=>n.endsWith('.html'));
const DC=ALL.filter(n=>n.endsWith('.dc.html'));
const H='Main.dc.html',S='Suivi.dc.html',L='Legal.html';
// 1982 + coach on home
R(H,'Alpha est né de là. Comme le phénix de notre logo : on tombe, on se relève, on repart.','Alpha est né de là. Comme le phénix de notre logo : on tombe, on se relève, on repart. Et 1982 ? C’est l’année de naissance de Clément, le fondateur. Cet état d’esprit ne l’a jamais quitté.');
R(H,'Un coach qui connaît ton histoire, tes contraintes et tes reprises. Il ajuste ton programme quand la vie déborde.','Clément a passé plus de 25 ans sur le terrain : joueur, entraîneur, préparation physique. Il connaît les reprises, et ajuste ton programme quand la vie déborde.');
R(H,'<p class="a-soon"><span>Bientôt :</span>','<p class="a-soon"><span>Expédié par nos soins depuis l’Aveyron · Retours sous 14 jours</span></p>\n<p class="a-soon"><span>Bientôt :</span>');
// coach FAQ + default formula aligned with the 49 € entry price
R(S,"'[TON PARCOURS, TES DIPLÔMES ET TA CARTE PROFESSIONNELLE]'","'Clément, le fondateur d’Alpha. Plus de 25 ans dans le sport : joueur puis entraîneur de rugby, responsable d’un pôle jeunes, créateur de la cellule performance d’un club, en lien étroit avec médecin, kiné et ostéopathe.'");
R(S,"this.state = { formule: 'combo', rythme: 'semaine',","this.state = { formule: 'sport', rythme: 'mois',");
R(S,'Un bilan complet chaque mois : tests, ressenti, ajustement du programme.','Un bilan complet chaque mois en visio : tests, ressenti, ajustement du programme.');
for(const n of [H,S])R(n,'Échanges par message, appel en option','Échanges par message, bilans en visio');
// nutrition instead of diététique (protected title)
for(const n of DC){T[n]=T[n].split('Sport + diététique').join('Sport + nutrition').split('sport et diététique').join('sport et nutrition')}
// one name per service, same menus everywhere
for(const n of ALL){
  T[n]=T[n].split('<title>Alpha Since — Test physique').join('<title>Alpha Since — Bilan physique').split('<title>Alpha Since — Suivi personnalisé').join('<title>Alpha Since — Coaching').split('>Suivi personnalisé · Sans engagement<').join('>Coaching · Sans engagement<');
  const M=[['<b>Bilan physique</b>','<b>Bilan</b>'],['<b>Ma préparation</b>','<b>Préparation</b>'],['<b>Outils gratuits</b>','<b>Outils</b>'],['<b>La manique</b>','<b>Boutique</b>']];
  for(const [a,b] of M)T[n]=T[n].split(a).join(b);
  // desktop nav: add Conseils before Coaching
  T[n]=T[n].replace(/(<nav class="a-nav"[^>]*>.*?)(<a href="[^"]*Suivi\.dc\.html"[^>]*>Coaching<\/a>)/,(m,a,b)=>a+'<a href="Conseils.html"'+(n==='Conseils.html'?' aria-current="page"':'')+'>Conseils</a>'+b);
  if(!/<nav class="a-nav"[^>]*>.*>Conseils<\/a>/.test(T[n]))throw new Error('R4 nav '+n);
  // hide unfinished contact column until e-mail / Instagram exist
  T[n]=T[n].split('<div><h3>Contact</h3><span>[EMAIL DE CONTACT]</span><span>[INSTAGRAM]</span></div>').join('');
}
// legal: micro-entreprise identity
const LG=[['[NOM ET PRÉNOM ou RAISON SOCIALE], [entrepreneur individuel / forme sociale et capital], exerçant sous la marque Alpha Since 1982.','Clément Delaneau, entrepreneur individuel (micro-entreprise), exerçant sous la marque Alpha Since 1982.'],['SIREN / SIRET : [NUMÉRO] · [RCS / RNE : VILLE]','SIRET : [NUMÉRO] · Registre national des entreprises'],['TVA : [NUMÉRO DE TVA INTRACOMMUNAUTAIRE] ou « TVA non applicable, article 293 B du CGI »','TVA non applicable, article 293 B du CGI'],['toutes taxes comprises [ou « TVA non applicable, art. 293 B du CGI »]','TVA non applicable, article 293 B du CGI'],['[NOM ET PRÉNOM ou RAISON SOCIALE], [statut], marque Alpha Since 1982','Clément Delaneau, entrepreneur individuel (micro-entreprise), marque Alpha Since 1982'],['Directeur de la publication : [NOM ET PRÉNOM]','Directeur de la publication : Clément Delaneau'],['[NOM ou RAISON SOCIALE]','Clément Delaneau'],['en [France métropolitaine / zones de livraison]','en France métropolitaine'],['par messagerie écrite et, selon l’option choisie, par téléphone.','par messagerie écrite, en visio pour les bilans et, selon l’option choisie, par téléphone.']];
for(const [a,b] of LG)R(L,a,b);
// selection = black, action = yellow
const SELCSS='\nbutton[style*="background: rgb(18, 17, 12)"],button[style*="background: rgb(18, 17, 12)"] *{color:#E4E1B8!important}\n';
for(const n of DC){
  T[n]=T[n].split("? '#F2E415' : '#FFFFFF'").join("? '#12110C' : '#FFFFFF'");
  const i=T[n].indexOf('@media (hover:hover){'),j=T[n].indexOf('</style>',i);if(i<0||j<0)throw new Error('R4 css '+n);
  T[n]=T[n].slice(0,j)+SELCSS+T[n].slice(j);
}
// clean URLs
const U=[['Main.dc.html','/'],['Test.dc.html','/bilan'],['Programme.dc.html','/preparation'],['Outils.dc.html','/outils'],['Suivi.dc.html','/coaching'],['Conseils.html','/conseils'],['Legal.html','/legal']];
for(const n of ALL){for(const [f,u] of U){T[n]=T[n].replace(new RegExp('href="/?'+f.replace(/\./g,'\\.')+'(#[^"]*)?"','g'),(m,h)=>'href="'+(u==='/'&&h?'/':u)+(h||'')+'"')}
  T[n]=T[n].split('href="/#').join('href="/#');}
// share previews
const D={'Main.dc.html':['Alpha Since — Be ready where it all begins','Accessoires de musculation et outils gratuits pour reprendre le sport à ton niveau. Prêt là où tout commence, et là où tout recommence.','/'],'Test.dc.html':['Bilan physique gratuit — Alpha Since','Sept tests reconnus pour savoir d’où tu repars. Gratuit, sans inscription.','/bilan'],'Programme.dc.html':['Ta préparation — Alpha Since','Un programme à ton niveau d’aujourd’hui, avec un délai honnête. Semi, trail, force, muscle ou forme.','/preparation'],'Outils.dc.html':['Outils gratuits — Alpha Since','Charge max, disques, chrono, routine souplesse, audit sommeil, nutrition. Gratuits, sans inscription.','/outils'],'Suivi.dc.html':['Coaching — Alpha Since','Un coach pour chaque reprise : programme ajusté, bilans en visio, sans engagement.','/coaching'],'Conseils.html':['Conseils — Alpha Since','Ta première séance, ampoules et callosités, ta première traction.','/conseils'],'Legal.html':['Informations légales — Alpha Since','CGV, mentions légales et confidentialité.','/legal']};
const B='https://alpha-since.vercel.app';
for(const n of ALL){const [t,d,u]=D[n];const i=T[n].indexOf('</title>');if(i<0)throw new Error('R4 title '+n);
  const hasDesc=T[n].includes('<meta name="description"');
  const tags=(hasDesc?'':'\n<meta name="description" content="'+d+'">')+'\n<meta property="og:type" content="website">\n<meta property="og:site_name" content="Alpha Since">\n<meta property="og:title" content="'+t+'">\n<meta property="og:description" content="'+d+'">\n<meta property="og:url" content="'+B+u+'">\n<meta property="og:image" content="'+B+'/img/logo.png">\n<meta name="twitter:card" content="summary">\n<meta name="theme-color" content="#807C3A">';
  T[n]=T[n].slice(0,i+8)+tags+T[n].slice(i+8);}
for(const n of ALL){if(/\.dc\.html"|href="(Conseils|Legal)\.html/.test(T[n].replace(/<script type="text\/x-dc"[\s\S]*$/,'')))throw new Error('R4 old link left '+n)}
};
