// Inscription au « conseil du dimanche » (15 octobre 2026) : ajoute l'e-mail à la liste Brevo
// et envoie un e-mail de bienvenue. Variables Vercel : BREVO_API_KEY, SENDER_EMAIL, BREVO_LIST_ID (défaut 2).
const ALPHA = 'alphasince.contact@gmail.com';
const okMail = s => /^[^@\s<>"]+@[^@\s<>"]+\.[^@\s<>"]+$/.test(s) && s.length <= 254;

async function brevo(path, body, key) {
  const r = await fetch('https://api.brevo.com/v3' + path, {
    method: 'POST',
    headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(body)
  });
  if (!r.ok && r.status !== 204) throw new Error(path + ' ' + r.status + ' ' + (await r.text()).slice(0, 300));
}

const BIENVENUE = '<!doctype html><html lang="fr"><body style="margin:0;background:#E4E1B8;font-family:Arial,Helvetica,sans-serif;color:#12110C">' +
  '<div style="max-width:640px;margin:0 auto;padding:24px 16px">' +
  '<div style="background:#12110C;color:#E4E1B8;padding:18px 22px;border-radius:14px 14px 0 0;font-weight:700;letter-spacing:.08em">ALPHA SINCE <span style="color:#F2E415">·</span> LE CONSEIL DU DIMANCHE</div>' +
  '<div style="background:#ffffff;padding:22px;border-radius:0 0 14px 14px;font-size:15px;line-height:1.55">' +
  '<p style="margin:0 0 14px">Bienvenue !</p>' +
  '<p style="margin:0 0 14px">Chaque dimanche soir, tu recevras le nouveau conseil d’Alpha : s’entraîner, récupérer, reprendre après une pause. Un e-mail par semaine, pas plus.</p>' +
  '<p style="margin:0 0 14px">En attendant, deux points de départ :</p>' +
  '<p style="margin:0 0 8px">· <a href="https://alphasince.fr/bilan" style="color:#12110C;font-weight:700">Le bilan gratuit</a> : 5 minutes pour savoir d’où tu pars, et une semaine d’entraînement à ton niveau.</p>' +
  '<p style="margin:0 0 14px">· <a href="https://alphasince.fr/conseils" style="color:#12110C;font-weight:700">Tous les conseils</a> déjà publiés.</p>' +
  '<p style="margin:0">Une question ? Réponds simplement à cet e-mail : c’est Clément qui te lira.</p>' +
  '</div><p style="text-align:center;font-size:12px;color:#4A4620;margin:16px 0 0">Alpha Since · alphasince.fr · Be ready where it all begins<br>Tu reçois cet e-mail parce que tu t’es inscrit sur alphasince.fr. Pour te désinscrire, réponds « stop » à cet e-mail.</p></div></body></html>';

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false }); }
  const key = process.env.BREVO_API_KEY;
  if (!key) return res.status(503).json({ ok: false, error: 'indisponible' });
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = null; } }
  if (!b || typeof b !== 'object') return res.status(400).json({ ok: false });
  if (b.site) return res.status(200).json({ ok: true }); // champ piège : robot
  const email = String(b.email || '').trim().toLowerCase();
  if (!okMail(email)) return res.status(400).json({ ok: false, error: 'email' });
  try {
    await brevo('/contacts', { email, updateEnabled: true, attributes: { OPT_IN: true }, listIds: [Number(process.env.BREVO_LIST_ID || 2)] }, key);
    try {
      await brevo('/smtp/email', {
        sender: { name: 'Alpha Since', email: process.env.SENDER_EMAIL || ALPHA },
        to: [{ email }], replyTo: { email: ALPHA, name: 'Alpha Since' },
        subject: 'Bienvenue : le conseil du dimanche d’Alpha',
        htmlContent: BIENVENUE, tags: ['inscription']
      }, key);
    } catch (e) { console.error('bienvenue', e.message); }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('inscription', e.message);
    return res.status(502).json({ ok: false, error: 'envoi' });
  }
};
