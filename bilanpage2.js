// Bilan Alpha, suite : pyramide (récupérer, se nourrir, bouger, performer), temps réel, contre-pied du métier.
module.exports=function(T){
const H='Main.dc.html';
const a='Ton histoire sportive, trois tests simples et ton objectif. À la fin : ta condition physique, ton niveau en salle, tes 3 priorités et ta semaine d’entraînement, expliquée avec des mots simples.';
if(T[H].split(a).length!==2)throw new Error('BP2 home');
T[H]=T[H].replace(a,'Ton histoire sportive, ta base (sommeil, charge mentale, assiette), trois tests simples et ton temps réel. À la fin : ta pyramide, ton profil, tes 3 priorités et ta semaine d’entraînement, expliquée avec des mots simples.');
T['site.css']+=`
.b-pyr .a-kick{color:var(--y)}
.b-floors{display:flex;flex-direction:column;align-items:center;gap:6px;margin:4px 0}
.b-fl{display:flex;flex-direction:column;align-items:center;gap:2px;padding:10px 8px;border-radius:10px;text-align:center;min-width:150px;box-sizing:border-box}
.b-fl b{font:400 18px/1.1 Anton,Impact,sans-serif;text-transform:uppercase}
.b-fl span{font-size:13px;font-weight:700}
.b-s2{background:var(--y);color:var(--ink)}
.b-s1{background:var(--khaki);color:var(--cream)}
.b-s0{border:2px dashed var(--cream);color:var(--cream)}
.b-pyr .b-help{color:var(--mute)}
.b-mini{padding:14px 16px;border-radius:14px;border:2px dashed var(--ink);font-weight:700}
.b-sess a{color:inherit;font-weight:700}
`;
};
