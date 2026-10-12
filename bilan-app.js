/* Bilan Alpha : un seul parcours, les mêmes questions pour tout le monde. */
(function(){'use strict';
var root=document.getElementById('bilan');if(!root)return;
var KEY='alpha.bilan.v2',MAIL='alphasince.contact@gmail.com';
var S={step:-1,a:{},done:false};
try{var sv=JSON.parse(localStorage.getItem(KEY)||'null');if(sv&&sv.a)S=sv}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var hadSport=function(a){return a.sport&&a.sport!=='0'};

/* ---------- Les 5 étapes ---------- */
var STEPS=[
{t:'Toi',d:'Quatre informations pour calibrer ton bilan. Elles restent sur ton téléphone.',q:[
 {k:'sexe',l:'Tu es',h:'Les repères des tests ne sont pas les mêmes.',o:[['H','Un homme'],['F','Une femme']]},
 {k:'age',l:'Ton âge',n:[10,99,'ans']},
 {k:'taille',l:'Ta taille',n:[120,230,'cm']},
 {k:'poids',l:'Ton poids',n:[30,250,'kg']}]},
{t:'Ton histoire sportive',d:'Ce que tu as fait avant compte autant que ce que tu fais aujourd’hui.',q:[
 {k:'sport',l:'As-tu déjà pratiqué un sport régulièrement ?',o:[['0','Non, jamais vraiment'],['1','Oui, en loisir'],['2','Oui, en club ou en compétition'],['3','Oui, à haut niveau']]},
 {k:'type',l:'Quel sport, surtout ?',s:hadSport,o:[['terrain','Un sport collectif','Foot, rugby, hand, basket…'],['endurance','Un sport d’endurance','Course, vélo, natation…'],['combat','Un sport de combat'],['raquette','Un sport de raquette'],['gym','Gym, danse, escalade'],['salle','Musculation, CrossFit'],['autre','Un autre sport']]},
 {k:'annees',l:'Pendant combien de temps ?',s:hadSport,o:[['1','Moins de 2 ans'],['2','2 à 5 ans'],['3','5 à 10 ans'],['4','Plus de 10 ans']]},
 {k:'arret',l:'Et aujourd’hui ?',s:hadSport,o:[['0','Je pratique encore'],['1','Arrêté depuis moins d’un an'],['2','Arrêté depuis 1 à 5 ans'],['3','Arrêté depuis plus de 5 ans']]},
 {k:'muscu',l:'As-tu déjà fait de la musculation ?',h:'En salle ou à la maison, avec des poids, des machines ou des élastiques.',o:[['0','Jamais'],['1','J’ai essayé, sans régularité'],['2','Régulièrement, depuis moins de 2 ans'],['3','Régulièrement, depuis plus de 2 ans']]}]},
{t:'Ta vie aujourd’hui',d:'Réponds selon une semaine normale, pas une semaine idéale.',q:[
 {k:'metier',l:'Ton travail, ou tes journées, c’est plutôt',h:'Ton entraînement ira à contre-pied de ce que ton corps fait déjà toute la journée.',o:[['assis','Assis','Bureau, écran, conduite'],['debout','Debout','Commerce, atelier, soins…'],['physique','Physique','Tu marches ou tu portes beaucoup']]},
 {k:'actif',l:'En dehors du travail, combien de fois par semaine fais-tu au moins 30 minutes d’effort ?',h:'Sport, vélo, marche rapide.',o:[['0','Jamais ou presque'],['1','1 fois'],['2','2 à 3 fois'],['3','4 fois ou plus']]},
 {k:'gene',l:'As-tu une gêne ou une douleur en ce moment ?',h:'Plusieurs réponses possibles.',m:1,o:[['non','Aucune'],['dos','Au dos'],['genou','Aux genoux'],['epaule','Aux épaules'],['autre','Ailleurs']]},
 {k:'sante',l:'As-tu un problème de cœur ou de tension, ou un médecin t’a-t-il déconseillé l’effort ?',o:[['0','Non'],['1','Oui']]}]},
{t:'Ta base',d:'La récupération et l’assiette passent avant l’entraînement : c’est ce qui rend chaque minute de sport utile.',q:[
 {k:'stress',l:'Ta charge mentale en ce moment',o:[['0','Légère','J’ai de la marge'],['1','Soutenue','C’est chargé, mais je tiens'],['2','Très lourde','Je suis à bout']]},
 {k:'sommeil',l:'Combien d’heures dors-tu par nuit ?',o:[['1','Moins de 6 h'],['2','6 à 7 h'],['3','7 à 8 h'],['4','Plus de 8 h']],row:1},
 {k:'sommeilq',l:'Au réveil, tu te sens',o:[['2','Reposé'],['1','Moyennement reposé'],['0','Fatigué, presque tous les jours']]},
 {k:'prot',l:'Manges-tu de la viande, du poisson, des œufs, des laitages ou des légumes secs à chaque repas ?',o:[['0','Rarement'],['1','À un repas sur deux'],['2','Oui, presque toujours']]},
 {k:'legumes',l:'Fruits et légumes : combien de portions par jour ?',h:'Une portion, c’est une poignée.',o:[['0','0 à 1'],['1','2 à 3'],['2','4 ou plus']],row:1},
 {k:'plats',l:'Fast-food, plats préparés ou livrés',o:[['0','Presque tous les jours'],['1','2 à 3 fois par semaine'],['2','Rarement']]},
 {k:'boissons',l:'Sodas, jus de fruits ou alcool',o:[['0','Tous les jours'],['1','Quelques fois par semaine'],['2','Rarement']]}]},
{t:'Trois tests',d:'Échauffe-toi 5 minutes : marche rapide, cercles de bras. Si tu ne peux pas faire les tests maintenant, donne ton estimation. Douleur dans la poitrine, vertige ou essoufflement anormal : tu arrêtes tout de suite.',q:[
 {k:'pompesType',l:'Les pompes : quelle version ?',h:'Mains au sol sous les épaules, corps droit. Tu descends la poitrine près du sol, puis tu remontes.',o:[['p','Classiques, sur les pieds'],['g','Sur les genoux']]},
 {k:'pompes',l:'Combien de pompes d’affilée ?',h:'Sans t’arrêter. 0 est une réponse valable.',n:[0,200,'pompes']},
 {k:'planche',l:'La planche : combien de secondes ?',h:'En appui sur les avant-bras et la pointe des pieds, corps droit comme une planche. Tu arrêtes le chrono quand les hanches tombent.',n:[0,900,'secondes']},
 {k:'course',l:'Combien de temps peux-tu courir sans t’arrêter ?',h:'À une allure où tu peux encore parler.',o:[['1','Je ne cours pas'],['2','Moins de 10 minutes'],['3','10 à 20 minutes'],['4','20 à 40 minutes'],['5','Plus de 40 minutes']]},
 {x:'Pour aller plus loin (facultatif)',xd:'Quatre tests de plus, à faire quand tu veux. Ils précisent ton profil sans le changer.'},
 {k:'chaise',l:'La chaise : combien de secondes ?',h:'Dos contre un mur, cuisses à l’horizontale, genoux à angle droit.',n:[0,600,'secondes'],opt:1},
 {k:'saut',l:'Saut en longueur sans élan',h:'Pieds joints derrière une ligne. Mesure jusqu’au talon le plus proche. Meilleur de 3 essais.',n:[50,350,'cm'],opt:1},
 {k:'soup',l:'Debout, jambes tendues, penche-toi en avant : jusqu’où vont tes doigts ?',o:[['1','Aux genoux'],['2','Aux tibias'],['3','Aux chevilles'],['4','Aux orteils'],['5','Paumes au sol']],opt:1},
 {k:'run3',l:'Ton temps sur 3 km, en minutes',h:'Sur terrain plat, le plus vite possible mais à allure régulière.',n:[8,60,'minutes'],opt:1}]},
{t:'Ton objectif',d:'Un seul objectif principal. On peut tout faire, mais pas tout en même temps.',q:[
 {k:'objectif',l:'Ce que tu veux en priorité',o:[['forme','Retrouver la forme','Me sentir bien, bouger sans douleur'],['muscle','Prendre du muscle'],['force','Devenir plus fort'],['affiner','M’affiner','Perdre du gras, garder le muscle'],['endurance','Courir plus longtemps'],['terrain','Être prêt pour mon sport','Foot, rugby, hand, raquette…']]},
 {k:'freq',l:'Combien de séances par semaine peux-tu vraiment tenir ?',h:'Avec le travail, la famille et la fatigue.',o:[['1','1'],['2','2'],['3','3'],['4','4'],['5','5 ou plus']],row:1},
 {k:'duree',l:'Combien de temps par séance, vraiment ?',h:'Mieux vaut 15 minutes tenues que 45 minutes annulées.',o:[['15','15 min'],['20','20 min'],['30','30 min'],['45','45 min'],['60','1 h']],row:1},
 {k:'moment',l:'À quel moment de la journée ?',o:[['matin','Le matin'],['midi','Le midi'],['soir','Le soir'],['var','Ça dépend des jours']]},
 {k:'lieu',l:'Où vas-tu t’entraîner ?',o:[['salle','En salle de sport'],['maison','À la maison, avec des haltères ou des élastiques'],['sans','À la maison, sans matériel']]}]}
];
function label(k,v){for(var i=0;i<STEPS.length;i++)for(var j=0;j<STEPS[i].q.length;j++){var q=STEPS[i].q[j];if(q.k===k&&q.o)for(var n=0;n<q.o.length;n++)if(q.o[n][0]===String(v))return q.o[n][1]}return ''}
function visible(q){return !q.s||q.s(S.a)}
function check(i){var qs=STEPS[i].q,a=S.a;for(var j=0;j<qs.length;j++){var q=qs[j];if(!q.k||!visible(q))continue;var v=a[q.k];
  if(q.m){if(!v||!v.length){if(!q.opt)return q.k}continue}
  if(v===undefined||v===''){if(!q.opt)return q.k;continue}
  if(q.n&&(isNaN(+v)||+v<q.n[0]||+v>q.n[1]))return q.k}
 return ''}

/* ---------- Calcul du profil ---------- */
function band(x,t){return x<t[0]?1:x<t[1]?2:x<t[2]?3:x<t[3]?4:5}
var LV=['','À construire','Sous les repères','Dans les repères','Bon','Très bon'],ST=['fragile','à consolider','solide'];
function st(x){return x[0]==='Performer'&&x[2]===0?'à construire':ST[x[2]]}
function compute(a){
 var age=+a.age,w=+a.poids,hc=+a.taille,F=a.sexe==='F';
 var af=age<40?1:age<50?.9:age<60?.8:.7,sc=function(t){return t.map(function(x){return x*af})};
 var lv={},rows=[];
 lv.course=+a.course;rows.push(['Endurance','Course sans arrêt : '+label('course',a.course).toLowerCase(),lv.course]);
 lv.pompes=band(+a.pompes*(a.pompesType==='g'?.5:1),sc(F?[5,12,20,30]:[10,20,30,40]));
 rows.push(['Haut du corps',a.pompes+' pompes'+(a.pompesType==='g'?' sur les genoux':''),lv.pompes]);
 lv.planche=band(+a.planche,sc([30,60,120,180]));rows.push(['Tronc','Planche : '+a.planche+' secondes',lv.planche]);
 var core=(lv.course+lv.pompes+lv.planche)/3,vma=0;
 if(a.chaise!==undefined&&a.chaise!==''){lv.chaise=band(+a.chaise,sc(F?[20,35,45,60]:[25,50,75,100]));rows.push(['Jambes','Chaise : '+a.chaise+' secondes',lv.chaise])}
 if(a.saut){lv.saut=band(+a.saut,sc(F?[140,170,190,200]:[190,220,240,250]));rows.push(['Détente','Saut de '+a.saut+' cm',lv.saut])}
 if(a.soup){lv.soup=+a.soup;rows.push(['Souplesse','Doigts '+label('soup',a.soup).toLowerCase(),lv.soup])}
 if(a.run3){var t=+a.run3*60,fr=t<=600?.95:t<=900?.92:t<=1200?.88:.85;vma=3/(t/3600)/fr;lv.run3=band(vma,sc(F?[9.5,11.5,13.5,15]:[11,13,15,17]));rows.push(['Vitesse','3 km en '+a.run3+' minutes',lv.run3])}
 /* moteur : tests + passé sportif + activité actuelle */
 var sp=+a.sport||0,hist=0;
 if(sp){hist=sp*[1,.8,.5,.25][+a.arret||0]*[0,.5,.75,1,1][+a.annees||1]}
 var m=core+hist*.2+[-.3,0,.2,.4][+a.actif||0];
 var M=m<2.4?1:m<3.5?2:3,T=+a.muscu||0;
 var H=!sp?'none':a.arret==='0'?'now':'past';
 var name,desc;
 if(T>=2&&M===3){name='Confirmé';desc='Tu as le moteur et la technique. L’enjeu maintenant : cibler, doser et éviter la routine.'}
 else if(T>=2){name='Pratiquant régulier';desc='Tu connais la salle. On structure ta progression et on renforce tes points faibles.'}
 else if(M===3){name='Moteur solide, nouveau en salle';desc='Tu n’es pas un débutant : tu as l’endurance, la coordination et l’habitude de l’effort. Ce qui te manque, c’est la technique des mouvements avec des charges. On apprend les gestes d’abord, on charge ensuite.'}
 else if(M===2&&H!=='none'){name='Sportif en reprise, nouveau en salle';desc='Tu as une base, et ton corps s’en souvient. On remet le moteur en route et on apprend les gestes, sans brûler les étapes.'}
 else if(M===2){name='En route';desc='Tu bouges déjà. On ajoute de la structure et on apprend les gestes de base.'}
 else if(H==='past'){name='Ancien sportif, nouveau départ';desc='Tu sais ce que c’est de s’entraîner, mais le corps a perdu l’habitude. Elle revient plus vite qu’on ne le croit, à condition de repartir progressivement.'}
 else{name='Nouveau départ';desc='Tu pars de zéro, et c’est là qu’on progresse le plus vite. Des séances courtes, simples et régulières.'}
 var FAM={terrain:'Terrain',endurance:'Endurance',combat:'Combat',raquette:'Raquette',gym:'Gym',salle:'Salle',autre:'Sportif'};
 var ML=['','moteur à construire','moteur correct','moteur solide'],TL=['nouveau en salle','débutant en salle','habitué de la salle','confirmé en salle'];
 var OB={forme:'forme',muscle:'muscle',force:'force',affiner:'affinement',endurance:'endurance',terrain:'sport'};
 var code=[sp?FAM[a.type]||'Sportif':'Sans passé sportif',ML[M],TL[T],'objectif '+OB[a.objectif],a.freq+(a.freq==='5'?'+':'')+' séance'+(+a.freq>1?'s':'')].join(' · ');
 /* pyramide : 0 fragile, 1 à consolider, 2 solide */
 var s1=[0,0,1,2,2][+a.sommeil]+(+a.sommeilq)+(2-(+a.stress)),e1=s1>=5?2:s1>=3?1:0;
 if(a.stress==='2'||(a.sommeil==='1'&&a.sommeilq==='0'))e1=0;
 var s2=(+a.prot)+(+a.legumes)+(+a.boissons)+(+a.plats),e2=s2>=6?2:s2>=4?1:0;
 var e3=a.actif==='0'?(a.metier==='physique'?1:0):a.actif==='1'?1:2;
 var e4=T>=2&&M>=2?2:T>=1||M>=2?1:0;
 var pyr=[['Récupérer','Sommeil et charge mentale',e1],['Se nourrir','Une assiette propre',e2],['Bouger régulièrement','Du temps bloqué pour toi',e3],['Performer','Charges et intensité',e4]];
 var base=e1===0||(e1===1&&e2===0)?0:e1===2&&e2===2?2:1;
 return{age:age,w:w,hc:hc,F:F,lv:lv,rows:rows,M:M,T:T,H:H,name:name,desc:desc,code:code,vma:vma,ML:ML,TL:TL,pyr:pyr,base:base}}

/* ---------- Priorités ---------- */
function priorities(a,r){var p=[],g=a.gene||[],fl=function(i){return r.pyr[i][2]<2?(4-i)*100:0};
 function add(i,wt,t,x){p.push([wt+fl(i),t,x,i])}
 if(a.sante==='1')p.push([1000,'Un avis médical d’abord','Avant de commencer, fais le point avec ton médecin. Montre-lui ce bilan.']);
 /* étage 1 : récupérer */
 if(a.stress==='2')add(0,90,'Alléger la charge mentale','Avant d’ajouter des séances, protège ton sommeil et garde 10 minutes par jour rien que pour toi : marche, respiration lente, sans écran. Si l’épuisement dure, parles-en à ton médecin.');
 else if(a.stress==='1')add(0,30,'Garder une soupape','Ta séance est un rendez-vous avec toi, pas une tâche de plus. Garde-la courte et régulière.');
 if(a.sommeil==='1')add(0,80,'Dormir plus','Moins de 6 heures, c’est le premier frein à tes progrès. Avance ton coucher de 15 minutes chaque semaine.');
 else if(a.sommeil==='2'&&a.sommeilq!=='0')add(0,35,'Gagner une demi-heure de sommeil','Vise 7 heures : c’est la nuit que le corps se répare.');
 if(a.sommeilq==='0')add(0,70,'Mieux dormir','Horaires réguliers, écrans en pause 30 minutes avant de dormir, chambre fraîche. Si la fatigue dure malgré assez de sommeil, vois ton médecin.');
 /* étage 2 : se nourrir */
 if(a.plats==='0')add(1,60,'Reprendre la main sur tes repas','Prépare deux ou trois repas simples à l’avance (riz, œufs ou poulet, légumes) : c’est ce qui remplace le fast-food les jours chargés.');
 if(a.prot==='0')add(1,50,'Des protéines à chaque repas','Œufs, poisson, viande, laitages ou légumes secs : une portion de la taille de ta paume, trois fois par jour.');
 else if(a.prot==='1')add(1,30,'Des protéines aussi au petit-déjeuner','C’est souvent le repas qui en manque : œufs, fromage blanc ou yaourt.');
 if(a.boissons==='0')add(1,42,'Moins de boissons sucrées et d’alcool','Ils freinent la récupération. Garde-les pour les occasions.');
 if(a.legumes==='0')add(1,40,'Plus de fruits et de légumes','La moitié de l’assiette en légumes, midi et soir.');
 /* étage 3 : bouger régulièrement */
 if(a.actif==='0'&&a.metier!=='physique')add(2,65,'Bouger tous les jours','20 à 30 minutes de marche par jour, en plus des séances. C’est la base de tout le reste.');
 if(a.actif==='0'||a.actif==='1')add(2,55,'Bloquer tes créneaux','Des rendez-vous fixes dans la semaine, notés dans ton agenda comme un rendez-vous professionnel. La régularité passe avant l’intensité.');
 /* étage 4 : performer */
 if(g.indexOf('non')<0&&g.length)add(3,75,'Protéger les zones sensibles','On commence par les versions les plus légères des exercices, sans douleur. Si la gêne dure, vois un kinésithérapeute.');
 if(r.T<=1)add(3,70,'Apprendre les gestes de base','Pendant 4 à 6 semaines, des mouvements simples et propres. C’est ce qui te permettra d’en faire plus ensuite sans te blesser.');
 if(r.H==='past'&&(a.arret==='2'||a.arret==='3'))add(3,60,'Repartir progressivement','Le souffle revient vite. Les tendons et les articulations, eux, ont besoin de quelques semaines. Augmente un peu chaque semaine, pas plus.');
 var adv={course:['Travailler le souffle','De l’endurance facile, 2 fois par semaine : marche rapide, course lente ou vélo.'],pompes:['Renforcer le haut du corps','Pompes et tirages, 2 fois par semaine.'],planche:['Renforcer le tronc','La planche et ses variantes, 3 fois par semaine, 5 minutes suffisent.']};
 ['course','pompes','planche'].forEach(function(k){if(r.lv[k]<=2)add(3,55-r.lv[k]*5+(k==='course'&&a.objectif==='endurance'?10:0),adv[k][0],adv[k][1])});
 if(p.length<3){p.push([10,'Rester régulier','Tes bases sont bonnes. La régularité sur plusieurs mois fera la différence.']);p.push([9,'Progresser un peu chaque semaine','Une répétition, quelques kilos ou quelques minutes de plus.']);p.push([8,'Refaire le bilan dans 8 semaines','Dans les mêmes conditions, pour mesurer le chemin parcouru.'])}
 var cnt={},res=[];p.sort(function(x,y){return y[0]-x[0]}).forEach(function(x){var k=x[3];if(res.length<3&&(k===undefined||(cnt[k]=(cnt[k]||0)+1)<=2))res.push(x)});
 return res}

/* ---------- Programme ---------- */
var HOW={squat:'Pieds écartés comme les épaules. Tu descends comme pour t’asseoir, dos droit, genoux dans l’axe des pieds, puis tu remontes.',hinge:'Jambes presque tendues, dos droit. Tu penches le buste en reculant les hanches, puis tu te redresses en serrant les fessiers.',pont:'Allongé sur le dos, pieds au sol. Tu montes les hanches en serrant les fessiers, puis tu redescends.',pompe:'Mains sous les épaules, corps droit. Tu descends la poitrine près du sol, puis tu remontes. Plus facile : mains sur un banc ou sur les genoux.',dev:'Allongé sur le dos, un haltère dans chaque main. Tu pousses vers le plafond, puis tu redescends lentement.',tirage:'Assis, tu tires la barre vers le haut de la poitrine en rapprochant les omoplates.',row:'Une main en appui, dos plat. Tu tires la charge vers la hanche, coude près du corps.',fente:'Un grand pas en avant. Tu descends le genou arrière vers le sol, buste droit, puis tu repousses.',planche:'En appui sur les avant-bras et la pointe des pieds, corps droit, ventre serré.',lat:'Sur le côté, en appui sur un avant-bras, corps droit des épaules aux pieds.',fermier:'Une charge lourde dans chaque main. Tu marches droit, épaules basses.',chaise:'Dos contre un mur, cuisses à l’horizontale. Tu tiens la position.',epaule:'Debout, un haltère dans chaque main. Tu pousses au-dessus de la tête, sans cambrer le dos.',pike:'En position de pompe, hanches hautes. Tu descends la tête vers le sol, puis tu repousses.'};
function ex(p,L,T){var no=L==='sans';switch(p){
 case'squat':return no?['Squat','squat']:T>=2&&L==='salle'?['Squat à la barre','squat']:['Squat avec un haltère contre la poitrine','squat'];
 case'hinge':return no?['Pont fessier','pont']:['Soulevé de terre jambes tendues, avec haltères','hinge'];
 case'push':return no||T<=1?['Pompes','pompe']:L==='salle'?['Développé couché avec haltères','dev']:['Développé au sol avec haltères','dev'];
 case'pull':return L==='salle'?['Tirage vers la poitrine, à la poulie','tirage']:no?['Rowing à un bras, avec un sac à dos chargé','row']:['Rowing à un bras, avec haltère','row'];
 case'pull2':return no?['Rowing à un bras, avec un sac à dos chargé','row']:['Rowing à un bras, avec haltère','row'];
 case'lunge':return['Fentes','fente'];
 case'core':return['Planche','planche','t'];
 case'core2':return['Planche sur le côté','lat','t'];
 case'carry':return no?['Chaise contre un mur','chaise','t']:['Marche du fermier','fermier','d'];
 case'shoulder':return no?['Pompes hanches hautes','pike']:['Développé au-dessus de la tête','epaule']}}
function program(a,r){
 var L=a.lieu,T=r.T,M=r.M,f=+a.freq,g=a.objectif,c=+a.course,d=+a.duree,job=a.metier,low=r.base===0;
 var n=d<=15?3:d<=20?4:d<=30?4:d<=45?5:6;if(low||job==='physique')n=Math.max(3,n-1);
 var learn=T<=1,circuit=L==='sans',sch;
 if(learn||low)sch={r:'3 séries de 10 répétitions',t:'3 fois 20 à 30 secondes',d:'3 fois 20 mètres',rest:'1 minute à 1 minute 30',tip:'Charge légère : tu finis chaque série en te sentant capable d’en faire 3 de plus.'};
 else if(g==='force')sch={r:'4 séries de 5 à 6 répétitions',t:'3 fois 45 secondes',d:'3 fois 30 mètres',rest:'2 à 3 minutes',tip:'Charge lourde, geste propre : garde 1 à 2 répétitions de marge.'};
 else if(g==='muscle')sch={r:'3 séries de 8 à 12 répétitions',t:'3 fois 45 secondes',d:'3 fois 30 mètres',rest:'1 minute 30',tip:'Garde 2 répétitions de marge. Quand tu atteins 12 partout, ajoute de la charge.'};
 else if(g==='terrain')sch={r:'3 séries de 6 à 8 répétitions',t:'3 fois 30 à 45 secondes',d:'3 fois 30 mètres',rest:'1 minute 30 à 2 minutes',tip:'Monte vite, descends lentement. Garde 2 répétitions de marge.'};
 else sch={r:'3 séries de 12 à 15 répétitions',t:'3 fois 30 à 45 secondes',d:'3 fois 30 mètres',rest:'45 secondes à 1 minute',tip:'Rythme régulier, peu de repos : tu dois être essoufflé mais garder un geste propre.'};
 var TPL=[['squat','push','pull','core','hinge','carry'],['hinge','pull2','shoulder','lunge','core2','carry'],['lunge','push','pull','squat','core','shoulder'],['squat','pull2','shoulder','hinge','core2','carry']];
 var mob=job==='physique'?'Pour finir : 5 minutes de mobilité, hanches, dos et épaules.':job==='debout'?'Pour finir : 5 minutes d’étirements, mollets, hanches et dos.':'';
 function strength(i){var s;
  if(circuit){var k=d<=15?4:d<=30?5:6,tours=Math.max(2,Math.min(5,Math.floor((d-5)/(k+1)))),eff=learn||low?'30 secondes d’effort, 30 secondes de repos':'40 secondes d’effort, 20 secondes de repos';
   s={title:'Circuit '+'ABCD'[i%4],kind:d+' minutes, au poids du corps',items:TPL[i%4].slice(0,k).map(function(p){var e=ex(p,L,T);return{n:e[0],dose:eff,how:HOW[e[1]]}}),
    circ:tours+' tours. Tu enchaînes les exercices, puis 1 minute de repos entre les tours.',tip:learn||low?'Tu dois finir en te disant que tu aurais pu continuer. La séance suivante, ajoute une ou deux répétitions par exercice.':'Garde un geste propre jusqu’au bout. Quand c’est facile, passe à un tour de plus.',warm:'Échauffement : 3 minutes de marche sur place et de cercles de bras.',chrono:1}}
  else{s={title:'Renforcement '+'ABCD'[i%4],kind:'Tout le corps, '+d+' minutes',items:TPL[i%4].slice(0,n).map(function(p){var e=ex(p,L,T);return{n:e[0],dose:e[2]==='t'?sch.t:e[2]==='d'?sch.d:sch.r,how:HOW[e[1]]}}),rest:sch.rest,tip:sch.tip,warm:'Échauffement : 5 minutes de marche rapide ou de vélo, puis une série très légère du premier exercice.'}}
  if(g==='affiner'&&!circuit&&!low)s.end='Pour finir : 10 minutes de cardio au choix (vélo, rameur, marche rapide en côte).';
  if(g==='terrain'&&M>=2&&i===0&&!low)s.end='Pour finir : 6 sprints de 20 mètres, retour en marchant.';
  if(mob)s.end=(s.end?s.end+' ':'')+mob;
  return s}
 var RUN=c<=2?[['Marche et course','Alterne 1 minute de course et 2 minutes de marche, pendant '+Math.min(d,30)+' minutes.']]:c===3?[['Course facile',Math.min(d,30)+' minutes à une allure où tu peux parler.'],['Course par intervalles','10 minutes faciles, puis 6 fois 1 minute un peu plus vite avec 2 minutes lentes entre chaque.']]:[['Course facile',Math.min(d,40)+' minutes à une allure où tu peux parler.'],['Fractionné','10 minutes faciles, puis 8 fois 1 minute rapide et 1 minute lente.'],['Sortie longue','50 à 70 minutes, très facile.']];
 function run(i){var x=RUN[i%RUN.length];return{title:x[0],kind:'Endurance',text:x[1]}}
 var out=[],ns,i;
 if(g==='endurance'){ns=f>=4?2:f>=2?1:0;var nr=f-ns,ri=0,si=0;for(i=0;i<f;i++){if(si<ns&&(i%2===1||ri>=nr))out.push(strength(si++));else out.push(run(ri++))}}
 else{var cap=low?2:learn||M===1?3:4;ns=Math.min(f,cap);
  if(job==='physique'&&f>=2){ns=Math.min(ns,f-1)}
  for(i=0;i<ns;i++)out.push(strength(i));
  for(i=ns;i<f;i++){if(job==='physique'&&i===ns)out.push({title:c<=2?'Marche et course':'Course soutenue',kind:'À contre-pied de ta journée',text:c<=2?'Alterne 1 minute de course et 2 minutes de marche, pendant '+Math.min(d,25)+' minutes. Ton corps marche déjà toute la journée : ici, il fait un effort différent.':Math.min(d,30)+' minutes de course à un rythme où tu ne peux dire que quelques mots. Ton corps marche et porte déjà toute la journée : ici, il fait un effort différent.'});
   else out.push({title:'Séance légère',kind:'Récupération active',text:Math.min(d,30)+' minutes de marche rapide, de vélo ou de course facile. Tu dois pouvoir parler.'})}}
 out.forEach(function(s,k){s.num=k+1});
 var notes=[];
 if(low)notes.push('Ta base est fragile : les séances sont volontairement courtes et modérées. Elles doivent te donner de l’énergie, pas t’en prendre. On augmentera quand le sommeil et la charge mentale iront mieux.');
 if(job==='physique')notes.push('Ton travail te fait déjà marcher et porter. On va à contre-pied : un effort plus soutenu et de la mobilité, sans rajouter de volume sur ce que ton corps fait toute la journée.');
 if(job==='assis')notes.push('Tu passes tes journées assis : la priorité est le renforcement et le mouvement. Lève-toi 2 minutes toutes les heures.');
 if(job==='debout')notes.push('Tu passes tes journées debout : on renforce, et on termine par des étirements pour soulager les jambes et le dos.');
 if(f>1)notes.push('Laisse au moins un jour entre deux séances de renforcement.');
 if(g!=='endurance'&&f>ns&&job!=='physique')notes.push('On limite volontairement le renforcement à '+ns+' séance'+(ns>1?'s':'')+' : c’est pendant la récupération que le corps progresse.');
 if(r.age>=40&&learn&&!circuit)notes.push('Après 40 ans, les tendons s’adaptent plus lentement que le souffle : n’augmente pas les charges de plus de 5 à 10 % par semaine.');
 if(r.age<18)notes.push('Avant 18 ans : entraîne-toi avec un adulte qualifié, sans chercher de charge maximale. La technique passe avant tout.');
 var DAYS={1:'le mercredi',2:'le mardi et le vendredi',3:'le lundi, le mercredi et le vendredi',4:'le lundi, le mardi, le jeudi et le samedi',5:'du lundi au vendredi'}[f];
 var MO={matin:'le matin, avant que la journée commence',midi:'sur ta pause de midi',soir:'le soir, avant le dîner',var:'au moment qui tient le mieux dans ta journée'}[a.moment];
 var rdv='Par exemple '+DAYS+', '+MO+'. Note ces créneaux dans ton agenda comme des rendez-vous professionnels.'+(L!=='salle'?' À la maison, personne ne t’attend : prépare ta tenue la veille et préviens ton entourage que ce moment est le tien.':'');
 var mini=circuit?'Semaine chargée ? Fais 2 tours du circuit, 10 minutes. L’important est de ne pas casser l’habitude.':'Semaine chargée ? Fais les 3 premiers exercices, 2 séries chacun, 10 minutes. L’important est de ne pas casser l’habitude.';
 var ph=learn?[['Semaines 1 à 4','Apprendre les gestes','Mouvements lents et propres, sans chercher la difficulté.'],['Semaines 5 à 8',circuit?'Ajouter un tour':'Ajouter de la charge',circuit?'Un tour ou quelques répétitions de plus, tant que le geste reste propre.':'Un peu plus lourd chaque semaine, tant que le geste reste propre.'],['Semaines 9 à 12','Consolider','Tu gardes le rythme, puis tu refais le bilan pour mesurer tes progrès.']]:[['Semaines 1 à 4','Poser les bases','Régularité et technique, avec de la marge sur chaque série.'],['Semaines 5 à 8','Progresser','Plus de charge ou de répétitions chaque semaine.'],['Semaines 9 à 12','Intensifier, puis mesurer','Une semaine plus légère à la fin, puis tu refais le bilan.']];
 return{sessions:out,notes:notes,phases:ph,rdv:rdv,mini:mini}}

/* ---------- Alimentation ---------- */
function nutrition(a,r){var w=r.w,f=+a.freq,g=a.objectif,notes=[];
 var imc=w/Math.pow(r.hc/100,2),tg=g==='affiner'?'perdre':g==='muscle'?'prendre':'stable';
 if(tg==='perdre'&&r.age<18){tg='stable';notes.push('Avant 18 ans, pas de régime : ton corps grandit encore. On améliore la qualité de l’assiette, pas la quantité.')}
 if(tg==='perdre'&&imc<18.5){tg='stable';notes.push('Ton poids est déjà bas pour ta taille : on ne vise pas de perte.')}
 var bmr=10*w+6.25*r.hc-5*r.age+(r.F?-161:5),maint=bmr*(f<=2?1.375:f<=4?1.55:1.725),kcal=maint,kn='Pour garder un poids stable.';
 if(tg==='perdre'){kcal=Math.max(maint*.85,bmr*1.1);kn='Un peu moins que tes besoins, pour perdre du gras sans perdre de muscle.';notes.push('Rythme raisonnable : 0,5 à 1 % de ton poids par semaine, pas plus.')}
 if(tg==='prendre'){kcal=maint*1.1;kn='Un peu plus que tes besoins, pour construire du muscle.'}
 var pk=g==='force'||g==='muscle'?1.8:g==='terrain'?1.6:1.4;if(tg==='perdre')pk=Math.min(2.2,pk+.3);
 var prot=Math.round(w*pk/5)*5,palms=Math.max(1,Math.min(3,Math.round(prot/3/27)));
 var water=Math.round(w*.035*2)/2;
 return{kcal:Math.round(kcal/50)*50,kn:kn,prot:prot,palms:palms,water:String(water).replace('.',','),notes:notes}}

/* ---------- Résumé à partager ---------- */
function summary(a,r,pr){var d=new Date(),g=(a.gene||[]).filter(function(x){return x!=='non'});
 var L=['BILAN ALPHA du '+('0'+d.getDate()).slice(-2)+'/'+('0'+(d.getMonth()+1)).slice(-2)+'/'+d.getFullYear(),'',
 'Profil : '+r.name,r.code,'',
 (r.F?'Femme':'Homme')+', '+a.age+' ans, '+a.taille+' cm, '+a.poids+' kg',
 'Sport : '+label('sport',a.sport)+(hadSport(a)?' · '+label('type',a.type)+' · '+label('annees',a.annees)+' · '+label('arret',a.arret):''),
 'Musculation : '+label('muscu',a.muscu),
 'Pyramide : '+r.pyr.map(function(x){return x[0]+' '+st(x)}).join(' · '),
 'Journées : '+label('metier',a.metier).toLowerCase()+' · Effort hors travail : '+label('actif',a.actif).toLowerCase(),
 'Charge mentale : '+label('stress',a.stress).toLowerCase()+' · Sommeil : '+label('sommeil',a.sommeil)+', '+label('sommeilq',a.sommeilq).toLowerCase(),
 'Gênes : '+(g.length?g.map(function(x){return label('gene',x)}).join(', '):'aucune')+(a.sante==='1'?' · Avis médical à demander':''),
 'Tests : '+r.rows.map(function(x){return x[1]}).join(' ; '),
 'Objectif : '+label('objectif',a.objectif)+' · '+label('freq',a.freq)+' séance'+(a.freq==='1'?'':'s')+' de '+label('duree',a.duree)+' · '+label('moment',a.moment)+' · '+label('lieu',a.lieu),'',
 'Priorités :'].concat(pr.map(function(p,i){return(i+1)+'. '+p[1]}));
 return L.join('\n')}

/* ---------- Affichage ---------- */
function top(){var y=root.getBoundingClientRect().top+window.scrollY-90;window.scrollTo({top:Math.max(0,y),behavior:'instant'})}
function qHTML(q){var a=S.a;
 if(q.x)return'<div class="b-more"><b>'+q.x+'</b><span>'+q.xd+'</span></div>';
 var h='<fieldset class="b-q" data-q="'+q.k+'"><legend>'+q.l+(q.opt?' <i>facultatif</i>':'')+'</legend>'+(q.h?'<p class="b-help">'+q.h+'</p>':'');
 if(q.n){h+='<label class="b-num"><input type="number" inputmode="decimal" data-k="'+q.k+'" min="'+q.n[0]+'" max="'+q.n[1]+'" value="'+esc(a[q.k]===undefined?'':a[q.k])+'" aria-label="'+esc(q.l)+'"><span>'+q.n[2]+'</span></label>'}
 else{h+='<div class="b-opts'+(q.row?' b-row':'')+'">'+q.o.map(function(o){var on=q.m?(a[q.k]||[]).indexOf(o[0])>=0:a[q.k]===o[0];
  return'<button type="button" class="b-opt" data-k="'+q.k+'" data-v="'+o[0]+'"'+(q.m?' data-m="1"':'')+' aria-pressed="'+on+'"><b>'+o[1]+'</b>'+(o[2]?'<span>'+o[2]+'</span>':'')+'</button>'}).join('')+'</div>'}
 return h+'</fieldset>'}
function renderIntro(){var has=S.done;
 root.innerHTML='<div class="b-intro"><h2 class="a-h2">Un seul bilan, le même pour tout le monde</h2><p class="a-lead">Que tu sortes de dix ans de foot ou que tu n’aies jamais fait de sport, tu réponds aux mêmes questions. À la fin, tu sais où tu en es et quoi faire.</p>'+
 '<ol class="b-steps">'+STEPS.map(function(s){return'<li><b>'+s.t+'</b></li>'}).join('')+'</ol>'+
 '<div class="b-get"><b>Ce que tu obtiens</b><ul><li>Ta pyramide : récupération, alimentation, régularité, performance.</li><li>Ton profil : ta condition physique et ton niveau en salle, séparément.</li><li>Tes 3 priorités, en partant de la base.</li><li>Ta semaine d’entraînement, calée sur ton temps réel et expliquée avec des mots simples.</li><li>Tes repères pour l’alimentation et la récupération.</li><li>Un résumé à partager avec ton coach ou un ami.</li></ul></div>'+
 '<div class="b-nav">'+(has?'<button type="button" class="a-btn a-btn-y" data-act="result">Revoir mon profil</button><button type="button" class="a-btn a-btn-o a-btn-ink" data-act="reset">Refaire le bilan</button>':'<button type="button" class="a-btn a-btn-y" data-act="start">'+(Object.keys(S.a).length?'Reprendre mon bilan':'Commencer')+'</button>')+'</div>'+
 '<p class="b-help">Gratuit, sans inscription. Tes réponses restent sur ton téléphone.</p></div>'}
function renderStep(err){var i=S.step,s=STEPS[i];
 root.innerHTML='<div class="b-prog" role="progressbar" aria-valuemin="1" aria-valuemax="'+N+'" aria-valuenow="'+(i+1)+'"><span>Étape '+(i+1)+' sur '+N+'</span><i><u style="width:'+Math.round((i+1)*100/N)+'%"></u></i></div>'+
 '<h2 class="a-h2">'+s.t+'</h2><p class="a-lead">'+s.d+'</p>'+s.q.filter(visible).map(qHTML).join('')+
 '<p class="b-err" role="alert"'+(err?'':' hidden')+'>Il manque une réponse, ou un chiffre est hors limites. Regarde la question encadrée.</p>'+
 '<div class="b-nav"><button type="button" class="a-btn a-btn-y" data-act="next">'+(i===N-1?'Voir mon profil':'Continuer')+'</button><button type="button" class="a-btn a-btn-o a-btn-ink" data-act="back">Retour</button></div>';
 if(err){var el=root.querySelector('[data-q="'+err+'"]');if(el){el.classList.add('b-bad');el.scrollIntoView({block:'center'})}}}
function bar(l,n){return'<i class="b-bar" aria-hidden="true">'+Array(n+1).join('x').split('').map(function(_,k){return'<u'+(k<l?' class="on"':'')+'></u>'}).join('')+'</i>'}
function renderResult(){var a=S.a,r=compute(a),pr=priorities(a,r),pg=program(a,r),nu=nutrition(a,r),sum=summary(a,r,pr),g=(a.gene||[]);
 var warn=[];
 if(a.sante==='1')warn.push('Tu as signalé un problème de santé : demande l’avis de ton médecin avant de commencer.');
 else if(r.age>=40&&(a.actif==='0'||a.actif==='1'))warn.push('Après 40 ans et une période sans sport régulier, un bilan chez ton médecin avant de reprendre est vivement conseillé.');
 var sleep={1:'Tu dors moins de 6 heures : c’est ta première marge de progrès. Avance ton coucher de 15 minutes chaque semaine, et garde les mêmes horaires le week-end.',2:'Entre 6 et 7 heures, c’est un peu court. Vise 7 heures, avec les écrans en pause 30 minutes avant de dormir.',3:'7 à 8 heures : c’est bien. Garde des horaires réguliers.',4:'Plus de 8 heures : très bien. Si tu restes fatigué malgré tout, parles-en à ton médecin.'}[a.sommeil];
 var doseT=r.base===0?'Ta base est fragile. On commence par elle, et les séances restent courtes et modérées : elles doivent te donner de l’énergie, pas t’en prendre.':r.base===1?'Ta base tient, mais elle peut être plus solide. Tu peux t’entraîner normalement, en consolidant les étages du bas en même temps.':'Ta base est solide : chaque minute d’entraînement va compter.';
 var h='<div class="b-card b-pyr"><p class="a-kick">Ta pyramide</p><div class="b-floors">'+r.pyr.slice().reverse().map(function(x,i){return'<div class="b-fl b-s'+x[2]+'" style="width:'+(55+i*15)+'%"><b>'+x[0]+'</b><span>'+st(x)+'</span></div>'}).join('')+'</div><p>'+doseT+'</p><p class="b-help">Chaque étage se construit sur celui du dessous : récupérer, se nourrir, bouger régulièrement, puis performer.</p></div>';
 h+='<div class="b-card b-profile"><p class="a-kick">Ton profil Alpha</p><h2 class="a-h2">'+r.name+'</h2><p>'+r.desc+'</p>'+
 '<div class="b-axes"><div><span>Condition physique</span><b>'+r.ML[r.M].replace('moteur ','')+'</b>'+bar(r.M,3)+'</div><div><span>Technique en salle</span><b>'+r.TL[r.T].replace(/ (en|de la) salle/,'')+'</b>'+bar(r.T+1,4)+'</div></div>'+
 '<p class="b-code">'+esc(r.code)+'</p></div>';
 if(warn.length)h+='<div class="a-box b-warn"><p><b>Avant de commencer.</b> '+warn.join(' ')+'</p></div>';
 h+='<h3 class="b-h">Tes 3 priorités</h3><ol class="b-prio">'+pr.map(function(p){return'<li><b>'+p[1]+'</b><span>'+p[2]+'</span></li>'}).join('')+'</ol>';
 h+='<h3 class="b-h">Tes repères</h3><div class="b-rows">'+r.rows.map(function(x){return'<div><span><b>'+x[0]+'</b>'+esc(x[1])+'</span><span>'+bar(x[2],5)+'<em>'+LV[x[2]]+'</em></span></div>'}).join('')+'</div>'+
 (r.vma?'<p class="b-help">Ta vitesse maximale estimée sur 3 km correspond à environ '+r.vma.toFixed(1).replace('.',',')+' km/h. Course facile : autour de '+(r.vma*.65).toFixed(1).replace('.',',')+' km/h.</p>':'')+
 '<p class="b-help">Ces repères tiennent compte de ton âge et de ton sexe. Ce n’est pas une note : c’est ton point de départ.</p>';
 h+='<h3 class="b-h">Ta semaine d’entraînement</h3><div class="a-box"><p><b>Tes rendez-vous.</b> '+pg.rdv+'</p></div>'+pg.sessions.map(function(s,i){
  return'<details class="b-sess"'+(i===0?' open':'')+'><summary><span>Séance '+s.num+' · '+s.kind+'</span><b>'+s.title+'</b></summary>'+
  (s.items?'<p class="b-help">'+s.warm+'</p><ul>'+s.items.map(function(e){return'<li><b>'+e.n+'</b><em>'+e.dose+'</em><span>'+e.how+'</span></li>'}).join('')+'</ul>'+(s.circ?'<p><b>'+s.circ+'</b> Le <a href="/outils#outils">chrono des outils</a> peut compter pour toi.</p>':'<p><b>Repos entre les séries :</b> '+s.rest+'.</p>')+'<p>'+s.tip+'</p>'+(s.end?'<p>'+s.end+'</p>':''):'<p>'+s.text+'</p>')+'</details>'}).join('')+
 '<p class="b-mini">'+pg.mini+'</p>'+(pg.notes.length?'<ul class="b-notes">'+pg.notes.map(function(x){return'<li>'+x+'</li>'}).join('')+'</ul>':'')+
 (g.indexOf('non')<0&&g.length?'<p class="b-help">Tu as signalé une gêne : fais chaque exercice dans une amplitude sans douleur, et remplace celui qui fait mal.</p>':'')+
 '<div class="b-phases">'+pg.phases.map(function(p){return'<div><span>'+p[0]+'</span><b>'+p[1]+'</b><em>'+p[2]+'</em></div>'}).join('')+'</div>';
 h+='<h3 class="b-h">Ton assiette</h3><div class="b-stats"><div><b>'+nu.kcal+'</b><span>calories par jour, environ</span></div><div><b>'+nu.prot+' g</b><span>de protéines par jour</span></div><div><b>'+nu.water+' L</b><span>d’eau, plus 0,5 L par heure de sport</span></div></div>'+
 '<p>'+nu.kn+'</p><p><b>Sans balance, avec ta main :</b> à chaque repas, '+nu.palms+' paume'+(nu.palms>1?'s':'')+' de viande, poisson, œufs ou tofu, 1 à 2 poings de riz, pâtes ou pommes de terre, la moitié de l’assiette en légumes, et un pouce d’huile ou de beurre.</p>'+
 (nu.notes.length?'<ul class="b-notes">'+nu.notes.map(function(x){return'<li>'+x+'</li>'}).join('')+'</ul>':'');
 h+='<h3 class="b-h">Ta récupération</h3><p>'+sleep+'</p>'+(a.stress==='2'?'<p>Ta charge mentale est très lourde : c’est elle qui passe en premier. Garde 10 minutes par jour sans écran ni sollicitation, et ne rajoute pas de séance tant que tu es épuisé. Si cela dure, parles-en à ton médecin.</p>':a.stress==='1'?'<p>Ta charge mentale est soutenue : garde des séances courtes, et protège ton sommeil avant tout.</p>':'')+'<p>Les jours sans séance, 20 à 30 minutes de marche aident à récupérer. Des courbatures un ou deux jours après une séance sont normales. Une douleur vive ou qui dure ne l’est pas.</p>';
 h+='<div class="b-card b-share"><h3>Partager mon bilan</h3><p>Envoie ce résumé à ton coach ou à un ami : vous parlerez de la même chose.</p><pre id="b-sum">'+esc(sum)+'</pre><div class="b-nav"><button type="button" class="a-btn a-btn-y" data-act="copy">Copier le résumé</button><a class="a-btn a-btn-o" href="mailto:'+MAIL+'?subject='+encodeURIComponent('Mon Bilan Alpha')+'&body='+encodeURIComponent(sum)+'">Envoyer à Alpha</a></div><p class="b-help" id="b-copied" hidden>Résumé copié.</p></div>';
 h+='<details class="b-lex"><summary>Petit lexique</summary><dl><dt>Répétition</dt><dd>Un mouvement complet, par exemple une pompe.</dd><dt>Série</dt><dd>Un groupe de répétitions faites à la suite. « 3 séries de 10 » : tu fais 10 répétitions, tu te reposes, et tu recommences deux fois.</dd><dt>Repos</dt><dd>Le temps de pause entre deux séries.</dd><dt>Charge</dt><dd>Le poids que tu soulèves : haltère, barre, ou simplement ton corps.</dd><dt>Marge</dt><dd>Le nombre de répétitions que tu aurais encore pu faire à la fin d’une série.</dd><dt>Renforcement</dt><dd>Les exercices qui rendent les muscles plus forts, avec ou sans matériel.</dd><dt>Échauffement</dt><dd>Les quelques minutes d’effort léger qui préparent le corps avant la séance.</dd></dl></details>';
 h+='<div class="b-nav"><a class="a-btn a-btn-y" href="/coaching">Être accompagné par un coach</a><button type="button" class="a-btn a-btn-o a-btn-ink" data-act="edit">Modifier mes réponses</button><button type="button" class="a-btn a-btn-o a-btn-ink" data-act="reset">Refaire le bilan</button></div>'+
 '<p class="b-help">Ce bilan donne des repères généraux. Il ne remplace ni l’avis d’un médecin ni le suivi d’un professionnel qualifié.</p>';
 root.innerHTML=h}
var N=STEPS.length;
function render(err){if(S.done&&S.step===N)renderResult();else if(S.step<0)renderIntro();else renderStep(err)}

/* ---------- Événements ---------- */
root.addEventListener('input',function(e){var k=e.target.getAttribute&&e.target.getAttribute('data-k');if(!k)return;S.a[k]=e.target.value;save()});
root.addEventListener('click',function(e){var b=e.target.closest('[data-k][data-v],[data-act]');if(!b||!root.contains(b))return;
 var act=b.getAttribute('data-act');
 if(!act){var k=b.getAttribute('data-k'),v=b.getAttribute('data-v');
  if(b.getAttribute('data-m')){var arr=(S.a[k]||[]).slice(),ix=arr.indexOf(v);if(v==='non')arr=ix>=0?[]:['non'];else{arr=arr.filter(function(x){return x!=='non'});ix=arr.indexOf(v);if(ix>=0)arr.splice(ix,1);else arr.push(v)}S.a[k]=arr}
  else S.a[k]=v;
  save();var y=window.scrollY;render();window.scrollTo(0,y);return}
 if(act==='start'){S.step=0;S.done=false}
 else if(act==='result'){S.step=N}
 else if(act==='edit'){S.step=0;S.done=false}
 else if(act==='reset'){S={step:0,a:{},done:false}}
 else if(act==='back'){S.step-=1}
 else if(act==='next'){var bad=check(S.step);if(bad){render(bad);return}
  if(S.step===N-1){for(var i=0;i<N-1;i++){var b2=check(i);if(b2){S.step=i;save();render(b2);return}}S.done=true}S.step+=1}
 else if(act==='copy'){var t=document.getElementById('b-sum').textContent,ok=function(){document.getElementById('b-copied').hidden=false};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok,function(){});
  else{var ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');ok()}catch(x){}document.body.removeChild(ta)}return}
 save();render();top()});
if(S.done)S.step=N;else if(S.step>N-1)S.step=-1;
render();
})();
