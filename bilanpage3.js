// Bilan Alpha, suite 2 : pyramide plus lisible (la base), coordonnées du prospect, programme complet dans l'e-mail.
module.exports=function(T){
const A='bilan-app.js',L='Legal.html';
const R=(n,a,b)=>{if(T[n].split(a).length!==2)throw new Error('BP3 '+n+' :: '+a.slice(0,70));T[n]=T[n].replace(a,()=>b)};

// 1. Pyramide : la base est plus haute, sous-titrée et soulignée
R(A,`return'<div class="b-fl b-s'+x[2]+'" style="width:'+(55+i*15)+'%"><b>'+x[0]+'</b><span>'+st(x)+'</span></div>'}).join('')+'</div><p>'+doseT`,
`return'<div class="b-fl b-s'+x[2]+(i>1?' b-base':'')+'" style="width:'+(52+i*16)+'%"><b>'+x[0]+'</b>'+(i>1?'<small>'+x[1]+'</small>':'')+'<span>'+st(x)+'</span></div>'}).join('')+'</div><p class="b-basel">La base porte tout le reste</p><p>'+doseT`);

// 2. Coordonnées : état, saisie, envoi
R(A,`var S={step:-1,a:{},done:false};`,`var S={step:-1,a:{},c:{},done:false};`);
R(A,`if(sv&&sv.a)S=sv}catch(e){}`,`if(sv&&sv.a){S=sv;S.c=S.c||{}}}catch(e){}`);
R(A,`else if(act==='reset'){S={step:0,a:{},done:false}}`,`else if(act==='reset'){S={step:0,a:{},c:S.c||{},done:false}}`);
R(A,`root.addEventListener('input',function(e){var k=e.target.getAttribute&&e.target.getAttribute('data-k');if(!k)return;`,
`root.addEventListener('input',function(e){var ck=e.target.getAttribute&&e.target.getAttribute('data-c');if(ck){S.c[ck]=e.target.value;save();var ce=document.getElementById('b-cerr');if(ce)ce.hidden=true;return}var k=e.target.getAttribute&&e.target.getAttribute('data-k');if(!k)return;`);
R(A,`/* ---------- Affichage ---------- */`,
`function progText(pg){return pg.sessions.map(function(s){return'Séance '+s.num+' · '+s.title+' ('+s.kind+')\\n'+(s.items?s.items.map(function(e){return'- '+e.n+(s.circ?'':' : '+e.dose)}).join('\\n')+'\\n'+(s.circ?s.items[0].dose+'. '+s.circ:'Repos entre les séries : '+s.rest+'.')+(s.end?'\\n'+s.end:''):s.text)}).join('\\n\\n')}
function foodText(a){return'Assiette : protéines à chaque repas '+label('prot',a.prot).toLowerCase()+' · fruits et légumes '+label('legumes',a.legumes)+' portions par jour · plats préparés '+label('plats',a.plats).toLowerCase()+' · sodas, jus ou alcool '+label('boissons',a.boissons).toLowerCase()}

/* ---------- Affichage ---------- */`);
const i=T[A].indexOf(` h+='<div class="b-card b-share">`),j=T[A].indexOf(` h+='<details class="b-lex">`);
if(i<0||j<0)throw new Error('BP3 share');
T[A]=T[A].slice(0,i)+` var c=S.c||{};
 h+='<div class="b-card b-share"><h3>Envoyer mon bilan à Alpha</h3><p>Laisse ton prénom et ton e-mail : on lit ton bilan et on te répond personnellement.</p>'+
 '<label class="b-f"><span>Ton prénom</span><input type="text" data-c="prenom" autocomplete="given-name" value="'+esc(c.prenom||'')+'"></label>'+
 '<label class="b-f"><span>Ton e-mail</span><input type="email" inputmode="email" data-c="email" autocomplete="email" value="'+esc(c.email||'')+'"></label>'+
 '<label class="b-f"><span>Ton téléphone <i>facultatif</i></span><input type="tel" data-c="tel" autocomplete="tel" value="'+esc(c.tel||'')+'"></label>'+
 '<p class="b-cerr" id="b-cerr" role="alert" hidden>Indique ton prénom et un e-mail valide.</p>'+
 '<div class="b-nav"><button type="button" class="a-btn a-btn-y" data-act="send">Envoyer mon bilan</button><button type="button" class="a-btn a-btn-o" data-act="copy">Copier le résumé</button></div><p class="b-help" id="b-copied" hidden>Résumé copié.</p>'+
 '<p class="b-small">Ton application d’e-mail s’ouvre avec ton bilan déjà écrit : il te reste à appuyer sur Envoyer. Tes coordonnées servent uniquement à te répondre.</p>'+
 '<details class="b-sumd"><summary>Voir le résumé envoyé</summary><pre id="b-sum">'+esc(sum)+'</pre></details></div>';
`+T[A].slice(j);
R(A,` else if(act==='copy'){`,
` else if(act==='send'){var c=S.c||{},pn=(c.prenom||'').trim(),em=(c.email||'').trim(),ce=document.getElementById('b-cerr');
  if(!pn||!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(em)){ce.hidden=false;ce.scrollIntoView({block:'center'});return}
  ce.hidden=true;var a2=S.a,r2=compute(a2),pr2=priorities(a2,r2),pg2=program(a2,r2);
  var body='Prénom : '+pn+'\\nE-mail : '+em+((c.tel||'').trim()?'\\nTéléphone : '+c.tel.trim():'')+'\\n\\n'+summary(a2,r2,pr2)+'\\n\\n'+foodText(a2)+'\\n\\nPROGRAMME PROPOSÉ\\n\\n'+progText(pg2);
  location.href='mailto:'+MAIL+'?subject='+encodeURIComponent('Bilan Alpha · '+pn)+'&body='+encodeURIComponent(body);return}
 else if(act==='copy'){`);

// 3. Confidentialité
R(L,'elles ne quittent ton appareil que si tu choisis d’envoyer ton résumé par e-mail.','elles ne quittent ton appareil que si tu choisis d’envoyer ton résumé par e-mail. Dans ce cas, ton prénom, ton e-mail, ton téléphone si tu l’indiques et ton bilan nous sont transmis : nous les utilisons uniquement pour te répondre, et tu peux demander leur suppression à tout moment.');

// 4. Styles
T['site.css']+=`
.b-fl b{font-size:16px}
.b-fl small{font-size:13px;line-height:1.2;opacity:.9}
.b-base{padding:14px 10px;gap:3px}
.b-base b{font-size:22px}
.b-basel{align-self:stretch;margin-top:-6px!important;padding-top:8px;border-top:3px solid var(--y);text-align:center;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--y)}
.b-f{display:flex;flex-direction:column;gap:6px;font-weight:700;font-size:15px}
.b-f i{font-style:normal;font-weight:400;opacity:.7}
.b-f input{min-height:50px;padding:0 14px;border:2px solid var(--cream);border-radius:12px;background:transparent;color:var(--cream);font:inherit;font-weight:400;font-size:17px}
.b-f input:focus{outline:2px solid var(--y);outline-offset:2px}
.b-cerr{color:var(--y);font-weight:700}
.b-small{font-size:14px;line-height:1.5;opacity:.75}
.b-sumd summary{cursor:pointer;font-weight:700;min-height:44px;display:flex;align-items:center}
.b-share .a-btn-o{color:var(--cream)}
`;
};
