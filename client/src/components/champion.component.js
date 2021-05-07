import React, { Component } from "react";
import { connect } from "react-redux";
import { updateChampion, deleteChampion } from "../actions/champions";
import ChampionDataService from "../services/champion.service";


class Champion extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getChampion = this.getChampion.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.removeChampion = this.removeChampion.bind(this);

        this.state = {
            currentChampion: {
                id: null,
                name: "",
                description: "",
                owned: false,
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getChampion(this.props.match.params.id);
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentChampion: {
                    ...prevState.currentChampion,
                    name: name,
                },
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentChampion: {
                ...prevState.currentChampion,
                description: description,
            },
        }));
    }

    getChampion(id) {
        ChampionDataService.get(id)
            .then((response) => {
                this.setState({
                    currentChampion: response.data,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateStatus(status) {
        var data = {
            id: this.state.currentChampion.id,
            name: this.state.currentChampion.name,
            description: this.state.currentChampion.description,
            owned: status,
        };

        this.props
            .updateChampion(this.state.currentChampion.id, data)
            .then((response) => {
                console.log(response);

                this.setState((prevState) => ({
                    currentChampion: {
                        ...prevState.currentChampion,
                        owned: status,
                    },
                }));

                this.setState({ message: "The status was updated successfully!" });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateContent() {
        this.props
            .updateChampion(this.state.currentChampion.id, this.state.currentChampion)
            .then((response) => {
                console.log(response);

                this.setState({ message: "The Champion was updated successfully!" });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    removeChampion() {
        this.props
            .deleteChampion(this.state.currentChampion.id)
            .then(() => {
                this.props.history.push("/champions");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { currentChampion } = this.state;

        return (
            <div>
                {currentChampion ? (
                    <div className="edit-form">
                        <h4>Champion</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentChampion.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentChampion.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentChampion.owned ? "Owned" : "Unowned"}
                            </div>
                        </form>

                        {currentChampion.owned ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updateStatus(false)}
                            >
                                Not Owned
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={this.updateStatus(true)}
                            >
                                Owned
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.removeChampion}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateContent}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Champion...</p>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(null, { updateChampion, deleteChampion })(Champion);