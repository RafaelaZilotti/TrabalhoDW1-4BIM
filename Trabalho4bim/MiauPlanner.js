const tarefalista = window.document.getElementById("caixa-escrever");
const tarefaescrever = window.document.getElementById("botao-adicionar");
const listaTarefas = document.createElement("ul");
document.querySelector('.box-tarefas').appendChild(listaTarefas);

function somatarefa() {
    const tarefatexto = tarefalista.value.trim();
    if (tarefatexto !== "") {
        const li = document.createElement("li");
        li.classList.add("tarefa");
        li.innerHTML = `
        <input type="checkbox" class="checkbox-tarefa" onChange="marcarConcluida(this)">
        <span>${tarefatexto}</span>
        <button class="botao-editar" onClick="mostrarCaixaEdicao(this)">editar</button>
        <button class="botao-deletar" onClick="deletarTarefa(this)">remover</button>
        `;
        listaTarefas.appendChild(li);
        tarefalista.value = ""; 
    }
}

function mostrarCaixaEdicao(botao) {
    const li = botao.parentElement;
    const span = li.querySelector("span");
    const divEdicao = document.createElement("div");
    divEdicao.classList.add("div-edicao");

    divEdicao.innerHTML = `
        <input type="text" class="input-edicao" value="${span.innerText}">
        <button class="botao-salvar-edicao">salvar</button>
    `;
    
    // Esconde os botões de editar e remover
    const botoes = li.querySelectorAll('button');
    botoes.forEach(button => button.style.display = 'none');

    li.replaceChild(divEdicao, span);

    divEdicao.querySelector(".botao-salvar-edicao").addEventListener("click", function () {
        const novoTexto = divEdicao.querySelector(".input-edicao").value.trim();
        if (novoTexto) {
            const novoSpan = document.createElement("span");
            novoSpan.innerText = novoTexto;
            li.replaceChild(novoSpan, divEdicao);

            // Mostra os botões de editar e remover novamente
            botoes.forEach(button => button.style.display = 'inline-block');
        }
    });
}

function marcarConcluida(checkbox) {
    const li = checkbox.parentElement;
    if (checkbox.checked) {
        li.querySelector("span").style.textDecoration = "line-through"; 
        li.classList.add("completed");
    } else {
        li.querySelector("span").style.textDecoration = "none"; 
        li.classList.remove("completed");
    }
}

function deletarTarefa(botao) {
    const li = botao.parentElement;
    li.remove(); 
}

tarefaescrever.addEventListener("click", somatarefa);

tarefalista.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        somatarefa(); 
    }
});
