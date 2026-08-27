// Header scroll state
const header=document.getElementById('siteHeader');
const topBtn=document.getElementById('topBtn');
window.addEventListener('scroll',()=>{
  if(header) header.classList.toggle('scrolled',window.scrollY>40);
  if(topBtn) topBtn.classList.toggle('show',window.scrollY>600);
});
if(!document.querySelector('.hero')&&header) header.classList.add('scrolled');
if(topBtn) topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// Mobile menu
const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobileMenu');
if(hamburger&&mobileMenu){
  hamburger.addEventListener('click',()=>{
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));
}

// Scroll reveal
const revealEls=document.querySelectorAll('.reveal');
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:.12});
revealEls.forEach(el=>io.observe(el));

// Counter animation
const counters=document.querySelectorAll('.counter');
const cio=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target, target=+el.dataset.target;
      let cur=0; const step=Math.max(1,Math.ceil(target/60));
      const t=setInterval(()=>{ cur+=step; if(cur>=target){cur=target;clearInterval(t);} el.textContent=cur; },24);
      cio.unobserve(el);
    }
  });
},{threshold:.5});
counters.forEach(c=>cio.observe(c));

// Duplicate marquee content for seamless loop
const track=document.getElementById('marqueeTrack');
if(track) track.innerHTML+=track.innerHTML;

// Generic filter buttons (used on Projects page)
document.querySelectorAll('[data-filter-group]').forEach(group=>{
  const buttons=group.querySelectorAll('.filter-btn');
  const targetSel=group.dataset.filterGroup;
  const attr=group.dataset.filterAttr||'builder';
  buttons.forEach(btn=>{
    btn.addEventListener('click',()=>{
      buttons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const val=btn.dataset.value;
      document.querySelectorAll(targetSel).forEach(row=>{
        row.style.display=(val==='all'||row.dataset[attr]===val)?'':'none';
      });
    });
  });
});
