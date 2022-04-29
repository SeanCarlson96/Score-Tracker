import ReactDOM from 'react-dom';
import React from 'react';
import './App.css';
import LoadingIcons from 'react-loading-icons';
import axios from 'axios';

var teamArray = [
    "Arsenal", "Aston Villa", "Brentford",
    "Brighton and Hove Albion",
    "Burnley",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Leeds United",
    "Leicester City",
    "Liverpool",
    "Manchester City",
    "Manchester United",
    "Newcastle United",
    "Norwich City",
    "Southampton",
    "Tottenham Hotspur",
    "Watford",
    "West Ham United",
    "Wolverhampton Wanderers",
    "Barnsley",
    "Birmingham City",
    "Blackburn Rovers",
    "Blackpool",
    "Bolton Wanderers",
    "AFC Bournemouth",
    "Bradford City",
    "Cardiff City",
    "Charlton Athletic",
    "Coventry City",
    "Derby County",
    "Fulham",
    "Huddersfield Town",
    "Hull City",
    "Ipswich Town",
    "Middlesbrough",
    "Nottingham Forest",
    "Oldham Athletic",
    "Portsmouth",
    "Queens Park Rangers",
    "Reading",
    "Sheffield United",
    "Sheffield Wednesday",
    "Stoke City",
    "Sunderland",
    "Swansea City",
    "Swindon Town",
    "West Bromwich Albion",
    "Wigan Athletic",
    "Wimbledon",
    "Atlanta United FC",
    "Chicago Fire",
    "Colorado Rapids",
    "Columbus Crew SC",
    "D.C. United",
    "FC Dallas",
    "Houston Dynamo",
    "LA Galaxy",
    "Los Angeles FC",
    "Minnesota United FC",
    "Montreal Impact",
    "New England Revolution",
    "New York City FC",
    "New York Red Bulls",
    "Orlando City SC",
    "Philadelphia Union",
    "Portland Timbers",
    "Real Salt Lake",
    "San Jose Earthquakes",
    "Seattle Sounders FC",
    "Sporting Kansas City",
    "Toronto FC",
    "Vancouver Whitecaps FC",
    "Arizona Diamondbacks",
    "Atlanta Braves",
    "Baltimore Orioles",
    "Boston Red Sox",
    "Chicago White Sox",
    "Chicago Cubs",
    "Cincinnati Reds",
    "Cleveland Indians",
    "Colorado Rockies",
    "Detroit Tigers",
    "Houston Astros",
    "Kansas City Royals",
    "Los Angeles Angels",
    "Los Angeles Dodgers",
    "Miami Marlins",
    "Milwaukee Brewers",
    "Minnesota Twins",
    "New York Yankees",
    "New York Mets",
    "Oakland Athletics",
    "Philadelphia Phillies",
    "Pittsburgh Pirates",
    "San Diego Padres",
    "San Francisco Giants",
    "Seattle Mariners",
    "St. Louis Cardinals",
    "Tampa Bay Rays",
    "Texas Rangers",
    "Toronto Blue Jays",
    "Washington Nationals",
    "Anaheim Ducks",
    "Arizona Coyotes",
    "Boston Bruins",
    "Buffalo Sabres",
    "Calgary Flames",
    "Carolina Hurricanes",
    "Chicago Blackhawks",
    "Colorado Avalanche",
    "Columbus Blue Jackets",
    "Dallas Stars",
    "Detroit Red Wings",
    "Edmonton Oilers",
    "Florida Panthers",
    "Los Angeles Kings",
    "Minnesota Wild",
    "Montreal Canadians",
    "Nashville Predators",
    "New Jersey Devils",
    "New York Islanders",
    "New York Rangers",
    "Ottawa Senators",
    "Philadelphia Flyers",
    "Pittsburgh Penguins",
    "San Jose Sharks",
    "Seattle Kraken",
    "St Louis Blues",
    "Tampa Bay Lightning",
    "Toronto Maple Leafs",
    "Vancouver Canucks",
    "Vegas Golden Knights",
    "Washington Capitals",
    "Winnipeg Jets",
    "Atlanta Hawks",
    "Boston Celtics",
    "Brooklyn Nets",
    "Charlotte Hornets",
    "Chicago Bulls",
    "Cleveland Cavaliers",
    "Dallas Mavericks",
    "Denver Nuggets",
    "Detroit Pistons",
    "Golden State Warriors",
    "Houston Rockets",
    "Indiana Pacers",
    "Los Angeles Clippers",
    "Los Angeles Lakers",
    "Memphis Grizzlies",
    "Miami Heat",
    "Milwaukee Bucks",
    "Minnesota Timberwolves",
    "New Orleans Pelicans",
    "New York Knicks",
    "Oklahoma City Thunder",
    "Orlando Magic",
    "Philadelphia 76ers",
    "Phoenix Suns",
    "Portland Trail Blazers",
    "Sacramento Kings",
    "San Antonio Spurs",
    "Toronto Raptors",
    "Utah Jazz",
    "Washington Wizards",
    "San Francisco 49ers",
    "Chicago Bears",
    "Cincinnati Bengals",
    "Buffalo Bills",
    "Denver Broncos",
    "Cleveland Browns",
    "Arizona Cardinals",
    "Los Angeles Chargers",
    "Kansas City Chiefs",
    "Indianapolis Colts",
    "Dallas Cowboys",
    "Miami Dolphins",
    "Philadelphia Eagles",
    "Atlanta Falcons",
    "New York Giants",
    "Jacksonville Jaguars",
    "New York Jets",
    "Detroit Lions",
    "Green Bay Packers",
    "Carolina Panthers",
    "New England Patriots",
    "Oakland Raiders",
    "Los Angeles Rams",
    "Baltimore Ravens",
    "Washington Redskins",
    "New Orleans Saints",
    "Seattle Seahawks",
    "Pittsburgh Steelers",
    "Tampa Bay Buccaneers",
    "Houston Texans",
    "Tennessee Titans",
    "Minnesota Vikings"
];

let list = document.getElementById("brow");
teamArray.sort().forEach(item => {
    let option = document.createElement("option");
    option.value = item;
    list.appendChild(option);
});

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCard: true,
            isLoaded: "false",
            myTeam: "",
            myTeamScore: "",
            myTeamLogo: "",
            oppTeam: "",
            oppTeamScore: "",
            oppTeamLogo: "",
            gameStatus: "",
            gameDate: ""
        };
        this.removeCard = this.removeCard.bind(this);
    }
    removeCard() {this.setState({ showCard: false,});}

    callAPI(props) {
        let teamEntered = this.props.name
        const search = {
            method: 'GET',
            url: "/api",
            params: { q: teamEntered }
        }


        axios.request(search)

            //.then(response => console.log(response))

            .then(response => {

                    if (response.data.hasOwnProperty('game_spotlight')) {

                        this.setState({
                            isLoaded: "true",
                            myTeam: response.data.game_spotlight.teams[0].name,
                            myTeamLogo: response.data.game_spotlight.teams[0].thumbnail,
                            oppTeam: response.data.game_spotlight.teams[1].name,
                            oppTeamLogo: response.data.game_spotlight.teams[1].thumbnail,
                            gameDate: response.data.game_spotlight.date
                        })

                        if (response.data.game_spotlight.hasOwnProperty('stage')) {
                            this.setState({
                                myTeamScore: response.data.game_spotlight.teams[0].score.total,
                                oppTeamScore: response.data.game_spotlight.teams[1].score.total,
                                gameStatus: response.data.game_spotlight.stage,
                            })
                        }

                    } else {

                        var arr = [];
                        for (let i = 0; i < response.data['games'].length; i++) {
                            if (response.data['games'][i].status === "FT" |
                                response.data['games'][i].status === "Final" |
                                response.data['games'][i].status === "Final/OT" |
                                response.data['games'][i].status === "final" |
                                response.data['games'][i].status === "final/ot") {

                                arr.unshift(response.data['games'][i]);

                            }
                        }

                        this.setState({
                            isLoaded: "true",
                            myTeam: arr[0].teams[0].name,
                            myTeamScore: arr[0].teams[0].score,
                            myTeamLogo: arr[0].teams[0].thumbnail,
                            oppTeam: arr[0].teams[1].name,
                            oppTeamScore: arr[0].teams[1].score,
                            oppTeamLogo: arr[0].teams[1].thumbnail,
                            gameStatus: arr[0].status,
                            gameDate: arr[0].date
                        })
                    }
                })

            .catch(error => {
                    this.setState({
                        isLoaded: "error",
                        myTeam: "There was an error loading " + this.props.name + "'s data. Is that spelt correctly? Have they played recently?",
                        myTeamScore: "",
                        myTeamLogo: "",
                        oppTeam: "",
                        oppTeamScore: "",
                        oppTeamLogo: "",
                        gameStatus: "",
                        gameDate: ""
                    })

                    console.log(error.response.data)

                })

    }

    componentDidMount() { this.callAPI();}
   
    render() {
        if (this.state.showCard) {
            if (this.state.isLoaded == "error") {
                return (
                    <div className="errorCard">
                            <button
                                id="team-remove"
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={this.removeCard}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        <div id="team-score-display">
                            <h5 className="teamName">{this.state.myTeam}</h5>
                        </div>
                    </div>
                )
            } else if (this.state.isLoaded === "false") {
                return (
                    <div className="card">
                        <div className="teamAndScore">
                            <LoadingIcons.Puff stroke="#98ff98" strokeOpacity={.125} speed={.75} />
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="card">

                        <div id="card-header">
                            <p id="game-status">{this.state.gameStatus}<br />
                                {" " + this.state.gameDate}
                            </p>
                            <button
                                id="team-remove"
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={this.removeCard}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <div id="team-score-display">
                            <div className="teamAndScore" id="myTeam">
                                <img className="teamLogo" src={this.state.myTeamLogo} alt="" />
                                <h4 className="teamName">{this.state.myTeam}</h4>
                                <h2 className="scoreDisplay">{this.state.myTeamScore}</h2>
                            </div>

                            <div className="teamAndScore" id="opponent">
                                <img className="teamLogo" src={this.state.oppTeamLogo} alt="" />
                                <h4 className="teamName">{this.state.oppTeam}</h4>
                                <h2 className="scoreDisplay">{this.state.oppTeamScore}</h2>
                            </div>
                        </div>
                    </div>

                )
            }
        } else {
            return null;
        }
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team1: "",
            team2: "",
            team3: "",
            team4: "",
            team5: "",
            team6: "",
            team7: "",
            team8: "",
            team9: "",
            team10: "",
            cardElement: ""
        };
        this.makeCard = this.makeCard.bind(this);
    }
    makeCard() {
        if (this.state.team1 === "") {
            this.setState({
                team1: document.getElementById("entry").value,
                cardElement: (
                    <div id="cards">
                        <div>
                            <Card name={document.getElementById("entry").value} />
                        </div>
                    </div>
                )
            }); document.getElementById("entry").value = "";
        } else if (this.state.team2 === "") {
            this.setState({
                team2: document.getElementById("entry").value,
                cardElement: (
                    <div id="cards">
                        <div>
                            <Card name={this.state.team1} />
                        </div>
                        <div>
                            <Card name={document.getElementById("entry").value} />
                        </div>
                    </div>
                )
            }); document.getElementById("entry").value = "";
        } else if (this.state.team3 === "") {
            this.setState({
                team3: document.getElementById("entry").value,
                cardElement: (
                    <div id="cards">
                        <div>
                            <Card name={this.state.team1} />
                        </div>
                        <div>
                            <Card name={this.state.team2} />
                        </div>
                        <div>
                            <Card name={document.getElementById("entry").value} />
                        </div>
                    </div>
                )
            }); document.getElementById("entry").value = "";
        } else if (this.state.team4 === "") {
            this.setState({
                team4: document.getElementById("entry").value,
                cardElement: (
                    <div id="cards">
                        <div>
                            <Card name={this.state.team1} />
                        </div>
                        <div>
                            <Card name={this.state.team2} />
                        </div>
                        <div>
                            <Card name={this.state.team3} />
                        </div>
                        <div>
                            <Card name={document.getElementById("entry").value} />
                        </div>
                    </div>
                )
            }); document.getElementById("entry").value = "";
        } else if (this.state.team5 === "") {
            this.setState({
                team5: document.getElementById("entry").value,
                cardElement: (
                    <div id="cards">
                        <div>
                            <Card name={this.state.team1} />
                        </div>
                        <div>
                            <Card name={this.state.team2} />
                        </div>
                        <div>
                            <Card name={this.state.team3} />
                        </div>
                        <div>
                            <Card name={this.state.team4} />
                        </div>
                        <div>
                            <Card name={document.getElementById("entry").value} />
                        </div>
                    </div>
                )
            }); document.getElementById("entry").value = "";
        } else if (this.state.team6 === "") {
            this.setState({
                team6: document.getElementById("entry").value,
                cardElement: (
                    <div id="cards">
                        <div>
                            <Card name={this.state.team1} />
                        </div>
                        <div>
                            <Card name={this.state.team2} />
                        </div>
                        <div>
                            <Card name={this.state.team3} />
                        </div>
                        <div>
                            <Card name={this.state.team4} />
                        </div>
                        <div>
                            <Card name={this.state.team5} />
                        </div>
                        <div>
                            <Card name={document.getElementById("entry").value} />
                        </div>
                    </div>
                )
            }); document.getElementById("entry").value = "";
        } else if (this.state.team7 === "") {
            this.setState({
                team7: document.getElementById("entry").value,
                cardElement: (
                    <div id="cards">
                        <div>
                            <Card name={this.state.team1} />
                        </div>
                        <div>
                            <Card name={this.state.team2} />
                        </div>
                        <div>
                            <Card name={this.state.team3} />
                        </div>
                        <div>
                            <Card name={this.state.team4} />
                        </div>
                        <div>
                            <Card name={this.state.team5} />
                        </div>
                        <div>
                            <Card name={this.state.team6} />
                        </div>
                        <div>
                            <Card name={document.getElementById("entry").value} />
                        </div>
                    </div>
                )
            }); document.getElementById("entry").value = "";
        } else if (this.state.team8 === "") {
            this.setState({
                team8: document.getElementById("entry").value,
                cardElement: (
                    <div id="cards">
                        <div>
                            <Card name={this.state.team1} />
                        </div>
                        <div>
                            <Card name={this.state.team2} />
                        </div>
                        <div>
                            <Card name={this.state.team3} />
                        </div>
                        <div>
                            <Card name={this.state.team4} />
                        </div>
                        <div>
                            <Card name={this.state.team5} />
                        </div>
                        <div>
                            <Card name={this.state.team6} />
                        </div>
                        <div>
                            <Card name={this.state.team7} />
                        </div>
                        <div>
                            <Card name={document.getElementById("entry").value} />
                        </div>
                    </div>
                )
            }); document.getElementById("entry").value = "";
        } else if (this.state.team9 === "") {
            this.setState({
                team9: document.getElementById("entry").value,
                cardElement: (
                    <div id="cards">
                        <div>
                            <Card name={this.state.team1} />
                        </div>
                        <div>
                            <Card name={this.state.team2} />
                        </div>
                        <div>
                            <Card name={this.state.team3} />
                        </div>
                        <div>
                            <Card name={this.state.team4} />
                        </div>
                        <div>
                            <Card name={this.state.team5} />
                        </div>
                        <div>
                            <Card name={this.state.team6} />
                        </div>
                        <div>
                            <Card name={this.state.team7} />
                        </div>
                        <div>
                            <Card name={this.state.team8} />
                        </div>
                        <div>
                            <Card name={document.getElementById("entry").value} />
                        </div>
                    </div>
                )
            }); document.getElementById("entry").value = "";
        } else if (this.state.team10 === "") {
            this.setState({
                team10: document.getElementById("entry").value,
                cardElement: (
                    <div id="cards">
                        <div>
                            <Card name={this.state.team1} />
                        </div>
                        <div>
                            <Card name={this.state.team2} />
                        </div>
                        <div>
                            <Card name={this.state.team3} />
                        </div>
                        <div>
                            <Card name={this.state.team4} />
                        </div>
                        <div>
                            <Card name={this.state.team5} />
                        </div>
                        <div>
                            <Card name={this.state.team6} />
                        </div>
                        <div>
                            <Card name={this.state.team7} />
                        </div>
                        <div>
                            <Card name={this.state.team8} />
                        </div>
                        <div>
                            <Card name={this.state.team9} />
                        </div>
                        <div>
                            <Card name={document.getElementById("entry").value} />
                        </div>
                    </div>
                )
            }); document.getElementById("entry").value = "";
        } else (alert("Maximum number of teams reached"))
    }
    render() {
        return (
            <div id="app">
                <div id="team-input">
                    <div id="add-team">
                        <input
                            type="search"
                            id="entry"
                            className="form-control"
                            list="brow"
                            placeholder="Add a Team"
                            autocomplete="off"
                        ></input>
                        <button
                            id="add-btn"
                            type="submit"
                            className="btn btn-primary btn-lg"
                            onClick={this.makeCard}
                        >
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div>{this.state.cardElement}</div>
            </div> 
        );
    }
}


//ReactDOM.render(<App />, document.getElementById("insert-app"));

export default App;