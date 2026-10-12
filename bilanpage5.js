// Photos de la manique : assemble les images et remplit la fiche produit
module.exports=function(T){
const fs=require('fs'),c=require('crypto'),H='Main.dc.html';
const P={"manique-paire.avif":[3,"990f86f492bf26831222337bca2c19afb10c09b5"],"manique-paume.avif":[4,"933368e34fba7103c6ce3de37fbdd4afc3008492"],"manique-enroulee.avif":[3,"841ebb5f3de278269c3791cad3b8b7c6ed7e8341"]};
fs.mkdirSync('out/img',{recursive:true});
for(const n in P){const b=Buffer.concat([...Array(P[n][0]).keys()].map(i=>fs.readFileSync('ph/'+n+'.'+i)));if(c.createHash('sha1').update(b).digest('hex')!==P[n][1])throw new Error('BP5 image '+n);fs.writeFileSync('out/img/'+n,b)}
const R=(n,a,b)=>{if(T[n].split(a).length!==2)throw new Error('BP5 '+n+' :: '+a.slice(0,70));T[n]=T[n].replace(a,()=>b)};
// Fiche produit : la paire en grand, puis la manique dans la paume et la manique enroulée
R(H,'<div class="a-ph a-rv">[PHOTO PRODUIT : la manique kaki « Be ready where it all begins » sur fond sombre]</div>',
'<figure class="a-gal a-rv"><img src="/img/manique-paire.avif" width="400" height="500" alt="La paire de maniques Alpha X-Trm Confort croisées : cuir retourné kaki marqué « Be ready where it all begins », bracelet à scratch et écusson Alpha Since 1982"><div class="a-gal-t"><img src="/img/manique-paume.avif" width="560" height="560" loading="lazy" alt="Manique Alpha dans la paume : on lit « Be ready where it all begins » sur le cuir"><img src="/img/manique-enroulee.avif" width="560" height="560" loading="lazy" alt="Manique Alpha portée au poignet, le cuir enroulé sous la main"></div></figure>');
T[H]=T[H].replace('</style>',()=>'.a-gal{margin:0;display:flex;flex-direction:column;gap:10px;min-width:0}\n.a-gal img{display:block;width:100%;height:auto;border-radius:20px;background:var(--ink);border:1px solid rgba(228,225,184,.16)}\n.a-gal-t{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n@media (min-width:960px){.a-gal{max-width:520px;justify-self:center}}\n</style>');
};
