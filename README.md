# Alpha Since — site

Sources du site https://alphasince.fr (projet Vercel `alpha-since`).

## Construire le site
```
node assemble.js
```
Aucune dépendance à installer (Node 22). Le site complet est écrit dans `out/`.
Les réglages de build sont dans `vercel.json` : Vercel n'a rien d'autre à savoir.

## Comment c'est fait
- `assemble.js` lance `gen.js`, recolle les pages découpées (`q/`), applique `patches.json`, puis une chaîne de modules qui modifient les pages en mémoire (`restructure.js`, `redesign*.js`, `journal.js`, `bilanpage*.js`, `univers.js`, `bilanfix.js`, `espoirmatch.js`, `espoirbilan.js`, `adobilan.js`, `kidsbilan.js`, `bilanjeunes.js`, `domaine.js`).
- Des empreintes sont contrôlées au milieu de la chaîne : une modification se fait par un module ajouté en fin de chaîne, pas en retouchant les fichiers d'origine. `bilanjeunes.js` reste le dernier.
- Les fichiers `nom.0`, `nom.1`… (dossiers `q/`, `ph/`, `pdf/`, `espoir/`, `ado/`, `kids/`) sont des morceaux de 4 096 octets que le build recolle. Ce découpage date de l'époque où le site était envoyé fichier par fichier ; avec Git il n'est plus nécessaire et pourra être supprimé.
- Les articles du dimanche (`art1.js`, `art2.js`, calendrier dans `sched.js`) n'apparaissent qu'au build qui suit leur date : il faut reconstruire le site chaque dimanche après 20 h.

## Dossier `sources/` (non utilisé par le build)
- `kids-app.js`, `ado-app.js`, `espoir-app.js` : le contenu des trois bilans jeunes, en clair. Après modification : `node sources/pack.js sources/kids-app.js kids app` régénère `kids/app.br.N` et `kids/app.sha1` (même chose pour `ado` et `espoir`).
- `fiches/` : les scripts reportlab des fiches PDF (Kids, Espoir « Avant la compétition »), avec leurs polices et le logo. Les chemins en tête de script sont à adapter. Les fiches Kids se génèrent avec `RAW=1`.
- `tests/` : scénarios Playwright des bilans (chemins à adapter).
- `notes-techniques.md` : le détail, les règles de contenu et l'historique des versions.

## Règles de la maison
- Bilans jeunes : toujours expliquer le pourquoi ; pas de charges, pas de calories ni de régime, pas de programme par morphotype ; repas : le dîner seulement en semaine, pas de jambon dans les exemples.
- Tout PDF client reprend la structure et la charte de `Alpha_Seance_Ervine.pdf`.

## Mise en ligne
Chaque envoi sur la branche `main` reconstruit et publie le site sur Vercel.
