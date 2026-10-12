/* Alpha Kids (3–10 ans) : questions et règles propres au bilan Kids, rempli par le parent.
   Ce fichier n'est pas chargé tel quel : kidsbilan.js l'injecte dans le moteur du bilan adulte. */
var KB=function(a){var g=+a.age;return g<=5?0:g<=7?1:2};
var k35=function(a){return !!a.age&&KB(a)===0},k67=function(a){return !!a.age&&KB(a)===1},k810=function(a){return !!a.age&&KB(a)===2},k610=function(a){return !!a.age&&KB(a)>0};
var hasAct=function(a){return !!a.activite&&a.activite!=='0'};
var hurts=function(a){var g=a.douleur||[];return g.length>0&&g.indexOf('non')<0};
var kStop=function(a){return hurts(a)&&(a.douleurT==='2'||a.boite==='1')};
var LK=' style="color:inherit;font-weight:700"';
/* Accords : {il} {Il} {e} {le} {soi} suivent la réponse « un garçon / une fille ». */
function G(s){var f=S.a.sexe==='F',M={il:f?'elle':'il',Il:f?'Elle':'Il',e:f?'e':'',le:f?'la':'le',soi:f?'elle':'lui'};return String(s).replace(/\{(il|Il|e|le|soi)\}/g,function(m,k){return M[k]})}
function alertBox(ps){return'<div role="alert" style="margin-top:6px;padding:16px 18px;border-radius:14px;background:#12110C;color:#E4E1B8;font-size:16px;line-height:1.5"><b style="display:block;margin-bottom:8px;font:400 22px/1.1 Anton,Impact,sans-serif;text-transform:uppercase;letter-spacing:.02em;color:#F2E415">Mise en garde</b>'+ps.map(function(p,i){return'<span style="display:block'+(i?';margin-top:8px':'')+'">'+G(p)+'</span>'}).join('')+'</div>'}
var SOIR=['L’écran est un outil, mais le soir il devient contre-productif.','Sa lumière retarde l’hormone du sommeil, et les images gardent son cerveau en éveil : {il} s’endort plus tard et dort moins bien. C’est la nuit qu’{il} grandit.','Les écrans dorment hors de sa chambre, éteints une heure avant le coucher. À la place : une histoire, un jeu calme, un câlin.'];
function soirWarn(a){return a.ecranSoir==='2'?alertBox(SOIR):''}
function chambreWarn(a){return a.ecranChambre==='2'?alertBox(SOIR):''}
function ecranWarn(a){var b=KB(a),hi=b===0?+a.ecran>=2:a.ecran==='3';return hi?alertBox(['À son âge, le repère est '+(b===0?'de 1 heure d’écran au plus par jour, et moins c’est mieux.':'de moins de 2 heures d’écran par jour.'),'Chaque heure d’écran est une heure où {il} ne court pas, ne grimpe pas et ne joue avec personne.','Commence par retirer l’écran du matin et celui des repas.']):''}
function boiteWarn(a){return a.boite==='1'?alertBox(['Une douleur qui fait boiter ou qui réveille la nuit se montre à un médecin, sans attendre.','Le plus souvent ce n’est rien de grave, mais c’est à lui de le dire.','D’ici là : pas de sauts ni de course.']):''}
var SKILLS=[
 [['courir','Courir sans tomber'],['pieds','Sauter à pieds joints'],['unpied','Tenir sur un pied 3 secondes'],['escalier','Monter un escalier, un pied par marche'],['lancer','Lancer un ballon devant {soi}'],['pedale','Rouler en draisienne ou pédaler sur un tricycle']],
 [['cloche','Sauter à cloche-pied'],['attraper','Attraper un ballon à deux mains'],['velo','Faire du vélo sans petites roues'],['roulade','Faire une roulade'],['eau','Mettre la tête sous l’eau'],['corde','Sauter à la corde']],
 [['nager','Nager 25 mètres'],['velo','Faire du vélo en tenant sa droite'],['corde','Sauter à la corde 10 fois de suite'],['dribble','Dribbler en marchant'],['roue','Faire la roue, ou l’appui renversé contre un mur'],['grimpe','Grimper : arbre, mur d’escalade, corde']]];
var NONE=[['non','Rien de tout cela pour l’instant']];
var STEPS=[
{t:'Ton enfant',d:'Quatre informations pour choisir les bons repères. Elles restent sur ce téléphone.',q:[
 {k:'sexe',l:'Ton enfant est',o:[['H','Un garçon'],['F','Une fille']],row:1},
 {k:'age',l:'Son âge',h:'Moins de 3 ans : laisse-{le} bouger librement, le bilan commence à 3 ans. 11 ans ou plus : fais le <a href="/ado/bilan"'+LK+'>bilan Alpha Ado</a>.',o:[['3','3 ans'],['4','4 ans'],['5','5 ans'],['6','6 ans'],['7','7 ans'],['8','8 ans'],['9','9 ans'],['10','10 ans']],row:1},
 {k:'classe',l:'Sa classe',o:[['0','Pas encore à l’école'],['1','Maternelle'],['2','CP ou CE1'],['3','CE2, CM1 ou CM2']]},
 {k:'grandi',l:'A-t-{il} beaucoup grandi depuis un an ?',o:[['0','Non'],['1','Oui','Ses vêtements sont tous devenus trop courts'],['2','Je ne sais pas']]}]},
{t:'Comment {il} bouge',d:'Le jeu dehors, les activités, les trajets : tout compte. Réponds pour une semaine ordinaire.',q:[
 {k:'dehors',l:'Joue-t-{il} dehors ?',o:[['2','Tous les jours ou presque'],['1','2 à 3 fois par semaine'],['0','Rarement']]},
 {k:'activite',l:'Fait-{il} une activité encadrée ?',h:'Éveil, baby-sport, club, natation, danse.',o:[['0','Non'],['1','Une'],['2','Deux ou plus']],row:1},
 {k:'seances',l:'Combien de séances par semaine ?',s:hasAct,o:[['1','1'],['2','2'],['3','3 ou plus']],row:1},
 {k:'matchs',l:'Des compétitions ou des matchs ?',s:function(a){return hasAct(a)&&k610(a)},o:[['0','Non'],['1','De temps en temps'],['2','Presque chaque week-end']]},
 {k:'ecole',l:'Comment va-t-{il} à l’école ?',o:[['actif','À pied ou à vélo'],['voiture','En voiture ou en car'],['non','{Il} n’y va pas encore']]},
 {k:'sait35',l:'Ce qu’{il} sait déjà faire',h:'Plusieurs réponses possibles. Ce sont des repères, pas un examen.',s:k35,m:1,o:SKILLS[0].concat(NONE)},
 {k:'sait67',l:'Ce qu’{il} sait déjà faire',h:'Plusieurs réponses possibles. Ce sont des repères, pas un examen.',s:k67,m:1,o:SKILLS[1].concat(NONE)},
 {k:'sait810',l:'Ce qu’{il} sait déjà faire',h:'Plusieurs réponses possibles. Ce sont des repères, pas un examen.',s:k810,m:1,o:SKILLS[2].concat(NONE)},
 {k:'aime',l:'Aime-t-{il} bouger ?',o:[['2','Oui','{Il} ne tient pas en place'],['1','Ça dépend des jours'],['0','Pas trop','{Il} préfère les jeux calmes']]}]},
{t:'Ses journées',d:'Le sommeil, les écrans, l’assiette et l’eau portent tout le reste. Le midi, c’est souvent la cantine : on n’en parle pas ici.',q:[
 {k:'som35',l:'Combien d’heures dort-{il} par 24 heures ?',h:'Sieste comprise.',s:k35,o:[['1','Moins de 10 h'],['2','10 à 11 h'],['3','11 à 13 h'],['4','Plus de 13 h']],row:1},
 {k:'som610',l:'Combien d’heures dort-{il} par nuit ?',s:k610,o:[['1','Moins de 9 h'],['2','9 à 10 h'],['3','10 à 12 h'],['4','Plus de 12 h']],row:1},
 {k:'coucher',l:'Se couche-t-{il} à heure fixe ?',o:[['2','Oui, même le week-end'],['1','En semaine seulement'],['0','Non']]},
 {k:'ecran',l:'Les écrans, par jour',h:'Télé, tablette, téléphone et console additionnés.',o:[['0','Aucun ou presque'],['1','Moins d’1 heure'],['2','1 à 2 heures'],['3','Plus de 2 heures']],w:ecranWarn},
 {k:'ecranSoir',l:'Un écran dans l’heure avant de dormir ?',o:[['0','Jamais'],['1','Parfois'],['2','Presque tous les soirs']],w:soirWarn},
 {k:'ecranChambre',l:'A-t-{il} un écran à {soi}, ou dans sa chambre ?',o:[['0','Non'],['1','Une télé ou une console'],['2','Une tablette ou un téléphone']],w:chambreWarn},
 {k:'pdj',l:'Prend-{il} un petit-déjeuner ?',o:[['2','Tous les jours'],['1','Parfois'],['0','Jamais']],row:1},
 {k:'gouter',l:'Son goûter',o:[['2','Pain, fruit ou laitage'],['1','Gâteaux ou chips'],['0','Rien']]},
 {k:'boissons',l:'Ce qu’{il} boit dans la journée',o:[['2','Surtout de l’eau'],['1','De l’eau et des jus ou des sodas'],['0','Surtout des jus ou des sodas']]},
 {k:'legumes',l:'Des fruits ou des légumes au dîner',o:[['2','Tous les soirs'],['1','Quelques soirs par semaine'],['0','Rarement']]}]},
{t:'Sa santé',d:'Cinq questions pour que les jeux proposés soient sans risque.',q:[
 {k:'sante',l:'Un problème de cœur, un asthme mal contrôlé, ou un médecin a-t-il déconseillé l’effort ?',o:[['0','Non'],['1','Oui']],row:1},
 {k:'douleur',l:'Se plaint-{il} de douleurs ?',h:'Plusieurs réponses possibles.',m:1,o:[['non','Non'],['jambes','Aux jambes, le soir ou la nuit'],['sport','Aux genoux ou aux talons, pendant ou après le sport'],['autre','Ailleurs']]},
 {k:'douleurT',l:'Depuis combien de temps ?',s:hurts,o:[['1','Moins de 2 semaines'],['2','Plus de 2 semaines']]},
 {k:'boite',l:'Boite-t-{il}, ou la douleur {le} réveille-t-elle la nuit ?',s:hurts,o:[['0','Non'],['1','Oui']],row:1,w:boiteWarn},
 {k:'arretb',l:'Une blessure a-t-elle imposé plus de 3 semaines d’arrêt depuis un an ?',h:'Si oui, compte depuis le jour de la blessure.',o:[['0','Non'],['3','Oui, il y a plus de 3 mois'],['1','Oui, il y a moins de 3 mois']]}]},
{t:'Vos jeux',d:'Les jeux Alpha Kids se font avec toi, à la maison ou dehors, sans aucun poids.',q:[
 {k:'temps',l:'Combien de temps peux-tu jouer avec {soi} ?',o:[['10j','10 minutes par jour'],['20x3','20 minutes, 3 fois par semaine'],['we','Surtout le week-end']]},
 {k:'lieu',l:'Où ?',o:[['int','À la maison, sans jardin'],['jardin','Dans un jardin'],['parc','Dans un parc ou une cour, tout près']]},
 {k:'materiel',l:'Avec quoi ?',h:'Plusieurs réponses possibles.',m:1,o:[['non','Rien'],['ballon','Un ballon'],['corde','Une corde à sauter'],['velo','Un vélo ou une trottinette']]},
 {x:'Ses défis (facultatif)',xd:'Quatre défis pour connaître son point de départ. Tu chronomètres et tu comptes, {il} joue. D’abord 3 minutes de jeu pour s’échauffer. Si un défi fait mal, on arrête et on passe au suivant. Tu peux laisser ces cases vides.',s:function(a){return k810(a)&&!kStop(a)}},
 {k:'flamant',l:'Le flamant : combien de secondes sur un pied ?',h:'Mains sur les hanches, yeux ouverts. Les deux pieds, l’un après l’autre : note le moins bon. 60 secondes au plus.',s:function(a){return k810(a)&&!kStop(a)},n:[0,60,'secondes'],opt:1},
 {k:'saut',l:'Le saut de grenouille',h:'Pieds joints derrière une ligne, saut en longueur sans élan. Meilleur de 3 essais, mesuré au talon. En centimètres, par exemple 120.',s:function(a){return k810(a)&&!kStop(a)},n:[30,250,'cm'],opt:1},
 {k:'mur',l:'Le mur : combien de balles rattrapées sur 10 ?',h:'À 2 mètres d’un mur, {il} lance la balle et la rattrape après le rebond.',s:function(a){return k810(a)&&!kStop(a)},n:[0,10,'sur 10'],opt:1},
 {k:'cordeType',l:'La corde : quelle version ?',s:function(a){return k810(a)&&!kStop(a)},o:[['c','À la corde','Sauts d’affilée, meilleur de 3 essais'],['l','Sans corde','Sauts de côté par-dessus une ligne, pendant 15 secondes']],opt:1},
 {k:'corde',l:'Combien de sauts ?',s:function(a){return k810(a)&&!kStop(a)},n:[0,300,'sauts'],opt:1}]}
];
//@@OVERRIDES
/* ---------- Alpha Kids : repères et pyramide ---------- */
var KAGE=['3–5 ans','6–7 ans','8–10 ans'],KFICHE=['Alpha_Kids_3-5_ans.pdf','Alpha_Kids_6-7_ans.pdf','Alpha_Kids_8-10_ans.pdf'];
function refSleep(b){return b===0?'10 à 13 heures par 24 heures, sieste comprise':'9 à 12 heures par nuit'}
function refMove(b){return b===0?'3 heures de mouvement par jour, dont 1 heure où {il} s’essouffle':'1 heure par jour où {il} s’essouffle'}
function refScreen(b){return b===0?'1 heure d’écran au plus par jour':'moins de 2 heures d’écran par jour'}
function compute(a){
 var age=+a.age,b=KB(a),F=a.sexe==='F';
 var som=b===0?a.som35:a.som610,sleepLow=som==='1';
 var g=(a.douleur||[]).filter(function(x){return x!=='non'}),pain=g.length>0,stop=kStop(a),shortPain=pain&&!stop;
 var rehab=a.arretb==='1',grow=a.grandi==='1',act=hasAct(a);
 var screenHigh=b===0?+a.ecran>=2:a.ecran==='3',screenNight=a.ecranSoir==='2'||a.ecranChambre==='2';
 var SK=SKILLS[b],have=(a[['sait35','sait67','sait810'][b]]||[]).filter(function(x){return x!=='non'});
 var known=SK.filter(function(s){return have.indexOf(s[0])>=0}),next=SK.filter(function(s){return have.indexOf(s[0])<0});
 var rank=b===1?(age-6)*2:age-[3,6,8][b],hi=[3,4,5][rank],lo=[1,2,3][rank];
 var sedentary=a.dehors==='0'&&!act,mono=act&&a.activite==='1'&&a.seances==='3'&&a.matchs==='2';
 /* pyramide : 0 fragile, 1 à consolider, 2 solide */
 var e1=sleepLow?0:2;if(a.coucher==='0')e1--;if(screenNight)e1--;e1=Math.max(0,e1);
 var s2=(+a.pdj)+(+a.gouter)+(+a.boissons)+(+a.legumes),e2=s2>=7?2:s2>=4?1:0;
 var pts=(+a.dehors)+(act?1:0)+(a.ecole==='actif'?1:0),e3=pts>=2?2:pts>=1?1:0;if(screenHigh)e3=Math.max(0,e3-1);
 var e4=known.length>=hi?2:known.length>=lo?1:0;
 var pyr=[['Dormir','Sommeil et écrans du soir',e1],['Manger et boire','Petit-déjeuner, goûter, dîner, eau',e2],['Bouger tous les jours','Jeu dehors, activités, écrans',e3],['Apprendre des gestes','',e4]];
 var base=e1===0||(e1===1&&e2===0)?0:e1===2&&e2===2?2:1;
 var rows=[];
 if(b===2&&!stop){
  if(a.flamant!==undefined&&a.flamant!=='')rows.push(['Le flamant','Sur un pied : '+a.flamant+' secondes']);
  if(a.saut)rows.push(['Le saut de grenouille',(+a.saut>=.5&&+a.saut<=3.5?Math.round(+a.saut*100):a.saut)+' cm']);
  if(a.mur!==undefined&&a.mur!=='')rows.push(['Le mur',a.mur+' balles rattrapées sur 10']);
  if(a.corde!==undefined&&a.corde!=='')rows.push(['La corde',a.corde+' sauts'+(a.cordeType==='l'?' de côté en 15 secondes':' d’affilée')])}
 var code=[KAGE[b],label('dehors',a.dehors).toLowerCase()+' dehors',act?(a.activite==='2'?'deux activités ou plus':'une activité encadrée'):'pas d’activité encadrée',known.length+' geste'+(known.length>1?'s':'')+' sur 6'].join(' · ');
 return{age:age,b:b,F:F,som:som,sleepLow:sleepLow,g:g,pain:pain,stop:stop,shortPain:shortPain,rehab:rehab,grow:grow,act:act,screenHigh:screenHigh,screenNight:screenNight,known:known,next:next,sedentary:sedentary,mono:mono,pyr:pyr,base:base,rows:rows,code:code}}
function stK(x,i){return i===3?['à découvrir','en cours','bien parti'][x[2]]:ST[x[2]]}

/* ---------- Alpha Kids : priorités (consigne, pourquoi, phrase à dire à l'enfant) ---------- */
function why(y,z){return(y?'<span style="margin-top:8px;padding-left:12px;border-left:3px solid #807C3A"><em style="font-style:normal;font-weight:700">Pourquoi ?</em> '+G(y)+'</span>':'')+(z?'<span style="margin-top:6px;padding-left:12px;border-left:3px solid #F2E415"><em style="font-style:normal;font-weight:700">À lui dire :</em> « '+G(z)+' »</span>':'')}
function priorities(a,r){var p=[],b=r.b,fl=function(i){return r.pyr[i][2]<2?(4-i)*100:0};
 function add(i,wt,t,x,y,z){p.push([wt+fl(i),t,x,i,y,z])}
 if(a.sante==='1')p.push([1000,'Un avis médical d’abord','Avant de commencer, fais le point avec son médecin et montre-lui ce bilan.',void 0,'Il connaît son dossier : il te dira ce que ton enfant peut faire sans risque.','On va demander au docteur quels jeux sont bons pour toi.']);
 if(r.stop)p.push([980,'Montrer cette douleur à un médecin',(a.boite==='1'?'{Il} boite, ou la douleur {le} réveille la nuit : prends rendez-vous sans attendre.':'{Il} a mal depuis plus de 2 semaines : prends rendez-vous.')+' D’ici là, pas de sauts ni de course.',void 0,'Une douleur qui dure, qui fait boiter ou qui réveille la nuit est un signal. Le plus souvent ce n’est rien de grave, mais c’est au médecin de le dire.','Quand ça fait mal, tu me le dis tout de suite. Ce n’est pas se plaindre, c’est m’aider.']);
 else if(r.rehab)p.push([950,'Reprendre avec l’accord du kiné ou du médecin','Sa blessure a moins de 3 mois : {il} est encore en rééducation. Demande-leur quels jeux {il} peut faire, et montre-leur ce bilan.',void 0,'Une blessure met du temps à redevenir solide, même quand la douleur a disparu. Reprendre trop fort, trop tôt, c’est le meilleur moyen de se reblesser.','Ton corps répare. Il lui faut encore un peu de temps, alors on choisit des jeux doux.']);
 else if(r.shortPain)p.push([940,'Laisser reposer ce qui fait mal','Pas de sauts ni de course pendant 2 semaines. Si la douleur est encore là après, prends rendez-vous chez le médecin.',void 0,'Chez l’enfant, la douleur vient souvent des zones où l’os grandit, là où s’attachent les tendons. Le repos leur laisse le temps de se calmer.','On fait une pause pour les sauts, le temps que ça ne fasse plus mal.']);
 if(r.sleepLow)add(0,85,'Dormir plus','À son âge, le repère est de '+refSleep(b)+'. Avance son coucher de 15 minutes chaque semaine.','C’est pendant le sommeil profond que son corps fabrique l’hormone de croissance et que son cerveau range ce qu’{il} a appris dans la journée.','Quand tu dors, ton corps grandit et ta tête range tout ce que tu as appris aujourd’hui.');
 if(r.screenNight)add(0,78,'Les écrans dorment hors de sa chambre','L’écran est un outil, mais le soir il devient contre-productif. Éteint une heure avant le coucher, et rangé hors de sa chambre.','La lumière de l’écran retarde l’hormone du sommeil, et les images gardent son cerveau en éveil. C’est la nuit qu’{il} grandit.','Les écrans aussi vont se coucher. Ce soir, c’est une histoire.');
 if(a.coucher==='0')add(0,70,'Se coucher à heure fixe','La même heure tous les soirs, à 30 minutes près, week-end compris. Un rituel court : pyjama, dents, histoire.','Son corps a une horloge interne. Quand l’heure du coucher change tout le temps, elle se dérègle : {il} met plus de temps à s’endormir et se réveille moins en forme.','Ton corps a une petite horloge. Elle aime qu’on se couche à la même heure.');
 if(a.pdj!=='2')add(1,58,'Un petit-déjeuner tous les matins','Pain ou flocons d’avoine, laitage, fruit, et un verre d’eau.','Après une nuit sans manger, ses réserves sont basses. Sans petit-déjeuner, {il} a moins d’énergie et se concentre moins bien en classe.','Le petit-déjeuner, c’est le carburant de ta matinée.');
 if(a.boissons!=='2')add(1,52,'De l’eau, à table et dans la gourde','De l’eau à tous les repas, et une gourde pour l’école et le sport. Les jus et les sodas, pour les fêtes.','Son corps est fait d’eau à plus de moitié : quand {il} en manque, {il} se fatigue plus vite. Les sodas et les jus apportent beaucoup de sucre sans rien construire.','L’eau, c’est la boisson que ton corps préfère.');
 if(a.gouter!=='2')add(1,50,'Un vrai goûter','Pain, fruit ou laitage, et de l’eau. Les gâteaux et les chips, de temps en temps.','Le déjeuner est loin et {il} grandit : {il} a besoin d’un vrai petit repas, pas seulement de sucre. Les gâteaux donnent un coup de fouet qui retombe vite.','Ce goûter-là te donne de la force jusqu’au dîner.');
 if(a.legumes!=='2')add(1,45,'Des fruits et des légumes tous les soirs','Un légume au dîner, cru ou cuit, et un fruit en dessert. Il faut souvent goûter plusieurs fois avant d’aimer : repropose sans forcer.','Ils apportent les vitamines, les minéraux et les fibres : c’est ce qui aide son corps à grandir, à se défendre contre les microbes et à bien digérer.','Les légumes donnent à ton corps ce qu’il lui faut pour grandir.');
 if(a.dehors!=='2')add(2,r.sedentary?90:55,r.sedentary?'Dehors tous les jours':'Jouer dehors plus souvent',r.sedentary?'20 minutes dehors chaque jour pour commencer : un bout du trajet de l’école à pied, le parc, la cour. Pas besoin de matériel.':'Un moment dehors de plus dans la semaine, même court : le parc après l’école, un tour de vélo, la cour.','À son âge, le repère est de '+refMove(b)+'. Dehors, {il} court, saute et grimpe sans qu’on le lui demande : c’est ce qui construit son cœur, ses os et ses muscles.','Dehors, tu peux courir aussi vite que tu veux.');
 if(r.screenHigh)add(2,72,'Moins d’écrans, plus de jeu','À son âge, le repère est '+(b===0?'de 1 heure d’écran au plus par jour, et moins c’est mieux':'de moins de 2 heures d’écran par jour')+'. Commence par retirer l’écran du matin et celui des repas.','Chaque heure d’écran est une heure où {il} ne court pas, ne grimpe pas et ne joue avec personne. C’est en bougeant et en jouant que son corps et son cerveau se construisent.','On éteint, et on joue à ton jeu préféré.');
 if(a.aime==='0')add(2,60,'Lui donner le goût de bouger','Des jeux en forme d’histoires ou de missions, avec toi, sans gagnant ni perdant. Dix minutes suffisent.','Un enfant bouge quand il s’amuse, pas quand on le lui demande. S’{il} y prend plaisir maintenant, {il} gardera le goût de bouger en grandissant.','J’ai une mission pour toi : traverser le salon sans toucher le sol.');
 if(b===2&&r.next.some(function(s){return s[0]==='nager'}))add(3,80,'Savoir nager','Inscris-{le} à un cycle de natation, ou va à la piscine avec {soi} une fois par semaine, jusqu’à ce qu’{il} nage 25 mètres sans aide.','Nager est un geste de sécurité avant d’être un sport : c’est ce qui lui permettra d’aller à la mer, au lac ou à la piscine sans danger.','Savoir nager, c’est pouvoir aller dans l’eau partout, tranquille.');
 if(b===2&&r.next.some(function(s){return s[0]==='velo'}))add(3,74,'Savoir rouler à vélo','Un parking vide ou une cour : démarrer, freiner, tenir sa droite, regarder derrière. Dix minutes, plusieurs fois par semaine.','Le vélo lui donne de l’équilibre, du souffle et de l’autonomie. Savoir freiner et tenir sa trajectoire, c’est ce qui {le} protégera sur la route.','Le vélo, c’est ta première liberté. On l’apprend ensemble.');
 if(r.mono)add(3,66,'Plusieurs activités plutôt qu’une','Avant 10 ans, garde un jour sans sport dans la semaine et une deuxième activité pour le plaisir : natation, vélo, jeux de ballon.','Chaque activité apprend des gestes différents. Un enfant qui touche à tout progresse mieux ensuite dans son sport, et se blesse moins qu’un enfant qui répète toujours les mêmes gestes.','Tu peux adorer ton sport et essayer autre chose.');
 if(r.grow)add(3,60,'L’équilibre d’abord','{Il} a beaucoup grandi : des jeux d’équilibre en premier, et peu de sauts répétés pour l’instant.','Quand un enfant grandit vite, ses os s’allongent avant ses muscles, et son cerveau refait ses réglages. C’est normal d’être un peu maladroit pendant quelques mois.','Tu as grandi : ton corps apprend sa nouvelle taille.');
 if(r.pyr[3][2]<2&&r.next.length&&!r.stop)add(3,50,'De nouveaux gestes en jouant','À découvrir cette semaine : '+r.next.slice(0,3).map(function(s){return s[1].charAt(0).toLowerCase()+s[1].slice(1)}).join(' ; ')+'. Sans leçon : dans le jeu.','L’enfance est le meilleur moment pour apprendre les gestes de base. Courir, sauter, lancer, grimper, tenir en équilibre : c’est avec eux qu’{il} fera ensuite tous ses sports.','On essaie un nouveau geste ? Regarde, je te montre.');
 if(p.length<3){p.push(r.stop||r.rehab||r.shortPain?[10,'Garder ses bonnes habitudes','Son sommeil, son assiette et son eau sont en place : garde-les pendant la pause.',void 0,'Un corps qui dort bien et qui mange bien répare plus vite.','Tu dors bien et tu manges bien : ça aide ton corps à réparer.']:[10,'Continuer comme ça','Ses bases sont bonnes. Garde le rythme : du jeu dehors, du sommeil, de l’eau.',void 0,'Les habitudes prises avant 10 ans sont celles qu’on garde le plus facilement.','Bravo, tu prends bien soin de ton corps.']);p.push([9,'Varier les jeux','Chaque semaine, un jeu nouveau : un autre ballon, un autre terrain, un autre copain.',void 0,'Chaque jeu apprend des gestes différents : plus {il} en connaît, plus {il} sera à l’aise dans tous les sports.','Cette semaine, on invente un nouveau jeu.']);p.push([8,'Refaire le bilan dans 3 mois','Un enfant change vite : refais le point dans 3 mois, les jeux suivront son âge.',void 0,'Tu verras ce qui a bougé, et ce qui mérite encore un coup de pouce.'])}
 var cnt={},res=[];p.sort(function(x,y){return y[0]-x[0]}).forEach(function(x){var k=x[3];if(res.length<3&&(k===undefined||(cnt[k]=(cnt[k]||0)+1)<=2))res.push(x)});
 return res}

/* ---------- Alpha Kids : jeux (aucune charge, aucune séance) ---------- */
var FIL={id:'fil',n:'Le fil',d:'5 à 10 minutes',how:'Une ligne au sol : en avant, en arrière, sur un pied, puis les yeux fermés. À faire aussi sur un muret bas, en tenant ta main.',b:'Équilibre',calm:1};
var GAMES=[[
 {id:'parcours',n:'Le parcours du salon',d:'10 minutes',how:'Des coussins à enjamber, une table sous laquelle passer, une ligne de scotch à suivre sans tomber. Change le parcours chaque semaine.',b:'Équilibre, ramper, se repérer',calm:1,story:1},
 {id:'soleil',n:'1, 2, 3 soleil',d:'10 minutes',how:'Tu comptes dos tourné, {il} avance en courant. Quand tu te retournes, {il} se fige. Celui qui bouge repart du début.',b:'Courir, s’arrêter, tenir',run:1},
 {id:'ballon',n:'Le ballon qui ne tombe pas',d:'5 à 10 minutes',how:'Un ballon de baudruche à garder en l’air le plus longtemps possible : avec la main, puis le pied, puis la tête.',b:'Coordination de l’œil et de la main',calm:1},
 {id:'animaux',n:'Les animaux',d:'5 à 10 minutes',how:'Marcher comme l’ours, à quatre pattes, fesses hautes. Sauter comme la grenouille. Reculer comme le crabe. Chacun son tour annonce un animal.',b:'Force de tout le corps',jump:1,story:1},
 {id:'couleurs',n:'La chasse aux couleurs',d:'10 minutes',how:'Tu annonces une couleur, {il} court toucher un objet de cette couleur et revient. Ensuite, c’est {soi} qui annonce.',b:'Courir, écouter, réagir',run:1,story:1},
 {id:'statue',n:'La statue musicale',d:'5 à 10 minutes',how:'Vous dansez. Quand la musique s’arrête, tout le monde se fige : sur deux pieds, puis sur un seul.',b:'Rythme, contrôle du corps',calm:1,story:1}],[
 {id:'marelle',n:'La marelle',d:'10 minutes',how:'Dessine les cases à la craie, ou au scotch dans le couloir. À cloche-pied dans les cases simples, deux pieds dans les doubles, sans toucher les lignes.',b:'Équilibre, appuis',jump:1},
 {id:'mur',n:'Le mur',d:'10 minutes',how:'Lancer une balle contre un mur et la rattraper : à deux mains, à une main, après un rebond, en tapant dans les mains. Sans balle : une paire de chaussettes roulées.',b:'Lancer, attraper',calm:1},
 {id:'chrono',n:'Le parcours chrono',d:'10 à 15 minutes',how:'Un slalom entre des objets, un saut par-dessus un coussin, un passage à quatre pattes. Tu chronomètres : {il} essaie de battre son propre temps, pas celui d’un autre.',b:'Enchaîner des gestes',run:1,story:1},
 {id:'corde',n:'La corde à sauter',d:'5 à 10 minutes',how:'5 sauts d’affilée, puis 10, puis en avançant. Sans corde : sauts pieds joints par-dessus une ligne, d’un côté à l’autre.',b:'Rythme, détente',jump:1},
 {id:'miroir',n:'Le miroir',d:'5 à 10 minutes',how:'Face à face, {il} copie tes gestes : s’accroupir, tenir sur un pied, la planche 5 secondes, toucher ses pieds. Puis vous échangez les rôles.',b:'Gestes de base, tenue du corps',calm:1,story:1},
 {id:'chat',n:'Chat perché',d:'10 à 15 minutes',how:'À partir de trois joueurs, dehors. Le chat poursuit les autres, qui sont à l’abri dès qu’ils sont perchés. Dix secondes au plus sur un perchoir.',b:'Vitesse, changements de direction',run:1,out:1}],[
 {id:'circuit',n:'Le circuit maison',d:'15 minutes',how:'Six ateliers de 30 secondes, avec 30 secondes de repos entre chaque : la chaise contre un mur, la planche, les sauts sur place, l’ours, les fentes, la corde. 2 tours. Fais-le avec {soi}.',b:'Tout le corps, sans aucun poids',jump:1},
 {id:'passe',n:'La passe à dix',d:'10 minutes',how:'Dix passes sans que le ballon tombe. À chaque série réussie, vous reculez d’un pas. Puis à une main, puis au pied. Sans ballon : une paire de chaussettes roulées.',b:'Adresse, lecture du jeu',calm:1},
 FIL,
 {id:'navette',n:'La navette',d:'10 minutes',how:'Deux lignes à 10 mètres l’une de l’autre. À chaque aller-retour, {il} ramasse un objet et le rapporte. Cinq objets, puis repos. Tu chronomètres.',b:'Vitesse, freinage',run:1,out:1},
 {id:'appuis',n:'Les quatre appuis',d:'10 minutes',how:'L’ours : à quatre pattes, genoux décollés, {il} traverse la pièce. Le crabe : ventre vers le plafond. La brouette : tu tiens ses chevilles, {il} avance sur les mains.',b:'Gainage, épaules',calm:1,story:1},
 {id:'echelle',n:'L’échelle de corde',d:'10 minutes',how:'10 sauts à la corde, repos. 20 sauts, repos. 30 sauts. Sans corde : sauts de côté par-dessus une ligne.',b:'Rythme, mollets, souffle',jump:1}]];
function program(a,r){var b=r.b,ban=r.stop||r.shortPain||r.rehab,ins=a.lieu==='int';
 var pool=GAMES[b].filter(function(g){return!((ban&&(g.run||g.jump))||(r.grow&&g.jump)||(ins&&g.out))});
 if(b===1&&pool.length<3)pool.push(FIL);
 if(a.aime==='0'||r.grow)pool=pool.filter(function(g){return r.grow?g.calm:g.story}).concat(pool.filter(function(g){return!(r.grow?g.calm:g.story)}));
 if(ins)pool=pool.filter(function(g){return!g.run}).concat(pool.filter(function(g){return g.run}));
 var cj=pool.filter(function(g){return g.id==='corde'||g.id==='echelle'})[0];
 if(cj&&(a.materiel||[]).indexOf('corde')>=0&&pool.indexOf(cj)>2){pool.splice(pool.indexOf(cj),1);pool.splice(1,0,cj)}
 var games=pool.slice(0,3),n=[];
 var rythme={'10j':'10 minutes par jour : un jeu par jour, en tournant sur les trois.','20x3':'20 minutes, 3 fois par semaine : deux jeux à chaque fois.','we':'Le week-end : les trois jeux à la suite. En semaine, 5 minutes de son jeu préféré quand tu peux.'}[a.temps];
 if(r.stop)n.push('Tant qu’un médecin ne l’a pas vu{e} : uniquement ces jeux calmes, sans sauts ni course.');
 else if(r.rehab)n.push('Sa blessure a moins de 3 mois : jeux sans sauts ni course, à faire valider par le kiné ou le médecin.');
 else if(r.shortPain)n.push('Une douleur a été signalée : pas de sauts ni de course pendant 2 semaines. Si un jeu fait mal, on en change.');
 if(r.grow&&!ban)n.push('{Il} grandit vite : l’équilibre en premier, peu de sauts répétés.');
 n.push('Aucun poids, aucune charge, aucune série à compter : le jeu suffit.');
 n.push('On arrête quand {il} s’amuse encore. Un jeu qu’on quitte avec le sourire, on a envie d’y revenir.');
 if(a.aime==='0')n.push('Pas de gagnant ni de perdant : une mission à réussir ensemble.');
 return{games:games,notes:n,rythme:rythme}}

/* ---------- Alpha Kids : résumé envoyé par le parent ---------- */
function summary(a,r,pr){var d=new Date(),b=r.b,mat=(a.materiel||[]).filter(function(x){return x!=='non'});
 var L=['BILAN ALPHA KIDS du '+('0'+d.getDate()).slice(-2)+'/'+('0'+(d.getMonth()+1)).slice(-2)+'/'+d.getFullYear(),'Rempli par le parent.','',
 (r.F?'Fille':'Garçon')+', '+a.age+' ans · '+label('classe',a.classe)+' · A beaucoup grandi : '+label('grandi',a.grandi).toLowerCase(),
 'Jeu dehors : '+label('dehors',a.dehors).toLowerCase()+' · Activité encadrée : '+label('activite',a.activite).toLowerCase()+(r.act?' · '+label('seances',a.seances)+' séance(s) par semaine'+(a.matchs?' · Matchs : '+label('matchs',a.matchs).toLowerCase():''):'')+' · École : '+G(label('ecole',a.ecole)).toLowerCase(),
 'Aime bouger : '+label('aime',a.aime).toLowerCase(),
 'Gestes acquis ('+r.known.length+' sur 6) : '+(r.known.length?r.known.map(function(s){return G(s[1]).toLowerCase()}).join(', '):'aucun de la liste'),
 'Pyramide : '+r.pyr.map(function(x,i){return x[0]+' '+stK(x,i)}).join(' · '),
 'Sommeil : '+label(b===0?'som35':'som610',r.som)+' · Coucher à heure fixe : '+label('coucher',a.coucher).toLowerCase(),
 'Écrans : '+label('ecran',a.ecran).toLowerCase()+' par jour · Avant de dormir : '+label('ecranSoir',a.ecranSoir).toLowerCase()+' · Écran à '+(r.F?'elle':'lui')+' ou dans sa chambre : '+label('ecranChambre',a.ecranChambre).toLowerCase(),
 'Douleurs : '+(r.pain?r.g.map(function(x){return label('douleur',x).toLowerCase()}).join(', ')+' · '+label('douleurT',a.douleurT).toLowerCase()+(a.boite==='1'?' · boite ou réveillé'+(r.F?'e':'')+' la nuit':''):'aucune')+(label('arretb',a.arretb).indexOf('Oui')===0?' · Arrêt sur blessure '+label('arretb',a.arretb).toLowerCase().replace('oui, ',''):'')+(a.sante==='1'?' · Avis médical à demander':''),
 'Jeux : '+label('temps',a.temps).toLowerCase()+' · '+label('lieu',a.lieu).toLowerCase()+' · Matériel : '+(mat.length?mat.map(function(x){return label('materiel',x).toLowerCase()}).join(', '):'rien')];
 if(r.rows.length)L.push('Défis : '+r.rows.map(function(x){return x[0]+' : '+x[1].charAt(0).toLowerCase()+x[1].slice(1)}).join(' ; '));
 return L.concat((S.c&&(S.c.club||'').trim())?['Club ou activité : '+S.c.club.trim()]:[],['','Priorités :'],pr.map(function(p,i){return(i+1)+'. '+p[1]})).join('\n')}
function foodText(a){return'Assiette : petit-déjeuner '+label('pdj',a.pdj).toLowerCase()+' · goûter : '+label('gouter',a.gouter).toLowerCase()+' · boissons : '+label('boissons',a.boissons).toLowerCase()+' · fruits et légumes au dîner : '+label('legumes',a.legumes).toLowerCase()}
function progText(pg){return pg.games.map(function(g){return'- '+g.n+' ('+g.d+')'}).join('\n')+'\n'+pg.rythme}

/* ---------- Alpha Kids : affichage ---------- */
function renderIntro(){var has=S.done,ok=(S.a.parent||[]).length>0,begun=Object.keys(S.a).some(function(k){return k!=='parent'});
 root.innerHTML='<div class="b-intro"><h2 class="a-h2">Le bilan des <span style="white-space:nowrap">3–10 ans</span></h2><p class="a-lead">C’est toi, le parent, qui réponds. Ton enfant n’a rien à remplir : il joue. À la fin, tu as ses repères, tes 3 priorités et des jeux pour la semaine.</p>'+
 '<ol class="b-steps">'+STEPS.map(function(s){return'<li><b>'+G(s.t)+'</b></li>'}).join('')+'</ol>'+
 '<div class="b-get"><b>Ce que tu obtiens</b><ul><li>Sa pyramide : sommeil, assiette, mouvement, gestes.</li><li>Tes 3 priorités, chacune avec son pourquoi et une phrase à lui dire.</li><li>Trois jeux pour la semaine, choisis pour son âge et pour ta maison.</li><li>Les signes à surveiller.</li><li>Une fiche de jeux à télécharger.</li></ul></div>'+
 (has?'':'<fieldset class="b-q"><legend>Avant de commencer</legend><div class="b-opts"><button type="button" class="b-opt" data-k="parent" data-v="1" data-m="1" aria-pressed="'+ok+'"><b>Je suis son parent</b><span>Ou la personne qui en a la charge.</span></button></div></fieldset>')+
 '<div class="b-nav">'+(has?'<button type="button" class="a-btn a-btn-y" data-act="result">Revoir le bilan</button><button type="button" class="a-btn a-btn-o a-btn-ink" data-act="reset">Refaire le bilan</button>':ok?'<button type="button" class="a-btn a-btn-y" data-act="start">'+(begun?'Reprendre le bilan':'Commencer')+'</button>':'')+'</div>'+
 (has||ok?'':'<p class="b-help">Appuie sur « Je suis son parent » pour commencer.</p>')+
 '<p class="b-help">Gratuit, sans inscription, 5 minutes. Les réponses restent sur ce téléphone.</p></div>'}
function renderResult(){var a=S.a,r=compute(a),pr=priorities(a,r),pg=program(a,r),sum=summary(a,r,pr),b=r.b;
 var warn=[];
 if(a.sante==='1')warn.push('Tu as signalé un problème de santé : demande l’avis de son médecin avant de commencer.');
 if(r.stop)warn.push(a.boite==='1'?'Une douleur qui fait boiter ou qui réveille la nuit se montre à un médecin, sans attendre.':'Une douleur qui dure depuis plus de 2 semaines se montre à un médecin.');
 else if(r.rehab)warn.push('Sa blessure a moins de 3 mois : fais valider ces jeux par le kiné ou le médecin.');
 var doseT=r.base===0?'Sa base est fragile. On commence par elle : le sommeil et l’assiette passent avant les jeux.':r.base===1?'Sa base tient, mais elle peut être plus solide. Les jeux et les habitudes avancent ensemble.':'Sa base est solide : chaque minute de jeu va compter.';
 var AGE=['À cet âge, {il} découvre ce que son corps sait faire : courir, sauter, grimper, lancer. Tout passe par le jeu, avec toi.','À cet âge, {il} enchaîne les gestes et commence à suivre des règles. C’est le moment de varier : ballon, vélo, eau, corde.','À cet âge, {il} peut se lancer de vrais défis, toujours en jouant : un peu de vitesse, de tenue du corps et d’adresse, sans aucun poids.'];
 var h='<div class="b-card b-pyr"><p class="a-kick">Sa pyramide</p><div class="b-floors">'+r.pyr.slice().reverse().map(function(x,i){return'<div class="b-fl b-s'+x[2]+(i>1?' b-base':'')+'" style="width:'+(52+i*16)+'%"><b>'+x[0]+'</b>'+(i>1?'<small>'+x[1]+'</small>':'')+'<span>'+stK(x,3-i)+'</span></div>'}).join('')+'</div><p class="b-basel">La base porte tout le reste</p><p>'+doseT+'</p><p class="b-help">Chaque étage se construit sur celui du dessous : dormir, manger et boire, bouger tous les jours, puis apprendre des gestes.</p></div>';
 h+='<div class="b-card b-profile"><p class="a-kick">Alpha Kids · '+KAGE[b]+'</p><h2 class="a-h2">'+a.age+' ans</h2><p>'+G(AGE[b])+'</p><p class="b-code">'+esc(r.code)+'</p></div>';
 if(warn.length)h+='<div class="a-box b-warn"><p><b>Avant de commencer.</b> '+warn.join(' ')+'</p></div>';
 h+='<h3 class="b-h">Tes 3 priorités</h3><ol class="b-prio">'+pr.map(function(p){return'<li><b>'+p[1]+'</b><span>'+G(p[2])+'</span>'+why(p[4],p[5])+'</li>'}).join('')+'</ol>';
 h+='<h3 class="b-h">Les repères de son âge</h3><div class="b-stats"><div><b>'+(b===0?'10–13 h':'9–12 h')+'</b><span>de sommeil'+(b===0?' par 24 heures, sieste comprise':' par nuit')+'</span></div><div><b>'+(b===0?'3 h':'1 h')+'</b><span>'+(b===0?'de mouvement par jour, dont 1 heure où '+G('{il}')+' s’essouffle':'par jour où '+G('{il}')+' s’essouffle')+'</span></div><div><b>'+(b===0?'1 h':'2 h')+'</b><span>d’écran par jour, c’est le plafond</span></div></div>'+
 '<p>'+G(r.sleepLow?'{Il} dort moins que le repère de son âge : c’est sa première marge de progrès.':'Son sommeil est dans le repère de son âge. Garde les mêmes horaires le week-end.')+'</p>'+
 '<p>'+G(r.screenHigh?'Ses écrans dépassent le repère de son âge.':'Ses écrans restent sous le repère de son âge.')+(r.screenNight?' Le soir, ils gênent son sommeil.':'')+'</p>'+
 (b>0?'<p>'+G('Trois fois par semaine, des jeux qui font travailler les muscles et les os : sauter, grimper, se suspendre, porter.')+'</p>':'');
 h+='<h3 class="b-h">Ce qu’'+G('{il}')+' sait faire, et la suite</h3>'+
 (r.known.length?'<p><b>Déjà acquis.</b> '+r.known.map(function(s){return G(s[1])}).join(' · ')+'.</p>':'')+
 (r.next.length?'<p><b>À découvrir en jouant.</b> '+r.next.slice(0,3).map(function(s){return G(s[1])}).join(' · ')+'.</p>':'<p><b>Les six gestes de son âge sont là.</b> '+(b<2?'Regarde ceux de la tranche suivante : '+SKILLS[b+1].slice(0,3).map(function(s){return G(s[1]).toLowerCase()}).join(', ')+'.':'La suite se joue dans la variété : un nouveau sport, un nouveau terrain.')+'</p>')+
 '<p class="b-help">Ce sont des repères courants, pas un examen : chaque enfant avance à son rythme. Si quelque chose t’inquiète, parles-en à son médecin.</p>';
 h+='<h3 class="b-h">Ses jeux de la semaine</h3><div class="a-box"><p><b>Ton rythme.</b> '+pg.rythme+'</p></div>'+pg.games.map(function(g,i){
  return'<details class="b-sess"'+(i===0?' open':'')+'><summary><span>Jeu '+(i+1)+' · '+g.d+'</span><b>'+g.n+'</b></summary><p>'+G(g.how)+'</p><p class="b-help">Ce que ce jeu construit : '+g.b.charAt(0).toLowerCase()+g.b.slice(1)+'.</p></details>'}).join('')+
 '<ul class="b-notes">'+pg.notes.map(function(x){return'<li>'+G(x)+'</li>'}).join('')+'</ul>';
 if(b===2)h+='<h3 class="b-h">Son point de départ</h3>'+(r.rows.length?'<div class="b-rows">'+r.rows.map(function(x){return'<div><span><b>'+x[0]+'</b>'+esc(x[1])+'</span><span><em>Son point de départ</em></span></div>'}).join('')+'</div><p class="b-help">Ce n’est pas une note, et on ne '+G('{le}')+' compare à personne. Refais les mêmes défis dans 8 semaines.</p>':'<p class="b-help">'+(r.stop?'Pas de défis tant qu’un médecin n’a pas vu ton enfant.':'Tu n’as pas noté de défi. Tu peux y revenir avec « Modifier mes réponses ».')+'</p>');
 h+='<h3 class="b-h">Les signes à surveiller</h3><div class="a-box"><p>Prends rendez-vous chez son médecin si tu observes l’un de ces signes :</p><p style="margin-top:.6em">Une douleur qui dure plus de 2 semaines, qui fait boiter ou qui réveille la nuit.</p><p style="margin-top:.6em">Une fatigue inhabituelle qui s’installe.</p><p style="margin-top:.6em">Un essoufflement anormal, une douleur dans la poitrine ou un malaise pendant l’effort : on arrête tout de suite.</p></div>';
 h+='<h3 class="b-h">Ton rôle</h3><div class="a-box"><p><b>Jouer avec '+G('{soi}')+'.</b> Dix minutes avec toi valent mieux qu’une heure tout'+G('{e}')+' seul'+G('{e}')+' devant une consigne.</p><p style="margin-top:.6em"><b>Encourager l’effort, pas le résultat.</b> « Tu as essayé » plutôt que « tu as gagné ».</p><p style="margin-top:.6em"><b>Ne pas comparer.</b> Ni avec un frère, ni avec une copine, ni avec toi au même âge.</p><p style="margin-top:.6em"><b>Aucune remarque sur le poids ou le corps.</b> À cet âge, on ne parle ni de calories ni de régime.</p><p style="margin-top:.6em"><b>Plusieurs activités plutôt qu’une.</b> Avant 10 ans, on touche à tout.</p></div>';
 h+='<h3 class="b-h">La fiche de son âge</h3><p>Six jeux, les repères et une semaine type pour les '+KAGE[b]+', sur deux pages à imprimer ou à garder dans ton téléphone.</p><div class="b-nav"><a class="a-btn a-btn-y" href="/docs/'+KFICHE[b]+'" download>Télécharger la fiche '+KAGE[b]+'</a></div>';
 var c=S.c||{};
 h+='<div class="b-card b-share"><h3>Envoyer le bilan à Alpha</h3><p>On lit le bilan et on te répond personnellement.</p>'+
 '<label class="b-f"><span>Le prénom de ton enfant</span><input type="text" data-c="prenom" autocomplete="off" value="'+esc(c.prenom||'')+'"></label>'+
 '<label class="b-f"><span>Ton e-mail</span><input type="email" inputmode="email" data-c="email" autocomplete="email" value="'+esc(c.email||'')+'"></label>'+
 '<label class="b-f"><span>Son club ou son activité <i>facultatif</i></span><input type="text" data-c="club" value="'+esc(c.club||'')+'"></label>'+
 '<p class="b-cerr" id="b-cerr" role="alert" hidden>Indique le prénom et un e-mail valide.</p>'+
 '<div class="b-nav"><button type="button" class="a-btn a-btn-y" data-act="send">Envoyer le bilan</button><button type="button" class="a-btn a-btn-o" data-act="copy">Copier le résumé</button></div><p class="b-help" id="b-copied" hidden>Résumé copié.</p>'+
 '<p class="b-small">Ton application d’e-mail s’ouvre avec le bilan déjà écrit : il te reste à appuyer sur Envoyer. En l’envoyant, tu donnes ton accord pour qu’Alpha lise ce bilan et te réponde. Aucune autre information sur ton enfant n’est demandée.</p>'+
 '<details class="b-sumd"><summary>Voir le résumé envoyé</summary><pre id="b-sum">'+esc(sum)+'</pre></details></div>';
 h+='<div class="b-nav"><a class="a-btn a-btn-y" href="/kids">Retour à Alpha Kids</a><button type="button" class="a-btn a-btn-o a-btn-ink" data-act="edit">Modifier mes réponses</button><button type="button" class="a-btn a-btn-o a-btn-ink" data-act="reset">Refaire le bilan</button></div>'+
 '<p class="b-help">Ce bilan donne des repères généraux. Il ne remplace ni l’avis d’un médecin ni le suivi d’un éducateur sportif qualifié.</p>';
 root.innerHTML=h}
