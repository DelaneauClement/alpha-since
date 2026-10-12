// Round 9: remaining humour removed + "Menu" label on the burger button
module.exports=function(T){
const ALL=Object.keys(T).filter(n=>n.endsWith('.html'));
const alt=s=>s.includes('’')?s.split('’').join("'"):s.split("'").join('’');
const TONE=[
['La moitié de l’assiette en légumes, midi et soir. Les chips du soir ne comptent pas, même au paprika.','La moitié de l’assiette en légumes, midi et soir.'],
['Il freine la récupération et la construction musculaire. Garde-le pour les occasions, pas pour le mardi soir.','Il freine la récupération et la construction musculaire. Limite-le aux occasions.'],
['Nos accessoires ne te servent pas vraiment : de bonnes chaussures et la playlist Boost font l’affaire.','Pas besoin d’accessoires pour ce type d’entraînement : de bonnes chaussures suffisent.'],
['Tu n’as besoin de rien de plus pour l’instant. Garde ton argent, et reviens quand tes mains te le diront.','Tu n’as besoin de rien de plus pour l’instant. Une protection deviendra utile si tes mains s’abîment.'],
['Pour cette séance, l’eau suffit largement. Garde ton argent.','Pour cette séance, l’eau suffit.'],
['Bonne humeur et refrains qu’on chante entre deux séries.','Des titres entraînants pour les séances régulières.'],
['Copier le programme du voisin qui s’entraîne depuis dix ans.','Copier le programme d’une personne qui s’entraîne depuis des années.'],
[' Oui, ça compte comme courir.',''],
['La technique d’abord, l’ego plus tard.','La technique d’abord.'],
['Construire le moteur : beaucoup d’allure facile, du renforcement, zéro blessure.','Construire le moteur : beaucoup d’allure facile et du renforcement, pour éviter les blessures.'],
['Reprendre une routine sans se dégoûter.','Reprendre une routine à un rythme tenable.'],
['Corrige-les une par une, pas toutes le même lundi.','Corrige-les une par une.'],
['Honnêtement, ton assiette freine plus tes résultats que ton entraînement.','Ton alimentation freine plus tes résultats que ton entraînement.'],
['Sans elles, tu t’entraînes pour rien : le chantier n’a pas de briques.','Sans apport suffisant, l’entraînement donne peu de résultats.'],
['Ils ne font pas grossir par magie le soir','Ils ne font pas grossir le soir'],
[' Le héros discret de l’assiette.',''],
['1 fois par semaine, quand j’y pense.','1 fois par semaine, de façon irrégulière.'],
['Mieux vaut 3 séances tenues toute l’année que 6 abandonnées en février.','Mieux vaut 3 séances tenues dans la durée que 6 abandonnées au bout de quelques semaines.']];
for(const [a0,b0] of TONE){let k=0;for(const [a,b] of [[a0,b0],[alt(a0),alt(b0)]]){for(const n of ALL){const c=T[n].split(a).length-1;if(c){k+=c;T[n]=T[n].split(a).join(b)}}}if(!k)throw new Error('R9 tone :: '+a0.slice(0,50))}
// "Menu" label next to the burger icon
const ICON='<line x1="4" y1="8" x2="20" y2="8"></line><line x1="4" y1="16" x2="20" y2="16"></line></svg></button>';
const LBL='<line x1="4" y1="8" x2="20" y2="8"></line><line x1="4" y1="16" x2="20" y2="16"></line></svg><span class="a-burger-lbl">Menu</span></button>';
const CSS='.a-burger{width:auto;padding:0 14px 0 10px;gap:6px}.a-burger svg{width:22px;height:22px}.a-burger-lbl{font-weight:800;font-size:13px;letter-spacing:.08em;text-transform:uppercase;line-height:1}\n';
const MQ='@media (min-width:960px){.a-nav{display:flex}.a-burger{display:none}';
for(const n of [...ALL,'site.css']){
  if(n!=='site.css'){const c=T[n].split(ICON).length-1;if(c!==1)throw new Error('R9 burger '+n+' '+c);T[n]=T[n].replace(ICON,()=>LBL)}
  if(n==='Conseils.html'||n==='Legal.html')continue;
  if(T[n].split(MQ).length!==2)throw new Error('R9 css '+n);T[n]=T[n].replace(MQ,()=>CSS+MQ);
}
};
