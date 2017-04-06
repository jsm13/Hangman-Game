// Start configuration
    function setup()'Start' {
        letterBank = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        lives = 5;
        hardWords = ['counterculture', 'initialization', 'procrastinator', 'chromatography', 'administrative', 'characteristic', 'gerrymandering', 'abstractedness', 'reconstruction', 'acceptableness', 'cardiovascular', 'beautification', 'anthropometric', 'slaughterhouse', 'remarkableness', 'staphylococcus', 'acknowledgment', 'accommodations', 'accomplishable', 'rehabilitation', 'aggrandizement', 'reconciliation', 'thermodynamics', 'apprenticeship', 'anesthesiology', 'teleconference', 'foreordination', 'achondroplasia', 'forthrightness', 'extemporaneous', 'arrondissement','everything', 'aboveboard', 'basketball', 'weathering', 'characters', 'literature', 'perfection', 'volleyball', 'depression', 'homecoming', 'technology', 'maleficent', 'watermelon', 'appreciate', 'relaxation', 'convection', 'government', 'abominable', 'salmonella', 'strawberry', 'aberration', 'retirement', 'television', 'contraband', 'silhouette', 'friendship', 'loneliness', 'punishment', 'university', 'confidence', 'restaurant', 'abstinence', 'blancmange', 'blackboard', 'discipline', 'renovation', 'helicopter', 'generation', 'adaptation', 'skateboard', 'understand', 'leadership', 'revolution', 'wilderness','leonine', 'harmony', 'problem', 'awesome', 'penguin', 'youtube', 'blanket', 'yielder', 'dancing', 'crossed', 'imagine', 'student', 'mercury', 'initial', 'mystery', 'natural', 'kingdom', 'captain', 'healthy', 'library', 'message', 'magical', 'failure', 'forward', 'honesty', 'nuclear', 'fitness', 'sausage', 'popcorn', 'vanilla', 'jasmine', 'stomach', 'fortune', 'friends', 'chicken', 'strange', 'crooked', 'cheetah', 'fashion', 'uniform', 'probity', 'company', 'culture', 'general', 'liberty', 'garbage', 'goddess', 'alcohol', 'climate', 'lobster', 'capital', 'balance', 'example', 'musical'];
    };
    // Messages displayed over clicks
        messages = {
            win: 'You win!',
            lose: 'Game over!',
            guessed: ' already guessed, please try again...',
            validLetter: 'Please enter a letter from A-Z'
        };
        /* end config options */

        lettersGuessed = lettersMatched = '';
        numLettersMatched = 0;

        /* choose a word */
        currentWord = hardWords[Math.floor(Math.random() * hardWords.length)];

        /* make #man and #output blank, create vars for later access */
        output = document.getElementById("output");
        chances = document.getElementById("chance");
        guessInput = document.getElementById("letterBank");

        man.innerHTML = 'You have ' + chances + ' apples remaining';
        output.innerHTML = '';

        document.getElementById("letterBank").value = '';

        /* make sure guess button is enabled */
        guessButton = document.getElementById("guess");
        guessInput.style.display = 'inline';
        guessButton.style.display = 'inline';

        /* set up display of letters in current word */
        letters = document.getElementById("letters");
        letters.innerHTML = '<li class="current-word">Current word:</li>';

        var letter, i;
        for (i = 0; i < currentWord.length; i++) {
            letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
            letters.insertAdjacentHTML('beforeend', letter);
        }
    }

    function gameOver(win) {
        if (win) {
            output.innerHTML = messages.win;
            output.classList.add('win');
        } else {
            output.innerHTML = messages.lose;
            output.classList.add('error');
        }

        guessInput.style.display = guessButton.style.display = 'none';
        guessInput.value = '';
    }

    /* Start game - should ideally check for existing functions attached to window.onload */
    window.onload = setup();

    /* buttons */
    document.getElementById("restart").onclick = setup;

    /* reset letter to guess on click */
    guessInput.onclick = function () {
        this.value = '';
    };

    /* main guess function when user clicks #guess */
    document.getElementById('hangman').onsubmit = function (e) {
        if (e.preventDefault) e.preventDefault();
        output.innerHTML = '';
        output.classList.remove('error', 'warning');
        guess = guessInput.value;

        /* does guess have a value? if yes continue, if no, error */
        if (guess) {
            /* is guess a valid letter? if so carry on, else error */
            if (availableLetters.indexOf(guess) > -1) {
                /* has it been guessed (missed or matched) already? if so, abandon & add notice */
                if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                    output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
                    output.classList.add("warning");
                }
                /* does guess exist in current word? if so, add to letters already matched, if final letter added, game over with win message */
                else if (currentWord.indexOf(guess) > -1) {
                    var lettersToShow;
                    lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                    for (var i = 0; i < lettersToShow.length; i++) {
                        lettersToShow[i].classList.add("correct");
                    }

                    /* check to see if letter appears multiple times */
                    for (var j = 0; j < currentWord.length; j++) {
                        if (currentWord.charAt(j) === guess) {
                            numLettersMatched += 1;
                        }
                    }

                    lettersMatched += guess;
                    if (numLettersMatched === currentWord.length) {
                        gameOver(true);
                    }
                }
                /* guess doesn't exist in current word and hasn't been guessed before, add to lettersGuessed, reduce lives & update user */
                else {
                    lettersGuessed += guess;
                    lives--;
                    man.innerHTML = 'You have ' + lives + ' lives remaining';
                    if (lives === 0) gameOver();
                }
            }
            /* not a valid letter, error */
            else {
                output.classList.add('error');
                output.innerHTML = messages.validLetter;
            }
        }
        /* no letter entered, error */
        else {
            output.classList.add('error');
            output.innerHTML = messages.validLetter;
        }
        return false;
    };
}());








// generateWord = function(){
// 	Newton.popUp1Div.hide();
// 	Newton.popUp4Div.show();
// 	var $hardWords = $('#hardWords');
// 	$hardWords.on("click", function(){
//
// var hardWords=['counterculture', 'initialization', 'procrastinator', 'chromatography', 'administrative', 'characteristic', 'gerrymandering', 'abstractedness', 'reconstruction', 'acceptableness', 'cardiovascular', 'beautification', 'anthropometric', 'slaughterhouse', 'remarkableness', 'staphylococcus', 'acknowledgment', 'accommodations', 'accomplishable', 'rehabilitation', 'aggrandizement', 'reconciliation', 'thermodynamics', 'apprenticeship', 'anesthesiology', 'teleconference', 'foreordination', 'achondroplasia', 'forthrightness', 'extemporaneous', 'arrondissement','everything', 'aboveboard', 'basketball', 'weathering', 'characters', 'literature', 'perfection', 'volleyball', 'depression', 'homecoming', 'technology', 'maleficent', 'watermelon', 'appreciate', 'relaxation', 'convection', 'government', 'abominable', 'salmonella', 'strawberry', 'aberration', 'retirement', 'television', 'contraband', 'silhouette', 'friendship', 'loneliness', 'punishment', 'university', 'confidence', 'restaurant', 'abstinence', 'blancmange', 'blackboard', 'discipline', 'renovation', 'helicopter', 'generation', 'adaptation', 'skateboard', 'understand', 'leadership', 'revolution', 'wilderness','leonine', 'harmony', 'problem', 'awesome', 'penguin', 'youtube', 'blanket', 'yielder', 'dancing', 'crossed', 'imagine', 'student', 'mercury', 'initial', 'mystery', 'natural', 'kingdom', 'captain', 'healthy', 'library', 'message', 'magical', 'failure', 'forward', 'honesty', 'nuclear', 'fitness', 'sausage', 'popcorn', 'vanilla', 'jasmine', 'stomach', 'fortune', 'friends', 'chicken', 'strange', 'crooked', 'cheetah', 'fashion', 'uniform', 'probity', 'company', 'culture', 'general', 'liberty', 'garbage', 'goddess', 'alcohol', 'climate', 'lobster', 'capital', 'balance', 'example', 'musical'];
//
// var $selectOption = $('#selectOption').val();
// 		switch ($selectOption) {
// 			case "hardWords":
// 			Newton.input = hardWords[Math.floor(Math.random() * hardWords.length)];
// 			break;
// 		}
// 		Hangman.popUp3Div.show();
// 		Hangman.popUp4Div.hide();
// 		Hangman.startGame();
// 	});
// }
