// Univers Alpha : Kids, Ado, Espoir.
// Ajoute la bande des trois univers sous l'en-tete de l'accueil et genere
// les pages d'attente /kids, /ado, /espoir. Logos piste A : le phenix grandit
// (3, 4 puis 5 plumes ; le logo Alpha actuel en compte 6).
const fs=require('fs');
const SQ=String.fromCharCode(39),DQ=String.fromCharCode(34),NL=String.fromCharCode(10);
const {EMB,U}=require('./univers-data.js'),cropWord=require('./univers-png.js');
const CSS=NL+fs.readFileSync('univers.css','utf8');
const Q=s=>s.split(SQ).join(DQ);
const die=m=>{console.error('UNIVERS',m);process.exit(1)};
const MAIL='alphasince.contact@gmail.com';

const svg=(k,w)=>{const e=EMB[k];return `<svg viewBox='${e.vb}' width='${w}' fill='currentColor' stroke='currentColor' stroke-width='${e.sw}' stroke-linejoin='round' aria-hidden='true'><path d='${e.r}'></path><path d='${e.l}'></path><path d='${e.b}'></path></svg>`};

const nav=cur=>`<div class='a-wrap'><nav class='u-nav' aria-label='Les univers Alpha'>`+U.map(u=>`<a class='u-${u.k}' href='/${u.k}'${cur===u.k?` aria-current='page'`:``}>${svg(u.k,u.w)}<span><b>${u.name}</b><i>${u.age}</i></span></a>`).join(``)+`</nav></div>`;

module.exports=function(T){
 // 1. Accueil : la bande des univers, en haut du bloc d'accroche.
 let M=T['Main.dc.html'];
 const top=Q(`<section id='top' class='t-ink'>`);
 if(M.split(top).length!==2)die('accueil : section du haut introuvable');
 const st=M.indexOf('</style>');
 if(st<0)die('accueil : feuille de style introuvable');
 M=M.slice(0,st)+CSS+M.slice(st);
 T['Main.dc.html']=M.replace(top,()=>top+NL+nav(null));
 T['site.css']+=CSS;

 // 2. Mot « ALPHA » decoupe dans les deux logos (encre et creme).
 let word=true;
 try{fs.mkdirSync('out/img',{recursive:true});
  console.log('UNIVERS mot ALPHA',cropWord('img/logo.png','out/img/alpha-mot.png'),cropWord('img/logo-alt.png','out/img/alpha-mot-alt.png'))}
 catch(e){word=false;console.log('UNIVERS mot ALPHA en texte :',e.message)}

 // 3. Pages d'attente, sur le gabarit des pages statiques (en-tete, menu, pied).
 const C=T['Conseils.html'];
 const a=C.indexOf(Q(`<section class='a-sec t-ink a-pghead'>`)),f=C.indexOf(Q(`<footer class='a-ft t-ink' id='contact'>`));
 if(a<0||f<a)die('gabarit des pages statiques introuvable');
 const setTo=(h,pre,val)=>{const i=h.indexOf(pre);if(i<0)die('balise introuvable : '+pre);const j=i+pre.length;return h.slice(0,j)+val+h.slice(h.indexOf(DQ,j))};
 const canon=Q(`<link rel='canonical' href='`);
 const ci=C.indexOf(canon);if(ci<0)die('lien canonique introuvable');
 const base=C.slice(ci+canon.length,C.indexOf(DQ,ci+canon.length)).split('/conseils')[0];
 for(const u of U){
  let head=C.slice(0,a);
  const t0=head.indexOf('<title>'),t1=head.indexOf('</title>');
  if(t0<0||t1<t0)die('titre introuvable');
  head=head.slice(0,t0+7)+u.title+head.slice(t1);
  head=setTo(head,Q(`<meta property='og:title' content='`),u.title);
  head=setTo(head,Q(`<meta property='og:description' content='`),u.desc);
  head=setTo(head,Q(`<meta name='description' content='`),u.desc);
  head=setTo(head,Q(`<meta property='og:url' content='`),base+'/'+u.k);
  head=setTo(head,canon,base+'/'+u.k);
  head=head.split(Q(`<a href='/conseils' aria-current='page'>`)).join(Q(`<a href='/conseils'>`));
  const mail=('mailto:'+MAIL+'?subject='+encodeURIComponent('Alpha '+u.name+' · préviens-moi à l’ouverture')+'&amp;body='+encodeURIComponent(u.body)).split(SQ).join('%27');
  const mot=word?`<img src='/img/${u.alt?'alpha-mot-alt':'alpha-mot'}.png' alt='Alpha'>`:`<b class='u-word'>Alpha</b>`;
  T[u.file]=head+
`<section class='t-ink u-strip'>
${nav(u.k)}
</section>
<section class='${u.sec}'>
<div class='a-wrap u-hero'>
<div class='u-lock'>${svg(u.k,88)}<div>${mot}${u.nameHtml}</div></div>
${u.tag}
<h1 class='u-h1'>${u.h1}</h1>
<p class='a-lead'>${u.lead}</p>
<div class='a-ctas'><a class='${u.btn}' href='${mail}'>Me prévenir à l’ouverture</a><a class='a-btn a-btn-o' href='/'>Retour à Alpha</a></div>
<p class='a-note'>${u.note}</p>
</div>
</section>
`+C.slice(f);
 }
 console.log('UNIVERS ok',U.map(u=>u.file).join(' '));
 console.log('UNIVERS fichiers',['univers.js','univers-data.js','univers-png.js','univers.css','assemble.js','vercel.json'].map(n=>n+' '+require('crypto').createHash('sha1').update(fs.readFileSync(n)).digest('hex').slice(0,10)).join(' | '));
};
