/* AP STUDY – static resource site. Data: Google Sheets. Routing: hash. */
const CFG={name:'AP STUDY',email:'ethicalhacklabbyme@gmail.com',tgContact:'apstudymods',
sheetId:'1RzZkw3LiC0ICwT-Gmp47potgY0OvWw2-iC9XsDeSNNQ',sheet:'Sheet1',
steps:[30,30,30,30,30,30],autoRefresh:false,
logo:'https://photos.app.goo.gl/mQoeirBmJacyc4aR8',
tg:['ultimateapkmods','apstudymods','editvaultresources'],
social:[['Instagram','https://www.instagram.com/ahtashamvault'],['YouTube','https://www.youtube.com/@Ahtasham-vault']]};
const $=s=>document.querySelector(s),app=$('#app');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl=u=>{try{const x=new URL(String(u||'').trim());return/^https?:$/.test(x.protocol)?x.href:''}catch(e){return''}};
const tgUrl=h=>{h=String(h||'').trim();return h[0]=='@'?'https://t.me/'+h.slice(1):safeUrl(h)};
let DATA=[],timer=null;

/* ---------- Ads: each in its own iframe so atOptions never collide ---------- */
const H='www.highrevenueformat.com';
const AD={s:['0c17a1d10fe847fc28802f322a670fb9',320,50,H],s2:['cfd65b36b045c07cef9a05df77feefad',320,50,'www.highperformanceformat.com'],
r:['7999654a3a35eff45688cff161a625e9',300,250,H],m:['1c94fa584a396abc50c7723d0e098ed4',468,60,H],l:['0796fee33dfc2504b467d46de6de2a99',728,90,H]};
function ad(i=0){const w=innerWidth,pool=w>=780?['l','r','m']:w>=520?['m','r','s']:['s','r','s2'];
const [k,W,Hh,host]=AD[pool[i%pool.length]];
const doc=`<body style="margin:0"><script>atOptions={'key':'${k}','format':'iframe','height':${Hh},'width':${W},'params':{}};<\/script><script src="https://${host}/${k}/invoke.js"><\/script></body>`;
return`<div class="ad"><small>Advertisement</small><iframe title="Advertisement" width="${W}" height="${Hh}" scrolling="no" loading="lazy" srcdoc="${esc(doc)}"></iframe></div>`}
function nativeAd(){const id='container-cc6abcf1f92971c886c3d6d8d0437d6d';const d=$('#nat');if(!d)return;d.innerHTML=`<div id="${id}"></div>`;
const s=document.createElement('script');s.async=true;s.dataset.cfasync='false';s.src='https://pl31639887.profitableratecpmnetwork.com/cc6abcf1f92971c886c3d6d8d0437d6d/invoke.js';d.appendChild(s)}

/* ---------- Data ---------- */
async function load(){
 const u=`https://docs.google.com/spreadsheets/d/${CFG.sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(CFG.sheet)}`;
 const t=await (await fetch(u)).text();
 const j=JSON.parse(t.slice(t.indexOf('{'),t.lastIndexOf('}')+1));
 let cols=j.table.cols.map(c=>(c.label||'').trim().toLowerCase()),rows=j.table.rows||[];
 if(!cols.some(Boolean)&&rows.length){cols=rows[0].c.map(c=>String(c?.v??'').trim().toLowerCase());rows=rows.slice(1)}
 const g=(r,n)=>{const i=cols.indexOf(n);const c=i<0?null:r.c[i];return c&&c.v!=null?String(c.v).trim():''};
 const hasStatus=cols.includes('status');
 DATA=rows.map((r,n)=>({id:g(r,'id')||String(n+1),title:g(r,'title'),category:g(r,'category')||'Other',description:g(r,'description'),
  image:safeUrl(g(r,'image')),url:safeUrl(g(r,'resource url')||g(r,'downloadurl')||g(r,'download url')),
  tg:tgUrl(g(r,'telegram url')),status:g(r,'status').toLowerCase()}))
  .filter(r=>r.title&&(!hasStatus||r.status==='active'));
}
const cats=()=>[...new Set(DATA.map(r=>r.category))].sort();
const byId=id=>DATA.find(r=>r.id===id);

/* ---------- Components ---------- */
const img=(r,big)=>r.image?`<img class="ri" loading="lazy" src="${esc(r.image)}" alt="${esc(r.title)}" data-i="${esc(r.title[0]||'?')}">`:`<span class="ph">${esc(r.title[0]||'?')}</span>`;
const card=r=>`<article class="card"><a href="#resource/${encodeURIComponent(r.id)}" tabindex="-1"><div class="im">${img(r)}</div></a><div class="cb"><span class="tag">${esc(r.category)}</span><h3>${esc(r.title)}</h3><p>${esc(r.description)}</p><div class="row"><a class="btn" href="#resource/${encodeURIComponent(r.id)}">View Details</a>${r.url?`<a class="btn p" href="#flow/${encodeURIComponent(r.id)}">Access Resource</a>`:''}</div></div></article>`;
const grid=a=>a.length?`<div class="grid">${a.map(card).join('')}</div>`:'<div class="empty">No results found.</div>';
const chips=cur=>`<div class="chips"><a class="chip ${cur?'':'on'}" href="#resources">All</a>${cats().map(c=>`<a class="chip ${c===cur?'on':''}" href="#category/${encodeURIComponent(c)}">${esc(c)}</a>`).join('')}</div>`;
const searchBox=q=>`<form class="sb" role="search" id="sf"><label class="skip" for="q">Search resources</label><input id="q" type="search" placeholder="Search title, category, ID…" value="${esc(q||'')}" autocomplete="off"><button class="btn p" type="button" id="qc" aria-label="Clear search">✕</button></form>`;
const socials=()=>`<div class="soc">${CFG.tg.map(h=>`<a class="btn p" href="https://t.me/${h}" target="_blank" rel="noopener noreferrer">✈ @${h}</a>`).join('')}${CFG.social.map(([n,u])=>`<a class="btn" href="${u}" target="_blank" rel="noopener noreferrer">${n}</a>`).join('')}</div>`;
const SAFE=`<div class="note"><b>Stay safe:</b> Resources are provided by third parties and are not guaranteed safe. Verify files before opening, avoid suspicious downloads, never share passwords or OTPs, keep your device and browser updated, and prefer official sources where available. External links are controlled by third parties.</div>`;
const FAQ=[['How are resources added?','Resources are managed in a Google Sheet. Active rows appear on the site automatically when the page loads.'],['How does search work?','Search runs instantly in your browser across title, description, category and ID.'],['Why is a resource unavailable?','It may be inactive, removed, or the third-party link may have changed. Contact us on Telegram or email.'],['How often is the list updated?','Every time you open or reload the site.'],['Is AP STUDY responsible for third-party resources?','No. External sites have their own terms and privacy policies. Use them at your own discretion.'],['How do Telegram links work?','They open our channels or the resource’s Telegram page in the Telegram app or web.'],['How can I contact you?',`Email ${CFG.email} or Telegram @${CFG.tgContact}.`]];
const faq=()=>FAQ.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('');

/* ---------- Views ---------- */
function home(){
 const pop=cats().slice(0,8);
 app.innerHTML=`<section class="hero"><h1>${CFG.name}</h1><p>Your free hub for study notes, books, PDFs, tools and apps — search, explore and access useful resources in one place.</p>${searchBox()}</section>
 ${ad(0)}<h2 class="sec">Popular Categories</h2>${chips()}
 <h2 class="sec">Featured Resources</h2>${grid(DATA.slice(0,4))}${ad(1)}
 <h2 class="sec">Latest Resources</h2>${grid(DATA.slice(-8).reverse())}<p><a class="btn p" href="#resources">View all resources</a></p>
 ${ad(2)}<div id="nat"></div><h2 class="sec">Join Our Community</h2>${socials()}${SAFE}<h2 class="sec">FAQ</h2>${faq()}`;
 nativeAd();bindSearch(true)}
function list(cat,q){
 app.innerHTML=`<h1>${cat?esc(cat):'Resources'}</h1>${searchBox(q)}${chips(cat)}<p class="muted" id="cnt" role="status"></p><div id="res"></div>${ad(1)}`;
 const upd=()=>{const s=($('#q').value||'').toLowerCase().trim();
  const a=DATA.filter(r=>(!cat||r.category===cat)&&(!s||[r.title,r.description,r.category,r.id].join(' ').toLowerCase().includes(s)));
  $('#res').innerHTML=grid(a);$('#cnt').textContent=a.length+' result'+(a.length==1?'':'s')};
 $('#q').addEventListener('input',upd);$('#qc').onclick=()=>{$('#q').value='';upd();$('#q').focus()};
 $('#sf').onsubmit=e=>e.preventDefault();upd()}
function detail(r){
 if(!r)return nf();
 const rel=[...DATA.filter(x=>x.id!==r.id&&x.category===r.category),...DATA.filter(x=>x.id!==r.id&&x.category!==r.category)].slice(0,4);
 app.innerHTML=`<div class="det"><div class="im">${img(r)}</div><div><span class="tag">${esc(r.category)}</span><h1>${esc(r.title)}</h1><p>${esc(r.description)}</p><p class="muted">Resource ID: ${esc(r.id)}</p><div class="row">${r.url?`<a class="btn p big" href="#flow/${encodeURIComponent(r.id)}">Access Resource</a>`:'<span class="muted">Link currently unavailable.</span>'}${r.tg?`<a class="btn big" href="${esc(r.tg)}" target="_blank" rel="noopener noreferrer">Telegram</a>`:''}</div></div></div>
 ${ad(0)}${SAFE}<h2 class="sec">How access works</h2><p>Access is a 6-step flow of short, informative pages (about ${CFG.steps.reduce((a,b)=>a+b)} seconds in total). After the last step, the link to this resource unlocks.</p>
 ${rel.length?`<h2 class="sec">Related Resources</h2>${grid(rel)}`:''}${ad(1)}`}
const TIPS=[['About this resource','Check the title, category and description so you know what you are getting. If something looks wrong, tell us on Telegram.'],
['Verify before you open','Third-party files can change. Scan downloads with a trusted security app and avoid anything that asks for unnecessary permissions.'],
['Protect your accounts','Never share passwords, OTPs or banking details with any website or file source — no genuine study resource needs them.'],
['Keep software updated','Updated browsers and phones block many known threats. Install updates from official stores only.'],
['Use official sources','When an official version exists, prefer it. Our links are community-shared and controlled by third parties.'],
['Almost there','Join our Telegram channels for new notes, books and tools. Your link unlocks on the next click.']];
function flow(r){
 if(!r||!r.url)return nf();
 app.innerHTML=`<h1>Access: ${esc(r.title)}</h1><p class="muted">Complete all 6 steps. The countdown runs while this tab is visible.</p>
 ${TIPS.map((t,i)=>`<section class="card pad step" id="s${i}" ${i?'hidden':''}><h2>STEP ${i+1} OF 6</h2><h3>${t[0]}</h3><p>${t[1]}</p>${ad(i)}<p class="tm">Please wait: <b id="t${i}">${CFG.steps[i]}</b> seconds</p><p class="hint" id="h${i}" hidden>↓ Scroll Down to Continue ↓</p><button class="btn p" id="c${i}" disabled>${i==5?'Finish':'Continue'}</button></section>`).join('')}
 <section class="card pad step" id="fin" hidden><h2>✅ All steps complete</h2><p>Your resource is ready.</p>${ad(0)}<p style="text-align:center"><a class="btn p big" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">Access Resource</a></p>${ad(1)}${socials()}</section>`;
 run(0)}
function run(i){
 clearInterval(timer);let n=CFG.steps[i];const t=$('#t'+i),c=$('#c'+i);
 timer=setInterval(()=>{if(document.hidden)return;n--;t.textContent=Math.max(n,0);
  if(n<=0){clearInterval(timer);c.disabled=false;$('#h'+i).hidden=false}},1000);
 c.onclick=()=>{c.disabled=true;const nx=$(i==5?'#fin':'#s'+(i+1));nx.hidden=false;nx.scrollIntoView({behavior:'smooth'});if(i<5)run(i+1)}}
function stat(title,body){app.innerHTML=`<h1>${title}</h1>${body}<p class="muted">Last updated: October 2026</p>`}
const PAGES={
 about:()=>stat('About AP STUDY','<p>AP STUDY is a free community resource hub for study notes, books, PDFs, tools and apps. Resources are collected from third-party sources and listed for convenience. We do not claim ownership of third-party content.</p>'),
 contact:()=>stat('Contact',`<p>Email: <a href="mailto:${CFG.email}">${CFG.email}</a></p><p>Telegram: <a href="https://t.me/${CFG.tgContact}" target="_blank" rel="noopener noreferrer">@${CFG.tgContact}</a></p>${socials()}`),
 privacy:()=>stat('Privacy Policy','<p>We do not ask for accounts or collect personal details. Your browser stores only your theme preference. Third-party advertising networks and linked websites may use cookies or similar technologies under their own privacy policies. Please review them.</p>'),
 disclaimer:()=>stat('Disclaimer','<p>All resources are provided by third parties “as is” without warranty. We do not guarantee accuracy, availability or safety, and we are not responsible for external websites. Verify everything before use. Copyright owners may contact us to request removal.</p>'),
 terms:()=>stat('Terms &amp; Conditions','<p>By using this site you agree to use resources lawfully and at your own risk, not to abuse the access flow or advertisements, and to follow the terms of any external website you visit. We may change or remove content at any time.</p>'),
 faq:()=>{app.innerHTML=`<h1>FAQ</h1>${faq()}${SAFE}`},
 categories:()=>{app.innerHTML=`<h1>Categories</h1>${chips()}${ad(0)}`}};
const nf=()=>{app.innerHTML='<div class="empty"><h1>Not found</h1><p>This resource is not available.</p><a class="btn p" href="#resources">Browse resources</a></div>'};
function bindSearch(go){const f=$('#sf');if(!f)return;f.onsubmit=e=>{e.preventDefault();location.hash='search/'+encodeURIComponent($('#q').value)};$('#qc').onclick=()=>{$('#q').value=''}}

function route(){
 clearInterval(timer);if(!DATA._ok)return;
 const [p,...rest]=(location.hash.slice(1)||'home').split('/'),a=decodeURIComponent(rest.join('/'));
 if(p==='home')home();else if(p==='resources')list();else if(p==='category')list(a);else if(p==='search')list('',a);
 else if(p==='resource')detail(byId(a));else if(p==='flow')flow(byId(a));else if(PAGES[p])PAGES[p]();else nf();
 scrollTo(0,0);document.title=(p==='resource'&&byId(a)?byId(a).title+' – ':'')+'AP STUDY';
 if(!DATA.length&&['home','resources','category','search'].includes(p))app.insertAdjacentHTML('beforeend','<div class="empty">No resources available yet.</div>')}
async function boot(){
 app.innerHTML='<div class="load" role="status">Loading resources…</div>';
 try{await load();DATA._ok=true;route()}
 catch(e){app.innerHTML='<div class="empty" role="alert"><h2>Resources are temporarily unavailable.</h2><p>Please try again later.</p><button class="btn p" id="retry">Retry</button></div>';$('#retry').onclick=boot}}

/* ---------- Footer, theme, misc ---------- */
$('#footer').innerHTML=`<b>${CFG.name}</b><p>Free resource hub for notes, books, PDFs, tools and apps.</p>${ad(3)}<p><a href="#home">Home</a><a href="#resources">Resources</a><a href="#faq">FAQ</a><a href="#about">About</a><a href="#contact">Contact</a></p><p><a href="#privacy">Privacy</a><a href="#disclaimer">Disclaimer</a><a href="#terms">Terms</a></p>${socials()}<p class="muted">© ${new Date().getFullYear()} ${CFG.name}. All rights reserved. Third-party resources belong to their respective owners.</p>`;
$('#themeBtn').onclick=()=>{const d=document.documentElement,dark=(d.dataset.theme||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'))==='dark';d.dataset.theme=dark?'light':'dark';try{localStorage.setItem('theme',d.dataset.theme)}catch(e){}};
const topB=$('#top');addEventListener('scroll',()=>topB.hidden=scrollY<500,{passive:true});topB.onclick=()=>scrollTo({top:0,behavior:'smooth'});
document.addEventListener('error',e=>{const t=e.target;if(t.tagName==='IMG'&&t.classList.contains('ri')){const s=document.createElement('span');s.className='ph';s.textContent=t.dataset.i||'?';t.replaceWith(s)}},true);
(()=>{const l=safeUrl(CFG.logo);if(l){const i=new Image();i.alt='';i.onload=()=>{if(i.naturalWidth>1)$('#logo').replaceChildren(i)};i.src=l}})();
addEventListener('hashchange',route);boot();
