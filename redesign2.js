module.exports=function(T){
const one=(n,a,b)=>{if(T[n].split(a).length!==2)throw new Error('R2 '+n+' '+a.slice(0,40));T[n]=T[n].replace(a,()=>b)};
const all=(n,a,b,min)=>{const k=T[n].split(a).length-1;if(k<(min||1))throw new Error('R2all '+n+' '+a);T[n]=T[n].split(a).join(b)};
const H='Main.dc.html';
one(H,'<dd>[DIMENSIONS]</dd>','<dd>20 × 8 cm, taille unique</dd>');
one(H,'<span class="a-price">69 € / mois</span>','<span class="a-price">49 € / mois</span>');
one(H,'href="#conseils"><span class="a-route-t"><b>Ta première séance','href="Conseils.html#premiere-seance"><span class="a-route-t"><b>Ta première séance');
one(H,'href="#conseils"><span class="a-route-t"><b>Ampoules et callosités','href="Conseils.html#ampoules"><span class="a-route-t"><b>Ampoules et callosités');
one(H,'href="#conseils"><span class="a-route-t"><b>Ta première traction','href="Conseils.html#traction"><span class="a-route-t"><b>Ta première traction');
one(H,'<div class="a-stack a-rv"><h2 class="a-h2">Conseils</h2></div>','<div class="a-stack a-rv"><h2 class="a-h2">Conseils</h2><p class="a-lead">Les bases pour commencer, ou recommencer, sans te blesser.</p></div>');
for(const n in T){
  T[n]=T[n].split('href="#conseils"').join('href="Conseils.html"').split('href="/#conseils"').join('href="Conseils.html"');
  for(const a of ['mentions','cgv','confidentialite'])T[n]=T[n].split('href="#'+a+'"').join('href="Legal.html#'+a+'"');
  all(n,'<a href="Legal.html#confidentialite">Confidentialité</a></nav></div>\n</div>\n</footer>','<a href="Legal.html#confidentialite">Confidentialité</a><a href="Legal.html#renoncer">Renoncer au contrat ici</a></nav><span>Site créé par Neuville pour Alpha Since 1982</span></div>\n</div>\n</footer>');
  T[n]=T[n].split('&amp;family=Caveat:wght@600').join('');
  T[n]=T[n].split('rel="noopener"').join('rel="noopener noreferrer"');
  if(/href="#(mentions|cgv|confidentialite|conseils)"/.test(T[n]))throw new Error('R2 left '+n);
}
};
