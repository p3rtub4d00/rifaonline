// JavaScript para a página de detalhes do prêmio
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const quantidadeInput = document.getElementById('quantidade');
    const incrementarBtn = document.getElementById('incrementar');
    const decrementarBtn = document.getElementById('decrementar');
    const totalSpan = document.getElementById('total');
    const formCompra = document.getElementById('formCompra');
    const modal = document.getElementById('modalPagamento');
    const closeModalBtn = document.querySelector('.close-modal');
    const resumoQuantidade = document.getElementById('resumo-quantidade');
    const resumoTotal = document.getElementById('resumo-total');
    const miniaturas = document.querySelectorAll('.miniatura');
    const imagemPrincipal = document.getElementById('imagemPrincipal');
    
    // Preço por número
    const precoPorNumero = 5.00;
    
    // Atualizar o total quando a quantidade mudar
    function atualizarTotal() {
        const quantidade = parseInt(quantidadeInput.value);
        const total = quantidade * precoPorNumero;
        totalSpan.textContent = `R$ ${total.toFixed(2)}`;
    }
    
    // Incrementar quantidade
    incrementarBtn.addEventListener('click', function() {
        let quantidade = parseInt(quantidadeInput.value);
        if (quantidade < parseInt(quantidadeInput.max)) {
            quantidadeInput.value = quantidade + 1;
            atualizarTotal();
        }
    });
    
    // Decrementar quantidade
    decrementarBtn.addEventListener('click', function() {
        let quantidade = parseInt(quantidadeInput.value);
        if (quantidade > parseInt(quantidadeInput.min)) {
            quantidadeInput.value = quantidade - 1;
            atualizarTotal();
        }
    });
    
    // Atualizar total quando o input mudar manualmente
    quantidadeInput.addEventListener('input', atualizarTotal);
    
    // Trocar imagem principal ao clicar nas miniaturas
    miniaturas.forEach(miniatura => {
        miniatura.addEventListener('click', function() {
            // Remover classe ativa de todas as miniaturas
            miniaturas.forEach(m => m.classList.remove('ativa'));
            
            // Adicionar classe ativa à miniatura clicada
            this.classList.add('ativa');
            
            // Trocar imagem principal
            imagemPrincipal.src = this.src;
        });
    });
    
    // Enviar formulário de compra
    formCompra.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const whatsapp = document.getElementById('whatsapp').value;
        
        if (!nome || !email || !whatsapp) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }
        
        // Validar WhatsApp (formato básico)
        const whatsappRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
        if (!whatsappRegex.test(whatsapp)) {
            alert('Por favor, insira um número de WhatsApp válido.');
            return;
        }
        
        // Atualizar resumo na modal
        const quantidade = parseInt(quantidadeInput.value);
        resumoQuantidade.textContent = `${quantidade} número${quantidade > 1 ? 's' : ''}`;
        resumoTotal.textContent = `R$ ${(quantidade * precoPorNumero).toFixed(2)}`;
        
        // Mostrar modal
        modal.style.display = 'block';
    });
    
    // Fechar modal
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Botão copiar código PIX
    const btnCopiar = document.querySelector('.btn-copiar');
    if (btnCopiar) {
        btnCopiar.addEventListener('click', function() {
            // Simular cópia do código PIX
            navigator.clipboard.writeText('pixdasorte@rifas.com')
                .then(() => {
                    btnCopiar.textContent = 'Copiado!';
                    setTimeout(() => {
                        btnCopiar.textContent = 'Copiar código';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Erro ao copiar texto: ', err);
                });
        });
    }
    
    // Inicializar total
    atualizarTotal();
});
