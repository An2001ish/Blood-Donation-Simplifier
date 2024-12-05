import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/login';
import Register from "./components/auth/register";
import DonorDashboard from './dashboard/DonorDashboard';
import HospitalDashboard from './dashboard/HospitalDashboard';
import AdminDashboard from './dashboard/AdminDashboard';
import OrganizationDashboard from './dashboard/OrganizationDashboard';
import PrivateRoute from './components/common/PrivateRoute';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/donor" component={DonorDashboard} />
          <PrivateRoute path="/hospital" component={HospitalDashboard} />
          <PrivateRoute path="/admin" component={AdminDashboard} />
          <PrivateRoute path="/organization" component={OrganizationDashboard} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

