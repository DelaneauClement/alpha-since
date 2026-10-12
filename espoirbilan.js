// Alpha Espoir : le bilan des 15–17 ans sur /espoir/bilan.
// Le moteur est celui du bilan adulte (bilan-app.js, après tous les correctifs) ;
// les questions et les règles propres à Espoir viennent de espoir-app.js, livré
// compressé (brotli) en morceaux espoir/app.br.N, empreinte attendue dans espoir/app.sha1.
// TEST=1 : page hors index, non reliée depuis /espoir. TEST=0 : ouverte, reliée depuis /espoir et /espoir/match.
const fs=require('fs'),zlib=require('zlib'),crypto=require('crypto');
const TEST=0;
const die=m=>{console.error('ESPOIRBILAN',m);process.exit(1)};
const TITLE='Bilan Alpha Espoir — 15–17 ans';
const DESC='Le bilan Alpha des 15–17 ans : ton profil, tes 3 priorités, ta semaine d’entraînement autour du club, ton assiette et ta récupération. Gratuit, 8 minutes.';

module.exports=function(T){
 // 0. Bilan adulte : la variante facile des pompes se lit sans ambiguïté (genoux au sol, pas les mains sur les genoux).
 let A=T['bilan-app.js'];
 const fix=(x,y)=>{if(A.split(x).length!==2)die('bilan adulte, repère introuvable ou en double : '+x);A=A.split(x).join(y)};
 fix('Plus facile : mains sur un banc ou sur les genoux.','Plus facile : mains posées sur un banc, ou genoux posés au sol.');
 fix("['g','Sur les genoux']","['g','Genoux posés au sol']");
 fix("' sur les genoux'","', genoux au sol'");
 T['bilan-app.js']=A;

 // 1. Le moteur.
 let s=A;
 const parts=[];
 for(let i=0;fs.existsSync('espoir/app.br.'+i);i++)parts.push(fs.readFileSync('espoir/app.br.'+i));
 let src;
 try{src=zlib.brotliDecompressSync(Buffer.concat(parts))}catch(e){die('espoir-app.js illisible : '+parts.length+' morceaux, '+e.message)}
 if(crypto.createHash('sha1').update(src).digest('hex')!==fs.readFileSync('espoir/app.sha1','utf8').trim())die('espoir-app.js incomplet : '+parts.length+' morceaux, '+src.length+' octets');
 const frag=src.toString('utf8').split('//@@OVERRIDES');
 if(frag.length!==2)die('espoir-app.js : séparateur introuvable');
 const one=(x,y)=>{if(s.split(x).length!==2)die('repère introuvable ou en double : '+x);s=s.split(x).join(y)};
 const cut=(from,to,by)=>{const a=s.indexOf(from),b=s.indexOf(to,a+1);if(a<0||b<0||s.indexOf(from,a+1)>=0)die('bloc introuvable : '+from+' … '+to);s=s.slice(0,a)+(by||'')+s.slice(b)};
 one("var KEY='alpha.bilan.v2'","var KEY='alpha.espoir.v1'");
 one('/* Bilan Alpha : un seul parcours, les mêmes questions pour tout le monde. */','/* Bilan Alpha Espoir (15–17 ans) : le moteur du bilan Alpha, avec les questions et les règles Espoir. */');
 cut('var STEPS=[','function label(',frag[0].trim()+'\n');
 cut('function compute(a){','/* ---------- Programme ---------- */');
 one('function program(a,r){','function programAdult(a,r){');
 cut('/* ---------- Alimentation ---------- */','function progText(');
 cut('function foodText(a){','/* ---------- Affichage ---------- */');
 cut('function renderIntro(){','function renderStep(');
 cut('function renderResult(){','var N=STEPS.length;',frag[1].trim()+'\n');
 one("'Bilan Alpha · '","'Bilan Alpha Espoir · '");
 // Mise en garde immédiate : une question peut porter w(a), affiché sous ses réponses dès le clic, et amené à l'écran.
 one("return h+'</fieldset>'}","return h+(q.w&&q.w(a)||'')+'</fieldset>'}");
 one("save();var y=window.scrollY;render();window.scrollTo(0,y);return}","save();var y=window.scrollY,sel='[data-q=\"'+k+'\"] [role=alert]',had=!!root.querySelector(sel);render();window.scrollTo(0,y);var al=root.querySelector(sel);if(al&&!had&&al.scrollIntoView)al.scrollIntoView({block:'nearest'});return}");
 try{new Function(s)}catch(e){die('syntaxe : '+e.message)}
 for(const f of ['compute','priorities','program','programAdult','nutrition','summary','foodText','progText','renderIntro','renderStep','renderResult','label','check'])
  if(s.split('function '+f+'(').length!==2)die('fonction absente ou en double : '+f);
 T['bilan-espoir-app.js']=s;

 // 2. La page : en-tête et bande des univers de /espoir, corps de /bilan.
 const E=T['Espoir.html'],B=T['Bilan.html'];
 const a=E.indexOf(`<section class='u-sec `),f=E.indexOf('<footer '),b1=B.indexOf('<section class="a-sec t-ink a-pghead">'),b2=B.indexOf('<footer ');
 if(a<0||f<a||b1<0||b2<b1)die('gabarits introuvables');
 let head=E.slice(0,a),body=B.slice(b1,b2);
 const swap=(x,y,n)=>{if(head.split(x).length-1!==n)die('balise introuvable : '+x);head=head.split(x).join(y)};
 swap('Alpha Espoir — s’entraîner à 15–17 ans',TITLE,2);
 swap('Alpha Espoir : force, vitesse et récupération pour les 15–17 ans, avec une charge adaptée à la croissance. Ouverture prochaine.',DESC,2);
 swap('/espoir"','/espoir/bilan"',2);
 swap('<script src="/site.js" defer></script>','<script src="/site.js" defer></script>\n<script src="/bilan-espoir-app.js" defer></script>'+(TEST?'\n<meta name="robots" content="noindex">':''),1);
 const sw=(x,y)=>{if(body.split(x).length!==2)die('corps : '+x);body=body.split(x).join(y)};
 sw('Gratuit · 5 minutes · sans inscription','Alpha Espoir · 15–17 ans · gratuit, 8 minutes');
 sw('<h1 class="a-h1 a-h1-sm">Bilan Alpha</h1>','<h1 class="a-h1 a-h1-sm">Bilan Alpha Espoir</h1>');
 T['EspoirBilan.html']=head+body+E.slice(f);

 // 3. Ouverture : /espoir et /espoir/match mènent au bilan.
 if(!TEST){
  let P=E;
  const pub=(x,y,n)=>{if(P.split(x).length-1!==n)die('page à relier : '+x);P=P.split(x).join(y)};
  pub(`<span class='a-tag'>Prochaine ouverture</span>`,`<span class='a-tag'>Ouvert · 15–17 ans</span>`,1);
  const i=P.indexOf(`<a class='a-btn a-btn-y' href='mailto:`),j=P.indexOf('</a>',i);
  if(i<0||j<0||P.indexOf(`<a class='a-btn a-btn-y' href='mailto:`,i+1)>=0)die('bouton « Me prévenir » introuvable');
  P=P.slice(0,i)+`<a class='a-btn a-btn-y' href='/espoir/bilan'>Faire mon bilan</a>`+P.slice(j+4);
  pub(`<p class='a-note'>Un e-mail s’ouvre, déjà rempli : il te reste à l’envoyer.</p>`,`<p class='a-note'>Gratuit, 8 minutes, sans inscription. Tes réponses restent sur ton téléphone.</p>`,1);
  pub(' Ouverture prochaine.',' Bilan gratuit et guide d’avant-match.',2);
  T['Espoir.html']=P;
  P=T['EspoirMatch.html'];
  pub(`<div class='a-ctas'><a class='a-btn a-btn-o' href='/docs/`,`<div class='a-ctas'><a class='a-btn a-btn-y' href='/espoir/bilan'>Faire mon bilan Espoir</a><a class='a-btn a-btn-o' href='/docs/`,1);
  T['EspoirMatch.html']=P;
 }
 console.log('ESPOIRBILAN ok',s.length,'caractères,',TEST?'adresse de test':'en ligne');
};
