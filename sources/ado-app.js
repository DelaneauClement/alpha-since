/* Alpha Ado (11–14 ans) : questions et règles propres au bilan Ado.
   Ce fichier n'est pas chargé tel quel : adobilan.js l'injecte dans le moteur du bilan adulte. */
var inClub=function(a){return a.club==='2'},wasClub=function(a){return !!a.club&&a.club!=='0'};
var hurts=function(a){var g=a.gene||[];return g.length>0&&g.indexOf('non')<0};
var LK=' style="color:inherit;font-weight:700"';
function alertBox(ps){return'<div role="alert" style="margin-top:6px;padding:16px 18px;border-radius:14px;background:#12110C;color:#E4E1B8;font-size:16px;line-height:1.5"><b style="display:block;margin-bottom:8px;font:400 22px/1.1 Anton,Impact,sans-serif;text-transform:uppercase;letter-spacing:.02em;color:#F2E415">Mise en garde</b>'+ps.map(function(p,i){return'<span style="display:block'+(i?';margin-top:8px':'')+'">'+p+'</span>'}).join('')+'</div>'}
function ecranWarn(a){return a.ecran!=='0'?'':alertBox(['Ton téléphone et ta console sont des outils, mais au lit ils deviennent contre-productifs.','La lumière de l’écran retarde l’hormone du sommeil, et les jeux, les vidéos et les messages gardent ton cerveau en éveil : tu t’endors plus tard et tu dors moins bien.','C’est la nuit que tu grandis, que tes muscles se réparent et que ta mémoire range ce que tu as appris.','Avec ton parent, choisis où ranger ton téléphone et ta console pour la nuit, hors de ta chambre. Un réveil classique remplace celui du téléphone.'])}
var STEPS=[
{t:'Toi',d:'Quatre informations pour calibrer ton bilan. Elles restent sur ce téléphone.',q:[
 {k:'sexe',l:'Tu es',o:[['H','Un garçon'],['F','Une fille']]},
 {k:'age',l:'Ton âge',h:'Moins de 11 ans : va sur <a href="/kids"'+LK+'>Alpha Kids</a>. 15 ans ou plus : fais le <a href="/espoir/bilan"'+LK+'>bilan Alpha Espoir</a>.',o:[['11','11 ans'],['12','12 ans'],['13','13 ans'],['14','14 ans']],row:1},
 {k:'taille',l:'Ta taille',h:'Ton parent la connaît sûrement.',n:[110,200,'cm']},
 {k:'grandi',l:'Combien as-tu grandi depuis un an ?',h:'Si tes pantalons sont tous devenus trop courts, c’est plus de 5 cm.',o:[['0','Moins de 2 cm'],['1','2 à 5 cm'],['2','Plus de 5 cm'],['3','Je ne sais pas']]}]},
{t:'Ton sport',d:'Ton club passe d’abord : les séances Alpha se placent autour de ce que tu fais déjà.',q:[
 {k:'club',l:'Fais-tu du sport en club ?',o:[['2','Oui'],['1','Plus maintenant'],['0','Jamais']]},
 {k:'type',l:'Quel sport, surtout ?',s:wasClub,o:[['terrain','Un sport collectif','Foot, rugby, hand, basket…'],['endurance','Athlétisme, natation, vélo'],['combat','Un sport de combat'],['raquette','Un sport de raquette'],['gym','Gym, danse, escalade'],['autre','Un autre sport']]},
 {k:'sport2',l:'Fais-tu un deuxième sport ?',s:inClub,o:[['0','Non'],['2','Oui, en club'],['1','Oui, pour le plaisir']]},
 {k:'entr',l:'Combien d’entraînements de club par semaine ?',s:inClub,o:[['1','1'],['2','2'],['3','3'],['4','4 ou plus']],row:1},
 {k:'matchs',l:'Matchs ou compétitions',s:inClub,o:[['2','Presque chaque week-end'],['1','De temps en temps'],['0','Non']]},
 {k:'eps',l:'Au collège, en plus de l’EPS',o:[['0','Rien d’autre'],['unss','Association sportive (UNSS)'],['section','Section sportive'],['dispense','Dispensé d’EPS']]},
 {k:'actif',l:'En dehors du club et de l’EPS, tu bouges',h:'Vélo, ballon avec les copains, trampoline.',o:[['2','Presque tous les jours'],['1','2 à 3 fois par semaine'],['0','Rarement']]}]},
{t:'Ton corps qui grandit',d:'Quand on grandit vite, le corps a besoin d’un peu de temps pour suivre. Les deux dernières questions sont pour ton parent.',q:[
 {k:'gene',l:'As-tu mal pendant ou après le sport ?',h:'Plusieurs réponses possibles.',m:1,o:[['non','Non'],['genou','Aux genoux, sous la rotule'],['talon','Aux talons'],['dos','Au bas du dos'],['autre','Ailleurs']]},
 {k:'geneT',l:'Depuis combien de temps ?',s:hurts,o:[['1','Moins de 2 semaines'],['2','Plus de 2 semaines']]},
 {k:'maladroit',l:'Depuis que tu as grandi, te sens-tu maladroit ?',h:'Tu te cognes, tu trébuches.',o:[['0','Non'],['1','Un peu'],['2','Souvent']],row:1},
 {x:'Pour ton parent',xd:'Les deux questions suivantes sont pour le parent qui t’accompagne.'},
 {k:'sante',l:'Un problème de cœur, un asthme mal contrôlé, ou un médecin a-t-il déconseillé l’effort ?',o:[['0','Non'],['1','Oui']],row:1},
 {k:'arretb',l:'Une blessure a-t-elle imposé plus de 3 semaines d’arrêt depuis un an ?',h:'Si oui, comptez depuis le jour de la blessure.',o:[['0','Non'],['3','Oui, il y a plus de 3 mois'],['1','Oui, il y a moins de 3 mois']]}]},
{t:'Tes journées',d:'Le sommeil, les écrans, l’assiette et l’eau portent tout le reste. Le midi, c’est la cantine : on n’en parle pas ici.',q:[
 {k:'stress',l:'Ta charge en ce moment',h:'Cours, devoirs, brevet en 3e.',o:[['0','Légère','J’ai du temps pour moi'],['1','Soutenue','C’est chargé, mais ça va'],['2','Très lourde','Je n’en peux plus']]},
 {k:'sommeil',l:'Combien d’heures dors-tu par nuit en semaine ?',o:[['1','Moins de 8 h'],['2','8 à 9 h'],['3','9 à 10 h'],['4','Plus de 10 h']],row:1},
 {k:'ecran',l:'Ton téléphone ou ta console, le soir',o:[['2','Hors de la chambre'],['1','Éteint 30 minutes avant de dormir'],['0','Jusqu’à l’endormissement'],['3','Je n’en ai pas']],w:ecranWarn},
 {k:'pdj',l:'Prends-tu un petit-déjeuner ?',o:[['2','Tous les jours'],['1','Parfois'],['0','Jamais']],row:1},
 {k:'gouter',l:'Ton goûter après les cours',o:[['2','Pain, fruit ou laitage'],['1','Gâteaux ou chips'],['0','Rien']]},
 {k:'boissons',l:'Ce que tu bois dans la journée',o:[['2','Surtout de l’eau'],['1','De l’eau et des sodas ou des jus'],['0','Surtout des sodas, des jus ou des boissons énergisantes']]}]},
{t:'Tes tests',d:'Ton parent chronomètre et regarde, c’est tout. Échauffe-toi 5 minutes : marche rapide, cercles de bras, petits sauts. Douleur dans la poitrine, vertige ou essoufflement anormal : tu arrêtes tout de suite. Si un test réveille une douleur aux genoux ou aux talons, tu t’arrêtes et tu passes au suivant.',q:[
 {k:'planche',l:'La planche : combien de secondes ?',h:'En appui sur les avant-bras et la pointe des pieds, corps droit comme une planche. Le chrono s’arrête quand les hanches tombent.',n:[0,600,'secondes']},
 {k:'equilibre',l:'En équilibre sur un pied, yeux fermés : combien de secondes ?',h:'Mains sur les hanches. Le chrono s’arrête quand tu poses l’autre pied ou que tu ouvres les yeux. Fais les deux pieds et garde le moins bon. 60 secondes au plus.',n:[0,60,'secondes']},
 {k:'squat',l:'Le squat complet, talons au sol, bras tendus devant : tu y arrives ?',h:'Pieds écartés comme les épaules, tu descends les fesses le plus bas possible.',o:[['2','Oui, facilement'],['1','Oui, mais mes talons décollent'],['0','Non']]},
 {k:'course',l:'Combien de temps peux-tu courir sans t’arrêter ?',h:'À une allure où tu peux encore parler.',o:[['1','Je ne cours pas'],['2','Moins de 5 minutes'],['3','5 à 10 minutes'],['4','10 à 20 minutes'],['5','Plus de 20 minutes']]},
 {x:'Pour aller plus loin (facultatif)',xd:'Quatre tests de plus, à faire si tu en as envie. Tu peux laisser ces cases vides.'},
 {k:'pompesType',l:'Les pompes : quelle version ?',h:'Mains au sol sous les épaules, corps droit.',o:[['p','Classiques, sur les pieds'],['g','Genoux posés au sol']],opt:1},
 {k:'pompes',l:'Combien de pompes d’affilée ?',h:'Sans t’arrêter. 0 est une réponse valable.',n:[0,100,'pompes'],opt:1},
 {k:'saut',l:'Saut en longueur sans élan',h:'Pieds joints derrière une ligne. Mesure jusqu’au talon le plus proche. Meilleur de 3 essais. En centimètres, par exemple 150.',n:[50,300,'cm'],opt:1},
 {k:'soup',l:'Debout, jambes tendues, penche-toi en avant : jusqu’où vont tes doigts ?',o:[['1','Aux genoux'],['2','Aux tibias'],['3','Aux chevilles'],['4','Aux orteils'],['5','Paumes au sol']],opt:1}]},
{t:'Ce que tu veux',d:'Les séances Alpha sont courtes et se font à la maison, sans aucun poids.',q:[
 {k:'objectif',l:'Ce que tu veux en priorité',o:[['terrain','Être meilleur dans mon sport'],['explo','Courir plus vite, sauter plus haut'],['solide','Être plus solide et moins me blesser'],['eps','Être plus à l’aise en EPS'],['debut','Me mettre au sport']]},
 {k:'freq',l:'Combien de séances Alpha par semaine ?',o:[['1','1'],['2','2']],row:1},
 {k:'duree',l:'Combien de temps par séance ?',h:'Mieux vaut 10 minutes tenues que 20 minutes oubliées.',o:[['10','10 min'],['15','15 min'],['20','20 min']],row:1},
 {k:'avec',l:'Avec qui ?',o:[['seul','Seul'],['parent','Avec un parent'],['copain','Avec un frère, une sœur ou un copain']]},
 {k:'materiel',l:'Avec quoi ?',o:[['rien','Rien'],['petit','Une corde à sauter, un ballon ou un élastique']]}]}
];
//@@OVERRIDES
/* ---------- Alpha Ado : profil ---------- */
function refSleep(age){return age<=12?'9 à 12 heures':'8 à 10 heures'}
function compute(a){
 var age=+a.age,hc=+a.taille,F=a.sexe==='F',g=(a.gene||[]).filter(function(x){return x!=='non'}),cl=inClub(a),wc=wasClub(a);
 var lv={},rows=[];
 lv.planche=band(+a.planche,[20,40,60,90]);rows.push(['Tronc','Planche : '+a.planche+' secondes',lv.planche]);
 lv.equi=band(+a.equilibre,[5,10,20,30]);rows.push(['Équilibre','Sur un pied, yeux fermés : '+a.equilibre+' secondes',lv.equi]);
 lv.squat={0:1,1:2,2:4}[a.squat];rows.push(['Squat complet',label('squat',a.squat),lv.squat]);
 lv.course=+a.course;rows.push(['Souffle','Course sans arrêt : '+label('course',a.course).toLowerCase(),lv.course]);
 if(a.pompes!==undefined&&a.pompes!=='')rows.push(['Pompes',a.pompes+' pompes'+(a.pompesType==='g'?', genoux au sol':'')]);
 if(a.saut)rows.push(['Saut en longueur','Saut de '+a.saut+' cm']);
 if(a.soup)rows.push(['Souplesse','Doigts '+label('soup',a.soup).toLowerCase()]);
 var m=(lv.course+lv.planche+lv.equi)/3+(cl?[0,0,.1,.2,.3][+a.entr||0]:0)+[-.3,0,.3][+a.actif||0];
 var M=m<2.4?1:m<3.5?2:3;
 var pain=g.length>0,longPain=pain&&a.geneT==='2',shortPain=pain&&a.geneT!=='2';
 var grow=a.grandi==='2'||a.maladroit==='2';
 var rehab=a.arretb==='1';
 var busy=cl&&+a.entr>=3&&a.matchs!=='0',mono=cl&&+a.entr>=4&&a.sport2==='0';
 var starter=a.club==='0'&&a.actif==='0';
 var weakBal=+a.equilibre<10||a.squat!=='2';
 var sleepLow=age<=12?+a.sommeil<=2:a.sommeil==='1',screen=a.ecran==='0';
 var name,desc;
 if(starter){name='On se met en route';desc='Tu n’as pas encore trouvé ton sport, et c’est normal. On commence par des défis de 10 minutes.'}
 else if(M===3&&cl){name='Sportif solide';desc='Tu as du souffle et de la tenue. On travaille l’équilibre et les gestes propres pour que ça dure.'}
 else if(M===3){name='Bonne base';desc='Tu bouges bien, même sans club. On ajoute des gestes propres et un peu de régularité.'}
 else if(M===2&&cl){name='Sportif en construction';desc='Ton sport t’a donné une base. On la complète : équilibre, tenue du corps et gestes propres.'}
 else if(M===2){name='En route';desc='Tu bouges déjà. On ajoute des séances courtes et des gestes simples.'}
 else{name='Nouveau départ';desc='On y va petit à petit : des séances courtes, des gestes simples, et tu progresses vite.'}
 if(grow)desc+=' Ton corps a changé de taille, ton cerveau refait ses réglages : c’est normal de te sentir moins adroit pendant quelques mois.';
 var FAM={terrain:'Sport collectif',endurance:'Athlétisme, natation, vélo',combat:'Combat',raquette:'Raquette',gym:'Gym, danse, escalade',autre:'Sportif'};
 var ML=['','souffle à construire','souffle correct','bon souffle'];
 var OB={terrain:'mon sport',explo:'vitesse et détente',solide:'solidité',eps:'EPS',debut:'se mettre au sport'};
 var nf=starter?2:busy?1:+a.freq;
 var code=[wc?FAM[a.type]||'Sportif':'Sans club',ML[M],'objectif '+OB[a.objectif],nf+' séance'+(nf>1?'s':'')].join(' · ');
 /* pyramide : 0 fragile, 1 à consolider, 2 solide */
 var e1=age<=12?[0,0,1,2,2][+a.sommeil]:[0,0,2,2,2][+a.sommeil];
 if(screen)e1=Math.max(0,e1-1);
 if(a.stress==='2')e1=0;
 var s2=(+a.pdj)+(+a.gouter)+(+a.boissons),e2=s2>=5?2:s2>=3?1:0;
 var e3=cl?2:a.actif==='2'?2:a.actif==='1'?1:a.eps==='unss'||a.eps==='section'?1:0;
 var e4=(+a.equilibre>=10?1:0)+(a.squat==='2'?1:0);
 var pyr=[['Récupérer','Sommeil et écrans',e1],['Se nourrir','Petit-déjeuner, goûter, eau',e2],['Bouger régulièrement','Club, EPS et jeux',e3],['Progresser','Équilibre et gestes',e4]];
 var base=e1===0||(e1===1&&e2===0)?0:e1===2&&e2===2?2:1;
 return{age:age,hc:hc,F:F,lv:lv,rows:rows,M:M,ML:ML,name:name,desc:desc,code:code,pyr:pyr,base:base,g:g,pain:pain,longPain:longPain,shortPain:shortPain,grow:grow,rehab:rehab,busy:busy,mono:mono,starter:starter,weakBal:weakBal,sleepLow:sleepLow,screen:screen,cl:cl,stop:longPain}}
function stA(x){return x[0]==='Progresser'&&x[2]===0?'à construire':ST[x[2]]}

/* ---------- Alpha Ado : priorités ---------- */
function why(y){return y?'<span style="margin-top:8px;padding-left:12px;border-left:3px solid #807C3A"><em style="font-style:normal;font-weight:700">Pourquoi ?</em> '+y+'</span>':''}
function priorities(a,r){var p=[],fl=function(i){return r.pyr[i][2]<2?(4-i)*100:0};
 function add(i,wt,t,x,y){p.push([wt+fl(i),t,x,i,y])}
 if(a.sante==='1')p.push([1000,'Un avis médical d’abord','Avant de commencer, ton parent fait le point avec ton médecin et lui montre ce bilan.',void 0,'Il connaît ton dossier : il dira ce que tu peux faire sans risque.']);
 if(r.longPain)p.push([980,'Montrer cette douleur à un médecin','Tu as mal depuis plus de 2 semaines : avant de commencer les séances, ton parent prend rendez-vous. On vérifie, puis on reprend.',void 0,'Une douleur qui dure est un signal : quelque chose reçoit plus de contraintes qu’il ne peut en supporter. Plus c’est vu tôt, plus c’est simple à régler.']);
 else if(r.rehab)p.push([950,'Reprendre avec l’accord du kiné ou du médecin','Ta blessure a moins de 3 mois : tu es encore en rééducation. Demande-leur ce que tu peux faire, et montre-leur ce bilan.',void 0,'Une blessure met du temps à redevenir solide, même quand tu n’as plus mal. Reprendre trop fort, trop tôt, c’est le meilleur moyen de se reblesser.']);
 else if(r.shortPain)p.push([940,'Laisser reposer ce qui fait mal','Pas de sauts ni de course pendant 2 semaines. Si la douleur est encore là après, ton parent prend rendez-vous chez le médecin.',void 0,'À ton âge, la douleur vient souvent de l’endroit où le tendon s’attache à l’os qui grandit. Le repos lui laisse le temps de se calmer.']);
 if(a.stress==='2')add(0,90,'Souffler un peu','Quand c’est trop chargé, le sport reste une récréation, pas un devoir de plus. Parles-en à ton parent.','Ton corps additionne tout : les cours, le sport, les soucis. Quand c’est trop, il ne récupère plus et tu perds l’envie.');
 if(r.sleepLow)add(0,85,'Dormir plus','À ton âge, le repère est de '+refSleep(r.age)+' par nuit. Avance ton coucher de 15 minutes chaque semaine.','C’est pendant que tu dors que ton corps fabrique l’hormone qui te fait grandir, répare tes muscles et range dans ta mémoire ce que tu as appris.');
 if(r.screen)add(0,75,'Les écrans dorment hors de ta chambre','Ton téléphone est un outil, mais le soir il devient contre-productif.','La lumière de l’écran et les notifications retardent ton endormissement. Et c’est la nuit que tu grandis et que tu récupères.');
 if(r.starter)p.push([900,'Trouver une activité qui te plaît','Essaie plusieurs choses : un sport de ballon, la natation, le vélo, la danse, l’escalade. Celle où tu ne vois pas le temps passer, c’est la bonne.',void 0,'Bouger renforce ton cœur, tes muscles et tes os, et c’est à ton âge que les os se construisent le plus. Si tu t’amuses, tu continueras.']);
 else if(!r.cl&&a.actif==='0')add(2,65,'Bouger tous les jours','20 minutes de vélo, de ballon ou de marche rapide par jour.','C’est la base de tout le reste : ton cœur, tes os et tes muscles se renforcent quand tu t’en sers tous les jours.');
 if(a.pdj!=='2')add(1,58,'Prendre un petit-déjeuner','Pain ou flocons d’avoine, laitage, fruit.','Après une nuit sans manger, tes réserves sont basses. C’est lui qui lance ta journée de collège : sans lui, tu te concentres moins bien et tu as moins d’énergie.');
 if(a.gouter!=='2')add(1,50,'Un vrai goûter','Pain, fruit ou laitage après les cours, 1 h 30 avant l’entraînement.','Le déjeuner est loin : ton corps a besoin de carburant pour l’entraînement. Les gâteaux et les chips donnent un coup de fouet qui retombe vite : ils ne te portent pas jusqu’au bout.');
 if(a.boissons!=='2')add(1,45,'De l’eau dans ta gourde','Une gourde dans le sac, à finir et à remplir une fois dans la journée. Pas de boisson énergisante avant 18 ans.','Ton corps est fait d’eau à plus de moitié : dès que tu en manques, tu cours moins longtemps et tu te concentres moins bien. Les sodas apportent du sucre sans rien construire, et les boissons énergisantes sont trop chargées en caféine pour ton âge.');
 if(r.grow)add(3,70,'Retrouver tes réglages','Équilibre, coordination et souplesse d’abord.','Ton corps a changé de taille, et ton cerveau refait ses réglages : c’est normal d’être un peu maladroit. Tes os ont grandi plus vite que tes muscles, qui tirent plus fort sur leurs attaches.');
 if(r.weakBal)add(3,65,'L’équilibre et le squat d’abord','Ces deux gestes ouvrent chacune de tes séances.','Ils apprennent à tes genoux et à tes chevilles à rester dans l’axe : c’est ce qui les protège dans tous les sports.');
 if(r.busy)add(3,66,'Doser autour du club','Avec '+(a.entr==='4'?'4 entraînements ou plus':a.entr+' entraînements')+' et des matchs, une seule séance Alpha de 10 à 15 minutes suffit, jamais la veille d’un match.','Tu progresses quand tu récupères, pas quand tu empiles. Trop de séances en plus du club, et tu arrives fatigué au match : c’est là qu’on se blesse.');
 if(r.lv.planche<=2)add(3,50,'Renforcer le tronc','La planche et ses variantes, quelques secondes de plus chaque semaine.','Le tronc relie le haut et le bas du corps : s’il est solide, tu cours, tu sautes et tu lances mieux, et ton dos est protégé.');
 if(r.lv.course<=2)add(3,48,'Travailler le souffle','En jouant : vélo, ballon, corde à sauter. Tu dois pouvoir parler.','Un cœur et des poumons entraînés apportent plus d’oxygène à tes muscles : tu tiens plus longtemps sans t’arrêter.');
 if(p.length<3){p.push([10,'Rester régulier','Tes bases sont bonnes. C’est la régularité qui fera la différence.',void 0,'Le corps s’adapte lentement : ce sont les mois qui construisent, pas les semaines.']);p.push([9,'Varier les activités','Touche à plusieurs sports.',void 0,'Chaque sport t’apprend des gestes différents : à ton âge, c’est ce qui te fait progresser dans le tien et te protège des blessures d’usure.']);p.push([8,'Refaire le bilan dans 8 semaines','Dans les mêmes conditions, pour voir le chemin parcouru.',void 0,'Voir tes chiffres bouger, c’est ce qui donne envie de continuer.'])}
 var cnt={},res=[];p.sort(function(x,y){return y[0]-x[0]}).forEach(function(x){var k=x[3];if(res.length<3&&(k===undefined||(cnt[k]=(cnt[k]||0)+1)<=2))res.push(x)});
 return res}

/* ---------- Alpha Ado : séances (poids du corps, aucune charge) ---------- */
var STRETCH=[['Mollets','Mains au mur, une jambe tendue derrière, talon au sol.'],['Arrière des cuisses','Assis, une jambe tendue : tu te penches vers le pied, dos long.'],['Avant des cuisses et hanches','Un genou au sol, tu avances le bassin, buste droit.'],['Fessiers','Allongé sur le dos, une cheville posée sur le genou opposé : tu ramènes vers toi.'],['Dos','À quatre pattes : dos rond, puis dos creux, lentement, 10 fois.']];
function program(a,r){
 var f=+a.freq,d=+a.duree,mat=a.materiel==='petit';
 if(r.busy){f=1;d=Math.min(d,15)}
 if(r.starter){f=2;d=10}
 var X={
  equi:['Équilibre sur un pied','Debout sur un pied, mains sur les hanches. Regarde un point devant toi. Trop facile ? Ferme les yeux. Change de pied à mi-temps.'],
  squat:['Squat complet','Pieds écartés comme les épaules, bras tendus devant. Tu descends les fesses le plus bas possible, talons au sol, puis tu remontes. Si tes talons décollent, tiens-toi à un meuble.'],
  fente:['Fentes sur place','Un grand pas en avant. Tu descends le genou arrière vers le sol, buste droit, puis tu remontes. Change de jambe à chaque fois.'],
  pont:['Pont fessier','Allongé sur le dos, pieds au sol. Tu montes les hanches en serrant les fesses, puis tu redescends.'],
  pompe:['Pompes','Mains sous les épaules, corps droit. Trop dur ? Pose les mains sur un canapé, ou les genoux au sol.'],
  superman:['Superman','Allongé sur le ventre, bras devant. Tu décolles les bras et les jambes 2 secondes, puis tu reposes.'],
  planche:['Planche','En appui sur les avant-bras et la pointe des pieds, corps droit, ventre serré.'],
  cote:['Planche sur le côté','Sur le côté, en appui sur un avant-bras, corps droit des épaules aux pieds. Change de côté à mi-temps.'],
  ours:['L’ours','À quatre pattes, genoux décollés du sol de 2 centimètres. Dos plat, tu tiens sans bouger.'],
  ligne:['Marche sur une ligne','Sur une ligne au sol, tu avances en posant le talon juste devant la pointe de l’autre pied. Puis en marche arrière.'],
  avion:['L’avion','Sur un pied, bras écartés. Tu penches le buste en avant en levant l’autre jambe derrière, puis tu reviens. Change de pied à mi-temps.'],
  coord:mat?['Ballon contre un mur','Tu lances et tu rattrapes, une main puis l’autre. Sans ballon : touche ton genou avec la main opposée, de plus en plus vite.']:['Genou et main opposés','Debout, tu touches ton genou gauche avec ta main droite, puis l’inverse, de plus en plus vite.'],
  saut:mat?['Corde à sauter','Petits sauts légers, sur la pointe des pieds. Sans corde : sauts sur place, pieds joints.']:['Sauts sur place','Petits sauts pieds joints, rapides et légers, sur la pointe des pieds.'],
  longue:['Sauts en longueur','Pieds joints, tu sautes le plus loin possible et tu te réceptionnes sans bruit, genoux pliés. Reviens en marchant.','4 sauts'],
  sprint:['Départs rapides','Tu pars le plus vite possible sur 10 mètres, puis tu reviens en marchant.','4 départs']};
 var TP={terrain:[['squat','pompe','longue','planche','avion','sprint'],['fente','superman','saut','cote','ligne','pont']],
  explo:[['longue','squat','sprint','planche','avion','pompe'],['saut','fente','coord','cote','pont','superman']],
  solide:[['squat','planche','pont','pompe','avion','ours'],['fente','cote','superman','ours','equi','ligne']],
  eps:[['saut','squat','pompe','coord','planche','avion'],['sprint','fente','ligne','superman','cote','pont']],
  debut:[['squat','coord','planche','pont','ligne','pompe'],['fente','equi','superman','saut','cote','avion']]}[a.objectif];
 var ban=r.shortPain||r.rehab?['saut','longue','sprint']:r.grow?['saut']:[];
 var k=d<=10?4:5,tours=d>=20?3:2,FILL=['pont','planche','superman','equi','ligne','cote','squat','pompe','ours'];
 function build(i){var pre=r.weakBal?['equi','squat']:r.grow?[i?'ligne':'equi']:[],out=[];
  pre.concat(TP[i],FILL).forEach(function(x){if(out.length<k&&out.indexOf(x)<0&&ban.indexOf(x)<0)out.push(x)});
  return{num:i+1,title:(r.starter?'Défi ':'Séance ')+'AB'[i],kind:d+' minutes, sans matériel'+(mat?' ou presque':''),
   warm:'Échauffement : 2 minutes de marche sur place, de cercles de bras et de petits sauts'+(ban.length>1?' très légers':'')+'.',
   items:out.map(function(x){var e=X[x];return{n:e[0],dose:e[2]||'30 secondes',how:e[1]}}),
   circ:tours+' tours. 30 secondes par exercice, sauf indication, puis 30 secondes de repos. 1 minute entre les tours.',
   tip:r.starter?'Note ton score sur une feuille. La prochaine fois, essaie de faire une répétition ou 5 secondes de plus.':'Tu t’arrêtes en pouvant encore en faire 3. Le geste propre passe avant la vitesse.'}}
 var sessions=[];
 if(!r.stop)for(var i=0;i<f;i++)sessions.push(build(i));
 var n=[];
 if(r.stop)n.push('Tu as mal depuis plus de 2 semaines : pas de séance Alpha tant qu’un médecin ne t’a pas vu. La routine d’assouplissements reste possible si elle ne fait pas mal.');
 if(r.rehab&&!r.stop)n.push('Ta blessure a moins de 3 mois : séances sans sauts ni course, à faire valider par ton kiné ou ton médecin avant de commencer.');
 else if(r.shortPain)n.push('Tu as signalé une douleur : pas de sauts ni de course pendant 2 semaines. Si un exercice fait mal, tu le remplaces par un autre.');
 if(r.grow&&!r.stop)n.push('Tu grandis vite : peu de sauts répétés, et l’équilibre en premier.');
 if(r.busy)n.push('Avec le club et les matchs, une seule séance Alpha de '+d+' minutes suffit. Jamais la veille d’un match.');
 if(r.starter)n.push('On commence par 2 défis de 10 minutes par semaine. Quand c’est devenu facile, tu refais le bilan.');
if(!r.stop){n.push('Aucun poids, aucune charge : ton corps suffit'+(mat?', avec ta corde ou ton ballon':'')+'.');
 n.push({seul:'Seul, c’est plus facile avec une musique que tu aimes.',parent:'Ton parent peut faire la séance avec toi : c’est plus drôle à deux.',copain:'À deux, faites les exercices chacun votre tour : l’un travaille, l’autre compte.'}[a.avec]);
 if(f>1)n.push('Laisse au moins un jour entre tes deux séances.')}
 var rdv=r.busy?'Un jour sans entraînement de club, jamais la veille d’un match.':f>1?'Par exemple le mercredi et le dimanche.':'Par exemple le mercredi ou le dimanche.';
 rdv+=' C’est ta famille qui choisit le créneau : note-le sur le frigo.';
 return{sessions:sessions,notes:n,rdv:rdv,f:f,d:d,
  mini:'Pas le temps ? Fais un seul tour, 5 minutes. L’important est de ne pas casser l’habitude.',
  phases:[['Semaines 1 à 4','Apprendre les gestes','Lentement et proprement, sans chercher la difficulté.'],['Semaines 5 à 8','Un peu plus','Un tour de plus, ou 5 secondes de plus par exercice.'],['Après 8 semaines','Refaire le bilan','Dans les mêmes conditions, pour voir tes progrès.']]}}

/* ---------- Alpha Ado : résumé envoyé par le parent ---------- */
function summary(a,r,pr){var d=new Date(),wc=wasClub(a);
 var L=['BILAN ALPHA ADO du '+('0'+d.getDate()).slice(-2)+'/'+('0'+(d.getMonth()+1)).slice(-2)+'/'+d.getFullYear(),'Rempli par l’ado avec un parent à côté de lui.','',
 'Profil : '+r.name,r.code,'',
 (r.F?'Fille':'Garçon')+', '+a.age+' ans, '+a.taille+' cm · Croissance sur un an : '+label('grandi',a.grandi).toLowerCase()+' · Maladresse : '+label('maladroit',a.maladroit).toLowerCase(),
 'Club : '+label('club',a.club)+(wc?' · '+label('type',a.type):'')+(r.cl?' · '+(a.entr==='4'?'4 entraînements ou plus':a.entr+' entraînement'+(a.entr==='1'?'':'s'))+' par semaine · Matchs : '+label('matchs',a.matchs).toLowerCase()+' · Deuxième sport : '+label('sport2',a.sport2).toLowerCase():''),
 'Collège : '+label('eps',a.eps)+' · En dehors : '+label('actif',a.actif).toLowerCase(),
 'Pyramide : '+r.pyr.map(function(x){return x[0]+' '+stA(x)}).join(' · '),
 'Douleurs : '+(r.pain?r.g.map(function(x){return label('gene',x)}).join(', ')+' · '+label('geneT',a.geneT).toLowerCase():'aucune')+(label('arretb',a.arretb).indexOf('Oui')===0?' · Arrêt sur blessure '+label('arretb',a.arretb).toLowerCase().replace('oui, ',''):'')+(a.sante==='1'?' · Avis médical à demander':''),
 'Journées : charge '+label('stress',a.stress).toLowerCase()+' · Sommeil : '+label('sommeil',a.sommeil)+' · Écrans le soir : '+label('ecran',a.ecran).toLowerCase(),
 'Tests : '+r.rows.map(function(x){return x[0]==='Squat complet'?'Squat complet : '+x[1].toLowerCase():x[1]}).join(' ; '),
 'Objectif : '+label('objectif',a.objectif)+' · demandé : '+a.freq+' séance'+(a.freq==='1'?'':'s')+' de '+label('duree',a.duree)+' · '+label('avec',a.avec)+' · Matériel : '+label('materiel',a.materiel).toLowerCase()].concat((S.c&&(S.c.club||'').trim())?['Nom du club : '+S.c.club.trim()]:[],['','Priorités :'],pr.map(function(p,i){return(i+1)+'. '+p[1]}));
 return L.join('\n')}
function foodText(a){return'Assiette : petit-déjeuner '+label('pdj',a.pdj).toLowerCase()+' · goûter : '+label('gouter',a.gouter).toLowerCase()+' · boissons : '+label('boissons',a.boissons).toLowerCase()}
function progText(pg){return pg.sessions.length?pg.sessions.map(function(s){return s.title+' ('+s.kind+')\n'+s.items.map(function(e){return'- '+e.n+' : '+e.dose}).join('\n')+'\n'+s.circ}).join('\n\n'):'Pas de séance pour l’instant : avis médical d’abord.'}

/* ---------- Alpha Ado : affichage ---------- */
function renderIntro(){var has=S.done,ok=(S.a.parent||[]).length>0,begun=Object.keys(S.a).some(function(k){return k!=='parent'});
 root.innerHTML='<div class="b-intro"><h2 class="a-h2">Le bilan des <span style="white-space:nowrap">11–14 ans</span></h2><p class="a-lead">Tu réponds toi-même, avec un parent à côté de toi. À la fin, tu sais où tu en es et quoi faire, et ton parent a ses repères.</p>'+
 '<ol class="b-steps">'+STEPS.map(function(s){return'<li><b>'+s.t+'</b></li>'}).join('')+'</ol>'+
 '<div class="b-get"><b>Ce que tu obtiens</b><ul><li>Ta pyramide : sommeil, assiette, activité, gestes.</li><li>Ton profil et tes 3 priorités.</li><li>Tes séances : 10 à 20 minutes, à la maison, sans aucun poids.</li><li>Une routine d’assouplissements pour les jours sans séance.</li><li>Une partie pour ton parent : ses repères et les signes à surveiller.</li></ul></div>'+
 (has?'':'<fieldset class="b-q"><legend>Avant de commencer</legend><div class="b-opts"><button type="button" class="b-opt" data-k="parent" data-v="1" data-m="1" aria-pressed="'+ok+'"><b>Un parent est avec moi</b><span>Il est d’accord pour qu’on fasse ce bilan ensemble.</span></button></div></fieldset>')+
 '<div class="b-nav">'+(has?'<button type="button" class="a-btn a-btn-y" data-act="result">Revoir mon profil</button><button type="button" class="a-btn a-btn-o a-btn-ink" data-act="reset">Refaire le bilan</button>':ok?'<button type="button" class="a-btn a-btn-y" data-act="start">'+(begun?'Reprendre mon bilan':'Commencer')+'</button>':'')+'</div>'+
 (has||ok?'':'<p class="b-help">Appuie sur « Un parent est avec moi » pour commencer.</p>')+
 '<p class="b-help">Gratuit, sans inscription, 8 à 10 minutes avec les tests. Les réponses restent sur ce téléphone.</p></div>'}
function renderResult(){var a=S.a,r=compute(a),pr=priorities(a,r),pg=program(a,r),sum=summary(a,r,pr);
 var warn=[];
 if(a.sante==='1')warn.push('Un problème de santé a été signalé : demandez l’avis du médecin avant de commencer.');
 if(r.longPain)warn.push('Une douleur dure depuis plus de 2 semaines : pas de séance tant qu’un médecin n’a pas vu votre enfant. Le plus souvent, ce sont des douleurs de croissance qui se soignent bien, mais il faut les faire vérifier.');
 else if(r.rehab)warn.push('La blessure a moins de 3 mois : faites valider ces séances par le kiné ou le médecin.');
 var sleepT=r.sleepLow?'Tu dors moins que le repère de ton âge, qui est de '+refSleep(r.age)+' par nuit. C’est ta première marge de progrès : avance ton coucher de 15 minutes chaque semaine.':'Ton sommeil est dans le repère de ton âge : '+refSleep(r.age)+' par nuit. Garde les mêmes horaires le week-end.';
 var doseT=r.base===0?'Ta base est fragile. On commence par elle : les séances restent courtes, elles doivent te donner de l’énergie, pas t’en prendre.':r.base===1?'Ta base tient, mais elle peut être plus solide. Tu peux faire tes séances en renforçant les étages du bas en même temps.':'Ta base est solide : chaque minute de sport va compter.';
 var h='<h3 class="b-h">Pour toi</h3><div class="b-card b-pyr"><p class="a-kick">Ta pyramide</p><div class="b-floors">'+r.pyr.slice().reverse().map(function(x,i){return'<div class="b-fl b-s'+x[2]+(i>1?' b-base':'')+'" style="width:'+(52+i*16)+'%"><b>'+x[0]+'</b>'+(i>1?'<small>'+x[1]+'</small>':'')+'<span>'+stA(x)+'</span></div>'}).join('')+'</div><p class="b-basel">La base porte tout le reste</p><p>'+doseT+'</p><p class="b-help">Chaque étage se construit sur celui du dessous : récupérer, se nourrir, bouger régulièrement, puis progresser.</p></div>';
 h+='<div class="b-card b-profile"><p class="a-kick">Ton profil Alpha Ado</p><h2 class="a-h2">'+r.name+'</h2><p>'+r.desc+'</p>'+
 '<div class="b-axes"><div><span>Souffle et tenue</span><b>'+r.ML[r.M]+'</b>'+bar(r.M,3)+'</div><div><span>Équilibre et gestes</span><b>'+['à construire','à consolider','solide'][r.pyr[3][2]]+'</b>'+bar(r.pyr[3][2]+1,3)+'</div></div>'+
 '<p class="b-code">'+esc(r.code)+'</p></div>';
 if(warn.length)h+='<div class="a-box b-warn"><p><b>Pour ton parent, avant de commencer.</b> '+warn.join(' ')+'</p></div>';
 h+='<h3 class="b-h">Tes 3 priorités</h3><ol class="b-prio">'+pr.map(function(p){return'<li><b>'+p[1]+'</b><span>'+p[2]+'</span>'+why(p[4])+'</li>'}).join('')+'</ol>';
 h+='<h3 class="b-h">Tes repères</h3><div class="b-rows">'+r.rows.map(function(x){return'<div><span><b>'+x[0]+'</b>'+esc(x[1])+'</span><span>'+(x[2]?bar(x[2],5)+'<em>'+LV[x[2]]+'</em>':'<em>Ton point de départ</em>')+'</span></div>'}).join('')+'</div>'+
 '<p class="b-help">Ce n’est pas une note, et on ne te compare à personne : c’est ton point de départ. Tu referas les mêmes tests dans 8 semaines.</p>';
 h+='<h3 class="b-h">Ta semaine</h3>'+(pg.sessions.length?'<div class="a-box"><p><b>Tes rendez-vous.</b> '+pg.rdv+'</p></div>':'')+pg.sessions.map(function(s,i){
  return'<details class="b-sess"'+(i===0?' open':'')+'><summary><span>'+s.kind+'</span><b>'+s.title+'</b></summary><p class="b-help">'+s.warm+'</p><ul>'+s.items.map(function(e){return'<li><b>'+e.n+'</b><em>'+e.dose+'</em><span>'+e.how+'</span></li>'}).join('')+'</ul><p><b>'+s.circ+'</b> Le <a href="/outils#outils">chrono des outils</a> peut compter pour toi.</p><p>'+s.tip+'</p></details>'}).join('')+
 '<details class="b-sess"'+(pg.sessions.length?'':' open')+'><summary><span>Les jours sans séance · 5 minutes</span><b>Ta routine d’assouplissements</b></summary><p class="b-help">Sans forcer et jamais dans la douleur. Tu tiens chaque position 20 secondes, deux fois, en respirant lentement.'+(r.grow?' Quand tu grandis vite, tes muscles ont besoin de suivre : cette routine compte double.':'')+'</p><ul>'+STRETCH.map(function(e){return'<li><b>'+e[0]+'</b><span>'+e[1]+'</span></li>'}).join('')+'</ul></details>'+
 (pg.sessions.length?'<p class="b-mini">'+pg.mini+'</p>':'')+'<ul class="b-notes">'+pg.notes.map(function(x){return'<li>'+x+'</li>'}).join('')+'</ul>'+
 (pg.sessions.length?'<div class="b-phases">'+pg.phases.map(function(p){return'<div><span>'+p[0]+'</span><b>'+p[1]+'</b><em>'+p[2]+'</em></div>'}).join('')+'</div>':'');
 h+='<h3 class="b-h">Ton assiette et ton sommeil</h3><div class="b-stats"><div><b>'+refSleep(r.age).replace(' heures',' h')+'</b><span>de sommeil par nuit, le repère de ton âge</span></div><div><b>1 gourde</b><span>d’eau dans le sac, à finir et à remplir une fois dans la journée</span></div><div><b>1 h 30</b><span>entre ton goûter et l’entraînement</span></div></div>'+
 '<p>'+sleepT+'</p>'+
 '<p>Le midi, c’est la cantine : tes repères portent sur le petit-déjeuner, le goûter et le dîner.</p>'+
 '<p><b>Petit-déjeuner :</b> pain ou flocons d’avoine, laitage, fruit, des œufs si tu aimes. <b>Goûter :</b> pain, fruit ou laitage. <b>Dîner :</b> viande, poisson ou œufs, un féculent, des légumes, de l’eau.</p>'+
 '<p>De l’eau plutôt que des sodas. Pas de boisson énergisante avant 18 ans.</p>';
 var P=['<p><b>Le sommeil.</b> Repère à cet âge : '+refSleep(r.age)+' par nuit.'+(r.sleepLow?' Votre enfant est en dessous : c’est sa première marge de progrès.':'')+' Le téléphone et la console dorment hors de la chambre : c’est un outil, mais le soir il devient contre-productif.</p>'];
 P.push('<p style="margin-top:.6em"><b>Les douleurs.</b> '+(r.shortPain?'Une douleur a été signalée, depuis moins de 2 semaines : les séances sont sans sauts ni course. ':r.pain?'':'Aucune douleur signalée aujourd’hui. ')+'Une douleur qui dure plus de 2 semaines, qui fait boiter ou qui réveille la nuit : rendez-vous chez le médecin.</p>');
 if(r.grow)P.push('<p style="margin-top:.6em"><b>La croissance.</b> Après une poussée, la maladresse et les raideurs sont normales pendant quelques mois. L’équilibre et les assouplissements aident le corps à retrouver ses réglages.</p>');
 if(r.mono)P.push('<p style="margin-top:.6em"><b>Un seul sport, quatre entraînements ou plus.</b> À cet âge, une deuxième activité pour le plaisir protège des blessures et fait progresser dans le sport principal.</p>');
 if(r.busy)P.push('<p style="margin-top:.6em"><b>La charge.</b> Avec le club et les matchs, une seule séance Alpha courte suffit. Un jour complet sans sport dans la semaine.</p>');
 P.push('<p style="margin-top:.6em"><b>Votre rôle.</b> Chronométrer et encourager. Ne pas corriger chaque geste, ne pas comparer. Aucune remarque sur le poids ou le corps : à cet âge, on ne parle ni de calories ni de régime.</p>');
 h+='<h3 class="b-h">Pour ton parent</h3><div class="a-box">'+P.join('')+'</div>';
 var c=S.c||{};
 h+='<div class="b-card b-share"><h3>Pour ton parent : envoyer le bilan à Alpha</h3><p>C’est le parent qui envoie, avec son e-mail. On lit le bilan et on lui répond personnellement.</p>'+
 '<label class="b-f"><span>Le prénom de l’ado</span><input type="text" data-c="prenom" autocomplete="off" value="'+esc(c.prenom||'')+'"></label>'+
 '<label class="b-f"><span>L’e-mail du parent</span><input type="email" inputmode="email" data-c="email" autocomplete="email" value="'+esc(c.email||'')+'"></label>'+
 '<label class="b-f"><span>Le nom du club <i>facultatif</i></span><input type="text" data-c="club" value="'+esc(c.club||'')+'"></label>'+
 '<p class="b-cerr" id="b-cerr" role="alert" hidden>Indiquez le prénom et un e-mail valide.</p>'+
 '<div class="b-nav"><button type="button" class="a-btn a-btn-y" data-act="send">Envoyer le bilan</button><button type="button" class="a-btn a-btn-o" data-act="copy">Copier le résumé</button></div><p class="b-help" id="b-copied" hidden>Résumé copié.</p>'+
 '<p class="b-small">L’application d’e-mail du parent s’ouvre avec le bilan déjà écrit : il reste à appuyer sur Envoyer. En l’envoyant, le parent donne son accord pour qu’Alpha lise ce bilan et lui réponde. Ni e-mail ni téléphone de l’ado ne sont demandés.</p>'+
 '<details class="b-sumd"><summary>Voir le résumé envoyé</summary><pre id="b-sum">'+esc(sum)+'</pre></details></div>';
 h+='<details class="b-lex"><summary>Petit lexique</summary><dl><dt>Tour</dt><dd>Tous les exercices de la séance faits une fois, à la suite.</dd><dt>Répétition</dt><dd>Un mouvement complet, par exemple un squat.</dd><dt>Gainage</dt><dd>Les exercices qui renforcent le ventre et le dos, comme la planche.</dd><dt>Échauffement</dt><dd>Les quelques minutes d’effort léger qui préparent le corps avant la séance.</dd></dl></details>';
 h+='<div class="b-nav"><a class="a-btn a-btn-y" href="/ado">Retour à Alpha Ado</a><button type="button" class="a-btn a-btn-o a-btn-ink" data-act="edit">Modifier mes réponses</button><button type="button" class="a-btn a-btn-o a-btn-ink" data-act="reset">Refaire le bilan</button></div>'+
 '<p class="b-help">Ce bilan donne des repères généraux. Il ne remplace ni l’avis d’un médecin ni le suivi d’un entraîneur qualifié.</p>';
 root.innerHTML=h}
