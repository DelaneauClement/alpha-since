// Bilan adulte : les moins de 18 ans sont renvoyés vers le bilan de leur âge.
// À laisser en dernier : espoirbilan.js et adobilan.js partent du script adulte avant ce renvoi.
const die=m=>{console.error('BILANJEUNES',m);process.exit(1)};
module.exports=function(T){
 let s=T['bilan-app.js'];
 const one=(x,y)=>{if(s.split(x).length!==2)die('repère introuvable ou en double : '+x);s=s.split(x).join(y)};
 const L=' style="color:inherit;font-weight:700"';
 one("{k:'age',l:'Ton âge',n:[10,99,'ans']}","{k:'age',l:'Ton âge',h:'Moins de 18 ans ? Fais plutôt le <a href=\"/espoir/bilan\""+L+">bilan Alpha Espoir</a> (15–17 ans) ou le <a href=\"/ado/bilan\""+L+">bilan Alpha Ado</a> (11–14 ans, avec un parent).',n:[10,99,'ans']}");
 one("var warn=[];","var warn=[];\n if(r.age<18)warn.push(r.age>=15?'Tu as moins de 18 ans : ce bilan est pensé pour les adultes. Fais plutôt le <a href=\"/espoir/bilan\""+L+">bilan Alpha Espoir</a>, fait pour les 15–17 ans.':r.age>=11?'Tu as moins de 15 ans : ce bilan est pensé pour les adultes. Fais plutôt le <a href=\"/ado/bilan\""+L+">bilan Alpha Ado</a>, fait pour les 11–14 ans, avec un parent.':'Tu as moins de 11 ans : ce bilan est pensé pour les adultes. Va plutôt sur <a href=\"/kids\""+L+">Alpha Kids</a>, avec un parent.');");
 try{new Function(s)}catch(e){die('syntaxe : '+e.message)}
 T['bilan-app.js']=s;
 console.log('BILANJEUNES ok');
};
