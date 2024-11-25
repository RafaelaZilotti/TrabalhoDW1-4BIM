const tarefalista = document.getElementById("caixa-escrever");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");

// Adicionar uma nova tarefa
function adicionarTarefa() {
    const textoTarefa = tarefalista.value.trim(); // Remove espaços no início/fim
    if (textoTarefa) {
        const li = document.createElement("li");
        li.classList.add("tarefa");
        // Adiciona o conteúdo da tarefa
        li.innerHTML = `
            <input type="checkbox" class="checkbox-tarefa">
            <span>${textoTarefa}</span>
            <div class="botoes">
                <button class="botao-editar">✏️</button>
                <button class="botao-remover">🗑️</button>
            </div>
        `;

        // Adiciona evento para marcar como concluída
        li.querySelector(".checkbox-tarefa").addEventListener("change", (e) => {
            marcarConcluida(e.target);
        });

        // Adiciona evento para o botão editar
        li.querySelector(".botao-editar").addEventListener("click", (e) => {
            editarTarefa(e.target);
        });

        // Adiciona evento para o botão remover
        li.querySelector(".botao-remover").addEventListener("click", (e) => {
            removerTarefa(e.target);
        });

        // Adiciona o item na lista
        listaTarefas.appendChild(li);
        tarefalista.value = ""; // Limpa o campo de entrada
    } else {
        alert("A tarefa não pode estar vazia!");
    }
}

// Editar uma tarefa existente
function editarTarefa(botao) {
    const li = botao.closest("li");
    const span = li.querySelector("span");
    const novoTexto = prompt("Edite a tarefa:", span.textContent);
    if (novoTexto !== null && novoTexto.trim() !== "") {
        span.textContent = novoTexto.trim();
    }
}

// Marcar tarefa como concluída
function marcarConcluida(checkbox) {
    const li = checkbox.closest("li");
    if (checkbox.checked) {
        li.classList.add("completed");
    } else {
        li.classList.remove("completed");
    }
}

// Remover uma tarefa
function removerTarefa(botao) {
    const li = botao.closest("li");
    li.remove();
}

// Adicionar evento ao botão de adicionar
botaoAdicionar.addEventListener("click", adicionarTarefa);

// Adicionar evento ao pressionar "Enter" no campo de entrada
tarefalista.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

const menu = document.querySelector("#menu")
const fecha = document.querySelector("#fecha")
const sidebar = document.querySelector("#sidebar")

document.addEventListener("keydown",mostraSidebar)
fecha.addEventListener("click",fechaSidebar)

function mostraSidebar(){
    if(event.ctrlKey && event.key === 'h'){
        sidebar.style.right = "0"
    }
}

function fechaSidebar(){
    sidebar.style.right = "-100%"
}
