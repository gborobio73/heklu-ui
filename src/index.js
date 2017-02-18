import injectTapEventPlugin from 'react-tap-event-plugin';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LightsPanelComponent from './LightsPanelComponent';
import AppBarComponent from './AppBarComponent';

const styles = {
  heklu:{
    //maxWidth: 680,
    // marginLeft: '25%',
    // marginRight: '25%',
  },  
};

injectTapEventPlugin();

const App = React.createClass({
  render() {
    return (
      <div style={styles.heklu} className="screen">
  	    <MuiThemeProvider >
  	  		<AppBarComponent/>		  	
  		  </MuiThemeProvider>          
        <div >
          {this.props.children}
        </div>             
      </div>
    )
  }
})

ReactDOM.render(
	<Router history={hashHistory}>
	    <Route path="/" component={App}>
	    	<IndexRoute component={LightsPanelComponent} />
	      <Route path="home" component={LightsPanelComponent} />
	    </Route>
  	</Router>
	,
  	document.getElementById('root')
);
