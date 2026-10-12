// Alpha Kids : le bilan des 3–10 ans sur /kids/bilan, rempli par le parent, et les trois fiches de jeux.
// Même principe que espoirbilan.js et adobilan.js : le moteur est celui du bilan adulte, les questions
// et les règles viennent de kids-app.js, livré compressé (brotli) en morceaux kids/app.br.N,
// empreinte attendue dans kids/app.sha1.
// Fiches PDF : les trois fichiers sont mis bout à bout, compressés en brotli et découpés en pdf/kids.br.N ;
// pdf/kids.json donne leur nom et leur taille, pdf/kids.sha1 l'empreinte de l'ensemble.
// TEST=1 : page hors index, non reliée depuis /kids. TEST=0 : ouverte, reliée depuis /kids.
const fs=require('fs'),zlib=require('zlib'),crypto=require('crypto');
const TEST=0;
const die=m=>{console.error('KIDSBILAN',m);process.exit(1)};
const TITLE='Bilan Alpha Kids — 3–10 ans';
const DESC='Le bilan Alpha des 3–10 ans, rempli par le parent : repères de l’âge, 3 priorités expliquées, jeux pour la semaine et fiche à télécharger. Gratuit, 5 minutes.';
const unpack=(dir,stem,what)=>{
 const parts=[];
 for(let i=0;fs.existsSync(dir+'/'+stem+'.br.'+i);i++)parts.push(fs.readFileSync(dir+'/'+stem+'.br.'+i));
 let src;
 try{src=zlib.brotliDecompressSync(Buffer.concat(parts))}catch(e){die(what+' illisible : '+parts.length+' morceaux, '+e.message)}
 if(crypto.createHash('sha1').update(src).digest('hex')!==fs.readFileSync(dir+'/'+stem+'.sha1','utf8').trim())die(what+' incomplet : '+parts.length+' morceaux, '+src.length+' octets');
 return src};

module.exports=function(T){
 // 1. Le moteur.
 let s=T['bilan-app.js'];
 const frag=unpack('kids','app','kids-app.js').toString('utf8').split('//@@OVERRIDES');
 if(frag.length!==2)die('kids-app.js : séparateur introuvable');
 const one=(x,y)=>{if(s.split(x).length!==2)die('repère introuvable ou en double : '+x);s=s.split(x).join(y)};
 const cut=(from,to,by)=>{const a=s.indexOf(from),b=s.indexOf(to,a+1);if(a<0||b<0||s.indexOf(from,a+1)>=0)die('bloc introuvable : '+from+' … '+to);s=s.slice(0,a)+(by||'')+s.slice(b)};
 one("var KEY='alpha.bilan.v2'","var KEY='alpha.kids.v1'");
 one('/* Bilan Alpha : un seul parcours, les mêmes questions pour tout le monde. */','/* Bilan Alpha Kids (3–10 ans) : le moteur du bilan Alpha, avec les questions et les règles Kids. */');
 cut('var STEPS=[','function label(',frag[0].trim()+'\n');
 cut('function compute(a){','/* ---------- Affichage ---------- */');
 cut('function renderIntro(){','function renderStep(');
 cut('function renderResult(){','var N=STEPS.length;',frag[1].trim()+'\n');
 one("'Bilan Alpha · '","'Bilan Alpha Kids · '");
 one("'Prénom : '+pn+'\\nE-mail : '+em","'Prénom de l’enfant : '+pn+'\\nE-mail du parent : '+em");
 one("'\\n\\nPROGRAMME PROPOSÉ\\n\\n'","'\\n\\nJEUX PROPOSÉS\\n\\n'");
 // « Refaire le bilan » revient à l'accueil : la case « Je suis son parent » se recoche.
 one("else if(act==='reset'){S={step:0,a:{},c:S.c||{},done:false}}","else if(act==='reset'){S={step:-1,a:{},c:S.c||{},done:false}}");
 // Accords il / elle : les libellés des questions passent par G().
 one("function qHTML(q){var a=S.a;","function qHTML(q0){var a=S.a,q={},z;for(z in q0)q[z]=q0[z];if(q.l)q.l=G(q.l);if(q.h)q.h=G(q.h);if(q.x){q.x=G(q.x);q.xd=G(q.xd)}if(q.o)q.o=q.o.map(function(o){return[o[0],G(o[1]),o[2]?G(o[2]):o[2]]});");
 one("'<h2 class=\"a-h2\">'+s.t+'</h2><p class=\"a-lead\">'+s.d+'</p>'","'<h2 class=\"a-h2\">'+G(s.t)+'</h2><p class=\"a-lead\">'+G(s.d)+'</p>'");
 // Mise en garde immédiate : une question peut porter w(a), affiché sous ses réponses dès le clic, et amené à l'écran.
 one("return h+'</fieldset>'}","return h+(q.w&&q.w(a)||'')+'</fieldset>'}");
 one("save();var y=window.scrollY;render();window.scrollTo(0,y);return}","save();var y=window.scrollY,sel='[data-q=\"'+k+'\"] [role=alert]',had=!!root.querySelector(sel);render();window.scrollTo(0,y);var al=root.querySelector(sel);if(al&&!had&&al.scrollIntoView)al.scrollIntoView({block:'nearest'});return}");
 try{new Function(s)}catch(e){die('syntaxe : '+e.message)}
 for(const f of ['compute','priorities','program','summary','foodText','progText','renderIntro','renderStep','renderResult','label','check','G'])
  if(s.split('function '+f+'(').length!==2)die('fonction absente ou en double : '+f);
 for(const f of ['nutrition(','programAdult(','HOW['])if(s.includes(f))die('reste du moteur adulte : '+f);
 T['bilan-kids-app.js']=s;

 // 2. La page : en-tête et bande des univers de /kids, corps de /bilan.
 const E=T['Kids.html'],B=T['Bilan.html'];
 const a=E.indexOf(`<section class='u-sec `),f=E.indexOf('<footer '),b1=B.indexOf('<section class="a-sec t-ink a-pghead">'),b2=B.indexOf('<footer ');
 if(a<0||f<a||b1<0||b2<b1)die('gabarits introuvables');
 let head=E.slice(0,a),body=B.slice(b1,b2);
 const swap=(x,y,n)=>{if(head.split(x).length-1!==n)die('balise introuvable : '+x);head=head.split(x).join(y)};
 swap('Alpha Kids — le sport jusqu’à 10 ans',TITLE,2);
 swap('Alpha Kids : construire la motricité par le jeu, jusqu’à 10 ans. Ouverture prochaine.',DESC,2);
 swap('/kids"','/kids/bilan"',2);
 swap('<script src="/site.js" defer></script>','<script src="/site.js" defer></script>\n<script src="/bilan-kids-app.js" defer></script>'+(TEST?'\n<meta name="robots" content="noindex">':''),1);
 const sw=(x,y)=>{if(body.split(x).length!==2)die('corps : '+x);body=body.split(x).join(y)};
 sw('Gratuit · 5 minutes · sans inscription','Alpha Kids · 3–10 ans · rempli par le parent');
 sw('<h1 class="a-h1 a-h1-sm">Bilan Alpha</h1>','<h1 class="a-h1 a-h1-sm">Bilan Alpha Kids</h1>');
 sw('<p class="a-lead">Où tu en es, et quoi faire maintenant.</p>','<p class="a-lead">Où en est ton enfant, et à quoi jouer cette semaine.</p>');
 T['KidsBilan.html']=head+body+E.slice(f);

 // 3. Les trois fiches de jeux, servies dans /docs.
 const all=unpack('pdf','kids','fiches Kids'),list=JSON.parse(fs.readFileSync('pdf/kids.json','utf8'));
 if(list.reduce((n,x)=>n+x.size,0)!==all.length)die('fiches Kids : tailles incohérentes');
 fs.mkdirSync('out/docs',{recursive:true});
 let at=0;
 for(const x of list){const pdf=all.subarray(at,at+x.size);at+=x.size;
  if(pdf.subarray(0,5).toString('latin1')!=='%PDF-'||!/^[A-Za-z0-9_.-]+\.pdf$/.test(x.name))die('fiche Kids invalide : '+x.name);
  fs.writeFileSync('out/docs/'+x.name,pdf)}

 // 4. Ouverture : /kids mène au bilan.
 if(!TEST){
  let P=E;
  const pub=(x,y,n)=>{if(P.split(x).length-1!==n)die('page à relier : '+x);P=P.split(x).join(y)};
  pub(`<span class='u-tag'>Bientôt</span>`,`<span class='u-tag'>Ouvert · 3–10 ans</span>`,1);
  const i=P.indexOf(`<a class='a-btn u-btn-ink' href='mailto:`),j=P.indexOf('</a>',i);
  if(i<0||j<0||P.indexOf(`<a class='a-btn u-btn-ink' href='mailto:`,i+1)>=0)die('bouton « Me prévenir » introuvable');
  P=P.slice(0,i)+`<a class='a-btn u-btn-ink' href='/kids/bilan'>Faire le bilan de mon enfant</a>`+P.slice(j+4);
  pub(`<p class='a-note'>Un e-mail s’ouvre, déjà rempli : il te reste à l’envoyer. C’est le parent qui s’inscrit.</p>`,`<p class='a-note'>Gratuit, 5 minutes, sans inscription. C’est le parent qui répond : les réponses restent sur le téléphone.</p>`,1);
  pub(' Ouverture prochaine.',' Bilan gratuit pour les parents et fiches de jeux.',2);
  T['Kids.html']=P;
 }
 console.log('KIDSBILAN ok',s.length,'caractères,',list.map(x=>x.name+' '+x.size).join(', ')+',',TEST?'adresse de test':'en ligne');
};
