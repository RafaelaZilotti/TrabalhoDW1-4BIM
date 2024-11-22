const tarefalista = window.document.getElementById("caixa-escrever");
const tarefaescrever = window.document.getElementById("botao-adicionar");
const listaTarefas = document.createElement("ul");  // Cria a lista onde as tarefas serão adicionadas
document.querySelector('.box-tarefas').appendChild(listaTarefas); // Adiciona a lista na div .box-tarefas

// Função para adicionar tarefa
function somatarefa() {
    const tarefatexto = tarefalista.value.trim(); // Captura o valor do input
    if (tarefatexto !== "") {
        const li = document.createElement("li"); // Cria um novo item da lista
        li.innerHTML = `   
        <span>${tarefatexto}</span>
        <button class="botao-editar" onClick="editarTarefa(this)">editar</button>
        <button class="botao-deletar" onClick="deletarTarefa(this)">remover</button>
        `;
        listaTarefas.appendChild(li); // Adiciona o item à lista
        tarefalista.value = ""; // Limpa o campo de entrada
    }
}

// Função para editar a tarefa
function editarTarefa(botao) {
    const li = botao.parentElement; // Pega o item <li> que contém o botão
    const span = li.querySelector("span"); // Pega o texto da tarefa
    const novoTexto = prompt("Edite sua tarefa:", span.innerText); // Prompt para edição
    if (novoTexto) {
        span.innerText = novoTexto; // Atualiza o texto da tarefa
    }
}

// Função para deletar a tarefa
function deletarTarefa(botao) {
    const li = botao.parentElement; // Pega o item <li> que contém o botão
    li.remove(); // Remove o item da lista
}

// Adiciona a tarefa quando o botão de adicionar é clicado
tarefaescrever.addEventListener("click", somatarefa);

// Se o usuário pressionar Enter, também adiciona a tarefa
tarefalista.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        somatarefa(); // Chama a função para adicionar a tarefa
    }
});