// Alpha Ado : le bilan des 11–14 ans sur /ado/bilan, rempli par l'ado avec un parent.
// Même principe que espoirbilan.js : le moteur est celui du bilan adulte, les questions
// et les règles viennent de ado-app.js, livré compressé (brotli) en morceaux ado/app.br.N,
// empreinte attendue dans ado/app.sha1.
// TEST=1 : page hors index, non reliée depuis /ado. TEST=0 : ouverte, reliée depuis /ado.
const fs=require('fs'),zlib=require('zlib'),crypto=require('crypto');
const TEST=0;
const die=m=>{console.error('ADOBILAN',m);process.exit(1)};
const TITLE='Bilan Alpha Ado — 11–14 ans';
const DESC='Le bilan Alpha des 11–14 ans, à remplir avec un parent : profil, 3 priorités, séances courtes sans aucun poids, sommeil et assiette. Gratuit, 8 à 10 minutes.';

module.exports=function(T){
 // 1. Le moteur.
 let s=T['bilan-app.js'];
 const parts=[];
 for(let i=0;fs.existsSync('ado/app.br.'+i);i++)parts.push(fs.readFileSync('ado/app.br.'+i));
 let src;
 try{src=zlib.brotliDecompressSync(Buffer.concat(parts))}catch(e){die('ado-app.js illisible : '+parts.length+' morceaux, '+e.message)}
 if(crypto.createHash('sha1').update(src).digest('hex')!==fs.readFileSync('ado/app.sha1','utf8').trim())die('ado-app.js incomplet : '+parts.length+' morceaux, '+src.length+' octets');
 const frag=src.toString('utf8').split('//@@OVERRIDES');
 if(frag.length!==2)die('ado-app.js : séparateur introuvable');
 const one=(x,y)=>{if(s.split(x).length!==2)die('repère introuvable ou en double : '+x);s=s.split(x).join(y)};
 const cut=(from,to,by)=>{const a=s.indexOf(from),b=s.indexOf(to,a+1);if(a<0||b<0||s.indexOf(from,a+1)>=0)die('bloc introuvable : '+from+' … '+to);s=s.slice(0,a)+(by||'')+s.slice(b)};
 one("var KEY='alpha.bilan.v2'","var KEY='alpha.ado.v1'");
 one('/* Bilan Alpha : un seul parcours, les mêmes questions pour tout le monde. */','/* Bilan Alpha Ado (11–14 ans) : le moteur du bilan Alpha, avec les questions et les règles Ado. */');
 cut('var STEPS=[','function label(',frag[0].trim()+'\n');
 cut('function compute(a){','/* ---------- Affichage ---------- */');
 cut('function renderIntro(){','function renderStep(');
 cut('function renderResult(){','var N=STEPS.length;',frag[1].trim()+'\n');
 one("'Bilan Alpha · '","'Bilan Alpha Ado · '");
 one("'Prénom : '+pn+'\\nE-mail : '+em","'Prénom de l’ado : '+pn+'\\nE-mail du parent : '+em");
 // « Refaire le bilan » revient à l'accueil : la case « Un parent est avec moi » se recoche.
 one("else if(act==='reset'){S={step:0,a:{},c:S.c||{},done:false}}","else if(act==='reset'){S={step:-1,a:{},c:S.c||{},done:false}}");
 // Mise en garde immédiate : une question peut porter w(a), affiché sous ses réponses dès le clic, et amené à l'écran.
 one("return h+'</fieldset>'}","return h+(q.w&&q.w(a)||'')+'</fieldset>'}");
 one("save();var y=window.scrollY;render();window.scrollTo(0,y);return}","save();var y=window.scrollY,sel='[data-q=\"'+k+'\"] [role=alert]',had=!!root.querySelector(sel);render();window.scrollTo(0,y);var al=root.querySelector(sel);if(al&&!had&&al.scrollIntoView)al.scrollIntoView({block:'nearest'});return}");
 try{new Function(s)}catch(e){die('syntaxe : '+e.message)}
 for(const f of ['compute','priorities','program','summary','foodText','progText','renderIntro','renderStep','renderResult','label','check'])
  if(s.split('function '+f+'(').length!==2)die('fonction absente ou en double : '+f);
 for(const f of ['nutrition(','programAdult(','HOW['])if(s.includes(f))die('reste du moteur adulte : '+f);
 T['bilan-ado-app.js']=s;

 // 2. La page : en-tête et bande des univers de /ado, corps de /bilan.
 const E=T['Ado.html'],B=T['Bilan.html'];
 const a=E.indexOf(`<section class='u-sec `),f=E.indexOf('<footer '),b1=B.indexOf('<section class="a-sec t-ink a-pghead">'),b2=B.indexOf('<footer ');
 if(a<0||f<a||b1<0||b2<b1)die('gabarits introuvables');
 let head=E.slice(0,a),body=B.slice(b1,b2);
 const swap=(x,y,n)=>{if(head.split(x).length-1!==n)die('balise introuvable : '+x);head=head.split(x).join(y)};
 swap('Alpha Ado — le sport des 11–14 ans',TITLE,2);
 swap('Alpha Ado : coordination, gainage et bonnes habitudes pendant les années collège. Ouverture prochaine.',DESC,2);
 swap('/ado"','/ado/bilan"',2);
 swap('<script src="/site.js" defer></script>','<script src="/site.js" defer></script>\n<script src="/bilan-ado-app.js" defer></script>'+(TEST?'\n<meta name="robots" content="noindex">':''),1);
 const sw=(x,y)=>{if(body.split(x).length!==2)die('corps : '+x);body=body.split(x).join(y)};
 sw('Gratuit · 5 minutes · sans inscription','Alpha Ado · 11–14 ans · avec un parent');
 sw('<h1 class="a-h1 a-h1-sm">Bilan Alpha</h1>','<h1 class="a-h1 a-h1-sm">Bilan Alpha Ado</h1>');
 T['AdoBilan.html']=head+body+E.slice(f);

 // 3. Ouverture : /ado mène au bilan.
 if(!TEST){
  let P=E;
  const pub=(x,y,n)=>{if(P.split(x).length-1!==n)die('page à relier : '+x);P=P.split(x).join(y)};
  pub(`<span class='u-tag'>Bientôt</span>`,`<span class='u-tag'>Ouvert · 11–14 ans</span>`,1);
  const i=P.indexOf(`<a class='a-btn a-btn-y' href='mailto:`),j=P.indexOf('</a>',i);
  if(i<0||j<0||P.indexOf(`<a class='a-btn a-btn-y' href='mailto:`,i+1)>=0)die('bouton « Me prévenir » introuvable');
  P=P.slice(0,i)+`<a class='a-btn a-btn-y' href='/ado/bilan'>Faire mon bilan</a>`+P.slice(j+4);
  pub(`<p class='a-note'>Un e-mail s’ouvre, déjà rempli : il te reste à l’envoyer. C’est le parent qui s’inscrit.</p>`,`<p class='a-note'>Gratuit, 8 à 10 minutes, sans inscription. À faire avec un parent : les réponses restent sur le téléphone.</p>`,1);
  pub(' Ouverture prochaine.',' Bilan gratuit, à faire avec un parent.',2);
  T['Ado.html']=P;
 }
 console.log('ADOBILAN ok',s.length,'caractères,',TEST?'adresse de test':'en ligne');
};
