// DIA 01 — A Graça da Adoração
// JS leve: botão "voltar ao topo" + toast e persistência simples.

(function () {
  // Toast
  const toast = document.createElement("div");
  toast.className = "toast";
  document.body.appendChild(toast);

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  // Botão flutuante (FAB)
  const fab = document.createElement("button");
  fab.className = "fab";
  fab.type = "button";
  fab.innerHTML = `<span class="dot"></span><span>Voltar ao topo</span>`;
  document.body.appendChild(fab);

  // Mostrar/esconder conforme scroll
  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    fab.style.display = y > 200 ? "inline-flex" : "none";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  fab.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("Subindo… (Dia 01)");
    localStorage.setItem("dia01_last_action", "top");
  });

  // Mensagem de boas-vindas 1x
  const key = "dia01_welcome_done";
  if (!localStorage.getItem(key)) {
    setTimeout(() => showToast("Dia 01 carregado ✅"), 600);
    localStorage.setItem(key, "1");
  }
})();
