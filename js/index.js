document.addEventListener('DOMContentLoaded', function() {
  const quizSteps = document.querySelectorAll('.quiz-step');
  const btnNext = document.querySelector('.quiz-btn-next');
  const btnBack = document.querySelector('.quiz-btn-back');
  const closeBtn = document.querySelector('.garder-quiz-close');
  const stepCounter = document.querySelector('.garder-quiz-step-counter span');
  const quizContainer = document.querySelector('.garder-quiz');
  const garderQuizThanks = document.querySelector('.garder-quiz-thanks');
  const garderQuizThanksClose = document.querySelector('.garder-quiz-thanks-close');


  garderQuizThanksClose.addEventListener('click',(e) => {
    garderQuizThanks.classList.remove('active')
  })

  let currentStep = 0;
  const totalSteps = quizSteps.length;
  const hasProjectQuestionIndex = 0;
  const contactFormIndex = totalSteps - 1;
  
  setContainerHeight();
  updateButtons();
  updateStepCounter();
  quizSteps[0].style.display = 'grid';
  quizSteps[0].classList.add('quiz-step--active');

  btnNext.addEventListener('click', goToNextStep);
  btnBack.addEventListener('click', goToPrevStep);
  closeBtn.addEventListener('click', closeQuiz);
  quizContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('garder-quiz')) {
      closeQuiz()
    }
  });
  
  const projectRadioInputs = quizSteps[hasProjectQuestionIndex].querySelectorAll('.radio-input');
  projectRadioInputs.forEach(input => {
    input.addEventListener('change', function() {
      if (this.nextElementSibling.textContent.trim() === 'Да') {
        goToStep(contactFormIndex);
      }
    });
  });

  function goToNextStep() {
    if (currentStep < totalSteps - 1) {
      goToStep(currentStep + 1);
    }
  }

  function goToPrevStep() {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  }

  function goToStep(index) {
    const direction = index > currentStep ? 'next' : 'prev';
    animateStepTransition(currentStep, index, direction);
    currentStep = index;
    updateButtons();
    updateStepCounter();
    setContainerHeight(); 
  }

  function animateStepTransition(fromIndex, toIndex, direction) {
    const fromStep = quizSteps[fromIndex];
    const toStep = quizSteps[toIndex];
    const duration = 300;
    
    toStep.style.display = 'grid';
    toStep.style.opacity = '0';
    toStep.style.transform = direction === 'next' ? 'translateX(20px)' : 'translateX(-20px)';
    toStep.style.transition = `all ${duration}ms ease`;
    
    setTimeout(() => {
      fromStep.style.opacity = '0';
      fromStep.style.transform = direction === 'next' ? 'translateX(-20px)' : 'translateX(20px)';
      toStep.style.opacity = '1';
      toStep.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
      fromStep.style.display = 'none';
      fromStep.classList.remove('quiz-step--active');
      toStep.classList.add('quiz-step--active');
      fromStep.style.opacity = '';
      fromStep.style.transform = '';
      toStep.style.transition = '';
    }, duration);
  }

  function setContainerHeight() {
    const heights = Array.from(quizSteps).map(step => {
      step.style.display = 'grid';
      step.style.opacity = '0';
      step.style.position = 'absolute';
      const height = step.offsetHeight;
      step.style.display = 'none';
      step.style.opacity = '';
      step.style.position = '';
      return height;
    });
    
    quizSteps[currentStep].style.display = 'grid';
    quizSteps[currentStep].style.opacity = '1';
    
    const maxHeight = Math.max(...heights);
    quizContainer.style.height = `${100}vh`;
    quizContainer.style.transition = 'height 300ms ease';
  }

  function updateButtons() {
    if (currentStep === 0) {
      btnBack.style.opacity = '0';
      btnBack.style.pointerEvents = 'none';
      btnBack.style.display = 'none';
    } else {
      btnBack.style.opacity = '1';
      btnBack.style.pointerEvents = 'auto';
      btnBack.style.display = 'flex';
    }
    btnNext.textContent = currentStep === totalSteps - 1 ? 'Отправить' : 'Далее';
  }

  function updateStepCounter() {
    stepCounter.textContent = currentStep + 1;
  }

  function closeQuiz() {
    quizContainer.classList.remove('garder-quiz--active')
  }

  window.addEventListener('resize', setContainerHeight);
});