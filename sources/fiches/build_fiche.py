# Fiche Alpha Espoir « Avant la compétition » — charte de Alpha_Seance_Ervine.pdf
import re, sys, os
from reportlab import rl_config
SLIM = os.environ.get('SLIM') == '1'   # version légère pour le site : polices sans hinting, logo réduit
if SLIM:
    rl_config.useA85 = 0
from reportlab.pdfgen import canvas
from reportlab.lib.colors import Color, HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import stringWidth, registerFontFamily
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader, simpleSplit

S = '/tmp/claude-0/-home-claude/03e9a85c-2574-56fc-bde6-ac7af3da3b37/scratchpad'
OUT = sys.argv[1] if len(sys.argv) > 1 else S + '/fiche/Alpha_Espoir_Avant_la_competition.pdf'

FD = S + '/fiche/slim/' if SLIM else None
pdfmetrics.registerFont(TTFont('BS', FD + 'BS.ttf' if SLIM else S + '/fonts/BigShoulders-Bold.ttf'))
pdfmetrics.registerFont(TTFont('Carlito', FD + 'Carlito-Regular.ttf' if SLIM else '/usr/share/fonts/truetype/crosextra/Carlito-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Carlito-Bold', FD + 'Carlito-Bold.ttf' if SLIM else '/usr/share/fonts/truetype/crosextra/Carlito-Bold.ttf'))
registerFontFamily('Carlito', normal='Carlito', bold='Carlito-Bold', italic='Carlito', boldItalic='Carlito-Bold')

W, H = 595.2756, 841.8898
INK, CREAM, KHAKI = HexColor('#12110C'), HexColor('#E4E1B8'), HexColor('#807C3A')
OLIVE, SAND, INK3, YEL, WHITE = HexColor('#4A4620'), HexColor('#C9C49A'), HexColor('#3F3C22'), HexColor('#F2E415'), HexColor('#FFFFFF')
MX, CW = 44, 507.28          # marge et largeur utile
RIGHT = MX + CW
LOGO = ImageReader(S + ('/fiche/slim/logo_260_16.png' if SLIM else '/pdf/logo.png'))
NPAGES = 4
DOC = 'Alpha Espoir · Avant la compétition'

ESPOIR = ['M107.8 77.1L177.1 5.1L172.7 28.2L131.1 77.1ZM131.1 75.3L183.8 42L178 59.8L127.8 92.7ZM128.9 91.3L182 75.3L173.6 92.7L124.4 107.3ZM124.4 108.7L169.1 107.8L157.6 119.8L121.1 121.6ZM120 120.7L154.9 134.9L142.9 139.8L112.2 129.6Z',
          'M68.9 77.1L27.3 28.2L22.9 5.1L92.2 77.1ZM72.2 92.7L22 59.8L16.2 42L68.9 75.3ZM75.6 107.3L26.4 92.7L18 75.3L71.1 91.3ZM78.9 121.6L42.4 119.8L30.9 107.8L75.6 108.7ZM87.8 129.6L57.1 139.8L45.1 134.9L80 120.7Z',
          'M100 118.9Q110.4 109.3 111.6 75.3L132.2 75.3L130 106L122.9 121.6L110.4 133.1L105.1 141.6L100 161.1L94.9 141.6L89.6 133.1L77.1 121.6L70 106L67.8 75.3L88.4 75.3Q89.6 109.3 100 118.9Z']

c = canvas.Canvas(OUT, pagesize=(W, H), pageCompression=1)
c.setTitle('Alpha Espoir - Avant la compétition')
c.setAuthor('Alpha Since')
c.setSubject('De J-3 au lendemain : repas, eau, entraînement, récupération')


def asc(font, size):
    return pdfmetrics.getAscent(font, size)


def text(x, top, s, font, size, color, align='l', cs=0):
    """Texte positionné par le haut de ligne, comme dans le PDF de référence."""
    c.setFillColor(color)
    t = c.beginText()
    w = stringWidth(s, font, size) + cs * max(0, len(s) - 1)
    if align == 'r':
        x = x - w
    elif align == 'c':
        x = x - w / 2
    t.setTextOrigin(x, H - top - asc(font, size))
    t.setFont(font, size)
    t.setCharSpace(cs)
    t.textOut(s)
    c.saveState()          # l'interlettrage ne doit pas déborder sur les textes suivants
    c.drawText(t)
    c.restoreState()
    return w


def rrect(x, top, w, h, r, fill, stroke=None, sw=0.9):
    c.setFillColor(fill)
    if stroke is not None:
        c.setStrokeColor(stroke)
        c.setLineWidth(sw)
    c.roundRect(x, H - top - h, w, h, r, fill=1, stroke=1 if stroke is not None else 0)


def para(x, top, w, html, size=11, leading=15, color=INK, font='Carlito', draw=True):
    st = ParagraphStyle('p', fontName=font, fontSize=size, leading=leading, textColor=color)
    p = Paragraph(html, st)
    _, h = p.wrap(w, 2000)
    if draw:
        p.drawOn(c, x, H - top - h)
    return h


def emblem(x, top, w, color):
    s = w / 176.0
    c.setFillColor(color)
    c.setStrokeColor(color)
    c.setLineWidth(2 * s)
    c.setLineJoin(1)
    for d in ESPOIR:
        p = c.beginPath()
        toks = re.findall(r'[MLQZ]|-?\d+\.?\d*', d)
        i, cur = 0, (0, 0)
        P = lambda px, py: (x + (px - 12) * s, H - (top + py * s))
        while i < len(toks):
            t = toks[i]
            if t == 'M':
                cur = (float(toks[i + 1]), float(toks[i + 2])); p.moveTo(*P(*cur)); i += 3
            elif t == 'L':
                cur = (float(toks[i + 1]), float(toks[i + 2])); p.lineTo(*P(*cur)); i += 3
            elif t == 'Q':
                q = (float(toks[i + 1]), float(toks[i + 2])); e = (float(toks[i + 3]), float(toks[i + 4]))
                c1 = (cur[0] + 2 / 3 * (q[0] - cur[0]), cur[1] + 2 / 3 * (q[1] - cur[1]))
                c2 = (e[0] + 2 / 3 * (q[0] - e[0]), e[1] + 2 / 3 * (q[1] - e[1]))
                p.curveTo(*P(*c1), *P(*c2), *P(*e)); cur = e; i += 5
            elif t == 'Z':
                p.close(); i += 1
            else:
                cur = (float(toks[i]), float(toks[i + 1])); p.lineTo(*P(*cur)); i += 2
        c.drawPath(p, fill=1, stroke=1)


def page_bg():
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H, fill=1, stroke=0)


def header_small(label):
    c.setFillColor(KHAKI)
    c.rect(0, H - 58, W, 58, fill=1, stroke=0)
    lh = 44
    lw = lh * 736 / 616.0
    c.drawImage(LOGO, MX, H - 7 - lh, lw, lh, mask='auto')
    text(RIGHT, 25, label, 'Carlito-Bold', 9.5, INK, 'r', cs=1.9)


def footer(n):
    c.setStrokeColor(SAND)
    c.setLineWidth(0.75)
    c.line(MX, H - 799.5, RIGHT, H - 799.5)
    text(MX, 809, 'BE READY WHERE IT ALL BEGINS', 'Carlito-Bold', 7.5, OLIVE, cs=1.45)
    text(RIGHT, 808, '%s · %d / %d' % (DOC, n, NPAGES), 'Carlito', 9, OLIVE, 'r')


def section(top, title, meta=None):
    text(MX, top, title, 'BS', 24, INK)
    if meta:
        text(RIGHT, top + 8, meta, 'Carlito-Bold', 10.5, OLIVE, 'r')


def bullets(x, top, w, items, color=INK, dot=KHAKI, size=11, gap=3.5, draw=True):
    y = top
    for it in items:
        h = para(x + 14, y, w - 14, it, size=size, leading=15, color=color, draw=draw)
        if draw:
            c.setFillColor(dot)
            c.circle(x + 2.5, H - (y + 8.2), 2.5, fill=1, stroke=0)
        y += h + gap
    return y - top - gap


def day_card(top, tag, title, sub, items, ts=19):
    """Carte blanche numérotée, comme « Tes 3 priorités »."""
    tx = 122
    w = RIGHT - tx - 18
    hb = bullets(tx, 0, w, items, draw=False)
    h = 71 + hb + 17
    rrect(MX, top, CW, h, 12, WHITE, SAND)
    rrect(60, top + 18, 48, 36, 8, INK)
    text(84, top + 24.5 + (19 - ts) * 0.45, tag, 'BS', ts, YEL, 'c')
    text(tx, top + 19, title, 'BS', 18, INK)
    text(tx, top + 47, sub, 'Carlito', 10.5, OLIVE)
    bullets(tx, top + 71, w, items)
    return h


# ------------------------------------------------------------------ page 1
page_bg()
c.setFillColor(KHAKI); c.rect(0, H - 72, W, 72, fill=1, stroke=0)
lh = 58; lw = lh * 736 / 616.0
c.drawImage(LOGO, (W - lw) / 2, H - 7 - lh, lw, lh, mask='auto')
c.setFillColor(INK); c.rect(0, H - 72 - 262, W, 262, fill=1, stroke=0)
c.setFillColor(YEL); c.rect(MX, H - 107 - 2, 26, 2, fill=1, stroke=0)
text(80, 105, 'BE READY WHERE IT ALL BEGINS', 'Carlito-Bold', 8.5, CREAM, cs=1.75)
text(MX, 124, 'TON MATCH SE PRÉPARE', 'BS', 46, CREAM)
text(MX, 166, 'TROIS JOURS AVANT.', 'BS', 46, YEL)
emblem(445, 112, 106, YEL)
para(MX, 221, 430, "Voici quoi manger, quoi boire, comment t'entraîner et comment récupérer, jour après jour, de J-3 jusqu'au lendemain du match.", size=13, leading=19, color=CREAM)
x = MX
for i, lab in enumerate(['Alpha Espoir', '15–17 ans', 'De J-3 au lendemain', 'Repas · Eau · Entraînement · Récupération']):
    w = stringWidth(lab, 'Carlito-Bold', 10.5) + 22
    if i == 0:
        rrect(x, 293, w, 22, 11, YEL)
        text(x + 11, 300, lab, 'Carlito-Bold', 10.5, INK)
    else:
        rrect(x, 293, w, 22, 11, INK, INK3)
        text(x + 11, 300, lab, 'Carlito-Bold', 10.5, CREAM)
    x += w + 7

section(364, 'TA SEMAINE DE MATCH', 'En semaine, on parle du dîner : le midi, c\'est la cantine')
cards = [('J-3', 'dernière séance dure'), ('J-2', 'le dîner des féculents'), ('J-1', 'rien de nouveau'), ('JOUR J', 'un vrai petit déjeuner')]
cwid = (CW - 3 * 10.4) / 4
for i, (a, b) in enumerate(cards):
    cx = MX + i * (cwid + 10.4)
    rrect(cx, 400, cwid, 62, 10, WHITE, SAND)
    text(cx + 13, 412, a, 'BS', 24, INK)
    text(cx + 13, 440, b, 'Carlito', 10.5, OLIVE)

rrect(MX, 482, CW, 290, 14, INK)
text(66, 503, 'La charge de la semaine', 'Carlito-Bold', 12.5, YEL)
rows = [('J-3', 1.0, KHAKI, CREAM, 'SÉANCE DURE', 'la dernière de la semaine'),
        ('J-2', 0.66, KHAKI, CREAM, 'SÉANCE COURTE', 'technique et vitesse'),
        ('J-1', 0.36, KHAKI, CREAM, 'MISE EN ROUTE', '15 à 20 minutes'),
        ('JOUR J', 1.0, YEL, INK, 'MATCH', "l'échauffement de ton club"),
        ('J+1', 0.36, KHAKI, CREAM, 'RÉCUPÉRATION', '20 à 30 min faciles')]
bx, bw, by = 134, RIGHT - 22 - 134, 527
for k, (tag, frac, fill, fg, t1, t2) in enumerate(rows):
    y = by + k * 39
    text(66, y + 9, tag, 'BS', 16, CREAM)
    w = bw * frac
    rrect(bx, y, w, 33, 6, fill)
    text(bx + 12, y + 4.5, t1, 'BS', 14, fg)
    text(bx + 12, y + 19.5, t2, 'Carlito-Bold', 9, fg)
para(66, 730, CW - 44, "<b>On charge tôt, on allège avant le match.</b> Plus le match approche, plus la séance raccourcit. Le lendemain, tu bouges léger pour récupérer.", size=11.5, leading=16, color=CREAM)
footer(1)
c.showPage()

# ------------------------------------------------------------------ page 2
page_bg(); header_small('LES TROIS JOURS AVANT')
section(94, 'DE J-3 À J-1', "Le midi, c'est la cantine : on parle du dîner")
y = 130
y += day_card(y, 'J-3', 'LA DERNIÈRE SÉANCE DURE', "Trois jours avant, tu peux encore travailler fort. Après, on allège.", [
    "<b>Dîner.</b> Complet : viande, poisson ou œufs, un féculent, des légumes. Exemple : poulet ou poisson, riz, courgettes. De l'eau à table.",
    "<b>Entraînement.</b> Dernière séance dure de la semaine, au club ou avec Alpha. Ensuite, plus de travail lourd sur les jambes.",
    "<b>Récupération.</b> Coucher à heure fixe, 8 à 10 heures de sommeil."]) + 8
y += day_card(y, 'J-2', 'LE DÎNER DES FÉCULENTS', "Tu remplis le réservoir et tu protèges ta nuit.", [
    "<b>Dîner.</b> Une assiette de pâtes, de riz ou de pommes de terre plus grosse que d'habitude. Exemple : pâtes bolognaise ou pâtes au thon, yaourt, fruit. Pas de fast-food ni de friture.",
    "<b>Entraînement.</b> Séance plus courte : technique, vitesse sur quelques mètres. Pas de séance Alpha pour les jambes.",
    "<b>Récupération.</b> C'est la nuit qui compte le plus : si le trac gâche celle de la veille, c'est elle qui te porte."]) + 8
y += day_card(y, 'J-1', 'RIEN DE NOUVEAU', "La veille, tu ne testes rien : ni plat, ni exercice.", [
    "<b>Dîner.</b> Un plat que tu connais, riche en féculents, peu gras, peu épicé. Exemple : riz ou pâtes, blanc de poulet ou omelette, compote. Dîner 2 heures avant le coucher. Pas de boisson énergisante.",
    "<b>Entraînement.</b> Repos, ou 15 à 20 minutes de mise en route : mobilité et quelques accélérations. Pas de musculation.",
    "<b>Récupération.</b> Sac prêt la veille, téléphone posé 30 minutes avant de dormir, coucher à l'heure habituelle."]) + 8
# bandeau hydratation
wt = "Une gourde dans ton sac dès J-3, à finir et à remplir au moins une fois dans la journée. Ton repère : des urines claires. De l'eau, pas de soda ni de boisson énergisante."
lab_w = 150
hw = para(0, 0, CW - 36 - lab_w, wt, size=10.5, leading=15, color=CREAM, draw=False)
bh = hw + 24
rrect(MX, y, CW, bh, 12, INK)
text(MX + 18, y + (bh - 30) / 2, "L'EAU,", 'BS', 15, YEL)
text(MX + 18, y + (bh - 30) / 2 + 15, 'TOUS LES JOURS', 'BS', 15, YEL)
para(MX + 18 + lab_w, y + 12, CW - 36 - lab_w, wt, size=10.5, leading=15, color=CREAM)
P2_END = y + bh
footer(2)
c.showPage()

# ------------------------------------------------------------------ page 3
def cols3(top, items, title=None):
    """Carte blanche à trois colonnes."""
    gw = 16
    c3 = (CW - 36 - 2 * gw) / 3
    hh = [para(0, 0, c3, d, size=10.5, leading=15, color=OLIVE, draw=False) for _, d in items]
    th = 16 + 22 + max(hh) + 14
    rrect(MX, top, CW, th, 12, WHITE, SAND)
    for k, (a, d) in enumerate(items):
        cx = 62 + k * (c3 + gw)
        text(cx, top + 16, a, 'BS', 15, INK)
        para(cx, top + 38, c3, d, size=10.5, leading=15, color=OLIVE)
        if k:
            c.setStrokeColor(SAND); c.setLineWidth(0.75)
            c.line(cx - gw / 2, H - (top + 16), cx - gw / 2, H - (top + th - 14))
    return th


page_bg(); header_small('LE JOUR DU MATCH')
section(94, 'JOUR J, AVANT LE MATCH', "Match en début d'après-midi")
y = 130
y += day_card(y, 'LEVER', 'UN VRAI PETIT DÉJEUNER', "C'est lui qui lance ta journée de match. Tu le prends tôt.", [
    "<b>Dans l'assiette.</b> Pain ou flocons d'avoine, laitage, fruit, des œufs si tu aimes.",
    "<b>Eau.</b> Un grand verre au réveil. Tu remplis ta gourde : elle ne te quitte plus."], ts=15) + 8
y += day_card(y, 'H-3', 'DÉJEUNER TÔT', "Trois heures avant le coup d'envoi : vers 11 h pour un match à 14 h.", [
    "<b>Dans l'assiette.</b> Féculents, un peu de poulet, de poisson ou d'œufs, peu de gras. Tu sors de table sans être lourd.",
    "<b>Eau.</b> À table, puis par petites gorgées jusqu'au départ."]) + 8
y += day_card(y, 'H-1 H 30', 'TU REMANGES UN PEU', "Une heure et demie avant : juste de quoi tenir jusqu'au bout du match.", [
    "<b>Collation.</b> Banane, compote, pain ou barre de céréales.",
    "<b>Eau.</b> Ta gourde est finie avant l'échauffement."], ts=12.5) + 8
y += day_card(y, 'MATCH', 'ÉCHAUFFEMENT ET MATCH', "Arrive en avance, sac prêt depuis la veille.", [
    "<b>Échauffement.</b> Celui de ton club, 15 à 20 minutes.",
    "<b>Eau.</b> Quelques gorgées à chaque pause et à la mi-temps."], ts=15) + 12
y += cols3(y, [('MATCH LE MATIN OU LE SOIR', "Même logique : dernier repas 3 heures avant, un peu à manger 1 h 30 avant, de l'eau depuis le lever."),
               ('MATCH CHAQUE WEEK-END', "Ta séance dure se place le mardi ou le mercredi pour un match le samedi."),
               ('CATÉGORIES DE POIDS', "Avant 18 ans, pas de régime ni de privation d'eau avant la pesée.")])
P3_END = y
footer(3)
c.showPage()

# ------------------------------------------------------------------ page 4
page_bg(); header_small('APRÈS LE MATCH')
section(94, 'APRÈS LE MATCH', 'La récupération commence au coup de sifflet')
y = 130
lead = "C'est dans la demi-heure qui suit l'effort que ton corps recharge ses réserves le plus vite. Tu trottines ou tu marches 5 à 10 minutes, puis tu bois et tu manges, avant même la douche."
boxes = [('TU BOIS', "Une gourde de 50 cl, par gorgées."),
         ('DES SUCRES', "Banane, compote, pain, barre de céréales ou jus de fruit."),
         ('DES PROTÉINES', "Lait chocolaté, yaourt à boire, sandwich au poulet, au thon ou au fromage.")]
tail = "<b>Exemples.</b> Lait chocolaté et banane, ou sandwich et compote. <b>En tournoi</b>, pareil entre deux matchs."
iw = CW - 36
hl = para(0, 0, iw, lead, size=11, leading=15, draw=False)
bwid = (iw - 16) / 3
hb = max(para(0, 0, bwid - 24, d, size=10.5, leading=15, draw=False) for _, d in boxes)
bxh = 11 + 19 + hb + 11
ht = para(0, 0, iw, tail, size=10.5, leading=15, draw=False)
ch = 18 + 26 + hl + 10 + bxh + 9 + ht + 14
rrect(MX, y, CW, ch, 12, YEL)
text(MX + 18, y + 18, 'LES 30 PREMIÈRES MINUTES', 'BS', 18, INK)
text(RIGHT - 18, y + 24, 'Ne les laisse pas passer', 'Carlito-Bold', 10.5, INK, 'r')
yy = y + 18 + 26
para(MX + 18, yy, iw, lead, size=11, leading=15)
yy += hl + 10
for k, (a, d) in enumerate(boxes):
    bx = MX + 18 + k * (bwid + 8)
    rrect(bx, yy, bwid, bxh, 8, INK)
    text(bx + 12, yy + 11, a, 'BS', 15, YEL)
    para(bx + 12, yy + 30, bwid - 24, d, size=10.5, leading=15, color=CREAM)
yy += bxh + 9
para(MX + 18, yy, iw, tail, size=10.5, leading=15)
y += ch + 8

colw = (CW - 10) / 2
left = ["<b>Jusqu'au coucher.</b> Tu continues à boire, par petites quantités. Ton repère : des urines claires avant de dormir.",
        "<b>Électrolytes, si besoin.</b> Avec la sueur tu perds du sel. Un repas normalement salé suffit le plus souvent. Forte chaleur, grosse transpiration ou tournoi : une boisson de l'effort, ou la recette maison, un tiers de jus de raisin, deux tiers d'eau, une pincée de sel.",
        "<b>Jamais</b> de boisson énergisante."]
right = ["<b>Quand.</b> Deux à trois heures après le match.",
         "<b>Dans l'assiette.</b> Une grosse portion de pâtes, de riz, de semoule ou de pommes de terre. Poulet, poisson, œufs ou lentilles. Légumes, laitage, fruit.",
         "<b>Exemple.</b> Riz, poulet ou omelette, légumes, yaourt, fruit.",
         "<b>Ensuite.</b> Douche, coucher sans écran : c'est la nuit qui répare."]
hl2 = bullets(0, 0, colw - 36, left, size=10.5, draw=False)
hr2 = bullets(0, 0, colw - 36, right, size=10.5, draw=False)
ch2 = 16 + 22 + 10 + max(hl2, hr2) + 14
rrect(MX, y, colw, ch2, 12, INK)
rrect(MX + colw + 10, y, colw, ch2, 12, WHITE, SAND)
text(MX + 18, y + 16, "L'EAU ET LES ÉLECTROLYTES", 'BS', 17, YEL)
text(MX + colw + 28, y + 16, 'LE DÎNER QUI RECHARGE', 'BS', 17, INK)
bullets(MX + 18, y + 48, colw - 36, left, color=CREAM, dot=YEL, size=10.5)
bullets(MX + colw + 28, y + 48, colw - 36, right, color=INK, dot=KHAKI, size=10.5)
y += ch2 + 22

section(y, 'LE LENDEMAIN', 'J+1')
y += 34
y += cols3(y, [('DÎNER', "Complet, avec de l'eau. C'est aujourd'hui que le corps se reconstruit."),
               ('ENTRAÎNEMENT', "20 à 30 minutes faciles : marche, vélo, mobilité. Pas de séance dure pour les jambes."),
               ('RÉCUPÉRATION', "Une douleur qui dure plus de 2 jours : tu en parles à ton entraîneur, puis au médecin ou au kiné.")]) + 12
para(MX, y, CW, "Ces repères sont généraux. Ils ne remplacent pas l'avis de ton entraîneur ni celui de ton médecin.", size=10.5, leading=15, color=OLIVE)
y += 18
w1 = text(MX, y, 'Une question, une gêne : ', 'Carlito', 11, OLIVE)
text(MX + w1, y, 'alphasince.contact@gmail.com', 'Carlito-Bold', 11, INK)
P4_END = y + 14
footer(4)
c.showPage()
c.save()
print('ok', OUT, 'p2 end', round(P2_END), 'p3 end', round(P3_END), 'p4 end', round(P4_END), '(limite 790)')
for t, sz in [('LEVER', 17), ('H-1 H 30', 14), ('MATCH', 17)]:
    print(t, round(stringWidth(t, 'BS', sz), 1), '(boîte 48)')
