import { db, ref, onValue, set } from './firebase-config.js';

const lista = document.getElementById("lista-presentes");
const nomeInput = document.getElementById("nome");

const presentes = [
  "Panela elétrica", "Toalha de banho", "Jogo de pratos", "Liquidificador", "Cafeteira"
];

presentes.forEach((item, i) => {
  const li = document.createElement("li");
  li.textContent = item;
  li.id = "item-" + i;

  const itemRef = ref(db, "presentes/" + i);

  onValue(itemRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      li.textContent += ` (Escolhido por: ${data.nome})`;
      li.classList.add("selecionado");
      li.onclick = null;
    } else {
      li.onclick = () => {
        const nome = nomeInput.value.trim();
        if (!nome) return alert("Digite seu nome!");
        set(itemRef, { nome });
      };
    }
  });

  lista.appendChild(li);
});
