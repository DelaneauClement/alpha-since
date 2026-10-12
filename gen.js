// Generates static pages (Conseils.html, Legal.html) + site.css + site.js from redesign.js building blocks
const fs=require('fs');
const src=fs.readFileSync(__dirname+'/redesign.js','utf8');
const a=src.indexOf("const arrow="),b=src.indexOf("const route=");
const lib=new Function(src.slice(a,b)+';return {CSS,header,footer};')();
const EXTRA=`
.a-narrow{max-width:780px}
.a-pghead{padding-top:48px}
.a-h1-sm{font-size:clamp(44px,10vw,96px);overflow-wrap:break-word}
.t-khaki .a-kick{color:var(--ink)}
.a-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:24px}
.a-chips a{display:flex;align-items:center;min-height:44px;padding:0 16px;border:2px solid currentColor;border-radius:999px;color:inherit;text-decoration:none;font-weight:700;font-size:16px}
.a-chips a:hover{background:var(--cream);color:var(--ink);border-color:var(--cream)}
.a-pghead .a-lead{margin-top:16px}
.a-art h2{margin-bottom:16px}
.a-art .a-lead{margin-bottom:8px}
.a-art h3{font:400 clamp(24px,3vw,30px)/1.1 Anton,Impact,sans-serif;text-transform:uppercase;margin:40px 0 12px}
.a-art p{margin:0 0 14px;max-width:40em}
.a-art ul,.a-art ol{margin:0 0 16px;padding-left:22px;display:flex;flex-direction:column;gap:8px;max-width:40em}
.a-art li::marker{font-weight:700}
.a-art a:not(.a-btn){color:inherit;font-weight:700;text-underline-offset:3px}
.a-steps-list li i{font-style:normal;font-weight:700;opacity:.75}
.a-table{display:grid;margin:8px 0 16px;border-top:1px solid rgba(18,17,12,.25)}
.a-tr{display:grid;grid-template-columns:1fr auto;gap:16px;padding:12px 0;border-bottom:1px solid rgba(18,17,12,.25);font-size:16px}
.a-th{font-weight:700;font-size:14px;opacity:.75}
.a-tr span:last-child{font-weight:700;text-align:right;white-space:nowrap}
.a-cta-line{margin-top:32px!important}
.a-box{padding:20px;border-radius:16px;background:rgba(18,17,12,.06);margin:8px 0 16px;font-size:15px}
.a-box p{margin:0 0 10px}
.a-legal p,.a-legal li{font-size:16px}
.a-legal h3{font-size:22px;margin-top:32px}
.a-todo{margin-top:24px;padding:16px 18px;border-radius:14px;border:2px dashed var(--y);color:var(--cream);font-size:15px}
.a-todo b{color:var(--y)}
.a-note{font-size:15px;color:var(--mute);margin:0}
.t-olive .a-note{color:var(--sand)}
.a-menu[hidden]{display:none}
`;
const JS=`(function(){var b=document.querySelector('.a-burger'),m=document.querySelector('.a-menu');if(!b||!m)return;function set(o){m.hidden=!o;b.setAttribute('aria-expanded',o?'true':'false');document.documentElement.style.overflow=o?'hidden':''}b.addEventListener('click',function(){set(true)});m.querySelectorAll('[data-close],a').forEach(function(e){e.addEventListener('click',function(){set(false)})});document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)})})();\n`;
function stat(page,title,desc,body){
  let hd=lib.header(page)
    .replace('onClick="{{toggleMenu}}" aria-label="Ouvrir le menu" aria-expanded="{{menuOpen}}"','aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="menu"')
    .replace('<sc-if value="{{menuOpen}}" hint-placeholder-val="{{ false }}">\n','')
    .replace('</nav>\n</sc-if>\n','</nav>\n')
    .replace('<nav class="a-menu" aria-label="Menu principal">','<nav class="a-menu" id="menu" aria-label="Menu principal" hidden>')
    .replace('<button class="a-ic" onClick="{{closeMenu}}" aria-label="Fermer le menu">','<button class="a-ic" data-close aria-label="Fermer le menu">')
    .split(' onClick="{{closeMenu}}"').join('');
  let ft=lib.footer(page);
  let html=hd+body+ft;
  html=html.split('href="#conseils"').join('href="Conseils.html"').split('href="/#conseils"').join('href="Conseils.html"');
  if(page!=='Legal.html')for(const x of ['mentions','cgv','confidentialite'])html=html.split('href="#'+x+'"').join('href="Legal.html#'+x+'"');
  const L=page==='Legal.html'?'':'Legal.html';
  html=html.replace('<a href="'+L+'#confidentialite">Confidentialité</a></nav></div>\n</div>\n</footer>','<a href="'+L+'#confidentialite">Confidentialité</a><a href="'+L+'#renoncer">Renoncer au contrat ici</a></nav><span>Site créé par Neuville pour Alpha Since 1982</span></div>\n</div>\n</footer>');
  if(!html.includes('Site créé par Neuville'))throw new Error('credit '+page);
  if(/\{\{|sc-if/.test(html))throw new Error('template left '+page);
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="icon" href="/img/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&amp;family=Roboto+Condensed:wght@400;500;700&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="/site.css">
<script src="/site.js" defer></script>
</head>
<body>
<div class="a-root t-cream">
${html}</div>
</body>
</html>
`;
}
const out=process.argv[2]||'static';
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(out+'/site.css',lib.CSS.trim()+'\n'+EXTRA.trim()+'\n');
fs.writeFileSync(out+'/site.js',JS);
fs.writeFileSync(out+'/Conseils.html',stat('Conseils.html','Alpha Since — Conseils','Ta première séance, ampoules et callosités, ta première traction : les bases pour commencer ou recommencer.',fs.readFileSync(__dirname+'/content_conseils.html','utf8')));
fs.writeFileSync(out+'/Legal.html',stat('Legal.html','Alpha Since — Informations légales','Conditions générales de vente, mentions légales et politique de confidentialité d’Alpha Since 1982.',fs.readFileSync(__dirname+'/content_legal.html','utf8')));
console.log('ok');
