// Envoi du bilan par e-mail (15 octobre 2026).
// Le visiteur clique sur « Recevoir mon bilan » : il reçoit son bilan, Alpha en reçoit une copie,
// et, seulement s'il a coché la case, son e-mail rejoint la liste Brevo des conseils Alpha.
// Variables Vercel : BREVO_API_KEY (obligatoire), SENDER_EMAIL (après authentification du domaine
// dans Brevo, ex. bilan@alphasince.fr ; à défaut, l'adresse Gmail déjà validée), BREVO_LIST_ID (défaut 2).
const ALPHA = 'alphasince.contact@gmail.com';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const okMail = s => /^[^@\s<>"]+@[^@\s<>"]+\.[^@\s<>"]+$/.test(s) && s.length <= 254;

function page(prenom, texte, pourAlpha) {
  const intro = pourAlpha
    ? '<p style="margin:0 0 16px">Nouveau bilan reçu depuis le site. Réponds directement à cet e-mail pour écrire à la personne.</p>'
    : '<p style="margin:0 0 16px">Bonjour ' + esc(prenom) + ',</p><p style="margin:0 0 16px">Voici ton bilan Alpha, à garder sous la main. Tu peux répondre à cet e-mail si tu as une question : c’est Clément qui te lira.</p>';
  const fin = pourAlpha ? '' :
    '<p style="margin:24px 0 8px">Pour aller plus loin :</p>' +
    '<p style="margin:0 0 8px"><a href="https://alphasince.fr/programmes" style="color:#12110C;font-weight:700">Les programmes Alpha</a> · <a href="https://alphasince.fr/conseils" style="color:#12110C;font-weight:700">Les conseils du dimanche</a> · <a href="https://alphasince.fr/outils" style="color:#12110C;font-weight:700">Les outils gratuits</a></p>' +
    '<p style="margin:24px 0 0;font-size:13px;color:#4A4620">Ce bilan donne des repères généraux. Il ne remplace pas l’avis d’un médecin : en cas de douleur, de blessure ou de traitement en cours, demande-lui conseil avant de commencer.</p>';
  return '<!doctype html><html lang="fr"><body style="margin:0;background:#E4E1B8;font-family:Arial,Helvetica,sans-serif;color:#12110C">' +
    '<div style="max-width:640px;margin:0 auto;padding:24px 16px">' +
    '<div style="background:#12110C;color:#E4E1B8;padding:18px 22px;border-radius:14px 14px 0 0;font-weight:700;letter-spacing:.08em">ALPHA SINCE <span style="color:#F2E415">·</span> TON BILAN</div>' +
    '<div style="background:#ffffff;padding:22px;border-radius:0 0 14px 14px;font-size:15px;line-height:1.55">' + intro +
    '<div style="white-space:pre-wrap;background:#F6F4DD;border-left:4px solid #807C3A;padding:14px 16px;border-radius:8px;font-family:Arial,Helvetica,sans-serif">' + esc(texte) + '</div>' + fin +
    '</div><p style="text-align:center;font-size:12px;color:#4A4620;margin:16px 0 0">Alpha Since · alphasince.fr · Be ready where it all begins</p></div></body></html>';
}

async function brevo(path, body, key) {
  const r = await fetch('https://api.brevo.com/v3' + path, {
    method: 'POST',
    headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(body)
  });
  if (!r.ok && r.status !== 204) throw new Error(path + ' ' + r.status + ' ' + (await r.text()).slice(0, 300));
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false }); }
  const key = process.env.BREVO_API_KEY;
  if (!key) return res.status(503).json({ ok: false, error: 'indisponible' });
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = null; } }
  if (!b || typeof b !== 'object') return res.status(400).json({ ok: false });
  if (b.site) return res.status(200).json({ ok: true }); // champ piège : robot
  const prenom = String(b.prenom || '').trim().slice(0, 60);
  const email = String(b.email || '').trim().toLowerCase();
  const tel = String(b.tel || '').trim().slice(0, 30);
  const texte = String(b.texte || '').slice(0, 30000);
  const source = String(b.source || 'Bilan Alpha').slice(0, 40);
  if (!prenom || !okMail(email) || texte.length < 50) return res.status(400).json({ ok: false, error: 'champs' });
  const sender = { name: 'Alpha Since', email: process.env.SENDER_EMAIL || ALPHA };
  try {
    await brevo('/smtp/email', {
      sender, to: [{ email, name: prenom }], replyTo: { email: ALPHA, name: 'Alpha Since' },
      subject: 'Ton ' + source + ', ' + prenom,
      htmlContent: page(prenom, texte, false),
      textContent: 'Bonjour ' + prenom + ',\n\nVoici ton bilan Alpha.\n\n' + texte + '\n\nAlpha Since · alphasince.fr',
      tags: ['bilan']
    }, key);
    const entete = 'Prénom : ' + prenom + '\nE-mail : ' + email + (tel ? '\nTéléphone : ' + tel : '') + '\nConseils par e-mail : ' + (b.news ? 'oui' : 'non') + '\n\n';
    await brevo('/smtp/email', {
      sender, to: [{ email: ALPHA, name: 'Alpha Since' }], replyTo: { email, name: prenom },
      subject: source + ' · ' + prenom,
      htmlContent: page(prenom, entete + texte, true),
      textContent: entete + texte,
      tags: ['bilan-copie']
    }, key);
    if (b.news === true) {
      try {
        await brevo('/contacts', {
          email, updateEnabled: true,
          attributes: { PRENOM: prenom, OPT_IN: true },
          listIds: [Number(process.env.BREVO_LIST_ID || 2)]
        }, key);
      } catch (e) { console.error('liste', e.message); }
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('envoi', e.message);
    return res.status(502).json({ ok: false, error: 'envoi' });
  }
};
