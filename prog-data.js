// Programmes de force Alpha — données partagées par la séance guidée du site (prog.js) et les PDF
// (sources/programmes/build_prog.py). 26 novembre 2026. Contenu repris des docs validés :
// S'y remettre en 6 semaines, Tonicité & fermeté (12 semaines), Force & carrure (12 semaines).

// ---------------------------------------------------------------- les exercices
// n : nom · c : consignes · r : repère (ce qu'il faut sentir ou surveiller)
const EX={
 squat:{n:'Squat',c:['Pieds écartés comme les épaules, pointes légèrement ouvertes.','Descends comme pour t’asseoir, dos droit, genoux dans l’axe des pieds.','Remonte en poussant dans tout le pied.'],r:'Les talons restent au sol, les genoux ne rentrent pas vers l’intérieur.'},
 squatGob:{n:'Squat gobelet',c:['Un haltère tenu contre la poitrine, coudes sous l’haltère.','Descends entre les talons, buste droit, aussi bas que tu restes gainé.','Remonte en poussant dans tout le pied.'],r:'Les coudes frôlent l’intérieur des genoux en bas, le dos reste droit.'},
 pompes:{n:'Pompes',c:['Mains un peu plus larges que les épaules, corps aligné de la tête aux talons.','Descends la poitrine vers le support, coudes à 45° du corps.','Repousse jusqu’aux bras tendus.'],r:'Le bassin ne s’affaisse pas : on pourrait poser une règle sur ton dos.'},
 pont:{n:'Pont fessier',c:['Sur le dos, genoux pliés, pieds à plat près des fesses.','Monte le bassin en serrant les fessiers, tiens 1 seconde en haut.','Redescends en 2 à 3 secondes.'],r:'Ce sont les fessiers qui poussent, pas le bas du dos.'},
 rowing:{n:'Rowing un bras',c:['Une main et un genou en appui sur une chaise, dos plat.','Tire la charge vers la hanche, coude près du corps.','Redescends bras tendu, sans tourner le buste.'],r:'Tu tires avec le dos : l’omoplate se rapproche de la colonne.'},
 planche:{n:'Planche',c:['Sur les avant-bras et la pointe des pieds, coudes sous les épaules.','Serre le ventre et les fessiers, respire normalement.'],r:'Une ligne droite de la tête aux talons.'},
 fente:{n:'Fente arrière',c:['Debout, fais un grand pas en arrière.','Descends jusqu’à ce que le genou arrière frôle le sol, buste droit.','Reviens en poussant dans le talon avant. Alterne les jambes.'],r:'Le genou avant reste au-dessus du pied, il ne part pas vers l’intérieur.'},
 sdtr:{n:'Soulevé de terre roumain',c:['Debout, genoux légèrement fléchis, la charge devant les cuisses.','Recule les fesses et penche le buste, dos plat, la charge glisse le long des jambes.','Remonte en poussant les hanches vers l’avant.'],r:'Tu sens l’arrière des cuisses s’étirer ; le dos ne s’arrondit jamais.'},
 devEp:{n:'Développé épaules',c:['Assis ou debout, les charges à hauteur des épaules.','Pousse vers le plafond jusqu’aux bras presque tendus.','Redescends lentement à hauteur des oreilles.'],r:'Le ventre reste serré, le bas du dos ne se creuse pas.'},
 marche:{n:'Montée sur marche',c:['Un pied entier sur la marche ou la chaise stable.','Monte en poussant dans le talon du pied posé, sans t’aider de la jambe d’en bas.','Redescends lentement. Change de jambe à mi-série.'],r:'Le genou reste dans l’axe du pied.'},
 deadbug:{n:'Dead bug',c:['Sur le dos, bras vers le plafond, genoux pliés à 90° au-dessus des hanches.','Tends lentement un bras derrière la tête et la jambe opposée vers le sol, sans les poser.','Reviens et change de côté, jusqu’à la fin du temps.'],r:'Le bas du dos reste collé au sol.'},
 escaliers:{n:'Escaliers et planche',c:['Monte un étage d’escaliers vite, redescends en marchant.','En bas, 30 secondes de planche. C’est un tour.','4 à 8 tours. Sans escalier : 20 min de marche rapide, puis le circuit de la semaine 1 du Défi gainage.'],r:'Souffle court en haut, mais tu peux encore dire une phrase.'},
 abduc:{n:'Abduction à l’élastique',c:['Élastique au-dessus des genoux, allongée sur le côté ou assise.','Ouvre le genou contre l’élastique, tiens 1 seconde.','Reviens lentement.'],r:'Tu sens le côté de la fesse travailler, pas la cuisse.'},
 hipThrust:{n:'Hip thrust',c:['Haut du dos contre le canapé ou un banc, la charge sur les hanches.','Monte le bassin jusqu’à l’alignement épaules-hanches-genoux, serre 1 seconde.','Redescends en contrôlant.'],r:'Le menton reste rentré, les côtes basses : ce sont les fessiers qui montent.'},
 hipThrust1:{n:'Hip thrust une jambe',c:['Même position que le hip thrust, une jambe tendue ou genou vers la poitrine.','Monte en poussant dans le talon au sol.','Change de jambe après la série.'],r:'Les hanches restent à la même hauteur des deux côtés.'},
 pompesInc:{n:'Pompes inclinées',c:['Mains sur le plan de travail ou une chaise, corps aligné.','Descends la poitrine vers le support, coudes à 45°.','Plus le support est bas, plus c’est dur.'],r:'Le bassin reste aligné avec les épaules.'},
 gainLat:{n:'Gainage latéral',c:['Sur le côté, coude sous l’épaule, genoux ou pieds au sol.','Monte les hanches jusqu’à l’alignement. Change de côté après le temps.'],r:'Les hanches ne retombent pas et ne partent pas en arrière.'},
 bulgare:{n:'Fente bulgare',c:['Le pied arrière posé sur une chaise, le pied avant un grand pas devant.','Descends droit vers le sol, buste légèrement penché.','Remonte en poussant dans le talon avant. Toutes les répétitions d’une jambe, puis l’autre.'],r:'Le genou avant suit la direction du pied.'},
 devCouche:{n:'Développé couché',c:['Sur le dos (au sol ou sur un banc), haltères au-dessus de la poitrine.','Descends jusqu’à ce que les coudes touchent le sol ou passent sous le banc, coudes à 45°.','Repousse vers le plafond.'],r:'Les omoplates restent serrées, les pieds bien au sol.'},
 tirageElas:{n:'Tirage élastique',c:['Élastique accroché en hauteur (porte, barre), à genoux ou assise.','Tire les coudes vers les poches, poitrine sortie.','Reviens bras tendus en contrôlant.'],r:'Les épaules restent basses, loin des oreilles.'},
 pallof:{n:'Pallof press',c:['Élastique accroché sur le côté à hauteur de poitrine.','Pousse les mains devant toi bras tendus, tiens 2 secondes, ramène.','Le buste ne doit pas tourner. Change de côté.'],r:'C’est le ventre qui résiste à la rotation.'},
 stepUp:{n:'Step-up chargé',c:['Haltères en main, un pied sur une chaise stable.','Monte en poussant dans le talon, sans élan de la jambe d’en bas.','Redescends lentement. Toutes les répétitions d’une jambe, puis l’autre.'],r:'Le genou reste dans l’axe du pied.'},
 pont1:{n:'Pont fessier une jambe',c:['Sur le dos, un pied au sol, l’autre jambe tendue.','Monte le bassin, tiens 2 secondes en haut.','Redescends lentement. Change de jambe.'],r:'Le bassin ne penche pas d’un côté.'},
 kickback:{n:'Kickback à l’élastique',c:['À quatre pattes, élastique autour d’un pied et des mains.','Pousse le talon vers le plafond, jambe pliée à 90°.','Reviens sans poser le genou.'],r:'Le dos reste plat, il ne se creuse pas quand la jambe monte.'},
 farmer:{n:'Marche du fermier',c:['Une charge lourde dans chaque main, bras tendus.','Marche à petits pas, épaules basses, buste droit.'],r:'Les épaules ne tombent pas vers l’avant. Les maniques protègent les mains quand ça devient lourd.'},
 birddog:{n:'Bird dog',c:['À quatre pattes, mains sous les épaules, genoux sous les hanches.','Tends un bras et la jambe opposée, tiens 2 secondes, change.'],r:'Le dos reste plat comme une table.'},
 sdtr1:{n:'Soulevé de terre roumain une jambe',c:['Debout sur une jambe, une charge dans la main opposée.','Penche le buste en tendant la jambe libre derrière toi, dos plat.','Remonte en serrant la fesse de la jambe d’appui.'],r:'Le bassin reste face au sol, il ne s’ouvre pas sur le côté.'},
 plancheBras:{n:'Planche, lever de bras',c:['En planche sur les mains ou les avant-bras, pieds écartés.','Tends un bras devant toi, repose, change de bras, lentement.'],r:'Le bassin ne tourne pas.'},
 latJambe:{n:'Gainage latéral, lever de jambe',c:['En gainage latéral, jambes tendues.','Monte et descends lentement la jambe du dessus.'],r:'Les hanches restent hautes.'},
 pontExplo:{n:'Pont fessier explosif',c:['Position du pont, haltère sur les hanches.','Monte le bassin le plus vite possible, redescends en 3 secondes.'],r:'La vitesse vient des fessiers, pas d’un coup de reins.'},
 sauts:{n:'Petits sauts sur place',c:['Petits sauts sur la pointe des pieds, réception souple.','Facultatif : uniquement sans douleur articulaire, sans fuite urinaire, et avec l’accord du médecin en cas d’ostéoporose.'],r:'Réception silencieuse, genoux souples.'},
 elevLat:{n:'Élévations latérales',c:['Debout, un haltère léger dans chaque main.','Monte les bras sur les côtés jusqu’à l’horizontale, coudes légèrement fléchis.','Redescends en 2 secondes.'],r:'Les épaules restent basses : on ne hausse pas les épaules.'},
 tractions:{n:'Tractions',c:['Mains un peu plus larges que les épaules, suspendu bras tendus.','Tire les coudes vers les poches jusqu’au menton au-dessus de la barre.','Redescends lentement jusqu’aux bras tendus.'],r:'0 à 2 : élastique ou négatives lentes (5 s). 3 à 7 : complètes puis négatives. 8 et plus : double progression, puis lestées.'},
 devMil:{n:'Développé militaire',c:['Debout, haltères ou barre à hauteur des épaules.','Pousse au-dessus de la tête, la tête passe légèrement devant à la fin.','Redescends en contrôlant.'],r:'Fessiers et ventre serrés : le dos ne se creuse pas.'},
 curl:{n:'Curl biceps',c:['Debout, haltères bras tendus, paumes vers l’avant.','Plie les coudes sans les avancer.','Redescends en 2 à 3 secondes.'],r:'Pas d’élan avec le dos.'},
 rowPenche:{n:'Rowing penché',c:['Buste penché à 45°, dos plat, une charge dans chaque main.','Tire les coudes vers les hanches.','Redescends bras tendus.'],r:'Le dos reste plat et immobile pendant toute la série.'},
 devIncl:{n:'Développé incliné',c:['Dos incliné à 30-45° (banc ou coussin calé).','Pousse les haltères au-dessus du haut de la poitrine.','Redescends coudes à 45°.'],r:'Les omoplates restent serrées contre le support.'},
 extTri:{n:'Extension triceps',c:['Un haltère tenu à deux mains au-dessus de la tête.','Plie les coudes pour descendre l’haltère derrière la tête.','Tends les bras sans écarter les coudes.'],r:'Les coudes restent pointés vers l’avant.'},
 chaiseMur:{n:'Chaise contre le mur',c:['Dos au mur, cuisses parallèles au sol, genoux à 90°.','Tiens le plus longtemps possible.'],r:'Le dos reste collé au mur.'}
};

// ---------------------------------------------------------------- outils de construction
// Élément de séance : e (exercice), s (séries), r [min,max] répétitions, sec [min,max] secondes (gainage),
// rep (repos en s), par ('jambe', 'bras', 'côté'), m / sl (nom maison / salle), v (3 versions, S'y remettre),
// ch (true : on note une charge), fac (facultatif), note.
function it(e,s,r,rep,o){return Object.assign({e:e,s:s,r:r,rep:rep},o||{})}
function ch(e,s,sec,rep,o){return Object.assign({e:e,s:s,sec:sec,rep:rep},o||{})}
function allege(se){return Object.assign({},se,{items:se.items.map(x=>x.s>1?Object.assign({},x,{s:x.s-1}):x)})}

// ---------------------------------------------------------------- S'y remettre en 6 semaines
const REM_A=[
 {e:'squat',ch:true,v:['S’asseoir et se relever d’une chaise, sans les mains','Squat au poids du corps','Squat gobelet, haltère contre la poitrine']},
 {e:'pompes',v:['Mains sur le plan de travail','Mains sur une chaise, ou genoux au sol','Pompes complètes']},
 {e:'pont',ch:true,v:['Deux pieds au sol','Pause de 2 s en haut','Haltère sur les hanches']},
 {e:'rowing',ch:true,par:'bras',v:['Sac à dos léger, un bras, appui sur la chaise','Sac à dos chargé','Haltère, un bras']},
 {e:'planche',chrono:[20,30,45],v:['Genoux au sol','Sur les avant-bras','Sur les avant-bras']}
];
const REM_B=[
 {e:'fente',ch:true,par:'jambe',v:['Une main sur le dossier d’une chaise','Sans appui','Haltères dans les mains']},
 {e:'sdtr',ch:true,v:['Mains sur les cuisses, sans charge, pour apprendre la charnière de hanche','Sac à dos chargé tenu devant soi','Haltères']},
 {e:'devEp',ch:true,v:['Assis, deux bouteilles d’eau','Assis, sac à dos ou haltères légers','Assis, haltères']},
 {e:'marche',ch:true,par:'jambe',v:['Marche basse, une main sur la rampe','Chaise ou marche haute','Haltères dans les mains']},
 {e:'deadbug',chrono:[20,30,45],v:['Jambes seules','Bras et jambes','Lent, bras et jambes']}
];
function remSeance(k,t,base,s,r,rep){return {k:k,t:t,items:base.map(x=>x.chrono?Object.assign({},x,{s:s,sec:null,rep:30}):Object.assign({},x,{s:s,r:r,rep:rep}))}}
const REM_C={k:'C',t:'Souffle et gainage',fac:true,items:[{e:'escaliers',libre:'20 minutes : 4 à 8 tours'}]};
function remPlan(){
 const P=[];
 for(let w=1;w<=6;w++){
  let s,r,rep,rir,ph;
  if(w<=2){s=2;r=[10,12];rep=90;rir='2 à 3';ph='Apprendre les gestes'}
  else if(w<=4){s=3;r=[10,12];rep=60;rir='2';ph='Ajouter une série'}
  else if(w===5){s=3;r=[8,10];rep=60;rir='1 à 2';ph='Le premier goût de la force'}
  else {s=2;r=[8,10];rep=60;rir='2';ph='Mesurer et choisir la suite'}
  const se=[remSeance('A','Jambes et pousser',REM_A,s,r,rep)];
  if(w<6)se.push(remSeance('B','Hanches, dos et épaules',REM_B,s,r,rep));
  if(w>=3&&w<=5)se.push(REM_C);
  if(w===6)se.push({k:'T',t:'Les tests de fin',test:true,items:[]});
  P.push({w:w,phase:ph,rir:rir,seances:se});
 }
 return P;
}

// ---------------------------------------------------------------- Tonicité & fermeté (12 semaines)
const TON_P1=[
 {k:'1',t:'Fessiers et jambes',items:[
  it('squatGob',3,[10,12],120,{ch:true,sl:'Identique ou presse à cuisses'}),
  it('pont',3,[10,12],120,{ch:true,m:'Pont fessier au sol, haltère sur les hanches',sl:'Hip thrust à la machine'}),
  it('sdtr',3,[10,12],120,{ch:true,m:'Soulevé de terre roumain aux haltères',sl:'Identique'}),
  it('abduc',2,[15,15],60,{par:'côté',m:'Allongée sur le côté, élastique aux genoux',sl:'Machine à abducteurs'}),
  ch('planche',3,[20,30],30,{sl:'Identique'})]},
 {k:'2',t:'Haut du corps, gainage et fessiers',items:[
  it('rowing',3,[10,12],90,{ch:true,par:'bras',m:'Rowing haltère un bras, appui sur une chaise',sl:'Rowing à la poulie'}),
  it('pompesInc',3,[8,12],90,{m:'Mains sur le plan de travail',sl:'Pompes sur banc'}),
  it('hipThrust',3,[10,12],120,{ch:true,m:'Dos contre le canapé, haltère sur les hanches',sl:'Hip thrust à la barre'}),
  it('devEp',2,[10,12],90,{ch:true,m:'Haltères, assise',sl:'Identique'}),
  ch('deadbug',3,[30,30],30,{sl:'Identique'}),
  ch('gainLat',2,[20,20],30,{par:'côté',m:'Genoux au sol si besoin',sl:'Identique'})]}
];
const TON_P2=[
 {k:'1',t:'Fessiers et jambes',items:[
  it('bulgare',3,[8,10],120,{ch:true,par:'jambe',m:'Pied arrière sur une chaise, haltères',sl:'Identique, haltères plus lourds'}),
  it('sdtr',4,[8,10],120,{ch:true,m:'Aux haltères',sl:'À la barre'}),
  it('hipThrust1',3,[10,12],90,{ch:true,par:'jambe',m:'Dos contre le canapé',sl:'Hip thrust à la barre, deux jambes'}),
  it('abduc',3,[12,15],60,{m:'Assise, élastique aux genoux',sl:'Machine à abducteurs'}),
  ch('planche',3,[30,45],30,{sl:'Identique'})]},
 {k:'2',t:'Haut du corps, gainage et fessiers',items:[
  it('hipThrust',4,[8,10],120,{ch:true,m:'Deux jambes, haltère lourd',sl:'Hip thrust à la barre'}),
  it('rowing',4,[8,10],90,{ch:true,par:'bras',m:'Haltère un bras',sl:'Rowing à la barre'}),
  it('devCouche',3,[8,10],90,{ch:true,m:'Au sol, haltères',sl:'Haltères sur banc'}),
  it('tirageElas',3,[10,12],60,{m:'Élastique accroché en hauteur',sl:'Tirage vertical à la poulie'}),
  it('pallof',3,[10,10],45,{par:'côté',m:'À l’élastique',sl:'À la poulie'}),
  ch('gainLat',3,[30,30],30,{par:'côté',sl:'Identique'})]},
 {k:'3',t:'Fessiers et gainage',fac:true,items:[
  it('stepUp',3,[8,10],90,{ch:true,par:'jambe',m:'Chaise stable, haltères',sl:'Banc, charges plus lourdes'}),
  it('pont1',3,[10,12],60,{par:'jambe',m:'Pause 2 s en haut',sl:'Identique'}),
  it('kickback',3,[12,15],60,{par:'jambe',m:'À quatre pattes, élastique',sl:'À la poulie'}),
  ch('farmer',3,[40,40],90,{ch:true,m:'Deux haltères lourds',sl:'Identique'}),
  ch('birddog',3,[30,30],30,{sl:'Identique'})]}
];
const TON_P3=[
 {k:'1',t:'Force des fessiers et des jambes',items:[
  it('hipThrust',4,[6,8],150,{ch:true,m:'Deux jambes, haltère le plus lourd',sl:'Hip thrust à la barre, charge lourde'}),
  it('bulgare',4,[6,8],150,{ch:true,par:'jambe',m:'Haltères les plus lourds',sl:'Squat à la barre'}),
  it('sdtr1',3,[8,10],90,{ch:true,par:'jambe',sl:'Soulevé de terre roumain à la barre'}),
  it('abduc',3,[12,15],60,{m:'Élastique fort',sl:'Machine à abducteurs'}),
  ch('plancheBras',3,[40,40],30,{sl:'Identique'})]},
 {k:'2',t:'Force du haut du corps et gainage',items:[
  it('rowing',4,[6,8],120,{ch:true,par:'bras',m:'Haltère lourd',sl:'Rowing à la barre'}),
  it('devCouche',4,[6,8],120,{ch:true,m:'Au sol, haltères lourds',sl:'Développé couché aux haltères'}),
  it('pompes',3,[8,12],90,{m:'Amplitude complète ou inclinées',sl:'Identique'}),
  ch('farmer',4,[40,40],90,{ch:true,m:'Lourd',sl:'Identique'}),
  ch('latJambe',3,[30,30],30,{par:'côté',sl:'Identique'})]},
 {k:'3',t:'Fessiers, volume et puissance',fac:true,items:[
  it('hipThrust',3,[8,10],120,{ch:true,m:'Deux jambes, pause 3 s en haut',sl:'À la barre'}),
  it('pontExplo',3,[6,8],90,{ch:true,sl:'Kettlebell swing'}),
  it('sauts',3,[10,10],60,{fac:true,sl:'Identique'}),
  it('kickback',2,[15,15],60,{par:'jambe',m:'À l’élastique',sl:'À la poulie'}),
  ch('deadbug',3,[40,40],30,{m:'Bouteille d’eau dans les mains',sl:'Avec un disque léger'})]}
];
function tonPlan(){
 const P=[];
 for(let w=1;w<=12;w++){
  let base,ph,rir;
  if(w<=4){base=TON_P1;ph='Fondation';rir='2 à 3'}else if(w<=8){base=TON_P2;ph='Construction';rir='1 à 2'}else if(w<=11){base=TON_P3;ph='Force';rir='1 à 2'}
  let se;
  if(w===12)se=[Object.assign({},TON_P1[0],{note:'Charges de la semaine 11 réduites de 30 %, puis 15 minutes de mobilité.'}),{k:'T',t:'Les tests de fin',test:true,items:[]}],ph='Bilan',rir='2';
  else se=base.map(x=>(w===4||w===8)?Object.assign(allege(x),{note:'Semaine allégée : une série de moins, mêmes charges.'}):x);
  P.push({w:w,phase:ph,rir:rir,seances:se});
 }
 return P;
}

// ---------------------------------------------------------------- Force & carrure (12 semaines)
const CAR=[
 {k:'A',t:'Jambes et pousser',items:[
  {e:'squatGob',g:1,ch:true,sl:'Squat à la barre'},
  {e:'devCouche',g:1,ch:true,m:'Au sol ou sur banc, haltères',sl:'Banc, barre ou haltères'},
  {e:'rowing',g:1,ch:true,par:'bras',m:'Un bras, appui sur une chaise',sl:'Rowing haltère ou poulie basse'},
  {e:'fente',g:1,ch:true,par:'jambe',m:'Haltères dans les mains',sl:'Identique'},
  {e:'elevLat',g:0,ch:true,m:'Haltères légers',sl:'Haltères ou poulie'},
  {e:'planche',sec:[45,60],s:3,rep:45,sl:'Identique'}]},
 {k:'B',t:'Hanches et tirer',items:[
  {e:'sdtr',g:1,ch:true,m:'Haltères',sl:'Barre'},
  {e:'tractions',g:1,ch:true,m:'Élastique, négatives, puis complètes',sl:'Idem, ou tirage vertical'},
  {e:'devMil',g:1,ch:true,m:'Debout, haltères',sl:'Barre ou haltères'},
  {e:'hipThrust',g:1,ch:true,m:'Épaules sur le canapé, haltère sur les hanches',sl:'Barre sur banc'},
  {e:'curl',g:0,ch:true,m:'Haltères',sl:'Identique'},
  {e:'farmer',sec:[40,40],s:3,rep:90,ch:true,m:'Haltères lourds',sl:'Identique'}]},
 {k:'C',t:'Unilatéral et bras',items:[
  {e:'bulgare',g:1,ch:true,par:'jambe',m:'Pied arrière sur une chaise, haltères',sl:'Identique'},
  {e:'pompes',g:1,ch:true,m:'Lestées (sac à dos) dès 20 propres',sl:'Pompes ou dips assistés'},
  {e:'rowPenche',g:1,ch:true,m:'Deux haltères',sl:'Barre ou machine'},
  {e:'devIncl',g:1,ch:true,m:'Haltères, dos sur un coussin calé',sl:'Banc incliné'},
  {e:'extTri',g:0,ch:true,m:'Haltère au-dessus de la tête',sl:'Poulie'},
  {e:'gainLat',sec:[30,45],s:2,rep:30,par:'côté',sl:'Identique'}]}
];
function carPlan(){
 const P=[];
 const W=w=>w<=3?{g:[3,[10,12]],i:[3,[12,15]],ph:'Fondation',rir:'2 à 3'}:w===4?{g:[2,[10,12]],i:[2,[12,15]],ph:'Fondation · allégée',rir:'3'}:
  w<=7?{g:[4,[8,10]],i:[3,[10,12]],ph:'Construction',rir:'1 à 2'}:w===8?{g:[3,[8,10]],i:[2,[10,12]],ph:'Construction · allégée',rir:'2'}:{g:[4,[6,8]],i:[3,[10,12]],ph:'Force',rir:'1 à 2'};
 for(let w=1;w<=12;w++){
  if(w===12){P.push({w:12,phase:'Bilan',rir:'—',seances:[{k:'T1',t:'Tests 1 : tractions, pompes, planche, mesures',test:true,items:[]},{k:'T2',t:'Tests 2 : charges pour 8 répétitions (48 h après)',test:true,items:[]}]});continue}
  const x=W(w);
  const se=CAR.map(s=>({k:s.k,t:s.t,note:(w===4||w===8)?'Semaine allégée : une série de moins, mêmes charges.':(w===5||w===9)?'Nouvelle phase : ajoute 5 à 10 % de charge sur les gros exercices.':'',
   items:s.items.map(y=>y.sec?Object.assign({},y):Object.assign({},y,{s:y.g?x.g[0]:x.i[0],r:y.g?x.g[1]:x.i[1],rep:y.g?120:75}))}));
  P.push({w:w,phase:x.ph,rir:x.rir,seances:se});
 }
 return P;
}

// ---------------------------------------------------------------- les trois programmes
const PROGS=[
 {slug:'sy-remettre',jeton:'r6m2pq8w',titre:'S’y remettre en 6 semaines',court:'S’Y REMETTRE',semaines:6,
  accroche:'6 semaines pour reprendre sans se blesser : un test fixe ton point de départ, puis tu passes du poids du corps aux premières charges.',
  rythme:'2 séances de 30 à 35 min par semaine, une 3e facultative dès la semaine 3',materiel:'Une chaise solide, un sac à dos à charger, un tapis. Au niveau Confirmé, des haltères réglables.',
  niveaux:[{n:'Départ',s:'Chaise < 45 s · pompes < 10 sur les genoux · planche < 30 s'},{n:'Intermédiaire',s:'Chaise 45 à 90 s · 10 pompes sur les genoux · planche 30 à 60 s'},{n:'Confirmé',s:'Chaise > 90 s · 10 pompes complètes · planche > 60 s'}],
  regleNiveau:'Tu prends le niveau le plus bas des trois tests : on part toujours de son point faible.',
  tests:[{k:'chaise',n:'Chaise contre le mur',u:'s'},{k:'pompes',n:'Pompes propres (nombre, préciser la version)',u:'rép.'},{k:'planche',n:'Planche',u:'s'}],
  echauffement:['Marche sur place, 1 min','Cercles de hanches et d’épaules, 1 min','10 squats lents','2 séries légères du premier exercice'],
  calme:['Étirement des fessiers et des cuisses, 30 s par côté','Posture de l’enfant, 1 min','5 respirations lentes, allongé'],
  suite:'La suite, ce sont les charges : Tonicité & fermeté ou Force & carrure, 12 semaines.',
  reprise:[[14,0,'La semaine où tu t’es arrêté, avec la version d’en dessous la première séance'],[42,2,'2 semaines en arrière'],[9999,-1,'Refais le test du jour 1 : il te donne ton nouveau niveau']],
  plan:remPlan()},
 {slug:'tonicite-fermete',jeton:'t3fk7n2v',titre:'Tonicité & fermeté',court:'TONICITÉ & FERMETÉ',fem:true,semaines:12,
  accroche:'12 semaines pour un corps plus tonique et plus ferme : des fessiers plus forts, une force retrouvée et des os qui travaillent.',
  rythme:'2 séances par semaine, 3 dès la semaine 5 si tu peux',materiel:'Une paire d’haltères réglables jusqu’à 15 ou 20 kg, un élastique, un tapis, une chaise stable ou un canapé.',
  lieux:true,
  tests:[{k:'planche',n:'Planche',u:'s'},{k:'chaise',n:'Chaise contre le mur',u:'s'},{k:'pompes',n:'Pompes propres',u:'rép.'},{k:'hip8',n:'Hip thrust : charge pour 8 répétitions',u:'kg'},{k:'squat8',n:'Squat gobelet : charge pour 8 répétitions',u:'kg'},{k:'hanches',n:'Tour de hanches (facultatif)',u:'cm'}],
  echauffement:['3 min de cardio léger : vélo, rameur ou marche rapide','10 cercles de hanches de chaque côté','10 ponts fessiers, 2 s en haut','10 squats lents','10 « chat-vache » à quatre pattes','1 série légère du premier exercice'],
  calme:['Étirement des fessiers allongée, 30 s par côté','Fléchisseurs de hanche en fente, 30 s par côté','Ischios, 30 s par jambe','5 respirations profondes, mains sur le ventre'],
  suite:'Et après ? Un nouveau cycle de 12 semaines, en repartant de la phase 2 avec tes nouvelles charges.',
  reprise:[[14,0,'La semaine où tu t’es arrêtée · −10 % la première séance'],[42,2,'2 semaines en arrière · −15 à 20 %'],[84,-2,'Début de la phase où tu étais · nouvelle recherche des charges'],[9999,-1,'Semaine 1, après le test de départ · nouvelle recherche des charges']],
  plan:tonPlan()},
 {slug:'force-carrure',jeton:'c8vh4m1x',titre:'Force & carrure',court:'FORCE & CARRURE',semaines:12,
  accroche:'12 semaines pour devenir plus fort et changer de silhouette : des épaules et un dos qui se dessinent, des bras plus solides, un ventre plus sec.',
  rythme:'3 séances de 45 à 55 min par semaine (A, B, C)',materiel:'Une paire d’haltères réglables jusqu’à 20 à 25 kg, une barre de traction de porte, un tapis. Un banc est utile, pas obligatoire.',
  lieux:true,
  entree:[{n:'Pompes complètes',s:'10 ou plus'},{n:'Squat au poids du corps, cuisses parallèles',s:'20 sans douleur'},{n:'Planche',s:'60 s ou plus'}],
  regleNiveau:'Un seul test raté : commence par S’y remettre en 6 semaines. Ce n’est pas un recul, c’est le bon ordre.',
  tests:[{k:'tractions',n:'Tractions complètes',u:'rép.'},{k:'pompes',n:'Pompes complètes',u:'rép.'},{k:'dc8',n:'Développé couché : charge pour 8 répétitions',u:'kg'},{k:'bulg8',n:'Squat bulgare : charge pour 8 répétitions par jambe',u:'kg'},{k:'planche',n:'Planche',u:'s'},{k:'taille',n:'Tour de taille, au nombril',u:'cm'},{k:'bras',n:'Tour de bras contracté',u:'cm'}],
  echauffement:['Mobilité des hanches et des épaules, 4 min','Cercles de bras, rotations du buste','2 séries légères du premier exercice'],
  calme:['Étirement des pectoraux contre un mur, 30 s par côté','Fessiers et ischios, 30 s par côté','5 respirations lentes'],
  suite:'Et après ? Refais le programme avec tes nouvelles charges, ou garde 2 séances par semaine pour entretenir.',
  reprise:[[14,0,'La semaine où tu t’es arrêté · −10 % la première séance'],[42,2,'2 semaines en arrière · −15 à 20 %'],[84,-2,'Début de la phase où tu étais · nouvelle séance 0'],[9999,-1,'Tests de départ complets : semaine 1, ou S’y remettre en 6 semaines']],
  plan:carPlan()}
];
// Début de phase pour chaque semaine (utilisé par la règle de reprise « début de la phase »).
PROGS.forEach(p=>{let d=1;p.plan.forEach((s,i)=>{if(i>0&&s.phase.split(' ·')[0]!==p.plan[i-1].phase.split(' ·')[0])d=s.w;s.debutPhase=d})});
module.exports={EX,PROGS};
