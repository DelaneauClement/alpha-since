module.exports=function(T){
const A='<section id="outils"',B='<section id="suivi"';
const M=T['Main.dc.html'],i=M.indexOf(A),j=M.indexOf(B);
if(i<0||j<0||M.indexOf(A,i+1)>=0)throw new Error('SECT');
const pillars=M.slice(i,j);
const K='font-size: 14px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase';
const card=(href,bg,fg,sub,kick,title,desc)=>'<a href="'+href+'" style="display: flex; align-items: center; gap: 14px; background: '+bg+'; color: '+fg+'; border-radius: 16px; padding: 18px; text-decoration: none"><div style="display: flex; flex-direction: column; gap: 4px; flex-grow: 1"><span style="font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: '+kick+'">'+sub+'</span><span style="font-family: Anton, Impact, sans-serif; font-size: 26px; line-height: 1.05; text-transform: uppercase">'+title+'</span><span style="font-size: 15px; line-height: 1.35">'+desc+'</span></div><span aria-hidden="true" style="width: 44px; height: 44px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: {{accent}}; border-radius: 999px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#12110C" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="13 6 19 12 13 18"></polyline></svg></span></a>\n';
const teaser='<section id="outils" style="display: flex; flex-direction: column; gap: 14px; padding: 40px 20px; background: #E4E1B8">\n'
+'<div style="'+K+'; color: #4A4620">Les outils Alpha · gratuits</div>\n'
+'<h2 style="margin: 0; font-family: Anton, Impact, sans-serif; font-weight: 400; font-size: 40px; line-height: 1; text-transform: uppercase">Trois piliers. Zéro blabla.</h2>\n'
+'<p style="margin: 0 0 6px; font-size: 17px; line-height: 1.45">Calculateurs, chrono, mini-audits : tout est gratuit et sans inscription.</p>\n'
+card('Outils.dc.html#outils','#12110C','#E4E1B8','Pilier 1','{{accent}}',"S'entraîner, sans subir",'Charge max, disques, chrono, quiz matos et playlists.')
+card('Outils.dc.html#recuperer','#807C3A','#12110C','Pilier 2','#12110C',"Récupérer, c'est s'entraîner",'Quand s’étirer, routine souplesse guidée, audit sommeil.')
+card('Outils.dc.html#manger','#4A4620','#E4E1B8','Pilier 3','{{accent}}','Bien manger','Quiz nutrition, hydratation, compléments et plan alimentaire.')
+'<a href="Outils.dc.html" style="align-self: flex-start; min-height: 44px; display: flex; align-items: center; color: #12110C; font-weight: 700; font-size: 18px">Voir tous les outils →</a>\n'
+'</section>\n';
const LOC=['outils','recuperer','sommeil','quiz','manger'];
const re=new RegExp('href="#('+LOC.join('|')+')"','g');
let home=M.slice(0,i)+teaser+M.slice(j);
home=home.replace(re,'href="Outils.dc.html#$1"');
// Outils page: header+menu, intro, pillars, footer
const top=M.indexOf('<section id="top"'),foot=M.indexOf('<footer');
const intro='<section style="display: flex; flex-direction: column; gap: 16px; padding: 28px 20px 36px; background: #12110C; color: #E4E1B8">\n'
+'<div style="'+K+'; color: #F2E415">Outils Alpha · gratuits</div>\n'
+'<h1 style="margin: 0; font-family: Anton, Impact, sans-serif; font-weight: 400; font-size: 56px; line-height: 0.98; text-transform: uppercase; color: transparent; -webkit-text-stroke: 1.6px #E4E1B8">La boîte à outils</h1>\n'
+'<p style="margin: 0; font-size: 18px; line-height: 1.45">Pour t’entraîner, récupérer et manger mieux. Sans inscription, sans carte bancaire.</p>\n'
+'<nav style="display: flex; flex-wrap: wrap; gap: 8px">'+[['outils',"S'entraîner"],['recuperer','Récupérer'],['sommeil','Sommeil'],['manger','Bien manger']].map(([h,l])=>'<a href="#'+h+'" style="display: flex; align-items: center; min-height: 44px; padding: 0 16px; border: 2px solid #E4E1B8; border-radius: 999px; color: #E4E1B8; font-weight: 700; font-size: 16px; text-decoration: none; box-sizing: border-box">'+l+'</a>').join('')+'</nav>\n'
+'</section>\n';
let out=M.slice(0,top)+intro+pillars+M.slice(foot);
out=out.replace(/href="#([A-Za-z0-9_-]+)"/g,(m,h)=>LOC.includes(h)||['mentions','cgv','confidentialite'].includes(h)?m:'href="Main.dc.html#'+h+'"');
out=out.replace('<title>Alpha Since — Accueil','<title>Alpha Since — Outils');
T['Main.dc.html']=home;T['Outils.dc.html']=out;
const re2=new RegExp('Main\\.dc\\.html#('+LOC.join('|')+')"','g');
for(const n of ['Programme.dc.html','Suivi.dc.html','Test.dc.html'])T[n]=T[n].replace(re2,'Outils.dc.html#$1"');
const S='<script>addEventListener("load",function(){var h=location.hash.slice(1),n=0;if(!h)return;(function t(){var e=document.getElementById(h);if(e){e.scrollIntoView();if(++n<3)setTimeout(t,500)}else if(++n<30)setTimeout(t,150)})()})</script>';
for(const n in T){if(T[n].split('<script src="/support.js"></script>').length!==2)throw new Error('NOSUP '+n);T[n]=T[n].replace('<script src="/support.js"></script>','<script src="/support.js"></script>'+S)}
};
