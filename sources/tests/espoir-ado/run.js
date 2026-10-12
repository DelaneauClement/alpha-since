const fs=require('fs');
const T={};for(const n of ['bilan-app.js','Bilan.html','Espoir.html','Ado.html','site.css'])T[n]=fs.readFileSync(n,'utf8');
T['EspoirMatch.html']=fs.readFileSync('EspoirMatch.src.html','utf8');
require('./espoirbilan.js')(T);require('./adobilan.js')(T);require('./bilanjeunes.js')(T);
fs.mkdirSync('out',{recursive:true});
for(const n of ['bilan-app.js','bilan-espoir-app.js','bilan-ado-app.js','Bilan.html','EspoirBilan.html','AdoBilan.html','Ado.html','site.css'])fs.writeFileSync('out/'+n,T[n]);
console.log(Object.keys(T).map(k=>k+':'+Buffer.byteLength(T[k])).join(' '));
