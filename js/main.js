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

const arrayBox = ["box_green", "box_yellow", "box_red", "box_blue"];
const arrayMain = [];
const arrayInGame = [];
let highestScore = 0;
let currentScore = 0;

modalButton.addEventListener("click", () => {
	playSound("try");
	showLostModal(false);
});

startButton.addEventListener("click", () => {
	disbleStartButton(true);
	disableBoxButton(true, false);
	playColorSet();
	playSound("start");
	console.log("start");
});

function allOnClickBox(event) {
	for (const item of document.getElementsByClassName("box"))
		item.addEventListener("click", () => {
			const id = item.getAttribute("id");
			playSound("coin");
			arrayInGame.push(id);
			console.log(arrayInGame, "inGame");
			event();
		});
}

function disableBoxButton(disable, disableUI) {
	for (const item of document.getElementsByClassName("box")) {
		item.disabled = disable;

		if (disableUI) item.classList.add("disable");
		else item.classList.remove("disable");
	}
}

function disbleStartButton(enabler) {
	startButton.disabled = enabler;

	if (enabler) startButton.classList.add("disable");
	else startButton.classList.remove("disable");
}

// get a box by ID and add glow effect
function activeBox(boxID) {
	const box = document.getElementById(boxID);
	box.classList.add("box_press");
	playSound("coin");

	setTimeout(() => {
		box.classList.remove("box_press");
	}, 400);
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

function arrayStartWith(first, second) {
	const firstArray = [...first];
	const secondArray = [...second];

	for (let index = 0; index < secondArray.length; index++)
		if (firstArray[index] !== secondArray[index]) return false;

	return true;
}
