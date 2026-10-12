const { chromium } = require('playwright');const fs=require('fs'),path=require('path');
const base={sexe:'H',age:'16',taille:'176',poids:'64',grandi:'1',gene:['non'],club:'2',type:'terrain',annees:'3',entr:'3',matchs:'2',saison:'saison',eps:'0',muscu:'2',metier:'assis',actif:'2',sante:'0',arretb:'0',stress:'1',sommeil:'3',sommeilq:'2',tel:'1',pdj:'2',prot:'2',legumes:'1',plats:'2',boissons:'2',compl:['prot','crea'],pompesType:'p',pompes:'32',planche:'95',course:'4',objectif:'terrain',freq:'3',duree:'45',moment:'soir',lieu:'club'};
const X=(o)=>{const a=Object.assign({},base,o);for(const k in a)if(a[k]===null)delete a[k];return a};
const SC={
 A_club_saison:X({}),
 B_debutante:X({sexe:'F',age:'15',taille:'162',poids:'52',club:'0',type:null,annees:null,entr:null,matchs:null,saison:null,muscu:'0',actif:'0',stress:'2',sommeil:'1',sommeilq:'0',tel:'0',pdj:'0',prot:'0',legumes:'0',plats:'0',boissons:'0',compl:['boost'],pompesType:'g',pompes:'6',planche:'25',course:'2',objectif:'forme',freq:'3',duree:'20',moment:'we',lieu:'sans'}),
 C_croissance:X({age:'15',grandi:'2',gene:['genou','talon'],saison:'prep',matchs:'1',entr:'2',muscu:'1',compl:['non'],objectif:'explo',freq:'2',duree:'30',lieu:'maison',chaise:'70',saut:'205',soup:'3',run3:'14'}),
 D_blesse:X({saison:'blesse',sante:'1',matchs:'0',entr:'1',compl:['non'],objectif:'muscle',freq:'3',lieu:'salle'}),
 E_ancien:X({age:'17',club:'1',entr:null,matchs:null,saison:null,arretb:'1',muscu:'3',pompes:'45',planche:'130',course:'5',compl:['crea'],objectif:'force',freq:'3',duree:'45',lieu:'salle',moment:'matin'}),
 G_plus3mois:X({arretb:'3',matchs:'1',entr:'2',compl:['non']}),
 H_ancienne_reponse:X({arretb:'2',matchs:'1',entr:'2',compl:['non']}),
 I_moins3mois_horsclub:X({club:'0',type:null,annees:null,entr:null,matchs:null,saison:null,arretb:'1',compl:['crea'],tel:'0',lieu:'maison'}),
 F_endurance:X({sexe:'F',age:'17',poids:'58',taille:'168',club:'2',type:'endurance',matchs:'1',saison:'coupure',metier:'physique',eps:'unss',compl:['non'],objectif:'endurance',freq:'3',duree:'30',moment:'we',lieu:'sans',muscu:'0',saut:'1.62'})};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'}).catch(()=>chromium.launch());
const route=async p=>p.route('**/*',r=>{const u=new URL(r.request().url());if(u.hostname!=='local.test')return r.abort();
  let fp=path.join('out',u.pathname);if(!fs.existsSync(fp)||fs.statSync(fp).isDirectory())return r.fulfill({status:404,body:''});
  const ct=fp.endsWith('.css')?'text/css':fp.endsWith('.js')?'text/javascript; charset=utf-8':'text/html; charset=utf-8';r.fulfill({status:200,contentType:ct,body:fs.readFileSync(fp)})});
let bad=0;
for(const n in SC){const ctx=await b.newContext({viewport:{width:390,height:780}});const p=await ctx.newPage();await route(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(a=>{localStorage.setItem('alpha.espoir.v1',JSON.stringify({step:6,a:a,c:{prenom:'Test',email:'t@t.fr',club:'US Test'},done:true}))},SC[n]);
 await p.goto('http://local.test/EspoirBilan.html');await p.waitForTimeout(400);
 const r=await p.evaluate(()=>{const R=document.getElementById('bilan');const q=(s)=>[...R.querySelectorAll(s)].map(e=>e.innerText.replace(/\s+/g,' ').trim());
  [...R.querySelectorAll('details')].forEach(d=>d.open=true);
  return{txt:R.innerText,profil:q('.b-profile h2')[0],code:q('.b-code')[0],prio:q('.b-prio li b'),warn:q('.b-warn'),rdv:q('.a-box')[0],sess:[...R.querySelectorAll('details.b-sess')].map(d=>d.querySelector('summary').innerText.replace(/\s+/g,' ')+' || '+[...d.querySelectorAll('li b')].map(e=>e.innerText).join(', ')+' || '+[...d.querySelectorAll('li em')].map(e=>e.innerText)[0]+' || '+[...d.querySelectorAll(':scope>p')].map(e=>e.innerText).slice(-2).join(' / ')),notes:q('.b-notes li'),stats:q('.b-stats div'),rows:q('.b-rows>div'),sum:document.getElementById('b-sum').textContent,sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,over:[...R.querySelectorAll('*')].filter(e=>e.getBoundingClientRect().right>document.documentElement.clientWidth+1).length}});
 const flags=['undefined','NaN','null','[object'].filter(x=>r.txt.indexOf(x)>=0);
 if(errs.length||flags.length||r.sw>r.cw||r.over)bad++;
 console.log('\n=====',n,'| erreurs:',errs.join(';')||'aucune','| drapeaux:',flags.join(',')||'aucun','| largeur',r.sw,'/',r.cw,'débords',r.over);
 console.log('PROFIL',r.profil,'|',r.code);console.log('PRIO',r.prio.join(' | '));if(r.warn.length)console.log('ALERTES',r.warn.join(' | '));
 console.log('RDV',r.rdv);r.sess.forEach(s=>console.log('  S>',s));console.log('NOTES',r.notes.join(' | '));console.log('STATS',r.stats.join(' | '));console.log('REPERES',r.rows.join(' | '));
 if(n==='A_club_saison'||n==='C_croissance')console.log('RESUME\n'+r.sum);
 if(n==='A_club_saison'||n==='B_debutante'){await p.screenshot({path:'res-'+n+'.png',fullPage:true})}
 await ctx.close()}
console.log('\nSCENARIOS EN ECHEC :',bad);await b.close()})();
