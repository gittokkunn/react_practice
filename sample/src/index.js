import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import RealTimeApp from './RealTimeApp';
// import PlayGround from './PlayGround';
import PlayGround_2 from './PlayGround_2';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<RealTimeApp />, document.getElementById('root'));
// ReactDOM.render(<PlayGround />, document.getElementById('root'));
ReactDOM.render(<PlayGround_2 />, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));


registerServiceWorker();
