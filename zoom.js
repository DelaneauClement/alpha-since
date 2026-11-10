// Photos du produit en grand (10 novembre 2026, demande de Clément) : un appui sur une photo de la
// galerie de la manique l'ouvre en plein écran, avec passage d'une photo à l'autre (flèches, glissement
// du doigt, clavier) et fermeture par la croix, un appui à côté ou Échap.
// Tout passe par un script d'en-tête à l'écoute des clics : l'accueil est recréé par React (support.js),
// qui ne garde pas les scripts du gabarit.
const CSS=`<style>
.a-gal img{cursor:zoom-in}
.a-gal img:focus-visible{outline:3px solid var(--y);outline-offset:3px}
.z-ov{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;background:rgba(18,17,12,.96);touch-action:pan-y pinch-zoom;animation:z-in .18s ease}
@keyframes z-in{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.z-ov{animation:none}}
.z-ov img{max-width:100vw;max-height:100dvh;width:auto;height:auto;object-fit:contain;display:block;cursor:zoom-out}
.z-b{position:absolute;display:flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:999px;border:1px solid var(--khaki);background:var(--ink2);color:var(--cream);font:400 26px/1 Arial,sans-serif;cursor:pointer;padding:0}
.z-b:hover,.z-b:focus-visible{background:var(--y);color:var(--ink);border-color:var(--y);outline:none}
.z-x{top:max(12px,env(safe-area-inset-top));right:12px}
.z-p{left:12px;top:50%;margin-top:-24px}
.z-n{right:12px;top:50%;margin-top:-24px}
.z-c{position:absolute;left:0;right:0;bottom:max(14px,env(safe-area-inset-bottom));text-align:center;color:var(--cream);font-size:14px;font-weight:700;letter-spacing:.08em;pointer-events:none}
</style>
`;
const JS=`<script>(function(){
var ov=null,list=[],i=0,back=null,x0=null;
function imgs(){return [].slice.call(document.querySelectorAll('.a-gal img'))}
function prep(){imgs().forEach(function(m){if(!m.hasAttribute('tabindex')){m.setAttribute('tabindex','0');m.setAttribute('role','button');m.setAttribute('aria-label','Agrandir la photo : '+(m.getAttribute('alt')||''))}})}
function show(){var m=list[i],b=ov.querySelector('img');b.src=m.currentSrc||m.src;b.alt=m.alt||'';ov.querySelector('.z-c').textContent=(i+1)+' / '+list.length}
function go(d){i=(i+d+list.length)%list.length;show()}
function close(){if(!ov)return;ov.remove();ov=null;document.documentElement.style.overflow='';if(back&&back.focus)back.focus()}
function open(m){list=imgs();i=Math.max(0,list.indexOf(m));back=m;
ov=document.createElement('div');ov.className='z-ov';ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-label','Photo en grand');
ov.innerHTML='<img alt=""><button type="button" class="z-b z-x" aria-label="Fermer">\\u00d7</button>'+(list.length>1?'<button type="button" class="z-b z-p" aria-label="Photo pr\\u00e9c\\u00e9dente">\\u2039</button><button type="button" class="z-b z-n" aria-label="Photo suivante">\\u203a</button>':'')+'<div class="z-c" aria-live="polite"></div>';
ov.addEventListener('click',function(e){var t=e.target;if(t.classList.contains('z-p'))go(-1);else if(t.classList.contains('z-n'))go(1);else close()});
ov.addEventListener('touchstart',function(e){x0=e.touches.length===1?e.touches[0].clientX:null},{passive:true});
ov.addEventListener('touchend',function(e){if(x0===null||list.length<2)return;var d=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(d)>50){go(d<0?1:-1);e.preventDefault()}});
document.body.appendChild(ov);document.documentElement.style.overflow='hidden';show();ov.querySelector('.z-x').focus()}
document.addEventListener('click',function(e){var m=e.target&&e.target.closest?e.target.closest('.a-gal img'):null;if(m&&!ov){e.preventDefault();open(m)}});
document.addEventListener('keydown',function(e){if(ov){if(e.key==='Escape')close();else if(e.key==='ArrowLeft')go(-1);else if(e.key==='ArrowRight')go(1);else if(e.key==='Tab'){var b=[].slice.call(ov.querySelectorAll('button')),k=b.indexOf(document.activeElement);e.preventDefault();b[(k+(e.shiftKey?-1:1)+b.length)%b.length].focus()}return}
var m=e.target&&e.target.matches&&e.target.matches('.a-gal img')?e.target:null;if(m&&(e.key==='Enter'||e.key===' ')){e.preventDefault();open(m)}});
var n=0,t=setInterval(function(){prep();if(++n>40)clearInterval(t)},250);
})()</script>
`;
module.exports=function(T){
 let n=0;
 for(const P of ['Main.dc.html','Manique.html']){
  let s=T[P];
  if(typeof s!=='string'||!s.includes('class="a-gal')||s.split('</head>').length!==2){console.error('ZOOM galerie ou en-tête introuvable :',P);process.exit(1)}
  T[P]=s.replace('</head>',()=>CSS+JS+'</head>');n++;
 }
 console.log('ZOOM ok',n,'pages');
};
