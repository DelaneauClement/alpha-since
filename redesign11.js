// Round 11: paiement direct Stripe pour la manique (livraison comprise)
module.exports=function(T){
const H='Main.dc.html',L='Legal.html';
const PAY='https://buy.stripe.com/00w5kw8ev44w9zJ6E0a3u00';
const MAIL='alphasince.contact@gmail.com';
const R=(n,a,b)=>{if(T[n].split(a).length!==2)throw new Error('R11 '+n+' :: '+a.slice(0,60));T[n]=T[n].replace(a,()=>b)};
// bouton Commander -> Stripe
const i=T[H].indexOf('<a class="a-btn a-btn-y" href="mailto:'+MAIL+'?subject=Commande');
if(i<0)throw new Error('R11 btn');
const j=T[H].indexOf('">Commander ',i);
T[H]=T[H].slice(0,i)+'<a class="a-btn a-btn-y" href="'+PAY+'" target="_blank" rel="noopener">Commander'+T[H].slice(j+'">Commander'.length);
R(H,'<span class="a-price">34,95 €</span>','<span class="a-price">34,95 €</span>\n<span class="a-ship">Livraison en point relais comprise</span>');
R(H,'<p class="a-soon"><span>Commande par e-mail : on te répond avec le total, livraison comprise, et un lien de paiement sécurisé.</span></p>',
'<div class="a-howto"><b>Comment ça se passe</b><ol><li>Tu indiques ton adresse et tu paies 34,95 € par carte, sur une page sécurisée Stripe.</li><li>Tu reçois la confirmation par e-mail.</li><li>On t’écrit pour confirmer le point relais le plus proche, et le colis part le jour ouvré suivant.</li></ol><span>Une question avant de commander ? <a href="mailto:'+MAIL+'?subject=Question%20%C2%B7%20Manique%20X-Trm%20Confort">Écris-nous</a>. En commandant, tu acceptes nos <a href="/legal#cgv">conditions générales de vente</a>.</span></div>');
T[H]=T[H].replace('</style>',()=>'.a-ship{font-size:15px;font-weight:700;color:var(--cream);opacity:.8}\n.a-howto{display:flex;flex-direction:column;gap:8px;padding:18px 20px;border:1px solid rgba(228,225,184,.25);border-radius:16px;font-size:15px;color:var(--cream)}\n.a-howto b{font-size:16px}\n.a-howto ol{margin:0;padding-left:20px;display:flex;flex-direction:column;gap:4px}\n.a-howto span{opacity:.75}\n.a-howto a{color:inherit;font-weight:700}\n</style>');
// CGV et confidentialité
R(L,'Le Client les accepte en procédant au paiement, le lien vers les CGV figurant dans l’e-mail récapitulatif.','Le Client les accepte en procédant au paiement. Elles sont accessibles depuis la page du Produit, à côté du bouton « Commander ».');
R(L,'Les frais de livraison des Produits sont indiqués avant la validation de la commande.','Le prix des Produits inclut la livraison en point relais Mondial Relay en France métropolitaine.');
R(L,'Le Client passe commande par e-mail, avec le bouton « Commander » ou à l’adresse '+MAIL+'. Le vendeur lui répond par e-mail avec un récapitulatif (Produits, prix, frais de livraison, délai) et un lien de paiement sécurisé. La vente est conclue au paiement, qui vaut acceptation des CGV. Le vendeur confirme ensuite la commande par e-mail, sur support durable.',
'Le Client commande avec le bouton « Commander », qui ouvre une page de paiement sécurisée Stripe indiquant le Produit, la quantité et le prix total, livraison comprise. Il y renseigne son adresse e-mail, son numéro de téléphone et son adresse de livraison, vérifie sa commande, puis paie. La vente est conclue au paiement, qui vaut acceptation des CGV. Le Client reçoit une confirmation par e-mail, sur support durable. Le vendeur lui confirme ensuite le point relais Mondial Relay le plus proche de son adresse.');
R(L,'via un lien de paiement sécurisé SumUp','via une page de paiement sécurisée Stripe');
R(L,'Le paiement est traité par SumUp, qui ne nous transmet jamais tes données bancaires.','Le paiement est traité par Stripe, qui ne nous transmet jamais tes données bancaires. Pour une commande, Stripe nous transmet ton nom, ton e-mail, ton téléphone et ton adresse de livraison : nous les utilisons uniquement pour traiter et expédier ta commande, et nous communiquons à Mondial Relay ce qui est nécessaire à la livraison.');
if(/SumUp/.test(T[L])||/SumUp/.test(T[H]))throw new Error('R11 SumUp left');
};
