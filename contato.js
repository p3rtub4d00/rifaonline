document.addEventListener('DOMContentLoaded', function() {
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
