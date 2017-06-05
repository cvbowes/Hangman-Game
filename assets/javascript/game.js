var wordList = ['Celebrimbor', 'Nazgul', 'Sauron', 'Isildur', 'hobbit', 'Shire', 'Rivendell', 
'Smeagol', 'Gollum', 'Anduin', 'Bilbo', 'Gandalf', 'Frodo', 'Aragorn', 'Boromir', 'Gondor', 
'Elrond', 'Mordor', 'Rohan', 'Anduril', 'Gimli', 'Legolas', 'Moria', 'Balrog', 'Lothlorien', 
'Galadriel', 'Saruman', 'Hornburg', 'elf', 'ent', 'dwarf', 'Arwen', 'Evenstar', 'Shelob', 
'Samwise', 'Theoden', 'Caradhras', 'Numenor', 'Haldir', 'Celeborn', 'Treebeard', 'Eomer', 
'Eowyn', 'Fangorn', 'Mirkwood', 'Osgiliath', 'Edoras', 'Isengard', 'Hobbiton', 'Weathertop',
'orc', 'mithril', 'Glamdring', 'Galadhrim', 'Rohirrim', 'wraith', 'Angmar', 'Bombadil',
'Fimbrethil', 'Entwife', 'Valinor'];

var currentWord = [];			//selected randomly from wordList
var displayWord = [];			//what appears on screen (includes blanks)
var lettersGuessed = [];		//array that holds letters guessed by user
var guessesRemaining = 8;		//counter; allowed number of incorrect guesses
var lettersCorrect = 0;			//counter; keeps track of how many spaces have been successfully filled in
var wins = 0;					//counter; keeps track of wins
var losses = 0;

initialGame();

document.onkeyup = function(event) {
	var guess = event.key;
	
	if (/^[a-zA-Z]$/.test(guess)) {

		if (!arrayContains(lettersGuessed, guess.toLowerCase())) {	
			lettersGuessed.push(guess.toUpperCase());
			updateGuesses();

			if (arrayContains(currentWord, guess.toLowerCase())) {
				replace(guess);

			} else if (!arrayContains(currentWord, guess.toLowerCase())) {
				guessesRemaining--;
				document.getElementById("guesses-remaining").innerHTML = guessesRemaining;

			}
		}

	} else {
		alert("Please enter a letter");
	}

	guess = "";
	win();
	lose();
}


function randomWord() {
	word = wordList[Math.floor(Math.random() * wordList.length)];
	return wordToArray(word);
}

function wordToArray(word) {
	arr = [];
	for (i = 0; i < word.length; i++) {
		arr[i] = word[i];
	}
	return arr;

}

function blanks() {
	for (i = 0; i < currentWord.length; i++) {
		displayWord[i] = "_"	

	}
	updateDisplay();

}

function checkWord(letter) {
	for (i = 0; i < currentWord.length; i++) {
		if (letter.toLowerCase() === currentWord[i]) {
			lettersCorrect++;

		}
	}
}

function arrayContains(arr, entry) {
	var contains = false;
	for (i = 0; i < arr.length; i++) {
		if (arr[i].toLowerCase() === entry.toLowerCase()) {
			contains = true;
			break;
		}
	}
	return contains;
}

function replace(letter) {
	for (i = 0; i < currentWord.length; i++) {
		if (currentWord[i].toLowerCase() === letter.toLowerCase()) {
			displayWord[i] = currentWord[i];
			lettersCorrect++;
		}
	}
	updateDisplay();

}

function updateDisplay() {
	document.getElementById("word").innerHTML = "";
	for (i = 0; i < displayWord.length; i++){
		document.getElementById("word").innerHTML += displayWord[i];
	}
}

function updateGuesses() {
	document.getElementById("letters-guessed").innerHTML = "";
	for (i = 0; i < lettersGuessed.length; i++) {
		document.getElementById("letters-guessed").innerHTML += lettersGuessed[i];
	}
}

function win() {
	if (lettersCorrect === currentWord.length) {
		alert("Congratulations, savior of Middle Earth!!");
		wins++;
		document.getElementById("wins").innerHTML = wins;
		resetGame();
	}
}

function lose() {
	if (guessesRemaining === 0) {
		alert("Your quest has failed. ):");
		losses++;
		document.getElementById("losses").innerHTML = losses;
		resetGame();
	}
 }

 function resetGame() {
 	currentWord = randomWord();
 	displayWord = [];
 	lettersGuessed = [];
 	guessesRemaining = 8;
 	document.getElementById("guesses-remaining").innerHTML = guessesRemaining;
 	lettersCorrect = 0;
 	updateGuesses();
 	blanks();
 }

 function initialGame() {
 	resetGame();
 	document.getElementById("wins").innerHTML = wins;
 	document.getElementById("losses").innerHTML = losses;

 }