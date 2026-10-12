const { chromium } = require('playwright');const fs=require('fs'),path=require('path');
const base={parent:['1'],sexe:'H',age:'13',taille:'158',grandi:'1',club:'2',type:'terrain',sport2:'0',entr:'2',matchs:'1',eps:'0',actif:'1',gene:['non'],maladroit:'0',sante:'0',arretb:'0',stress:'1',sommeil:'2',ecran:'1',pdj:'2',gouter:'2',boissons:'2',planche:'45',equilibre:'14',squat:'2',course:'4',objectif:'terrain',freq:'2',duree:'15',avec:'seul',materiel:'rien'};
const X=(o)=>{const a=Object.assign({},base,o);for(const k in a)if(a[k]===null)delete a[k];return a};
const SC={
 A_club:X({}),
 B_demarrage:X({sexe:'F',age:'11',club:'0',type:null,sport2:null,entr:null,matchs:null,actif:'0',sommeil:'1',ecran:'0',pdj:'0',gouter:'1',boissons:'0',planche:'12',equilibre:'4',squat:'0',course:'1',objectif:'debut',freq:'1',duree:'20',avec:'parent',materiel:'petit'}),
 C_croissance:X({age:'12',grandi:'2',maladroit:'2',gene:['genou','talon'],geneT:'1',equilibre:'6',squat:'1',objectif:'explo',duree:'20',materiel:'petit',pompesType:'g',pompes:'8',saut:'155',soup:'2'}),
 D_douleur_longue:X({gene:['dos'],geneT:'2',sante:'1'}),
 E_charge_club:X({age:'14',entr:'4',matchs:'2',sport2:'0',freq:'2',duree:'20',objectif:'explo',equilibre:'25',planche:'95',course:'5',avec:'copain'}),
 F_reeducation:X({arretb:'1',objectif:'solide',duree:'10'}),
 G_plus3mois_eps:X({arretb:'3',club:'1',entr:null,matchs:null,sport2:null,objectif:'eps',actif:'2',stress:'2'})};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});let bad=0;
for(const n in SC){const ctx=await b.newContext({viewport:{width:390,height:780}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route('**/*',r=>{const u=new URL(r.request().url());if(u.hostname!=='local.test')return r.abort();let fp=path.join('out',u.pathname);if(!fs.existsSync(fp)||fs.statSync(fp).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,contentType:fp.endsWith('.css')?'text/css':fp.endsWith('.js')?'text/javascript; charset=utf-8':'text/html; charset=utf-8',body:fs.readFileSync(fp)})});
 await p.addInitScript(a=>{localStorage.setItem('alpha.ado.v1',JSON.stringify({step:6,a:a,c:{prenom:'Test',email:'parent@t.fr',club:'US Test'},done:true}))},SC[n]);
 await p.goto('http://local.test/AdoBilan.html');await p.waitForTimeout(350);
 const r=await p.evaluate(()=>{const R=document.getElementById('bilan');const q=(s)=>[...R.querySelectorAll(s)].map(e=>e.innerText.replace(/\s+/g,' ').trim());[...R.querySelectorAll('details')].forEach(d=>d.open=true);
  return{txt:R.innerText,profil:q('.b-profile h2')[0],code:q('.b-code')[0],pyr:q('.b-fl').join(' / '),prio:q('.b-prio li b'),warn:q('.b-warn'),box:q('.a-box:not(.b-warn)'),sess:[...R.querySelectorAll('details.b-sess')].map(d=>d.querySelector('summary').innerText.replace(/\s+/g,' ')+' || '+[...d.querySelectorAll('li')].map(e=>e.querySelector('b').innerText+(e.querySelector('em')?' ('+e.querySelector('em').innerText+')':'')).join(', ')+' || '+[...d.querySelectorAll(':scope>p')].map(e=>e.innerText).slice(-2,-1).join('')),notes:q('.b-notes li'),stats:q('.b-stats div'),rows:q('.b-rows>div'),sum:document.getElementById('b-sum').textContent,sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,over:[...R.querySelectorAll('*')].filter(e=>e.getBoundingClientRect().right>document.documentElement.clientWidth+1).length}});
 const flags=['undefined','NaN','null','[object'].filter(x=>r.txt.indexOf(x)>=0);
 if(errs.length||flags.length||r.sw>r.cw||r.over)bad++;
 console.log('\n=====',n,'| erreurs:',errs.join(';')||'aucune','| drapeaux:',flags.join(',')||'aucun','| largeur',r.sw,'/',r.cw,'débords',r.over);
 console.log('PROFIL',r.profil,'|',r.code);console.log('PYR',r.pyr);console.log('PRIO',r.prio.join(' | '));if(r.warn.length)console.log('ALERTES',r.warn.join(' | '));
 r.sess.forEach(s=>console.log('  S>',s));console.log('NOTES',r.notes.join(' | '));console.log('REPERES',r.rows.join(' | '));
 console.log('BOITES',r.box.join(' ## '));
 if(n==='A_club'||n==='C_croissance')console.log('RESUME\n'+r.sum);
 if(n==='A_club'||n==='B_demarrage'||n==='D_douleur_longue')await p.screenshot({path:'res-'+n+'.png',fullPage:true});
 await ctx.close()}
console.log('\nSCENARIOS EN ECHEC :',bad);await b.close()})();
