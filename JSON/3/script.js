// Função para adicionar um novo contato
function adicionarContato(nome, email, telefone) {
    const novoContato = {
        nome: nome,
        email: email,
        telefone: telefone
    };
    let contatos = obterContatosLocalStorage();
    contatos.push(novoContato);
    salvarContatosLocalStorage(contatos);
    atualizarListaContatos();
}

// Função para remover um contato
function removerContato(index) {
    let contatos = obterContatosLocalStorage();
    contatos.splice(index, 1);
    salvarContatosLocalStorage(contatos);
    atualizarListaContatos();
}

// Função para carregar contatos do armazenamento local
function obterContatosLocalStorage() {
    return JSON.parse(localStorage.getItem('contatos')) || [];
}

// Função para salvar contatos no armazenamento local
function salvarContatosLocalStorage(contatos) {
    localStorage.setItem('contatos', JSON.stringify(contatos));
}

// Função para atualizar a lista de contatos no HTML
function atualizarListaContatos() {
    const listaContatos = document.getElementById('lista-contatos');
    listaContatos.innerHTML = '';
    const contatos = obterContatosLocalStorage();
    contatos.forEach((contato, index) => {
        const divContato = document.createElement('div');
        divContato.classList.add('contato');
        divContato.innerHTML = `
            <p><strong>Nome:</strong> ${contato.nome}</p>
            <p><strong>Email:</strong> ${contato.email}</p>
            <p><strong>Telefone:</strong> ${contato.telefone}</p>
            <button onclick="removerContato(${index})">Remover</button>
        `;
        listaContatos.appendChild(divContato);
    });
}

// Adicionar evento de envio do formulário
const formContato = document.getElementById('form-contato');
formContato.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputNome = document.getElementById('input-nome').value.trim();
    const inputEmail = document.getElementById('input-email').value.trim();
    const inputTelefone = document.getElementById('input-telefone').value.trim();
    if (inputNome !== '' && inputEmail !== '' && inputTelefone !== '') {
        adicionarContato(inputNome, inputEmail, inputTelefone);
        formContato.reset();
    } else {
        alert('Por favor, preencha todos os campos!');
    }
});

// Carregar contatos do armazenamento local ao iniciar a página
atualizarListaContatos();
