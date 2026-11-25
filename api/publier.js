// Publication de l'article du dimanche (25 novembre 2026).
// Appelé par la tâche planifiée Vercel (vercel.json, « crons ») le dimanche soir : relance le build
// de production, qui affiche l'article dont l'heure est passée. Les tâches GitHub partaient avec
// 4 à 5 heures de retard ; le workflow GitHub reste en secours.
// Variables Vercel : CRON_SECRET (Vercel l'envoie dans l'en-tête Authorization) et DEPLOY_HOOK_URL
// (Settings → Git → Deploy Hooks).
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.authorization !== 'Bearer ' + secret) return res.status(401).json({ ok: false });
  const hook = process.env.DEPLOY_HOOK_URL;
  if (!hook) return res.status(503).json({ ok: false, error: 'DEPLOY_HOOK_URL manquant' });
  // Deux créneaux (heure d'été, heure d'hiver) : on ne garde que celui qui tombe après 20 h à Paris.
  const h = Number(new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', hour12: false }).format(new Date()));
  if (h < 20) return res.status(200).json({ ok: true, ignore: 'avant 20 h à Paris' });
  const r = await fetch(hook, { method: 'POST' });
  if (!r.ok) { console.error('hook', r.status); return res.status(502).json({ ok: false }); }
  return res.status(200).json({ ok: true, build: 'demandé' });
};
