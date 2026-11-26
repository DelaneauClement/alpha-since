// Relecture finale (26 novembre 2026) : corrige les dernières phrases hors charte et bloque le build
// si un texte public reprend une mention interdite (parcours de Clément, manique « CrossFit », etc.).
module.exports=function(T){
 const R=[
  ['Faite pour les barres, les tractions et le CrossFit.','Faite pour la musculation, les barres et les tractions.'],
  ['Musculation, crossfit, tractions','Musculation, tractions'],
  ['responsable d’un pôle jeunes, créateur de la cellule performance d’un club, en lien étroit avec médecin, kiné et ostéopathe.','aux côtés de préparateurs physiques, kinés, ostéopathes, médecins et anciens joueurs professionnels.']
 ];
 for(const n in T)for(const [a,b] of R)T[n]=T[n].split(a).join(b);
 const INTERDIT=/pôle jeunes|cellule performance|brevet d.état|Stade Toulousain|Alpha Hyrox|relus? par un professionnel de santé|Enfin t.y mettre|tractions et le CrossFit|Musculation, crossfit, tractions/i;
 for(const n in T){const m=T[n].match(INTERDIT);if(m){console.error('RELECTURE mention interdite dans',n,':',m[0]);process.exit(1)}}
 console.log('RELECTURE ok');
};
