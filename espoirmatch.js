// Alpha Espoir : guide « avant la compétition » sur /espoir/match,
// fiche PDF reconstituée depuis pdf/espoir-match.pdf.N (empreinte attendue dans
// pdf/espoir-match.pdf.sha1), et lien depuis /espoir.
const fs=require('fs'),crypto=require('crypto');
const die=m=>{console.error('ESPOIRMATCH',m);process.exit(1)};
const PDF='/docs/Alpha_Espoir_Avant_la_competition.pdf';
const TITLE='Avant la compétition — Alpha Espoir';
const DESC='Alpha Espoir : quoi manger, quoi boire, comment t’entraîner et récupérer, de J-3 au lendemain du match. Guide pour les 15–17 ans, avec la fiche PDF.';
const card=(id,tag,h,sub,li,cls)=>`<article class='m-card${cls?' '+cls:''}'${id?` id='${id}'`:''}>${tag?`<i>${tag}</i>`:''}<h3>${h}</h3>${sub?`<p>${sub}</p>`:''}<ul>${li.map(x=>`<li><b>${x[0]}</b> ${x[1]}</li>`).join('')}</ul></article>`;
const sec=(cls,id,h,kick,body)=>`<section class='a-sec ${cls} m-sec'${id?` id='${id}'`:''}>
<div class='a-wrap m-col'>
<h2 class='a-h2'>${h}</h2>
<p class='a-kick'>${kick}</p>
${body.join('\n')}
</div>
</section>
`;
const bar=(d,w,a,b,on)=>`<div><b>${d}</b><span${on?` class='m-on'`:''} style='width:${w}%'>${a}<small>${b}</small></span></div>`;
const btn=`<a class='a-btn a-btn-y' href='${PDF}' download>Télécharger la fiche PDF</a>`;

const BODY=(`<section class='u-sec t-ink u-espoir-c'>
<div class='a-wrap u-hero'>
<span class='a-tag'>Alpha Espoir · 15–17 ans</span>
<h1 class='u-h1'>Ton match se prépare <span class='a-y'>trois jours avant.</span></h1>
<p class='a-lead'>Voici quoi manger, quoi boire, comment t’entraîner et comment récupérer, jour après jour, de J-3 jusqu’au lendemain du match.</p>
<div class='a-ctas'>${btn}<a class='a-btn a-btn-o' href='/espoir'>Retour à Espoir</a></div>
<nav class='m-jump' aria-label='Dans cette page'><a href='#j3'>J-3</a><a href='#j2'>J-2</a><a href='#j1'>J-1</a><a href='#jour-j'>Jour J</a><a href='#apres'>Après le match</a><a href='#lendemain'>J+1</a></nav>
</div>
</section>
`+sec('t-cream','','Ta semaine de match','En semaine, on parle du dîner : le midi, c’est la cantine.',[
`<div class='m-load'>${bar('J-3',100,'Séance dure','la dernière de la semaine')}${bar('J-2',66,'Séance courte','technique et vitesse')}${bar('J-1',36,'Mise en route','15 à 20 minutes')}${bar('Jour J',100,'Match','l’échauffement de ton club',1)}${bar('J+1',36,'Récupération','20 à 30 min faciles')}<p><b>On charge tôt, on allège avant le match.</b> Plus le match approche, plus la séance raccourcit. Le lendemain, tu bouges léger pour récupérer.</p></div>`,
card('j3','J-3','La dernière séance dure','Trois jours avant, tu peux encore travailler fort. Après, on allège.',[
 ['Dîner.','Complet : viande, poisson ou œufs, un féculent, des légumes. Exemple : poulet ou poisson, riz, courgettes. De l’eau à table.'],
 ['Entraînement.','Dernière séance dure de la semaine, au club ou avec Alpha. Ensuite, plus de travail lourd sur les jambes.'],
 ['Récupération.','Coucher à heure fixe, 8 à 10 heures de sommeil.']]),
card('j2','J-2','Le dîner des féculents','Tu remplis le réservoir et tu protèges ta nuit.',[
 ['Dîner.','Une assiette de pâtes, de riz ou de pommes de terre plus grosse que d’habitude. Exemple : pâtes bolognaise ou pâtes au thon, yaourt, fruit. Pas de fast-food ni de friture.'],
 ['Entraînement.','Séance plus courte : technique, vitesse sur quelques mètres. Pas de séance Alpha pour les jambes.'],
 ['Récupération.','C’est la nuit qui compte le plus : si le trac gâche celle de la veille, c’est elle qui te porte.']]),
card('j1','J-1','Rien de nouveau','La veille, tu ne testes rien : ni plat, ni exercice.',[
 ['Dîner.','Un plat que tu connais, riche en féculents, peu gras, peu épicé. Exemple : riz ou pâtes, blanc de poulet ou omelette, compote. Dîner 2 heures avant le coucher. Pas de boisson énergisante.'],
 ['Entraînement.','Repos, ou 15 à 20 minutes de mise en route : mobilité et quelques accélérations. Pas de musculation.'],
 ['Récupération.','Sac prêt la veille, téléphone posé 30 minutes avant de dormir, coucher à l’heure habituelle.']]),
card('','','L’eau, tous les jours','',[
 ['Dès J-3.','Une gourde dans ton sac, à finir et à remplir au moins une fois dans la journée.'],
 ['Ton repère.','Des urines claires. De l’eau, pas de soda ni de boisson énergisante.']],'m-k')])
+sec('t-khaki','jour-j','Jour J, avant le match','Match en début d’après-midi.',[
card('','Lever','Un vrai petit déjeuner','C’est lui qui lance ta journée de match. Tu le prends tôt.',[
 ['Dans l’assiette.','Pain ou flocons d’avoine, laitage, fruit, des œufs si tu aimes.'],
 ['Eau.','Un grand verre au réveil. Tu remplis ta gourde : elle ne te quitte plus.']]),
card('','H-3','Déjeuner tôt','Trois heures avant le coup d’envoi : vers 11 h pour un match à 14 h.',[
 ['Dans l’assiette.','Féculents, un peu de poulet, de poisson ou d’œufs, peu de gras. Tu sors de table sans être lourd.'],
 ['Eau.','À table, puis par petites gorgées jusqu’au départ.']]),
card('','H-1 h 30','Tu remanges un peu','Une heure et demie avant : juste de quoi tenir jusqu’au bout du match.',[
 ['Collation.','Banane, compote, pain ou barre de céréales.'],
 ['Eau.','Ta gourde est finie avant l’échauffement.']]),
card('','Match','Échauffement et match','Arrive en avance, sac prêt depuis la veille.',[
 ['Échauffement.','Celui de ton club, 15 à 20 minutes.'],
 ['Eau.','Quelques gorgées à chaque pause et à la mi-temps.']])])
+sec('t-ink','apres','Après le match','La récupération commence au coup de sifflet.',[
card('','','Les 30 premières minutes','C’est dans la demi-heure qui suit l’effort que ton corps recharge ses réserves le plus vite. Tu trottines ou tu marches 5 à 10 minutes, puis tu bois et tu manges, avant même la douche.',[
 ['Tu bois.','Une gourde de 50 cl, par gorgées.'],
 ['Des sucres.','Banane, compote, pain, barre de céréales ou jus de fruit.'],
 ['Des protéines.','Lait chocolaté, yaourt à boire, sandwich au poulet, au thon ou au fromage.'],
 ['Exemples.','Lait chocolaté et banane, ou sandwich et compote.'],
 ['En tournoi.','Pareil entre deux matchs, en plus petit.']],'m-y'),
card('','','L’eau et les électrolytes','',[
 ['Jusqu’au coucher.','Tu continues à boire, par petites quantités. Ton repère : des urines claires avant de dormir.'],
 ['Électrolytes, si besoin.','Avec la sueur tu perds du sel. Un repas normalement salé suffit le plus souvent. Forte chaleur, grosse transpiration ou tournoi : une boisson de l’effort, ou la recette maison, un tiers de jus de raisin, deux tiers d’eau, une pincée de sel.'],
 ['Jamais','de boisson énergisante.']]),
card('','','Le dîner qui recharge','',[
 ['Quand.','Deux à trois heures après le match.'],
 ['Dans l’assiette.','Une grosse portion de pâtes, de riz, de semoule ou de pommes de terre. Poulet, poisson, œufs ou lentilles. Légumes, laitage, fruit.'],
 ['Exemple.','Riz, poulet ou omelette, légumes, yaourt, fruit.'],
 ['Ensuite.','Douche, coucher sans écran : c’est la nuit qui répare.']])])
+sec('t-cream','lendemain','Le lendemain','J+1 : tu bouges léger pour récupérer.',[
card('','J+1','Récupération active','',[
 ['Dîner.','Complet, avec de l’eau. C’est aujourd’hui que le corps se reconstruit.'],
 ['Entraînement.','20 à 30 minutes faciles : marche, vélo, mobilité. Pas de séance dure pour les jambes.'],
 ['Récupération.','Une douleur qui dure plus de 2 jours : tu en parles à ton entraîneur, puis au médecin ou au kiné.']]),
card('','','Trois cas particuliers','',[
 ['Match le matin ou le soir.','Même logique : dernier repas 3 heures avant, un peu à manger 1 h 30 avant, de l’eau depuis le lever.'],
 ['Match chaque week-end.','Ta séance dure se place le mardi ou le mercredi pour un match le samedi.'],
 ['Catégories de poids.','Avant 18 ans, pas de régime ni de privation d’eau avant la pesée.']]),
`<p class='a-note'>Ces repères sont généraux. Ils ne remplacent pas l’avis de ton entraîneur ni celui de ton médecin.</p>`,
`<div class='a-ctas'>${btn.replace('a-btn-y','a-btn-o')}</div>`]))
// espaces insécables : « 1 h 30 », « 50 cl », et avant les deux-points
.replace(/(\d) (h|cl|heures|minutes|min)\b/g,'$1\u00a0$2').replace(/h (\d\d)\b/g,'h\u00a0$1').split(' : ').join('\u00a0: ');

module.exports=function(T){
 // 1. La fiche PDF, découpée en morceaux comme les photos.
 const parts=[];
 for(let i=0;fs.existsSync('pdf/espoir-match.pdf.'+i);i++)parts.push(fs.readFileSync('pdf/espoir-match.pdf.'+i));
 const pdf=Buffer.concat(parts);
 if(crypto.createHash('sha1').update(pdf).digest('hex')!==fs.readFileSync('pdf/espoir-match.pdf.sha1','utf8').trim())die('fiche PDF incomplète : '+parts.length+' morceaux, '+pdf.length+' octets');
 fs.mkdirSync('out/docs',{recursive:true});
 fs.writeFileSync('out'+PDF,pdf);

 // 2. La page, sur le gabarit de /espoir (en-tête, bande des univers, pied).
 const E=T['Espoir.html'];
 const a=E.indexOf(`<section class='u-sec `),f=E.indexOf('<footer ');
 if(a<0||f<a)die('gabarit de /espoir introuvable');
 let head=E.slice(0,a);
 const swap=(x,y,n)=>{if(head.split(x).length-1!==n)die('balise introuvable : '+x);head=head.split(x).join(y)};
 swap('Alpha Espoir — s’entraîner à 15–17 ans',TITLE,2);
 swap('Alpha Espoir : force, vitesse et récupération pour les 15–17 ans, avec une charge adaptée à la croissance. Ouverture prochaine.',DESC,2);
 swap('/espoir"','/espoir/match"',2);
 T['EspoirMatch.html']=head+BODY+E.slice(f);
 T['site.css']+='\n'+fs.readFileSync('espoirmatch.css','utf8');

 // 3. Le lien depuis /espoir.
 T['Espoir.html']=E.slice(0,f)+`<section class='a-sec t-cream m-sec'>
<div class='a-wrap m-col'>
<p class='a-kick'>Déjà en ligne</p>
<a class='a-feat' href='/espoir/match'><b>Ton match se prépare trois jours avant.</b><span>Repas, eau, entraînement et récupération, de J-3 jusqu’au lendemain du match.</span><em>Lire le guide</em></a>
</div>
</section>
`+E.slice(f);
 console.log('ESPOIRMATCH ok',pdf.length,'octets,',T['EspoirMatch.html'].length,'caractères');
};
