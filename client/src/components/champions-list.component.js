import React, { Component } from "react";
import ChampionDataService from "../services/champion.service";
import { connect } from "react-redux";
import { retrieveChampions, findChampionsByName, deleteAllChampions } from "../actions/champions";
import { Link } from "react-router-dom";

class ChampionsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveChampions = this.retrieveChampions.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.setActiveChampion = this.setActiveChampion.bind(this);
        this.searchName = this.searchName.bind(this);
        this.removeAllChampions = this.removeAllChampions.bind(this);

        this.state = {
            champions: [],
            currentChampion: null, 
            currentIndex: -1,
            searchName: "",
        };
    }

    componentDidMount() {
        this.props.retrieveChampions();        
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName,
        });
    }

    retrieveChampions() {
        ChampionDataService.getAll()
            .then(response => {
                this.setState({
                    champions: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshData() {
        this.retrieveChampions();
        this.setState({
            currentChampion: null,
            currentIndex: -1,
        });
    }

    setActiveChampion(champion, index) {
        this.setState({
            currentChampion: champion,
            currentIndex: index,
        });
    }

    removeAllChampions() {
        ChampionDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshData();
            })
            .catch(e => {
                console.log(e);
            });
    }
        
    searchName() {
        this.setState({
            currentChampion: null,
            currentIndex: -1
        });

        ChampionDataService.findByName(this.state.searchName)
            .then(response => {
                this.setState({
                    champions: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchName, currentChampion, currentIndex } = this.state;
        const { champions } = this.props;

        return (
            <div className="list-row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Champion name"
                            value={searchName}
                            onChange={this.onChangeSearchName}
                        />
                        <div className="input-group-append">
                            <button 
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.findChampionsByName}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Champions List</h4>

                    <ul className="col-md-6">
                        {champions &&
                            champions.map((champion, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveChampion(champion, index)}
                                    key={index}
                                >
                                    {champion.name}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllChampions}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentChampion ? (
                        <div>
                            <h4>Champion</h4>
                            <div> 
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentChampion.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentChampion.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentChampion.owned ? "Owned" : "Unowned"}
                            </div>

                            <Link 
                                to={"/champions/" + currentChampion.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click a Champion...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        champions: state.champions,
    };
};

export default connect(mapStateToProps, { retrieveChampions, findChampionsByName, deleteAllChampions })(ChampionsList);