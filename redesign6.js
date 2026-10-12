// Round 6: legal identity NEUVILLE (EI), address, SIREN, SumUp
module.exports=function(T){
const L='Legal.html';
const R=(a,b,min)=>{const k=T[L].split(a).length-1;if(k<(min||1))throw new Error('R6 :: '+a.slice(0,50));T[L]=T[L].split(a).join(b)};
const ADR='223 route de Mézeilles, 12330 Salles-la-Source';
R('Clément Neuville, entrepreneur individuel (micro-entreprise), exerçant sous','NEUVILLE, entrepreneur individuel (EI, micro-entreprise), exerçant sous');
R('Clément Neuville, entrepreneur individuel (micro-entreprise), marque Alpha S','NEUVILLE, entrepreneur individuel (EI, micro-entreprise), marque Alpha S');
R('Directeur de la publication : Clément Neuville','Directeur de la publication : le titulaire de l’entreprise NEUVILLE');
R('Clément Neuville','NEUVILLE',2);
R('[NOM DU MÉDIATEUR], [ADRESSE], [SITE INTERNET]','[NOM, ADRESSE ET SITE DU MÉDIATEUR]');
R('[ADRESSE COMPLÈTE]',ADR);
R('[ADRESSE DE RETOUR]',ADR);
R('[ADRESSE] · SIRET [NUMÉRO]',ADR+' · SIREN 844 705 111');
R('SIRET : [NUMÉRO] · Registre national des entreprises','SIREN : 844 705 111 · Registre national des entreprises');
R(' · Téléphone : [NUMÉRO]','',2);
R('[ADRESSE]',ADR,3);
R('par [carte bancaire / autres moyens], via le prestataire de paiement sécurisé [NOM DU PRESTATAIRE]','par carte bancaire, via un lien de paiement sécurisé SumUp');
R('Le paiement est traité par [PRESTATAIRE DE PAIEMENT]','Le paiement est traité par SumUp');
R('Les frais de retour sont à la charge [du Client / du vendeur].','Les frais de retour sont à la charge du Client.');
R('au moins [30] jours','au moins 30 jours');
R('dans un délai de [30] jours','dans un délai de 30 jours');
R('suppression sous [3] mois','suppression sous 3 mois');
R(' [À mettre à jour si un outil de statistiques ou la boutique en ajoute.]','');
R('Version du [JJ/MM/AAAA]','Version du 30 septembre 2026');
if(/Clément|\[NUMÉRO\]|\[ADRESSE/.test(T[L]))throw new Error('R6 left');
};
