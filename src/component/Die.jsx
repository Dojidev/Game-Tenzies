import PropTypes from "prop-types";

const Die = (props) => {
	const buttonColorWhenHeld = {
		backgroundColor: props.isHeld && "#5b8930",
	};

	return (
		<button
			style={buttonColorWhenHeld}
			onClick={() => props.hold(props.id)}
			aria-pressed={props.isHeld}
			aria-label={`Dia with value ${props.value},
			${props.isHeld ? "held" : "not held"}`}
			className="w-12 h-12 bg-gray-700 text-gray-200 text-lg font-bold rounded-lg shadow-md hover:bg-gray-600"
		>
			{props.value}
		</button>
	);
};

export default Die;
Die.propTypes = {
	value: PropTypes.number.isRequired, // `label` must be a string and is required
	hold: PropTypes.func.isRequired, // `onClick` must be a function and is required
	isHeld: PropTypes.bool, // `isHeld` must be a boolean (optional)
	id: PropTypes.string.isRequired,
};
