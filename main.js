//loading effect
setTimeout(() => {
	document.getElementById("modal_loading").classList.add("hide");
}, 3000);

// dom declaration
const startButton = document.getElementById("start");
const levelText = document.getElementById("level");
const modal = document.getElementById("modal_overlay");
const modalButton = document.getElementById("modal_button");
const scoreText = document.getElementById("score");

// arrayMain for referencing the random set of color
// arrayInGame for set of colors in every level always clear every level
const arrayBox = ["box_green", "box_yellow", "box_red", "box_blue"];
const arrayMain = [];
const arrayInGame = [];
let highestScore = 0;
let currentScore = 0;

function resetGame() {
	arrayMain.length = arrayInGame.length = currentScore = 0;
	levelText.innerText = "Level " + 1;

	startButton.innerText = "Start";
	disableBoxButton(true, true);
	disbleStartButton(false);
}

//disble a button box logic or UI style
function disableBoxButton(isDisable, isDisabledUI) {
	for (const element of document.getElementsByClassName("box")) {
		element.disabled = isDisable;

		if (isDisabledUI) element.classList.add("disable");
		else element.classList.remove("disable");
	}
}

function disbleStartButton(enabler) {
	startButton.disabled = enabler;

	if (enabler) startButton.classList.add("disable");
	else startButton.classList.remove("disable");
}

// add glow effect
function activeBox(boxID) {
	const box = document.getElementById(boxID);
	box.classList.add("box_press");
	playSound("coin");

	setTimeout(() => {
		box.classList.remove("box_press");
	}, 400);
}

function addColorRandom() {
	arrayMain.push(arrayBox[Math.round(Math.random() * 3)]);
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
	if (!isArrayStartsWith(arrayMain, arrayInGame)) loseLevel();
	//win
	else if (arrayInGame.length === arrayMain.length && arrayInGame.length !== 0) winLevel();
}

function loseLevel() {
	playSound("lose");
	showLostModal(true);
	resetGame();
}

//reset ingame array and add one color randomly
function winLevel() {
	arrayInGame.length = 0;
	levelText.innerText = `Current: ${(arrayMain.length + 1).toString()}`;
	startButton.innerText = "Start";

	disableBoxButton(true);
	playSound("win");

	setTimeout(() => {
		disableBoxButton(true, true);
		disbleStartButton(false);
	}, 1000);

	currentScore++;

	if (currentScore > highestScore || highestScore === 0) {
		scoreText.innerText = `highest : ${++highestScore}`;
	}
}

//utils
function playSound(soundName) {
	switch (soundName) {
		case "coin":
			new Audio("https://pangilinanervin22.github.io/simon/res/coin_sound.wav").play();
			break;
		case "win":
			new Audio("https://pangilinanervin22.github.io/simon/res/win.wav").play();
			break;
		case "lose":
			new Audio("https://pangilinanervin22.github.io/simon/res/lose.wav").play();
			break;
		case "try":
			new Audio("https://pangilinanervin22.github.io/simon/res/try.wav").play();
			break;
		case "start":
			new Audio("https://pangilinanervin22.github.io/simon/res/start.wav").play();
			break;
		default:
	}
}

function showLostModal(enabler) {
	if (enabler) {
		playSound("lose");
		modal.classList.remove("hide");
	} else {
		modal.classList.add("hide");
	}
}

function isArrayStartsWith(first, second) {
	const firstArray = [...first];
	const secondArray = [...second];

	for (let index = 0; index < secondArray.length; index++)
		if (firstArray[index] !== secondArray[index]) return false;

	return true;
}

//function clicking all box
for (const item of document.getElementsByClassName("box"))
	item.addEventListener("click", () => {
		const id = item.getAttribute("id");
		arrayInGame.push(id);
		checkColorSet();
		playSound("coin");
	});

modalButton.addEventListener("click", () => {
	playSound("try");
	showLostModal(false);
});

startButton.addEventListener("click", () => {
	disbleStartButton(true);
	disableBoxButton(true, false);
	playColorSet();
	playSound("start");
});

// starting point
resetGame();
