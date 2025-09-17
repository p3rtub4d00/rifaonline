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
    const resumoNomePremio = document.getElementById('resumo-nome-premio');
    const miniaturas = document.querySelectorAll('.miniatura');
    const imagemPrincipal = document.getElementById('imagemPrincipal');
    const qrcodePix = document.getElementById('qrcodePix');
    const valorPix = document.getElementById('valorPix');
    const btnConfirmarPagamento = document.getElementById('btnConfirmarPagamento');
    const btnCancelar = document.getElementById('btnCancelar');
    const btnCopiarCodigo = document.getElementById('copiarCodigo');
    
    // Variáveis globais
    let premioAtual = null;
    let precoPorNumero = 0;
    let quantidadeMaxima = 0;
    
    // Carregar dados do prêmio
    function carregarPremio() {
        const urlParams = new URLSearchParams(window.location.search);
        const premioId = parseInt(urlParams.get('id'));
        
        // Em produção, isso viria de uma API
        // Aqui estamos usando dados mockados
        const premios = [
            {
                id: 1,
                nome: "Smartphone Premium",
                descricao: "Último modelo com 256GB de armazenamento e câmera de 108MP. Inclui capa protetora e película de vidro temperado.",
                valor: 5.00,
                imagem: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80",
                imagens: [
                    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80",
                    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
                    "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&q=80"
                ],
                numerosVendidos: 152,
                numerosTotais: 300,
                dataSorteio: "15/12/2023 às 20h",
                infoEntrega: "Frete grátis para todo Brasil"
            },
            {
                id: 2,
                nome: "Carro Esportivo 0km",
                descricao: "Zero km, completo, com garantia de fábrica e documentação em dia. Inclui seguro por 1 ano.",
                valor: 10.00,
                imagem: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                imagens: [
                    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                    "https://images.unsplash.com/photo-1549399542-7e821f6a7e0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                    "https://images.unsplash.com/photo-1544636333-69b3d0d24872?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                ],
                numerosVendidos: 89,
                numerosTotais: 500,
                dataSorteio: "20/01/2024 às 19h",
                infoEntrega: "Entrega em concessionária autorizada"
            },
            {
                id: 3,
                nome: "Viagem All Inclusive",
                descricao: "7 dias para 2 pessoas em resort all inclusive nas Maldivas. Inclui passagens aéreas e traslados.",
                valor: 7.50,
                imagem: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                imagens: [
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                    "https://images.unsplash.com/photo-1561503972-83b7c429a732?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                    "https://images.unsplash.com/photo-1580548254596-1efd3777f5dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                ],
                numerosVendidos: 75,
                numerosTotais: 200,
                dataSorteio: "10/02/2024 às 16h",
                infoEntrega: "Agendamento através de nossa agência parceira"
            }
        ];
        
        premioAtual = premios.find(p => p.id === premioId);
        
        if (!premioAtual) {
            alert('Prêmio não encontrado!');
            window.location.href = 'premios.html';
            return;
        }
        
        // Preencher dados do prêmio na página
        document.getElementById('nome-premio-breadcrumb').textContent = premioAtual.nome;
        document.getElementById('nomePremio').textContent = premioAtual.nome;
        document.getElementById('descricaoPremio').textContent = premioAtual.descricao;
        document.getElementById('precoPremio').textContent = `R$ ${premioAtual.valor.toFixed(2)}`;
        document.getElementById('dataSorteio').textContent = premioAtual.dataSorteio;
        document.getElementById('infoEntrega').textContent = premioAtual.infoEntrega;
        
        // Configurar imagens
        imagemPrincipal.src = premioAtual.imagem;
        imagemPrincipal.alt = premioAtual.nome;
        
        const miniaturasContainer = document.getElementById('miniaturas');
        miniaturasContainer.innerHTML = '';
        
        premioAtual.imagens.forEach((imagem, index) => {
            const miniatura = document.createElement('img');
            miniatura.src = imagem;
            miniatura.alt = `${premioAtual.nome} - Imagem ${index + 1}`;
            miniatura.className = 'miniatura' + (index === 0 ? ' ativa' : '');
            miniatura.addEventListener('click', () => {
                imagemPrincipal.src = imagem;
                document.querySelectorAll('.miniatura').forEach(m => m.classList.remove('ativa'));
                miniatura.classList.add('ativa');
            });
            miniaturasContainer.appendChild(miniatura);
        });
        
        // Atualizar status e números vendidos
        const numerosDisponiveis = premioAtual.numerosTotais - premioAtual.numerosVendidos;
        document.getElementById('numerosVendidos').textContent = `${premioAtual.numerosVendidos}/${premioAtual.numerosTotais} números vendidos`;
        document.getElementById('numerosDisponiveis').textContent = `${numerosDisponiveis} números disponíveis`;
        
        const statusElement = document.getElementById('statusPremio');
        if (numerosDisponiveis === 0) {
            statusElement.textContent = 'Esgotado';
            statusElement.className = 'status esgotado';
            quantidadeInput.disabled = true;
            document.querySelector('.btn-comprar').disabled = true;
        } else if (numerosDisponiveis < 10) {
            statusElement.textContent = 'Últimos números!';
            statusElement.className = 'status esgotando';
        } else {
            statusElement.textContent = 'Disponível';
            statusElement.className = 'status disponivel';
        }
        
        // Configurar valores para cálculos
        precoPorNumero = premioAtual.valor;
        quantidadeMaxima = numerosDisponiveis;
        quantidadeInput.max = quantidadeMaxima;
        
        // Atualizar total inicial
        atualizarTotal();
    }
    
    // Atualizar o total quando a quantidade mudar
    function atualizarTotal() {
        const quantidade = parseInt(quantidadeInput.value);
        const total = quantidade * precoPorNumero;
        totalSpan.textContent = `R$ ${total.toFixed(2)}`;
    }
    
    // Incrementar quantidade
    incrementarBtn.addEventListener('click', function() {
        let quantidade = parseInt(quantidadeInput.value);
        if (quantidade < quantidadeMaxima) {
            quantidadeInput.value = quantidade + 1;
            atualizarTotal();
        }
    });
    
    // Decrementar quantidade
    decrementarBtn.addEventListener('click', function() {
        let quantidade = parseInt(quantidadeInput.value);
        if (quantidade > 1) {
            quantidadeInput.value = quantidade - 1;
            atualizarTotal();
        }
    });
    
    // Atualizar total quando o input mudar manualmente
    quantidadeInput.addEventListener('input', function() {
        let quantidade = parseInt(this.value);
        
        if (isNaN(quantidade) || quantidade < 1) {
            this.value = 1;
        } else if (quantidade > quantidadeMaxima) {
            this.value = quantidadeMaxima;
        }
        
        atualizarTotal();
    });
    
    // Enviar formulário de compra
    formCompra.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const quantidade = parseInt(quantidadeInput.value);
        
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
        
        // Validar quantidade
        if (quantidade > quantidadeMaxima) {
            alert(`Desculpe, só há ${quantidadeMaxima} números disponíveis.`);
            return;
        }
        
        // Atualizar resumo na modal
        resumoNomePremio.textContent = premioAtual.nome;
        resumoQuantidade.textContent = `${quantidade} número${quantidade > 1 ? 's' : ''}`;
        
        const total = quantidade * precoPorNumero;
        resumoTotal.textContent = `R$ ${total.toFixed(2)}`;
        
        // Configurar QR Code e valor PIX
        valorPix.textContent = `Valor: R$ ${total.toFixed(2)}`;
        qrcodePix.src = gerarQRCodePIX(total, `Rifa ${premioAtual.nome}`);
        
        // Mostrar modal
        modal.style.display = 'block';
        
        // Salvar dados da compra temporariamente
        sessionStorage.setItem('dadosCompra', JSON.stringify({
            premioId: premioAtual.id,
            premioNome: premioAtual.nome,
            quantidade: quantidade,
            valorTotal: total,
            nome: nome,
            email: email,
            whatsapp: whatsapp,
            dataSorteio: premioAtual.dataSorteio
        }));
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
    btnCopiarCodigo.addEventListener('click', function() {
        // Simular cópia do código PIX
        navigator.clipboard.writeText('pixdasorte@rifas.com')
            .then(() => {
                btnCopiarCodigo.textContent = 'Copiado!';
                setTimeout(() => {
                    btnCopiarCodigo.textContent = 'Copiar código';
                }, 2000);
            })
            .catch(err => {
                console.error('Erro ao copiar texto: ', err);
                alert('Não foi possível copiar o código. Por favor, anote: pixdasorte@rifas.com');
            });
    });
    
    // Botão cancelar compra
    btnCancelar.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Botão confirmar pagamento
    btnConfirmarPagamento.addEventListener('click', function() {
        const dadosCompra = JSON.parse(sessionStorage.getItem('dadosCompra'));
        
        if (!dadosCompra) {
            alert('Erro ao processar compra. Por favor, tente novamente.');
            return;
        }
        
        // Simular processamento de pagamento
        btnConfirmarPagamento.disabled = true;
        btnConfirmarPagamento.textContent = 'Processando...';
        
        setTimeout(() => {
            // Simular confirmação de pagamento
            const numeroPedido = 'PS' + Date.now();
            
            // Gerar números da sorte
            const numerosSorte = [];
            for (let i = 0; i < dadosCompra.quantidade; i++) {
                numerosSorte.push(Math.floor(1000 + Math.random() * 9000));
            }
            
            // Salvar compra no histórico
            const compras = JSON.parse(localStorage.getItem('compras')) || [];
            compras.push({
                id: Date.now(),
                numeroPedido: numeroPedido,
                data: new Date().toLocaleString('pt-BR'),
                premio: dadosCompra.premioNome,
                quantidade: dadosCompra.quantidade,
                valorTotal: dadosCompra.valorTotal,
                numeros: numerosSorte,
                status: 'confirmada'
            });
            
            localStorage.setItem('compras', JSON.stringify(compras));
            
            // Atualizar números vendidos no prêmio
            const premios = JSON.parse(localStorage.getItem('premios')) || [];
            const premioIndex = premios.findIndex(p => p.id === dadosCompra.premioId);
            
            if (premioIndex !== -1) {
                premios[premioIndex].numerosVendidos += dadosCompra.quantidade;
                localStorage.setItem('premios', JSON.stringify(premios));
            }
            
            // Redirecionar para página de comprovante
            sessionStorage.setItem('ultimaCompra', JSON.stringify({
                numeroPedido: numeroPedido,
                dataCompra: new Date().toLocaleString('pt-BR'),
                premioNome: dadosCompra.premioNome,
                quantidade: dadosCompra.quantidade,
                valorTotal: dadosCompra.valorTotal,
                nome: dadosCompra.nome,
                email: dadosCompra.email,
                whatsapp: dadosCompra.whatsapp,
                numeros: numerosSorte,
                dataSorteio: dadosCompra.dataSorteio
            }));
            
            window.location.href = 'comprovante.html';
        }, 2000);
    });
    
    // Função para simular a geração de QR Code PIX
    function gerarQRCodePIX(valor, descricao) {
        // Em uma implementação real, isso seria gerado por uma API
        // Aqui estamos apenas simulando com um data URL
        return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX///8AAAD8/Pz4+Pj09PTs7Ozq6urj4+Pw8PDm5ubZ2dnQ0NDGxsbCwsK9vb24uLi0tLSvr6+pqamnp6elpaWfn5+cnJyYmJiUlJSSkpKPj4+Li4uJiYmFhYWBgYF9fX16enp4eHh1dXV0dHRxcXFvb29tbW1ra2tpaWlnZ2dlZWVjY2NhYWFHGLFPAAAIFElEQVR4nO2d63KqOhSFAUEFvGvV1rbv/5aPJm1tLQI5a+0DmfWnz8yZ6VfIysrOzk5C0zAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw极速赛车开奖结果记录历史`;
    }
    
    // Inicializar página
    carregarPremio();
});
