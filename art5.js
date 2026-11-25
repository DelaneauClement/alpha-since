// Série Hyrox du mercredi (2, 9, 16 et 23 décembre 2026) — validée par Clément le 25 novembre 2026.
// Le mot HYROX ne sert qu'à décrire l'épreuve : ni logo, ni nom « Alpha Hyrox ».
const R=(a,b)=>'<div role="row" class="a-tr"><span role="cell">'+a+'</span><span role="cell">'+b+'</span></div>';
const R3=(a,b,c,th)=>'<div role="row" class="a-tr a-tr3'+(th?' a-th':'')+'"><span role="'+(th?'columnheader':'cell')+'">'+a+'</span><span role="'+(th?'columnheader':'cell')+'">'+b+'</span><span role="'+(th?'columnheader':'cell')+'">'+c+'</span></div>';
const T=(label,head,rows)=>'<div class="a-table" role="table" aria-label="'+label+'">'+(head?'<div role="row" class="a-tr a-th"><span role="columnheader">'+head[0]+'</span><span role="columnheader">'+head[1]+'</span></div>':'')+rows.map(r=>R(r[0],r[1])).join('')+'</div>';
const T3=(label,head,rows)=>'<div class="a-table" role="table" aria-label="'+label+'">'+R3(head[0],head[1],head[2],true)+rows.map(r=>R3(r[0],r[1],r[2])).join('')+'</div>';
const REGLES='Règlements HYROX Doubles 2026/27 et Singles 2025/26 (format, ordre des ateliers, charges, règles du duo, âge minimum).';

module.exports=[
{slug:'hyrox-c-est-quoi',date:'2026-12-02T20:00:00+01:00',cat:'Hyrox',read:6,
title:'Hyrox : c’est quoi, et pourquoi s’y mettre ?',
desc:'L’Hyrox mélange course à pied et exercices simples : pousser, tirer, porter. Le format expliqué en 2 minutes, et 5 bonnes raisons de te lancer.',
lead:'Courir, pousser, tirer, porter. Si tu sais faire ça, tu sais faire un Hyrox. Pas de figure à apprendre, pas de barre à maîtriser au-dessus de la tête : juste toi, 8 kilomètres et 8 ateliers. Voilà pourquoi ce sport remplit les salles.',
body:`<h3>Le format en 2 minutes</h3>
<p>Une course Hyrox, c’est toujours la même chose : tu cours 1 kilomètre, tu fais un atelier, et tu recommences 8 fois. Les ateliers arrivent toujours dans le même ordre.</p>
${T('Les 8 ateliers',['Atelier','Ce que tu fais'],[
 ['1. SkiErg','1 000 m sur une machine qui imite le ski de fond'],
 ['2. Poussée de traîneau','Tu pousses un traîneau lesté sur 50 m'],
 ['3. Tirage de traîneau','Tu le ramènes à la corde sur 50 m'],
 ['4. Burpees sautés','80 m en enchaînant burpee et saut en longueur'],
 ['5. Rameur','1 000 m'],
 ['6. Marche du fermier','200 m avec un poids dans chaque main'],
 ['7. Fentes','100 m de fentes marchées, un sac sur les épaules'],
 ['8. Wall balls','100 lancers de ballon contre une cible']])}
<p>Au total : 8 kilomètres de course et 8 ateliers. Un participant met en moyenne autour d’une heure et demie.</p>

<h3>Aucun geste technique à apprendre</h3>
<p>C’est la grande différence avec d’autres sports de salle. Ici, pas de gymnastique, pas d’haltérophilie, pas de mouvement qui demande des mois d’apprentissage. Tu pousses, tu tires, tu portes, tu cours : des gestes que ton corps connaît depuis toujours.</p>
<p>Ça ne veut pas dire que c’est facile. C’est long, et les jambes brûlent. Mais la difficulté vient de l’effort, pas de la technique. Tu peux donc t’y mettre sans expérience particulière.</p>

<h3>5 raisons de t’y mettre</h3>
<ul>
<li><b>Tu as un objectif daté.</b> « Faire du sport », ça ne tient pas longtemps. « Finir mon Hyrox le 14 mars », ça te sort du canapé un mardi soir de pluie.</li>
<li><b>L’épreuve est la même partout.</b> Mêmes distances, mêmes ateliers, à Paris comme ailleurs. Tu peux comparer ton temps d’une course à l’autre et voir tes progrès noir sur blanc.</li>
<li><b>Tu travailles tout.</b> Le cœur, les jambes, le dos, les bras, le gainage. C’est une préparation physique complète, déguisée en défi.</li>
<li><b>Il y a une catégorie pour toi.</b> Seul, en duo ou en relais, avec des charges adaptées pour les femmes et les hommes, et un classement par tranche d’âge. On peut courir dès 16 ans.</li>
<li><b>L’ambiance porte.</b> On estime à environ 150 000 le nombre de pratiquants en France. Sur une course, tout le monde souffre en même temps et tout le monde s’encourage.</li>
</ul>

<h3>Ce qu’il faut savoir avant de t’inscrire</h3>
<p>Sois honnête avec toi sur un point : l’Hyrox, c’est d’abord de la course. 8 kilomètres, coupés en morceaux, avec les jambes de plus en plus lourdes. Si tu ne cours jamais, commence par là.</p>
<p>Et comme pour tout effort long et intense : si tu reprends après une longue pause, si tu as plus de 40 ans sans activité régulière ou un souci de santé, passe voir ton médecin avant de te lancer.</p>

<h3>Par où commencer</h3>
<p>Pas besoin de tout chambouler. Deux sorties de course tranquilles par semaine et une séance de renforcement, pendant un mois, et tu sauras déjà si ça te plaît. La semaine prochaine, on parle de la meilleure porte d’entrée : le duo.</p>`,
sources:[REGLES,'GOWOD, temps moyens en catégorie Open (environ 1 h 35 chez les hommes, 1 h 38 chez les femmes).','J’ai un pote dans la com, « Hyrox : comment ce phénomène fitness est devenu le nouveau terrain de jeu des marques » (environ 150 000 pratiquants en France).'],
cta:['/performance','Être prévenu de la sortie des programmes Hyrox']},

{slug:'hyrox-en-duo',date:'2026-12-09T20:00:00+01:00',cat:'Hyrox',read:6,
title:'Hyrox en duo : la meilleure façon de commencer',
desc:'En duo, vous courez ensemble et vous vous partagez les ateliers. Les règles, comment choisir ton binôme et comment vous répartir le travail.',
lead:'Tout seul, on se trouve des excuses. À deux, on se donne rendez-vous. Le duo est la porte d’entrée la plus simple dans l’Hyrox : la course est la même, mais le travail est partagé, et tu ne passes jamais la ligne seul.',
body:`<h3>Comment ça marche</h3>
<p>Le parcours ne change pas : 8 fois 1 kilomètre de course, 8 ateliers. Ce qui change, c’est la façon de le faire.</p>
<ul>
<li><b>Vous courez ensemble.</b> Les 8 kilomètres se font côte à côte, du début à la fin. Si l’un part devant, l’équipe prend une minute de pénalité.</li>
<li><b>Vous vous partagez les ateliers.</b> Un seul travaille à la fois, l’autre récupère. Vous échangez autant de fois que vous voulez, en respectant les règles de passage de chaque atelier.</li>
<li><b>Vous choisissez votre équipe.</b> Deux femmes, deux hommes ou un duo mixte.</li>
</ul>
<p>Résultat : chacun court les 8 kilomètres, mais ne fait qu’environ la moitié du travail aux ateliers. C’est ce qui rend le duo si accessible pour une première fois.</p>

<h3>Pourquoi à deux, on tient</h3>
<p>La motivation, ça va et ça vient. Un rendez-vous, ça reste. Quand quelqu’un t’attend à 18 h 30 devant la salle, tu y vas, même fatigué, même s’il pleut. C’est toute la force du duo : il transforme une envie en engagement.</p>
<p>Et il y a le jour de la course. Au sixième kilomètre, quand les jambes ne veulent plus, avoir quelqu’un à côté de toi qui dit « allez, on y va » change tout.</p>

<h3>Bien choisir ton binôme</h3>
<p>Le bon binôme n’est pas forcément ton meilleur ami. Trois critères comptent vraiment.</p>
<ul>
<li><b>Une allure de course proche.</b> Puisque vous courez ensemble, c’est le plus lent des deux qui donne le rythme. Un écart trop grand frustre l’un et épuise l’autre.</li>
<li><b>Des disponibilités compatibles.</b> Il vous faut au moins une séance commune par semaine. Sans créneau partagé, le duo n’existe que sur le papier.</li>
<li><b>Le même objectif.</b> Finir avec le sourire ou viser un temps : les deux se valent, mais il faut être d’accord avant.</li>
</ul>
<p>Un point à connaître pour le duo mixte : les charges sont celles de la catégorie hommes. Le traîneau à pousser pèse par exemple 152 kg, traîneau compris. Ça se prépare, et ça se répartit intelligemment.</p>

<h3>Se répartir le travail</h3>
<p>La règle est simple : chacun prend ce qu’il fait le mieux, et personne ne va jusqu’à l’épuisement.</p>
${T('Répartition des ateliers en duo',['Atelier','Une répartition qui marche'],[
 ['Traîneaux (poussée et tirage)','Le plus costaud en fait un peu plus, par longueurs de 12,5 m'],
 ['SkiErg et rameur','Des relais courts, 250 m chacun, pour garder le rythme'],
 ['Burpees sautés','Par séries de 5 à 10, on change avant d’être dans le rouge'],
 ['Marche du fermier et fentes','Moitié-moitié, ou par 25 m'],
 ['Wall balls','Par séries de 10 à 20 : des petites séries propres vont plus vite qu’une grande série ratée']])}
<p>Testez votre répartition à l’entraînement, pas le jour de la course. Et décidez à l’avance qui commence chaque atelier : c’est ça de moins à discuter quand vous serez essoufflés.</p>

<h3>S’entraîner à deux, même sans salle</h3>
<ul>
<li><b>Une sortie de course ensemble par semaine</b>, à l’allure où vous pouvez encore parler. Vous réglez votre rythme commun.</li>
<li><b>Une séance « je travaille, tu récupères »</b> : l’un fait 10 squats pendant que l’autre souffle, puis on inverse, pendant 10 minutes. Pareil avec des fentes ou des burpees.</li>
<li><b>Chacun ses séances à côté</b>, et un message après chaque séance faite. Simple, mais redoutable.</li>
</ul>
<p>La semaine prochaine : Hyrox ou CrossFit, lequel est fait pour toi ?</p>`,
sources:[REGLES],
cta:['/performance','Être prévenu de la sortie du programme en duo']},

{slug:'hyrox-ou-crossfit',date:'2026-12-16T20:00:00+01:00',cat:'Hyrox',read:6,
title:'Hyrox ou CrossFit : lequel est fait pour toi ?',
desc:'Hyrox ou CrossFit ? L’un mise sur des gestes simples et la course, l’autre sur la variété et la technique. Les vraies différences pour choisir.',
lead:'Les deux font transpirer, les deux se pratiquent en groupe, et on les confond souvent. Pourtant, ils ne demandent pas la même chose. L’un te demande de tenir, l’autre d’apprendre. Voici comment choisir sans te tromper.',
body:`<h3>Ce qui les rapproche</h3>
<p>Dans les deux cas, tu mélanges cardio et renforcement, tu t’entraînes souvent à plusieurs, et tu sors de la séance en ayant tout travaillé. Les deux te rendent plus fort et plus endurant. Il n’y a pas de mauvais choix.</p>

<h3>Ce qui les sépare</h3>
${T3('Hyrox et CrossFit comparés',['','Hyrox','CrossFit'],[
 ['Les gestes','Simples : courir, pousser, tirer, porter, lancer','Variés et techniques : haltérophilie, gymnastique, cordes, anneaux'],
 ['L’apprentissage','Quelques séances pour connaître les ateliers','Des mois, parfois des années, pour maîtriser certains mouvements'],
 ['La course à pied','Au centre : 8 km par épreuve','Présente, mais par petites doses'],
 ['L’épreuve','Toujours la même, partout','Différente à chaque séance'],
 ['La durée de l’effort','Long : autour d’une heure et demie','Souvent court et intense'],
 ['Ce qui te limite','Le souffle et les jambes','Souvent la technique']])}

<h3>L’Hyrox est fait pour toi si…</h3>
<ul>
<li><b>Tu veux commencer sans rien apprendre de compliqué.</b> Aucun mouvement ne demande d’expérience en gymnastique ou en haltérophilie.</li>
<li><b>Tu aimes courir</b>, ou au moins tu veux t’y mettre.</li>
<li><b>Tu aimes mesurer tes progrès.</b> Comme l’épreuve ne change pas, ton temps dit tout.</li>
<li><b>Tu viens d’un sport d’endurance ou d’un sport collectif.</b> Tu as déjà le moteur, il te reste à ajouter la force.</li>
</ul>

<h3>Le CrossFit est fait pour toi si…</h3>
<ul>
<li><b>Tu aimes apprendre des gestes.</b> Réussir sa première traction, sa première montée de corde, un bel arraché : c’est un plaisir que l’Hyrox n’offre pas.</li>
<li><b>Tu t’ennuies vite.</b> Les séances changent tous les jours.</li>
<li><b>Courir longtemps ne te dit rien.</b></li>
<li><b>Tu veux un encadrement serré.</b> La technique demande un coach présent, et c’est aussi ce qui fait la force des salles de CrossFit.</li>
</ul>

<h3>Le piège de chaque côté</h3>
<p>Soyons honnêtes des deux côtés.</p>
<p>L’Hyrox a l’air simple, alors on le sous-estime. Huit kilomètres de course avec des ateliers entre chaque, c’est long. Celui qui ne s’est préparé qu’en salle, sans courir, le paie dès le troisième kilomètre.</p>
<p>Le CrossFit est passionnant, alors on veut aller trop vite. Charger une barre avant de maîtriser le geste, c’est prendre un vrai risque de blessure. La patience fait partie du sport.</p>

<h3>Et si tu ne choisissais pas ?</h3>
<p>Beaucoup de pratiquants font les deux, et ce n’est pas un hasard : la force du CrossFit aide aux traîneaux et aux fentes, l’endurance de l’Hyrox aide à tenir les séances longues. Si tu hésites encore, fais une séance d’essai de chaque. Ton corps te dira vite laquelle il a envie de recommencer.</p>
<p>La semaine prochaine : 5 tests simples pour savoir si tu es prêt pour ton premier Hyrox.</p>`,
sources:[REGLES],
cta:['/performance','Être prévenu de la sortie des programmes Hyrox']},

{slug:'premier-hyrox-tests',date:'2026-12-23T20:00:00+01:00',cat:'Hyrox',read:6,
title:'Premier Hyrox : es-tu prêt ? 5 tests simples',
desc:'Cinq tests à faire seul, sans matériel de salle, pour savoir où tu en es avant ton premier Hyrox, et combien de temps prévoir pour te préparer.',
lead:'Avant de payer ton dossard, prends une heure pour te tester. Pas pour te décourager : pour savoir d’où tu pars et combien de semaines il te faut. Cinq tests, un chrono, deux packs d’eau, et tu es fixé.',
body:`<h3>Avant de commencer</h3>
<p>Fais les tests sur deux jours, pas tous d’affilée. Échauffe-toi 10 minutes avant chacun. Et arrête-toi si une douleur apparaît : un test n’est pas une course.</p>

<h3>Les 5 tests</h3>
${T('Les 5 tests',['Le test','C’est validé si…'],[
 ['1. Courir à allure tranquille','Tu tiens 40 minutes sans marcher'],
 ['2. Squats au poids du corps','Tu en enchaînes 30, sans pause, cuisses à l’horizontale'],
 ['3. Fentes marchées','Tu en fais 40 d’affilée, 20 par jambe'],
 ['4. Porter deux packs d’eau','Tu marches 100 m avec un pack de 6 bouteilles dans chaque main, sans les poser'],
 ['5. L’enchaînement','Tu cours 1 km, tu fais 15 burpees, tu recours 1 km, et le second kilomètre ne prend pas plus de 30 secondes de plus que le premier']])}

<h3>Pourquoi ces tests-là</h3>
<ul>
<li><b>La course</b> : l’épreuve en contient 8 kilomètres. Si 40 minutes d’affilée passent, la distance ne sera pas ton problème.</li>
<li><b>Les squats</b> : les 100 lancers de ballon de la fin sont 100 squats avec un ballon. Il faut des cuisses qui tiennent.</li>
<li><b>Les fentes</b> : l’atelier en demande 100 mètres avec un sac sur les épaules. Quarante au poids du corps, c’est le minimum pour démarrer.</li>
<li><b>Les packs d’eau</b> : un pack pèse environ 9 kg. C’est moins que le jour de la course, mais ça dit si ta poigne et ton dos sont prêts à porter.</li>
<li><b>L’enchaînement</b> : c’est le plus parlant. Tout l’Hyrox est là : recourir juste après un effort, les jambes lourdes.</li>
</ul>

<h3>Ton résultat</h3>
${T3('Ton résultat',['Tests validés','Où tu en es','Temps de préparation'],[
 ['5 sur 5','Tu as la base','Environ 12 semaines'],
 ['3 ou 4','Tu n’es pas loin','Environ 16 semaines, en insistant sur ce qui a coincé'],
 ['0 à 2','Il faut d’abord construire','2 mois de base (course et renforcement), puis 12 semaines. Et pense au duo.']])}
<p>Ces délais sont des repères, pas des promesses. Ils supposent 3 séances par semaine, un sommeil correct et une assiette qui suit. Avec des nuits de 5 heures, compte plus long : c’est la récupération qui fait progresser.</p>

<h3>Ce que les tests ne disent pas</h3>
<p>Ils ne mesurent ni ton sommeil, ni ta charge mentale, ni la place que tu peux vraiment faire au sport dans ta semaine. C’est pourtant ça qui décide si tu tiendras 12 semaines. Le bilan Alpha regarde tout ça en 5 minutes, et te dit par où commencer.</p>
<p>Et si tu reprends après une longue pause, si tu as plus de 40 ans sans activité régulière ou un souci de santé, vois ton médecin avant de te tester.</p>`,
sources:[REGLES],
cta:['/bilan','Faire mon bilan gratuit']}
];
