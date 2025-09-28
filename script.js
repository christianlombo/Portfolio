document.addEventListener('DOMContentLoaded', () => {
  // Typing effect for your name
  const name = "Christian Lombo";
  const typedName = document.getElementById("typed-name");
  let index = 0;

  function typeWriter() {
    if (index < name.length) {
      typedName.textContent += name.charAt(index);
      index++;
      setTimeout(typeWriter, 150);
    }
  }

  // Delay typing until after terminal intro disappears
  setTimeout(() => {
    document.getElementById("terminal-intro").style.display = "none";
    typeWriter();
  }, 3000);

  // Dark mode toggle
  const toggleBtn = document.getElementById("toggle-theme");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

  // Simple particles effect
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  }));

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(30,144,255,0.6)";
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;

      // Bounce off edges
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Resize canvas on window resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
