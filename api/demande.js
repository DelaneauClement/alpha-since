// Demande de programme offert (27 novembre 2026) : la demande part par e-mail à Clément, qui répond
// lui-même avec le lien de la séance guidée et le PDF. Le demandeur reçoit un accusé de réception.
// S'il coche la case, il rejoint aussi la liste du conseil du dimanche (Brevo, OPT_IN).
// Variables Vercel : BREVO_API_KEY, SENDER_EMAIL, BREVO_LIST_ID (défaut 2).
const ALPHA = 'alphasince.contact@gmail.com';
const PROGS = ['Défi gainage 30 jours', 'S’y remettre en 6 semaines', 'Tonicité & fermeté', 'Force & carrure', 'Je ne sais pas, conseille-moi'];
const okMail = s => /^[^@\s<>"]+@[^@\s<>"]+\.[^@\s<>"]+$/.test(s) && s.length <= 254;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

async function brevo(path, body, key) {
  const r = await fetch('https://api.brevo.com/v3' + path, {
    method: 'POST',
    headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(body)
  });
  if (!r.ok && r.status !== 204) throw new Error(path + ' ' + r.status + ' ' + (await r.text()).slice(0, 300));
}

const cadre = (titre, contenu) => '<!doctype html><html lang="fr"><body style="margin:0;background:#E4E1B8;font-family:Arial,Helvetica,sans-serif;color:#12110C">' +
  '<div style="max-width:640px;margin:0 auto;padding:24px 16px">' +
  '<div style="background:#12110C;color:#E4E1B8;padding:18px 22px;border-radius:14px 14px 0 0;font-weight:700;letter-spacing:.08em">ALPHA SINCE <span style="color:#F2E415">·</span> ' + titre + '</div>' +
  '<div style="background:#ffffff;padding:22px;border-radius:0 0 14px 14px;font-size:15px;line-height:1.55">' + contenu + '</div>' +
  '<p style="text-align:center;font-size:12px;color:#4A4620;margin:16px 0 0">Alpha Since · alphasince.fr · Be ready where it all begins</p></div></body></html>';

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
  const prenom = String(b.prenom || '').trim().slice(0, 60);
  const prog = PROGS.includes(b.programme) ? b.programme : PROGS[4];
  const msg = String(b.message || '').trim().slice(0, 1500);
  if (!okMail(email) || !prenom) return res.status(400).json({ ok: false, error: 'champs' });
  const sender = { name: 'Alpha Since', email: process.env.SENDER_EMAIL || ALPHA };
  try {
    // 1. La demande, pour Clément : il répond directement à la personne (« Répondre »).
    await brevo('/smtp/email', {
      sender, to: [{ email: ALPHA, name: 'Clément' }], replyTo: { email, name: prenom },
      subject: 'Demande de programme : ' + prog + ' · ' + prenom,
      htmlContent: cadre('DEMANDE DE PROGRAMME',
        '<p style="margin:0 0 10px"><b>Programme :</b> ' + esc(prog) + '</p>' +
        '<p style="margin:0 0 10px"><b>Prénom :</b> ' + esc(prenom) + '<br><b>E-mail :</b> ' + esc(email) + '</p>' +
        '<p style="margin:0 0 10px"><b>Son message :</b><br>' + (msg ? esc(msg).replace(/\n/g, '<br>') : '<i>aucun</i>') + '</p>' +
        '<p style="margin:0 0 10px"><b>Conseil du dimanche :</b> ' + (b.news ? 'oui, inscrit(e)' : 'non') + '</p>' +
        '<p style="margin:0;color:#4A4620">Clique sur « Répondre » pour lui écrire directement et lui envoyer son lien.</p>'),
      tags: ['demande-programme']
    }, key);
    // 2. L'accusé de réception, pour la personne.
    try {
      await brevo('/smtp/email', {
        sender, to: [{ email, name: prenom }], replyTo: { email: ALPHA, name: 'Clément · Alpha Since' },
        subject: 'Ta demande de programme est bien arrivée',
        htmlContent: cadre('TA DEMANDE',
          '<p style="margin:0 0 14px">Bonjour ' + esc(prenom) + ',</p>' +
          '<p style="margin:0 0 14px">Ta demande pour <b>' + esc(prog) + '</b> est bien arrivée. Je la lis moi-même et je t’envoie ton programme par e-mail, en général sous 48 heures : le PDF et le lien de ta séance guidée sur téléphone.</p>' +
          '<p style="margin:0 0 14px">En attendant, tu peux faire <a href="https://alphasince.fr/bilan" style="color:#12110C;font-weight:700">le bilan gratuit</a> : il dit d’où tu pars.</p>' +
          '<p style="margin:0">À très vite,<br>Clément</p>'),
        tags: ['demande-programme-accuse']
      }, key);
    } catch (e) { console.error('accusé', e.message); }
    // 3. La liste du dimanche, seulement si la case est cochée.
    if (b.news === true) {
      try { await brevo('/contacts', { email, updateEnabled: true, attributes: { PRENOM: prenom, OPT_IN: true }, listIds: [Number(process.env.BREVO_LIST_ID || 2)] }, key); }
      catch (e) { console.error('liste', e.message); }
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('demande', e.message);
    return res.status(502).json({ ok: false, error: 'envoi' });
  }
};
