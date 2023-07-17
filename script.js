var secretNumber;
var attempts;

function startGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  document.getElementById('message').textContent = '';
  document.getElementById('guessInput').value = '';
  document.getElementById('restartButton').style.display = 'none';
}

function appendNumber(number) {
  var guessInput = document.getElementById('guessInput');
  guessInput.value += number;
}

function removeLastNumber() {
  var guessInput = document.getElementById('guessInput');
  var currentInput = guessInput.value;
  guessInput.value = currentInput.slice(0, -1);
}

function clearInput() {
  document.getElementById('guessInput').value = '';
}

function checkGuess() {
  var guessInput = document.getElementById('guessInput');
  var guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < 1 || guess > 100) {
    showMessage('Digite um número válido entre 1 e 100.');
    return;
  }

  attempts++;

  if (guess === secretNumber) {
    showMessage('Parabéns! Você acertou em ' + attempts + ' tentativas.');
    disableGame();
    document.getElementById('restartButton').style.display = 'block';
    Swal.fire({
      title: 'Parabéns, Você conseguiu adivinhar!',
      text: 'Você acertou em ' + attempts + ' tentativas.',
      icon: 'success',
      confirmButtonText: 'Jogue novamente'
    });
    
  } else if (guess < secretNumber) {
    showMessage('Tente um número maior.');
  } else {
    showMessage('Tente um número menor.');
  }

  guessInput.value = '';
}

function showMessage(text) {
  document.getElementById('message').textContent = text;
}

function disableGame() {
  document.getElementById('guessInput').disabled = true;
  document.getElementById('checkButton').disabled = true;
}

function enableGame() {
  document.getElementById('guessInput').disabled = false;
  document.getElementById('checkButton').disabled = false;
  startGame();
}

startGame();

var numericButtons = document.getElementsByClassName('numericButton');
for (var i = 0; i < numericButtons.length; i++) {
  numericButtons[i].addEventListener('click', function(event) {
    var number = event.target.dataset.value;
    appendNumber(number);
  });
}

document.getElementById('checkButton').addEventListener('click', checkGuess);
document.addEventListener('keydown', function(event) {
  var key = event.key;
  if (key >= '0' && key <= '9') {
    appendNumber(key);
    event.preventDefault();
  } else if (key === 'Backspace') {
    removeLastNumber();
    event.preventDefault();
  } else if (key === 'Enter') {
    checkGuess();
    event.preventDefault();
  }
});

document.getElementById('restartButton').addEventListener('click', enableGame);
document.getElementById('clearButton').addEventListener('click', clearInput);
