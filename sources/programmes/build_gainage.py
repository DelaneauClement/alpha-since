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
NPAGES = 6

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


PALIERS = [('PALIER 1', '20 S', '25 S', 'semaine 1', 14), ('PALIER 2', '30 S', '20 S', 'semaine 2', 15),
           ('PALIER 3', '40 S', '20 S', 'semaine 3', 17), ('PALIER 4', '50 S', '20 S', 'semaine 4', 19)]

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
para(MX, 221, 470, "Le gainage, c'est le socle d'Alpha : un tronc solide protège ton dos et rend chaque mouvement plus fort. Un test, quatre paliers, un test final : en 30 jours, tu mesures toi-même le chemin parcouru.", size=13, leading=19, color=CREAM)
x = MX
for i, lab in enumerate(['Défi gainage', '30 jours', '14 à 19 min', 'À la maison', 'Sans matériel']):
    w = stringWidth(lab, 'Carlito-Bold', 10.5) + 22
    if i == 0:
        rrect(x, 293, w, 22, 11, YEL); text(x + 11, 300, lab, 'Carlito-Bold', 10.5, INK)
    else:
        rrect(x, 293, w, 22, 11, INK, INK3); text(x + 11, 300, lab, 'Carlito-Bold', 10.5, CREAM)
    x += w + 7

section(364, 'TON DÉFI EN UN COUP D\'ŒIL', '5 séances et 2 jours de récupération par semaine')
stat_cards(400, [('J1', 'test de départ'), ('4', 'paliers d\'une semaine'), ('6', 'positions par tour'), ('J29', 'test final')])

rrect(MX, 482, CW, 290, 14, INK)
text(66, 503, 'Ta progression', 'Carlito-Bold', 12.5, YEL)
bx, bw, by = 134, RIGHT - 22 - 134, 527
for k, (p, e, r, wk, mn) in enumerate(PALIERS):
    y = by + k * 39
    text(66, y + 9, 'SEM. %d' % (k + 1), 'BS', 16, CREAM)
    rrect(bx, y, bw * (0.55 + 0.15 * k), 33, 6, KHAKI if k < 3 else YEL)
    fg = CREAM if k < 3 else INK
    text(bx + 12, y + 4.5, '%s · %s D\'EFFORT' % (p, e), 'BS', 14, fg)
    text(bx + 12, y + 19.5, '%s de repos · environ %d minutes' % (r.lower().replace(' s', ' secondes'), mn), 'Carlito-Bold', 9, fg)
y = by + 4 * 39
text(66, y + 9, 'J29', 'BS', 16, CREAM)
rrect(bx, y, bw * 0.4, 33, 6, CREAM)
text(bx + 12, y + 4.5, 'TEST FINAL', 'BS', 14, INK)
text(bx + 12, y + 19.5, 'les mêmes tests qu\'au jour 1', 'Carlito-Bold', 9, INK)
para(66, 730, CW - 44, "<b>Le chrono monte, la séance garde sa forme.</b> Chaque semaine, tu tiens 10 secondes de plus sur chaque position. Tu ne passes au palier suivant que si tu tiens propre jusqu'au bout.", size=11.5, leading=16, color=CREAM)
footer(1); c.showPage()

# ------------------------------------------------------------------ page 2
page_bg(); header_small('AVANT DE COMMENCER')
section(94, 'TES 3 RÈGLES', 'Elles valent pour les 30 jours')
y = 130
y += num_card(y, 1, 'RESPIRER GAINÉ', '', [
    "Ne bloque jamais ta respiration pendant une position.",
    "Serre le ventre comme si tu attendais une petite tape dessus, puis respire calmement par le ventre.",
    "C'est ce qui te servira ensuite, au sport comme au quotidien."]) + 8
y += num_card(y, 2, 'LA QUALITÉ AVANT LE CHRONO', '', [
    "Dès que la position se dégrade (bassin qui tombe, dos creusé), tu arrêtes, même si le chrono tourne.",
    "Garde toujours quelques secondes en réserve : tu t'arrêtes en sachant que tu pourrais tenir encore un peu.",
    "Une position tenue 15 secondes proprement vaut mieux que 40 secondes mal tenues."]) + 8
y += num_card(y, 3, 'UN CRÉNEAU FIXE', '', [
    "Choisis ton moment, toujours le même : le matin au réveil, à midi, ou en début de soirée.",
    "Note-le dans ton agenda pour les 30 jours. La discipline passe avant la motivation : tu y vas parce que c'est prévu.",
    "Un jour raté ne casse pas le défi. Tu reprends simplement le lendemain."]) + 14

# test de départ
th = 184
rrect(MX, y, CW, th, 12, YEL)
text(MX + 18, y + 16, 'JOUR 1 : TON TEST DE DÉPART', 'BS', 18, INK)
text(RIGHT - 18, y + 22, 'Note tes temps : tu les compareras au jour 29', 'Carlito-Bold', 10, INK, 'r')
para(MX + 18, y + 44, CW - 36, "Échauffe-toi 2 minutes (page 3), puis tiens chaque position le plus longtemps possible <b>en restant parfaitement aligné</b>. Le chrono s'arrête au premier défaut. 2 minutes de repos entre chaque test. <b>Enceinte, accouchée depuis moins de 6 mois, hernie discale, douleur de dos qui dure, opération récente : demande d'abord l'avis de ton médecin ou de ton kiné.</b>", size=10.5, leading=15)
bw3 = (CW - 36 - 16) / 3
for k, lab in enumerate(['Planche', 'Planche latérale droite', 'Planche latérale gauche']):
    bx = MX + 18 + k * (bw3 + 8)
    rrect(bx, y + 112, bw3, 56, 8, WHITE)
    text(bx + 12, y + 121, lab.upper(), 'BS', 13, INK)
    text(bx + bw3 - 12, y + 144, 'secondes', 'Carlito', 10, OLIVE, 'r')
    c.setStrokeColor(SAND); c.setLineWidth(0.9); c.line(bx + 12, H - (y + 156), bx + bw3 - 64, H - (y + 156))
y += th + 12
P2 = y
footer(2); c.showPage()

# ------------------------------------------------------------------ page 3
page_bg(); header_small('LE CIRCUIT')
section(94, 'TA SÉANCE')
top = 130; hh = 46
segs = [(0.17, '2 MIN', 'Mise en route', SAND, INK, INK), (0.64, '10 À 15 MIN', 'Circuit : 2 tours', INK, YEL, CREAM), (0.19, '2 MIN', 'Retour au calme', KHAKI, CREAM, CREAM)]
x = MX
for frac, big, small, fill, c1, c2 in segs:
    w = CW * frac - 4
    rrect(x, top, w, hh, 8, fill)
    text(x + 10, top + 7, big, 'BS', 17, c1)
    text(x + 10, top + 28, small, 'Carlito', 9.5, c2)
    x += w + 6
section(196, 'MODE D\'EMPLOI')
stat_cards(232, [('6', 'positions par tour'), ('2', 'tours'), ('1 MIN', 'entre les tours'), ('+10 S', 'chaque semaine')], dark=True)
PH = para(MX, 306, CW, "Lance le chronomètre de ton téléphone et regarde ton palier dans le calendrier (page 6). Tu tiens chaque position le temps d'effort, tu souffles le temps de repos, puis tu passes à la suivante. Après les 6 positions, 1 minute de pause, et tu repars pour un second tour. <b>C'est le chrono qui décide, pas le compteur.</b> Sur les exercices en mouvement (dead bug, bird dog, pont fessier), tu enchaînes lentement pendant tout le temps d'effort : 3 secondes pour aller, 3 secondes pour revenir.", size=10.5, leading=15)
y = 306 + PH + 14
rrect(MX, y, CW, 50, 10, SAND)
text(MX + 16, y + 10, 'MISE EN ROUTE · 2 MIN', 'BS', 14, INK)
text(MX + 16, y + 29, '30 s de dos rond, dos creux à quatre pattes  ·  30 s de cercles de bassin debout  ·  1 min de marche sur place, genoux hauts', 'Carlito', 9.6, INK)
y += 66
section(y, 'LES POSITIONS', 'Dans cet ordre')
y += 36
y += num_card(y, 1, 'PLANCHE', 'VENTRE, GAINAGE', [
    "Sur les avant-bras et la pointe des pieds, coudes sous les épaules.",
    "Serre le ventre et les fessiers, repousse le sol avec les avant-bras.",
    "Respire normalement et tiens."], "Repère : une ligne droite de la tête aux talons. Le bassin ne monte pas, ne s'affaisse pas.") + 8
y += num_card(y, 2, 'PLANCHE LATÉRALE DROITE', 'CÔTÉS, TAILLE', [
    "Allongé sur le côté droit, coude droit sous l'épaule, jambes tendues l'une sur l'autre.",
    "Monte les hanches jusqu'à ce que le corps forme une ligne droite.",
    "Version plus facile : genoux pliés au sol, seules les hanches montent."], "Repère : les hanches restent hautes et ne partent ni en avant ni en arrière.")
P3 = y
footer(3); c.showPage()

# ------------------------------------------------------------------ page 4
page_bg(); header_small('LE CIRCUIT · SUITE')
section(94, 'LES POSITIONS', 'Suite')
y = 130
y += num_card(y, 3, 'DEAD BUG', 'ABDOMINAUX PROFONDS', [
    "Sur le dos, bras tendus vers le plafond, genoux pliés à 90° au-dessus des hanches.",
    "Tends lentement un bras derrière la tête et la jambe opposée vers le sol, sans les poser.",
    "Reviens au centre et change de côté, sans t'arrêter jusqu'à la fin du temps d'effort."], "Repère : le bas du dos reste collé au sol du début à la fin. S'il décolle, réduis l'amplitude.") + 8
y += num_card(y, 4, 'PLANCHE LATÉRALE GAUCHE', 'CÔTÉS, TAILLE', [
    "Les mêmes consignes que la position 2, sur le côté gauche.",
    "Si un côté est nettement plus faible, c'est normal : c'est souvent lui qui progresse le plus en 30 jours."], "Repère : épaule loin de l'oreille, le cou dans le prolongement du dos.") + 8
y += num_card(y, 5, 'BIRD DOG', 'DOS, FESSIERS, ÉQUILIBRE', [
    "À quatre pattes, mains sous les épaules, genoux sous les hanches.",
    "Tends lentement un bras devant et la jambe opposée derrière, jusqu'à l'horizontale.",
    "Tiens 2 secondes, reviens, change de côté. Sans t'arrêter jusqu'à la fin du temps d'effort."], "Repère : le dos reste plat comme une table, on pourrait y poser un verre d'eau.") + 8
y += num_card(y, 6, 'PONT FESSIER', 'FESSIERS, ARRIÈRE DES CUISSES', [
    "Sur le dos, genoux pliés, pieds à plat près des fesses.",
    "Monte le bassin en serrant les fessiers, tiens 1 seconde en haut.",
    "Redescends en 3 secondes, sans reposer complètement."], "Repère : ce sont les fessiers qui poussent, pas le bas du dos.")
P4 = y
footer(4); c.showPage()

# ------------------------------------------------------------------ page 5
page_bg(); header_small('ADAPTER ET RÉCUPÉRER')
section(94, 'À TON NIVEAU')
y = 130
colw = (CW - 10) / 2
left = ["<b>Planche</b> : genoux au sol, le corps aligné des genoux aux épaules.",
        "<b>Planche latérale</b> : genoux pliés au sol.",
        "<b>Dead bug</b> : ne bouge que les jambes, bras immobiles.",
        "<b>Bird dog</b> : tends seulement la jambe, les deux mains restent au sol.",
        "<b>Pont fessier</b> : petite amplitude, sans tenir en haut."]
right = ["<b>Planche</b> : lève un pied de 5 cm, change de pied à mi-temps.",
         "<b>Planche latérale</b> : lève la jambe du dessus.",
         "<b>Dead bug</b> : encore plus lent, 5 secondes pour aller.",
         "<b>Bird dog</b> : ramène coude et genou sous le ventre entre deux extensions.",
         "<b>Pont fessier</b> : sur une jambe, l'autre tendue en l'air."]
hl = bullets(0, 0, colw - 36, left, size=10.5, draw=False)
hr = bullets(0, 0, colw - 36, right, size=10.5, draw=False)
ch = 16 + 22 + 10 + max(hl, hr) + 14
rrect(MX, y, colw, ch, 12, WHITE, SAND)
rrect(MX + colw + 10, y, colw, ch, 12, INK)
text(MX + 18, y + 16, 'PLUS FACILE', 'BS', 17, INK)
text(MX + colw + 28, y + 16, 'PLUS DIFFICILE', 'BS', 17, YEL)
bullets(MX + 18, y + 48, colw - 36, left, size=10.5)
bullets(MX + colw + 28, y + 48, colw - 36, right, color=CREAM, dot=YEL, size=10.5)
y += ch + 10
y += 4 + para(MX, y, CW, "Commence en version facile si le test du jour 1 est en dessous de 20 secondes. Passe en version difficile seulement quand le palier 4 te paraît facile.", size=10.5, leading=15, color=OLIVE)
y += 22

section(y, 'RETOUR AU CALME', '2 minutes, après chaque séance')
y += 36
y += band(y, 'POSTURE\nDE L\'ENFANT', "Assis sur les talons, bras tendus devant, front vers le sol : 1 minute. Puis allongé sur le dos, une main sur le ventre : inspire 4 secondes, expire 6 secondes, pendant 1 minute.") + 12

section(y, 'LES JOURS DE RÉCUPÉRATION', '2 par semaine')
y += 36
y += band(y, 'TU BOUGES,\nSANS GAINER', "20 à 30 minutes de marche, de vélo ou de mobilité douce. Le muscle se renforce pendant la récupération : ces jours-là font partie du défi.", fill=WHITE, lc=INK, bc=INK) + 12

section(y, 'LA RÈGLE POUR TON DOS')
y += 36
bw2 = (CW - 10) / 2
rrect(MX, y, bw2, 74, 12, KHAKI)
rrect(MX + bw2 + 10, y, bw2, 74, 12, INK)
text(MX + 16, y + 12, 'TU CONTINUES', 'BS', 16, CREAM)
para(MX + 16, y + 34, bw2 - 32, "Tu sens tes muscles travailler, ou une gêne qui ne bouge pas ou diminue pendant la séance.", size=10.5, leading=14, color=CREAM)
text(MX + bw2 + 26, y + 12, 'TU ARRÊTES LA POSITION', 'BS', 16, YEL)
para(MX + bw2 + 26, y + 34, bw2 - 32, "Ça fait mal dans le dos pendant l'effort, ou la gêne est plus forte le lendemain.", size=10.5, leading=14, color=CREAM)
y += 84
para(MX, y, CW, "Dans le second cas, reprends en version facile. Si la douleur persiste, fais vérifier par un kiné ou ton médecin avant de continuer.", size=10.5, leading=15, color=OLIVE)
P5 = y + 30
footer(5); c.showPage()

# ------------------------------------------------------------------ page 6
page_bg(); header_small('TES 30 JOURS')
section(94, 'TON CALENDRIER', 'Coche chaque jour réalisé')
REST = {4, 7, 11, 14, 18, 21, 25, 28}
y = 130; cols = 6; gap = 6
cw6 = (CW - (cols - 1) * gap) / cols; chh = 52
for d in range(1, 31):
    r, k = divmod(d - 1, cols)
    x = MX + k * (cw6 + gap); yy = y + r * (chh + gap)
    if d == 1 or d == 29:
        fill, c1, c2, lab = YEL, INK, INK, ('TEST + PALIER 1' if d == 1 else 'TEST FINAL')
    elif d == 30:
        fill, c1, c2, lab = INK, YEL, CREAM, 'RÉCUP + BILAN'
    elif d in REST:
        fill, c1, c2, lab = SAND, INK, OLIVE, 'RÉCUPÉRATION'
    else:
        fill, c1, c2, lab = WHITE, INK, OLIVE, 'PALIER %d' % ((d - 1) // 7 + 1)
    rrect(x, yy, cw6, chh, 8, fill, None if fill != WHITE else SAND)
    text(x + 9, yy + 7, 'J%d' % d, 'BS', 18, c1)
    text(x + 9, yy + 34, lab, 'Carlito-Bold', 7.6, c2, cs=0.4)
    c.setStrokeColor(c1); c.setLineWidth(0.9)
    c.rect(x + cw6 - 21, H - (yy + 9) - 12, 12, 12, fill=0, stroke=1)
y += 5 * (chh + gap) + 6
para(MX, y, CW, "<b>Le calendrier avance, toi tu passes au palier suivant quand tu es prêt.</b> Si tu n'as pas tenu proprement les temps d'une semaine, reste sur le même palier la semaine suivante : c'est comme ça qu'on progresse sans se blesser.", size=10.5, leading=15, color=OLIVE)
y += 50

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
para(MX, y, CW, "<b>Jour 30 :</b> récupération, et un petit bilan. Qu'est-ce qui a changé au quotidien ? Le dos le soir, la posture, les escaliers, ta séance de sport ? Pour continuer, garde 2 séances par semaine au palier 4, ou passe aux versions difficiles.", size=10.5, leading=15)
y += 52
para(MX, y, CW, "Avant de commencer, demande l'avis de ton médecin ou de ton kiné si tu es enceinte, si tu as accouché il y a moins de 6 mois, si tu as une hernie discale, une douleur de dos qui dure ou une opération récente. Ce programme donne des repères généraux et ne remplace pas un avis médical.", size=9.5, leading=13.5, color=OLIVE)
y += 44
w1 = text(MX, y, 'Une question : ', 'Carlito', 11, OLIVE)
text(MX + w1, y, 'alphasince.contact@gmail.com', 'Carlito-Bold', 11, INK)
P6 = y + 14
footer(6); c.showPage(); c.save()
print('ok', OUT, 'fins de page', [round(v) for v in (P2, P3, P4, P5, P6)], '(limite 790)')
