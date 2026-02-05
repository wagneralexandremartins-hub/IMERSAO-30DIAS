/* =====================================
   DIA 05 — JavaScript mais avançado
   Estado + localStorage + scroll spy
   Reveal + Modal + Toast + Atalhos
   ===================================== */

const STORAGE_KEY = "imersao_dia05_prefs";

const appState = {
  glowAtivo: false,
  introVisivel: true
};

// ---------- Helpers ----------
function $(sel, root = document) {
  return root.querySelector(sel);
}
function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

// ---------- Persistência ----------
function loadPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const prefs = JSON.parse(raw);
    appState.glowAtivo = !!prefs.glowAtivo;
    appState.introVisivel = prefs.introVisivel !== false; // padrão true
  } catch {
    // ignore
  }
}

function savePrefs() {
  const prefs = {
    glowAtivo: appState.glowAtivo,
    introVisivel: appState.introVisivel
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

// ---------- Glow ----------
function applyGlow() {
  document.body.classList.toggle("glow-ativo", appState.glowAtivo);
}

function alternarGlow() {
  appState.glowAtivo = !appState.glowAtivo;
  applyGlow();
  savePrefs();
  toast("Glow", appState.glowAtivo ? "Efeito ativado e salvo ✅" : "Efeito desativado e salvo ✅");
}

// ---------- Intro ----------
function applyIntro() {
  const intro = $("#intro");
  if (!intro) return;

  if (appState.introVisivel) {
    intro.classList.remove("intro-oculta");
  } else {
    intro.classList.add("intro-oculta");
  }
}

function alternarIntro() {
  appState.introVisivel = !appState.introVisivel;
  applyIntro();
  savePrefs();
  toast("Introdução", appState.introVisivel ? "Intro visível ✅" : "Intro oculta ✅");
}

// ---------- Toast ----------
function toast(title, message) {
  const host = $("#toasts");
  if (!host) return;

  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<strong>${title}</strong><p>${message}</p>`;
  host.appendChild(el);

  // auto remove
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(6px)";
    el.style.transition = "250ms ease";
    setTimeout(() => el.remove(), 260);
  }, 2200);
}

// ---------- Modal ----------
function openModal(title, body) {
  const modal = $("#modal");
  const modalTitle = $("#modalTitle");
  const modalBody = $("#modalBody");

  if (!modal || !modalTitle || !modalBody) return;

  modalTitle.textContent = title || "Detalhes";
  modalBody.textContent = body || "";
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  const modal = $("#modal");
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

// ---------- Reveal on scroll ----------
function setupReveal() {
  const items = $all(".reveal");
  if (!items.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => io.observe(el));
}

// ---------- Scroll Spy (menu ativo) ----------
function setupScrollSpy() {
  const links = $all(".nav-link");
  const sections = ["#inicio", "#cards", "#destaques", "#contato"]
    .map((id) => document.querySelector(id))
    .filter(Boolean);

  if (!links.length || !sections.length) return;

  const mapLink = new Map();
  links.forEach((a) => mapLink.set(a.getAttribute("href"), a));

  const io = new IntersectionObserver(
    (entries) => {
      // pega o que está mais visível
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const id = "#" + visible.target.id;
      links.forEach((a) => a.classList.remove("is-active"));
      const active = mapLink.get(id);
      if (active) active.classList.add("is-active");
    },
    { threshold: [0.25, 0.4, 0.55, 0.7] }
  );

  sections.forEach((sec) => io.observe(sec));
}

// ---------- Form ----------
function setupForm() {
  const form = $("#formContato");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const nome = String(data.get("nome") || "").trim();
    const email = String(data.get("email") || "").trim();
    const msg = String(data.get("mensagem") || "").trim();

    if (nome.length < 2 || msg.length < 5 || !email.includes("@")) {
      toast("Ops", "Preencha corretamente antes de enviar.");
      return;
    }

    toast("Enviado ✅", "Formulário validado (simulação).");
    form.reset();
  });
}

// ---------- Bindings ----------
function setupButtons() {
  const btnGlow = $("#btnGlow");
  const btnIntro = $("#btnIntro");
  const btnToast = $("#btnToast");

  btnGlow?.addEventListener("click", alternarGlow);
  btnIntro?.addEventListener("click", alternarIntro);
  btnToast?.addEventListener("click", () => toast("Teste", "Toast funcionando perfeitamente ✅"));

  // Modal open
  $all(".js-open").forEach((btn) => {
    btn.addEventListener("click", () => {
      const title = btn.dataset.title || "Detalhes";
      const body = btn.dataset.body || "";
      openModal(title, body);
    });
  });

  // Modal close
  const modal = $("#modal");
  modal?.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.matches("[data-close]")) closeModal();
  });

  $("#modalOk")?.addEventListener("click", () => {
    toast("OK", "Ação confirmada ✅");
    closeModal();
  });
}

// ---------- Atalhos ----------
function setupShortcuts() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();

    // não dispara atalhos enquanto digitando no form
    const tag = (document.activeElement?.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea") return;

    const k = e.key.toLowerCase();
    if (k === "g") alternarGlow();
    if (k === "i") alternarIntro();
    if (k === "t") toast("Atalho", "Você usou um atalho de teclado ✅");
  });
}

// ---------- Init ----------
function init() {
  // cria âncora #inicio real (na prática, topo)
  const top = document.createElement("div");
  top.id = "inicio";
  top.style.position = "relative";
  top.style.top = "-64px";
  document.body.insertBefore(top, document.body.firstChild);

  loadPrefs();
  applyGlow();
  applyIntro();

  setupButtons();
  setupReveal();
  setupScrollSpy();
  setupForm();
  setupShortcuts();

  toast("Dia 05", "JS avançado carregado ✅");
}

document.addEventListener("DOMContentLoaded", init);
