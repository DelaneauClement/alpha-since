// Round 8: sober tone (no jokes) + robust scroll-to-top on step change
module.exports=function(T){
const ALL=Object.keys(T).filter(n=>n.endsWith('.html'));
const TONE=[
['Une protéine complète. Et le jaune aussi, arrête de le jeter : c’est là que sont les vitamines.','Une protéine complète. Garde le jaune : c’est lui qui contient la plupart des vitamines.'],
['Environ la moitié, c’est du gras. Délicieux, mais ça compte en pouces, pas en paumes.','Environ la moitié, c’est du gras : il compte en pouces, pas en paumes.'],
['Un féculent, pas un légume. Désolé pour les frites.','Un féculent, pas un légume.'],
['Protéines, glucides et fibres. Le couteau suisse de l’assiette, pour trois fois rien.','Protéines, glucides et fibres, pour un prix modeste.'],
['Le couteau suisse de l’assiette. Et ça ne coûte presque rien.','Protéines, glucides et fibres, pour un prix modeste.'],
['Protéines et oméga-3, des acides gras essentiels que ton corps ne sait pas fabriquer. La boîte la plus sous-cotée du rayon.','Protéines et oméga-3, des acides gras essentiels que ton corps ne sait pas fabriquer.'],
['Protéines et acides gras essentiels. La boîte la plus sous-cotée du rayon.','Protéines et acides gras essentiels.'],
['Plus de gras que de protéines. C’est l’apéro, pas la récup.','Plus de gras que de protéines.'],
['Du carburant qui dure, avec des fibres. Le petit-déj des gens qui s’entraînent le matin.','Une énergie durable, avec des fibres. Adapté au petit-déjeuner avant une séance matinale.'],
['Du bon gras et plein de fibres. Mais pas une protéine, même en toast.','Du bon gras et des fibres, mais pas une source de protéines.'],
['Du bon gras, plein de fibres. Mais pas une protéine, même en toast.','Du bon gras et des fibres, mais pas une source de protéines.'],
['Presque que des protéines, très peu de gras. Le meilleur ami de la collation.','Presque uniquement des protéines, très peu de gras. Adapté en collation.'],
['Une estimation, pas une promesse. Échauffe-toi quand même.','C’est une estimation. Échauffe-toi toujours avant une série lourde.'],
['Très lent, tu dois pouvoir chanter','Très lent, conversation facile'],
['Après : protéines + glucides dans les 2 h. Pas besoin de courir au shaker en sortant du vestiaire.','Après : protéines + glucides dans les 2 h.'],
['Si tu galères à atteindre tes protéines, une whey peut dépanner.','Si tu as du mal à couvrir tes besoins en protéines, une whey peut compléter.'],
['Quatre produits utiles. Le reste, c’est surtout du marketing.','Quatre produits dont l’efficacité est démontrée.'],
['boosters miracles : ton argent sera mieux placé dans une paire d\'haltères.','boosters : leur efficacité n\'est pas démontrée.'],
['Pas de régime, pas de culpabilité : des protéines à chaque repas, de l\'eau au bon moment, et le bon sens plutôt que le marketing.','Pas de régime : des protéines à chaque repas, de l\'eau au bon moment et des habitudes simples.'],
['Et fatigué, même la meilleure discipline flanche. Aucune poudre ne rattrape une mauvaise nuit.','Et la fatigue rend la régularité plus difficile. Aucun complément ne compense un mauvais sommeil.'],
[' : 20 à 30 minutes les jours de repos récupèrent mieux qu\'un canapé.',' : 20 à 30 minutes les jours de repos favorisent la récupération.'],
['Le sommeil, ton meilleur complément (et il est gratuit)','Le sommeil, premier levier de récupération'],
['Cinq questions, zéro jugement. Et un avis honnête.','Cinq questions pour choisir l’équipement adapté.'],
['Ta charge max, sans risquer ta vie','Ta charge max, sans la tenter'],
['Pompes, gainage, course. Cinq minutes, promis.','Pompes, gainage, course. Cinq minutes.'],
['Combien de séances par semaine, pour de vrai.','Le nombre de séances que tu peux tenir chaque semaine.'],
['Pas de jugement, juste des chiffres pour calibrer ton plan.','Quelques chiffres pour calibrer ton plan.'],
['Réponds honnêtement : personne ne regarde et on ne juge pas. Un plan basé sur ta vraie semaine marche mieux qu\'un plan basé sur tes bonnes résolutions.','Réponds selon ta semaine réelle : un plan construit sur tes vraies habitudes est plus efficace.'],
['La plupart des gens pensent manger des protéines… en mangeant du fromage. On fait les présentations.','Certains aliments sont moins riches en protéines qu\'on ne le pense. Voici les repères.'],
['Oui. Sans engagement, sans frais, en 3 clics depuis ton compte. Pas de lettre recommandée, pas de piège.','Oui. Sans engagement ni frais, en 3 clics depuis ton compte.'],
['Encore plus. C’est au début qu’on prend les bonnes habitudes (et les mauvaises, si personne ne regarde).','Oui. C’est au début que se prennent les habitudes, et un suivi aide à installer les bonnes.'],
['Parce qu’un vrai suivi chaque semaine, ça ne se partage pas avec 50 personnes.','Parce qu’un suivi hebdomadaire de qualité demande du temps pour chaque personne.'],
[' Ton dos te dira merci.','']];
for(const [a,b] of TONE){let k=0;for(const n of ALL){const c=T[n].split(a).length-1;if(c){k+=c;T[n]=T[n].split(a).join(b)}}if(!k)throw new Error('R8 tone :: '+a.slice(0,50))}
// robust scroll-to-top: watch the step signature (first heading in <main>) wherever <main> is re-rendered
const OLD="<script>(function(){var n=0;function go(){var m=document.querySelector('main');if(!m){if(++n<60)setTimeout(go,100);return}new MutationObserver(function(r){for(var i=0;i<r.length;i++){if(r[i].addedNodes.length){if(window.scrollY>0)window.scrollTo({top:0,behavior:'instant'});return}}}).observe(m,{childList:true})}addEventListener('DOMContentLoaded',go)})()</script>";
const NEW="<script>(function(){var last=null,raf=0;function sig(){var m=document.querySelector('main');if(!m)return null;var h=m.querySelector('h1,h2');return h?h.textContent:''}function chk(){raf=0;var s=sig();if(s===null)return;if(last!==null&&s!==last&&window.scrollY>0)window.scrollTo({top:0,behavior:'instant'});last=s}new MutationObserver(function(){if(!raf)raf=requestAnimationFrame(chk)}).observe(document.documentElement,{childList:true,subtree:true,characterData:true})})()</script>";
for(const n of ['Programme.dc.html','Test.dc.html']){if(T[n].split(OLD).length!==2)throw new Error('R8 scroll '+n);T[n]=T[n].replace(OLD,()=>NEW)}
};
