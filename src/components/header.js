import React, {Component} from "react";
import sap from "../sap.png";

// Navigational sub-components
const 
    LoginButton = (props) => {
        return (
            <nav>
                <a className="App-link" href="javascript;" onClick={props.onClick}>Login</a> | 
                <a className="App-link" href="javascript;" onClick={props.onClick}> Sign Up</a>
            </nav>
        );
    },
    LogoutButton = (props) => {
        return (
            <a className="App-link" href="javascript;" onClick={props.onClick}> Logout</a>
        );
    },
    ProfileButton = (props) => {

        const isLoggedIn = props.isLoggedIn;

        if (isLoggedIn) {
            return (
                <span>
                    <a className="App-link" href="javascript;" onClick={props.onClick}>View Profile</a> | 
                </span>
            );
        }
        return <span></span>
    },
    Greeting = (props) => {
        
        const 
            isLoggedIn = props.isLoggedIn,
            name = props.name;

        if (isLoggedIn) {
            return <UserView name={name} />;
        }
        return <GuestView />;
    },
    UserView = (props) => {
        return <h2>Welcome, {props.name}</h2>;
    },
    GuestView = (props) => {
        return <h2>Login or sign up.</h2>;
    };

class Header extends Component {
    
    componentDidMount() {
        // On Login event handler
        window.gigya.socialize.addEventHandlers({
            onLogin: e => {
                window.gigya.accounts.getJWT({fields: "firstName, lastName, email", callback: arg => {
                    if (arg.errorCode === 0)
                        this.setState({isLoggedIn: true, name: `${e.user.nickname}`, jwt: arg.id_token});
                }});
            }
        });
        
        // Session checker. If the user is logged in, its information will be returned by this function
        window.gigya.accounts.getAccountInfo({callback: e => {
            if (e.errorCode === 0) {
                window.gigya.accounts.getJWT({fields: "firstName, lastName, email", callback: arg => {
                    if (arg.errorCode === 0)
                        this.setState({isLoggedIn: true, name: `${e.profile.firstName} ${e.profile.lastName}`, jwt: arg.id_token});
                }});
            } else {
                this.setState({isLoggedIn: false});
            }
        }});
    }

    // Defining a default state in the constructor
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false, name: null};
    }
    
    // The below functions will call SAP Customer Data Cloud (Gigya) Web SDK to perform some actions
    login() {
        window.gigya.accounts.showScreenSet({screenSet: 'Default-RegistrationLogin'});
    }

    logout() {
        window.gigya.accounts.logout({callback: e => {
            if (e.errorCode === 0)
                this.setState({isLoggedIn: false});
        }});
    }

    getJWT() {
        window.gigya.accounts.getJWT({callback: e => {
            if (e.errorCode === 0)
                this.setState({jwt: e.id_token});
        }});
    }

    profile() {
        window.gigya.accounts.showScreenSet({screenSet: 'Default-ProfileUpdate'});
    }
    
    // Binding onClick events to necessary function
    handleLoginClick = (e) => {
        e.preventDefault()
        this.login();
    }
    
    handleLogoutClick = (e) => {
        e.preventDefault()
        this.logout();
    }

    handleProfileClick = (e) => {
        e.preventDefault()
        this.profile();
    }
    
    // Render the view with condition
    render() {
        
        // Assign the state to local variables
        const
            isLoggedIn = this.state.isLoggedIn,
            name = this.state.name;
        
        // Define empty variables
        let button,
            jwt,
            code;
        
        // Conditional statement to check the session status
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
            jwt = this.state.jwt;
            code = <div className="centralise"><h4 className="centralise">JSON Web Token (id_token):</h4><small className="centralise">This is the JWT of the logged in user.</small><blockquote><pre><code>{jwt}</code></pre></blockquote></div>;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
            jwt = "";
            code = <section></section>;
        }
        
        // Header view
        return (
            <header className="App-header">
                <img src={sap} alt="logo"></img>
                <div id="screenset"></div>
                <div className="authentication">
                    <Greeting name={name} isLoggedIn={isLoggedIn} />
                    <ProfileButton isLoggedIn={isLoggedIn} onClick={this.handleProfileClick} />
                    {button}
                </div>
                {code}
            </header>
        )
    }
}

export default Header;
