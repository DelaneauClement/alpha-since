// Univers Alpha : emblemes (piste A) et textes des trois univers.
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
];
module.exports={EMB,U};
