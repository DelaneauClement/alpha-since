// Round 10: "On ne commence qu'une fois" becomes the home hero
module.exports=function(T){
const H='Main.dc.html';
const R=(a,b)=>{if(T[H].split(a).length!==2)throw new Error('R10 :: '+a.slice(0,50));T[H]=T[H].replace(a,()=>b)};
R('<h1 class="a-h1">Be ready where it all <span class="a-y">begins.</span></h1>\n<p class="a-hero-fr">Prêt là où tout commence.<br>Et là où tout recommence.</p>\n<p class="a-lead">Une blessure, un nouveau boulot, un bébé, un hiver loin de la salle. Personne ne progresse en ligne droite. Alpha t’équipe et te guide à chaque reprise.</p>',
'<p class="a-eyebrow">Be ready where it all begins</p>\n<h1 class="a-h1 a-h1-story">On ne commence qu’une fois. On recommence <span class="a-y">toute sa vie.</span></h1>\n<p class="a-lead">Le sport, c’est une suite de reprises. Après une entorse, après un déménagement, après des mois où le travail et la famille passent avant. À chaque fois, il faut retrouver le chemin de la salle, sans se juger. Alpha t’équipe et te guide à chaque reprise.</p>');
R('<h2 class="a-h2">On ne commence qu’une fois. On recommence toute sa vie.</h2>\n<p class="a-lead">Le sport, c’est une suite de reprises. Après une entorse, après un déménagement, après des mois où le travail et la famille passent avant. À chaque fois, il faut retrouver le chemin de la salle, sans se juger.</p>\n<p class="a-p">Alpha est né de là. Comme le phénix de notre logo : on tombe, on se relève, on repart.',
'<h2 class="a-h2">On tombe, on se relève, on repart.</h2>\n<p class="a-lead">Alpha est né de là. Comme le phénix de notre logo.');
const MQ='@media (min-width:960px){.a-nav{display:flex}';
R(MQ,'.a-h1-story{font-size:clamp(36px,9.4vw,80px);line-height:.95}.a-eyebrow{display:flex;align-items:center;gap:12px;margin:0;font-weight:700;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--cream);opacity:.75}.a-eyebrow:before{content:\"\";width:28px;height:2px;background:var(--y);flex-shrink:0}\n'+MQ);
};
