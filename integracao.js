// Script para integração entre as páginas
class PixDaSorte {
    constructor() {
        this.premios = JSON.parse(localStorage.getItem('premios')) || [];
        this.vendas = JSON.parse(localStorage.getItem('vendas')) || [];
        this.ganhadores = JSON.parse(localStorage.getItem('ganhadores')) || [];
    }

    // Gerenciamento de Prêmios
    adicionarPremio(premio) {
        const novoId = this.premios.length > 0 ? Math.max(...this.premios.map(p => p.id)) + 1 : 1;
        premio.id = novoId;
        premio.numerosVendidos = premio.numerosVendidos || 0;
        premio.status = premio.status || 'ativo';
        
        this.premios.push(premio);
        this.salvarDados();
        return novoId;
    }

    atualizarPremio(id, dados) {
        const index = this.premios.findIndex(p => p.id === id);
        if (index !== -1) {
            this.premios[index] = { ...this.premios[index], ...dados };
            this.salvarDados();
            return true;
        }
        return false;
    }

    // Gerenciamento de Vendas
    registrarVenda(venda) {
        venda.id = Date.now();
        venda.data = new Date().toISOString();
        venda.status = 'confirmada';
        
        // Atualizar números vendidos no prêmio
        const premioIndex = this.premios.findIndex(p => p.id === venda.premioId);
        if (premioIndex !== -1) {
            this.premios[premioIndex].numerosVendidos += venda.quantidade;
        }
        
        this.vendas.push(venda);
        this.salvarDados();
        return venda.id;
    }

    // Gerenciamento de Ganhadores
    registrarGanhador(ganhador) {
        ganhador.id = Date.now();
        ganhador.dataRegistro = new Date().toISOString();
        
        this.ganhadores.push(ganhador);
        this.salvarDados();
        return ganhador.id;
    }

    // Buscar ganhador por número
    buscarGanhadorPorNumero(numero, premioId) {
        // Encontrar a venda com este número
        for (const venda of this.vendas) {
            if (venda.premioId === premioId && venda.numeros.includes(parseInt(numero))) {
                return {
                    venda: venda,
                    premio: this.premios.find(p => p.id === premioId)
                };
            }
        }
        return null;
    }

    // Salvar dados no localStorage
    salvarDados() {
        localStorage.setItem('premios', JSON.stringify(this.premios));
        localStorage.setItem('vendas', JSON.stringify(this.vendas));
        localStorage.setItem('ganhadores', JSON.stringify(this.ganhadores));
        localStorage.setItem('ultimaAtualizacao', Date.now().toString());
    }

    // Carregar dados
    carregarDados() {
        this.premios = JSON.parse(localStorage.getItem('premios')) || [];
        this.vendas = JSON.parse(localStorage.getItem('vendas')) || [];
        this.ganhadores = JSON.parse(localStorage.getItem('ganhadores')) || [];
    }
}

// Inicializar sistema
const sistema = new PixDaSorte();

// Funções globais para uso nas páginas
window.obterPremio = function(id) {
    return sistema.premios.find(p => p.id === id);
};

window.obterPremios = function() {
    return sistema.premios;
};

window.registrarCompra = function(dadosCompra) {
    // Gerar números aleatórios
    const numeros = [];
    for (let i = 0; i < dadosCompra.quantidade; i++) {
        numeros.push(Math.floor(1000 + Math.random() * 9000));
    }
    
    const venda = {
        premioId: dadosCompra.premioId,
        quantidade: dadosCompra.quantidade,
        valorTotal: dadosCompra.valorTotal,
        nome: dadosCompra.nome,
        email: dadosCompra.email,
        whatsapp: dadosCompra.whatsapp,
        numeros: numeros,
        dataCompra: new Date().toLocaleString('pt-BR')
    };
    
    const vendaId = sistema.registrarVenda(venda);
    
    // Salvar dados para o comprovante
    const premio = sistema.premios.find(p => p.id === dadosCompra.premioId);
    const comprovante = {
        numeroPedido: 'PS' + vendaId,
        dataCompra: new Date().toLocaleString('pt-BR'),
        premioNome: premio.nome,
        quantidade: dadosCompra.quantidade,
        valorTotal: dadosCompra.valorTotal,
        nome: dadosCompra.nome,
        email: dadosCompra.email,
        whatsapp: dadosCompra.whatsapp,
        numeros: numeros,
        dataSorteio: premio.dataSorteio
    };
    
    localStorage.setItem('ultimaCompra', JSON.stringify(comprovante));
    
    return vendaId;
};
