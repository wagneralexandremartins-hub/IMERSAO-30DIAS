// ====== DIA 04 - Script ======

const ano = document.querySelector("#ano");
ano.textContent = new Date().getFullYear();

const btnMensagem = document.querySelector("#btnMensagem");
const mensagem = document.querySelector("#mensagem");

const btnStatus = document.querySelector("#btnStatus");
const statusTexto = document.querySelector("#statusTexto");
const dot = document.querySelector(".dot");

const btnTema = document.querySelector("#btnTema");
const btnAcao = document.querySelector("#btnAcao");

const stat1 = document.querySelector("#stat1");
const stat2 = document.querySelector("#stat2");
const stat3 = document.querySelector("#stat3");

const btnWhats = document.querySelector("#btnWhats");

// ====== Função de contador animado ======
function contador(el, valorFinal, tempo = 900) {
  let inicio = 0;
  const passo = Math.max(1, Math.floor(valorFinal / 50));
  const intervalo = Math.floor(tempo / (valorFinal / passo));

  const timer = setInterval(() => {
    inicio += passo;
    if (inicio >= valorFinal) {
      inicio = valorFinal;
      clearInterval(timer);
    }
    el.textContent = inicio;
  }, intervalo);
}

window.addEventListener("load", () => {
  contador(stat1, 4);
  contador(stat2, 120);
  contador(stat3, 30);
});

// ====== Mostrar mensagem ======
btnMensagem.addEventListener("click", () => {
  mensagem.textContent =
    "✅ Você está evoluindo rápido! Site do Dia 04 pronto com tema escuro e moderno.";
});

// ====== Alternar status ======
let online = true;
btnStatus.addEventListener("click", () => {
  online = !online;

  if (online) {
    statusTexto.textContent = "Online e pronto ✅";
    dot.style.background = "#3ef0d0";
    dot.style.boxShadow = "0 0 24px rgba(62, 240, 208, 0.7)";
  } else {
    statusTexto.textContent = "Manutenção ⚠️";
    dot.style.background = "#ffb84d";
    dot.style.boxShadow = "0 0 24px rgba(255, 184, 77, 0.7)";
  }
});

// ====== Glow Mode ======
btnTema.addEventListener("click", () => {
  document.body.classList.toggle("glow");
});

// ====== Botão principal hero ======
btnAcao.addEventListener("click", () => {
  document.body.classList.add("glow");
  mensagem.textContent =
    "⚡ Glow ativado! Isso deixa o site com cara de premium/tech.";
});

// ====== Simular WhatsApp ======
btnWhats.addEventListener("click", () => {
  alert("📲 Aqui amanhã a gente coloca link real para WhatsApp!");
});

// ====== Marcar menu ativo conforme scroll (simples) ======
const links = document.querySelectorAll(".menu-link");
const sections = [...links].map((a) => document.querySelector(a.getAttribute("href")));

window.addEventListener("scroll", () => {
  const y = window.scrollY + 120;

  sections.forEach((sec, i) => {
    if (!sec) return;

    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;

    if (y >= top && y < bottom) {
      links.forEach((l) => l.classList.remove("active"));
      links[i].classList.add("active");
    }
  });
});
