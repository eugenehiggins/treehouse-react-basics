var PLAYERS = [
	{
		name: "Gene Higgins",
		score: 31,
		id: 1,
	},
	{
		name: "Ryan Jarvis",
		score: 42,
		id: 2,
	},
	{
		name: "Cali Soberanes",
		score: 53,
		id: 3,
	}
]
var nextId = 4;

var  AddPlayerForm = React.createClass({
	propTypes: {
		onAdd: React.PropTypes.func.isRequired,
	},
	getInitialState: function() {
		return {
			name: "",
		}
	},
	onNameChange: function (e){
		console.log('onNameChange', e.target.value);
		this.setState({name: e.target.value})
	},
	onSubmit: function(e) {
		e.preventDefault();
		this.props.onAdd(this.state.name);
		this.setState({name: ""});
	},
    render: function() {
        return (
            <div className="add-player-form">
            	<form onSubmit={this.onSubmit}>
            		<input type="text" value={this.state.name} onChange={this.onNameChange} />
            		<input type="submit" value="Add Player" />
        		</form>
            </div>
        );
    }
});

function Stats(props){
	var totalPlayers = props.players.length;
	var totalPoints = props.players.reduce(function(total, player){
		return total + player.score;
	}, 0)

	return (
		<table className="stats">
			<tbody>
				<tr>
					<td>Players</td>
					<td>{ totalPlayers }</td>
				</tr>
				<tr>
					<td>Total points</td>
					<td>{ totalPoints }</td>
				</tr>
			</tbody>
		</table>
	)
};

Stats.propTypes = {
	players: React.PropTypes.array.isRequired,
}

function Header(props){
	return (
		<div className="header">
			<Stats players={props.players} />
			<h1>{ props.title }</h1>
		</div>
	);
}

Header.propTypes = {
	title: React.PropTypes.string.isRequired,
	players: React.PropTypes.array.isRequired,
};


// functional components use props, not state
// functional components return elements, they don't render
// uses `props.score` as opposed to `this.state.score`
function Counter(props){
	return	(
		<div className="counter">
			<button className="counter-action decrement" onClick={function() {props.onChange(-1);}} > - </button>
			<div className="counter-score"> { props.score } </div>
			<button className="counter-action increment" onClick={function() {props.onChange(1);}}> + </button>
		</div>
	);

}

Counter.propTypes = {
	//Counter is not handling state anymore, it needs to be passed a score
	score: React.PropTypes.number.isRequired,
	onChange: React.PropTypes.func.isRequired,
}

function Player(props) {
	return (
		<div className="player">
			<div className="player-name">
				<a className="remove-player" onClick={props.onRemove}> ʘ </a>
				{ props.name }
			</div>
			<div className="player-score"> 
				<Counter score={props.score} onChange={props.onScoreChange} />
			</div>
		</div>

	);
}

Player.propTypes = {
	name: React.PropTypes.string.isRequired,
	score: React.PropTypes.number.isRequired,
	onScoreChange: React.PropTypes.func.isRequired,
};

var Application = React.createClass({
	propTypes : {
		title: React.PropTypes.string,
		initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
			name: React.PropTypes.string.isRequired,
			score: React.PropTypes.number.isRequired,
			id: React.PropTypes.number.isRequired,
		})).isRequired,
	},

	getDefaultProps() {
	    return {
	     	title: "Scoreboard",
	    };
	},

	getInitialState() {
	    return {
	        players:  this.props.initialPlayers,
	    };
	},

	onScoreChange: function(index, delta){
		console.log('onScoreChange', index, delta);
		this.state.players[index].score += delta;
		this.setState(this.state);
	},

	onPlayerAdd: function(name) {
		console.log('Player added', name)
		this.state.players.push({
			name: name,
			score: 0,
			id: nextId,
		});
		this.setState(this.state);
		nextId += 1;
	},

	// classes need the render method
	// this must return a single DOM element, which means it will be wrapped in a div
	render: function(){
		return (
			<div className="scoreboard">
				<Header title={this.props.title} players={this.state.players } />
				<div className="players">
					{this.state.players.map(function(player, index){
						return (
							<Player 
								onScoreChange={function (delta) {this.onScoreChange(index,delta) }.bind(this)}
								name={player.name} 
								score={player.score} 
								key={player.id} />
							);
					}.bind(this))}
				</div>
				<AddPlayerForm onAdd={this.onPlayerAdd} />
			</div>
		);
	}	
})




ReactDOM.render(<Application initialPlayers={PLAYERS} />, document.getElementById('container'));