document.getElementById("ano").textContent = new Date().getFullYear();

const btn = document.getElementById("btn");
const msg = document.getElementById("msg");

btn.addEventListener("click", () => {
  msg.textContent = "🔥 Dia 02 concluído com sucesso!";
});
