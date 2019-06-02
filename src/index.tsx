import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Portfolio } from './portfolio';

ReactDOM.render(<Portfolio />, document.getElementById('portfolio'));

export function baseUrl() { return '' /*'/portfolio'*/; }
