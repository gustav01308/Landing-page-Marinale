document.addEventListener("DOMContentLoaded", () => {
  // Carrossel infinito de logos
  const track = document.querySelector('.marcas-track');
  let isDragging = false;
  let offset = 0;
  const velocidade = 2.0;
  let startX = 0;
  let dragOffset = 0;

  function loopCarrossel() {
    if (!isDragging) {
      offset -= velocidade;

      const primeiroLogo = track.children[0];
      if (primeiroLogo) {
        if (Math.abs(offset) >= primeiroLogo.offsetWidth + 50) {
          track.appendChild(primeiroLogo);
          offset += primeiroLogo.offsetWidth + 50;
        }
      }

      track.style.transform = `translateX(${offset}px)`;
    }
    requestAnimationFrame(loopCarrossel);
  }

  if (track) loopCarrossel();

  // Arraste manual usando transform
  if (track) {
    track.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      dragOffset = offset;
      track.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const x = e.pageX;
      offset = dragOffset + (x - startX);
      track.style.transform = `translateX(${offset}px)`;
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        track.style.cursor = 'grab';
      }
    });

    track.style.cursor = 'grab';
  }

  // Efeito de revelação ao scroll
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    for (const el of reveals) {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 100;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
      }
    }
  }

  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  // Blocos "Sobre Nós"
  let blocoAtual = 1;
  const totalBlocos = 4;

document.getElementById("btnProximo").addEventListener("click", () => {
  const atual = document.getElementById(`bloco${blocoAtual}`);
  atual.classList.remove("ativo", "animar-colunas-esquerda", "animar-colunas-direita");
  blocoAtual = blocoAtual === totalBlocos ? 1 : blocoAtual + 1;
  const proximo = document.getElementById(`bloco${blocoAtual}`);
  proximo.classList.add("ativo", "animar-colunas-esquerda");
  setTimeout(() => proximo.classList.remove("animar-colunas-esquerda"), 600);
});

document.getElementById("btnAnterior").addEventListener("click", () => {
  const atual = document.getElementById(`bloco${blocoAtual}`);
  atual.classList.remove("ativo", "animar-colunas-esquerda", "animar-colunas-direita");
  blocoAtual = blocoAtual === 1 ? totalBlocos : blocoAtual - 1;
  const anterior = document.getElementById(`bloco${blocoAtual}`);
  anterior.classList.add("ativo", "animar-colunas-direita");
  setTimeout(() => anterior.classList.remove("animar-colunas-direita"), 600);
});
});
