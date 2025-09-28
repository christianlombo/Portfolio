document.addEventListener('DOMContentLoaded', () => {
  // Typing effect for your name
  const name = "Christian Lombo";
  const typedName = document.getElementById("typed-name");
  let index = 0;

  function typeWriter() {
    if (index < name.length) {
      typedName.textContent += name.charAt(index);
      index++;
      setTimeout(typeWriter, 120);
    }
  }

  // Hide terminal intro after short time but don't reserve full-screen
  setTimeout(() => {
    const t = document.getElementById("terminal-intro");
    if (t) t.style.display = "none";
    typeWriter();
  }, 1800);

  // Dark mode toggle
  const toggleBtn = document.getElementById("toggle-theme");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

  // Particle canvas that's a strip behind the header (not full page)
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  function resizeCanvasToHeader() {
    const header = document.querySelector('header');
    const rect = header.getBoundingClientRect();
    canvas.style.position = 'absolute';
    canvas.style.top = (rect.top + window.scrollY) + 'px';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.width = window.innerWidth;
    // make canvas height the height of header (plus a little)
    canvas.height = Math.max(140, rect.height + 10);
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
  }

  resizeCanvasToHeader();

  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2.2 + 0.6,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.3
  }));

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(30,144,255,0.55)";
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      // gently wrap when off bottom to keep the strip filled
      if (p.y > canvas.height) p.y = 0;
      if (p.y < 0) p.y = canvas.height;
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  window.addEventListener("resize", () => {
    resizeCanvasToHeader();
    // adjust particle positions if canvas size changed
    particles.forEach(p => {
      p.x = Math.min(p.x, window.innerWidth - 1);
      p.y = Math.min(p.y, canvas.height - 1);
    });
  });
});
