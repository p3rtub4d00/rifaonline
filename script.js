// Dados dos prêmios (em produção, isso viria de um backend)
let premios = [];

// Carregar prêmios do localStorage ou usar dados padrão
function carregarPremios() {
    const premiosSalvos = localStorage.getItem('premios');
    
    if (premiosSalvos) {
        premios = JSON.parse(premiosSalvos);
    } else {
        // Dados iniciais
        premios = [
            {
                id: 1,
                nome: "Smartphone Premium",
                descricao: "Último modelo com 256GB de armazenamento e câmera de 108MP",
                valor: 5.00,
                imagem: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80",
                numerosVendidos: 152,
                numerosTotais: 300,
                categoria: "eletronicos",
                status: "ativo",
                dataSorteio: "15/12/2023 às 20h"
            },
            {
                id: 2,
                nome: "Carro Esportivo 0km",
                descricao: "Zero km, completo, com garantia de fábrica e documentação em dia",
                valor: 10.00,
                imagem: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                numerosVendidos: 89,
                numerosTotais: 500,
                categoria: "veiculos",
                status: "ativo",
                dataSorteio: "20/01/2024 às 19h"
            },
            {
                id: 3,
                nome: "Viagem All Inclusive",
                descricao: "7 dias para 2 pessoas em resort all inclusive nas Maldivas",
                valor: 7.50,
                imagem: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                numerosVendidos: 75,
                numerosTotais: 200,
                categoria: "viagens",
                status: "ativo",
                dataSorteio: "10/02/2024 às 16h"
            },
            {
                id: 4,
                nome: "Notebook Gamer",
                descricao: "Notbook gamer com placa de vídeo dedicada e 16GB de RAM",
                valor: 8.00,
                imagem: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=868&q=80",
                numerosVendidos: 120,
                numerosTotais: 250,
                categoria: "eletronicos",
                status: "ativo",
                dataSorteio: "05/01/2024 às 15h"
            },
            {
                id: 5,
                nome: "Moto Esportiva",
                descricao: "Moto esportiva 600cc, ano 2023, zero km",
                valor: 12.00,
                imagem: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                numerosVendidos: 45,
                numerosTotais: 400,
                categoria: "veiculos",
                status: "ativo",
                dataSorteio: "25/01/2024 às 18h"
            },
            {
                id: 6,
                nome: "Pacote de Experiências",
                descricao: "Pacote com 5 experiências radicais para aventurar-se",
                valor: 6.50,
                imagem: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                numerosVendidos: 95,
                numerosTotais: 150,
                categoria: "outros",
                status: "ativo",
                dataSorteio: "12/01/2024 às 14h"
            }
        ];
        
        // Salvar no localStorage para uso futuro
        localStorage.setItem('premios', JSON.stringify(premios));
    }
}

// Carregar prêmios na página inicial
function carregarPremiosPaginaInicial() {
    const premiosGrid = document.querySelector('.premios-grid');
    
    if (premiosGrid) {
        // Filtrar apenas prêmios ativos
        const premiosAtivos = premios.filter(premio => premio.status === 'ativo');
        
        premiosAtivos.forEach(premio => {
            const porcentagem = (premio.numerosVendidos / premio.numerosTotais) * 100;
            const premioCard = document.createElement('div');
            premioCard.className = 'premio-card';
            premioCard.innerHTML = `
                <div class="premio-img">
                    <img src="${premio.imagem}" alt="${premio.nome}">
                    ${porcentagem === 100 ? '<div class="premio-esgotado">Esgotado</div>' : ''}
                </div>
                <div class="premio-info">
                    <h3>${premio.nome}</h3>
                    <p>${premio.descricao}</p>
                    <div class="premio-valor">R$ ${premio.valor.toFixed(2)} por número</div>
                    <div class="premio-status">${premio.numerosVendidos}/${premio.numerosTotais} números vendidos</div>
                    <div class="progresso">
                        <div class="progresso-bar" style="width: ${porcentagem}%"></div>
                    </div>
                    <a href="detalhes.html?id=${premio.id}" class="btn ${porcentagem === 100 ? 'btn-disabled' : ''}">${porcentagem === 100 ? 'Esgotado' : 'Participar Agora'}</a>
                </div>
            `;
            premiosGrid.appendChild(premioCard);
        });
    }
}

// Carregar prêmios na página de prêmios
function carregarPremiosPaginaPremios() {
    const premiosGrid = document.getElementById('premiosGrid');
    
    if (premiosGrid) {
        // Filtrar apenas prêmios ativos
        const premiosAtivos = premios.filter(premio => premio.status === 'ativo');
        
        premiosAtivos.forEach(premio => {
            const porcentagem = (premio.numerosVendidos / premio.numerosTotais) * 100;
            const premioCard = document.createElement('div');
            premioCard.className = 'premio-card';
            premioCard.innerHTML = `
                <div class="premio-img">
                    <img src="${premio.imagem}" alt="${premio.nome}">
                    ${porcentagem === 100 ? '<div class="premio-esgotado">Esgotado</div>' : ''}
                </div>
                <div class="premio-info">
                    <h3>${premio.nome}</h3>
                    <p>${premio.descricao}</p>
                    <div class="premio-valor">R$ ${premio.valor.toFixed(2)} por número</div>
                    <div class="premio-status">${premio.numerosVendidos}/${premio.numerosTotais} números vendidos</div>
                    <div class="progresso">
                        <div class="progresso-bar" style="width: ${porcentagem}%"></div>
                    </div>
                    <a href="detalhes.html?id=${premio.id}" class="btn ${porcentagem === 100 ? 'btn-disabled' : ''}">${porcentagem === 100 ? 'Esgotado' : 'Participar Agora'}</a>
                </div>
            `;
            premiosGrid.appendChild(premioCard);
        });
    }
}

// Adicionar smooth scrolling para links âncora
function configurarScrollSuave() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Função para formatar números de telefone
function formatarTelefone(telefone) {
    const nums = telefone.replace(/\D/g, '');
    if (nums.length === 11) {
        return nums.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return telefone;
}

// Função para gerar números aleatórios para a rifa
function gerarNumerosRifa(quantidade) {
    const numeros = [];
    for (let i = 0; i < quantidade; i++) {
        // Gera um número de 4 dígitos
        const numero = Math.floor(1000 + Math.random() * 9000);
        numeros.push(numero);
    }
    return numeros;
}

// Função para simular a geração de QR Code PIX
function gerarQRCodePIX(valor, idTransacao) {
    // Em uma implementação real, isso seria gerado por uma API
    // Aqui estamos apenas simulando com um data URL
    return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX///8AAAD8/Pz4+Pj09PTs7Ozq6urj4+Pw8PDm5ubZ2dnQ0NDGxsbCwsK9vb24uLi0tLSvr6+pqamnp6elpaWfn5+cnJyYmJiUlJSSkpKPj4+Li4uJiYmFhYWBgYF9fX16enp4eHh1dXV0dHRxcXFvb29tbW1ra2tpaWlnZ2dlZWVjY2NhYWFHGLFPAAAIFElEQVR4nO2d63KqOhSFAUEFvGvV1rbv/5aPJm1tLQI5a+0DmfWnz8yZ6VfIysrOzk5C0zAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw极速赛车开奖结果记录历史`;
}

// Verificar se há atualizações de prêmios
function verificarAtualizacoes() {
    const ultimaAtualizacao = localStorage.getItem('ultimaAtualizacaoPremios');
    if (ultimaAtualizacao) {
        const agora = new Date().getTime();
        const diferenca = agora - parseInt(ultimaAtualizacao);
        
        // Se houve atualização nos últimos 5 segundos, recarregar a página
        if (diferenca < 5000) {
            window.location.reload();
        }
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Carregar prêmios
    carregarPremios();
    
    // Carregar prêmios na página apropriada
    if (document.querySelector('.premios-grid')) {
        carregarPremiosPaginaInicial();
    }
    
    if (document.getElementById('premiosGrid')) {
        carregarPremiosPaginaPremios();
    }
    
    // Configurar scroll suave
    configurarScrollSuave();
    
    // Verificar atualizações a cada 2 segundos
    setInterval(verificarAtualizacoes, 2000);
    
    // Configurar filtros na página de prêmios
    const categoriaFilter = document.getElementById('categoria');
    const ordenarFilter = document.getElementById('ordenar');
    const buscarInput = document.getElementById('buscarPremio');
    const buscarBtn = document.querySelector('.btn-buscar');
    
    if (categoriaFilter && ordenarFilter && buscarInput && buscarBtn) {
        // Preencher opções de categoria
        const categorias = [...new Set(premios.map(p => p.categoria))];
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
            categoriaFilter.appendChild(option);
        });
        
        // Configurar event listeners para os filtros
        categoriaFilter.addEventListener('change', filtrarPremios);
        ordenarFilter.addEventListener('change', filtrarPremios);
        buscarInput.addEventListener('input', filtrarPremios);
        buscarBtn.addEventListener('click', filtrarPremios);
    }
    
    // Configurar formulário de contato
    const contatoForm = document.getElementById('contatoForm');
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulário
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value;
            
            if (!nome || !email || !assunto || !mensagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Simular envio do formulário
            alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
            contatoForm.reset();
        });
    }
});

// Função para filtrar prêmios
function filtrarPremios() {
    const categoria = document.getElementById('categoria').value;
    const termoBusca = document.getElementById('buscarPremio').value.toLowerCase();
    const ordenar = document.getElementById('ordenar').value;
    
    let premiosFiltrados = premios.filter(premio => premio.status === 'ativo');
    
    // Filtrar por categoria
    if (categoria !== 'todos') {
        premiosFiltrados = premiosFiltrados.filter(premio => premio.categoria === categoria);
    }
    
    // Filtrar por termo de busca
    if (termoBusca) {
        premiosFiltrados = premiosFiltrados.filter(premio => 
            premio.nome.toLowerCase().includes(termoBusca) || 
            premio.descricao.toLowerCase().includes(termoBusca)
        );
    }
    
    // Ordenar
    switch(ordenar) {
        case 'recentes':
            // Ordem padrão (por ID - mais recentes primeiro)
            premiosFiltrados.sort((a, b) => b.id - a.id);
            break;
        case 'popular':
            // Por popularidade (mais vendidos primeiro)
            premiosFiltrados.sort((a, b) => {
                const porcentagemA = (a.numerosVendidos / a.numerosTotais) * 100;
                const porcentagemB = (b.numerosVendidos / b.numerosTotais) * 100;
                return porcentagemB - porcentagemA;
            });
            break;
        case 'preco-menor':
            // Preço menor primeiro
            premiosFiltrados.sort((a, b) => a.valor - b.valor);
            break;
        case 'preco-maior':
            // Preço maior primeiro
            premiosFiltrados.sort((a, b) => b.valor - a.valor);
            break;
    }
    
    // Atualizar grid de prêmios
    const premiosGrid = document.getElementById('premiosGrid');
    if (premiosGrid) {
        premiosGrid.innerHTML = '';
        
        premiosFiltrados.forEach(premio => {
            const porcentagem = (premio.numerosVendidos / premio.numerosTotais) * 100;
            const premioCard = document.createElement('div');
            premioCard.className = 'premio-card';
            premioCard.innerHTML = `
                <div class="premio-img">
                    <img src="${premio.imagem}" alt="${premio.nome}">
                    ${porcentagem === 100 ? '<div class="premio-esgotado">Esgotado</div>' : ''}
                </div>
                <div class="premio-info">
                    <h3>${premio.nome}</h3>
                    <p>${premio.descricao}</p>
                    <div class="premio-valor">R$ ${premio.valor.toFixed(2)} por número</div>
                    <div class="premio-status">${premio.numerosVendidos}/${premio.numerosTotais} números vendidos</div>
                    <div class="progresso">
                        <div class="progresso-bar" style="width: ${porcentagem}%"></div>
                    </div>
                    <a href="detalhes.html?id=${premio.id}" class="btn ${porcentagem === 100 ? 'btn-disabled' : ''}">${porcentagem === 100 ? 'Esgotado' : 'Participar Agora'}</a>
                </div>
            `;
            premiosGrid.appendChild(premioCard);
        });
        
        // Se não houver prêmios, mostrar mensagem
        if (premiosFiltrados.length === 0) {
            premiosGrid.innerHTML = '<div class="nenhum-premio"><p>Nenhum prêmio encontrado com os filtros selecionados.</p></div>';
        }
    }
}

// Adicionar estilos para elementos dinâmicos
const estiloDinamico = document.createElement('style');
estiloDinamico.textContent = `
    .progresso {
        height: 8px;
        background-color: #f0f0f0;
        border-radius: 4px;
        margin-bottom: 15px;
        overflow: hidden;
    }
    
    .progresso-bar {
        height: 100%;
        background-color: var(--success);
        border-radius: 4px;
        transition: width 0.3s ease;
    }
    
    .premio-esgotado {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: var(--secondary);
        color: white;
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .premio-img {
        position: relative;
    }
    
    .btn-disabled {
        background-color: #95a5a6;
        cursor: not-allowed;
    }
    
    .btn-disabled:hover {
        background-color: #95a5a6;
        transform: none;
        box-shadow: none;
    }
    
    .nenhum-premio {
        grid-column: 1 / -1;
        text-align: center;
        padding: 2rem;
        color: #777;
    }
`;
document.head.appendChild(estiloDinamico);
