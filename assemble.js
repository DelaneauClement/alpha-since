const fs=require('fs'),c=require('crypto');
const h=s=>c.createHash('sha1').update(s).digest('hex');
require('child_process').execSync('node gen.js .',{stdio:'inherit'});
const S2={"Conseils.html": "0453dff997a8bd2836a23a7098d6b4670a0bf2bc", "Legal.html": "b586b47a7c84b679934f25a0e897a61764d2052d", "site.css": "f8a6d63e8485e52e9d00f7b29ae24da3bd6ab7bb", "site.js": "59601f0ef456e8435e7fed50b2a9b2a002a324df"};for(const f in S2){if(h(fs.readFileSync(f))!==S2[f]){console.error('BADS',f);process.exit(1)}}
fs.mkdirSync('out/img',{recursive:true});
for(const f of ['support.js','img/logo.png','img/logo-alt.png','Conseils.html','Legal.html','site.css','site.js'])fs.copyFileSync(f,'out/'+f);
const T={};
for(const n of ['Main.dc.html','Programme.dc.html']){let s='';for(let i=0;i<4;i++)s+=fs.readFileSync('q/'+n+'.'+i,'utf8');T[n]=s}
for(const n of ['Suivi.dc.html','Test.dc.html'])T[n]=fs.readFileSync(n,'utf8');
const P=JSON.parse(fs.readFileSync('patches.json','utf8'));
for(const [n,x] of [['Main.dc.html',11650],['Programme.dc.html',5600],['Suivi.dc.html',2900],['Test.dc.html',3300]])P.push([n,'width: 390px; height: '+x+'px;','width: 390px; min-height: 100vh;']);
for(const [f,a,b] of P){if(T[f].split(a).length!==2){console.error('NOFIND',f);process.exit(1)}T[f]=T[f].replace(a,()=>b)}
require('./restructure.js')(T);require('./redesign.js')(T);require('./redesign2.js')(T);require('./redesign3.js')(T);
T['site.css']=require('./redesign3.js').wrap(fs.readFileSync('site.css','utf8'));for(const f of ['Conseils.html','Legal.html'])T[f]=require('./redesign3.js').wa(fs.readFileSync(f,'utf8'),f);
require('./redesign4.js')(T);require('./redesign5.js')(T);require('./redesign6.js')(T);require('./redesign7.js')(T);require('./redesign8.js')(T);require('./redesign9.js')(T);require('./redesign10.js')(T);
const E={"Main.dc.html":"5e263f0bdd1f72ca6df684a4827d98f71c650670","Programme.dc.html":"26e00f37198a68dbcce76519bfe23c6e34e9d16b","Suivi.dc.html":"6d71e78c9d3c14d4c7a8a6d4cbaa86423b932184","Test.dc.html":"16d176c2a22c562bf8a343684a38c8085884d076","Outils.dc.html":"b617627b1415c272a557068d5b0d457b55fb5482","site.css":"2e472b28dac3a1d2a5d8ccc3d940126346b1a8c7","Conseils.html":"3422bb1e3bcd63027e8b632b3b75c73283393270","Legal.html":"bac9c25fb3611ae7c27a9092bff6c6ae5666f5b6"};
for(const n in E){if(h(T[n])!==E[n]){console.error('BAD',n,h(T[n]));process.exit(1)}console.log('OK',n)}
{const S=require('./sched.js');for(const a of [...require('./art1.js'),...require('./art2.js')]){if(!S[a.slug])throw new Error('sched '+a.slug);a.date=S[a.slug]}}
require('./redesign11.js')(T);console.log(require('./journal.js')(T,Date.now()));require('./bilanpage.js')(T);require('./bilanpage2.js')(T);require('./bilanpage3.js')(T);require('./bilanpage4.js')(T);require('./bilanpage5.js')(T);require('./univers.js')(T);require('./bilanfix.js')(T);require('./espoirmatch.js')(T);require('./espoirbilan.js')(T);require('./adobilan.js')(T);require('./kidsbilan.js')(T);require('./bilanjeunes.js')(T);require('./photos.js')(T);require('./manique.js')(T);require('./programmes.js')(T);require('./cgv.js')(T);require('./seo.js')(T);require('./vendor.js')(T);require('./domaine.js')(T);fs.mkdirSync('out/conseils',{recursive:true});for(const n in T)fs.writeFileSync('out/'+n,T[n]);
