import { useEffect, useRef, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const Main = () => {
	const [dice, setDice] = useState(() => generateAllNewDice());
	const buttonRef = useRef(null);
	const gameWon =
		dice.every((diceObj) => diceObj.isHeld) &&
		dice.every((diceObj) => diceObj.value === dice[0].value);

	useEffect(() => {
		if (gameWon) {
			buttonRef.current.focus();
		}
	}, [gameWon]);

	function generateAllNewDice() {
		return new Array(10).fill(0).map(() => ({
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		}));
	}

	function rollTheDice() {
		if (!gameWon) {
			setDice((prevDice) =>
				prevDice.map((diceObj) =>
					diceObj.isHeld
						? diceObj
						: {
								...diceObj,
								value: Math.ceil(Math.random() * 6),
						  }
				)
			);
		} else setDice(generateAllNewDice());
	}

	function hold(id) {
		setDice((prevDice) =>
			prevDice.map((diceObj) =>
				diceObj.id === id
					? { ...diceObj, isHeld: !diceObj.isHeld }
					: diceObj
			)
		);
	}

	//-----------------UI----------------//

	const buttonElement = dice.map((diceObj) => (
		<Die
			key={diceObj.id}
			value={diceObj.value}
			isHeld={diceObj.isHeld}
			id={diceObj.id}
			hold={hold}
		/>
	));

	return (
		<main className="flex flex-col items-center bg-gray-800 text-gray-100 w-96 h-auto p-6 rounded-lg shadow-lg">
			{gameWon && <Confetti />}

			<div aria-live="polite" className="sr-only">
				{gameWon && (
					<p>
						Congratulations! You won! Press `&quot;`New
						Game`&quot;`to start again.
					</p>
				)}
			</div>

			<div className="text-center mb-6">
				<h1 className="text-3xl font-bold text-gray-50">Tenzies</h1>
				<p className="text-gray-300 text-sm mt-2">
					Roll until all dice are the same. Click each die to freeze
					it at its current value between rolls.
				</p>
			</div>

			<div className="flex justify-center flex-wrap gap-3 mb-6">
				{/* Dice buttons */}
				{buttonElement}
			</div>

			<button
				ref={buttonRef}
				onClick={rollTheDice}
				className="w-1/2 py-2 bg-gray-700 text-gray-300 text-sm font-medium rounded-md shadow-md hover:bg-gray-600 hover:text-white"
			>
				{gameWon ? "New Game" : "Roll Dice"}
			</button>
		</main>
	);
};

export default Main;
