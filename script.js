document.addEventListener('DOMContentLoaded', () => {
  // Typing effect for your name
  const name = 'Christian Lombo';
  const typedName = document.getElementById('typed-name');
  let index = 0;

  function typeWriter() {
    if (index < name.length) {
      typedName.textContent += name.charAt(index);
      index++;
      setTimeout(typeWriter, 150);
    }
  }
  typeWriter();

  // Scroll reveal effect for all sections
  const sections = document.querySelectorAll('section');

  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < triggerBottom) {
        section.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // reveal on load if already in view

  // Dark mode toggle
  const toggleBtn = document.getElementById('toggle-theme');
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
      toggleBtn.textContent = '☀️';
    } else {
      toggleBtn.textContent = '🌙';
    }
  });
});
