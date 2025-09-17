document.addEventListener('DOMContentLoaded', function() {
    const faqPerguntas = document.querySelectorAll('.faq-pergunta');
    
    faqPerguntas.forEach(pergunta => {
        pergunta.addEventListener('click', function() {
            this.classList.toggle('active');
            const resposta = this.nextElementSibling;
            resposta.classList.toggle('active');
        });
    });
});
