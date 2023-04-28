import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import ProductLists from '../pages/ProductLists';
import ShowOrders from '../pages/ShowOrders';
import ShowUsers from '../pages/ShowUsers';



if (document.getElementById('productsList')) {
    ReactDOM.render(<ProductLists />, document.getElementById('productsList'));
}

if (document.getElementById('showorders')) {
    ReactDOM.render(<ShowOrders />, document.getElementById('showorders'));
}

if (document.getElementById('showusers')) {
    ReactDOM.render(<ShowUsers />, document.getElementById('showusers'));
}