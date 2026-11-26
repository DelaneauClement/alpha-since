# PDF des programmes de force (S'y remettre, Tonicité & fermeté, Force & carrure) — 26 novembre 2026.
# Charte et structure du Défi gainage (elles-mêmes reprises de Alpha_Seance_Ervine.pdf), données de prog-data.js.
# Usage : python3 build_prog.py <slug>   → sources/programmes/Alpha_<slug>.pdf
import sys, os, json, subprocess, re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
SLUG = sys.argv[1]
D = json.loads(subprocess.check_output(['node', '-e', "process.stdout.write(JSON.stringify(require('%s/prog-data.js')))" % ROOT]))
EX = D['EX']
PG = [p for p in D['PROGS'] if p['slug'] == SLUG][0]
OUTFILE = os.path.join(HERE, 'Alpha_%s.pdf' % SLUG.replace('-', '_'))
URL = 'alphasince.fr/programme/%s/%s' % (PG['slug'], PG['jeton'])

# Les outils de mise en page du Défi (en-tête, pied, cartes, paragraphes), repris tels quels.
src = open(os.path.join(HERE, 'build_gainage.py'), encoding='utf8').read()
src = src.split('# ---------------------------------------------------------------- données partagées avec le site')[0]


def b(s):
    return s.replace('’', "'")


def build(out, npages):
    g = {'__file__': os.path.join(HERE, 'build_gainage.py')}
    s = src.replace("OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, 'Alpha_Defi_gainage_30_jours.pdf')", 'OUT = %r' % out)
    s = s.replace("DOC = 'Défi gainage 30 jours'", 'DOC = %r' % b(PG['titre']))
    s = s.replace('NPAGES = 10', 'NPAGES = %d' % npages)
    s = s.replace("c.setTitle('Alpha Since - Défi gainage 30 jours')", "c.setTitle(%r)" % ('Alpha Since - ' + b(PG['titre'])))
    s = s.replace("c.setSubject('30 jours pour un tronc solide, à la maison, sans matériel')", "c.setSubject(%r)" % b(PG['accroche']))
    exec(s, g)
    n = pages(g)
    g['c'].save()
    return n


def pages(g):
    c, text, rrect, para, bullets, footer, header_small, section, stat_cards, num_card, band, page_bg = [g[k] for k in (
        'c', 'text', 'rrect', 'para', 'bullets', 'footer', 'header_small', 'section', 'stat_cards', 'num_card', 'band', 'page_bg')]
    H, W, MX, CW, RIGHT = g['H'], g['W'], g['MX'], g['CW'], g['RIGHT']
    INK, CREAM, KHAKI, OLIVE, SAND, INK3, YEL, WHITE = [g[k] for k in ('INK', 'CREAM', 'KHAKI', 'OLIVE', 'SAND', 'INK3', 'YEL', 'WHITE')]
    from reportlab.pdfbase.pdfmetrics import stringWidth
    from reportlab.graphics.barcode import qr
    from reportlab.graphics.shapes import Drawing
    from reportlab.graphics import renderPDF
    st = {'n': 0, 'y': 0, 'label': ''}
    LIMIT = 778

    def new_page(label, title=None, meta=None):
        if st['n']:
            footer(st['n']); c.showPage()
        st['n'] += 1; st['label'] = label
        page_bg(); header_small(label)
        st['y'] = 94
        if title:
            section(94, title, meta); st['y'] = 130

    def need(h, label=None, title=None, meta=None):
        if st['y'] + h > LIMIT:
            new_page(label or st['label'], title, meta)

    def fin():
        footer(st['n']); c.showPage()

    def table(cols, head, rows, size=9.5, head_fill=INK, zebra=True, bold_first=True):
        """Tableau à cellules qui passent à la ligne ; coupe de page entre les lignes."""
        ws = [CW * f for f in cols]
        def row_h(cells, fs):
            return max(para(0, 0, w - 12, cl, size=fs, leading=fs * 1.32, draw=False) for w, cl in zip(ws, cells)) + 10
        def draw_head():
            hh = row_h(head, size - 0.5)
            rrect(MX, st['y'], CW, hh, 6, head_fill)
            x = MX
            for w, cl in zip(ws, head):
                para(x + 6, st['y'] + 5, w - 12, '<b>%s</b>' % cl, size=size - 0.5, leading=(size - 0.5) * 1.32, color=CREAM)
                x += w
            st['y'] += hh
        need(row_h(head, size) + row_h(rows[0], size) + 4)
        draw_head()
        for i, r in enumerate(rows):
            rh = row_h(r, size)
            if st['y'] + rh > LIMIT:
                new_page(st['label']); draw_head()
            c.setFillColor(WHITE if (i % 2 == 0 or not zebra) else HexColor('#F3F1D9'))
            c.rect(MX, H - st['y'] - rh, CW, rh, fill=1, stroke=0)
            c.setStrokeColor(SAND); c.setLineWidth(0.6); c.line(MX, H - st['y'] - rh, RIGHT, H - st['y'] - rh)
            x = MX
            for k, (w, cl) in enumerate(zip(ws, r)):
                para(x + 6, st['y'] + 5, w - 12, ('<b>%s</b>' % cl) if (k == 0 and bold_first) else cl, size=size, leading=size * 1.32)
                x += w
            st['y'] += rh
        st['y'] += 10

    from reportlab.lib.colors import HexColor
    P = PG; plan = P['plan']
    phases = []
    for w in plan:
        ph = w['phase'].split(' ·')[0]
        if not phases or phases[-1][0] != ph:
            phases.append([ph, w['w'], w['w']])
        else:
            phases[-1][2] = w['w']
    nses = max(len([s for s in w['seances'] if not s.get('fac') and not s.get('test')]) for w in plan)

    # ---------------------------------------------------------- 1 · couverture
    st['n'] = 1
    page_bg()
    c.setFillColor(KHAKI); c.rect(0, H - 72, W, 72, fill=1, stroke=0)
    lh = 58; lw = lh * 736 / 616.0
    c.drawImage(g['LOGO'], (W - lw) / 2, H - 7 - lh, lw, lh, mask='auto')
    c.setFillColor(INK); c.rect(0, H - 72 - 262, W, 262, fill=1, stroke=0)
    c.setFillColor(YEL); c.rect(MX, H - 107 - 2, 26, 2, fill=1, stroke=0)
    text(80, 105, 'BE READY WHERE IT ALL BEGINS', 'Carlito-Bold', 8.5, CREAM, cs=1.75)
    T1, T2 = {'sy-remettre': ("S'Y REMETTRE", 'EN 6 SEMAINES.'), 'tonicite-fermete': ('TONICITÉ', '& FERMETÉ.'), 'force-carrure': ('FORCE', '& CARRURE.')}[SLUG]
    text(MX, 124, T1, 'BS', 46, CREAM)
    text(MX, 166, T2, 'BS', 46, YEL)
    para(MX, 221, 470, b(P['accroche']), size=13, leading=19, color=CREAM)
    chips = [b(P['titre']) if len(P['titre']) < 22 else "S'y remettre", '%d semaines' % P['semaines'], 'Maison ou salle' if P.get('lieux') else 'À la maison', 'Séance guidée']
    x = MX
    for i, lab in enumerate(chips):
        w = stringWidth(lab, 'Carlito-Bold', 10.5) + 22
        if i == 0:
            rrect(x, 293, w, 22, 11, YEL); text(x + 11, 300, lab, 'Carlito-Bold', 10.5, INK)
        else:
            rrect(x, 293, w, 22, 11, INK, INK3); text(x + 11, 300, lab, 'Carlito-Bold', 10.5, CREAM)
        x += w + 7
    section(364, "TON PROGRAMME EN UN COUP D'ŒIL", b(P['rythme']) if len(P['rythme']) < 60 else None)
    stat_cards(400, [('%d' % P['semaines'], 'semaines'), ('%d' % nses, 'séances par semaine'), ('%d' % len([p for p in phases if p[0] != 'Bilan']), 'phases' if len(phases) < 5 else 'étapes'), ('S%d' % P['semaines'], 'tests de fin')])
    rrect(MX, 482, CW, 290, 14, INK)
    text(66, 503, 'Tes phases', 'Carlito-Bold', 12.5, YEL)
    bx, bw, by = 134, RIGHT - 22 - 134, 527
    rowsp = min(39, 200 // max(1, len(phases)))
    for k, (ph, a, z) in enumerate(phases):
        y = by + k * rowsp
        text(66, y + 9, ('S%d' % a) if a == z else ('S%d-%d' % (a, z)), 'BS', 15, CREAM)
        last = k == len(phases) - 1
        rrect(bx, y, bw * (0.55 + 0.45 * (k + 1) / len(phases)), rowsp - 6, 6, YEL if last else KHAKI)
        fg = INK if last else CREAM
        text(bx + 12, y + (rowsp - 6) / 2 - 7, b(ph).upper(), 'BS', 14, fg)
    para(66, 730, CW - 44, "<b>On compte les répétitions, on garde un peu de réserve, et la charge monte par petits paliers.</b> La séance guidée note tout et te dit quand monter.", size=11.5, leading=16, color=CREAM)

    # ---------------------------------------------------------- 2 · avant de commencer
    new_page('AVANT DE COMMENCER', 'TES 3 RÈGLES', 'Elles valent pour tout le programme')
    y = st['y']
    y += num_card(y, 1, 'LA BONNE DIFFICULTÉ', '', [
        "Tu finis chaque série en pouvant faire encore 1 ou 2 répétitions propres (2 ou 3 au début du programme).",
        "S'il t'en reste 4 ou 5, c'est trop facile. Si la technique lâche, c'est trop dur."]) + 8
    y += num_card(y, 2, 'LA DOUBLE PROGRESSION', '', [
        "Même charge (ou même version) tant que toutes tes séries n'atteignent pas le haut de la fourchette.",
        "Quand elles l'atteignent : le plus petit palier au-dessus (+1 à 2 kg par haltère, ou la version suivante), et tu repars du bas."]) + 8
    y += num_card(y, 3, 'DES CRÉNEAUX FIXES', '', [
        "Note tes séances dans ton agenda : la discipline passe avant la motivation.",
        "Une séance ratée ne se rattrape pas : tu reprends à la suivante. Une pause plus longue ? Page « Tu t'es arrêté" + ('e' if PG.get('fem') else '') + " »."]) + 14
    st['y'] = y
    if P.get('niveaux'):
        hh = 150
        need(hh)
        rrect(MX, st['y'], CW, hh, 12, YEL)
        text(MX + 18, st['y'] + 14, 'JOUR 1 : TES TESTS ET TON NIVEAU', 'BS', 18, INK)
        para(MX + 18, st['y'] + 40, CW - 36, "Chaise contre le mur (temps tenu), pompes propres, planche. 10 minutes d'échauffement avant, 2 minutes de repos entre chaque. " + b(P['regleNiveau']), size=10.5, leading=15)
        nw = (CW - 36 - 16) / 3
        for k, v in enumerate(P['niveaux']):
            bx2 = MX + 18 + k * (nw + 8)
            rrect(bx2, st['y'] + 84, nw, 54, 8, INK)
            text(bx2 + 10, st['y'] + 90, b(v['n']).upper(), 'BS', 14, YEL)
            para(bx2 + 10, st['y'] + 108, nw - 20, b(v['s']).replace(' · ', '<br/>'), size=8, leading=9.5, color=CREAM)
        st['y'] += hh + 12
    if P.get('entree'):
        hh = 132
        need(hh)
        rrect(MX, st['y'], CW, hh, 12, YEL)
        text(MX + 18, st['y'] + 14, 'AVANT LA SEMAINE 1 : ES-TU PRÊT ?', 'BS', 18, INK)
        nw = (CW - 36 - 16) / 3
        for k, v in enumerate(P['entree']):
            bx2 = MX + 18 + k * (nw + 8)
            rrect(bx2, st['y'] + 42, nw, 46, 8, INK)
            para(bx2 + 10, st['y'] + 48, nw - 20, '<b>%s</b>' % b(v['s']), size=11, leading=13, color=YEL)
            para(bx2 + 10, st['y'] + 64, nw - 20, b(v['n']), size=8.5, leading=10, color=CREAM)
        para(MX + 18, st['y'] + 98, CW - 36, b(P['regleNiveau']), size=10.5, leading=14)
        st['y'] += hh + 12
    need(70)
    st['y'] += band(st['y'], 'TON\nMATÉRIEL', b(P['materiel'])) + 10

    # ---------------------------------------------------------- 3 · séance guidée + déroulé
    new_page('LA SÉANCE GUIDÉE', 'TA SÉANCE SUR TON TÉLÉPHONE')
    y = st['y']
    rrect(MX, y, CW, 168, 14, INK)
    qrw = qr.QrCodeWidget('https://' + URL)
    bb = qrw.getBounds(); qs = 128
    d = Drawing(qs, qs, transform=[qs / (bb[2] - bb[0]), 0, 0, qs / (bb[3] - bb[1]), 0, 0]); d.add(qrw)
    rrect(RIGHT - 18 - qs - 8, y + 16, qs + 16, qs + 16, 8, WHITE)
    renderPDF.draw(d, c, RIGHT - 18 - qs, H - (y + 24 + qs))
    text(MX + 18, y + 18, 'SCANNE, OUVRE TA SÉANCE, NOTE.', 'BS', 17, YEL)
    para(MX + 18, y + 46, CW - 36 - qs - 30, "Elle te donne la séance du jour, ta charge de la dernière fois et le conseil pour monter. Tu notes chaque série, le chrono de repos démarre tout seul, avec un bip à la fin. Elle garde ton carnet et fait ton bilan.", size=10.5, leading=15, color=CREAM)
    text(MX + 18, y + 132, URL, 'Carlito-Bold', 10, CREAM)
    text(MX + 18, y + 148, "Ajoute la page à ton écran d'accueil : elle se lance comme une appli.", 'Carlito', 9.5, SAND)
    st['y'] = y + 168 + 22
    section(st['y'], 'UNE SÉANCE, DANS CET ORDRE'); st['y'] += 36
    bw2 = (CW - 10) / 2
    he = bullets(0, 0, bw2 - 32, [b(x) for x in P['echauffement']], size=10, draw=False)
    hc = bullets(0, 0, bw2 - 32, [b(x) for x in P['calme']], size=10, draw=False)
    hh = max(he, hc) + 46
    rrect(MX, st['y'], bw2, hh, 12, WHITE, SAND); rrect(MX + bw2 + 10, st['y'], bw2, hh, 12, WHITE, SAND)
    text(MX + 16, st['y'] + 12, 'ÉCHAUFFEMENT', 'BS', 15, INK)
    text(MX + bw2 + 26, st['y'] + 12, 'RETOUR AU CALME', 'BS', 15, INK)
    bullets(MX + 16, st['y'] + 36, bw2 - 32, [b(x) for x in P['echauffement']], size=10)
    bullets(MX + bw2 + 26, st['y'] + 36, bw2 - 32, [b(x) for x in P['calme']], size=10)
    st['y'] += hh + 14
    need(80)
    need(90)
    st['y'] += band(st['y'], 'TROUVER\nTA CHARGE', "Commence volontairement léger, fais le bas de la fourchette, puis demande-toi combien tu aurais pu en faire de plus. 4 ou plus : ajoute 1 à 2 kg et refais une série. 2 ou 3 : c'est ta charge. 0 ou 1 : redescends d'un cran. Le bouton « Trouver ma charge » de la séance guidée te guide pas à pas.", fill=WHITE, lc=INK, bc=INK) + 10
    need(80)
    st['y'] += band(st['y'], 'LE TEMPO', "Descente contrôlée en 2 à 3 secondes, remontée franche. Le gainage se fait au chrono. Ne bloque pas ta respiration : souffle pendant l'effort.") + 10

    # ---------------------------------------------------------- 4 · les exercices
    used = []
    for w in plan:
        for s in w['seances']:
            for x in s['items']:
                if x['e'] not in used:
                    used.append(x['e'])
    new_page('LES EXERCICES', 'TES EXERCICES', '%d mouvements, à lire une fois' % len(used))
    for i, k in enumerate(used):
        e = EX[k]
        tx = MX + 60; w = RIGHT - tx - 16
        items = [b(x) for x in e['c']]
        hb = bullets(tx, 0, w, items, size=10, draw=False)
        hr = para(0, 0, w, '<b>Repère :</b> ' + b(e['r']), size=10, leading=14, draw=False)
        h = 14 + 22 + hb + 5 + hr + 12
        need(h + 8, 'LES EXERCICES', 'TES EXERCICES', 'Suite')
        y = st['y']
        rrect(MX, y, CW, h, 12, WHITE, SAND)
        rrect(MX + 14, y + 14, 30, 30, 7, INK)
        text(MX + 29, y + 17, str(i + 1), 'BS', 19, YEL, 'c')
        text(tx, y + 13, b(e['n']).upper(), 'BS', 16, INK)
        bullets(tx, y + 36, w, items, size=10)
        para(tx, y + 36 + hb + 5, w, '<b>Repère :</b> ' + b(e['r']), size=10, leading=14, color=OLIVE)
        st['y'] += h + 8

    # ---------------------------------------------------------- 5 · les séances
    def rr(x):
        if x.get('libre'):
            return b(x['libre'])
        p = (' par ' + x['par']) if x.get('par') else ''
        if x.get('chrono'):
            return '%d × %s s%s' % (x['s'], ' / '.join(str(t) for t in x['chrono']), p)
        if x.get('sec'):
            a, z = x['sec']
            return '%d × %s s%s' % (x['s'], a if a == z else '%d à %d' % (a, z), p)
        a, z = x['r']
        return '%d × %s%s' % (x['s'], a if a == z else '%d à %d' % (a, z), p)

    def dur(s):
        return ('%d min' % (s // 60) if s % 60 == 0 else '%d min %d' % (s // 60, s % 60)) if s >= 60 else '%d s' % s

    if SLUG == 'sy-remettre':
        new_page('TES SÉANCES', 'TES SÉANCES', 'A et B en alternance, C facultative dès la semaine 3')
        para(MX, st['y'], CW, "Chaque exercice a trois versions. Tu commences par celle de ton niveau et tu passes à la suivante quand toutes tes séries atteignent le haut de la fourchette. Le gainage reste au chrono : 20, 30 ou 45 secondes selon ton niveau.", size=10.5, leading=15); st['y'] += 50
        for s in plan[2]['seances']:
            if s.get('test'):
                continue
            need(70); text(MX, st['y'], ('SÉANCE %s · %s' % (s['k'], b(s['t']))).upper() + (' (FACULTATIVE)' if s.get('fac') else ''), 'BS', 15, INK); st['y'] += 24
            if s['k'] == 'C':
                para(MX, st['y'], CW, b(' '.join(EX['escaliers']['c'])), size=10.5, leading=15); st['y'] += 56; continue
            table([0.22, 0.26, 0.26, 0.26], ['Exercice', 'Départ', 'Intermédiaire', 'Confirmé'],
                  [[b(EX[x['e']]['n'])] + [b(v) + ((' · %d s' % x['chrono'][j]) if x.get('chrono') else '') for j, v in enumerate(x['v'])] for x in s['items']])
        need(150, 'TES SÉANCES')
        section(st['y'] + 4, 'SEMAINE PAR SEMAINE'); st['y'] += 40
        rows = []
        for w in plan:
            a = [x for x in w['seances'] if not x.get('test')][0]['items'][0]
            ses = ', '.join(('C (facultative)' if x.get('fac') else 'tests' if x.get('test') else x['k']) for x in w['seances'])
            rows.append(['Semaine %d' % w['w'], ses, rr(a).split(' par')[0], b(w['rir']), dur(a['rep']), b(w['phase'])])
        table([0.14, 0.2, 0.15, 0.12, 0.11, 0.28], ['', 'Séances', 'Séries × rép.', 'Réserve', 'Repos', 'Objectif'], rows)
    else:
        groups = []
        for w in plan:
            if w['w'] == P['semaines']:
                continue
            ph = w['phase'].split(' ·')[0]
            if not groups or groups[-1]['ph'] != ph:
                groups.append({'ph': ph, 'a': w['w'], 'z': w['w'], 'w': w})
            else:
                groups[-1]['z'] = w['w']
        for gq in groups:
            w = gq['w']
            new_page('PHASE · %s' % b(gq['ph']).upper(), '%s · SEMAINES %d À %d' % (b(gq['ph']).upper(), gq['a'], gq['z']), 'Réserve : %s répétitions' % b(w['rir']))
            if SLUG == 'force-carrure':
                para(MX, st['y'], CW, {'Fondation': "Apprendre les gestes et trouver tes charges : 3 × 10 à 12 sur les gros exercices, 3 × 12 à 15 sur les bras et les épaules. <b>Semaine 4 allégée</b> : une série de moins, mêmes charges.",
                                       'Construction': "Plus lourd, une série de plus : 4 × 8 à 10. La première séance de la phase, ajoute 5 à 10 % de charge. <b>Semaine 8 allégée</b> : une série de moins.",
                                       'Force': "Les charges les plus lourdes du programme : 4 × 6 à 8 sur les gros exercices. Ajoute 5 à 10 % la première séance."}[gq['ph']], size=10.5, leading=15)
            else:
                para(MX, st['y'], CW, {'Fondation': "Deux séances par semaine pour apprendre les gestes et trouver tes charges. <b>Semaine 4 allégée</b> : une série de moins partout, mêmes charges.",
                                       'Construction': "Les séries raccourcissent et les charges montent. Une troisième séance s'ajoute si ton emploi du temps le permet. <b>Semaine 8 allégée</b> : une série de moins partout.",
                                       'Force': "4 séries de 6 à 8 répétitions sur les grands mouvements, avec les charges les plus lourdes du programme. Les exercices secondaires restent à 10 à 12 pour le volume des fessiers."}[gq['ph']], size=10.5, leading=15)
            st['y'] += 52
            for s in w['seances']:
                need(90)
                text(MX, st['y'], ('SÉANCE %s · %s' % (s['k'], b(s['t']))).upper() + (' (FACULTATIVE)' if s.get('fac') else ''), 'BS', 15, INK); st['y'] += 24
                table([0.3, 0.17, 0.1, 0.43], ['Exercice · version maison', 'Séries × rép.', 'Repos', 'En salle'],
                      [[b(EX[x['e']]['n']) + (('<br/><font size="8.5">%s</font>' % b(x['m'])) if x.get('m') else ''), rr(x), dur(x['rep']), b(x.get('sl', 'Identique')) if x.get('sl') != 'Identique' else 'Identique'] for x in s['items']])
        if SLUG == 'force-carrure':
            new_page('SEMAINE PAR SEMAINE', 'SEMAINE PAR SEMAINE')
            rows = []
            for w in plan:
                if w['w'] == 12:
                    rows.append(['Semaine 12', 'Tests (2 séances, 48 h d\'écart)', '—', '—', 'Mesurer, comparer, choisir la suite']); continue
                gx = [x for x in w['seances'][0]['items'] if x['e'] == 'squatGob'][0]; ix = [x for x in w['seances'][0]['items'] if x['e'] == 'elevLat'][0]
                rows.append(['Semaine %d' % w['w'], rr(gx), rr(ix), b(w['rir']), b(w['phase'])])
            table([0.15, 0.2, 0.2, 0.13, 0.32], ['', 'Gros exercices', 'Bras, épaules', 'Réserve', 'Phase'], rows)
            para(MX, st['y'], CW, "<b>Tractions</b> : de 0 à 2, élastique ou négatives lentes (5 s) ; de 3 à 7, des séries complètes complétées par des négatives ; 8 et plus, la double progression, puis lestées en phase 3.", size=10.5, leading=15); st['y'] += 50

    # ---------------------------------------------------------- 6 · tests, reprise, bilan
    new_page('TES REPÈRES', 'TES TESTS', 'Au départ, puis en semaine %d' % P['semaines'])
    table([0.52, 0.16, 0.16, 0.16], ['Test', 'Départ', 'Semaine %d' % P['semaines'], 'Progrès'], [[b(t['n']) + ' (%s)' % b(t['u']), '', '', ''] for t in P['tests']], size=10.5, zebra=False)
    st['y'] += 4
    need(200)
    section(st['y'], "TU T'ES ARRÊTÉE EN ROUTE ?" if PG.get('fem') else "TU T'ES ARRÊTÉ EN ROUTE ?"); st['y'] += 36
    para(MX, st['y'], CW, "Ce n'est pas un échec, c'est la vie. La force se garde bien deux à trois semaines, baisse ensuite, et se reprend plus vite qu'elle ne s'est construite : <b>tu as perdu un peu, tu ne repars pas de zéro.</b> L'audit de reprise de la séance guidée lit ton carnet et te dit où reprendre.", size=10.5, leading=15); st['y'] += 62
    lab = ['Jusqu\'à 2 semaines', '3 à 6 semaines', '7 à 12 semaines', 'Plus de 3 mois'] if len(P['reprise']) == 4 else ['Jusqu\'à 2 semaines', '3 à 6 semaines', 'Plus de 6 semaines']
    table([0.28, 0.72], ['Durée de la pause', 'Où reprendre'], [[l, b(r[2])] for l, r in zip(lab, P['reprise'])], size=10)
    para(MX, st['y'], CW, "Une blessure ou une douleur : avis médical d'abord, puis la ligne du dessous. Une maladie : la ligne du dessous aussi.", size=10, leading=14, color=OLIVE); st['y'] += 36
    need(240)
    section(st['y'], 'TON BILAN DE FIN'); st['y'] += 36
    para(MX, st['y'], CW, "Pas un jugement : les marches franchies. La séance guidée le remplit pour toi.", size=10.5, leading=15, color=OLIVE); st['y'] += 24
    table([0.5, 0.5], ['', ''], [['Commencé le', ''], ['Terminé le', ''], ['Séances faites', ''], ['Pauses, et la plus longue', ''], ['Reprises', '']], size=10.5, zebra=False)

    # ---------------------------------------------------------- 7 · sécurité et suite
    new_page('SÉCURITÉ ET SUITE', 'TA SÉCURITÉ')
    safe = ["<b>Avis médical avant de commencer</b> si : problème cardiaque ou de tension, opération récente, douleur articulaire ou de dos qui dure, grossesse, ou reprise après de nombreuses années sans sport.",
            "<b>Douleur</b> : une gêne musculaire est normale, une douleur vive ne l'est pas. On arrête l'exercice et on reprend la version d'en dessous.",
            "<b>Respiration</b> : souffle pendant l'effort, ne bloque pas ta respiration sur les charges lourdes."]
    if SLUG == 'tonicite-fermete':
        safe += ["<b>Ostéoporose</b> : le renforcement reste recommandé, avec un encadrement adapté. Pas de sauts ni de flexions du dos chargées sans l'accord du médecin.",
                 "<b>Périnée</b> : après des grossesses ou autour de la ménopause, il peut être fragilisé. En cas de fuites ou de sensation de pesanteur, vois un kinésithérapeute spécialisé avant d'augmenter les charges."]
    st['y'] += bullets(MX, st['y'], CW, safe, size=10.5) + 18
    para(MX, st['y'], CW, "Ce programme donne des repères généraux pour des adultes en bonne santé. Il ne remplace pas l'avis d'un médecin. Réservé à ton usage personnel.", size=9.5, leading=13.5, color=OLIVE); st['y'] += 40
    rrect(MX, st['y'], CW, 150, 14, INK)
    text(MX + 18, st['y'] + 18, 'ET APRÈS ?', 'BS', 22, YEL)
    para(MX + 18, st['y'] + 52, CW - 36, b(P['suite']) + " Garde l'habitude : deux créneaux fixes par semaine, c'est ce qui fait la différence sur la durée.", size=11, leading=16, color=CREAM)
    para(MX + 18, st['y'] + 112, CW - 36, "Une question : <b>alphasince.contact@gmail.com</b> · alphasince.fr", size=10.5, leading=15, color=SAND)
    st['y'] += 160
    fin()
    return st['n']


n = build('/dev/null', 99)
n2 = build(OUTFILE, n)
assert n == n2, (n, n2)
print('ok', OUTFILE, n, 'pages')
