// Round 5: contact e-mail, Neuville identity, email orders (Mondial Relay), coaching waiting list
module.exports=function(T){
const R=(n,a,b,min)=>{const k=T[n].split(a).length-1;if(k<(min||1))throw new Error('R5 '+n+' :: '+a.slice(0,50));T[n]=T[n].split(a).join(b)};
const ALL=Object.keys(T).filter(n=>n.endsWith('.html'));
const H='Main.dc.html',S='Suivi.dc.html',L='Legal.html';
const MAIL='alphasince.contact@gmail.com';
const enc=s=>encodeURIComponent(s);
const ORDER='mailto:'+MAIL+'?subject='+enc('Commande · Manique X-Trm Confort')+'&amp;body='+enc('Bonjour,\n\nJe souhaite commander :\nManique X-Trm Confort (taille unique) × 1\n\nNom et prénom : \nTéléphone : \nCode postal et ville (pour choisir le point relais Mondial Relay) : \n\nMerci !');
const WAIT='mailto:'+MAIL+'?subject='+enc('Liste d’attente · Coaching')+'&amp;body='+enc('Bonjour,\n\nJe veux être prévenu(e) à l’ouverture du coaching.\n\nPrénom : \nFormule qui m’intéresse (Sport ou Sport + nutrition, mensuel ou hebdomadaire) : \nMon objectif en une phrase : \n\nMerci !');
// identity
R(L,'Clément Delaneau','Clément Neuville',5);
// e-mail everywhere in legal texts
R(L,'[EMAIL DE CONTACT]',MAIL,10);
// footer contact column (all pages)
for(const n of ALL){
  const a=n===H?'<a href="#quisommesnous">Qui sommes-nous</a></div>':'<a href="/#quisommesnous">Qui sommes-nous</a></div>';
  R(n,a,a+'\n<div><h3>Contact</h3><a href="mailto:'+MAIL+'">Écrire un e-mail</a><span>'+MAIL+'</span></div>');
}
// manique: order by e-mail, Mondial Relay
R(H,'<a class="a-btn a-btn-y" href="#acheter">Acheter ','<a class="a-btn a-btn-y" href="'+ORDER+'">Commander ');
R(H,'Expédié par nos soins depuis l’Aveyron · Retours sous 14 jours','Expédié par nos soins depuis l’Aveyron en point relais Mondial Relay · Retours sous 14 jours');
R(H,'<p class="a-soon"><span>Bientôt :</span>','<p class="a-soon"><span>Commande par e-mail : on te répond avec le total, livraison comprise, et un lien de paiement sécurisé.</span></p>\n<p class="a-soon"><span>Bientôt :</span>');
// coaching: waiting list, no payment
R(S,'<a href="#abonnement"','<a href="'+WAIT+'"');
R(S,'>Je commence mon suivi<','>Rejoindre la liste d’attente<');
R(S,'Tarif de lancement. Facturé chaque mois, tu arrêtes quand tu veux, en 3 clics, sans frais.','Ouverture prochaine. L’inscription est gratuite et sans engagement : tu es prévenu en premier, avec le tarif de lancement.');
R(H,'<a class="a-btn a-btn-y" href="/coaching">Voir les formules</a>','<a class="a-btn a-btn-y" href="/coaching">Voir les formules et la liste d’attente</a>');
// CGV: order by e-mail, Mondial Relay, coaching not yet open
const CG=[['Le Client les accepte en cochant la case prévue avant de valider sa commande.','Le Client les accepte en procédant au paiement, le lien vers les CGV figurant dans l’e-mail récapitulatif.'],
['Le Client sélectionne ses Produits ou sa formule, vérifie le récapitulatif (détail, prix total, frais), corrige les éventuelles erreurs, accepte les CGV puis valide par le bouton « Commander avec obligation de paiement ». Le vendeur confirme la commande par e-mail, sur support durable, avec un rappel des CGV.','Le Client passe commande par e-mail, avec le bouton « Commander » ou à l’adresse '+MAIL+'. Le vendeur lui répond par e-mail avec un récapitulatif (Produits, prix, frais de livraison, délai) et un lien de paiement sécurisé. La vente est conclue au paiement, qui vaut acceptation des CGV. Le vendeur confirme ensuite la commande par e-mail, sur support durable.'],
['Les Produits sont livrés à l’adresse indiquée par le Client, en France métropolitaine,','Les Produits sont expédiés par Mondial Relay au point relais choisi par le Client, en France métropolitaine,'],
['Le Suivi est un accompagnement sportif à distance.','Le Suivi est un accompagnement sportif à distance. Il ouvrira prochainement : d’ici là, l’inscription sur liste d’attente est gratuite, sans engagement et sans paiement.']];
for(const [a,b] of CG)R(L,a,b);
for(const n of ALL){if(n!==L&&/\[EMAIL DE CONTACT\]|#acheter"|#abonnement"/.test(T[n]))throw new Error('R5 left '+n)}
};
