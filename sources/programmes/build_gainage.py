# Programme « Défi gainage 30 jours » — charte et structure de Alpha_Seance_Ervine.pdf
import sys, os
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import stringWidth, registerFontFamily
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader

HERE = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(HERE, 'assets')
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, 'Alpha_Defi_gainage_30_jours.pdf')
pdfmetrics.registerFont(TTFont('BS', A + '/BigShoulders-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Carlito', A + '/Carlito-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Carlito-Bold', A + '/Carlito-Bold.ttf'))
registerFontFamily('Carlito', normal='Carlito', bold='Carlito-Bold', italic='Carlito', boldItalic='Carlito-Bold')

W, H = 595.2756, 841.8898
INK, CREAM, KHAKI = HexColor('#12110C'), HexColor('#E4E1B8'), HexColor('#807C3A')
OLIVE, SAND, INK3, YEL, WHITE = HexColor('#4A4620'), HexColor('#C9C49A'), HexColor('#3F3C22'), HexColor('#F2E415'), HexColor('#FFFFFF')
MX, CW = 44, 507.28
RIGHT = MX + CW
LOGO = ImageReader(A + '/logo.png')
DOC = 'Défi gainage 30 jours'
NPAGES = 10

c = canvas.Canvas(OUT, pagesize=(W, H), pageCompression=1)
c.setTitle('Alpha Since - Défi gainage 30 jours')
c.setAuthor('Alpha Since')
c.setSubject('30 jours pour un tronc solide, à la maison, sans matériel')


def asc(font, size):
    return pdfmetrics.getAscent(font, size)


def text(x, top, s, font, size, color, align='l', cs=0):
    c.setFillColor(color)
    t = c.beginText()
    w = stringWidth(s, font, size) + cs * max(0, len(s) - 1)
    if align == 'r':
        x -= w
    elif align == 'c':
        x -= w / 2
    t.setTextOrigin(x, H - top - asc(font, size))
    t.setFont(font, size)
    t.setCharSpace(cs)
    t.textOut(s)
    c.saveState(); c.drawText(t); c.restoreState()
    return w


def rrect(x, top, w, h, r, fill, stroke=None, sw=0.9):
    c.setFillColor(fill)
    if stroke is not None:
        c.setStrokeColor(stroke); c.setLineWidth(sw)
    c.roundRect(x, H - top - h, w, h, r, fill=1, stroke=1 if stroke is not None else 0)


def para(x, top, w, html, size=11, leading=15, color=INK, font='Carlito', draw=True):
    p = Paragraph(html, ParagraphStyle('p', fontName=font, fontSize=size, leading=leading, textColor=color))
    _, h = p.wrap(w, 2000)
    if draw:
        p.drawOn(c, x, H - top - h)
    return h


def bullets(x, top, w, items, color=INK, dot=KHAKI, size=11, gap=3.5, draw=True):
    y = top
    for it in items:
        h = para(x + 14, y, w - 14, it, size=size, leading=15, color=color, draw=draw)
        if draw:
            c.setFillColor(dot); c.circle(x + 2.5, H - (y + 8.2), 2.5, fill=1, stroke=0)
        y += h + gap
    return y - top - gap


def page_bg():
    c.setFillColor(CREAM); c.rect(0, 0, W, H, fill=1, stroke=0)


def header_small(label):
    c.setFillColor(KHAKI); c.rect(0, H - 58, W, 58, fill=1, stroke=0)
    lh = 44; lw = lh * 736 / 616.0
    c.drawImage(LOGO, MX, H - 7 - lh, lw, lh, mask='auto')
    text(RIGHT, 25, label, 'Carlito-Bold', 9.5, INK, 'r', cs=1.9)


def footer(n):
    c.setStrokeColor(SAND); c.setLineWidth(0.75)
    c.line(MX, H - 799.5, RIGHT, H - 799.5)
    text(MX, 809, 'BE READY WHERE IT ALL BEGINS', 'Carlito-Bold', 7.5, OLIVE, cs=1.45)
    text(RIGHT, 808, '%s · %d / %d' % (DOC, n, NPAGES), 'Carlito', 9, OLIVE, 'r')


def section(top, title, meta=None):
    text(MX, top, title, 'BS', 24, INK)
    if meta:
        text(RIGHT, top + 8, meta, 'Carlito-Bold', 10.5, OLIVE, 'r')


def stat_cards(top, items, dark=False, h=62):
    n = len(items); gap = 10.4
    w = (CW - (n - 1) * gap) / n
    for i, (big, small) in enumerate(items):
        x = MX + i * (w + gap)
        if dark:
            rrect(x, top, w, h, 10, INK)
            text(x + 12, top + 11, big, 'BS', 24, YEL)
            text(x + 12, top + 40, small, 'Carlito', 10.5, CREAM)
        else:
            rrect(x, top, w, h, 10, WHITE, SAND)
            text(x + 12, top + 11, big, 'BS', 24, INK)
            text(x + 12, top + 40, small, 'Carlito', 10.5, OLIVE)
    return h


def num_card(top, num, title, tag, items, rep=None, tsize=18):
    """Carte blanche numérotée (priorités, exercices)."""
    tx = 104; w = RIGHT - tx - 18
    hb = bullets(tx, 0, w, items, size=10.5, draw=False)
    hr = para(0, 0, w, rep, size=10.5, leading=15, draw=False) + 8 if rep else 0
    h = 18 + 30 + hb + hr + 16
    rrect(MX, top, CW, h, 12, WHITE, SAND)
    rrect(60, top + 18, 30, 36, 7, INK)
    text(75, top + 23, str(num), 'BS', 22, YEL, 'c')
    text(tx, top + 18, title, 'BS', tsize, INK)
    if tag:
        text(RIGHT - 18, top + 24, tag, 'Carlito-Bold', 8.5, OLIVE, 'r', cs=1.5)
    bullets(tx, top + 48, w, items, size=10.5)
    if rep:
        para(tx, top + 48 + hb + 8, w, rep, size=10.5, leading=15, color=OLIVE, font='Carlito-Bold')
    return h


def band(top, label, body, fill=INK, lc=YEL, bc=CREAM, lw_=150):
    hw = para(0, 0, CW - 36 - lw_, body, size=10.5, leading=15, color=bc, draw=False)
    bh = max(hw, 34) + 26
    rrect(MX, top, CW, bh, 12, fill)
    lines = label.split('\n')
    y0 = top + (bh - 16 * len(lines)) / 2 - 1
    for k, ln in enumerate(lines):
        text(MX + 18, y0 + k * 16, ln, 'BS', 15, lc)
    para(MX + 18 + lw_, top + 13, CW - 36 - lw_, body, size=10.5, leading=15, color=bc)
    return bh



# ---------------------------------------------------------------- données partagées avec le site
import json, subprocess
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.graphics import renderPDF
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
D = json.loads(subprocess.check_output(['node', '-e', "process.stdout.write(JSON.stringify(require('%s/defi-data.js')))" % ROOT]))
URL = 'alphasince.fr/defi-gainage/g7q2xk9m'
P, POS, SEM, PAL, NIV = D['P'], D['POS'], D['SEMAINES'], D['PALIERS'], D['NIVEAUX']
REPOS = set(D['REPOS_JOURS'])
import math
import re as _re


def b(s):
    return s.replace('’', "'")


def picto(k, x, top, w, ink=INK, floor=SAND, arrow=KHAKI):
    s = w / 200.0
    X = lambda px: x + px * s
    Y = lambda py: H - (top + py * s)
    c.saveState()
    c.setStrokeColor(floor); c.setLineWidth(2 * s); c.line(X(0), Y(91), X(200), Y(91))
    c.setLineCap(1); c.setLineJoin(1)
    for e in P[k]:
        if 'l' in e:
            c.setStrokeColor(ink); c.setLineWidth(7 * s)
            p = c.beginPath(); l = e['l']; p.moveTo(X(l[0]), Y(l[1]))
            for i in range(2, len(l), 2):
                p.lineTo(X(l[i]), Y(l[i + 1]))
            c.drawPath(p, stroke=1, fill=0)
        if 'c' in e:
            c.setFillColor(ink); c.circle(X(e['c'][0]), Y(e['c'][1]), e['c'][2] * s, fill=1, stroke=0)
        if 'd' in e:
            x1, y1, x2, y2 = e['d']
            c.setStrokeColor(arrow); c.setLineWidth(2.5 * s); c.setDash(4 * s, 4 * s)
            c.line(X(x1), Y(y1), X(x2), Y(y2)); c.setDash()
            a = math.atan2(y2 - y1, x2 - x1)
            p = c.beginPath(); p.moveTo(X(x2), Y(y2))
            p.lineTo(X(x2 - 9 * math.cos(a - .5)), Y(y2 - 9 * math.sin(a - .5)))
            p.lineTo(X(x2 - 9 * math.cos(a + .5)), Y(y2 - 9 * math.sin(a + .5))); p.close()
            c.setFillColor(arrow); c.drawPath(p, fill=1, stroke=0)
    c.restoreState()


def pos_card(top, num, k, new=False, draw=True):
    """Carte d'exercice : numéro, dessin, consignes, repère, version facile."""
    p = POS[k]
    tx = 196; w = RIGHT - tx - 16
    items = [b(i) for i in p['i']]
    hb = bullets(tx, 0, w, items, size=10.5, draw=False)
    hr = para(0, 0, w, '<b>Repère :</b> ' + b(p['r']), size=10.5, leading=14.5, draw=False)
    hf = para(0, 0, w, '<b>Plus facile :</b> ' + b(p['f']), size=10, leading=14, draw=False)
    h = max(16 + 28 + hb + 7 + hr + 5 + hf + 14, 128)
    if not draw:
        return h
    rrect(MX, top, CW, h, 12, WHITE, SAND)
    rrect(60, top + 16, 30, 36, 7, INK)
    text(75, top + 21, str(num), 'BS', 22, YEL, 'c')
    picto(p['p'], 60, top + 58, 122)
    text(tx, top + 16, b(p['n']).upper(), 'BS', 17, INK)
    if new:
        tw = stringWidth(b(p['n']).upper(), 'BS', 17)
        rrect(tx + tw + 8, top + 18, 54, 15, 7.5, YEL)
        text(tx + tw + 35, top + 21, 'NOUVEAU', 'Carlito-Bold', 8, INK, 'c', cs=.8)
    text(tx, top + 36, b(p['z']).upper(), 'Carlito-Bold', 8.5, OLIVE, cs=1.4)
    y = top + 52
    bullets(tx, y, w, items, size=10.5); y += hb + 7
    para(tx, y, w, '<b>Repère :</b> ' + b(p['r']), size=10.5, leading=14.5, color=OLIVE); y += hr + 5
    para(tx, y, w, '<b>Plus facile :</b> ' + b(p['f']), size=10, leading=14, color=OLIVE)
    return h



# ------------------------------------------------------------------ page 1
page_bg()
c.setFillColor(KHAKI); c.rect(0, H - 72, W, 72, fill=1, stroke=0)
lh = 58; lw = lh * 736 / 616.0
c.drawImage(LOGO, (W - lw) / 2, H - 7 - lh, lw, lh, mask='auto')
c.setFillColor(INK); c.rect(0, H - 72 - 262, W, 262, fill=1, stroke=0)
c.setFillColor(YEL); c.rect(MX, H - 107 - 2, 26, 2, fill=1, stroke=0)
text(80, 105, 'BE READY WHERE IT ALL BEGINS', 'Carlito-Bold', 8.5, CREAM, cs=1.75)
text(MX, 124, '30 JOURS POUR', 'BS', 46, CREAM)
text(MX, 166, 'UN TRONC SOLIDE.', 'BS', 46, YEL)
para(MX, 221, 470, "Un tronc solide protège ton dos et rend chaque mouvement plus fort. Un test pour fixer ton niveau, quatre circuits qui changent chaque semaine, et une séance guidée sur ton téléphone qui enchaîne tout pour toi.", size=13, leading=19, color=CREAM)
x = MX
for i, lab in enumerate(['Défi gainage', '30 jours', '14 à 23 min', 'À la maison', 'Sans matériel']):
    w = stringWidth(lab, 'Carlito-Bold', 10.5) + 22
    if i == 0:
        rrect(x, 293, w, 22, 11, YEL); text(x + 11, 300, lab, 'Carlito-Bold', 10.5, INK)
    else:
        rrect(x, 293, w, 22, 11, INK, INK3); text(x + 11, 300, lab, 'Carlito-Bold', 10.5, CREAM)
    x += w + 7

section(364, "TON DÉFI EN UN COUP D'ŒIL", '5 séances et 2 jours de récupération par semaine')
stat_cards(400, [('J1', 'test et niveau'), ('4', 'circuits différents'), ('3', 'niveaux de départ'), ('J29', 'test final')])

rrect(MX, 482, CW, 290, 14, INK)
text(66, 503, 'Tes 4 semaines', 'Carlito-Bold', 12.5, YEL)
bx, bw, by = 134, RIGHT - 22 - 134, 527
for k, s in enumerate(SEM):
    y = by + k * 39
    text(66, y + 9, 'SEM. %d' % (k + 1), 'BS', 16, CREAM)
    rrect(bx, y, bw * (0.62 + 0.125 * k), 33, 6, KHAKI if k < 3 else YEL)
    fg = CREAM if k < 3 else INK
    text(bx + 12, y + 4.5, b(s['t']).upper(), 'BS', 14, fg)
    nv = ', '.join(b(POS[n]['n']).lower() for n in s['nv'] if not n.startswith('rotationG'))
    text(bx + 12, y + 19.5, ('Nouveau : ' + nv) if nv else 'Les 6 positions de base', 'Carlito-Bold', 9, fg)
y = by + 4 * 39
text(66, y + 9, 'J29', 'BS', 16, CREAM)
rrect(bx, y, bw * 0.42, 33, 6, CREAM)
text(bx + 12, y + 4.5, 'TEST FINAL', 'BS', 14, INK)
text(bx + 12, y + 19.5, "les mêmes tests qu'au jour 1", 'Carlito-Bold', 9, INK)
para(66, 730, CW - 44, "<b>Chaque semaine, le chrono monte de 10 secondes et le circuit change.</b> Tu ne passes au palier suivant que si tu as tenu proprement les temps de la semaine.", size=11.5, leading=16, color=CREAM)
footer(1); c.showPage()

# ------------------------------------------------------------------ page 2
page_bg(); header_small('AVANT DE COMMENCER')
section(94, 'TES 3 RÈGLES', 'Elles valent pour les 30 jours')
y = 130
y += num_card(y, 1, 'RESPIRER GAINÉ', '', [
    "Ne bloque jamais ta respiration pendant une position.",
    "Serre le ventre comme si tu attendais une petite tape dessus, puis respire calmement par le ventre."]) + 8
y += num_card(y, 2, 'LA QUALITÉ AVANT LE CHRONO', '', [
    "Dès que la position se dégrade (bassin qui tombe, dos creusé), tu arrêtes, même si le chrono tourne.",
    "Une position tenue 15 secondes proprement vaut mieux que 40 secondes mal tenues."]) + 8
y += num_card(y, 3, 'UN CRÉNEAU FIXE', '', [
    "Toujours le même moment : au réveil, à midi ou en début de soirée. Note-le pour les 30 jours.",
    "La discipline passe avant la motivation. Un jour raté ne casse pas le défi : tu reprends le lendemain."]) + 14
th = 250
rrect(MX, y, CW, th, 12, YEL)
text(MX + 18, y + 16, 'JOUR 1 : TON TEST ET TON NIVEAU', 'BS', 18, INK)
para(MX + 18, y + 44, CW - 36, "Échauffe-toi 2 minutes, puis tiens chaque position le plus longtemps possible <b>en restant parfaitement aligné</b>. Le chrono s'arrête au premier défaut. 2 minutes de repos entre les tests. La séance guidée a un chrono prévu pour ça. <b>Enceinte, accouchée depuis moins de 6 mois, hernie discale, douleur de dos qui dure, opération récente : demande d'abord l'avis de ton médecin ou de ton kiné.</b>", size=10.5, leading=15)
bw3 = (CW - 36 - 16) / 3
for k, lab in enumerate(['Planche', 'Latérale droite', 'Latérale gauche']):
    bx = MX + 18 + k * (bw3 + 8)
    rrect(bx, y + 126, bw3, 50, 8, WHITE)
    text(bx + 12, y + 134, lab.upper(), 'BS', 13, INK)
    text(bx + bw3 - 12, y + 154, 'secondes', 'Carlito', 10, OLIVE, 'r')
    c.setStrokeColor(SAND); c.setLineWidth(0.9); c.line(bx + 12, H - (y + 166), bx + bw3 - 64, H - (y + 166))
yy = y + 188
nw = (CW - 36 - 16) / 3
for k, v in enumerate(NIV):
    bx = MX + 18 + k * (nw + 8)
    rrect(bx, yy, nw, 48, 8, INK)
    text(bx + 12, yy + 8, b(v['n']).upper(), 'BS', 14, YEL)
    text(bx + 12, yy + 28, b(v['seuil']).replace('Planche du jour 1 sous', 'Planche sous'), 'Carlito', 9.5, CREAM)
y += th + 10
P2 = y
footer(2); c.showPage()

# ------------------------------------------------------------------ page 3
page_bg(); header_small('LA SÉANCE GUIDÉE')
section(94, 'TA SÉANCE SUR TON TÉLÉPHONE')
y = 130
rrect(MX, y, CW, 168, 14, INK)
qrw = qr.QrCodeWidget('https://' + URL)
bb = qrw.getBounds(); qs = 128
d = Drawing(qs, qs, transform=[qs / (bb[2] - bb[0]), 0, 0, qs / (bb[3] - bb[1]), 0, 0]); d.add(qrw)
rrect(RIGHT - 18 - qs - 8, y + 16, qs + 16, qs + 16, 8, WHITE)
renderPDF.draw(d, c, RIGHT - 18 - qs, H - (y + 24 + qs))
text(MX + 18, y + 18, 'SCANNE, CHOISIS TON JOUR, LANCE.', 'BS', 17, YEL)
para(MX + 18, y + 46, CW - 36 - qs - 30, "Le chrono enchaîne tout seul la mise en route, les positions, les repos et le retour au calme, avec un bip à chaque changement et le dessin de la position à l'écran. Il garde ton niveau, coche tes jours et compare tes tests.", size=10.5, leading=15, color=CREAM)
text(MX + 18, y + 132, URL, 'Carlito-Bold', 11, CREAM)
text(MX + 18, y + 148, 'Ajoute la page à ton écran d\'accueil : elle se lance comme une appli.', 'Carlito', 9.5, SAND)
y += 168 + 22
section(y, 'UNE SÉANCE', '14 à 23 minutes selon ton palier'); y += 36
segs = [(0.17, '2 MIN', 'Mise en route', SAND, INK, INK), (0.64, '2 TOURS', 'Les 6 positions de la semaine', INK, YEL, CREAM), (0.19, '2 MIN', 'Retour au calme', KHAKI, CREAM, CREAM)]
x = MX
for frac, big, small, fill, c1, c2 in segs:
    w = CW * frac - 4
    rrect(x, y, w, 46, 8, fill)
    text(x + 10, y + 7, big, 'BS', 17, c1)
    text(x + 10, y + 28, small, 'Carlito', 9.5, c2)
    x += w + 6
y += 62
para(MX, y, CW, "Tu tiens chaque position le temps d'effort, tu souffles le temps de repos, puis tu passes à la suivante. Une minute de pause entre les deux tours. Sur les positions en mouvement (dead bug, bird dog, ponts), tu enchaînes lentement pendant tout le temps d'effort : 3 secondes pour aller, 3 pour revenir. <b>C'est le chrono qui décide, pas le compteur.</b>", size=10.5, leading=15)
y += 82
section(y, 'LES PALIERS', 'Ton niveau décide du départ'); y += 36
cw6 = (CW - 5 * 6) / 6
for i, (e, r) in enumerate(PAL):
    x = MX + i * (cw6 + 6)
    rrect(x, y, cw6, 70, 8, YEL if i in (0, 1, 2) else WHITE, None if i < 3 else SAND)
    text(x + 9, y + 8, 'PALIER %d' % (i + 1), 'Carlito-Bold', 8.5, INK, cs=.8)
    text(x + 9, y + 22, '%d S' % e, 'BS', 22, INK)
    text(x + 9, y + 50, '%d s de repos' % r, 'Carlito', 9, OLIVE)
y += 82
rows = [('DÉPART', 'semaine 1 au palier 1, semaine 4 au palier 4'), ('INTERMÉDIAIRE', 'semaine 1 au palier 2, semaine 4 au palier 5'), ('CONFIRMÉ', 'semaine 1 au palier 3, semaine 4 au palier 6')]
for k, (a, t) in enumerate(rows):
    text(MX, y + k * 19, a, 'BS', 13, INK)
    text(MX + 110, y + k * 19 + 2, t, 'Carlito', 10.5, OLIVE)
y += 66
para(MX, y, CW, "Si tu n'as pas tenu proprement les temps d'une semaine, reste au même palier la semaine suivante : une case suffit dans la séance guidée.", size=10.5, leading=15, color=OLIVE)
P3 = y + 30
footer(3); c.showPage()

# ------------------------------------------------------------------ pages 4 à 7 : positions
def regle_dos(y):
    section(y, 'LA RÈGLE POUR TON DOS'); y += 36
    bw2 = (CW - 10) / 2
    rrect(MX, y, bw2, 84, 12, KHAKI); rrect(MX + bw2 + 10, y, bw2, 84, 12, INK)
    text(MX + 16, y + 12, 'TU CONTINUES', 'BS', 15, CREAM)
    para(MX + 16, y + 32, bw2 - 32, "Tes muscles travaillent, ou une gêne reste stable ou diminue pendant la séance.", size=10, leading=13.5, color=CREAM)
    text(MX + bw2 + 26, y + 12, 'TU ARRÊTES LA POSITION', 'BS', 15, YEL)
    para(MX + bw2 + 26, y + 32, bw2 - 32, "Ça fait mal dans le dos pendant l'effort, ou c'est pire le lendemain. Reprends en version facile ; si ça dure, vois un kiné ou ton médecin.", size=10, leading=13.5, color=CREAM)
    return y + 84


def pos_pages(label, title, meta, keys, start_n, newset, pnum, extra=None):
    page_bg(); header_small(label)
    section(94, title, meta)
    y = 130
    for i, k in enumerate(keys):
        y += pos_card(y, start_n + i, k, new=(k in newset)) + 8
    if extra:
        y = extra(y + 14)
    footer(pnum); c.showPage()
    return y

S1 = SEM[0]['k']
E4 = pos_pages('SEMAINE 1', 'LES 6 POSITIONS DE BASE', 'Semaine 1 · dans cet ordre', S1[:3], 1, set(), 4)
E5 = pos_pages('SEMAINE 1 · SUITE', 'LES 6 POSITIONS DE BASE', 'Suite', S1[3:], 4, set(), 5, regle_dos)
E6 = pos_pages('SEMAINES 2 ET 3', 'LES NOUVEAUTÉS', 'Semaines 2 et 3', ['epaules', 'pontUneJambe', 'rotationD'], 1, set(), 6)
E7 = pos_pages('SEMAINES 3 ET 4', 'LES NOUVEAUTÉS', 'Semaines 3 et 4', ['coudeGenou', 'montagne', 'banane'], 4, set(), 7)

# ------------------------------------------------------------------ page 8 : circuits + récupérer
page_bg(); header_small('TES CIRCUITS')
section(94, 'LE CIRCUIT DE CHAQUE SEMAINE', 'Dans cet ordre, 2 tours')
y = 130
for k, s in enumerate(SEM):
    hh = 96
    rrect(MX, y, CW, hh, 12, WHITE if k < 3 else INK, SAND if k < 3 else None)
    fg = INK if k < 3 else CREAM
    text(MX + 16, y + 12, 'SEMAINE %d · %s' % (k + 1, b(s['t']).upper()), 'BS', 15, YEL if k == 3 else INK)
    cw6 = (CW - 32) / 6
    for i, key in enumerate(s['k']):
        x = MX + 16 + i * cw6
        picto(POS[key]['p'], x, y + 32, cw6 - 16, ink=fg, floor=SAND if k < 3 else INK3, arrow=KHAKI if k < 3 else YEL)
        nm = b(POS[key]['n']).replace('Planche latérale', 'Latérale').replace(', rotation', ' + rot.').replace('Planche, épaules touchées', 'Épaules touchées')
        para(x, y + 68, cw6 - 6, ('<b>%s</b>' % nm) if key in s['nv'] else nm, size=8.5, leading=10, color=fg)
    y += hh + 8
y += 10
section(y, 'RETOUR AU CALME', '2 minutes, après chaque séance'); y += 36
y += band(y, "POSTURE\nDE L'ENFANT", "Assis sur les talons, bras tendus devant, front vers le sol : 1 minute. Puis allongé sur le dos, une main sur le ventre : inspire 4 secondes, expire 6 secondes, pendant 1 minute.") + 10
y += band(y, 'JOURS DE\nRÉCUPÉRATION', "20 à 30 minutes de marche, de vélo ou de mobilité douce. Le muscle se renforce pendant la récupération : ces jours-là font partie du défi.", fill=WHITE, lc=INK, bc=INK) + 10
P8 = y
footer(8); c.showPage()

# ------------------------------------------------------------------ page 9 : calendrier
page_bg(); header_small('TES 30 JOURS')
section(94, 'TON CALENDRIER', 'Coche chaque jour réalisé')
y = 130; cols = 6; gap = 6
cw6 = (CW - (cols - 1) * gap) / cols; chh = 50
for dd in range(1, 31):
    r, k = divmod(dd - 1, cols)
    x = MX + k * (cw6 + gap); yy = y + r * (chh + gap)
    if dd in (1, 29):
        fill, c1, c2, lab = YEL, INK, INK, ('TEST + SÉANCE' if dd == 1 else 'TEST FINAL')
    elif dd == 30:
        fill, c1, c2, lab = INK, YEL, CREAM, 'RÉCUP + BILAN'
    elif dd in REPOS:
        fill, c1, c2, lab = SAND, INK, OLIVE, 'RÉCUPÉRATION'
    else:
        fill, c1, c2, lab = WHITE, INK, OLIVE, 'SEMAINE %d' % min(4, (dd - 1) // 7 + 1)
    rrect(x, yy, cw6, chh, 8, fill, None if fill != WHITE else SAND)
    text(x + 9, yy + 7, 'J%d' % dd, 'BS', 18, c1)
    text(x + 9, yy + 33, lab, 'Carlito-Bold', 7.6, c2, cs=0.4)
    c.setStrokeColor(c1); c.setLineWidth(0.9)
    c.rect(x + cw6 - 21, H - (yy + 9) - 12, 12, 12, fill=0, stroke=1)
y += 5 * (chh + gap) + 10
rrect(MX, y, CW, 150, 12, INK)
text(MX + 18, y + 16, 'JOUR 29 : TON TEST FINAL', 'BS', 18, YEL)
text(RIGHT - 18, y + 22, 'Mêmes tests, même échauffement', 'Carlito-Bold', 10, CREAM, 'r')
colx = [MX + 18, MX + 210, MX + 305, MX + 400]
for k, h_ in enumerate(['', 'JOUR 1', 'JOUR 29', 'ÉCART']):
    text(colx[k], y + 48, h_, 'Carlito-Bold', 9, SAND, cs=1.2)
for r_, lab in enumerate(['Planche', 'Planche latérale droite', 'Planche latérale gauche']):
    yy = y + 68 + r_ * 24
    text(colx[0], yy, lab, 'Carlito-Bold', 11, CREAM)
    for k in (1, 2, 3):
        c.setStrokeColor(KHAKI); c.setLineWidth(0.9)
        c.line(colx[k], H - (yy + 13), colx[k] + 62, H - (yy + 13))
        text(colx[k] + 65, yy + 1, 's', 'Carlito', 10, SAND)
y += 162
para(MX, y, CW, "<b>Jour 30 :</b> récupération et bilan. Qu'est-ce qui a changé au quotidien : le dos le soir, la posture, les escaliers, ta séance de sport ? La suite : page 10.", size=10.5, leading=15)
y += 50
rrect(MX, y, CW, 74, 10, WHITE, KHAKI)
para(MX + 14, y + 10, CW - 28, "<b>Tu as raté des jours ?</b> Tu as perdu un peu, tu ne repars pas de zéro. Jusqu'à 3 jours : continue. De 4 à 10 jours : reprends au début de la semaine précédente. Plus de 10 jours : refais le test du jour 1, il te donne ton nouveau niveau. La séance guidée te le propose toute seule.", size=10, leading=14)
y += 88
para(MX, y, CW, "Ce programme donne des repères généraux pour des adultes en bonne santé. Il ne remplace pas un avis médical. Réservé à ton usage personnel.", size=9.5, leading=13.5, color=OLIVE)
y += 32
w1 = text(MX, y, 'Une question : ', 'Carlito', 11, OLIVE)
text(MX + w1, y, 'alphasince.contact@gmail.com', 'Carlito-Bold', 11, INK)
P9 = y + 14
footer(9); c.showPage()

# ------------------------------------------------------------------ page 10 : à deux, et après
page_bg(); header_small('ET APRÈS ?')
section(94, 'LE DÉFI À DEUX', 'Un ami, un collègue, ta sœur…')
y = 130
y += num_card(y, 1, 'LE MÊME JOUR 1', '', [
    "Faites le test ensemble, ou en appel vidéo. Chacun note ses temps.",
    "Fixez votre créneau commun, même si vous vous entraînez chacun chez vous."]) + 8
y += num_card(y, 2, 'UN MESSAGE PAR SÉANCE', '', [
    "Une séance faite = une photo de ton calendrier coché, envoyée à l'autre.",
    "Un jour raté ? L'autre te relance. C'est tout l'intérêt d'être deux."]) + 8
y += num_card(y, 3, 'LE GAGNANT DU JOUR 29', '', [
    "On ne compare pas les temps, mais les progrès : celui qui a gagné le plus de secondes entre le jour 1 et le jour 29 a gagné.",
    "Le gage se décide au jour 1 : un resto, un café, une séance de plus pour le perdant."]) + 22
rrect(MX, y, CW, 206, 14, INK)
text(MX + 18, y + 18, 'LE GAINAGE NE SUFFIT PAS.', 'BS', 22, CREAM)
text(MX + 18, y + 46, "LA SUITE, C'EST LA FORCE.", 'BS', 22, YEL)
para(MX + 18, y + 84, CW - 36, "Ces 30 jours ont préparé le terrain : un tronc solide, une habitude, et la preuve que tu tiens un engagement. Pour devenir vraiment plus fort, et protéger tes os et tes articulations en vieillissant, il faut maintenant des charges : squats, fentes, soulevé de terre, rowing, avec une paire d'haltères.", size=11, leading=16, color=CREAM)
para(MX + 18, y + 160, CW - 36, "C'est ce que font les programmes Alpha : <b>S'y remettre en 6 semaines</b> pour apprendre les gestes, puis <b>Force & fessiers 40+</b> sur 12 semaines, avec le circuit de la semaine 4 en échauffement. À retrouver sur <b>alphasince.fr/programmes</b>.", size=11, leading=16, color=CREAM)
y += 218
P10 = y
footer(10); c.showPage(); c.save()
print('ok', OUT, 'fins de page', [round(v) for v in (P2, P3, E4, E5, E6, E7, P8, P9, P10)], '(limite 790)')
