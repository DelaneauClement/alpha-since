# Site Alpha sur Vercel — notes techniques

Mis à jour le 12 octobre 2026. À lire avant toute modification du site alpha-since.vercel.app.

## Où est le site
- Équipe Vercel « Alpha » (team_kgP65yH7f6SImP6JonrfThAt), projet `alpha-since` (prj_AG9QU4A39zt2SS7C0Tz1taPNwJOm).
- Depuis le 12 octobre 2026, le site est dans le dépôt GitHub `DelaneauClement/alpha-since`, relié au projet Vercel : chaque envoi sur la branche `main` reconstruit et publie le site. Avant, il n'y avait pas de dépôt et chaque déploiement envoyait la liste complète des fichiers source par l'API.
- Les réglages de build ne sont pas enregistrés dans le projet. Il faut les passer à chaque déploiement :
  `installCommand: "echo skip"`, `buildCommand: "node assemble.js"`, `outputDirectory: "out"`, `framework: null`.

## Comment le site se construit
- `assemble.js` lance `gen.js`, recolle les pages découpées (`q/Main.dc.html.0` à `.3`), applique `patches.json` puis une chaîne de modules (`restructure.js`, `redesign.js` … `redesign11.js`, `journal.js`, `bilanpage*.js`, `univers.js`, `bilanfix.js`, `espoirmatch.js`, `espoirbilan.js`, `adobilan.js`, `kidsbilan.js`, `bilanjeunes.js`, ce dernier toujours en fin de chaîne) qui modifient les pages en mémoire, et écrit le tout dans `out/`.
- Des empreintes SHA-1 sont contrôlées au milieu de la chaîne : toute modification se fait par un nouveau module ajouté en fin de chaîne, jamais en retouchant les fichiers d'origine.
- `vercel.json` porte les adresses (`/bilan`, `/outils`, `/coaching`, `/conseils`, `/legal`, `/kids`, `/kids/bilan`, `/ado`, `/ado/bilan`, `/espoir`, `/espoir/match`, `/espoir/bilan`) et les en-têtes de sécurité.

## Déployer une modification
- Méthode normale depuis le 12 octobre : modifier les fichiers dans le dépôt, lancer `node assemble.js` en local pour vérifier, puis envoyer sur `main`. Vercel publie seul. Les réglages de build sont dans `vercel.json`.
- Ancienne méthode, par l'API (encore possible) :
1. Lister les fichiers du dernier déploiement de production : l'identifiant de chaque fichier est son SHA-1.
2. Envoyer chaque fichier nouveau ou modifié avec l'outil d'envoi de fichier (contenu en base64, SHA-1 et taille).
3. Créer un déploiement d'aperçu en référençant tous les fichiers par nom et SHA-1 (la taille n'est pas nécessaire), avec les réglages de build ci-dessus.
4. Vérifier le journal de build et les pages de l'aperçu, puis refaire le même appel avec `target: "production"`.
- La lecture d'un fichier source par l'outil Vercel est tronquée au-delà d'environ 2 000 caractères : pour relire un fichier, le faire afficher par le build dans le journal.
- Fichiers binaires (photos, PDF) : les découper en morceaux de 4 096 octets (`nom.0`, `nom.1`…) que le build recolle. Avant de découper, vérifier que le base64 ne contient pas de longue suite du même caractère : l'envoi échoue sinon.
- Gros fichiers texte : les compresser en brotli avant de les découper (voir les bilans Espoir et Ado). Trois fois moins de données à envoyer.
- Quand seuls des morceaux contrôlés par empreinte changent (fiches PDF, `espoir/app.br.N`, `ado/app.br.N`, `kids/app.br.N`), un build raté ne remplace pas la production : on peut déployer directement en production, puis comparer le fichier servi au build testé en local.

## Univers Kids, Ado, Espoir (9 octobre 2026)
- Fichiers : `univers.js` (logique), `univers-data.js` (emblèmes et textes ; l'étiquette d'âge de Kids est « 3–10 ans » depuis le 11 octobre), `univers-png.js` (découpe du mot ALPHA dans `img/logo.png` et `img/logo-alt.png`), `univers.css` (styles).
- Effets : bande des trois univers en haut de l'accueil, pages `/kids`, `/ado`, `/espoir` construites sur le gabarit de la page Conseils.
- Logos retenus : piste A, le phénix grandit (3 plumes Kids, 4 Ado, 5 Espoir, 6 pour le logo Alpha).
- Kids reste en « Bientôt » (Ado est ouvert depuis le 10 octobre : voir plus bas), avec l'inscription « Me prévenir » : lien e-mail prérempli vers alphasince.contact@gmail.com, comme la liste d'attente du coaching. Aucun formulaire ne stocke d'adresse.
- Espoir est ouvert : `univers.js` produit toujours la page en « Prochaine ouverture », et `espoirbilan.js` la transforme en fin de chaîne (voir plus bas).

## Espoir : guide « Avant la compétition » (9 octobre 2026)
- Page `/espoir/match` (fichier produit : `EspoirMatch.html`) : semaine de match, J-3 à J-1, jour J avant le match, après le match (30 premières minutes, eau et électrolytes, dîner), lendemain, cas particuliers.
- Fichiers : `espoirmatch.js` (textes et construction de la page), `espoirmatch.css` (styles `m-…`).
- La page reprend l'en-tête, la bande des univers et le pied de `/espoir`. Le module ajoute aussi sur `/espoir` un bloc « Déjà en ligne » qui mène au guide.
- Fiche PDF : servie à `/docs/Alpha_Espoir_Avant_la_competition.pdf`, en téléchargement (en-tête `Content-Disposition: attachment` dans `vercel.json`). Elle est stockée en 12 morceaux `pdf/espoir-match.pdf.0` à `.11` ; le build les recolle et compare le résultat à l'empreinte de `pdf/espoir-match.pdf.sha1`. Si l'empreinte ne correspond pas, le build s'arrête.
- Pour changer la fiche : régénérer le PDF léger (polices sans hinting, logo réduit), le redécouper, renvoyer les morceaux et le fichier `.sha1`. `espoirmatch.js` n'a pas à changer.
- Règles de contenu Espoir : pas de jambon dans les exemples de repas ; en semaine on ne parle que du dîner (le midi, c'est la cantine) ; match pensé en début d'après-midi (vrai petit déjeuner, déjeuner tôt 3 h avant, collation 1 h 30 avant) ; hydratation à chaque étape. Les textes de la page et de la fiche doivent rester identiques.

## Espoir : bilan des 15–17 ans (ouvert au public le 9 octobre 2026)
- Page `/espoir/bilan` (fichier produit : `EspoirBilan.html`, script `bilan-espoir-app.js`). Ouverte au public sur décision de Clément : plus de `noindex`.
- Liens vers le bilan : sur `/espoir`, l'étiquette devient « Ouvert · 15–17 ans », le bouton « Me prévenir à l'ouverture » devient « Faire mon bilan » et la note « Gratuit, 8 minutes, sans inscription » ; sur `/espoir/match`, un bouton « Faire mon bilan Espoir » en bas de page. Ces changements sont faits par `espoirbilan.js` quand `TEST` vaut 0. Repasser `TEST` à 1 remet la page en test : hors index, sans lien, et `/espoir` revient en « Prochaine ouverture ».
- Principe : pas de second moteur. `espoirbilan.js` prend le script du bilan adulte une fois corrigé par `bilanfix.js`, remplace les questions, retire les fonctions propres à l'adulte et injecte celles d'Espoir. Toute amélioration du moteur adulte profite donc à Espoir. Si un repère du script adulte ou des pages change de nom, le build s'arrête avec le nom du repère manquant.
- Contenu Espoir : `espoir-app.js`, en deux parties séparées par la ligne `//@@OVERRIDES` (les questions, puis les règles : profil, priorités, programme, assiette, résumé, affichage). Il est livré compressé en brotli et découpé en `espoir/app.br.0` à `.3`, avec l'empreinte du fichier d'origine dans `espoir/app.sha1`. Pour le modifier : recompresser, redécouper, renvoyer les morceaux et le `.sha1` ; `espoirbilan.js` n'a pas à changer.
- Les réponses sont gardées sur le téléphone sous la clé `alpha.espoir.v1`, séparée de celle du bilan adulte.
- Règles validées par Clément : 6 étapes, 41 questions, rempli seul par le jeune ; objectif « m'affiner » retiré ; plafond de 3 séances de 45 minutes ; 2 séances au plus avec des matchs presque chaque week-end en pleine saison (30 minutes au plus à partir de 3 entraînements de club), jamais la veille d'un match ; croissance rapide ou douleur : charges légères, pas de sauts ni de sprints ; pas de calories ni de régime avant 18 ans.
- Blessure, deux seuils seulement (règle de Clément). La question « As-tu été arrêté plus de 3 semaines par une blessure depuis un an ? » propose : Non · Oui, il y a plus de 3 mois · Oui, il y a moins de 3 mois. Plus de 3 mois : il reprend normalement, aucune limite ni mention. Moins de 3 mois, ou « Blessé ou en reprise » dans la saison : rééducation, 2 séances au plus, charges légères, ni sauts ni sprints, programme à faire valider par le kiné ou le médecin.
- Téléphone le soir : il pèse sur l'étage « Récupérer » de la pyramide, et la sévérité est assumée par Clément (« un outil, mais il peut être contre-productif »).
- Barèmes : saut en longueur sans élan comparé aux percentiles Eurofit par âge et par sexe (Tomkinson et al., 2018) ; planche à 30, 60, 90 et 120 secondes ; pompes, chaise, course et 3 km sur les repères de l'adulte.
- Compléments : protéines en poudre et créatine sont présentées comme des compléments de récupération, pas de performance ; repère de 1,7 g de protéines par kilo, assiette comprise ; repère d'eau augmenté de 0,5 L ; alerte sur les boosters et brûle-graisses. Créatine avant 18 ans : à prendre au sérieux et à dire, pour que le jeune ne la prenne pas en cachette (« Dis-le à tes parents, à ton entraîneur et au médecin du club »).
- Routine d'assouplissements des jours sans séance : 6 étirements, 10 minutes, affichée sous les séances.
- Mises en garde immédiates (demandes de Clément) : un encadré noir « Mise en garde » s'affiche sous la question dès la réponse à risque, est amené à l'écran, et disparaît si on change de réponse. Deux cas dans Espoir : « Boosters ou brûle-graisses » (texte appuyé sur l'avis de l'Anses de 2016, qui déconseille fortement ces compléments aux adolescents) et le téléphone « Jusqu'à l'endormissement ». Un cas dans Ado : téléphone ou console « Jusqu'à l'endormissement ». Mécanisme : une question peut porter `w(a)`, fonction qui renvoie l'encadré construit par `alertBox` ; `espoirbilan.js` et `adobilan.js` ajoutent ce point d'accroche au moteur dérivé. Pour une nouvelle alerte, il suffit d'ajouter une fonction et un `w:` dans `espoir-app.js` ou `ado-app.js`.
- Les questions validées sont dans le document « Bilan Alpha Espoir — les questions (15–17 ans) ».

## Ado : bilan des 11–14 ans (ouvert au public le 10 octobre 2026)
- Page `/ado/bilan` (fichier produit : `AdoBilan.html`, script `bilan-ado-app.js`). Ouverte au public sur décision de Clément : plus de `noindex`.
- Liens vers le bilan : sur `/ado`, l'étiquette « Bientôt » devient « Ouvert · 11–14 ans », le bouton « Me prévenir à l'ouverture » devient « Faire mon bilan » et la note « Gratuit, 8 à 10 minutes, sans inscription. À faire avec un parent ». Ces changements sont faits par `adobilan.js` quand `TEST` vaut 0. Repasser `TEST` à 1 remet la page en test : hors index, sans lien, et `/ado` revient en « Bientôt ».
- Même principe que le bilan Espoir : `adobilan.js` dérive le script du bilan adulte, retire tout ce qui est propre à l'adulte (profil, priorités, programme, nutrition, résumé) et injecte le contenu Ado. Le build s'arrête si un repère manque ou si une fonction adulte subsiste.
- Contenu Ado : `ado-app.js`, en deux parties séparées par `//@@OVERRIDES`, livré compressé en brotli et découpé en `ado/app.br.0` à `.3`, avec l'empreinte du fichier d'origine dans `ado/app.sha1`. Pour le modifier : recompresser, redécouper, renvoyer les morceaux et le `.sha1`.
- Les réponses sont gardées sur le téléphone sous la clé `alpha.ado.v1`.
- Déroulé : 6 étapes, 35 questions, rempli avec un parent. L'écran d'accueil demande de cocher « Un parent est avec moi » avant de commencer ; « Recommencer » ramène à cet écran et oblige à recocher. Le résultat a deux parties : « Pour toi » (pyramide, profil, priorités, repères, semaine, assouplissements, assiette et sommeil) et « Pour ton parent » (sommeil, douleurs, croissance, mono-sport, charge, rôle du parent). L'ado est tutoyé, le parent vouvoyé. C'est le parent qui envoie le bilan à Alpha (prénom de l'ado, e-mail du parent, nom du club facultatif).
- Règles reprises de Clément : pas de programme par morphotype ; pas de charges, séances au poids du corps de 10, 15 ou 20 minutes, 2 par semaine au plus ; pas de calories ni de régime ; blessure à deux seuils comme pour Espoir (moins de 3 mois : rééducation, ni sauts ni sprints ; plus de 3 mois : il reprend normalement).
- Choix faits à la construction, mis en ligne tels quels à l'ouverture ; Clément les ajuste à l'usage :
  - les questions « autre sport », « entraînements par semaine » et « matchs » ne s'affichent que si l'ado est en club en ce moment ;
  - seuils des tests obligatoires : planche 20, 40, 60 et 90 secondes ; équilibre sur un pied 5, 10, 20 et 30 secondes ; squat et course notés sur les réponses ;
  - tests facultatifs (pompes, saut, souplesse) affichés comme « Ton point de départ », sans niveau : pas de barème sourcé retenu pour les 11–14 ans ;
  - repères de sommeil : 9 à 12 heures jusqu'à 12 ans, 8 à 10 heures à 13–14 ans (AASM, 2016) ;
  - douleur depuis plus de 2 semaines : aucune séance proposée tant qu'un médecin n'a pas vu l'ado ; douleur récente ou rééducation : ni sauts ni sprints ; croissance rapide ou maladresse récente : pas de sauts ;
  - équilibre ou squat fragile : chaque séance commence par équilibre et squat ; club chargé (3 entraînements et des matchs) : une seule séance de 15 minutes au plus ; ni club ni activité : deux « défis » de 10 minutes ;
  - texte de la case « Un parent est avec moi » : la formulation du consentement reste à relire ;
  - phrases médicales de la partie parent (douleur de plus de 2 semaines, boiterie, douleur qui réveille la nuit : médecin) : repères généraux, à faire relire par un médecin ou un kiné.
- Les questions validées sont dans le document « Bilan Alpha Ado — les questions (11–14 ans) » ; les écarts avec ce document sont dans sa section « En test depuis le 9 octobre ».

## Kids : bilan des 3–10 ans et fiches de jeux (ouvert au public le 11 octobre 2026)
- Page `/kids/bilan` (fichier produit : `KidsBilan.html`, script `bilan-kids-app.js`). Ouverte au public sur décision de Clément, après son test : plus de `noindex` ; `/kids` affiche « Ouvert · 3–10 ans », le bouton « Faire le bilan de mon enfant » et la note « Gratuit, 5 minutes, sans inscription. C'est le parent qui répond ». Ces changements sont faits par `kidsbilan.js` quand `TEST` vaut 0. Repasser `TEST` à 1 remet la page en test et `/kids` en « Bientôt ».
- Décisions de Clément (10 octobre) : un bilan rempli par le parent, puis une fiche de jeux par âge à télécharger ; trois tranches 3–5, 6–7 et 8–10 ans ; à 8–10 ans, des défis ludiques facultatifs à la place de tests ; le parent est tutoyé.
- Même principe que les bilans Espoir et Ado : `kidsbilan.js` dérive le script du bilan adulte et injecte le contenu Kids. Le build s'arrête si un repère manque ou si une fonction adulte subsiste.
- Contenu Kids : `kids-app.js`, en deux parties séparées par `//@@OVERRIDES`, livré compressé en brotli et découpé en `kids/app.br.0` à `.3`, avec l'empreinte du fichier d'origine dans `kids/app.sha1`. Pour le modifier : recompresser, redécouper, renvoyer les morceaux et le `.sha1`.
- Les réponses sont gardées sur le téléphone sous la clé `alpha.kids.v1`.
- Accords : la réponse « garçon / fille » règle il / elle partout. Les textes portent des jetons `{il}`, `{Il}`, `{e}`, `{le}`, `{soi}` remplacés par la fonction `G()`.
- Déroulé : l'écran d'accueil demande de cocher « Je suis son parent » ; « Refaire le bilan » ramène à cet écran. 5 étapes : Ton enfant, Comment il bouge, Ses journées, Sa santé, Vos jeux. À 8–10 ans, sans douleur à faire voir, l'étape 5 se termine par « Ses défis (facultatif) » : flamant, saut en longueur, balle au mur, corde.
- Résultat : pyramide à 4 étages (Dormir, Manger et boire, Bouger tous les jours, Apprendre des gestes), 3 priorités avec « Pourquoi ? » et « À lui dire : », repères de l'âge, « Ce qu'il sait faire, et la suite », 3 jeux pour la semaine, « Son point de départ » à 8–10 ans, « Les signes à surveiller », « Ton rôle », la fiche de sa tranche d'âge, puis l'envoi à Alpha (prénom de l'enfant, e-mail du parent, club facultatif).
- Mises en garde immédiates, dans le style noir « Mise en garde » : écran le soir, écran dans la chambre, temps d'écran élevé, boiterie.
- Fiches PDF : `/docs/Alpha_Kids_3-5_ans.pdf`, `/docs/Alpha_Kids_6-7_ans.pdf`, `/docs/Alpha_Kids_8-10_ans.pdf`, 2 pages A4 chacune, à la charte de `Alpha_Seance_Ervine.pdf`. Les trois fichiers sont mis bout à bout, compressés en brotli et découpés en `pdf/kids.br.0` à `.9` ; `pdf/kids.json` donne leur nom et leur taille, `pdf/kids.sha1` l'empreinte de l'ensemble. Le script qui les fabrique (`build_kids.py`, reportlab) doit être lancé avec `RAW=1` : les PDF sortent non compressés, ce qui permet au brotli de les ramener à 10 morceaux.
- Choix faits à la construction, à valider par Clément :
  - 5 étapes pour tout le monde au lieu de 4 + 1 : la santé et « Vos jeux » sont séparées, les défis sont à la fin de l'étape 5 ;
  - repères affichés : sommeil 10 à 13 heures par 24 heures à 3–5 ans, 9 à 12 heures par nuit ensuite ; écran 1 heure au plus par jour à 3–5 ans, moins de 2 heures ensuite ; mouvement 3 heures par jour à 3–5 ans, 1 heure par jour ensuite ;
  - l'étage « Apprendre des gestes » se note sur 6 gestes par tranche d'âge, avec un seuil qui monte avec l'âge dans la tranche ;
  - douleur depuis plus de 2 semaines ou boiterie : médecin d'abord, jeux calmes seulement ; douleur récente, rééducation ou croissance rapide : pas de jeux de course ni de saut ;
  - logement sans extérieur : jeux sans course d'abord ; corde à la maison : le jeu de corde passe devant ; jeu « Le fil » ajouté à 6–7 ans quand seuls les jeux calmes sont permis ;
  - phrases médicales et sources (OMS, AASM) : repères généraux, à faire relire par un médecin ou un kiné.
- Les questions validées sont dans le document « Bilan Alpha Kids — les questions (3–10 ans) ».
- Non vérifié sur un vrai téléphone : ouverture de l'application de courrier à l'envoi, rendu des polices.

## Règles d'écriture pour les bilans jeunes (demandes de Clément, 9 octobre 2026)
- Chaque priorité explique son « pourquoi » : les jeunes veulent comprendre, sinon ils ne font pas. Une priorité = un titre, une consigne, puis un paragraphe « Pourquoi ? » (ce que fait le sommeil dans le corps, à quoi servent les légumes, etc.). Dans `espoir-app.js` et `ado-app.js`, c'est le cinquième élément de chaque priorité, affiché par la fonction `why`. Toute nouvelle priorité doit avoir le sien.
- Variante facile des pompes : écrire « genoux posés au sol », jamais « sur les genoux » (on peut comprendre qu'il faut poser les mains sur les genoux). Corrigé dans les trois bilans ; pour l'adulte et Espoir, la correction du texte commun est faite en tête de `espoirbilan.js`.

## Bilan adulte : renvoi des moins de 18 ans (9 octobre 2026)
- `bilanjeunes.js`, dernier module de la chaîne. Il doit le rester : les bilans Espoir et Ado sont dérivés du script adulte avant son passage.
- Sous la question de l'âge du bilan adulte : « Moins de 18 ans ? Fais plutôt le bilan Alpha Espoir (15–17 ans) ou le bilan Alpha Ado (11–14 ans, avec un parent). »
- En tête du résultat, si l'âge saisi est inférieur à 18 ans : de 15 à 17 ans, renvoi vers `/espoir/bilan` ; de 11 à 14 ans, vers `/ado/bilan` avec un parent ; à 10 ans, vers `/kids`. Le bilan n'est pas bloqué, le jeune est orienté.

## Bilan : questions facultatives (9 octobre 2026)
- Le bilan tourne dans `bilan-app.js` (page `/bilan`). Les quatre tests « Pour aller plus loin » sont facultatifs : chaise, saut, souplesse, 3 km.
- Défaut corrigé : une valeur hors limites dans un test facultatif (0, ou un saut noté en mètres) bloquait le bouton Continuer.
- `bilanfix.js` corrige le script à la construction : valeur facultative hors limites ignorée, saut entre 0,5 et 3,5 converti de mètres en centimètres, choix facultatif retiré par un second appui, consignes d'unité ajoutées.
- En aperçu (pas en production), `bilanfix.js` rejoue un bilan complet et arrête le build si un test facultatif bloque encore. Si les questions du bilan changent, adapter ce scénario.

## Articles du dimanche
- La date de chaque article est dans `sched.js`. Le build ne publie que les articles dont la date est passée : il faut donc un build après le dimanche 20 h.
- C'est une tâche planifiée du compte Claude de Clément qui le fait : « Alpha Since — publier l'article du dimanche », chaque dimanche à 20 h 01 (heure de Paris). Elle redéploie le dernier déploiement de production tel quel. À adapter le jour où le site passe sur GitHub.
- Articles programmés au 11 octobre : 11 octobre (sport et grossesse), 18 octobre, 25 octobre, 1er novembre, 8 novembre. Après le 8 novembre, il n'y a plus rien en stock.

## Passage sur GitHub (fait le 12 octobre 2026)
- Dépôt `DelaneauClement/alpha-since` (créé public par Clément ; passage en privé conseillé), relié à Claude et à Vercel. Premier envoi : les sources ci-dessous. Test : un changement du README a été publié seul par Vercel (dpl_6Uu15JMe7fs6WyMAg4Dp5ryE4U8u) et l'accueil servi est identique octet pour octet au build local.
- Les 102 fichiers source de la production ont été récupérés et contrôlés un par un par leur empreinte, puis le site a été reconstruit en local : même résultat que la production. L'archive `alpha-since-sources.zip` a été remise à Clément dans la conversation (version du 11 octobre au soir, bilan Kids ouvert).
- L'archive ajoute `README.md`, `.gitignore` et un dossier `sources/` (non utilisé par le build) : contenus en clair des trois bilans jeunes, `pack.js`, scripts et polices des fiches PDF, scénarios de test, ces notes.
- Dans l'archive, `vercel.json` porte en plus les réglages de build (`framework: null`, `installCommand`, `buildCommand`, `outputDirectory`) : un dépôt relié à Vercel se construit sans autre réglage. Vérifié par un déploiement d'aperçu sans réglages passés (dpl_FhMVeoKTbsAqtTBKjGS7HvQ6KXci).
- Pendant le build, Vercel ajoute `"name"` à `vercel.json` : l'empreinte affichée par `UNIVERS fichiers` n'est donc jamais celle du fichier envoyé. Ce n'est pas une erreur.
- Pour récupérer toutes les sources d'un déploiement : un aperçu dont la commande de build archive le dossier (`tar` puis `base64`, découpé en fichiers texte de 150 000 caractères dans `out/`), puis lecture de ces fichiers. Fait avec dpl_BYUktB9nH32ZiAc1fdNHkB9FiDWK.
- Reste à faire : supprimer le découpage en morceaux (inutile avec Git). La tâche du dimanche continue de fonctionner telle quelle : elle redéploie le dernier déploiement de production, qui vient maintenant de GitHub.

## Retour arrière
- Production au 11 octobre, 20 h 40 : dpl_7nrWErtx1BAPjCEZocqAA9vNDMui (bilan Kids ouvert au public).
- Bilan Kids encore à l'adresse de test, bandeau « Kids 3–10 ans » : dpl_9GUTWrxP7Bk1Jbpc6QM7kLXSJX1i. La tâche du dimanche crée ensuite un déploiement identique chaque semaine : la production actuelle est toujours le dernier déploiement de production.
- Bilan Kids à l'adresse de test, bandeau encore en « 0–10 ans » : dpl_ir6Hgra6eHvqXCQYBYq5qPagU7dD.
- Bilan Ado ouvert au public, sans rien pour Kids : dpl_6MEcWB2se3Bi1BnmUSRzbiLxQjv3.
- Bilan Ado encore à l'adresse de test, mêmes contenus : dpl_6K9hTAyQkKPUXw7bozBpZ7CZcvxv.
- « Pourquoi ? » sur les priorités, mise en garde boosters, pompes genoux au sol, sans l'alerte téléphone : dpl_GgJjA7ZW3XLZPuNdnCjksmDAjZ4P.
- Renvoi des moins de 18 ans et bilan Ado en test, avant ces trois corrections : dpl_DyxaWoQ6DWLVhXFLrAjXAFY99gWv.
- Bilan Espoir ouvert au public, sans le renvoi ni le bilan Ado : dpl_B75etApSkduTMsW9RyB7tY5M2R9L.
- Bilan Espoir encore à l'adresse de test, mêmes règles : dpl_83dxWWTjNMRBezkcadUTGnhHRsQr.
- Guide Espoir en ligne, sans le bilan Espoir : dpl_FrjEc9Gjy1VsrGi1Q7yHgzNvBhzJ.
- Version sans le guide Espoir : dpl_BAr5ECsE1d3rybzGuxwSCKdr65Vv.
- Version avec les univers mais sans le correctif du bilan : dpl_2qj1oNDY6CYhQwvDLs4g4WPaL7eA.
- Version sans les univers : dpl_9YwHB2NHw4eifo2JJLiLKqRPjdJq.
