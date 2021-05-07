import React, { Component } from "react";
import { connect } from "react-redux";
import { createChampion } from "../actions/champions";

class AddChampion extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveChampion = this.saveChampion.bind(this);
        this.newChampion = this.newChampion.bind(this);

        this.state = {
            id: null,
            name: "",
            description: "",
            owned: false,

            submitted: false,
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    saveChampion() {
        const { name, description } = this.state;

        this.props
            .createChampion(name, description)
            .then((data) => {
                this.setState({
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    owned: data.owned,

                    submitted: true,
                });
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    newChampion() {
        this.setState({
            id: null,
            name: "",
            description: "",
            owned: false,

            submitted: false,
        });
    }

    render() {
        return ( 
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newChampion}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>

                        <button onClick={this.saveChampion} className="btn btn-success">
                            Submit
                        </button>
                    </div>                
                )}
            </div>
        );
    }
}

export default connect(null, { createChampion })(AddChampion);