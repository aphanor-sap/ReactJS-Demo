import React from 'react';

// React CSS stylesheet
import './App.css';

// Different view components
import Body from './components/body';
import Header from './components/header';

function App() {
    return (
        <div className="App">
            <Header />
            <Body company="SAP Customer Data Cloud" />
        </div>
    );
}

export default App;
