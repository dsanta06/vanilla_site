document.getElementById('year').textContent = new Date().getFullYear().toString();

const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');
const sendBtn = document.getElementById('send-btn');

sendBtn?.addEventListener('click', () => {
  feedback.textContent = 'Mensagem enviada! (demo) — Integraremos com seu e-mail/WhatsApp depois.';
});
// Hero Carousel (sem libs)
(() => {
  const el = document.getElementById('hero-carousel');
  if (!el) return;

  const images = JSON.parse(el.getAttribute('data-images') || '[]');
  if (!images.length) return;

  const interval = parseInt(el.getAttribute('data-interval') || '2000', 10); // 2000ms
  const slidesEl = el.querySelector('.slides');
  const dotsEl = el.querySelector('.dots');
  const prevBtn = el.querySelector('.prev');
  const nextBtn = el.querySelector('.next');

  images.forEach((src, i) => {
    const s = document.createElement('div');
    s.className = 'slide';
    s.innerHTML = `<img src="${src}" alt="Imagem ${i+1} do carrossel" loading="lazy">`;
    slidesEl.appendChild(s);

    const d = document.createElement('button');
    d.type = 'button';
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  });

  let idx = 0, timer, hovering = false;
  function render(){ slidesEl.style.transform = `translateX(${-idx*100}%)`;
    [...dotsEl.children].forEach((b,i)=>b.setAttribute('aria-current', i===idx ? 'true' : 'false'));
  }
  function goTo(i){ idx = (i + images.length) % images.length; render(); restart(); }
  const next = () => goTo(idx+1), prev = () => goTo(idx-1);

  function restart(){ clearInterval(timer); if(!hovering && images.length>1) timer = setInterval(next, interval); }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  el.addEventListener('mouseenter', ()=>{ hovering=true; clearInterval(timer); });
  el.addEventListener('mouseleave', ()=>{ hovering=false; restart(); });

  // teclado e swipe (qualidade de vida)
  el.tabIndex = 0;
  el.addEventListener('keydown', e => { if(e.key==='ArrowRight') next(); if(e.key==='ArrowLeft') prev(); });
  let startX=null;
  el.addEventListener('touchstart', e=> startX=e.touches[0].clientX, {passive:true});
  el.addEventListener('touchend', e=>{ if(startX==null) return; const dx=e.changedTouches[0].clientX-startX; if(Math.abs(dx)>40) (dx<0?next:prev)(); startX=null; });

  if(images.length<=1){ prevBtn.style.display='none'; nextBtn.style.display='none'; dotsEl.style.display='none'; }
  render(); restart();
})();
