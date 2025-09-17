document.addEventListener('DOMContentLoaded', function() {
    const premiosGrid = document.getElementById('premiosGrid');
    const categoriaFilter = document.getElementById('categoria');
    const ordenarFilter = document.getElementById('ordenar');
    const buscarInput = document.getElementById('buscarPremio');
    const buscarBtn = document.querySelector('.btn-buscar');
    
    // Dados de exemplo (em produção viriam de uma API)
    const premios = [
        {
            id: 1,
            nome: "Smartphone Premium",
            descricao: "Último modelo com 256GB de armazenamento e câmera de 108MP",
            valor: 5.00,
            imagem: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80",
            numerosVendidos: 152,
            numerosTotais: 300,
            categoria: "eletronicos"
        },
        {
            id: 2,
            nome: "Carro Esportivo 0km",
            descricao: "Zero km, completo, com garantia de fábrica e documentação em dia",
            valor: 10.00,
            imagem: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            numerosVendidos: 89,
            numerosTotais: 500,
            categoria: "veiculos"
        },
        {
            id: 3,
            nome: "Viagem All Inclusive",
            descricao: "7 dias para 2 pessoas em resort all inclusive nas Maldivas",
            valor: 7.50,
            imagem: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            numerosVendidos: 75,
            numerosTotais: 200,
            categoria: "viagens"
        },
        {
            id: 4,
            nome: "Notebook Gamer",
            descricao: "Notbook gamer com placa de vídeo dedicada e 16GB de RAM",
            valor: 8.00,
            imagem: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=868&q=80",
            numerosVendidos: 120,
            numerosTotais: 250,
            categoria: "eletronicos"
        },
        {
            id: 5,
            nome: "Moto Esportiva",
            descricao: "Moto esportiva 600cc, ano 2023, zero km",
            valor: 12.00,
            imagem: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            numerosVendidos: 45,
            numerosTotais: 400,
            categoria: "veiculos"
        },
        {
            id: 6,
            nome: "Pacote de Experiências",
            descricao: "Pacote com 5 experiências radicais para aventurar-se",
            valor: 6.50,
            imagem: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            numerosVendidos: 95,
            numerosTotais: 150,
            categoria: "outros"
        }
    ];

    // Carregar prêmios
    function carregarPremios(premiosParaExibir = premios) {
        premiosGrid.innerHTML = '';
        
        premiosParaExibir.forEach(premio => {
            const porcentagem = (premio.numerosVendidos / premio.numerosTotais) * 100;
            const premioCard = document.createElement('div');
            premioCard.className = 'premio-card';
            premioCard.innerHTML = `
                <div class="premio-img">
                    <img src="${premio.imagem}" alt="${premio.nome}">
                </div>
                <div class="premio-info">
                    <h3>${premio.nome}</h3>
                    <p>${premio.descricao}</p>
                    <div class="premio-valor">R$ ${premio.valor.toFixed(2)} por número</div>
                    <div class="premio-status">${premio.numerosVendidos}/${premio.numerosTotais} números vendidos</div>
                    <div class="progresso">
                        <div class="progresso-bar" style="width: ${porcentagem}%"></div>
                    </div>
                    <a href="detalhes.html?id=${premio.id}" class="btn">Participar Agora</a>
                </div>
            `;
            premiosGrid.appendChild(premioCard);
        });
    }

    // Filtrar prêmios
    function filtrarPremios() {
        const categoria = categoriaFilter.value;
        const termoBusca = buscarInput.value.toLowerCase();
        const ordenar = ordenarFilter.value;
        
        let premiosFiltrados = premios;
        
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
                // Ordem padrão (por ID)
                premiosFiltrados.sort((a, b) => b.id - a.id);
                break;
            case 'popular':
                // Por popularidade (mais vendidos primeiro)
                premiosFiltrados.sort((a, b) => b.numerosVendidos - a.numerosVendidos);
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
        
        carregarPremios(premiosFiltrados);
    }

    // Event listeners para os filtros
    categoriaFilter.addEventListener('change', filtrarPremios);
    ordenarFilter.addEventListener('change', filtrarPremios);
    buscarInput.addEventListener('input', filtrarPremios);
    buscarBtn.addEventListener('click', filtrarPremios);

    // Carregar prêmios inicialmente
    carregarPremios();
});
