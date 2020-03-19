import React, {Component} from "react";
import logo from "../logo.svg";

class Body extends Component {
    // Return body HTML
    render() {
        return (
            <main className="App-body">
                <img src={logo} className="App-logo" alt="logo" />
                <p>This a React demo incoorporating <br></br><b>{this.props.company}</b>.</p>
            </main>
        )
    }
}

export default Body;
