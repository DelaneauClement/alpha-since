// Défi gainage 30 jours — données partagées par la séance guidée du site (defi.js) et le PDF
// (sources/programmes/build_gainage.py, qui lit l'export JSON). Version enrichie du 25 novembre 2026.

// Pictogrammes : repère 200 × 100, sol à y = 90. l = ligne brisée [x,y,x,y,…], c = tête [x,y,r],
// d = flèche de mouvement en pointillés [x1,y1,x2,y2].
const P={
 planche:[{c:[34,55,8]},{l:[28,90,48,90,48,63]},{l:[48,63,112,68,168,88]}],
 lateraleD:[{c:[30,50,8]},{l:[40,90,40,60]},{l:[40,60,108,72,170,88]},{l:[40,60,40,28]}],
 deadbug:[{c:[26,80,8]},{l:[36,84,98,86]},{l:[46,84,50,44]},{l:[46,84,14,52]},{l:[98,86,98,54,128,54]},{l:[98,86,162,72]},{d:[60,40,20,60]}],
 lateraleG:[{c:[170,50,8]},{l:[160,90,160,60]},{l:[160,60,92,72,30,88]},{l:[160,60,160,28]}],
 birddog:[{c:[26,46,8]},{l:[40,90,40,56]},{l:[40,56,104,56]},{l:[40,56,4,50]},{l:[104,56,104,90,132,90]},{l:[104,56,168,50]}],
 pont:[{c:[20,84,8]},{l:[30,88,92,62]},{l:[92,62,128,50,140,90]},{l:[40,88,64,90]},{d:[92,40,92,58]}],
 // variantes
 epaules:[{c:[34,52,8]},{l:[46,90,46,60]},{l:[46,60,112,66,168,88]},{l:[52,62,66,74,48,64]},{d:[70,46,56,58]}],
 pontUneJambe:[{c:[20,84,8]},{l:[30,88,92,62]},{l:[92,62,128,50,140,90]},{l:[92,62,124,46,170,30]},{l:[40,88,64,90]}],
 rotation:[{c:[30,50,8]},{l:[40,90,40,60]},{l:[40,60,108,72,170,88]},{l:[40,60,64,80]},{d:[44,28,62,70]}],
 coudeGenou:[{c:[26,46,8]},{l:[40,90,40,56]},{l:[40,56,104,56]},{l:[40,56,66,70]},{l:[104,56,104,90,132,90]},{l:[104,56,74,72]},{d:[150,48,100,64]}],
 montagne:[{c:[34,52,8]},{l:[46,90,46,60]},{l:[46,60,112,66,168,88]},{l:[112,66,86,74,104,90]},{d:[130,56,96,62]}],
 banane:[{c:[30,64,8]},{l:[40,70,98,88]},{l:[40,70,6,56]},{l:[98,88,168,64]}],
 // mise en route et retour au calme
 chatvache:[{c:[26,52,8]},{l:[40,90,40,58]},{l:[40,58,72,44,104,58]},{l:[104,58,104,90,132,90]}],
 enfant:[{c:[62,80,8]},{l:[140,89,100,89,128,64,76,78]},{l:[76,80,22,88]}],
 respiration:[{c:[22,82,8]},{l:[32,86,104,86,128,64,150,88]},{l:[60,86,74,76]}]
};

// Positions de base (semaine 1) et variantes, avec leur version plus facile.
const POS={
 planche:{n:'Planche',z:'Ventre, gainage',p:'planche',
  i:['Sur les avant-bras et la pointe des pieds, coudes sous les épaules.','Serre le ventre et les fessiers, repousse le sol avec les avant-bras.','Respire normalement et tiens.'],
  r:'Une ligne droite de la tête aux talons : le bassin ne monte pas, ne s’affaisse pas.',f:'Genoux au sol, le corps aligné des genoux aux épaules.'},
 lateraleD:{n:'Planche latérale droite',z:'Côtés, taille',p:'lateraleD',
  i:['Allongé sur le côté droit, coude droit sous l’épaule, jambes tendues l’une sur l’autre.','Monte les hanches jusqu’à former une ligne droite.','Le bras libre sur la hanche ou tendu vers le plafond.'],
  r:'Les hanches restent hautes et ne partent ni en avant ni en arrière.',f:'Genoux pliés au sol, seules les hanches montent.'},
 deadbug:{n:'Dead bug',z:'Abdominaux profonds',p:'deadbug',
  i:['Sur le dos, bras tendus vers le plafond, genoux pliés à 90° au-dessus des hanches.','Tends lentement un bras derrière la tête et la jambe opposée vers le sol, sans les poser.','Reviens au centre et change de côté, sans t’arrêter jusqu’à la fin du temps.'],
  r:'Le bas du dos reste collé au sol. S’il décolle, réduis l’amplitude.',f:'Ne bouge que les jambes, les bras restent vers le plafond.'},
 lateraleG:{n:'Planche latérale gauche',z:'Côtés, taille',p:'lateraleG',
  i:['Les mêmes consignes, sur le côté gauche.','Si un côté est plus faible, c’est souvent lui qui progresse le plus en 30 jours.'],
  r:'Épaule loin de l’oreille, le cou dans le prolongement du dos.',f:'Genoux pliés au sol, seules les hanches montent.'},
 birddog:{n:'Bird dog',z:'Dos, fessiers, équilibre',p:'birddog',
  i:['À quatre pattes, mains sous les épaules, genoux sous les hanches.','Tends lentement un bras devant et la jambe opposée derrière, jusqu’à l’horizontale.','Tiens 2 secondes, reviens, change de côté.'],
  r:'Le dos reste plat comme une table : on pourrait y poser un verre d’eau.',f:'Tends seulement la jambe, les deux mains restent au sol.'},
 pont:{n:'Pont fessier',z:'Fessiers, arrière des cuisses',p:'pont',
  i:['Sur le dos, genoux pliés, pieds à plat près des fesses.','Monte le bassin en serrant les fessiers, tiens 1 seconde en haut.','Redescends en 3 secondes, sans reposer complètement.'],
  r:'Ce sont les fessiers qui poussent, pas le bas du dos.',f:'Petite amplitude, sans tenir en haut.'},
 epaules:{n:'Planche, épaules touchées',z:'Ventre, épaules, anti-rotation',p:'epaules',
  i:['En planche sur les mains, bras tendus, pieds un peu écartés.','Touche lentement l’épaule opposée avec une main, repose-la, change de main.','Le bassin ne doit pas tourner : c’est tout l’exercice.'],
  r:'Imagine un verre d’eau posé sur tes reins : il ne doit pas se renverser.',f:'La planche de la semaine 1, sur les avant-bras.'},
 pontUneJambe:{n:'Pont sur une jambe',z:'Fessiers, stabilité du bassin',p:'pontUneJambe',
  i:['Position du pont, une jambe tendue dans le prolongement de la cuisse.','Monte et descends le bassin en poussant dans le talon au sol.','Change de jambe à la moitié du temps.'],
  r:'Les hanches restent à la même hauteur des deux côtés.',f:'Le pont fessier sur deux jambes.'},
 rotationD:{n:'Planche latérale droite, rotation',z:'Côtés, rotation du buste',p:'rotation',
  i:['En planche latérale droite, le bras libre tendu vers le plafond.','Passe lentement la main sous ton buste, puis remonte-la vers le plafond.','Les hanches restent hautes pendant tout le mouvement.'],
  r:'C’est le buste qui tourne, pas le bassin.',f:'La planche latérale tenue, sans rotation.'},
 rotationG:{n:'Planche latérale gauche, rotation',z:'Côtés, rotation du buste',p:'rotation',
  i:['Les mêmes consignes, sur le côté gauche.'],r:'C’est le buste qui tourne, pas le bassin.',f:'La planche latérale tenue, sans rotation.'},
 coudeGenou:{n:'Bird dog coude-genou',z:'Dos, ventre, coordination',p:'coudeGenou',
  i:['Bird dog classique : bras et jambe opposés tendus.','Ramène le coude et le genou l’un vers l’autre sous le ventre, en arrondissant le dos.','Repars en extension. Change de côté à la moitié du temps.'],
  r:'Mouvement lent : 3 secondes pour aller, 3 secondes pour revenir.',f:'Le bird dog de la semaine 1.'},
 montagne:{n:'Montée de genou lente',z:'Ventre, épaules, hanches',p:'montagne',
  i:['En planche sur les mains, bras tendus.','Ramène lentement un genou vers la poitrine, repose le pied, change de jambe.','On ne court pas : 2 secondes par genou.'],
  r:'Les épaules restent au-dessus des mains, le bassin ne monte pas.',f:'Les mains posées sur une chaise ou un canapé.'},
 banane:{n:'La banane',z:'Abdominaux, gainage du dos',p:'banane',
  i:['Sur le dos, plaque le bas du dos au sol.','Décolle les épaules et les jambes, bras tendus vers les pieds.','Tiens en respirant.'],
  r:'Le bas du dos ne quitte jamais le sol. S’il décolle, plie les genoux.',f:'Genoux pliés au-dessus des hanches, seules les épaules décollent.'}
};

// Le circuit de chaque semaine : 6 positions. Chaque semaine, une ou deux nouveautés.
const SEMAINES=[
 {t:'Les bases',k:['planche','lateraleD','deadbug','lateraleG','birddog','pont'],nv:[]},
 {t:'On ajoute du mouvement',k:['epaules','lateraleD','deadbug','lateraleG','birddog','pontUneJambe'],nv:['epaules','pontUneJambe']},
 {t:'On fait tourner le buste',k:['epaules','rotationD','deadbug','rotationG','coudeGenou','pontUneJambe'],nv:['rotationD','rotationG','coudeGenou']},
 {t:'Tout le tronc ensemble',k:['montagne','rotationD','banane','rotationG','coudeGenou','pontUneJambe'],nv:['montagne','banane']}
];

// Paliers : secondes d'effort et de repos. Le niveau de départ décale le palier de 0, 1 ou 2.
const PALIERS=[[20,25],[30,20],[40,20],[50,20],[60,20],[70,20]];
const NIVEAUX=[
 {k:'debutant',n:'Départ',seuil:'Planche du jour 1 sous 45 s',d:0},
 {k:'intermediaire',n:'Intermédiaire',seuil:'Planche entre 45 et 90 s',d:1},
 {k:'confirme',n:'Confirmé',seuil:'Planche au-delà de 90 s',d:2}
];
const TOURS=2, ENTRE_TOURS=60;
const REPOS_JOURS=[4,7,11,14,18,21,25,28];
const MISE_EN_ROUTE=[['Dos rond, dos creux, à quatre pattes',30,'chatvache'],['Cercles de bassin, debout',30,null],['Marche sur place, genoux hauts',60,null]];
const RETOUR_CALME=[['Posture de l’enfant',60,'enfant'],['Respiration : inspire 4 s, expire 6 s',60,'respiration']];

// Jour 1 à 30 → type de jour et semaine.
function jour(d){
 if(d===29)return{type:'test',sem:4};
 if(d===30)return{type:'bilan',sem:4};
 if(REPOS_JOURS.includes(d))return{type:'repos',sem:Math.min(4,Math.ceil(d/7))};
 return{type:'seance',sem:Math.min(4,Math.ceil(d/7)),test:d===1};
}
module.exports={P,POS,SEMAINES,PALIERS,NIVEAUX,TOURS,ENTRE_TOURS,REPOS_JOURS,MISE_EN_ROUTE,RETOUR_CALME,jour};
