const { chromium } = require('playwright');const fs=require('fs'),path=require('path');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:390,height:780}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>{const u=new URL(r.request().url());if(u.hostname!=='local.test')return r.abort();let n=u.pathname==='/kids/bilan'?'/KidsBilan.html':u.pathname;
  let fp=path.join('out',n);if(!fs.existsSync(fp)||fs.statSync(fp).isDirectory())return r.fulfill({status:404,body:''});
  const ct=fp.endsWith('.css')?'text/css':fp.endsWith('.js')?'text/javascript; charset=utf-8':fp.endsWith('.pdf')?'application/pdf':'text/html; charset=utf-8';r.fulfill({status:200,contentType:ct,body:fs.readFileSync(fp)})});
const cdp=await ctx.newCDPSession(p);await cdp.send('Page.enable');let mail=null;cdp.on('Page.frameRequestedNavigation',e=>{if(e.url.startsWith('mailto:'))mail=e.url});
await p.goto('http://local.test/kids/bilan');await p.waitForTimeout(300);
console.log('accueil : bouton Commencer avant la case ?',!!(await p.$('[data-act=start]')),'| noindex',await p.evaluate(()=>!!document.querySelector('meta[name=robots][content=noindex]')));
await p.screenshot({path:'k-intro.png',fullPage:true});
await p.click('[data-k=parent]');await p.click('[data-act=start]');
const pick=async(k,v)=>{await p.click('[data-k="'+k+'"][data-v="'+v+'"]');await p.waitForTimeout(60)};
const next=async()=>{await p.click('[data-act=next]');await p.waitForTimeout(150)};
const head=async()=>p.evaluate(()=>document.querySelector('#bilan h2').innerText+' | '+[...document.querySelectorAll('#bilan legend')].map(e=>e.innerText).join(' / '));
const al=async q=>p.evaluate(q=>{const e=document.querySelector('[data-q="'+q+'"] [role=alert]');if(!e)return null;const r=e.getBoundingClientRect();return{vis:r.top>=0&&r.bottom<=innerHeight+1,t:e.innerText.replace(/\n/g,' | ').slice(0,120)}},q);
// étape 1
await next();console.log('étape 1 sans réponse → erreur affichée',await p.evaluate(()=>!document.querySelector('.b-err').hidden));
await pick('sexe','F');await pick('age','9');await pick('classe','3');await pick('grandi','0');console.log('1>',await head());await p.screenshot({path:'k-step1.png',fullPage:true});await next();
console.log('2>',await head());
await pick('dehors','1');await pick('activite','1');await pick('seances','2');await pick('matchs','1');await pick('ecole','voiture');await pick('sait810','nager');await pick('sait810','velo');await pick('sait810','corde');await pick('aime','2');await p.screenshot({path:'k-step2.png',fullPage:true});await next();
console.log('3>',await head());
await pick('som610','2');await pick('coucher','1');
await pick('ecran','3');console.log('  alerte écrans >2h :',JSON.stringify(await al('ecran')));await pick('ecran','1');console.log('  après <1h :',await al('ecran'));
await pick('ecranSoir','2');console.log('  alerte écran du soir :',JSON.stringify(await al('ecranSoir')));await p.screenshot({path:'k-alerte.png'});await pick('ecranSoir','1');
await pick('ecranChambre','2');console.log('  alerte écran chambre :',JSON.stringify(await al('ecranChambre')));await pick('ecranChambre','0');
await pick('pdj','2');await pick('gouter','1');await pick('boissons','2');await pick('legumes','1');await next();
console.log('4>',await head());
await pick('sante','0');await pick('douleur','jambes');console.log('  questions après douleur :',await head());await pick('douleurT','1');await pick('boite','1');console.log('  alerte boiterie :',JSON.stringify(await al('boite')));await pick('boite','0');await pick('arretb','0');await next();
console.log('5>',await head());
await pick('temps','20x3');await pick('lieu','jardin');await pick('materiel','ballon');await pick('materiel','corde');
await p.fill('[data-k=flamant]','35');await p.fill('[data-k=saut]','1.4');await p.fill('[data-k=mur]','12');await pick('cordeType','c');await p.fill('[data-k=corde]','22');await p.screenshot({path:'k-step5.png',fullPage:true});
await next();
const res=await p.evaluate(()=>({h:[...document.querySelectorAll('#bilan .b-h')].map(e=>e.innerText),rows:[...document.querySelectorAll('.b-rows>div')].map(e=>e.innerText.replace(/\s+/g,' ')),prio:[...document.querySelectorAll('.b-prio li b')].map(e=>e.innerText),step:JSON.parse(localStorage.getItem('alpha.kids.v1')).a}));
console.log('résultat : titres',res.h.join(' · '));console.log('priorités',res.prio.join(' | '));console.log('défis',res.rows.join(' | '),'| saut enregistré',res.step.saut,'| mur hors limites enregistré ?',res.step.mur);
await p.screenshot({path:'k-result.png',fullPage:true});
// envoi
await p.click('[data-act=send]');console.log('envoi sans coordonnées → erreur',await p.evaluate(()=>!document.getElementById('b-cerr').hidden));
await p.fill('[data-c=prenom]','Lina');await p.fill('[data-c=email]','parent@exemple.fr');await p.click('[data-act=send]');await p.waitForTimeout(300);
if(mail){const u=new URL(mail);console.log('mail à',u.pathname,'| objet',u.searchParams.get('subject'));console.log(u.searchParams.get('body'))}else console.log('PAS DE MAIL');
// fiche
const href=await p.evaluate(()=>document.querySelector('a[download]').getAttribute('href'));console.log('fiche',href,fs.existsSync('out'+href));
// recommencer
await p.click('[data-act=reset]');await p.waitForTimeout(200);console.log('après Refaire : accueil',await p.evaluate(()=>!!document.querySelector('[data-k=parent]')),'| case décochée',await p.evaluate(()=>document.querySelector('[data-k=parent]').getAttribute('aria-pressed')));
console.log('erreurs',errs.join(';')||'aucune');await b.close()})();
