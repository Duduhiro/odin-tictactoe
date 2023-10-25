let signal = 0;
let round = 0;
let positions = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0
};
let game_end = false;
const player = {
    1: "X",
    2: "O"
}

const putSignal = (div) => {
    if (game_end) {
        return;
    }
    const divValue = div.getAttribute("value");
    if (positions[divValue] === 0) {
        if (signal === 0) {
            div.innerHTML = "X";
            signal = 1;
            positions[divValue] = 1;
        } else {
            div.innerHTML = "O";
            signal = 0;
            positions[divValue] = 2;
        }
        round++;
        checkWinner();
    }
}

const checkWinner = () => {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // horizontal
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // vertical
        [1, 5, 9], [3, 5, 7] // diagonal
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (positions[a] && positions[a] === positions[b] && positions[a] === positions[c]) {
            const result = document.getElementById("result");
            result.innerHTML = `Player ${player[positions[a]]} wins!`;
            game_end = true;
            return;
        }
    }
    if (round > 8) {
        const result = document.getElementById("result");
        result.innerHTML = `Draw!`;
        game_end = true;
        return;
    }
}

const reset = () => {
    const divs = document.getElementsByClassName("cell");
    for (let i = 0; i < divs.length; i++) {
        divs[i].innerHTML = "";
        positions[divs[i].getAttribute("value")] = 0;
    }
    signal = 0;
    round = 0;
    game_end = false;
    const result = document.getElementById("result");
    result.innerHTML = "";
}