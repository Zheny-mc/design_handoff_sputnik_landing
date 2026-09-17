/* Sputnik landing — subtle interactions */

// ------- Nav scroll state -------
const nav = document.getElementById('nav');
const heroImg = document.getElementById('heroImg');

const onScroll = () => {
  const y = window.scrollY;
  if (y > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');

  // hero parallax
  if (heroImg && y < window.innerHeight * 1.5) {
    heroImg.style.transform = `translateY(${y * 0.28}px) scale(${1.02 + y * 0.00015})`;
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ------- Reveal-on-scroll observer -------
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ------- Default booking dates -------
(function initDates() {
  const fmt = (d) => d.toISOString().slice(0, 10);
  const today = new Date();
  const inD = new Date(today);
  inD.setDate(inD.getDate() + 3);
  const outD = new Date(today);
  outD.setDate(outD.getDate() + 5);
  const ci = document.getElementById('checkin');
  const co = document.getElementById('checkout');
  if (ci) ci.value = fmt(inD);
  if (co) co.value = fmt(outD);
})();

// ------- Smooth-scroll for in-page anchors (native, but respect nav offset) -------
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
