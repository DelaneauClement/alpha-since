// Round 7: SIRET, shipping delay (next working day), remove draft banner
module.exports=function(T){
const L='Legal.html',H='Main.dc.html';
const R=(n,a,b,min)=>{const k=T[n].split(a).length-1;if(k<(min||1))throw new Error('R7 '+n+' :: '+a.slice(0,50));T[n]=T[n].split(a).join(b)};
R(L,'SIREN : 844 705 111 · Registre national des entreprises','SIRET : 844 705 111 00012 · Registre national des entreprises');
R(L,' · SIREN 844 705 111',' · SIRET 844 705 111 00012');
R(L,'dans un délai de [X] jours ouvrés après confirmation, et au plus tard dans les 30 jours.','le jour ouvré suivant le paiement, et livrés au plus tard dans les 30 jours.');
R(L,'peut recourir gratuitement au médiateur de la consommation dont relève le vendeur : [NOM, ADRESSE ET SITE DU MÉDIATEUR].','peut recourir gratuitement à un médiateur de la consommation. Les coordonnées du médiateur dont relève NEUVILLE sont publiées sur cette page dès la finalisation de l’adhésion.');
R(L,'<div class="a-todo"><b>Brouillon à compléter avant la mise en vente.</b> Les éléments entre crochets [ ] sont à renseigner. Faites relire ces textes par un juriste avant d’ouvrir la boutique et le coaching payant.</div>','');
R(H,'Expédié par nos soins depuis l’Aveyron en point relais Mondial Relay · Retours sous 14 jours','Expédié le jour ouvré suivant ton paiement, depuis l’Aveyron, en point relais Mondial Relay · Retours sous 14 jours');
if(/\[[A-ZÉ]/.test(T[L]))throw new Error('R7 placeholder left');
};
