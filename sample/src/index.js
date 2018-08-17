import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import RealTimeApp from './RealTimeApp';
// import App from './App';
import PlayGround from './PlayGround';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<RealTimeApp />, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<PlayGround />, document.getElementById('root'));
registerServiceWorker();
