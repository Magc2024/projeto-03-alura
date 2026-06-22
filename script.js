let currentSlide = 0;
const totalSlides = 5;

// Função responsável por atualizar as classes CSS e mostrar o slide correto
function updateSlides() {
    for (let i = 0; i < totalSlides; i++) {
        const slide = document.getElementById(`slide-${i}`);
        slide.classList.remove('active', 'exit');
        
        if (i === currentSlide) {
            slide.classList.add('active');
        } else if (i < currentSlide) {
            slide.classList.add('exit');
        }
    }

    // Gerencia o estado dos botões Anterior/Próximo e Contador
    document.getElementById('prevBtn').disabled = currentSlide === 0;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides - 1;
    document.getElementById('progressText').innerText = `SLIDE ${currentSlide + 1} DE ${totalSlides}`;
}

// Navegação manual (Setas Inferiores)
function navigate(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;
    updateSlides();
}

// Quando o usuário clica em uma resposta do Quiz
function selectOption(slideIndex, optionText) {
    // Remove a seleção visual anterior dentro do mesmo slide
    const currentSlideEl = document.getElementById(`slide-${slideIndex}`);
    const buttons = currentSlideEl.querySelectorAll('.btn-option');
    buttons.forEach(btn => btn.classList.remove('selected-branch'));

    // Destaca visualmente a opção escolhida pelo usuário
    event.target.classList.add('selected-branch');

    // Aguarda 350ms para o usuário ver o efeito do clique e passa o slide automaticamente
    setTimeout(() => {
        if (currentSlide < totalSlides - 1) {
            navigate(1);
        }
    }, 350);
}

// Reseta o jogo de escolhas ao chegar no slide final
function restartQuiz() {
    currentSlide = 0;
    const allButtons = document.querySelectorAll('.btn-option');
    allButtons.forEach(btn => btn.classList.remove('selected-branch'));
    updateSlides();
}