import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import RealTimeApp from './RealTimeApp';
import PlayGround from './PlayGround';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<RealTimeApp />, document.getElementById('root'));
ReactDOM.render(<PlayGround />, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));


registerServiceWorker();
