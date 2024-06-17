class Aluno {
    constructor(nome, sexo, dataNascimento, identidade, orgao, cpf, naturalidade, nomePai, nomeMae, rua, numeroRua, cidade, cep, estado, telefone, celular, email, foto) {
        this.nome = nome;
        this.sexo = sexo;
        this.dataNascimento = dataNascimento;
        this.identidade = identidade;
        this.orgao = orgao;
        this.cpf = cpf;
        this.naturalidade = naturalidade;
        this.nomePai = nomePai;
        this.nomeMae = nomeMae;
        this.endereco = {
            rua: rua,
            numeroRua: numeroRua,
            cidade: cidade,
            cep: cep,
            estado: estado
        };
        this.telefone = telefone;
        this.celular = celular;
        this.email = email;
        this.foto = foto;
    }
}

// Função para realizar o login
function realizarLogin(username, password) {
    const usuarios = [
        { username: 'admin', password: '1234' }
        // Adicione outros usuários conforme necessário
    ];

    const usuarioValido = usuarios.find(user => user.username === username && user.password === password);

    if (usuarioValido) {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'index.html';
    } else {
        alert('Usuário ou senha incorretos. Tente novamente.');
    }
}

// Função para verificar se o usuário está logado
function verificarLogin() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn || loggedIn !== 'true') {
        window.location.href = 'login.html';
    }
}

// Função para fazer logout
function realizarLogout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'login.html';
}

// Evento quando o documento HTML estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            realizarLogin(username, password);
        });
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            realizarLogout();
        });
    }

    if (!window.location.pathname.endsWith('login.html')) {
        verificarLogin();
    }
});

function salvarAluno() {
    const nome = document.getElementById('nome').value;
    const sexo = document.getElementById('sexo').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const identidade = document.getElementById('identidade').value;
    const orgao = document.getElementById('orgao').value;
    const cpf = document.getElementById('cpf').value;
    const naturalidade = document.getElementById('naturalidade').value;
    const nomePai = document.getElementById('nomePai').value;
    const nomeMae = document.getElementById('nomeMae').value;
    const rua = document.getElementById('rua').value;
    const numeroRua = document.getElementById('numeroRua').value;
    const cidade = document.getElementById('cidade').value;
    const cep = document.getElementById('cep').value;
    const estado = document.getElementById('estado').value;
    const telefone = document.getElementById('telefone').value;
    const celular = document.getElementById('celular').value;
    const email = document.getElementById('email').value;
    const foto = document.getElementById('foto').files[0];

    if (!nome || !sexo || !dataNascimento || !identidade || !orgao || !cpf || !naturalidade || !nomePai || !nomeMae || !rua || !numeroRua || !cidade || !cep || !estado || !telefone || !celular || !email || !foto) {
        alert('Por gentileza, preencha todos os campos obrigatórios.');
        return;
    }

    const reader = new FileReader();
    reader.onloadend = function() {
        const aluno = new Aluno(nome, sexo, dataNascimento, identidade, orgao, cpf, naturalidade, nomePai, nomeMae, rua, numeroRua, cidade, cep, estado, telefone, celular, email, reader.result);
        let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
        alunos.push(aluno);
        localStorage.setItem('alunos', JSON.stringify(alunos));
        alert('Aluno cadastrado com sucesso!');
        window.location.href = 'detalhesaluno.html';
    };

    if (foto) {
        reader.readAsDataURL(foto);
    } else {
        reader.onloadend();
    }
}

function carregarAlunos() {
    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    const listaAlunos = document.getElementById('alunos');
    if (!listaAlunos) {
        console.error("Elemento 'alunos' não encontrado no HTML.");
        return;
    }

    listaAlunos.innerHTML = '';

    alunos.forEach((aluno, index) => {
        if (aluno && aluno.nome && aluno.foto) {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <img src="${aluno.foto}" alt="Foto de ${aluno.nome}" class="foto-aluno">
                    <span>${aluno.nome}</span>
                </div>
                <div>
                    <button class="edit-btn" onclick="editarAluno(${index})">Editar</button>
                    <button class="delete-btn" onclick="deletarAluno(${index})">Deletar</button>
                </div>
            `;
            listaAlunos.appendChild(li);
        }
    });
}

function editarAluno(index) {
    window.location.href = `atualizarCadastro.html?index=${index}`;
}

window.onload = function() {
    if (window.location.pathname.endsWith('detalhesaluno.html')) {
        carregarAlunos();
    } else if (window.location.pathname.endsWith('atualizarCadastro.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const index = urlParams.get('index');
        if (index !== null) {
            const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
            const aluno = alunos[index];
            if (aluno) {
                document.getElementById('nome').value = aluno.nome || '';
                document.getElementById('sexo').value = aluno.sexo || '';
                document.getElementById('dataNascimento').value = aluno.dataNascimento || '';
                document.getElementById('identidade').value = aluno.identidade || '';
                document.getElementById('orgao').value = aluno.orgao || '';
                document.getElementById('cpf').value = aluno.cpf || '';
                document.getElementById('naturalidade').value = aluno.naturalidade || '';
                document.getElementById('nomePai').value = aluno.nomePai || '';
                document.getElementById('nomeMae').value = aluno.nomeMae || '';
                document.getElementById('rua').value = (aluno.endereco && aluno.endereco.rua) || '';
                document.getElementById('numeroRua').value = (aluno.endereco && aluno.endereco.numeroRua) || '';
                document.getElementById('cidade').value = (aluno.endereco && aluno.endereco.cidade) || '';
                document.getElementById('cep').value = (aluno.endereco && aluno.endereco.cep) || '';
                document.getElementById('estado').value = (aluno.endereco && aluno.endereco.estado) || '';
                document.getElementById('telefone').value = aluno.telefone || '';
                document.getElementById('celular').value = aluno.celular || '';
                document.getElementById('email').value = aluno.email || '';
            }
        }
    }
};

function atualizarAluno() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');
    if (index !== null) {
        const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
        const aluno = alunos[index];
        if (aluno) {
            aluno.nome = document.getElementById('nome').value;
            aluno.sexo = document.getElementById('sexo').value;
            aluno.dataNascimento = document.getElementById('dataNascimento').value;
            aluno.identidade = document.getElementById('identidade').value;
            aluno.orgao = document.getElementById('orgao').value;
            aluno.cpf = document.getElementById('cpf').value;
            aluno.naturalidade = document.getElementById('naturalidade').value;
            aluno.nomePai = document.getElementById('nomePai').value;
            aluno.nomeMae = document.getElementById('nomeMae').value;
            aluno.endereco = {
                rua: document.getElementById('rua').value,
                numeroRua: document.getElementById('numeroRua').value,
                cidade: document.getElementById('cidade').value,
                cep: document.getElementById('cep').value,
                estado: document.getElementById('estado').value
            };
            aluno.telefone = document.getElementById('telefone').value;
            aluno.celular = document.getElementById('celular').value;
            aluno.email = document.getElementById('email').value;
            const foto = document.getElementById('foto').files[0];

            if (foto) {
                const reader = new FileReader();
                reader.onloadend = function() {
                    aluno.foto = reader.result;
                    localStorage.setItem('alunos', JSON.stringify(alunos));
                    alert('Cadastro atualizado com sucesso!');
                    window.location.href = 'detalhesaluno.html';
                };
                reader.readAsDataURL(foto);
            } else {
                localStorage.setItem('alunos', JSON.stringify(alunos));
                alert('Cadastro atualizado com sucesso!');
                window.location.href = 'detalhesaluno.html';
            }
        }
    }
}

function deletarAluno(index) {
    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    alunos.splice(index, 1);
    localStorage.setItem('alunos', JSON.stringify(alunos));
    carregarAlunos();
}
// Função para sair do sistema
function sair() {
    window.location.href = 'login.html'; // Página de login ou saída do sistema
}

// Função para cadastrar um novo aluno
function cadastrarNovoAluno() {
    window.location.href = 'cadastroaluno.html'; // Redireciona para a página de cadastro de novo aluno
}