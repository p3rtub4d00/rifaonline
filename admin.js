// JavaScript para a área administrativa
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const menuItems = document.querySelectorAll('.admin-menu-item');
    const adminSections = document.querySelectorAll('.admin-section');
    const addPremioBtn = document.getElementById('addPremioBtn');
    const addPremioModal = document.getElementById('addPremioModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const addPremioForm = document.getElementById('addPremioForm');
    const logoutBtn = document.getElementById('logout');

    // Navegação do menu
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover classe ativa de todos os itens
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Adicionar classe ativa ao item clicado
            this.classList.add('active');
            
            // Mostrar seção correspondente
            const target = this.getAttribute('data-target');
            adminSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === target) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Abrir modal de adicionar prêmio
    if (addPremioBtn) {
        addPremioBtn.addEventListener('click', function() {
            addPremioModal.style.display = 'block';
        });
    }

    // Fechar modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            addPremioModal.style.display = 'none';
        });
    }

    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target === addPremioModal) {
            addPremioModal.style.display = 'none';
        }
    });

    // Enviar formulário de adicionar prêmio
    if (addPremioForm) {
        addPremioForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulário
            const nome = document.getElementById('premioNome').value;
            const valor = document.getElementById('premioValor').value;
            const descricao = document.getElementById('premioDescricao').value;
            const totalNumeros = document.getElementById('premioTotalNumeros').value;
            const dataSorteio = document.getElementById('premioDataSorteio').value;
            
            if (!nome || !valor || !descricao || !totalNumeros || !dataSorteio) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Simular envio do formulário
            alert('Prêmio adicionado com sucesso! Em uma implementação real, isso enviaria os dados para o servidor.');
            
            // Fechar modal e limpar formulário
            addPremioModal.style.display = 'none';
            addPremioForm.reset();
        });
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Tem certeza que deseja sair?')) {
                // Redirecionar para a página inicial
                window.location.href = 'index.html';
            }
        });
    }

    // Inicializar gráficos (apenas se Chart.js estiver disponível)
    if (typeof Chart !== 'undefined') {
        initCharts();
    }

    // Função para inicializar gráficos
    function initCharts() {
        // Gráfico de vendas
        const vendasCtx = document.getElementById('vendasChart').getContext('2d');
        new Chart(vendasCtx, {
            type: 'line',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                datasets: [{
                    label: 'Vendas (R$)',
                    data: [350, 480, 620, 550, 780, 950, 720],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Gráfico de prêmios populares
        const premiosCtx = document.getElementById('premiosChart').getContext('2d');
        new Chart(premiosCtx, {
            type: 'bar',
            data: {
                labels: ['Smartphone', 'Carro', 'Viagem', 'Notebook', 'TV'],
                datasets: [{
                    label: 'Números Vendidos',
                    data: [152, 89, 75, 63, 48],
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.7)',
                        'rgba(46, 204, 113, 0.7)',
                        'rgba(155, 89, 182, 0.7)',
                        'rgba(241, 196, 15, 0.7)',
                        'rgba(230, 126, 34, 0.7)'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Filtros de prêmios
    const statusFilter = document.getElementById('statusFilter');
    const searchPremio = document.getElementById('searchPremio');

    if (statusFilter) {
        statusFilter.addEventListener('change', filtrarPremios);
    }

    if (searchPremio) {
        searchPremio.addEventListener('input', filtrarPremios);
    }

    function filtrarPremios() {
        // Em uma implementação real, isso faria uma requisição ao servidor
        // Aqui é apenas uma simulação
        console.log('Filtrando prêmios...');
    }
});
