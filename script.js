// Importações do Firebase (NÃO misture CDN com módulos do NPM)
import { db } from './firebase-config.js';
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';

// Referências aos elementos
const btnConfirmar = document.getElementById('btn-confirmar');
const nomeInput = document.getElementById('nome');
const presencaSection = document.getElementById('presenca');
const listaPresentesSection = document.getElementById('lista-presentes');
const presentesUl = document.getElementById('presentes');
const mensagemAgradecimento = document.getElementById('mensagem-agradecimento');

let nomeConvidado = '';

// Quando a pessoa confirma presença
btnConfirmar.addEventListener('click', async () => {
  const nome = nomeInput.value.trim();
  if (!nome) {
    alert('Por favor, digite seu nome para confirmar presença.');
    return;
  }

  nomeConvidado = nome;

  // Salvar presença no Firebase
  try {
    await addDoc(collection(db, 'presencas'), {
      nome: nomeConvidado,
      confirmadoEm: serverTimestamp()
    });

    // Mostrar seção de presentes
    presencaSection.style.display = 'none';
    listaPresentesSection.style.display = 'block';
  } catch (error) {
    console.error("Erro ao confirmar presença:", error);
    alert("Ocorreu um erro ao registrar sua presença.");
  }
});

// Referência para a coleção "presentes"
const presentesCollection = collection(db, 'presentes');

// Função que cria o item da lista
function criarLiPresente(presente) {
  const li = document.createElement('li');

  if (presente.selecionado) {
    li.classList.add('riscado');
    li.textContent = `${presente.nome} (Escolhido por: ${presente.selecionadoPor})`;
  } else {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.marginRight = '15px';

    checkbox.addEventListener('change', async () => {
      if (checkbox.checked) {
        const docRef = doc(db, 'presentes', presente.id);
        await updateDoc(docRef, {
          selecionado: true,
          selecionadoPor: nomeConvidado,
        });
        mensagemAgradecimento.textContent = 'Obrigado por confirmar seu presente! 💛';
      }
    });

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(presente.nome));
  }

  return li;
}

// Ouvinte em tempo real para carregar os presentes
onSnapshot(presentesCollection, (snapshot) => {
  presentesUl.innerHTML = ''; // limpa lista
  snapshot.forEach(docSnap => {
    const dado = docSnap.data();
    presentesUl.appendChild(
      criarLiPresente({
        id: docSnap.id,
        nome: dado.nome,
        selecionado: dado.selecionado || false,
        selecionadoPor: dado.selecionadoPor || '',
      })
    );
  });
});
