// Adresse officielle du site : https://alphasince.fr (branchée le 12 octobre 2026).
// Remplace l'ancienne adresse Vercel dans toutes les pages et tous les fichiers produits
// (liens canoniques, partage, données structurées, robots.txt, sitemap.xml),
// et ajoute au sitemap les pages des univers jeunes, toutes ouvertes au public.
// Dernier module de la chaîne, après bilanjeunes.js.
const fs=require('fs');
const OLD='https://alpha-since.vercel.app',NEW='https://alphasince.fr';
module.exports=function(T){
 let n=0,f=0;
 for(const k of Object.keys(T)){
  if(typeof T[k]!=='string'||!T[k].includes(OLD))continue;
  const c=T[k].split(OLD).length-1;n+=c;f++;
  T[k]=T[k].split(OLD).join(NEW);
 }
 if(!n){console.error('DOMAINE aucune adresse à remplacer');process.exit(1)}
 const PAGES=['/manique','/kids','/kids/bilan','/ado','/ado/bilan','/espoir','/espoir/bilan','/espoir/match'];
 let sm=T['sitemap.xml'];
 if(typeof sm!=='string'||!sm.includes('</urlset>')){console.error('DOMAINE sitemap introuvable');process.exit(1)}
 const add=PAGES.filter(u=>!sm.includes('<loc>'+NEW+u+'</loc>'));
 sm=sm.replace('</urlset>',add.map(u=>'<url><loc>'+NEW+u+'</loc></url>\n').join('')+'</urlset>');
 T['sitemap.xml']=sm;
 // Image de partage (réseaux sociaux, messageries) : le logo sur fond kaki, carré, non transparent.
 const OG='<meta property="og:image" content="'+NEW+'/img/logo.png">';let og=0;
 for(const k of Object.keys(T)){if(typeof T[k]==='string'&&T[k].includes(OG)){og++;T[k]=T[k].split(OG).join('<meta property="og:image" content="'+NEW+'/img/og.jpg">')}}
 fs.mkdirSync('out/img',{recursive:true});fs.copyFileSync('img/og.jpg','out/img/og.jpg');
 console.log('DOMAINE ok',n,'adresses dans',f,'fichiers ->',NEW+',',add.length,'pages ajoutées au sitemap, image de partage sur',og,'pages');
};
