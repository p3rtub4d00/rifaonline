document.addEventListener('DOMContentLoaded', function() {
    // Recuperar dados da compra do localStorage
    const compra = JSON.parse(localStorage.getItem('ultimaCompra'));
    
    if (compra) {
        // Preencher dados do comprovante
        document.getElementById('numero-pedido').textContent = compra.numeroPedido;
        document.getElementById('data-compra').textContent = compra.dataCompra;
        document.getElementById('premio-nome').textContent = compra.premioNome;
        document.getElementById('quantidade-compra').textContent = `${compra.quantidade} número${compra.quantidade > 1 ? 's' : ''}`;
        document.getElementById('valor-total').textContent = `R$ ${compra.valorTotal.toFixed(2)}`;
        document.getElementById('nome-comprador').textContent = compra.nome;
        document.getElementById('email-comprador').textContent = compra.email;
        document.getElementById('whatsapp-comprador').textContent = compra.whatsapp;
        document.getElementById('data-sorteio').textContent = compra.dataSorteio;
        
        // Preencher números da sorte
        const numerosContainer = document.getElementById('numeros-sorte');
        numerosContainer.innerHTML = '';
        
        compra.numeros.forEach(numero => {
            const numeroElement = document.createElement('div');
            numeroElement.className = 'numero';
            numeroElement.textContent = numero;
            numerosContainer.appendChild(numeroElement);
        });
        
        // Botão WhatsApp
        document.getElementById('btnWhatsApp').addEventListener('click', function() {
            const texto = `Olá! Acabei de adquirir ${compra.quantidade} número(s) para a rifa "${compra.premioNome}". Meus números são: ${compra.numeros.join(', ')}.`;
            const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
            window.open(url, '_blank');
        });
    } else {
        // Se não houver dados de compra, redirecionar para a página inicial
        alert('Nenhum comprovante encontrado. Redirecionando para a página inicial.');
        window.location.href = 'index.html';
    }
});
