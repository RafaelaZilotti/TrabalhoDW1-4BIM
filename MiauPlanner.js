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
const modo = document.getElementById('claro');

modo.addEventListener('click', mudarModo)

function mudarModo(){
    const cianoAtual = getComputedStyle(document.documentElement).getPropertyValue('--ciano').trim();

    if(cianoAtual === 'rgb(153, 255, 255)'){
        document.documentElement.style.setProperty('--ciano', 'rgb(126, 35, 122)');
        document.documentElement.style.setProperty('--beige','rgb(77, 0, 88)');
        document.documentElement.style.setProperty('--vinho','rgb(240, 212, 244)');
        document.documentElement.style.setProperty('--rosa-claro',' rgb(206, 125, 217)');
        document.documentElement.style.setProperty('--branco','rgb(240, 136, 214)');
        document.documentElement.style.setProperty('--verde','rgb(162, 59, 186)');
        document.documentElement.style.setProperty('--cinza','rgb(251, 234, 255)');
    } else {
        document.documentElement.style.setProperty('--ciano','rgb(153, 255, 255)');
        document.documentElement.style.setProperty('--beige','antiquewhite');
        document.documentElement.style.setProperty('--vinho','rgb(131, 27, 89)');
        document.documentElement.style.setProperty('--rosa-claro','rgb(253, 187, 226)');
        document.documentElement.style.setProperty('--branco','white');
        document.documentElement.style.setProperty('--verde','#d3ffd3');
        document.documentElement.style.setProperty('--cinza','#555');
    }


}


    //barra de progresso
    function atualizarBarraDeProgresso() {
        const tarefas = document.querySelectorAll(".tarefa"); // Todas as tarefas
        const tarefasConcluidas = document.querySelectorAll(".tarefa.completed"); // Tarefas concluídas
        const progresso = tarefas.length > 0 ? (tarefasConcluidas.length / tarefas.length) * 100 : 0;
    
        const barraDeProgresso = document.getElementById("progress-bar");
        barraDeProgresso.style.width = `${progresso}%`;
    
        // Animação de confetes quando todas as tarefas forem concluídas
        if (progresso === 100) {
            startConfetti(); // Inicia os confetes
            setTimeout(() => {
                stopConfetti(); // Para os confetes
                removeConfetti(); // Remove os confetes da tela
            }, 2500); // Após 4 segundos
        }
    }
    
    // Código da animação de confetes
    (function() {
        const confetti = {
            maxCount: 150,
            speed: 2,
            frameInterval: 15,
            alpha: 1.0,
            gradient: false
        };
    
        let supportsAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || 
                                      window.mozRequestAnimationFrame || window.oRequestAnimationFrame || 
                                      window.msRequestAnimationFrame;
    
        let particles = [];
        let streamingConfetti = false;
        let context = null;
    
        function resetParticle(particle, width, height) {
            particle.color = getRandomColor(confetti.alpha);
            particle.x = Math.random() * width;
            particle.y = Math.random() * height - height;
            particle.diameter = Math.random() * 10 + 5;
            particle.tilt = Math.random() * 10 - 10;
            particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
            particle.tiltAngle = Math.random() * Math.PI;
            return particle;
        }
    
        function getRandomColor(alpha) {
            const colors = [
                "rgba(255,182,193,", // Rosa claro
                "rgba(221,160,221,", // Lilás médio
                "rgba(135,206,235,", // Azul claro
                "rgba(255,105,180,", // Rosa intenso
                "rgba(186,85,211,",  // Roxo claro
                "rgba(173,216,230,", // Azul pastel
                "rgba(219,112,147,", // Rosa escuro
                "rgba(148,0,211,",   // Roxo profundo
                "rgba(240,248,255,"  // Azul quase branco
            ];
            return colors[(Math.random() * colors.length) | 0] + alpha + ")";
        }
    
        function runAnimation() {
            if (!streamingConfetti) return;
            context.clearRect(0, 0, window.innerWidth, window.innerHeight);
            updateParticles();
            drawParticles();
            requestAnimationFrame(runAnimation);
        }
    
        function startConfetti() {
            const canvas = getOrCreateCanvas();
            const width = window.innerWidth;
            const height = window.innerHeight;
    
            while (particles.length < confetti.maxCount) {
                particles.push(resetParticle({}, width, height));
            }
            streamingConfetti = true;
            runAnimation();
        }
    
        function stopConfetti() {
            streamingConfetti = false;
        }
    
        function removeConfetti() {
            const canvas = document.getElementById("confetti-canvas");
            if (canvas) {
                canvas.remove(); // Remove o canvas da tela
            }
            particles = []; // Limpa as partículas
            context = null; // Reseta o contexto
        }
    
        function updateParticles() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];
                particle.tiltAngle += particle.tiltAngleIncrement;
                particle.x += Math.sin(particle.tiltAngle) * 2;
                particle.y += (Math.cos(particle.tiltAngle) + particle.diameter + confetti.speed) * 0.5;
    
                if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
                    if (streamingConfetti && particles.length <= confetti.maxCount) {
                        resetParticle(particle, width, height);
                    } else {
                        particles.splice(i, 1);
                        i--;
                    }
                }
            }
        }
    
        function drawParticles() {
            for (const particle of particles) {
                context.beginPath();
                context.lineWidth = particle.diameter;
                context.strokeStyle = particle.color;
                context.moveTo(particle.x, particle.y);
                context.lineTo(particle.x + particle.tilt, particle.y + particle.tilt + particle.diameter);
                context.stroke();
            }
        }
    
        function getOrCreateCanvas() {
            let canvas = document.getElementById("confetti-canvas");
            if (!canvas) {
                canvas = document.createElement("canvas");
                canvas.id = "confetti-canvas";
                canvas.style.position = "fixed";
                canvas.style.top = 0;
                canvas.style.left = 0;
                canvas.style.zIndex = 999999;
                canvas.style.pointerEvents = "none";
                document.body.appendChild(canvas);
    
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                window.addEventListener("resize", () => {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                });
            }
            context = canvas.getContext("2d");
            return canvas;
        }
    
        window.startConfetti = startConfetti;
        window.stopConfetti = stopConfetti;
        window.removeConfetti = removeConfetti;
    })();
    
    
    
    
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
    



