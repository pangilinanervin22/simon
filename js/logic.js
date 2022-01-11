function resetGame() {
	arrayMain.length = arrayInGame.length = currentScore = 0;
	levelText.innerText = "Level " + 1;

	startButton.innerText = "Start";
	disableBoxButton(true, true);
	disbleStartButton(false);
}

function addColorRandom() {
	arrayMain.push(arrayBox[Math.round(Math.random() * 3)]);
	console.log("main set");
	console.log(arrayMain);
}

function playColorSet() {
	startButton.innerText = "Wait";
	addColorRandom();

	//use for playing the next color set
	let index = 0;
	const glowEach = setInterval(() => {
		activeBox(arrayMain[index++]);

		if (index === arrayMain.length) {
			startButton.innerText = "Guess";
			disableBoxButton(false, false);
			clearInterval(glowEach);
		}
	}, 600);
}

function checkColorSet() {
	//lose
	if (!arrayStartWith(arrayMain, arrayInGame)) loseLevel();
	//win
	else if (arrayInGame.length === arrayMain.length && arrayInGame.length !== 0) winLevel();
}

function loseLevel() {
	playSound("lose");
	console.log("lose");
	showLostModal(true);
	resetGame();
}

function winLevel() {
	arrayInGame.length = 0;
	levelText.innerText = `Level  ${(arrayMain.length + 1).toString()}`;
	startButton.innerText = "Start";

	disableBoxButton(true);
	playSound("win");
	console.log("win");

	setTimeout(() => {
		disableBoxButton(true, true);
		disbleStartButton(false);
	}, 1000);

	currentScore++;

	if (currentScore > highestScore || highestScore === 0) {
		scoreText.innerText = `highest : ${++highestScore}`;
	}
}

//function clicking all box
allOnClickBox(() => {
	checkColorSet();
});

resetGame();
