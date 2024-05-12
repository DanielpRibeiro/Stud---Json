// Array para armazenar as tarefas
let tarefas = [];

// Função para adicionar uma nova tarefa
function adicionarTarefa(tarefa) {
    tarefas.push(tarefa);
    atualizarListaTarefas();
    salvarTarefasLocalStorage();
}

// Função para remover uma tarefa
function removerTarefa(index) {
    tarefas.splice(index, 1);
    atualizarListaTarefas();
    salvarTarefasLocalStorage();
}

// Função para atualizar a lista de tarefas no HTML
function atualizarListaTarefas() {
    const listaTarefas = document.getElementById('lista-tarefas');
    listaTarefas.innerHTML = '';
    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        li.textContent = tarefa;
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.addEventListener('click', () => {
            removerTarefa(index);
        });
        li.appendChild(botaoRemover);
        listaTarefas.appendChild(li);
    });
}

// Função para salvar as tarefas no armazenamento local
function salvarTarefasLocalStorage() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Função para carregar as tarefas do armazenamento local
function carregarTarefasLocalStorage() {
    const tarefasString = localStorage.getItem('tarefas');
    if (tarefasString) {
        tarefas = JSON.parse(tarefasString);
        atualizarListaTarefas();
    }
}

// Adicionar evento de envio do formulário
const formTarefa = document.getElementById('form-tarefa');
formTarefa.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputTarefa = document.getElementById('input-tarefa');
    const novaTarefa = inputTarefa.value.trim();
    if (novaTarefa !== '') {
        adicionarTarefa(novaTarefa);
        inputTarefa.value = '';
    }
});

// Carregar tarefas do armazenamento local ao iniciar a página
carregarTarefasLocalStorage();
