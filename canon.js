// Indexation Google (26 novembre 2026) : l'accueil, les Outils et la page légale n'avaient pas de balise canonique,
// alors que la même page répond aussi sous son nom de fichier (/Main.dc.html…). Google voyait des doublons.
const die=m=>{console.error('CANON',m);process.exit(1)};
module.exports=function(T){
 const C={'Main.dc.html':'https://alphasince.fr/','Outils.dc.html':'https://alphasince.fr/outils','Legal.html':'https://alphasince.fr/legal'};
 for(const f in C){let s=T[f];if(typeof s!=='string')die(f+' absent');
  if(/rel="canonical"/.test(s))continue;
  if(s.split('</head>').length!==2)die(f+' : </head> introuvable');
  T[f]=s.replace('</head>','<link rel="canonical" href="'+C[f]+'">\n</head>')}
 console.log('CANON ok');
};
