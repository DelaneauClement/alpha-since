// Univers Alpha : emblemes (piste A) et textes des univers.
// Performance (9 novembre 2026) : phenix-fusee a 6 plumes dans un chrono ouvert en bas ;
// x = dessin complet, le halo prend la couleur --u-halo pour detacher les ailes du cadran.
const NL=String.fromCharCode(10);
const EMB={
kids:{vb:'22 40 156 118',sw:9,
r:'M116.7 88.2L159.3 50L163.3 62L130 92.2ZM128.9 103.3L170.4 86.9L169.1 98.4L127.8 114.4ZM122.2 126.9L160.2 122.9L154.4 133.1L117.8 137.1Z',
l:'M70 92.2L36.7 62L40.7 50L83.3 88.2ZM72.2 114.4L30.9 98.4L29.6 86.9L71.1 103.3ZM82.2 137.1L45.6 133.1L39.8 122.9L77.8 126.9Z',
b:'M100 122.9Q112.2 116 116.2 88.2L131.1 88.2L131.8 114.9L123.8 132.7L110.4 142L100 151.8L89.6 142L76.2 132.7L68.2 114.9L68.9 88.2L83.8 88.2Q87.8 116 100 122.9Z'},
ado:{vb:'16 16 168 148',sw:5,
r:'M108.9 81.6L171.8 22L169.1 41.6L131.1 81.6ZM131.1 79.8L178.9 56.7L173.6 73.1L128.2 98.4ZM128.9 97.1L174.9 91.3L165.1 106L124.7 114ZM122.9 115.3L159.8 121.6L148.7 130.4L114.9 126.9Z',
l:'M68.9 81.6L30.9 41.6L28.2 22L91.1 81.6ZM71.8 98.4L26.4 73.1L21.1 56.7L68.9 79.8ZM75.3 114L34.9 106L25.1 91.3L71.1 97.1ZM85.1 126.9L51.3 130.4L40.2 121.6L77.1 115.3Z',
b:'M100 121.6Q110.9 112.7 112.2 80.2L132.7 80.2L130.4 110.4L122.9 124.2L110.9 134.9L105.6 142L100 158.4L94.4 142L89.1 134.9L77.1 124.2L69.6 110.4L67.3 80.2L87.8 80.2Q89.1 112.7 100 121.6Z'},
espoir:{vb:'12 0 176 166',sw:2,
r:'M107.8 77.1L177.1 5.1L172.7 28.2L131.1 77.1ZM131.1 75.3L183.8 42L178 59.8L127.8 92.7ZM128.9 91.3L182 75.3L173.6 92.7L124.4 107.3ZM124.4 108.7L169.1 107.8L157.6 119.8L121.1 121.6ZM120 120.7L154.9 134.9L142.9 139.8L112.2 129.6Z',
l:'M68.9 77.1L27.3 28.2L22.9 5.1L92.2 77.1ZM72.2 92.7L22 59.8L16.2 42L68.9 75.3ZM75.6 107.3L26.4 92.7L18 75.3L71.1 91.3ZM78.9 121.6L42.4 119.8L30.9 107.8L75.6 108.7ZM87.8 129.6L57.1 139.8L45.1 134.9L80 120.7Z',
b:'M100 118.9Q110.4 109.3 111.6 75.3L132.2 75.3L130 106L122.9 121.6L110.4 133.1L105.1 141.6L100 161.1L94.9 141.6L89.6 133.1L77.1 121.6L70 106L67.8 75.3L88.4 75.3Q89.6 109.3 100 118.9Z'}
,
performance:{vb:'-60 -78 320 366',x:`<path d='M39.9 209A128 128 0 1 1 160.1 209' fill='none' stroke-width='15' stroke-linecap='round'></path><rect x='80' y='-72' width='40' height='22' rx='4' stroke='none'></rect><rect x='91' y='-52' width='18' height='16' stroke='none'></rect><rect x='205.4' y='6.8' width='30' height='20' rx='4' stroke='none' transform='rotate(58 220.4 20.8)'></rect><g stroke-width='0'></g><g><line x1='167' y1='-20' x2='173' y2='-30.4' stroke-width='7' stroke-linecap='round'></line><line x1='234' y1='96' x2='254' y2='96' stroke-width='10' stroke-linecap='round'></line><line x1='216' y1='163' x2='226.4' y2='169' stroke-width='7' stroke-linecap='round'></line><line x1='167' y1='212' x2='173' y2='222.4' stroke-width='7' stroke-linecap='round'></line><line x1='33' y1='212' x2='27' y2='222.4' stroke-width='7' stroke-linecap='round'></line><line x1='-16' y1='163' x2='-26.4' y2='169' stroke-width='7' stroke-linecap='round'></line><line x1='-34' y1='96' x2='-54' y2='96' stroke-width='10' stroke-linecap='round'></line><line x1='-16' y1='29' x2='-26.4' y2='23' stroke-width='7' stroke-linecap='round'></line><line x1='33' y1='-20' x2='27' y2='-30.4' stroke-width='7' stroke-linecap='round'></line></g><g transform='translate(100 92) scale(1.25) translate(-100 -92)' style='fill:var(--u-halo,#E4E1B8);stroke:var(--u-halo,#E4E1B8)' stroke-width='7.2'><path d='M109.4 77.1L176.8 6.7L173.0 26.6L129.5 77.1ZM126.6 76.6L182.1 35.9L177.3 52.2L128.3 88.6ZM129.5 86.1L182.2 63.2L175.9 78.3L126.0 100.3ZM126.8 99.3L176.2 89.4L167.9 102.5L123.4 112.0ZM123.2 111.9L165.4 114.0L155.5 123.1L119.6 122.4ZM119.5 121.3L154.1 135.2L143.7 139.5L112.7 129.0Z'></path><path d='M70.5 77.1L27.0 26.6L23.2 6.7L90.6 77.1ZM71.7 88.6L22.7 52.2L17.9 35.9L73.4 76.6ZM74.0 100.3L24.1 78.3L17.8 63.2L70.5 86.1ZM76.6 112.0L32.1 102.5L23.8 89.4L73.2 99.3ZM80.4 122.4L44.5 123.1L34.6 114.0L76.8 111.9ZM87.3 129.0L56.3 139.5L45.9 135.2L80.5 121.3Z'></path><path d='M100 118.9Q110.4 109.3 111.6 75.3L132.2 75.3L130 106L122.9 121.6L112 132Q128 157.2 118 192.7Q114 171.8 106.5 161.2Q112 212.2 100 244Q88 212.2 93.5 161.2Q86 171.8 82 192.7Q72 159.2 88 132L77.1 121.6L70 106L67.8 75.3L88.4 75.3Q89.6 109.3 100 118.9Z'></path></g><g transform='translate(100 92) scale(1.25) translate(-100 -92)' stroke-width='1'><path d='M109.4 77.1L176.8 6.7L173.0 26.6L129.5 77.1ZM126.6 76.6L182.1 35.9L177.3 52.2L128.3 88.6ZM129.5 86.1L182.2 63.2L175.9 78.3L126.0 100.3ZM126.8 99.3L176.2 89.4L167.9 102.5L123.4 112.0ZM123.2 111.9L165.4 114.0L155.5 123.1L119.6 122.4ZM119.5 121.3L154.1 135.2L143.7 139.5L112.7 129.0Z'></path><path d='M70.5 77.1L27.0 26.6L23.2 6.7L90.6 77.1ZM71.7 88.6L22.7 52.2L17.9 35.9L73.4 76.6ZM74.0 100.3L24.1 78.3L17.8 63.2L70.5 86.1ZM76.6 112.0L32.1 102.5L23.8 89.4L73.2 99.3ZM80.4 122.4L44.5 123.1L34.6 114.0L76.8 111.9ZM87.3 129.0L56.3 139.5L45.9 135.2L80.5 121.3Z'></path><path d='M100 118.9Q110.4 109.3 111.6 75.3L132.2 75.3L130 106L122.9 121.6L112 132Q128 157.2 118 192.7Q114 171.8 106.5 161.2Q112 212.2 100 244Q88 212.2 93.5 161.2Q86 171.8 82 192.7Q72 159.2 88 132L77.1 121.6L70 106L67.8 75.3L88.4 75.3Q89.6 109.3 100 118.9Z'></path></g>`}
};
const U=[
{k:'kids',file:'Kids.html',name:'Kids',age:'3–10 ans',w:28,sec:'u-sec u-bg-kids',alt:false,
 nameHtml:`<b class='u-name u-name-k' aria-label='Kids'><span aria-hidden='true'>K</span><span aria-hidden='true'>i</span><span aria-hidden='true'>d</span><span aria-hidden='true'>s</span></b>`,
 tag:`<span class='u-tag'>Bientôt</span>`,
 h1:`Bouger, c’est d’abord jouer.`,
 lead:`Jusqu’à 10 ans : courir, sauter, grimper, lancer. On construit la motricité par le jeu, à la maison comme dehors. Ici, on s’adresse aux parents.`,
 btn:'a-btn u-btn-ink',
 body:[`Bonjour,`,``,`Je suis parent et je veux être prévenu(e) à l’ouverture d’Alpha Kids.`,``,`Mon prénom : `,`Âge de mon enfant : `,``,`Merci !`].join(NL),
 note:`Un e-mail s’ouvre, déjà rempli : il te reste à l’envoyer. C’est le parent qui s’inscrit.`,
 title:'Alpha Kids — le sport jusqu’à 10 ans',
 desc:'Alpha Kids : construire la motricité par le jeu, jusqu’à 10 ans. Ouverture prochaine.'},
{k:'ado',file:'Ado.html',name:'Ado',age:'11–14 ans',w:26,sec:'u-sec t-olive',alt:true,
 nameHtml:`<b class='u-name'>Ado</b>`,
 tag:`<span class='u-tag'>Bientôt</span>`,
 h1:`Grandir <span class='a-y'>sans se blesser.</span>`,
 lead:`Pour les 11–14 ans : coordination, gainage et bonnes habitudes pendant les années collège. Le bilan se fait avec un parent.`,
 btn:'a-btn a-btn-y',
 body:[`Bonjour,`,``,`Je suis parent et je veux être prévenu(e) à l’ouverture d’Alpha Ado.`,``,`Mon prénom : `,`Âge de mon enfant : `,`Sport pratiqué : `,``,`Merci !`].join(NL),
 note:`Un e-mail s’ouvre, déjà rempli : il te reste à l’envoyer. C’est le parent qui s’inscrit.`,
 title:'Alpha Ado — le sport des 11–14 ans',
 desc:'Alpha Ado : coordination, gainage et bonnes habitudes pendant les années collège. Ouverture prochaine.'},
{k:'espoir',file:'Espoir.html',name:'Espoir',age:'15–17 ans',w:26,sec:'u-sec t-ink u-espoir-c',alt:true,
 nameHtml:`<b class='u-name'>Espoir</b>`,
 tag:`<span class='a-tag'>Prochaine ouverture</span>`,
 h1:`Apprends à t’entraîner <span class='a-y'>pour de bon.</span>`,
 lead:`Pour les 15–17 ans : force, vitesse et récupération, avec une charge adaptée à ta croissance.`,
 btn:'a-btn a-btn-y',
 body:[`Bonjour,`,``,`Je veux être prévenu(e) à l’ouverture d’Alpha Espoir.`,``,`Mon prénom : `,`Mon sport : `,``,`Merci !`].join(NL),
 note:`Un e-mail s’ouvre, déjà rempli : il te reste à l’envoyer.`,
 title:'Alpha Espoir — s’entraîner à 15–17 ans',
 desc:'Alpha Espoir : force, vitesse et récupération pour les 15–17 ans, avec une charge adaptée à la croissance. Ouverture prochaine.'}
,{k:'performance',file:'Performance.html',name:'Performance',age:'18 ans et +',w:30,sec:'u-sec t-cream u-perf-c',alt:false,
 nameHtml:`<b class='u-name'>Performance</b>`,
 tag:`<span class='u-tag'>Bientôt</span>`,
 h1:`Prépare ta course. <span class='u-perf-y'>Arrive en forme.</span>`,
 lead:`Pour les adultes qui ont une date de course. On commence par l’Hyrox : des programmes par niveau, Open, Pro et Doubles, pour finir ta première course ou gagner du temps sur la suivante.`,
 btn:'a-btn u-btn-ink',
 body:[`Bonjour,`,``,`Je veux être prévenu(e) de la sortie des programmes de préparation à l’Hyrox.`,``,`Mon prénom : `,`Ma catégorie (Open, Pro, Doubles) : `,`Date de ma course : `,``,`Merci !`].join(NL),
 note:`Un e-mail s’ouvre, déjà rempli : il te reste à l’envoyer.`,
 title:'Alpha Performance — préparer sa course Hyrox',
 desc:'Alpha Performance : des programmes de préparation à l’Hyrox par niveau, Open, Pro et Doubles, pour les adultes qui ont une date de course. Ouverture prochaine.'}
];
module.exports={EMB,U};
