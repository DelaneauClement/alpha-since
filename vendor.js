// Bibliothèques d'affichage servies par alphasince.fr (13 octobre 2026).
// L'accueil, les Outils et le Coaching sont affichés par un moteur (support.js) qui charge React,
// et parfois Babel, depuis cdn.jsdelivr.net. Le build les installe (installCommand de vercel.json),
// les copie dans out/vendor/ et indique au moteur de les prendre là (window.__resources).
// Si l'installation a échoué, rien ne change : les pages continuent d'utiliser jsdelivr.
const fs=require('fs');
const LIBS=[
 ['https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js','node_modules/react/umd/react.production.min.js','react.production.min.js'],
 ['https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js','node_modules/react-dom/umd/react-dom.production.min.js','react-dom.production.min.js'],
 ['https://cdn.jsdelivr.net/npm/@babel/standalone@7.29.0/babel.min.js','node_modules/@babel/standalone/babel.min.js','babel.min.js']
];
module.exports=function(T){
 const sup=fs.readFileSync('support.js','utf8');
 const ok=LIBS.filter(([url,src])=>sup.includes(url)&&fs.existsSync(src));
 if(!ok.length){console.log('VENDOR bibliothèques non installées : les pages gardent jsdelivr');return}
 fs.mkdirSync('out/vendor',{recursive:true});
 const map={};
 for(const [url,src,name] of ok){fs.copyFileSync(src,'out/vendor/'+name);map[url]='/vendor/'+name}
 const tag='<script>window.__resources='+JSON.stringify(map)+'</script>\n';
 let n=0;
 for(const k of Object.keys(T)){
  if(typeof T[k]!=='string'||!k.endsWith('.html'))continue;
  const s=T[k],i=s.indexOf('<script src="/support.js">');if(i<0)continue;
  T[k]=s.slice(0,i)+tag+s.slice(i);n++;
 }
 console.log('VENDOR ok',ok.length,'bibliothèques servies par le site, sur',n,'pages');
};
