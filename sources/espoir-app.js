/* Alpha Espoir (15–17 ans) : questions et règles propres au bilan Espoir.
   Ce fichier n'est pas chargé tel quel : espoirbilan.js l'injecte dans le moteur du bilan adulte. */
var inClub=function(a){return a.club==='2'},wasClub=function(a){return !!a.club&&a.club!=='0'};
var LK=' style="color:inherit;font-weight:700"';
function alertBox(ps){return'<div role="alert" style="margin-top:6px;padding:16px 18px;border-radius:14px;background:#12110C;color:#E4E1B8;font-size:16px;line-height:1.5"><b style="display:block;margin-bottom:8px;font:400 22px/1.1 Anton,Impact,sans-serif;text-transform:uppercase;letter-spacing:.02em;color:#F2E415">Mise en garde</b>'+ps.map(function(p,i){return'<span style="display:block'+(i?';margin-top:8px':'')+'">'+p+'</span>'}).join('')+'</div>'}
function boostWarn(a){return(a.compl||[]).indexOf('boost')<0?'':alertBox(['Boosters et brûle-graisses : l’agence sanitaire française (Anses) les déconseille fortement aux adolescents.','Ils sont souvent chargés en caféine et en excitants : le cœur s’emballe, le sommeil se dérègle, l’anxiété monte. Certains produits vendus sur internet sont frelatés et peuvent te rendre positif à un contrôle antidopage.','Ils ne te feront pas progresser : ça, c’est le travail de l’entraînement, de l’assiette et du sommeil. Si tu en prends, ne le cache pas : parles-en à tes parents, à ton entraîneur ou au médecin du club.'])}
function telWarn(a){return a.tel!=='0'?'':alertBox(['Ton téléphone est un outil, mais au lit il devient contre-productif.','La lumière de l’écran retarde l’hormone du sommeil, et chaque vidéo ou notification garde ton cerveau en éveil : tu t’endors plus tard et tu dors moins profondément.','C’est la nuit que tu grandis, que tes muscles se réparent et que ta mémoire enregistre ce que tu as appris. Une nuit raccourcie, c’est de la récupération en moins et plus de risque de blessure.','Pose-le hors de ta chambre, ou 30 minutes avant de dormir. Un réveil classique remplace celui du téléphone.'])}
var STEPS=[
{t:'Toi',d:'Six informations pour calibrer ton bilan. Elles restent sur ton téléphone.',q:[
 {k:'sexe',l:'Tu es',h:'Les repères des tests ne sont pas les mêmes.',o:[['H','Un garçon'],['F','Une fille']]},
 {k:'age',l:'Ton âge',h:'Moins de 15 ans : va sur <a href="/ado"'+LK+'>Alpha Ado</a>. 18 ans ou plus : fais le <a href="/bilan"'+LK+'>bilan Alpha</a>.',o:[['15','15 ans'],['16','16 ans'],['17','17 ans']],row:1},
 {k:'taille',l:'Ta taille',n:[130,215,'cm']},
 {k:'poids',l:'Ton poids',n:[35,150,'kg']},
 {k:'grandi',l:'Combien as-tu grandi depuis un an ?',o:[['0','Moins de 2 cm'],['1','2 à 5 cm'],['2','Plus de 5 cm'],['3','Je ne sais pas']]},
 {k:'gene',l:'As-tu mal pendant ou après le sport ?',h:'Plusieurs réponses possibles.',m:1,o:[['non','Non'],['genou','Aux genoux, sous la rotule'],['talon','Aux talons'],['dos','Au bas du dos'],['autre','Ailleurs']]}]},
{t:'Ton sport',d:'Ton club passe d’abord : les séances Alpha se placent autour de ce que tu fais déjà.',q:[
 {k:'club',l:'Fais-tu du sport en club ?',o:[['2','Oui'],['1','Plus maintenant'],['0','Jamais']]},
 {k:'type',l:'Quel sport, surtout ?',s:wasClub,o:[['terrain','Un sport collectif','Foot, rugby, hand, basket…'],['endurance','Un sport d’endurance','Course, vélo, natation…'],['combat','Un sport de combat'],['raquette','Un sport de raquette'],['gym','Gym, danse, escalade'],['salle','Musculation, CrossFit'],['autre','Un autre sport']]},
 {k:'annees',l:'Depuis combien de temps ?',s:wasClub,o:[['1','Moins de 2 ans'],['2','2 à 5 ans'],['3','Plus de 5 ans']]},
 {k:'entr',l:'Combien d’entraînements de club par semaine ?',s:inClub,o:[['1','1'],['2','2'],['3','3'],['4','4 ou plus']],row:1},
 {k:'matchs',l:'Matchs ou compétitions',s:inClub,o:[['2','Presque chaque week-end'],['1','De temps en temps'],['0','Non']]},
 {k:'saison',l:'Où en es-tu dans ta saison ?',s:inClub,o:[['prep','Préparation'],['saison','En pleine saison'],['coupure','Coupure'],['blesse','Blessé ou en reprise']]},
 {k:'eps',l:'Au lycée, en plus de l’EPS',o:[['0','Rien d’autre'],['unss','UNSS ou association sportive'],['section','Section sportive'],['dispense','Dispensé d’EPS']]},
 {k:'muscu',l:'As-tu déjà fait de la musculation ?',h:'Avec des poids, des machines ou des élastiques.',o:[['0','Jamais'],['1','Seul, avec des vidéos'],['2','Encadré, au club ou en salle'],['3','Régulièrement, depuis plus d’un an']]}]},
{t:'Ta vie aujourd’hui',d:'Réponds selon une semaine normale, pas une semaine idéale.',q:[
 {k:'metier',l:'Tes journées, c’est plutôt',o:[['assis','Assis en cours'],['debout','Debout ou en atelier','Lycée pro, apprentissage'],['physique','Physique','Chantier, travail manuel']]},
 {k:'actif',l:'En dehors du club et de l’EPS, combien de fois par semaine bouges-tu au moins 30 minutes ?',h:'Vélo, course, ballon avec les copains, marche rapide.',o:[['0','Jamais ou presque'],['1','1 fois'],['2','2 à 3 fois'],['3','4 fois ou plus']]},
 {k:'sante',l:'As-tu un problème de cœur, un asthme mal contrôlé, ou un médecin t’a-t-il déconseillé l’effort ?',o:[['0','Non'],['1','Oui']],row:1},
 {k:'arretb',l:'As-tu été arrêté plus de 3 semaines par une blessure depuis un an ?',h:'Si oui, compte depuis le jour de la blessure.',o:[['0','Non'],['3','Oui, il y a plus de 3 mois'],['1','Oui, il y a moins de 3 mois']]}]},
{t:'Ta base',d:'La récupération et l’assiette passent avant l’entraînement : c’est ce qui rend chaque minute de sport utile.',q:[
 {k:'stress',l:'Ta charge en ce moment',h:'Cours, examens, orientation.',o:[['0','Légère','J’ai de la marge'],['1','Soutenue','C’est chargé, mais je tiens'],['2','Très lourde','Je suis à bout']]},
 {k:'sommeil',l:'Combien d’heures dors-tu par nuit en semaine ?',o:[['1','Moins de 7 h'],['2','7 à 8 h'],['3','8 à 9 h'],['4','Plus de 9 h']],row:1},
 {k:'sommeilq',l:'Au réveil, tu te sens',o:[['2','Reposé'],['1','Moyennement reposé'],['0','Fatigué, presque tous les jours']]},
 {k:'tel',l:'Ton téléphone, le soir',o:[['2','Hors de la chambre'],['1','Posé 30 minutes avant de dormir'],['0','Jusqu’à l’endormissement']],w:telWarn},
 {k:'pdj',l:'Prends-tu un petit-déjeuner ?',o:[['2','Tous les jours'],['1','Parfois'],['0','Jamais']],row:1},
 {k:'prot',l:'Viande, poisson, œufs, laitages ou légumes secs à chaque repas ?',o:[['0','Rarement'],['1','À un repas sur deux'],['2','Oui, presque toujours']]},
 {k:'legumes',l:'Fruits et légumes : combien de portions par jour ?',h:'Une portion, c’est une poignée.',o:[['0','0 à 1'],['1','2 à 3'],['2','4 ou plus']],row:1},
 {k:'plats',l:'Fast-food, plats préparés ou livrés',o:[['0','Presque tous les jours'],['1','2 à 3 fois par semaine'],['2','Rarement']]},
 {k:'boissons',l:'Sodas, jus ou boissons énergisantes',o:[['0','Tous les jours'],['1','Quelques fois par semaine'],['2','Rarement']]},
 {k:'compl',l:'Prends-tu des compléments ?',h:'Plusieurs réponses possibles.',m:1,o:[['non','Non'],['prot','Protéines en poudre'],['crea','Créatine'],['boost','Boosters ou brûle-graisses']],w:boostWarn}]},
{t:'Les tests',d:'Échauffe-toi 5 minutes : marche rapide, cercles de bras. Si tu ne peux pas faire les tests maintenant, donne ton estimation. Douleur dans la poitrine, vertige ou essoufflement anormal : tu arrêtes tout de suite.',q:[
 {k:'pompesType',l:'Les pompes : quelle version ?',h:'Mains au sol sous les épaules, corps droit. Tu descends la poitrine près du sol, puis tu remontes.',o:[['p','Classiques, sur les pieds'],['g','Genoux posés au sol']]},
 {k:'pompes',l:'Combien de pompes d’affilée ?',h:'Sans t’arrêter. 0 est une réponse valable.',n:[0,200,'pompes']},
 {k:'planche',l:'La planche : combien de secondes ?',h:'En appui sur les avant-bras et la pointe des pieds, corps droit comme une planche. Tu arrêtes le chrono quand les hanches tombent.',n:[0,900,'secondes']},
 {k:'course',l:'Combien de temps peux-tu courir sans t’arrêter ?',h:'À une allure où tu peux encore parler.',o:[['1','Je ne cours pas'],['2','Moins de 10 minutes'],['3','10 à 20 minutes'],['4','20 à 40 minutes'],['5','Plus de 40 minutes']]},
 {x:'Pour aller plus loin (facultatif)',xd:'Quatre tests de plus, à faire quand tu veux. Ils précisent ton profil sans le changer. Tu peux laisser ces cases vides.'},
 {k:'chaise',l:'La chaise : combien de secondes ?',h:'Dos contre un mur, cuisses à l’horizontale, genoux à angle droit.',n:[0,600,'secondes'],opt:1},
 {k:'saut',l:'Saut en longueur sans élan',h:'Pieds joints derrière une ligne. Mesure jusqu’au talon le plus proche. Meilleur de 3 essais. En centimètres, par exemple 180.',n:[50,350,'cm'],opt:1},
 {k:'soup',l:'Debout, jambes tendues, penche-toi en avant : jusqu’où vont tes doigts ?',o:[['1','Aux genoux'],['2','Aux tibias'],['3','Aux chevilles'],['4','Aux orteils'],['5','Paumes au sol']],opt:1},
 {k:'run3',l:'Ton temps sur 3 km, en minutes',h:'Sur terrain plat, le plus vite possible mais à allure régulière. En minutes, par exemple 16.',n:[8,60,'minutes'],opt:1}]},
{t:'Ton objectif',d:'Un seul objectif principal. On peut tout faire, mais pas tout en même temps.',q:[
 {k:'objectif',l:'Ce que tu veux en priorité',o:[['terrain','Être meilleur dans mon sport'],['force','Devenir plus fort'],['muscle','Prendre du muscle'],['explo','Aller plus vite, sauter plus haut'],['endurance','Tenir plus longtemps'],['forme','Me remettre en forme']]},
 {k:'freq',l:'Combien de séances Alpha par semaine, en plus du club ?',h:'Avec les cours, le club et la fatigue.',o:[['1','1'],['2','2'],['3','3']],row:1},
 {k:'duree',l:'Combien de temps par séance ?',h:'Mieux vaut 15 minutes tenues que 45 minutes annulées.',o:[['15','15 min'],['20','20 min'],['30','30 min'],['45','45 min']],row:1},
 {k:'moment',l:'À quel moment ?',o:[['matin','Avant les cours'],['midi','Le midi'],['soir','Après les cours'],['we','Le week-end'],['var','Ça dépend des jours']]},
 {k:'lieu',l:'Où vas-tu t’entraîner ?',o:[['salle','En salle de sport'],['club','À la salle du club'],['maison','À la maison, avec des haltères ou des élastiques'],['sans','À la maison, sans matériel']]}]}
];
//@@OVERRIDES
/* ---------- Alpha Espoir : profil ---------- */
/* Saut en longueur sans élan : percentiles 20, 40, 60 et 80 d'Eurofit (Tomkinson et al., 2018), par âge et par sexe. */
var JUMP={H:{15:[170,186,200,216],16:[177,194,208,225],17:[182,199,213,230]},F:{15:[135,148,160,173],16:[136,149,160,174],17:[137,151,162,176]}};
function compute(a){
 var age=+a.age,w=+a.poids,hc=+a.taille,F=a.sexe==='F',g=a.gene||[],cl=inClub(a),wc=wasClub(a);
 var lv={},rows=[];
 lv.course=+a.course;rows.push(['Endurance','Course sans arrêt : '+label('course',a.course).toLowerCase(),lv.course]);
 lv.pompes=band(+a.pompes*(a.pompesType==='g'?.5:1),F?[5,12,20,30]:[10,20,30,40]);
 rows.push(['Haut du corps',a.pompes+' pompes'+(a.pompesType==='g'?', genoux au sol':''),lv.pompes]);
 lv.planche=band(+a.planche,[30,60,90,120]);rows.push(['Tronc','Planche : '+a.planche+' secondes',lv.planche]);
 var core=(lv.course+lv.pompes+lv.planche)/3,vma=0,J=JUMP[F?'F':'H'];
 if(a.chaise!==undefined&&a.chaise!==''){lv.chaise=band(+a.chaise,F?[20,35,45,60]:[25,50,75,100]);rows.push(['Jambes','Chaise : '+a.chaise+' secondes',lv.chaise])}
 if(a.saut){lv.saut=band(+a.saut,J[age]||J[16]);rows.push(['Détente','Saut de '+a.saut+' cm',lv.saut])}
 if(a.soup){lv.soup=+a.soup;rows.push(['Souplesse','Doigts '+label('soup',a.soup).toLowerCase(),lv.soup])}
 if(a.run3){var t=+a.run3*60,fr=t<=600?.95:t<=900?.92:t<=1200?.88:.85;vma=3/(t/3600)/fr;lv.run3=band(vma,F?[9.5,11.5,13.5,15]:[11,13,15,17]);rows.push(['Vitesse','3 km en '+a.run3+' minutes',lv.run3])}
 var hist=wc?2*(cl?1:.8)*[0,.5,.75,1][+a.annees||1]:0;
 var m=core+hist*.2+[-.3,0,.2,.4][+a.actif||0]+(cl?[0,0,.1,.2,.3][+a.entr||0]:0);
 var M=m<2.4?1:m<3.5?2:3,T=+a.muscu||0,H=!wc?'none':cl?'now':'past';
 var pain=g.length>0&&g.indexOf('non')<0;
 var grow=a.grandi==='2'||g.indexOf('genou')>=0||g.indexOf('talon')>=0||g.indexOf('dos')>=0;
 var cur=(cl&&a.saison==='blesse')||a.arretb==='1',inj=cur;
 var wk=cl&&a.matchs==='2'&&a.saison==='saison',busy=wk&&+a.entr>=3;
 var name,desc;
 if(T>=2&&M===3){name='Confirmé';desc='Tu as le moteur et la technique. L’enjeu maintenant : doser autour de ta saison et garder un geste propre.'}
 else if(T>=2){name='Pratiquant encadré';desc='Tu connais les gestes. On structure ta progression et on renforce tes points faibles.'}
 else if(M===3){name='Moteur solide, gestes à apprendre';desc='Tu as l’endurance, la coordination et l’habitude de l’effort. Ce qui te manque, c’est la technique des mouvements de force. On apprend les gestes d’abord, on charge ensuite.'}
 else if(M===2&&wc){name='Sportif en construction';desc='Ton sport t’a donné une base. On la complète : gainage, force et gestes propres, sans brûler les étapes.'}
 else if(M===2){name='En route';desc='Tu bouges déjà. On ajoute de la structure et on apprend les gestes de base.'}
 else if(H==='past'){name='Nouveau départ après le club';desc='Tu sais ce que c’est de s’entraîner. L’habitude revient vite, à condition de repartir progressivement.'}
 else{name='Nouveau départ';desc='Tu pars de zéro, et c’est là qu’on progresse le plus vite. Des séances courtes, simples et régulières.'}
 var FAM={terrain:'Terrain',endurance:'Endurance',combat:'Combat',raquette:'Raquette',gym:'Gym',salle:'Salle',autre:'Sportif'};
 var ML=['','moteur à construire','moteur correct','moteur solide'],TL=['gestes à apprendre','débutant en musculation','encadré en musculation','régulier en musculation'];
 var OB={forme:'forme',muscle:'muscle',force:'force',explo:'vitesse et détente',endurance:'endurance',terrain:'sport'};
 var code=[wc?FAM[a.type]||'Sportif':'Sans club',ML[M],TL[T],'objectif '+OB[a.objectif],a.freq+' séance'+(+a.freq>1?'s':'')].join(' · ');
 /* pyramide : 0 fragile, 1 à consolider, 2 solide. Repère de sommeil à cet âge : 8 à 10 heures. */
 var s1=[0,0,1,2,2][+a.sommeil]+(+a.sommeilq)+(2-(+a.stress))-(a.tel==='0'?1:0),e1=s1>=5?2:s1>=3?1:0;
 if(a.stress==='2'||(a.sommeil==='1'&&a.sommeilq==='0'))e1=0;
 var s2=(+a.prot)+(+a.legumes)+(+a.boissons)+(+a.plats)+(+a.pdj),e2=s2>=8?2:s2>=5?1:0;
 var e3=cl?(+a.entr>=2||+a.actif>=2?2:1):a.actif==='0'?(a.metier==='physique'?1:0):a.actif==='1'?1:2;
 var e4=T>=2&&M>=2?2:T>=1||M>=2?1:0;
 var pyr=[['Récupérer','Sommeil et charge',e1],['Se nourrir','Une assiette propre',e2],['Bouger régulièrement','Club et temps pour toi',e3],['Performer','Charges et intensité',e4]];
 var base=e1===0||(e1===1&&e2===0)?0:e1===2&&e2===2?2:1;
 return{age:age,w:w,hc:hc,F:F,lv:lv,rows:rows,M:M,T:T,H:H,name:name,desc:desc,code:code,vma:vma,ML:ML,TL:TL,pyr:pyr,base:base,pain:pain,grow:grow,inj:inj,cur:cur,wk:wk,busy:busy,cl:cl}}

/* ---------- Alpha Espoir : priorités ---------- */
function why(y){return y?'<span style="margin-top:8px;padding-left:12px;border-left:3px solid #807C3A"><em style="font-style:normal;font-weight:700">Pourquoi ?</em> '+y+'</span>':''}
function priorities(a,r){var p=[],c=a.compl||[],fl=function(i){return r.pyr[i][2]<2?(4-i)*100:0};
 function add(i,wt,t,x,y){p.push([wt+fl(i),t,x,i,y])}
 if(a.sante==='1')p.push([1000,'Un avis médical d’abord','Avant de commencer, fais le point avec ton médecin. Montre-lui ce bilan.',void 0,'Il connaît ton dossier : il te dira ce que tu peux faire sans risque, et tu t’entraîneras l’esprit tranquille.']);
 if(r.cur)p.push([950,'Reprendre avec l’accord du kiné ou du médecin','Reprise progressive, sans programme chargé. Demande-leur ce que tu peux faire, et montre-leur ce bilan.',void 0,'Un muscle ou un tendon blessé met du temps à redevenir solide, même quand la douleur a disparu. Reprendre trop fort, trop tôt, c’est le meilleur moyen de se reblesser.']);
 if(a.stress==='2')add(0,90,'Alléger la charge','Avant d’ajouter des séances, protège ton sommeil et garde 10 minutes par jour sans écran. Si l’épuisement dure, parles-en à un adulte de confiance ou à ton médecin.','Ton corps additionne tout : les cours, le sport, les écrans, les soucis. Quand la coupe est pleine, il ne récupère plus : tu ne progresses plus et tu te blesses plus facilement.');
 else if(a.stress==='1')add(0,30,'Garder une soupape','Ta séance est un moment pour toi, pas un devoir de plus. Garde-la courte et régulière.','Bouger fait baisser la pression : après une séance, tu dors mieux et tu as la tête plus claire.');
 if(a.sommeil==='1'||a.sommeil==='2')add(0,a.sommeil==='1'?85:75,'Dormir plus','À ton âge, le repère est de 8 à 10 heures par nuit. Avance ton coucher de 15 minutes chaque semaine.','C’est pendant le sommeil profond que ton corps libère l’hormone de croissance, répare tes muscles et enregistre ce que tu as appris, en cours comme à l’entraînement. Les jeunes sportifs qui dorment moins de 8 heures se blessent plus souvent.');
 if(a.tel==='0')add(0,72,'Poser le téléphone avant de dormir','Ton téléphone est un outil, mais le soir il devient contre-productif. Hors de la chambre, ou posé 30 minutes avant de dormir.','La lumière de l’écran et les notifications retardent ton endormissement. Tu perds du sommeil profond, et c’est la nuit que tu grandis et que tu récupères.');
 if(a.sommeilq==='0')add(0,70,'Mieux dormir','Horaires réguliers, chambre fraîche, pas d’écran au lit. Si la fatigue dure malgré assez de sommeil, vois ton médecin.','Ton corps a une horloge interne. Des horaires réguliers et une chambre fraîche l’aident à s’endormir vite et à dormir profondément : c’est ce sommeil-là qui te répare.');
 if(c.indexOf('boost')>=0)add(1,62,'Laisser les boosters et les brûle-graisses','C’est du marketing : ça ne sert à rien pour progresser, et ça ne remplace ni l’assiette ni le sommeil.','Ils sont souvent chargés en caféine et en excitants : le cœur s’emballe, le sommeil se dérègle. L’agence sanitaire française (Anses) les déconseille fortement aux adolescents.');
 if(a.plats==='0')add(1,60,'Reprendre la main sur tes repas','Au dîner, un plat simple fait maison (riz, œufs ou poulet, légumes) plutôt que du fast-food ou du livré.','Le fast-food et les plats tout prêts apportent beaucoup de gras, de sucre et de sel, et peu de ce qui construit tes muscles et tes os. Quand c’est fait maison, tu sais ce que tu manges.');
 if(a.pdj==='0')add(1,58,'Prendre un petit-déjeuner','Pain ou flocons d’avoine, laitage, fruit.','Après une nuit sans manger, tes réserves sont basses. C’est le petit-déjeuner qui lance ta journée : sans lui, tu tiens moins bien la concentration en cours et l’énergie à l’entraînement.');
 if(a.prot==='0')add(1,50,'Des protéines à chaque repas','Œufs, poisson, viande, laitages ou légumes secs : une portion de la taille de ta paume, à chaque repas.','Les protéines sont les briques de tes muscles : c’est avec elles que ton corps répare et construit après l’effort. Il les utilise mieux réparties sur la journée qu’en une seule fois.');
 else if(a.prot==='1')add(1,30,'Des protéines aussi au petit-déjeuner','C’est souvent le repas qui en manque : œufs, fromage blanc ou yaourt.','Tes muscles se réparent toute la journée : ils utilisent mieux les protéines réparties sur chaque repas que concentrées le soir.');
 if(a.boissons==='0')add(1,45,'De l’eau plutôt que des sodas','Une gourde dans le sac, à boire tout au long de la journée.','Ton corps est fait d’eau à plus de moitié : dès que tu en manques, tu es moins endurant et moins concentré. Les sodas apportent du sucre sans rien construire, et la caféine des boissons énergisantes dérègle ton sommeil : ta récupération en souffre.');
 if(a.legumes==='0')add(1,40,'Plus de fruits et de légumes','La moitié de l’assiette en légumes au dîner, un fruit au petit-déjeuner et au goûter.','Ils apportent les vitamines, les minéraux et les fibres : c’est ce qui aide ton corps à récupérer après l’effort, à moins tomber malade et à bien digérer. Ils sont aussi pleins d’eau.');
 if(!r.cl&&a.actif==='0'&&a.metier!=='physique')add(2,65,'Bouger tous les jours','20 à 30 minutes de marche ou de vélo par jour, en plus des séances.','C’est la base de tout le reste : le cœur, les os et les muscles se renforcent quand on s’en sert tous les jours, et tu récupères plus vite entre deux séances.');
 if(!r.cl&&(a.actif==='0'||a.actif==='1'))add(2,55,'Bloquer tes créneaux','Des rendez-vous fixes dans la semaine, notés dans ton téléphone.','Le corps progresse par répétition. Deux séances chaque semaine pendant trois mois donnent plus qu’un mois à fond suivi d’un arrêt : la régularité passe avant l’intensité.');
 if(r.pain)add(3,85,'Protéger les zones qui font mal','Pas de sauts répétés ni de charges lourdes sur les jambes pour l’instant. Technique, gainage et mobilité d’abord. Si la douleur dure, vois un médecin ou un kiné.','Une douleur est un signal : la zone reçoit plus de contraintes qu’elle ne peut en supporter pour l’instant. À ton âge, c’est souvent l’endroit où le tendon s’attache à l’os, encore en croissance.');
 else if(r.grow)add(3,60,'Grandir sans se blesser','Tu as beaucoup grandi cette année : pas de sauts répétés ni de charges lourdes sur les jambes pour l’instant. Technique, gainage et mobilité d’abord.','Quand tu grandis vite, tes os s’allongent avant que tes muscles et tes tendons suivent : ils tirent plus fort sur leurs attaches. C’est une période où l’on se blesse plus facilement.');
 if(r.T<=1)add(3,70,'Apprendre les gestes de base','Pendant 4 à 6 semaines, des mouvements simples et propres, avec des charges légères.','Les premières semaines, c’est ton cerveau qui progresse : il apprend à faire travailler tes muscles ensemble. Un geste propre appris maintenant te permettra d’en faire plus ensuite sans te blesser.');
 if(r.busy)add(3,66,'Doser autour de ta saison','Avec '+(a.entr==='4'?'4 entraînements ou plus':a.entr+' entraînements')+' et des matchs, 1 à 2 séances Alpha courtes suffisent, jamais la veille d’un match.','Tu progresses quand tu récupères, pas quand tu empiles. Trop de séances en plus du club, et tu arrives fatigué au match : c’est là qu’on se blesse.');
 var adv={course:['Travailler le souffle','De l’endurance facile, 2 fois par semaine : course lente ou vélo, à une allure où tu peux parler.','Un cœur et des poumons entraînés apportent plus d’oxygène à tes muscles : tu tiens plus longtemps et tu récupères plus vite entre deux efforts.'],pompes:['Renforcer le haut du corps','Pompes et tirages, 2 fois par semaine.','Un haut du corps solide protège tes épaules et te rend plus fort dans les contacts, les lancers et les appuis.'],planche:['Renforcer le tronc','La planche et ses variantes, 3 fois par semaine, 5 minutes suffisent.','Le tronc relie le haut et le bas du corps : s’il est solide, ta force passe mieux dans tes gestes et ton dos est protégé.']};
 ['course','pompes','planche'].forEach(function(k){if(r.lv[k]<=2)add(3,55-r.lv[k]*5+(k==='course'&&a.objectif==='endurance'?10:0),adv[k][0],adv[k][1],adv[k][2])});
 if(p.length<3){p.push([10,'Rester régulier','Tes bases sont bonnes. La régularité sur plusieurs mois fera la différence.',void 0,'Le corps s’adapte lentement : ce sont les mois qui construisent, pas les semaines.']);p.push([9,'Progresser un peu chaque semaine','Une répétition, un peu de charge ou quelques minutes de plus.',void 0,'Le corps ne progresse que si tu lui demandes un peu plus que ce qu’il sait déjà faire.']);p.push([8,'Refaire le bilan dans 8 semaines','Dans les mêmes conditions, pour mesurer le chemin parcouru.',void 0,'Voir tes chiffres bouger, c’est ce qui donne envie de continuer.'])}
 var cnt={},res=[];p.sort(function(x,y){return y[0]-x[0]}).forEach(function(x){var k=x[3];if(res.length<3&&(k===undefined||(cnt[k]=(cnt[k]||0)+1)<=2))res.push(x)});
 return res}

/* ---------- Alpha Espoir : programme (le moteur adulte, dosé pour un 15–17 ans) ---------- */
var STRETCH=[['Mollets','Mains au mur, une jambe tendue derrière, talon au sol.'],['Arrière des cuisses','Assis, une jambe tendue : tu te penches vers le pied, dos long.'],['Avant des cuisses et hanches','Un genou au sol, tu avances le bassin, buste droit.'],['Fessiers','Allongé sur le dos, une cheville posée sur le genou opposé : tu ramènes vers toi.'],['Dos','À quatre pattes : dos rond, puis dos creux, lentement, 10 fois.'],['Épaules et poitrine','Avant-bras contre un cadre de porte : tu tournes le buste à l’opposé.']];
function program(a,r){
 var b={},rr={},k,f=+a.freq,d=+a.duree,soft=r.grow||r.cur;
 for(k in a)b[k]=a[k];for(k in r)rr[k]=r[k];
 if(r.wk||r.inj)f=Math.min(f,2);
 if(r.busy)d=Math.min(d,30);
 b.freq=String(f);b.duree=String(d);b.moment='var';
 if(b.lieu==='club')b.lieu='salle';
 if(b.objectif==='explo')b.objectif='terrain';
 if(soft)rr.T=Math.min(r.T,1);
 var pg=programAdult(b,rr),SP='Pour finir : 6 sprints de 20 mètres, retour en marchant.';
 pg.sessions.forEach(function(s,i){
  if(s.tip&&s.tip.indexOf('Charge lourde')===0){s.tip='Charge sérieuse, jamais maximale : garde 2 à 3 répétitions de marge, avec un adulte qualifié à côté de toi.';s.items.forEach(function(e){e.dose=e.dose.replace('4 séries de 5 à 6','4 séries de 6 à 8')})}
  if(soft&&s.end)s.end=s.end.replace(SP,'').trim();
  if(a.objectif==='explo'&&!soft&&r.base>0&&r.M>=2&&i===1&&s.items)s.end=(s.end?s.end+' ':'')+'Pour finir : 3 fois 5 sauts en longueur sans élan, en récupérant complètement entre les séries.'});
 var n=[];
 if(r.cur)n.push('Blessé ou en rééducation : programme léger, à faire valider par ton kiné ou ton médecin avant de commencer.');
 if(r.grow)n.push('Tu grandis vite ou tu as signalé une douleur : pas de sauts répétés ni de charges lourdes sur les jambes. Si la douleur dure, vois un médecin ou un kiné.');
 if(f<+a.freq&&(r.wk||r.cur))n.push(!r.wk?'Pour l’instant, on s’arrête à '+f+' séances par semaine.':'Avec des matchs presque chaque week-end, on s’arrête à '+f+' séance'+(f>1?'s':'')+' Alpha'+(r.busy?' de 30 minutes au plus':'')+' : ton club reste la charge principale.');
 if(r.cl&&a.matchs!=='0')n.push('Jamais de séance Alpha la veille d’un match. Le guide <a href="/espoir/match"'+LK+'>Avant la compétition</a> détaille ta semaine, de J-3 au lendemain.');
 if(r.cl&&(a.saison==='prep'||a.saison==='coupure'))n.push('Préparation ou coupure : c’est le moment de construire.');
 pg.notes=n.concat(pg.notes.map(function(x){return x.replace('Tu passes tes journées assis :','Tu passes tes journées assis en cours :').replace('Lève-toi 2 minutes toutes les heures.','Bouge à chaque pause.').replace('la charge mentale iront','la charge iront')}));
 var D=r.wk?{1:'le mardi ou le mercredi',2:'le lundi et le mercredi'}:a.moment==='we'?{1:'le samedi ou le dimanche',2:'le mercredi et le dimanche',3:'le mercredi, le samedi et le dimanche'}:{1:'le mercredi',2:'le mardi et le vendredi',3:'le lundi, le mercredi et le vendredi'};
 var MO={matin:'avant les cours',midi:'sur la pause de midi',soir:'après les cours, avant le dîner',we:'quand tu n’as ni cours ni match',var:'au moment qui tient le mieux dans ta journée'}[r.wk&&a.moment==='we'?'var':a.moment];
 pg.rdv='Par exemple '+D[f]+', '+MO+'. Note ces créneaux dans ton téléphone, comme un entraînement de club.'+(r.wk?' C’est calé sur un match le samedi : décale d’un jour s’il est le dimanche.':'')+(a.lieu==='maison'||a.lieu==='sans'?' À la maison, personne ne t’attend : prépare ta tenue la veille.':'');
 return pg}

/* ---------- Alpha Espoir : assiette et compléments ---------- */
function nutrition(a,r){var w=r.w,c=a.compl||[],prot=Math.round(w*1.7/5)*5,sup=c.indexOf('prot')>=0||c.indexOf('crea')>=0;
 return{prot:prot,palms:Math.max(1,Math.min(3,Math.round(prot/3/27))),water:String(Math.round((w*.035+(sup?.5:0))*2)/2).replace('.',','),sup:sup,crea:c.indexOf('crea')>=0,boost:c.indexOf('boost')>=0}}

/* ---------- Alpha Espoir : résumé à partager ---------- */
function summary(a,r,pr){var d=new Date(),g=(a.gene||[]).filter(function(x){return x!=='non'}),c=(a.compl||[]).filter(function(x){return x!=='non'}),wc=wasClub(a);
 var L=['BILAN ALPHA ESPOIR du '+('0'+d.getDate()).slice(-2)+'/'+('0'+(d.getMonth()+1)).slice(-2)+'/'+d.getFullYear(),'',
 'Profil : '+r.name,r.code,'',
 (r.F?'Fille':'Garçon')+', '+a.age+' ans, '+a.taille+' cm, '+a.poids+' kg · Croissance sur un an : '+label('grandi',a.grandi).toLowerCase(),
 'Club : '+label('club',a.club)+(wc?' · '+label('type',a.type)+' · '+label('annees',a.annees):'')+(r.cl?' · '+(a.entr==='4'?'4 entraînements ou plus':a.entr+' entraînement'+(a.entr==='1'?'':'s'))+' par semaine · Matchs : '+label('matchs',a.matchs).toLowerCase()+' · '+label('saison',a.saison):''),
 'Lycée : '+label('eps',a.eps)+' · Musculation : '+label('muscu',a.muscu),
 'Pyramide : '+r.pyr.map(function(x){return x[0]+' '+st(x)}).join(' · '),
 'Journées : '+label('metier',a.metier).toLowerCase()+' · Effort hors club : '+label('actif',a.actif).toLowerCase(),
 'Charge : '+label('stress',a.stress).toLowerCase()+' · Sommeil : '+label('sommeil',a.sommeil)+', '+label('sommeilq',a.sommeilq).toLowerCase()+' · Téléphone : '+label('tel',a.tel).toLowerCase(),
 'Douleurs : '+(g.length?g.map(function(x){return label('gene',x)}).join(', '):'aucune')+(label('arretb',a.arretb).indexOf('Oui')===0?' · Arrêt sur blessure '+label('arretb',a.arretb).toLowerCase().replace('oui, ',''):'')+(a.sante==='1'?' · Avis médical à demander':''),
 'Compléments : '+(c.length?c.map(function(x){return label('compl',x)}).join(', '):'aucun'),
 'Tests : '+r.rows.map(function(x){return x[1]}).join(' ; '),
 'Objectif : '+label('objectif',a.objectif)+' · '+a.freq+' séance'+(a.freq==='1'?'':'s')+' de '+label('duree',a.duree)+' · '+label('moment',a.moment)+' · '+label('lieu',a.lieu)].concat((S.c&&(S.c.club||'').trim())?['Nom du club : '+S.c.club.trim()]:[],['','Priorités :'],pr.map(function(p,i){return(i+1)+'. '+p[1]}));
 return L.join('\n')}
function foodText(a){return'Assiette : petit-déjeuner '+label('pdj',a.pdj).toLowerCase()+' · protéines à chaque repas '+label('prot',a.prot).toLowerCase()+' · fruits et légumes '+label('legumes',a.legumes)+' portions par jour · plats préparés '+label('plats',a.plats).toLowerCase()+' · sodas, jus ou boissons énergisantes '+label('boissons',a.boissons).toLowerCase()}

/* ---------- Alpha Espoir : affichage ---------- */
function renderIntro(){var has=S.done;
 root.innerHTML='<div class="b-intro"><h2 class="a-h2">Le bilan des <span style="white-space:nowrap">15–17 ans</span></h2><p class="a-lead">Que tu joues chaque week-end ou que tu n’aies jamais mis les pieds dans un club, tu réponds aux mêmes questions. À la fin, tu sais où tu en es et quoi faire.</p>'+
 '<ol class="b-steps">'+STEPS.map(function(s){return'<li><b>'+s.t+'</b></li>'}).join('')+'</ol>'+
 '<div class="b-get"><b>Ce que tu obtiens</b><ul><li>Ta pyramide : récupération, alimentation, régularité, performance.</li><li>Ton profil : ta condition physique et ta technique, séparément.</li><li>Tes 3 priorités, en partant de la base.</li><li>Ta semaine d’entraînement, calée autour de ton club et de tes matchs.</li><li>Tes repères pour l’assiette, l’eau et le sommeil.</li><li>Une routine d’assouplissements pour les jours sans séance.</li><li>Un résumé à partager avec ton entraîneur.</li></ul></div>'+
 '<div class="b-nav">'+(has?'<button type="button" class="a-btn a-btn-y" data-act="result">Revoir mon profil</button><button type="button" class="a-btn a-btn-o a-btn-ink" data-act="reset">Refaire le bilan</button>':'<button type="button" class="a-btn a-btn-y" data-act="start">'+(Object.keys(S.a).length?'Reprendre mon bilan':'Commencer')+'</button>')+'</div>'+
 '<p class="b-help">Gratuit, sans inscription. Tu le remplis seul, en 8 minutes. Tes réponses restent sur ton téléphone.</p></div>'}
function renderResult(){var a=S.a,r=compute(a),pr=priorities(a,r),pg=program(a,r),nu=nutrition(a,r),sum=summary(a,r,pr);
 var warn=[];
 if(a.sante==='1')warn.push('Tu as signalé un problème de santé : demande l’avis de ton médecin avant de commencer.');
 if(r.cur)warn.push('Tu es blessé ou encore en rééducation : fais valider ce programme par ton kiné ou ton médecin.');
 var sleep={1:'Tu dors moins de 7 heures : c’est ta première marge de progrès. À ton âge, le repère est de 8 à 10 heures. Avance ton coucher de 15 minutes chaque semaine, et garde les mêmes horaires le week-end.',2:'Entre 7 et 8 heures, c’est un peu court pour ton âge. Vise 8 heures au moins, téléphone posé 30 minutes avant de dormir.',3:'8 à 9 heures : c’est bien. Garde des horaires réguliers.',4:'Plus de 9 heures : très bien. Si tu restes fatigué malgré tout, parles-en à ton médecin.'}[a.sommeil];
 var doseT=r.base===0?'Ta base est fragile. On commence par elle, et les séances restent courtes et modérées : elles doivent te donner de l’énergie, pas t’en prendre.':r.base===1?'Ta base tient, mais elle peut être plus solide. Tu peux t’entraîner normalement, en consolidant les étages du bas en même temps.':'Ta base est solide : chaque minute d’entraînement va compter.';
 var h='<div class="b-card b-pyr"><p class="a-kick">Ta pyramide</p><div class="b-floors">'+r.pyr.slice().reverse().map(function(x,i){return'<div class="b-fl b-s'+x[2]+(i>1?' b-base':'')+'" style="width:'+(52+i*16)+'%"><b>'+x[0]+'</b>'+(i>1?'<small>'+x[1]+'</small>':'')+'<span>'+st(x)+'</span></div>'}).join('')+'</div><p class="b-basel">La base porte tout le reste</p><p>'+doseT+'</p><p class="b-help">Chaque étage se construit sur celui du dessous : récupérer, se nourrir, bouger régulièrement, puis performer.</p></div>';
 h+='<div class="b-card b-profile"><p class="a-kick">Ton profil Alpha Espoir</p><h2 class="a-h2">'+r.name+'</h2><p>'+r.desc+'</p>'+
 '<div class="b-axes"><div><span>Condition physique</span><b>'+r.ML[r.M].replace('moteur ','')+'</b>'+bar(r.M,3)+'</div><div><span>Technique de musculation</span><b>'+r.TL[r.T].replace(' en musculation','')+'</b>'+bar(r.T+1,4)+'</div></div>'+
 '<p class="b-code">'+esc(r.code)+'</p></div>';
 if(warn.length)h+='<div class="a-box b-warn"><p><b>Avant de commencer.</b> '+warn.join(' ')+'</p></div>';
 h+='<h3 class="b-h">Tes 3 priorités</h3><ol class="b-prio">'+pr.map(function(p){return'<li><b>'+p[1]+'</b><span>'+p[2]+'</span>'+why(p[4])+'</li>'}).join('')+'</ol>';
 h+='<h3 class="b-h">Tes repères</h3><div class="b-rows">'+r.rows.map(function(x){return'<div><span><b>'+x[0]+'</b>'+esc(x[1])+'</span><span>'+bar(x[2],5)+'<em>'+LV[x[2]]+'</em></span></div>'}).join('')+'</div>'+
 (r.vma?'<p class="b-help">Ta vitesse maximale estimée sur 3 km correspond à environ '+r.vma.toFixed(1).replace('.',',')+' km/h. Course facile : autour de '+(r.vma*.65).toFixed(1).replace('.',',')+' km/h.</p>':'')+
 '<p class="b-help">Le saut est comparé aux jeunes de ton âge et de ton sexe. Les pompes, la chaise et la course gardent pour l’instant les repères de l’adulte. Ce n’est pas une note : c’est ton point de départ.</p>';
 h+='<h3 class="b-h">Ta semaine d’entraînement</h3><div class="a-box"><p><b>Tes rendez-vous.</b> '+pg.rdv+'</p></div>'+pg.sessions.map(function(s,i){
  return'<details class="b-sess"'+(i===0?' open':'')+'><summary><span>Séance '+s.num+' · '+s.kind+'</span><b>'+s.title+'</b></summary>'+
  (s.items?'<p class="b-help">'+s.warm+'</p><ul>'+s.items.map(function(e){return'<li><b>'+e.n+'</b><em>'+e.dose+'</em><span>'+e.how+'</span></li>'}).join('')+'</ul>'+(s.circ?'<p><b>'+s.circ+'</b> Le <a href="/outils#outils">chrono des outils</a> peut compter pour toi.</p>':'<p><b>Repos entre les séries :</b> '+s.rest+'.</p>')+'<p>'+s.tip+'</p>'+(s.end?'<p>'+s.end+'</p>':''):'<p>'+s.text+'</p>')+'</details>'}).join('')+
 '<details class="b-sess"><summary><span>Les jours sans séance · 10 minutes</span><b>Ta routine d’assouplissements</b></summary><p class="b-help">Sans forcer et jamais dans la douleur. Tu tiens chaque position 30 secondes, deux fois, en respirant lentement.'+(r.grow?' Quand tu grandis vite, tes muscles ont besoin de suivre : cette routine compte double.':'')+'</p><ul>'+STRETCH.map(function(e){return'<li><b>'+e[0]+'</b><span>'+e[1]+'</span></li>'}).join('')+'</ul></details>'+
 '<p class="b-mini">'+pg.mini+'</p>'+(pg.notes.length?'<ul class="b-notes">'+pg.notes.map(function(x){return'<li>'+x+'</li>'}).join('')+'</ul>':'')+
 (r.pain?'<p class="b-help">Tu as signalé une douleur : fais chaque exercice dans une amplitude sans douleur, et remplace celui qui fait mal.</p>':'')+
 '<div class="b-phases">'+pg.phases.map(function(p){return'<div><span>'+p[0]+'</span><b>'+p[1]+'</b><em>'+p[2]+'</em></div>'}).join('')+'</div>';
 h+='<h3 class="b-h">Ton assiette</h3><div class="b-stats"><div><b>'+nu.water+' L</b><span>d’eau par jour, plus 0,5 L par heure de sport</span></div><div><b>'+nu.palms+' paume'+(nu.palms>1?'s':'')+'</b><span>de protéines à chaque repas</span></div><div><b>8 à 10 h</b><span>de sommeil par nuit</span></div></div>'+
 '<p>Avant 18 ans, on ne compte pas les calories et on ne fait pas de régime : ton corps grandit encore. On soigne la qualité de l’assiette.</p>'+
 '<p><b>Sans balance, avec ta main :</b> à chaque repas, '+nu.palms+' paume'+(nu.palms>1?'s':'')+' de viande, poisson, œufs ou légumes secs, 1 à 2 poings de riz, pâtes ou pommes de terre, la moitié de l’assiette en légumes, et un pouce d’huile ou de beurre.</p>'+
 '<p>Le midi, c’est la cantine : tes repères portent sur le petit-déjeuner, le goûter et le dîner. Petit-déjeuner : pain ou flocons d’avoine, laitage, fruit, des œufs si tu aimes. Goûter avant l’entraînement : pain, fruit, laitage.</p>'+
 (nu.sup?'<div class="a-box"><p><b>Tes compléments.</b> Protéines en poudre et créatine sont des compléments de récupération, pas de performance : la performance vient de ta discipline aux exercices.</p><p style="margin-top:.6em">L’assiette d’abord : c’est elle qui fait ton équilibre. Ton repère est de '+nu.prot+' g de protéines par jour au total (1,7 g par kilo), assiette comprise. La poudre ne sert qu’à compléter un repas qui en manque.</p><p style="margin-top:.6em">Qui prend un complément boit davantage : ton repère d’eau en tient compte.'+(nu.crea?'</p><p style="margin-top:.6em"><b>Créatine avant 18 ans : ne la prends pas en cachette.</b> Dis-le à tes parents, à ton entraîneur et au médecin du club : c’est en en parlant qu’on t’aide à bien le faire.':'')+'</p></div>':'')+
 (nu.boost?'<div class="a-box b-warn"><p><b>Boosters et brûle-graisses : alerte.</b> C’est du marketing, c’est inutile, et certains contiennent des stimulants. Arrête-les : ton assiette, ton sommeil et ta régularité font le travail.</p></div>':'');
 h+='<h3 class="b-h">Ta récupération</h3><p>'+sleep+'</p>'+(a.stress==='2'?'<p>Ta charge est très lourde en ce moment : c’est elle qui passe en premier. Garde 10 minutes par jour sans écran ni sollicitation, et ne rajoute pas de séance tant que tu es épuisé. Si cela dure, parles-en à un adulte de confiance ou à ton médecin.</p>':a.stress==='1'?'<p>Ta charge est soutenue : garde des séances courtes, et protège ton sommeil avant tout.</p>':'')+'<p>Les jours sans séance, fais ta routine d’assouplissements ou 20 minutes de marche. Des courbatures un ou deux jours après une séance sont normales. Une douleur vive ou qui dure ne l’est pas.</p>';
 var c=S.c||{};
 h+='<div class="b-card b-share"><h3>Envoyer mon bilan à Alpha</h3><p>Laisse ton prénom et ton e-mail : on lit ton bilan et on te répond personnellement.</p>'+
 '<label class="b-f"><span>Ton prénom</span><input type="text" data-c="prenom" autocomplete="given-name" value="'+esc(c.prenom||'')+'"></label>'+
 '<label class="b-f"><span>Ton e-mail</span><input type="email" inputmode="email" data-c="email" autocomplete="email" value="'+esc(c.email||'')+'"></label>'+
 '<label class="b-f"><span>Ton téléphone <i>facultatif</i></span><input type="tel" data-c="tel" autocomplete="tel" value="'+esc(c.tel||'')+'"></label>'+
 '<label class="b-f"><span>Le nom de ton club <i>facultatif</i></span><input type="text" data-c="club" value="'+esc(c.club||'')+'"></label>'+
 '<p class="b-cerr" id="b-cerr" role="alert" hidden>Indique ton prénom et un e-mail valide.</p>'+
 '<div class="b-nav"><button type="button" class="a-btn a-btn-y" data-act="send">Envoyer mon bilan</button><button type="button" class="a-btn a-btn-o" data-act="copy">Copier le résumé</button></div><p class="b-help" id="b-copied" hidden>Résumé copié.</p>'+
 '<p class="b-small">Ton application d’e-mail s’ouvre avec ton bilan déjà écrit : il te reste à appuyer sur Envoyer. Tes coordonnées servent uniquement à te répondre.</p>'+
 '<details class="b-sumd"><summary>Voir le résumé envoyé</summary><pre id="b-sum">'+esc(sum)+'</pre></details></div>';
 h+='<details class="b-lex"><summary>Petit lexique</summary><dl><dt>Répétition</dt><dd>Un mouvement complet, par exemple une pompe.</dd><dt>Série</dt><dd>Un groupe de répétitions faites à la suite. « 3 séries de 10 » : tu fais 10 répétitions, tu te reposes, et tu recommences deux fois.</dd><dt>Repos</dt><dd>Le temps de pause entre deux séries.</dd><dt>Charge</dt><dd>Le poids que tu soulèves : haltère, barre, ou simplement ton corps.</dd><dt>Marge</dt><dd>Le nombre de répétitions que tu aurais encore pu faire à la fin d’une série.</dd><dt>Gainage</dt><dd>Les exercices qui renforcent le tronc, comme la planche.</dd><dt>Échauffement</dt><dd>Les quelques minutes d’effort léger qui préparent le corps avant la séance.</dd></dl></details>';
 h+='<div class="b-nav"><a class="a-btn a-btn-y" href="/espoir">Retour à Alpha Espoir</a><button type="button" class="a-btn a-btn-o a-btn-ink" data-act="edit">Modifier mes réponses</button><button type="button" class="a-btn a-btn-o a-btn-ink" data-act="reset">Refaire le bilan</button></div>'+
 '<p class="b-help">Ce bilan donne des repères généraux. Il ne remplace ni l’avis d’un médecin ni le suivi d’un entraîneur qualifié.</p>';
 root.innerHTML=h}
