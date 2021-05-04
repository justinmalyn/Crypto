import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
//import Alert from '../layout/Alert';
import Dashboard from '../../components/dashboard/Dashboard';
import Charts from '../../components/charts/Charts';
import PrivateRoute from '../routing/PrivateRoute';
import Coin from '../charts/Coin';

const Routes = () => {
    return(
        <section className='container'>
	        {/* <Alert /> */}
            <Switch>
              <Route exact path='/register' component={Register}/>
              <Route exact path='/login' component={Login}/>
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <Route exact path='/charts' component={Charts}/>
              <Route path="/currencies/:name" component={Coin} />
            </Switch>
        </section>
    )
}

export default Routes