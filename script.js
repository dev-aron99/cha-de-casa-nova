import { db } from './firebase-config.js';
import { collection, onSnapshot, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// aí você usa db, collection, etc.

const btnConfirmar = document.getElementById("btn-confirmar");
const nomeInput = document.getElementById("nome");
const presencaSection = document.getElementById("presenca");
const listaPresentesSection = document.getElementById("lista-presentes");
const presentesUl = document.getElementById("presentes");
const btnPresentes = document.getElementById("btn-presentes");
const mensagemAgradecimento = document.getElementById("mensagem-agradecimento");

let nomeConvidado = "";

btnConfirmar.addEventListener("click", () => {
  const nome = nomeInput.value.trim();
  if (!nome) {
    alert("Por favor, digite seu nome para confirmar presença.");
    return;
  }
  nomeConvidado = nome;
  presencaSection.style.display = "none";
  listaPresentesSection.style.display = "block";
});

const presentesCollection = collection(db, "presentes");

// Função para criar um li para o presente
function criarLiPresente(presente) {
  const li = document.createElement("li");
  li.textContent = presente.nome;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.disabled = presente.selecionado;
  checkbox.checked = false;

  if (presente.selecionado) {
    li.classList.add("riscado");
    li.innerHTML = `✅ ${presente.nome} <small style="margin-left:auto;font-size:0.9em;color:#666;">(por ${presente.selecionadoPor})</small>`;
  }

  li.prepend(checkbox);

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      // Atualiza Firestore para marcar como selecionado
      const presenteDoc = doc(db, "presentes", presente.id);
      updateDoc(presenteDoc, {
        selecionado: true,
        selecionadoPor: nomeConvidado,
      });
      mensagemAgradecimento.textContent = "Obrigado por confirmar seu presente! 💛";
    }
  });

  return li;
}

// Ouve alterações em tempo real no Firestore
onSnapshot(presentesCollection, (snapshot) => {
  presentesUl.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const dado = docSnap.data();
    presentesUl.appendChild(
      criarLiPresente({
        id: docSnap.id,
        nome: dado.nome,
        selecionado: dado.selecionado || false,
        selecionadoPor: dado.selecionadoPor || "",
      })
    );
  });
});
