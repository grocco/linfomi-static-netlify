import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from 'components/version_2/connected/pages/Home';
import Council from 'components/version_2/connected/pages/Council';
import Donations from 'components/version_2/connected/pages/Donations';
import History from 'components/version_2/connected/pages/History';
import President from 'components/version_2/connected/pages/President';

class Page extends Component {

    render() {
        return (<Switch>
            <Route path={`/home`} component={Home} />
            <Route path={`/history`} component={History} />
            <Route path={`/president`} component={President} />
            <Route path={`/donations-and-contacts`} component={Donations} />
            <Route path={`/council`} component={Council} />
        </Switch>)
  }

}

export default Page;