// declaração de variáveis
const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;

// perguntas
const questions = [
  {
    question: "A Polineuropatia Amiloidótica Familiar ATTR-PN, pode ser difícil de ser reconhecida devido a sua apresentação clínica variável e sintomas não específicos. Como resultado, o diagnóstico pode ocorrer de maneira equivocada. São sinais e sintomas sensórios -motores e autonômicos da Polineuropatia Amiloidótica Familar (ATTR-PN):"+"\n\Disfunção erétil, hipotensão ortostática, perda de peso involuntária, episódios alternados entre constipação e diarreia, Neuropatias de fibras finas simétricas, desconforto bilateral nos membros inferiores, dormência, diminuição da sensação de temperatura, declínio da função renal, retardo na condução intraventricular e bloqueio atrioventricular e hipertrofia ventricular inexplicável.  essa afirmação é:",
    answers: [
      {
        answer: 'Verdadeira',
        correct: true,
      },
      {
        answer: 'Falsa',
        correct: false,
      },
    ],
  },
  {
    question: 'Na suspeita do diagnóstico da Polineuropatia Amiloidótica Familiar (ATTR-PN), a Pfizer possui um programa de suporte ao Diagnóstico, gratuito que oferece: Teste Genético, Coleta Domiciliar, Eletroforese de proteínas com imunofixação sérica e urinária, Pesquisa de cadeias leves livres Kappa e lambda (Freelite®) Exames para auxiliar na identificação do estágio da doença como: Eletroneuromiografia; Cintilografia óssea com pirofosfato, Ressonância Magnética cardíaca. Qual nome desse Programa de Suporte ao Paciente? ',
    answers: [
      {
        answer: 'Mais você.',
        correct: false,
      },
      {
        answer: 'Cuidar +. ',
        correct: true,
      },
      {
        answer: 'Cuidar Sempre.',
        correct: false,
      },
    ],
  },
  {
    question: 'A Pfizer possui um programa que visa auxiliar na adesão ao tratamento, com o objetivo de apoiar e orientar pacientes com a possibilidade de: Exames de acompanhamento, Psicólogos, Nutricionista e Bolsa térmica. O Programa se chama:',
    answers: [
      {
        answer: 'Muito Bem Vindo. ',
        correct: true,
      },
      {
        answer: 'Sempre vindo.',
        correct: false,
      },
      {
        answer: 'Seja bem vindo.',
        correct: false,
      },
    ],
  },
];

// substituição do quizz para a primeira pergunta
function init() {
  // criar primeira pergunta
  createQuestion(0);
}

// cria uma pergunta
function createQuestion(i) {
  // limpar questão anterior
  const oldButtons = answerBox.querySelectorAll('button');
  oldButtons.forEach((btn) => {
    btn.remove();
  });

  // alterar texto da pergunta
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // inserir alternativas
  questions[i].answers.forEach((answer, i) => {
    // cria template botão quizz
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute('correct-answer', answer['correct']);

    // remover hide e template class
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // inserir alternativa na tela
    answerBox.appendChild(answerTemplate);

    // inserir evento click no botão
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this);
    });
  });

  // incrementar o número da questão
  actualQuestion++;
}

// verificar resposta do usuário
function checkAnswer(btn) {
  // seleciona todos os botões
  const buttons = answerBox.querySelectorAll('button');

  // verifica se resposta correta e add classe
  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') == 'true') {
      button.classList.add('correct-answer');

      // checa se usuário acertou a pergunta
      if (btn === button) {
        // incremento dos pontos
        points++;
      }
    } else {
      button.classList.add('wrong-answer');
    }
  });

  // exibir próxima pergunta
  nextQuestion();
}

// exibe a pŕoxima pergunta no quizz
function nextQuestion() {
  // timer para usuário ver as respostas
  setTimeout(function () {
    // verifica se ainda há perguntas
    if (actualQuestion >= questions.length) {
      // apresenta mensagem de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1200);
}

// exibe a tela final
function showSuccessMessage() {
  hideOrShowQuizz();

  // trocar dados tela de sucesso
  // calcular score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score.toString();

  //alterar o número de perguntas corretas
  const correctAnswers = document.querySelector('#correct-answers');
  correctAnswers.textContent = points;

  // alterar o total de perguntas
  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = questions.length;
}

// mostra ou esonde o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

// reiniciar quizz
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function () {
  window.location.href = "./index.html";
});

// inicialização do quizz
init();
