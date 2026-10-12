// Bilan Alpha : une question facultative ne bloque plus jamais la suite.
// Avant : un chiffre hors limites dans un test facultatif (0, ou un saut note
// en metres) encadrait la question et empechait de continuer.
// Maintenant : la valeur est ignoree, un saut en metres est converti en cm,
// et un choix facultatif se retire en appuyant dessus une seconde fois.
const fs=require('fs');
const die=m=>{console.error('BILANFIX',m);process.exit(1)};
const NL=String.fromCharCode(10);
const R=[
[`if(q.n&&(isNaN(+v)||+v<q.n[0]||+v>q.n[1]))return q.k}`,
 `if(q.k==='saut'&&+v>=.5&&+v<=3.5)v=a.saut=String(Math.round(+v*100));`+NL+`  if(q.n&&(isNaN(+v)||+v<q.n[0]||+v>q.n[1])){if(q.opt){delete a[q.k];continue}return q.k}}`],
[`else S.a[k]=v;`,`else if(S.a[k]===v&&isOpt(k))delete S.a[k];else S.a[k]=v;`],
[`function visible(q){`,`function isOpt(k){for(var i=0;i<STEPS.length;i++)for(var j=0;j<STEPS[i].q.length;j++)if(STEPS[i].q[j].k===k)return !!STEPS[i].q[j].opt;return false}`+NL+`function visible(q){`],
[`Ils précisent ton profil sans le changer.`,`Ils précisent ton profil sans le changer. Tu peux laisser ces cases vides.`],
[`Meilleur de 3 essais.`,`Meilleur de 3 essais. En centimètres, par exemple 180.`],
[`le plus vite possible mais à allure régulière.`,`le plus vite possible mais à allure régulière. En minutes, par exemple 16.`]
];

// Rejoue un bilan complet hors navigateur : tests facultatifs remplis de travers.
function scenario(src){
 const store={},h={};let html='';
 const root={set innerHTML(v){html=v},get innerHTML(){return html},addEventListener:(t,f)=>{h[t]=f},contains:()=>true,getBoundingClientRect:()=>({top:0}),querySelector:()=>null};
 const el={hidden:true,scrollIntoView(){},textContent:''};
 const doc={getElementById:id=>id==='bilan'?root:el};
 const win={scrollY:0,scrollTo(){}};
 const ls={getItem:k=>store[k]===undefined?null:store[k],setItem:(k,v)=>{store[k]=String(v)}};
 try{
  new Function('document','window','localStorage','navigator','location',src)(doc,win,ls,{},{});
  const st=()=>JSON.parse(store['alpha.bilan.v2']||'{}');
  const tap=o=>h.click({target:{closest:()=>({getAttribute:n=>o[n]===undefined?null:o[n]})}});
  const opt=(k,v,m)=>tap({'data-k':k,'data-v':v,'data-m':m?'1':undefined});
  const num=(k,v)=>h.input({target:{getAttribute:n=>n==='data-k'?k:null,value:v}});
  const next=()=>tap({'data-act':'next'});
  tap({'data-act':'start'});
  opt('sexe','H');num('age','40');num('taille','180');num('poids','80');next();
  opt('sport','0');opt('muscu','0');next();
  opt('metier','assis');opt('actif','1');opt('gene','non',1);opt('sante','0');next();
  opt('stress','0');opt('sommeil','3');opt('sommeilq','2');opt('prot','2');opt('legumes','1');opt('plats','2');opt('boissons','2');next();
  opt('pompesType','p');num('pompes','10');num('planche','60');opt('course','3');
  opt('soup','3');opt('soup','3');const soup=st().a.soup;
  num('saut','1.8');num('run3','0');num('chaise','');next();
  const mid=st();
  opt('objectif','forme');opt('freq','2');opt('duree','20');opt('moment','soir');opt('lieu','sans');next();
  const end=st();
  return {ok:mid.step===5&&end.done===true&&soup===undefined&&mid.a.saut==='180'&&mid.a.run3===undefined,etapeApresTests:mid.step,saut:mid.a.saut,run3:mid.a.run3===undefined?'ignore':mid.a.run3,soup:soup===undefined?'retire':soup,fini:end.done===true,resultat:html.length};
 }catch(e){return {ok:false,erreur:e.message}}
}

module.exports=function(T){
 const key='bilan-app.js';
 const before=T[key]!==undefined?T[key]:fs.readFileSync(fs.existsSync('out/'+key)?'out/'+key:key,'utf8');
 let s=before;
 for(const [a,b] of R){if(s.split(a).length!==2)die('repere introuvable : '+a.slice(0,60));s=s.replace(a,()=>b)}
 try{new Function(s)}catch(e){die('script invalide : '+e.message)}
 if(process.env.VERCEL_ENV!=='production'){
  console.log('BILANFIX source',T[key]!==undefined?'T':fs.existsSync('out/'+key)?'out':'racine');
  console.log('BILANFIX avant',JSON.stringify(scenario(before)));
  const r=scenario(s);console.log('BILANFIX apres',JSON.stringify(r));
  if(!r.ok)die('le scenario de test echoue');
 }
 T[key]=s;
 console.log('BILANFIX ok',R.length,'remplacements');
};
