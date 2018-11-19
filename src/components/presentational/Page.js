import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from 'components/connected/pages/Home';
import Council from 'components/connected/pages/Council';
import Donations from 'components/connected/pages/Donations';
import History from 'components/connected/pages/History';
import President from 'components/connected/pages/President';

class Page extends Component {
    render() {
        return (<Switch>
            <Route path={`/home`} component={Home} />
            <Route path={`/history`} component={History} />
            <Route path={`/president`} component={President} />
            <Route path={`/donations`} component={Donations} />
            <Route path={`/council`} component={Council} />
            <Route path={`/donations`} component={Donations} />
        </Switch>)
  }

}

export default Page;