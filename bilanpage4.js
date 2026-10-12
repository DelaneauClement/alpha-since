// Playlist Alpha : accès direct depuis l'accueil
module.exports=function(T){
const H='Main.dc.html',O='Outils.dc.html';
const R=(n,a,b)=>{if(T[n].split(a).length!==2)throw new Error('BP4 '+n+' :: '+a.slice(0,70));T[n]=T[n].replace(a,()=>b)};
R(O,'text-transform: uppercase; color: #F2E415">La playlist Alpha</span>','text-transform: uppercase; color: #F2E415; scroll-margin-top: 110px" id="playlist">La playlist Alpha</span>');
R(H,'<a class="a-toolk" href="/outils#manger"><b>Compléments</b><span>Ce qui marche vraiment.</span></a>','<a class="a-toolk" href="/outils#manger"><b>Compléments</b><span>Ce qui marche vraiment.</span></a>\n<a class="a-toolk a-toolw" href="/outils#playlist"><b>Playlist Alpha</b><span>Fun, Boost ou Chill : la musique de ta séance.</span></a>');
T[H]=T[H].replace('</style>',()=>'.a-toolw{grid-column:1/-1}\n</style>');
// Instagram : pied de page et menu de toutes les pages
const IG='<a href="https://www.instagram.com/alphasince" target="_blank" rel="noopener">Instagram @alphasince</a>',F='<span>alphasince.contact@gmail.com</span></div>',M='<div class="a-menu-legal">';
for(const n in T){if(!/\.html$/.test(n))continue;if(T[n].split(F).length!==2)throw new Error('BP4 pied '+n);T[n]=T[n].replace(F,()=>'<span>alphasince.contact@gmail.com</span>'+IG+'</div>');if(T[n].includes(M))T[n]=T[n].split(M).join(M+IG.replace('<a ','<a style="flex-basis:100%" '))}
const C='@media (max-width:759px){.a-ft-cols>div:last-child{grid-column:1/-1}}\n';T['site.css']+=C;for(const n of [H,O,'Suivi.dc.html'])T[n]=T[n].replace('</style>',()=>C+'</style>');
};
