// Photos du site (12 octobre 2026) : les fichiers du dossier photos/ remplacent les emplacements provisoires.
// Accueil : la manique dans la paume. Fiche produit : la manique de face, portée au poignet, et à plat.
const fs=require('fs');
module.exports=function(T){
 const P='Main.dc.html';let s=T[P];
 const one=(a,b)=>{if(s.split(a).length!==2){console.error('PHOTOS repère introuvable :',a.slice(0,60));process.exit(1)}s=s.split(a).join(b)};
 one('<div class="a-ph a-rv">[PHOTO : main avec la manique sur un disque jaune]</div>',
  '<div class="a-ph a-rv" style="padding:0;background:#12110C"><img src="/img/accueil-paume.avif" width="1000" height="1000" alt="Manique Alpha portée, vue côté paume : « Be ready where it all begins » gravé sur le cuir, écusson Alpha Since 1982 au poignet" style="width:100%;height:100%;object-fit:cover;display:block"></div>');
 one('<img src="/img/manique-paire.avif" width="400" height="500" alt="La paire de maniques Alpha X-Trm Confort croisées : cuir retourné kaki marqué « Be ready where it all begins », bracelet à scratch et écusson Alpha Since 1982">',
  '<img src="/img/manique-face.avif" width="800" height="1000" alt="Manique Alpha X-Trm Confort de face : cuir retourné kaki marqué « Be ready where it all begins », bracelet à scratch et écusson Alpha Since 1982">');
 one('<img src="/img/manique-paume.avif" width="560" height="560" loading="lazy" alt="Manique Alpha dans la paume : on lit « Be ready where it all begins » sur le cuir">',
  '<img src="/img/manique-poignet.avif" width="720" height="720" loading="lazy" alt="Manique Alpha portée au poignet, le cuir passé sous les doigts">');
 one('<img src="/img/manique-enroulee.avif" width="560" height="560" loading="lazy" alt="Manique Alpha portée au poignet, le cuir enroulé sous la main">',
  '<img src="/img/manique-a-plat.avif" width="720" height="720" loading="lazy" alt="Manique Alpha à plat, côté intérieur : cuir retourné, bord néoprène et bracelet">');
 T[P]=s;
 fs.mkdirSync('out/img',{recursive:true});
 const files=fs.readdirSync('photos').filter(f=>f.endsWith('.avif'));
 for(const f of files)fs.copyFileSync('photos/'+f,'out/img/'+f);
 console.log('PHOTOS ok',files.length,'photos');
};
