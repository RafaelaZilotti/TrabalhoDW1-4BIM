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

//Contatos

// Seleção de elementos
const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('toggleSidebar');

// Função para alternar a visibilidade da sidebar
function toggleSidebar() {
    sidebar.classList.toggle('show');
}

// Evento de clique no botão de fechar
toggleButton.addEventListener('click', toggleSidebar);

// Evento de teclado para Ctrl + H
document.addEventListener('keydown', function(event) {
    // Verifica se Ctrl + H foi pressionado
    if (event.ctrlKey && (event.key === 'h' || event.key === 'H')) {
        event.preventDefault(); // Evita comportamentos padrão
        toggleSidebar();
    }
});
//Contatos

//Modo escuro
//const modo = document.getElementById('claro');

//modo.addEventListener('click', mudarModo)

//function mudarModo{
//    let modoClaro = true
//
//    if(modoClaro == true){
//        modoClaro = false
//        //mudar css
//    } else{
//        //mudar css
//    }

function atualizarBarraDeProgresso() {
    const tarefas = document.querySelectorAll(".tarefa"); // Todas as tarefas
    const tarefasConcluidas = document.querySelectorAll(".tarefa.completed"); // Tarefas concluídas
    const progresso = tarefas.length > 0 ? (tarefasConcluidas.length / tarefas.length) * 100 : 0;

    const barraDeProgresso = document.getElementById("progress-bar");
    barraDeProgresso.style.width = `${progresso}%`;

    if (progresso === 100) {
        alert("Parabéns! Você concluiu todas as tarefas! 🐾");
    }
}

// Atualiza a barra de progresso ao marcar/desmarcar uma tarefa
function marcarConcluida(checkbox) {
    const li = checkbox.closest("li");
    if (checkbox.checked) {
        li.classList.add("completed");
    } else {
        li.classList.remove("completed");
    }
    atualizarBarraDeProgresso(); // Atualiza a barra aqui
}

// Atualiza a barra ao adicionar ou remover uma tarefa
function adicionarTarefa() {
    const textoTarefa = tarefalista.value.trim();
    if (textoTarefa) {
        const li = document.createElement("li");
        li.classList.add("tarefa");
        li.innerHTML = `
            <input type="checkbox" class="checkbox-tarefa">
            <span>${textoTarefa}</span>
            <div class="botoes">
                <button class="botao-editar">✏️</button>
                <button class="botao-remover">🗑️</button>
            </div>
        `;
        li.querySelector(".checkbox-tarefa").addEventListener("change", (e) => marcarConcluida(e.target));
        li.querySelector(".botao-remover").addEventListener("click", (e) => {
            removerTarefa(e.target);
            atualizarBarraDeProgresso();
        });

        listaTarefas.appendChild(li);
        tarefalista.value = "";
        atualizarBarraDeProgresso(); // Atualiza a barra após adicionar
    } else {
        alert("A tarefa não pode estar vazia!");
    }
}

