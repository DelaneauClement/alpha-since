// Tableaux des articles (25 novembre 2026) : la colonne de droite ne passait pas à la ligne,
// ce qui faisait déborder les longues réponses sur téléphone. Elle passe maintenant à la ligne ;
// la classe a-tr3 sert aux tableaux à trois colonnes (série Hyrox).
module.exports=function(T){
 T['site.css']+='\n.a-tr{grid-template-columns:minmax(0,1.25fr) minmax(0,1fr)}.a-tr span:last-child{white-space:normal}'+
  '.a-tr.a-tr3{grid-template-columns:minmax(0,1fr) minmax(0,1fr) minmax(0,1fr);gap:12px}.a-tr.a-tr3 span{text-align:left!important;white-space:normal;overflow-wrap:anywhere;hyphens:auto}'+
  '.a-tr.a-tr3 span:first-child{font-weight:700}.a-tr.a-tr3 span:last-child{font-weight:400}.a-th span{font-weight:700!important}\n';
 console.log('TABLES ok');
};
