const { chromium } = require('playwright');const fs=require('fs'),path=require('path');
const base={parent:['1'],sexe:'H',age:'4',classe:'1',grandi:'0',dehors:'2',activite:'1',seances:'1',ecole:'actif',sait35:['courir','pieds','unpied','escalier'],aime:'2',som35:'3',coucher:'2',ecran:'1',ecranSoir:'0',ecranChambre:'0',pdj:'2',gouter:'2',boissons:'2',legumes:'2',sante:'0',douleur:['non'],arretb:'0',temps:'10j',lieu:'jardin',materiel:['ballon']};
const X=(o)=>{const a=Object.assign({},base,o);for(const k in a)if(a[k]===null)delete a[k];return a};
const SC={
 A_4ans_bien:X({}),
 B_fille3_sedentaire:X({sexe:'F',age:'3',classe:'0',dehors:'0',activite:'0',seances:null,ecole:'non',sait35:['non'],aime:'1',som35:'1',coucher:'0',ecran:'2',ecranSoir:'2',ecranChambre:'2',pdj:'1',gouter:'1',boissons:'0',legumes:'0',temps:'we',lieu:'int',materiel:['non']}),
 C_6ans_grandit_douleur:X({age:'6',classe:'2',grandi:'1',sait35:null,sait67:['cloche','attraper'],som35:null,som610:'2',douleur:['jambes'],douleurT:'1',boite:'0',aime:'0',lieu:'int',materiel:['non'],matchs:'0'}),
 D_fille7_boite:X({sexe:'F',age:'7',classe:'2',sait35:null,sait67:['cloche','attraper','velo','roulade','eau','corde'],som35:null,som610:'3',douleur:['sport','autre'],douleurT:'1',boite:'1',sante:'1',matchs:'1',seances:'2'}),
 E_9ans_mono_defis:X({age:'9',classe:'3',sait35:null,sait810:['velo','corde','dribble','roue','grimpe'],som35:null,som610:'2',activite:'1',seances:'3',matchs:'2',ecran:'3',temps:'20x3',materiel:['ballon','corde','velo'],flamant:'22',saut:'1.35',mur:'7',cordeType:'c',corde:'18'}),
 F_fille10_reeducation:X({sexe:'F',age:'10',classe:'3',sait35:null,sait810:['nager','corde'],som35:null,som610:'1',arretb:'1',matchs:'1',seances:'2',cordeType:'l',corde:'24',flamant:'40'}),
 G_8ans_tout_bon:X({age:'8',classe:'3',sait35:null,sait810:['nager','velo','corde','dribble','roue','grimpe'],som35:null,som610:'3',activite:'2',seances:'2',matchs:'1',lieu:'parc'}),
 H_5ans_weekend:X({age:'5',dehors:'1',activite:'0',seances:null,ecole:'voiture',sait35:['courir','pieds'],legumes:'0',gouter:'0',temps:'we',materiel:['corde'],arretb:'3'}),
 I_7ans_douleur_longue:X({age:'7',classe:'2',sait35:null,sait67:['cloche'],som35:null,som610:'2',douleur:['jambes'],douleurT:'2',boite:'0',matchs:'0'})};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});let bad=0;
const route=async p=>p.route('**/*',r=>{const u=new URL(r.request().url());if(u.hostname!=='local.test')return r.abort();
  let fp=path.join('out',u.pathname);if(!fs.existsSync(fp)||fs.statSync(fp).isDirectory())return r.fulfill({status:404,body:''});
  const ct=fp.endsWith('.css')?'text/css':fp.endsWith('.js')?'text/javascript; charset=utf-8':'text/html; charset=utf-8';r.fulfill({status:200,contentType:ct,body:fs.readFileSync(fp)})});
for(const n in SC){const ctx=await b.newContext({viewport:{width:390,height:780}});const p=await ctx.newPage();await route(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(a=>{localStorage.setItem('alpha.kids.v1',JSON.stringify({step:5,a:a,c:{prenom:'Test',email:'t@t.fr',club:'Baby hand'},done:true}))},SC[n]);
 await p.goto('http://local.test/KidsBilan.html');await p.waitForTimeout(400);
 const r=await p.evaluate(()=>{const R=document.getElementById('bilan');const q=(s)=>[...R.querySelectorAll(s)].map(e=>e.innerText.replace(/\s+/g,' ').trim());
  [...R.querySelectorAll('details')].forEach(d=>d.open=true);
  return{txt:R.innerText,html:R.innerHTML,pyr:q('.b-fl'),card:q('.b-profile')[0],prio:q('.b-prio li'),warn:q('.b-warn'),games:q('details.b-sess summary'),notes:q('.b-notes li'),stats:q('.b-stats div'),rows:q('.b-rows>div'),sum:(document.getElementById('b-sum')||{}).textContent,fiche:(R.querySelector('a[download]')||{}).href,sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,over:[...R.querySelectorAll('*')].filter(e=>e.getBoundingClientRect().right>document.documentElement.clientWidth+1).length}});
 const flags=['undefined','NaN','null','[object','{il}','{Il}','{e}','{le}','{soi}'].filter(x=>(r.txt+(r.sum||'')).indexOf(x)>=0);
 if(errs.length||flags.length||r.sw>r.cw||r.over||r.prio.length!==3||r.games.length!==3)bad++;
 console.log('\n=====',n,'| erreurs:',errs.join(';')||'aucune','| drapeaux:',flags.join(',')||'aucun','| largeur',r.sw,'/',r.cw,'débords',r.over,'| fiche',r.fiche);
 console.log('PYR',r.pyr.join(' | '));console.log('CARTE',r.card);if(r.warn.length)console.log('ALERTE',r.warn.join(' | '));
 r.prio.forEach(x=>console.log('  P>',process.argv[2]==='full'?x:x.slice(0,70)));console.log('JEUX',r.games.join(' | '));console.log('NOTES',r.notes.join(' | '));if(r.rows.length)console.log('DEFIS',r.rows.join(' | '));
 if(process.argv[2]==='full'||n==='E_9ans_mono_defis'||n==='B_fille3_sedentaire')console.log('RESUME\n'+r.sum);
 if(n==='B_fille3_sedentaire'||n==='E_9ans_mono_defis')await p.screenshot({path:'res-'+n+'.png',fullPage:true});
 await ctx.close()}
console.log('\nSCENARIOS EN ECHEC :',bad);await b.close()})();
