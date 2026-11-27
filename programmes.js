// Programmes (14 octobre 2026) : Alpha ne propose plus de suivi ni de coaching payant.
// On vend des programmes écrits, à suivre seul, chez soi. Ce module :
// 1. crée la page /programmes (fichier Programmes.html, gabarit de la page Bilan) ;
// 2. remplace partout « Coaching » par « Programmes » (menu, navigation, pied de page, bilan adulte) ;
// 3. remplace sur l'accueil la section « Le suivi te fait revenir » et le raccourci « Je veux être suivi ».
// /coaching redirige vers /programmes (vercel.json). Tant qu'un programme n'est pas en vente,
// il est marqué « Bientôt » avec un bouton « Me prévenir » (e-mail prérempli).
// La mention « relu par un professionnel de santé » ne sera ajoutée qu'une fois la relecture faite.
const OLD='https://alpha-since.vercel.app';
const MAIL='alphasince.contact@gmail.com';
const die=m=>{console.error('PROGRAMMES',m);process.exit(1)};
const enc=s=>encodeURIComponent(s).replace(/'/g,'%27');
const P=[
 {nom:'Défi gainage 30 jours',duree:'30 jours',prix:'Offert',unite:'sur demande',pour:'Pour tout le monde, dès le premier jour.',
  txt:'Un test pour fixer ton niveau, un circuit qui change chaque semaine et une séance guidée sur ton téléphone qui enchaîne tout pour toi. 15 à 20 minutes, 5 jours sur 7, sans matériel. À faire à deux : demande-le pour toi et un ami, et le plus gros progrès gagne.'},
 {nom:'S’y remettre en 6 semaines',duree:'6 semaines',prix:'Offert',unite:'sur demande',pour:'Pour ceux qui commencent, ou recommencent.',
  txt:'Un test pour partir à ton niveau, 2 séances de 30 à 35 minutes par semaine avec une chaise et un sac à dos, et une séance guidée sur ton téléphone. Squats, pompes, fentes, rowing : les gestes de la force, appris pas à pas, avant de passer aux charges.'},
 {nom:'Tonicité & fermeté',duree:'12 semaines',prix:'Offert',unite:'sur demande',pour:'Pour les femmes de 40 ans et plus.',
  txt:'Des cuisses, des fessiers et des bras plus fermes, des os plus solides : ça se construit avec de vraies charges, et une paire d’haltères suffit à la maison. 2 à 3 séances par semaine, des séries courtes et lourdes qui progressent chaque semaine. Une version salle pour chaque exercice.'},
 {nom:'Force & carrure',duree:'12 semaines',prix:'Offert',unite:'sur demande',pour:'Pour les hommes qui veulent devenir forts.',
  txt:'Des épaules et un dos qui se dessinent, un ventre plus sec, des charges qui montent chaque semaine. 3 séances par semaine avec des haltères et une barre de traction, ou en salle. Après S’y remettre en 6 semaines, ou si tu as déjà la base.'}

];
module.exports=function(T){
 const B=T['Bilan.html'];
 const h=B.indexOf('<section class="a-sec t-ink a-pghead">'),f=B.indexOf('<footer ');
 if(h<0||f<h)die('gabarit Bilan introuvable');
 let head=B.slice(0,h);
 const TITLE='Programmes d’entraînement à la maison, offerts | Alpha Since';
 const DESC='Des programmes écrits à suivre chez toi, à ton rythme : Défi gainage 30 jours, Tonicité & fermeté, Force & carrure, S’y remettre en 6 semaines. Offerts pendant le lancement, sur simple demande.';
 const rep=(re,v,n)=>{const c=(head.match(re)||[]).length;if(c!==n)die('balise '+re+' : '+c);head=head.replace(re,v)};
 rep(/<title>[^<]*<\/title>/g,'<title>'+TITLE+'</title>',1);
 rep(/<meta property="og:title" content="[^"]*">/g,'<meta property="og:title" content="'+TITLE+'">',1);
 rep(/<meta name="description" content="[^"]*">/g,'<meta name="description" content="'+DESC+'">',1);
 rep(/<meta property="og:description" content="[^"]*">/g,'<meta property="og:description" content="'+DESC+'">',1);
 rep(/(<meta property="og:url" content="[^"]*?)\/bilan">/g,'$1/programmes">',1);
 rep(/(<link rel="canonical" href="[^"]*?)\/bilan">/g,'$1/programmes">',1);
 rep(/<a href="\/bilan" aria-current="page">Bilan<\/a>/g,'<a href="/bilan">Bilan</a>',1);
 head=head.replace(/<script src="\/bilan[^"]*"[^>]*><\/script>\n?/g,'');
 head=head.replace('</head>','<style>'+
  '.p-grid{display:grid;gap:16px}@media (min-width:960px){.p-grid{grid-template-columns:repeat(2,1fr)}}'+
  '.p-card{display:flex;flex-direction:column;gap:12px;padding:24px;border-radius:20px;background:var(--ink);color:var(--cream);border:1px solid rgba(228,225,184,.16)}'+
  '.p-card h3{margin:0;font-family:Anton,Impact,sans-serif;font-weight:400;text-transform:uppercase;font-size:28px;line-height:1.05;letter-spacing:.01em}'+
  '.p-card .p-pour{font-weight:700;color:var(--sand)}.p-card p{margin:0;line-height:1.5}'+
  '.p-meta{display:flex;align-items:baseline;flex-wrap:wrap;gap:6px 12px}.p-meta b{font-size:32px;color:var(--yellow,#F2E415);font-weight:700}.p-meta span{opacity:.8;font-size:15px}'+
  '.p-card .a-btn{margin-top:auto}.p-tags{display:flex;gap:8px;flex-wrap:wrap}'+
  '.p-tag{display:inline-block;padding:4px 10px;border-radius:999px;font-size:13px;font-weight:700;background:rgba(228,225,184,.12)}'+
  '.p-form{display:flex;flex-direction:column;gap:12px}.p-form label{display:flex;flex-direction:column;gap:6px;font-weight:700}.p-form label span{font-weight:400;opacity:.8}.p-form input,.p-form select,.p-form textarea{font:inherit;font-weight:400;padding:12px 14px;border-radius:12px;border:1px solid rgba(18,17,12,.25);background:#fff;color:var(--ink)}.p-form .p-chk{flex-direction:row;align-items:flex-start;gap:10px;font-weight:400}.p-form .p-chk input{width:22px;height:22px;flex:none;margin-top:2px}.p-ok{font-weight:700;margin:0}.p-small{font-size:14px;opacity:.85;margin:0}.p-small a{color:inherit}'+
  '.p-list{margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px;line-height:1.5}'+
  '.a-faq{display:flex;flex-direction:column;gap:10px}.a-faq details{border:1px solid rgba(18,17,12,.18);border-radius:14px;padding:14px 18px;background:rgba(255,255,255,.35)}.a-faq summary{cursor:pointer;font-weight:700;font-size:17px}.a-faq details p{margin:10px 0 0;line-height:1.55}.a-faq a{color:inherit;font-weight:700}'+
  '</style>\n<script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org','@type':'ItemList',name:'Programmes Alpha',
   itemListElement:P.map((p,i)=>({'@type':'ListItem',position:i+1,name:p.nom}))})+'</script>\n</head>');

 const cards=P.map(p=>'<article class="p-card"><div class="p-tags"><span class="p-tag">'+p.duree+'</span><span class="p-tag" style="background:var(--yellow,#F2E415);color:var(--ink)">Offert</span></div>'+
   '<h3>'+p.nom+'</h3><p class="p-pour">'+p.pour+'</p><p>'+p.txt+'</p>'+
   '<div class="p-meta"><b>'+p.prix+'</b>'+(p.unite?'<span>'+p.unite+'</span>':'')+'</div>'+
   '<a class="a-btn a-btn-y" href="#demande" data-prog="'+p.nom+'">Demander ce programme</a></article>').join('');
 const opts=P.map(p=>'<option>'+p.nom+'</option>').join('');
 const DEMANDE='<section class="a-sec t-olive" id="demande"><div class="a-wrap a-narrow a-stack">\n'+
  '<h2 class="a-h2">Demander un programme</h2>\n'+
  '<p class="a-lead">Dis-moi qui tu es et ce que tu cherches. Je lis chaque demande et je t’envoie moi-même ton programme : le PDF et ta séance guidée sur téléphone. C’est offert.</p>\n'+
  '<form class="p-form" id="p-form" novalidate>'+
  '<label>Ton prénom<input name="prenom" autocomplete="given-name" required maxlength="60"></label>'+
  '<label>Ton e-mail<input name="email" type="email" inputmode="email" autocomplete="email" required maxlength="254"></label>'+
  '<label>Le programme<select name="programme" required>'+opts+'<option>Je ne sais pas, conseille-moi</option></select></label>'+
  '<label>Ton objectif, d’où tu pars <span>(facultatif)</span><textarea name="message" rows="4" maxlength="1500" placeholder="Ex. : je reprends après 3 ans sans sport, je veux retrouver de la force pour le dos."></textarea></label>'+
  '<label class="p-chk"><input type="checkbox" name="news" value="1"> <span>Je veux aussi recevoir le conseil du dimanche (un e-mail par semaine, désinscription à tout moment).</span></label>'+
  '<input type="text" name="site" tabindex="-1" autocomplete="off" aria-hidden="true" class="a-news-hp">'+
  '<button class="a-btn a-btn-y" type="submit">Envoyer ma demande</button>'+
  '<p class="p-ok" role="status" hidden></p>'+
  '<p class="p-small">Ton prénom, ton e-mail et ton message servent uniquement à te répondre et à t’envoyer le programme. <a href="/legal#confidentialite">Confidentialité</a>. Le formulaire ne marche pas ? Écris à <a href="mailto:'+MAIL+'?subject='+enc('Demande de programme')+'">'+MAIL+'</a>.</p>'+
  '</form>\n</div></section>\n';
 const FORMJS='<script>(function(){var f=document.getElementById("p-form");if(!f)return;'+
  'document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("[data-prog]");if(a){var s=f.querySelector("select");s.value=a.getAttribute("data-prog")}});'+
  'f.addEventListener("submit",function(e){e.preventDefault();var ok=f.querySelector(".p-ok"),b=f.querySelector("button[type=submit]"),d={};["prenom","email","programme","message","site"].forEach(function(k){d[k]=(f.elements[k].value||"").trim()});d.news=f.elements.news.checked;'+
  'if(!d.prenom||!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(d.email)){ok.hidden=false;ok.textContent="Indique ton prénom et un e-mail valide.";return}'+
  'b.disabled=true;ok.hidden=false;ok.textContent="Envoi…";'+
  'fetch("/api/demande",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(d)}).then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok||!j.ok)throw 0})})'+
  '.then(function(){f.reset();ok.textContent="Merci, ta demande est bien arrivée. Je te réponds par e-mail, en général sous 48 heures. Pense à regarder tes courriers indésirables."})'+
  '.catch(function(){ok.textContent="L’envoi n’a pas marché. Écris-moi directement à '+MAIL+'."}).then(function(){b.disabled=false})})})()</script>';


 const Q=[
  ['C’est vraiment offert ?','Oui, pendant la phase de lancement. Tu fais ta demande, je te réponds personnellement et je t’envoie le PDF et ta séance guidée. Pas de carte bancaire, pas d’abonnement.'],
  ['Pourquoi c’est offert ?','Parce qu’un programme ne sert que s’il est suivi. Je préfère savoir à qui je l’envoie, l’accompagner au départ, et avoir ton avis à la fin pour l’améliorer.'],
  ['Il y a un suivi ou un coach ?','Non. Les programmes sont écrits pour être suivis seul, à ton rythme : chaque séance est expliquée, avec une version plus facile et une version plus dure de chaque exercice. Pour savoir par lequel commencer, fais le <a href="/bilan">bilan Alpha gratuit</a>.'],
  ['Il faut du matériel ?','Pour le Défi gainage, rien. Pour S’y remettre en 6 semaines, une chaise, un sac à dos et un tapis. Pour Tonicité & fermeté et Force & carrure, une paire d’haltères réglables (et une barre de traction pour Force & carrure). Chaque exercice a aussi sa version salle.'],
  ['Je reprends après une longue pause, ou j’ai un problème de santé.','Demande l’avis de ton médecin avant de commencer. Les programmes ne remplacent pas un avis médical, et en cas de douleur, on s’arrête.'],
 ];
 const body=
  '<section class="a-sec t-ink a-pghead"><div class="a-wrap a-narrow">\n'+
  '<p class="a-kick a-crumb">Offerts pendant le lancement · à suivre chez toi</p>\n'+
  '<h1 class="a-h1 a-h1-sm">Programmes Alpha</h1>\n'+
  '<p class="a-lead">Des programmes écrits, à suivre seul et à ton rythme, avec une séance guidée sur ton téléphone. Pendant le lancement, ils sont offerts : fais ta demande, je t’envoie ton accès.</p>\n'+
  '</div></section>\n'+
  '<section class="a-sec t-cream"><div class="a-wrap"><div class="p-grid">'+cards+'</div></div></section>\n'+DEMANDE+
  '<section class="a-sec t-cream"><div class="a-wrap a-narrow a-stack">\n'+
  '<h2 class="a-h2">Comment ils sont construits</h2>\n'+
  '<ul class="p-list"><li><b>De vraies charges</b> : c’est la charge qui construit la force et protège les os. À la maison, une paire d’haltères suffit ; chaque exercice a sa version salle.</li>'+
  '<li><b>Des séries près de l’effort maximal</b> : 6 à 12 répétitions selon la phase, en gardant 1 ou 2 répétitions en réserve.</li>'+
  '<li><b>Par petits paliers</b> : des répétitions d’abord, puis de la charge. Pas de saut de niveau brutal.</li>'+
  '<li><b>Le gainage au chrono</b>, dans chaque séance, et le Défi gainage 30 jours pour s’y mettre.</li>'+
  '<li><b>Le pourquoi de chaque exercice</b> : tu sais ce que tu travailles, et pourquoi.</li>'+
  '<li><b>La base avant tout</b> : sommeil, récupération, régularité. C’est la discipline qui fait progresser, pas une séance héroïque.</li></ul>\n'+
  '<h2 class="a-h2">Qui les écrit</h2>\n'+
  '<p>Clément. Enfant, il était très maigre ; depuis ses 10 ans, il cherche à comprendre comment devenir plus fort. Plus de 30 ans plus tard, il a été joueur puis entraîneur de rugby, et il a appris aux côtés de préparateurs physiques, de kinés, d’ostéopathes, de médecins et d’anciens joueurs professionnels ce qui fait vraiment progresser, sans se blesser. Ces programmes rassemblent ce qu’il a retenu de chacun d’eux.</p>\n'+
  '<p class="a-note">Les programmes sont des conseils d’entraînement généraux. Ils ne remplacent pas l’avis d’un médecin. En cas de douleur, de malaise ou de problème de santé, arrête et consulte.</p>\n'+
  '</div></section>\n'+
  '<section class="a-sec t-khaki"><div class="a-wrap a-narrow a-stack">\n<h2 class="a-h2">Questions fréquentes</h2>\n<div class="a-faq">'+
  Q.map(([q,r])=>'<details><summary>'+q+'</summary><p>'+r+'</p></details>').join('')+'</div>\n'+
  '<div class="a-ctas"><a class="a-btn a-btn-y" href="/bilan">Faire mon bilan gratuit</a></div>\n</div></section>\n';
 T['Programmes.html']=head+body+FORMJS+B.slice(f);

 // 2. « Coaching » devient « Programmes » partout.
 let n=0;
 const swapAll=(a,b)=>{for(const k of Object.keys(T)){if(k==='Suivi.dc.html'||typeof T[k]!=='string'||!(k.endsWith('.html')||k.endsWith('.js')))continue;const c=T[k].split(a).length-1;if(c){n+=c;T[k]=T[k].split(a).join(b)}}};
 swapAll('<b>Coaching</b><span>Un suivi personnalisé, sans engagement</span>','<b>Programmes</b><span>Offerts pendant le lancement</span>');
 swapAll('<a href="/coaching">Coaching</a>','<a href="/programmes">Programmes</a>');
 swapAll('href="/coaching">Être accompagné par un coach</a>','href="/programmes">Voir les programmes</a>');
 swapAll('href="/coaching"','href="/programmes"');
 // La page Programmes elle-même : lien en cours dans la navigation.
 T['Programmes.html']=T['Programmes.html'].replace('<a href="/programmes">Programmes</a></nav>','<a href="/programmes" aria-current="page">Programmes</a></nav>');
 if(!T['Programmes.html'].includes('aria-current="page">Programmes'))T['Programmes.html']=T['Programmes.html'].replace(/(<nav class="a-nav"[^>]*>[\s\S]*?)<a href="\/programmes">/,'$1<a href="/programmes" aria-current="page">');

 // 3. L'accueil.
 let M=T['Main.dc.html'];
 const a=M.indexOf('<section id="suivi" class="a-sec t-olive">'),b=M.indexOf('</section>',a);
 if(a<0||b<0)die('section « suivi » de l’accueil introuvable');
 const sec=M.slice(a,b+10);
 if(!sec.includes('Le suivi te fait revenir'))die('section « suivi » inattendue');
 M=M.slice(0,a)+'<section id="programmes" class="a-sec t-olive">\n<div class="a-wrap a-coach">\n<div class="a-stack a-rv">\n'+
  '<h2 class="a-h2">La motivation te fait commencer. <span class="a-y">Un bon programme te fait continuer.</span></h2>\n'+
  '<p class="a-lead">Devenir plus fort, le redevenir, et rester en bonne santé. Des programmes écrits par Clément, à suivre chez toi, à ton rythme. Offerts pendant le lancement.</p>\n'+
  '</div>\n<div class="a-coach-box a-rv">\n<span class="a-kick">Pendant le lancement</span>\n<span class="a-price">Offerts</span>\n'+
  '<ul><li>Défi gainage 30 jours</li><li>Tonicité &amp; fermeté</li><li>Force &amp; carrure</li><li>S’y remettre en 6 semaines</li></ul>\n'+
  '<a class="a-btn a-btn-y" href="/programmes">Voir les programmes</a>\n</div>\n</div>\n</section>'+M.slice(b+10);
 const r='<a class="a-route" href="/programmes"><span class="a-route-t"><b>Je veux être suivi</b><span>Un coach qui part de ton bilan et ajuste ton programme. Sans engagement.</span></span>';
 if(M.split(r).length!==2)die('raccourci « Je veux être suivi » introuvable');
 M=M.split(r).join('<a class="a-route" href="/programmes"><span class="a-route-t"><b>Je veux un programme</b><span>Un programme écrit, à suivre chez toi, à ton rythme. Offert pendant le lancement.</span></span>');
 T['Main.dc.html']=M;

 // Contrôle : plus aucun lien vers /coaching dans les pages publiées (la page Coaching elle-même mise à part).
 const reste=Object.keys(T).filter(k=>k!=='Suivi.dc.html'&&typeof T[k]==='string'&&(k.endsWith('.html')||k.endsWith('.js'))&&T[k].includes('href="/coaching"'));
 if(reste.length)die('liens /coaching restants : '+reste.join(' '));
 console.log('PROGRAMMES ok page /programmes,',n,'liens Coaching remplacés');
};
