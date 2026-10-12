// node pack.js <fichier source> <dossier> <stem>  → <dossier>/<stem>.br.N + <stem>.sha1
const fs=require('fs'),z=require('zlib'),c=require('crypto');
const [src,dir,stem]=process.argv.slice(2);
fs.mkdirSync(dir,{recursive:true});
for(const f of fs.readdirSync(dir))if(f.startsWith(stem+'.br.')||f===stem+'.sha1')fs.unlinkSync(dir+'/'+f);
const buf=fs.readFileSync(src);
const br=z.brotliCompressSync(buf,{params:{[z.constants.BROTLI_PARAM_QUALITY]:11,[z.constants.BROTLI_PARAM_LGWIN]:24,[z.constants.BROTLI_PARAM_SIZE_HINT]:buf.length}});
let i=0;for(let o=0;o<br.length;o+=4096)fs.writeFileSync(dir+'/'+stem+'.br.'+(i++),br.subarray(o,o+4096));
fs.writeFileSync(dir+'/'+stem+'.sha1',c.createHash('sha1').update(buf).digest('hex'));
console.log(src,buf.length,'->',br.length,'octets,',i,'morceaux');
