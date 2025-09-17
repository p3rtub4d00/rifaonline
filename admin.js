// JavaScript para a área administrativa
document.addEventListener('DOMContentLoaded', function() {
    // ... (código anterior mantido)

    // Função para carregar prêmios do localStorage
    function carregarPremios() {
        const premios = JSON.parse(localStorage.getItem('premios')) || [];
        const premiosList = document.querySelector('.premios-list');
        
        if (premiosList) {
            premiosList.innerHTML = '';
            
            premios.forEach(premio => {
                const porcentagem = (premio.numerosVendidos / premio.numerosTotais) * 100;
                const status = porcentagem === 100 ? 'Esgotado' : (porcentagem >= 80 ? 'Esgotando' : 'Ativo');
                
                const premioCard = document.createElement('div');
                premioCard.className = 'premio-admin-card';
                premioCard.innerHTML = `
                    <div class="premio-admin-image">
                        <img src="${premio.imagem}" alt="${premio.nome}">
                        <span class="status-badge ${status.toLowerCase()}">${status}</span>
                    </div>
                    <div class="premio-admin-info">
                        <h3>${premio.nome}</h3>
                        <p>${premio.numerosVendidos}/${premio.numerosTotais} números vendidos</p>
                        <div class="premio-meta">
                            <span><i class="fas fa-tag"></i> R$ ${premio.valor.toFixed(2)} por número</span>
                            <span><i class="fas fa-calendar"></i> Sorteio: ${premio.dataSorteio}</span>
                        </div>
                    </div>
                    <div class="premio-admin-actions">
                        <button class="btn-icon" title="Editar" onclick="editarPremio(${premio.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon" title="Visualizar" onclick="visualizarPremio(${premio.id})"><i class="fas fa-eye"></i></button>
                        <button class="btn-icon" title="Relatório" onclick="gerarRelatorio(${premio.id})"><i class="fas fa-chart-bar"></i></button>
                        <button class="btn-icon btn-danger" title="Excluir" onclick="excluirPremio(${premio.id})"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                premiosList.appendChild(premioCard);
            });
        }
    }

    // Função para adicionar prêmio
    window.adicionarPremio = function(formData) {
        const premios = JSON.parse(localStorage.getItem('premios')) || [];
        const novoId = premios.length > 0 ? Math.max(...premios.map(p => p.id)) + 1 : 1;
        
        const novoPremio = {
            id: novoId,
            nome: formData.nome,
            descricao: formData.descricao,
            valor: parseFloat(formData.valor),
            imagem: formData.imagem || 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            numerosVendidos: 0,
            numerosTotais: parseInt(formData.totalNumeros),
            dataSorteio: formData.dataSorteio,
            categoria: formData.categoria || 'outros',
            status: 'ativo'
        };
        
        premios.push(novoPremio);
        localStorage.setItem('premios', JSON.stringify(premios));
        
        // Atualizar também a lista de prêmios nas outras páginas
        localStorage.setItem('premiosAtualizados', Date.now().toString());
        
        alert('Prêmio adicionado com sucesso!');
        carregarPremios();
        return true;
    };

    // Funções auxiliares
    window.editarPremio = function(id) {
        alert(`Editar prêmio ${id} - Funcionalidade em desenvolvimento`);
    };

    window.visualizarPremio = function(id) {
        window.location.href = `detalhes.html?id=${id}`;
    };

    window.gerarRelatorio = function(id) {
        alert(`Gerar relatório do prêmio ${id} - Funcionalidade em desenvolvimento`);
    };

    window.excluirPremio = function(id) {
        if (confirm('Tem certeza que deseja excluir este prêmio?')) {
            const premios = JSON.parse(localStorage.getItem('premios')) || [];
            const premiosAtualizados = premios.filter(p => p.id !== id);
            localStorage.setItem('premios', JSON.stringify(premiosAtualizados));
            carregarPremios();
            alert('Prêmio excluído com sucesso!');
        }
    };

    // Carregar prêmios ao inicializar
    carregarPremios();
});
