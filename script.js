// Dados dos prêmios (em produção, isso viria de um backend)
const premios = [
    {
        id: 1,
        nome: "Smartphone Premium",
        descricao: "Último modelo com 256GB de armazenamento e câmera de 108MP",
        valor: 5.00,
        imagem: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80"
    },
    {
        id: 2,
        nome: "Carro Esportivo 0km",
        descricao: "Zero km, completo, com garantia de fábrica e documentação em dia",
        valor: 10.00,
        imagem: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
        id: 3,
        nome: "Viagem All Inclusive",
        descricao: "7 dias para 2 pessoas em resort all inclusive nas Maldivas",
        valor: 7.50,
        imagem: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    }
];

// Carregar prêmios na página inicial
document.addEventListener('DOMContentLoaded', function() {
    const premiosGrid = document.querySelector('.premios-grid');
    
    if (premiosGrid) {
        premios.forEach(premio => {
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
                    <a href="detalhes.html?id=${premio.id}" class="btn">Participar Agora</a>
                </div>
            `;
            premiosGrid.appendChild(premioCard);
        });
    }
    
    // Adicionar smooth scrolling para links âncora
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
