// 1) Hover effects only on devices with a real pointer (fixes "stuck" yellow buttons after a tap on phones)
const wrap=css=>{const hv=[],rest=[];for(const l of css.split('\n')){if(/^[^@{}]*:hover[^{]*\{[^}]*\}$/.test(l.trim()))hv.push(l.trim());else rest.push(l)}return rest.join('\n')+'\n@media (hover:hover){'+hv.join('')+'}\n.a-route:active .a-go{background:var(--y);border-color:var(--y)}\n.a-toolk:active{background:var(--ink);color:var(--cream)}\n.a-btn:active{transform:scale(.98)}\n'};
const WA=[['Les échanges ont lieu par messagerie (WhatsApp) et, selon l’option choisie, par téléphone.','Les échanges ont lieu par messagerie écrite et, selon l’option choisie, par téléphone.'],['<li><b>Contact</b> : les messages envoyés par e-mail ou WhatsApp, pour y répondre. WhatsApp est un service de Meta, soumis à sa propre politique de confidentialité.</li>','<li><b>Contact et suivi</b> : les messages échangés avec toi, pour y répondre et assurer ton suivi.</li>'],['Un coach sur WhatsApp, chaque semaine ou chaque mois. Sans engagement.','Un coach qui te suit par message, chaque semaine ou chaque mois. Sans engagement.'],['Un suivi sur WhatsApp, sans engagement','Un suivi personnalisé, sans engagement'],['Échanges sur WhatsApp, appel en option','Échanges par message, appel en option'],['Suivi sur WhatsApp, programme ajusté','Suivi par message, programme ajusté'],['15 minutes par jour sur WhatsApp, à ton créneau','15 minutes par jour par message, à ton créneau'],['Tes questions sur WhatsApp entre deux bilans.','Tes questions par message entre deux bilans.'],['en plus de WhatsApp.','en plus des messages.'],['Tes questions sur WhatsApp au fil de la semaine.','Tes questions par message au fil de la semaine.']];
const wa=(s,n)=>{for(const [a,b] of WA)s=s.split(a).join(b);if(s.includes('WhatsApp'))throw new Error('WA left '+n);return s};
module.exports=function(T){
const SCROLL='<script>(function(){var n=0;function go(){var m=document.querySelector(\'main\');if(!m){if(++n<60)setTimeout(go,100);return}new MutationObserver(function(r){for(var i=0;i<r.length;i++){if(r[i].addedNodes.length){if(window.scrollY>0)window.scrollTo({top:0,behavior:\'instant\'});return}}}).observe(m,{childList:true})}addEventListener(\'DOMContentLoaded\',go)})()</script>';
for(const n in T){
  const i=T[n].indexOf('<style>\n:root{--ink'),j=T[n].indexOf('</style>',i);
  if(i<0||j<0)throw new Error('R3 css '+n);
  T[n]=T[n].slice(0,i+8)+wrap(T[n].slice(i+8,j))+T[n].slice(j);
  if(n==='Programme.dc.html'||n==='Test.dc.html'){
    const s='<script src="/support.js"></script>';
    if(T[n].split(s).length!==2)throw new Error('R3 sup '+n);
    T[n]=T[n].replace(s,()=>s+SCROLL);
  }
}
for(const n in T)T[n]=wa(T[n],n);
};
module.exports.wrap=wrap;
module.exports.wa=wa;
