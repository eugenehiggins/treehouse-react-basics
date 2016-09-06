function Header(props){
	return (
		<div className="header">
				<h1>{ props.title }</h1>
			</div>
		)
	props
}

Header.propTypes = {
	title: React.PropTypes.string.isRequired,
};

function Counter(props) {
	return (
		<div className="counter">
			<button className="counter-action decrement"> - </button>
			<div className="counter-score"> { props.score } </div>
			<button className="counter-action increment"> + </button>
		</div>

	);
}

Counter.propTypes = {
	score: React.PropTypes.number.isRequired,
};

function Player(props) {
	return (
		<div className="player">
			<div className="player-name">{ props.name }</div>
			<div className="player-score"> 
				<Counter score={props.score} />
			</div>
		</div>

	);
}

Player.propTypes = {
	name: React.PropTypes.string.isRequired,
};

// this is a custom component
function Application(props){
	// this must return a single DOM element, which means it will be wrapped in a div
	return (
		<div className="scoreboard">
			<Header title={props.title} />
			<div className="players">
				<Player name="Gene Higgins" score={31} />
				<Player name="Ryan Jarvis" score={32} />
			</div>
		</div>
	);
}

Application.defaultProps = {
	title: "Scoreboard",
}

ReactDOM.render(<Application/>, document.getElementById('container'));