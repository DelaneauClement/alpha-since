# Fiches Alpha Kids « Six jeux pour la semaine » — charte de Alpha_Seance_Ervine.pdf, version légère pour le site.
# Usage : python3 build_kids.py <dossier de sortie>   → Alpha_Kids_3-5_ans.pdf, Alpha_Kids_6-7_ans.pdf, Alpha_Kids_8-10_ans.pdf
import re, sys, os
from reportlab import rl_config
rl_config.useA85 = 0
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import stringWidth, registerFontFamily
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader

S = '/tmp/claude-0/-home-claude/03e9a85c-2574-56fc-bde6-ac7af3da3b37/scratchpad'
OUTDIR = sys.argv[1]
FD = S + '/fiche/slim/'
pdfmetrics.registerFont(TTFont('BS', FD + 'BS.ttf'))
pdfmetrics.registerFont(TTFont('Carlito', FD + 'Carlito-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Carlito-Bold', FD + 'Carlito-Bold.ttf'))
registerFontFamily('Carlito', normal='Carlito', bold='Carlito-Bold', italic='Carlito', boldItalic='Carlito-Bold')

W, H = 595.2756, 841.8898
INK, CREAM, KHAKI = HexColor('#12110C'), HexColor('#E4E1B8'), HexColor('#807C3A')
OLIVE, SAND, INK3, YEL, WHITE = HexColor('#4A4620'), HexColor('#C9C49A'), HexColor('#3F3C22'), HexColor('#F2E415'), HexColor('#FFFFFF')
MX, CW = 44, 507.28
RIGHT = MX + CW
LOGO = ImageReader(FD + 'logo_260_16.png')
NPAGES = 2
# Mêmes glyphes, dans le même ordre, pour les trois fiches : les polices incorporées sont identiques d'un fichier à l'autre.
COMP = 0 if os.environ.get('RAW') == '1' else 1
USED = {}          # premier passage : caractères réellement utilisés par police
PRE = None         # second passage : les mêmes glyphes, dans le même ordre, pour les trois fiches
_split = TTFont.splitString
def _rec(self, text, doc, encoding='utf-8'):
    USED.setdefault(self.fontName, set()).update(text if isinstance(text, str) else text.decode(encoding))
    return _split(self, text, doc, encoding)
TTFont.splitString = _rec

KIDS = ['M116.7 88.2L159.3 50L163.3 62L130 92.2ZM128.9 103.3L170.4 86.9L169.1 98.4L127.8 114.4ZM122.2 126.9L160.2 122.9L154.4 133.1L117.8 137.1Z',
        'M70 92.2L36.7 62L40.7 50L83.3 88.2ZM72.2 114.4L30.9 98.4L29.6 86.9L71.1 103.3ZM82.2 137.1L45.6 133.1L39.8 122.9L77.8 126.9Z',
        'M100 122.9Q112.2 116 116.2 88.2L131.1 88.2L131.8 114.9L123.8 132.7L110.4 142L100 151.8L89.6 142L76.2 132.7L68.2 114.9L68.9 88.2L83.8 88.2Q87.8 116 100 122.9Z']

c = None
DOC = ''


def asc(font, size):
    return pdfmetrics.getAscent(font, size)


def text(x, top, s, font, size, color, align='l', cs=0):
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
    c.saveState()
    c.drawText(t)
    c.restoreState()
    return w


def fit(x, top, s, font, size, color, maxw, minsize=11):
    while size > minsize and stringWidth(s, font, size) > maxw:
        size -= 0.5
    text(x, top, s, font, size, color)
    return size


def rrect(x, top, w, h, r, fill, stroke=None, sw=0.9):
    c.setFillColor(fill)
    if stroke is not None:
        c.setStrokeColor(stroke)
        c.setLineWidth(sw)
    c.roundRect(x, H - top - h, w, h, r, fill=1, stroke=1 if stroke is not None else 0)


def para(x, top, w, html, size=11, leading=15, color=INK, font='Carlito', draw=True):
    html = re.sub(r' ([:;?!»])', '\u00a0\\1', html).replace('« ', '«\u00a0')
    st = ParagraphStyle('p', fontName=font, fontSize=size, leading=leading, textColor=color)
    p = Paragraph(html, st)
    _, h = p.wrap(w, 2000)
    if draw:
        p.drawOn(c, x, H - top - h)
    return h


def emblem(x, top, w, color):
    s = w / 156.0
    c.setFillColor(color)
    c.setStrokeColor(color)
    c.setLineWidth(9 * s)
    c.setLineJoin(1)
    for d in KIDS:
        p = c.beginPath()
        toks = re.findall(r'[MLQZ]|-?\d+\.?\d*', d)
        i, cur = 0, (0, 0)
        P = lambda px, py: (x + (px - 22) * s, H - (top + (py - 40) * s))
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


def bullets(x, top, w, items, color=INK, dot=KHAKI, size=11, leading=15, gap=3.5, draw=True):
    y = top
    for it in items:
        h = para(x + 12, y, w - 12, it, size=size, leading=leading, color=color, draw=draw)
        if draw:
            c.setFillColor(dot)
            c.circle(x + 2.5, H - (y + leading * 0.55), 2.2, fill=1, stroke=0)
        y += h + gap
    return y - top - gap


def cols3(top, items):
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


def game_h(g, w):
    return 16 + 26 + 17 + bullets(0, 0, w - 36, g[3], size=10, leading=13.5, gap=3, draw=False) + 15


def game_card(x, top, w, h, num, g):
    rrect(x, top, w, h, 12, WHITE, SAND)
    rrect(x + 18, top + 16, 26, 26, 7, INK)
    text(x + 31, top + 20.5, str(num), 'BS', 16, YEL, 'c')
    fit(x + 54, top + 19, g[0], 'BS', 17, INK, w - 54 - 16)
    text(x + 18, top + 49, g[1] + ' · ' + g[2], 'Carlito-Bold', 9.5, OLIVE)
    bullets(x + 18, top + 16 + 26 + 17 + 6, w - 36, g[3], size=10, leading=13.5, gap=3)


DATA = [
 dict(age='3–5 ans', file='Alpha_Kids_3-5_ans.pdf',
      lead="À cet âge, ton enfant découvre ce que son corps sait faire : courir, sauter, grimper, lancer. Tout passe par le jeu, avec toi.",
      refs=[('10–13 H', 'de sommeil par 24 heures, sieste comprise'), ('3 H', "de mouvement par jour, dont 1 heure où l’on s’essouffle"), ('1 H', "d’écran au plus par jour, et moins c’est mieux"), ('10 MIN', 'de jeu avec toi, chaque jour')],
      week=[('LUN', 'Le parcours du salon'), ('MAR', 'Dehors : parc ou cour'), ('MER', 'Les animaux'), ('JEU', '1, 2, 3 soleil'), ('VEN', 'Le ballon qui ne tombe pas'), ('SAM', 'La chasse aux couleurs'), ('DIM', 'Sortie en famille')],
      games=[
       ('LE PARCOURS DU SALON', '10 minutes', 'équilibre, ramper, se repérer', ["<b>La règle.</b> Des coussins à enjamber, une table sous laquelle passer, une ligne de scotch à suivre sans tomber.", "<b>Plus facile.</b> Tu lui tiens la main sur la ligne.", "<b>Plus dur.</b> En marche arrière, ou en portant un doudou."]),
       ('1, 2, 3 SOLEIL', '10 minutes', 'courir, s’arrêter, tenir', ["<b>La règle.</b> Tu comptes dos tourné, ton enfant avance en courant. Quand tu te retournes, on se fige. Celui qui bouge repart du début.", "<b>Plus facile.</b> Tu comptes lentement.", "<b>Plus dur.</b> On se fige sur un pied."]),
       ('LE BALLON QUI NE TOMBE PAS', '5 à 10 minutes', 'œil et main ensemble', ["<b>La règle.</b> Un ballon de baudruche à garder en l’air le plus longtemps possible.", "<b>Plus facile.</b> À deux, chacun son tour.", "<b>Plus dur.</b> Avec le pied, la tête, ou sans bouger les pieds."]),
       ('LES ANIMAUX', '5 à 10 minutes', 'force de tout le corps', ["<b>La règle.</b> Marcher comme l’ours, à quatre pattes, fesses hautes. Sauter comme la grenouille. Reculer comme le crabe.", "<b>Plus facile.</b> Deux animaux seulement.", "<b>Plus dur.</b> Une course d’animaux d’un mur à l’autre."]),
       ('LA CHASSE AUX COULEURS', '10 minutes', 'courir, écouter, réagir', ["<b>La règle.</b> Tu annonces une couleur : ton enfant court toucher un objet de cette couleur et revient. Puis on échange les rôles.", "<b>Plus facile.</b> Les objets sont tout près.", "<b>Plus dur.</b> Deux couleurs à la suite, dans l’ordre."]),
       ('LA STATUE MUSICALE', '5 à 10 minutes', 'rythme, contrôle du corps', ["<b>La règle.</b> Vous dansez. Quand la musique s’arrête, tout le monde se fige.", "<b>Plus facile.</b> Se figer sur deux pieds.", "<b>Plus dur.</b> Se figer sur un pied, ou en position d’animal."])]),
 dict(age='6–7 ans', file='Alpha_Kids_6-7_ans.pdf',
      lead="À cet âge, ton enfant enchaîne les gestes et commence à suivre des règles. C’est le moment de varier : ballon, vélo, eau, corde.",
      refs=[('9–12 H', 'de sommeil par nuit'), ('1 H', "par jour où l’on s’essouffle : courir, pédaler, nager"), ('3 FOIS', 'par semaine : sauter, grimper, se suspendre, porter'), ('2 H', "d’écran par jour, c’est le plafond")],
      week=[('LUN', 'La marelle'), ('MAR', 'Club, ou jeu dehors'), ('MER', 'Le parcours chrono'), ('JEU', 'Le mur'), ('VEN', 'La corde à sauter'), ('SAM', 'Chat perché'), ('DIM', 'Sortie en famille')],
      games=[
       ('LA MARELLE', '10 minutes', 'équilibre, appuis', ["<b>La règle.</b> Des cases à la craie, ou au scotch dans le couloir. À cloche-pied dans les cases simples, deux pieds dans les doubles, sans toucher les lignes.", "<b>Plus facile.</b> Tout à deux pieds.", "<b>Plus dur.</b> Sur le pied le moins à l’aise."]),
       ('LE MUR', '10 minutes', 'lancer, attraper', ["<b>La règle.</b> Lancer une balle contre un mur et la rattraper, dix fois de suite. Sans balle : une paire de chaussettes roulées.", "<b>Plus facile.</b> À deux mains, après un rebond au sol.", "<b>Plus dur.</b> À une main, ou en tapant dans les mains avant de rattraper."]),
       ('LE PARCOURS CHRONO', '10 à 15 minutes', 'enchaîner des gestes', ["<b>La règle.</b> Un slalom entre des objets, un saut par-dessus un coussin, un passage à quatre pattes. Tu chronomètres.", "<b>Le principe.</b> On bat son propre temps, jamais celui d’un autre.", "<b>Plus dur.</b> À l’envers, ou avec un ballon dans les mains."]),
       ('LA CORDE À SAUTER', '5 à 10 minutes', 'rythme, détente', ["<b>La règle.</b> 5 sauts d’affilée, puis 10, puis en avançant.", "<b>Sans corde.</b> Sauts pieds joints par-dessus une ligne, d’un côté à l’autre.", "<b>Plus dur.</b> À cloche-pied, ou en arrière."]),
       ('LE MIROIR', '5 à 10 minutes', 'gestes de base, tenue du corps', ["<b>La règle.</b> Face à face, ton enfant copie tes gestes : s’accroupir, tenir sur un pied, la planche 5 secondes, toucher ses pieds.", "<b>Ensuite.</b> Vous échangez les rôles.", "<b>Plus dur.</b> De plus en plus vite, sans se tromper."]),
       ('CHAT PERCHÉ', '10 à 15 minutes', 'vitesse, changements de direction', ["<b>La règle.</b> À partir de trois joueurs, dehors. Le chat poursuit les autres, à l’abri dès qu’ils sont perchés.", "<b>À savoir.</b> Dix secondes au plus sur un perchoir.", "<b>Plus dur.</b> Deux chats."])]),
 dict(age='8–10 ans', file='Alpha_Kids_8-10_ans.pdf',
      lead="À cet âge, ton enfant peut se lancer de vrais défis, toujours en jouant : un peu de vitesse, de tenue du corps et d’adresse, sans aucun poids.",
      refs=[('9–12 H', 'de sommeil par nuit'), ('1 H', "par jour où l’on s’essouffle : courir, pédaler, nager"), ('3 FOIS', 'par semaine : sauter, grimper, se suspendre, porter'), ('2 H', "d’écran par jour, c’est le plafond")],
      week=[('LUN', 'Le circuit maison'), ('MAR', 'Club, ou jeu dehors'), ('MER', 'Passe à dix et fil'), ('JEU', 'La navette'), ('VEN', 'Jour sans sport'), ('SAM', 'Quatre appuis et corde'), ('DIM', 'Vélo, piscine ou balade')],
      games=[
       ('LE CIRCUIT MAISON', '15 minutes', 'tout le corps, sans aucun poids', ["<b>La règle.</b> Six ateliers de 30 secondes, avec 30 secondes de repos entre chaque. Deux tours.", "<b>Les ateliers.</b> La chaise contre un mur, la planche, les sauts sur place, l’ours, les fentes, la corde.", "<b>Le principe.</b> Tu le fais avec ton enfant. Le geste propre passe avant la vitesse."]),
       ('LA PASSE À DIX', '10 minutes', 'adresse, lecture du jeu', ["<b>La règle.</b> Dix passes sans que le ballon tombe. À chaque série réussie, vous reculez d’un pas.", "<b>Plus facile.</b> À deux mains, de près.", "<b>Plus dur.</b> À une main, puis au pied."]),
       ('LE FIL', '5 à 10 minutes', 'équilibre', ["<b>La règle.</b> Une ligne au sol : en avant, en arrière, puis sur un pied.", "<b>Plus facile.</b> Sur un muret bas, en tenant ta main.", "<b>Plus dur.</b> Les yeux fermés."]),
       ('LA NAVETTE', '10 minutes', 'vitesse, freinage', ["<b>La règle.</b> Deux lignes à 10 mètres l’une de l’autre. À chaque aller-retour, on ramasse un objet et on le rapporte. Cinq objets, puis repos.", "<b>Le principe.</b> Tu chronomètres : on bat son propre temps.", "<b>Plus dur.</b> Toucher la ligne avec la main à chaque demi-tour."]),
       ('LES QUATRE APPUIS', '10 minutes', 'gainage, épaules', ["<b>La règle.</b> L’ours : à quatre pattes, genoux décollés, traverser la pièce. Le crabe : ventre vers le plafond.", "<b>À deux.</b> La brouette : tu tiens ses chevilles, ton enfant avance sur les mains.", "<b>Plus dur.</b> L’ours en marche arrière."]),
       ('L’ÉCHELLE DE CORDE', '10 minutes', 'rythme, mollets, souffle', ["<b>La règle.</b> 10 sauts à la corde, repos. 20 sauts, repos. 30 sauts.", "<b>Sans corde.</b> Sauts de côté par-dessus une ligne.", "<b>Plus dur.</b> Redescendre l’échelle : 30, 20, 10."])])]


def build(d):
    global c, DOC
    DOC = 'Alpha Kids · ' + d['age']
    out = os.path.join(OUTDIR, d['file'])
    c = canvas.Canvas(out, pagesize=(W, H), pageCompression=COMP, invariant=1)
    c.setTitle('Alpha Kids - Six jeux pour les ' + d['age'])
    c.setAuthor('Alpha Since')
    c.setSubject('Repères de l’âge, six jeux et une semaine type, pour les parents')
    if PRE:
        for f in ('BS', 'Carlito', 'Carlito-Bold'):
            pdfmetrics.getFont(f).splitString(PRE[f], c._doc)

    # ---------------------------------------------------------------- page 1
    page_bg()
    c.setFillColor(KHAKI); c.rect(0, H - 72, W, 72, fill=1, stroke=0)
    lh = 58; lw = lh * 736 / 616.0
    c.drawImage(LOGO, (W - lw) / 2, H - 7 - lh, lw, lh, mask='auto')
    c.setFillColor(INK); c.rect(0, H - 72 - 240, W, 240, fill=1, stroke=0)
    c.setFillColor(YEL); c.rect(MX, H - 107 - 2, 26, 2, fill=1, stroke=0)
    text(80, 105, 'BE READY WHERE IT ALL BEGINS', 'Carlito-Bold', 8.5, CREAM, cs=1.75)
    text(MX, 124, 'BOUGER, C’EST', 'BS', 46, CREAM)
    text(MX, 166, 'D’ABORD JOUER.', 'BS', 46, YEL)
    emblem(440, 118, 110, YEL)
    para(MX, 221, 380, d['lead'], size=13, leading=19, color=CREAM)
    x = MX
    for i, lab in enumerate(['Alpha Kids', d['age'], 'Six jeux', 'Pour les parents']):
        w = stringWidth(lab, 'Carlito-Bold', 10.5) + 22
        if i == 0:
            rrect(x, 276, w, 22, 11, YEL)
            text(x + 11, 283, lab, 'Carlito-Bold', 10.5, INK)
        else:
            rrect(x, 276, w, 22, 11, INK, INK3)
            text(x + 11, 283, lab, 'Carlito-Bold', 10.5, CREAM)
        x += w + 7

    section(336, 'LES REPÈRES DE SON ÂGE', 'Sommeil, mouvement, écrans')
    cwid = (CW - 3 * 10.4) / 4
    hh = max(para(0, 0, cwid - 26, b, size=10, leading=13.5, color=OLIVE, draw=False) for _, b in d['refs'])
    ch = 12 + 28 + hh + 12
    for i, (a, b) in enumerate(d['refs']):
        cx = MX + i * (cwid + 10.4)
        rrect(cx, 370, cwid, ch, 10, WHITE, SAND)
        text(cx + 13, 382, a, 'BS', 24, INK)
        para(cx + 13, 410, cwid - 26, b, size=10, leading=13.5, color=OLIVE)
    y = 370 + ch + 20

    section(y, 'UNE SEMAINE TYPE', 'Un jeu par jour, 10 à 15 minutes')
    y += 34
    dw = (CW - 28) / 7
    wh = max(para(0, 0, dw - 12, b, size=9.5, leading=12.5, color=CREAM, draw=False) for _, b in d['week'])
    cap = "On arrête quand ton enfant s’amuse encore : un jeu qu’on quitte avec le sourire, on a envie d’y revenir. Aucun poids, aucune charge, aucune série à compter."
    hc = para(0, 0, CW - 40, cap, size=10.5, leading=15, color=CREAM, draw=False)
    bh = 16 + 22 + wh + 12 + hc + 16
    rrect(MX, y, CW, bh, 14, INK)
    for i, (a, b) in enumerate(d['week']):
        dx = MX + 14 + i * dw
        text(dx + 6, y + 16, a, 'BS', 16, YEL)
        para(dx + 6, y + 38, dw - 12, b, size=9.5, leading=12.5, color=CREAM)
        if i:
            c.setStrokeColor(INK3); c.setLineWidth(0.75)
            c.line(dx, H - (y + 16), dx, H - (y + 38 + wh))
    para(MX + 20, y + 38 + wh + 12, CW - 40, cap, size=10.5, leading=15, color=CREAM)
    y += bh + 12
    y += cols3(y, [('LES SIGNES À SURVEILLER', "Une douleur de plus de 2 semaines, qui fait boiter ou qui réveille la nuit : le médecin. Un malaise ou un essoufflement anormal à l’effort : on arrête."),
                   ('TON RÔLE', "Jouer avec ton enfant, encourager l’effort, ne pas comparer. Aucune remarque sur le poids. Avant 10 ans, plusieurs activités plutôt qu’une."),
                   ('À TABLE ET AU LIT', "De l’eau à table, un petit-déjeuner, un vrai goûter. Le coucher à heure fixe, les écrans éteints une heure avant, hors de la chambre.")])
    p1 = y
    footer(1)
    c.showPage()

    # ---------------------------------------------------------------- page 2
    page_bg(); header_small('SIX JEUX · ' + d['age'].upper())
    section(94, 'SIX JEUX POUR LA SEMAINE', 'À la maison ou dehors, avec toi')
    y = 132
    gw = (CW - 10) / 2
    for r in range(3):
        pair = d['games'][2 * r:2 * r + 2]
        h = max(game_h(g, gw) for g in pair)
        for k, g in enumerate(pair):
            game_card(MX + k * (gw + 10), y, gw, h, 2 * r + k + 1, g)
        y += h + 10
    wt = "Le bilan Alpha Kids te donne les 3 priorités de ton enfant, chacune avec son pourquoi et une phrase à lui dire. Gratuit, 5 minutes, sur la page Kids du site Alpha."
    lab_w = 150
    hw = para(0, 0, CW - 36 - lab_w, wt, size=10.5, leading=15, color=CREAM, draw=False)
    bh = hw + 24
    y += 4
    rrect(MX, y, CW, bh, 12, INK)
    text(MX + 18, y + (bh - 30) / 2, 'ET POUR', 'BS', 15, YEL)
    text(MX + 18, y + (bh - 30) / 2 + 15, 'TON ENFANT ?', 'BS', 15, YEL)
    para(MX + 18 + lab_w, y + 12, CW - 36 - lab_w, wt, size=10.5, leading=15, color=CREAM)
    y += bh + 12
    y += para(MX, y, CW, "Ces repères sont généraux : ils ne remplacent ni l’avis de son médecin ni le suivi d’un éducateur sportif qualifié. Une question : <b>alphasince.contact@gmail.com</b>", size=10, leading=14, color=OLIVE)
    p2 = y
    footer(2)
    c.showPage()
    c.save()
    print(d['file'], 'p1 fin', round(p1), 'p2 fin', round(p2), '(limite 790)')


_out = OUTDIR
OUTDIR = OUTDIR + '/pass1'
os.makedirs(OUTDIR, exist_ok=True)
for d in DATA:
    build(d)
PRE = {f: ''.join(sorted(USED.get(pdfmetrics.getFont(f).fontName, set()))) for f in ('BS', 'Carlito', 'Carlito-Bold')}
print({f: len(v) for f, v in PRE.items()})
OUTDIR = _out
for d in DATA:
    build(d)
