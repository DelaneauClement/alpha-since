// Bilan adulte reçu par e-mail (15 octobre 2026) : le bouton « Recevoir mon bilan » envoie le bilan
// au visiteur et une copie à Alpha via /api/bilan (Brevo), au lieu d'ouvrir sa messagerie.
// Case facultative, décochée : inscription à la liste des conseils. En cas d'échec, retour à l'ancien
// fonctionnement (messagerie préremplie). La politique de confidentialité est mise à jour en conséquence.
const die=m=>{console.error('BILANMAIL',m);process.exit(1)};
module.exports=function(T){
 let s=T['bilan-app.js'];
 const R=(a,b)=>{if(s.split(a).length!==2)die('bilan-app.js : repère « '+a.slice(0,70)+' »');s=s.split(a).join(b)};
 R('<h3>Envoyer mon bilan à Alpha</h3><p>Laisse ton prénom et ton e-mail : on lit ton bilan et on te répond personnellement.</p>',
   '<h3>Reçois ton bilan par e-mail</h3><p>Laisse ton prénom et ton e-mail : tu reçois ton bilan complet dans ta boîte, et Clément en reçoit une copie pour pouvoir te répondre.</p>');
 R(`'<p class="b-cerr" id="b-cerr" role="alert" hidden>`,
   `'<label style="display:flex;gap:10px;align-items:flex-start;margin:14px 0;font-size:15px;line-height:1.45;cursor:pointer"><input type="checkbox" data-n="news" style="width:20px;height:20px;margin:2px 0 0;flex:none;accent-color:#F2E415"><span>Je veux aussi recevoir les conseils d’Alpha et la sortie des programmes, au plus un e-mail par semaine. Désinscription en un clic.</span></label>'+`+
   `'<input type="text" data-hp tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px">'+`+
   `'<p class="b-cerr" id="b-cerr" role="alert" hidden>`);
 R('data-act="send">Envoyer mon bilan</button>','data-act="send">Recevoir mon bilan</button>');
 R('<p class="b-small">Ton application d’e-mail s’ouvre avec ton bilan déjà écrit : il te reste à appuyer sur Envoyer. Tes coordonnées servent uniquement à te répondre.</p>',
   '<p id="b-ok" role="status" style="font-weight:700;margin:12px 0" hidden></p><p class="b-small">En cliquant sur « Recevoir mon bilan », tu acceptes que ton bilan, qui peut contenir des informations sur ta santé, te soit envoyé par e-mail et nous soit transmis pour te répondre. Détails dans notre <a href="/legal#confidentialite">politique de confidentialité</a>.</p>');
 R(`location.href='mailto:'+MAIL+'?subject='+encodeURIComponent('Bilan Alpha · '+pn)+'&body='+encodeURIComponent(body);return}`,
   `var tx=summary(a2,r2,pr2)+'\\n\\n'+foodText(a2)+'\\n\\nPROGRAMME PROPOSÉ\\n\\n'+progText(pg2),hp=root.querySelector('[data-hp]'),nw=root.querySelector('[data-n="news"]'),bt=b,okp=document.getElementById('b-ok');`+
   `if(bt.disabled)return;bt.disabled=true;var lab=bt.textContent;bt.textContent='Envoi…';`+
   `var fb=function(){bt.disabled=false;bt.textContent=lab;if(okp){okp.hidden=false;okp.textContent='L’envoi automatique n’a pas fonctionné. Ton application d’e-mail va s’ouvrir avec ton bilan : il te restera à appuyer sur Envoyer.'}setTimeout(function(){location.href='mailto:'+MAIL+'?subject='+encodeURIComponent('Bilan Alpha · '+pn)+'&body='+encodeURIComponent(body)},1500)};`+
   `fetch('/api/bilan',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({prenom:pn,email:em,tel:(c.tel||'').trim(),news:!!(nw&&nw.checked),site:hp?hp.value:'',source:'Bilan Alpha',texte:tx})}).then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(r.ok&&j.ok){bt.textContent='Bilan envoyé ✓';if(okp){okp.hidden=false;okp.textContent='C’est envoyé ! Regarde ta boîte de réception d’ici quelques minutes, et pense à vérifier les courriers indésirables.'}}else fb()})},fb);return}`);
 T['bilan-app.js']=s;

 let L=T['Legal.html'];
 const RL=(a,b)=>{if(L.split(a).length!==2)die('Legal.html : repère « '+a.slice(0,70)+' »');L=L.split(a).join(b)};
 RL('elles ne quittent ton appareil que si tu choisis d’envoyer ton résumé par e-mail. Dans ce cas, ton prénom, ton e-mail, ton téléphone si tu l’indiques et ton bilan nous sont transmis : nous les utilisons uniquement pour te répondre, et tu peux demander leur suppression à tout moment.',
   'elles ne quittent ton appareil que si tu demandes à recevoir ton bilan par e-mail. Dans ce cas, avec ton accord, ton prénom, ton e-mail, ton téléphone si tu l’indiques et ton bilan, qui peut contenir des informations sur ta santé, sont transmis à notre prestataire d’envoi Brevo pour te l’envoyer, et nous en recevons une copie pour te répondre. Nous ne les utilisons à aucune autre fin, et tu peux demander leur suppression à tout moment. Si tu coches la case prévue, ton prénom et ton e-mail rejoignent notre liste de conseils (au plus un e-mail par semaine) ; chaque e-mail contient un lien de désinscription.');
 RL('Les réponses saisies dans le Bilan Alpha, les quiz et les calculateurs','En dehors de cet envoi, les réponses saisies dans le Bilan Alpha, les quiz et les calculateurs');
 RL('Le paiement est traité par Stripe','L’envoi des bilans par e-mail et de nos conseils passe par Brevo (Sendinblue SAS, France), qui héberge ces données dans l’Union européenne. Le paiement est traité par Stripe');
 T['Legal.html']=L;
 console.log('BILANMAIL ok bilan envoyé par e-mail via /api/bilan');
};
