// Vidéo de l'accueil (10 novembre 2026) : la photo de la manique côté paume devient une courte boucle
// muette (la main se referme puis se rouvre). La photo reste l'image d'attente et le repli :
// elle s'affiche pendant le chargement, si la vidéo ne peut pas être lue, et pour les visiteurs
// qui ont demandé moins d'animations. Clip généré par IA à partir de la photo, puis monté en aller-retour.
const fs=require('fs');
module.exports=function(T){
 const P='Main.dc.html';let s=T[P];
 const re=/<img src="\/img\/accueil-paume\.avif" width="1000" height="1000" alt="([^"]*)" style="([^"]*)">/;
 const m=s.match(re);
 if(!m||s.split('/img/accueil-paume.avif').length!==2){console.error('VIDEO photo de l’accueil introuvable');process.exit(1)}
 const img=m[0];
 s=s.replace(re,()=>'<video class="a-vid" autoplay muted loop playsinline preload="metadata" poster="/img/accueil-paume.avif" width="1000" height="1000" aria-label="'+m[1]+'" style="'+m[2]+'"><source src="/video/accueil-paume.mp4" type="video/mp4">'+img+'</video>');
 // Le moteur d'affichage (support.js) recrée la page avec React : il ne garde pas les scripts du gabarit
 // et pose « muted » trop tard pour certains navigateurs. Ce script d'en-tête attend la vidéo, la met en
 // sourdine et la lance, sauf si le visiteur a demandé moins d'animations.
 const boot='<script>(function(){var n=0,t=setInterval(function(){var v=document.querySelector("video.a-vid");if(!v){if(++n>100)clearInterval(t);return}clearInterval(t);v.muted=true;v.playsInline=true;if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches){v.pause();return}var p=v.play();if(p&&p.catch)p.catch(function(){})},100)})()</script>\n';
 if(s.split('</head>').length!==2){console.error('VIDEO en-tête introuvable');process.exit(1)}
 s=s.replace('</head>',()=>boot+'</head>');
 T[P]=s;
 fs.mkdirSync('out/video',{recursive:true});
 fs.copyFileSync('videos/accueil-paume.mp4','out/video/accueil-paume.mp4');
 console.log('VIDEO ok',fs.statSync('videos/accueil-paume.mp4').size,'octets');
};
