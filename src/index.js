import injectTapEventPlugin from 'react-tap-event-plugin';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LightsPanelComponent from './LightsPanelComponent';
import ConsolePanelComponent from './ConsolePanelComponent';
import AppBarComponent from './AppBarComponent';
import AboutComponent from './AboutComponent';
import HekluBottomNavigation from './HekluBottomNavigation';

// import App from './App';
// import './index.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

/*const App = () => (
	<MuiThemeProvider >
  		<div>
	  		<AppBarComponent/>
	  		<SwitchesComponent/>
	  		<ConsoleComponent/>
	  	</div>
	</MuiThemeProvider>
);*/

const App = React.createClass({
  render() {
    return (
      <div>
  	    <MuiThemeProvider >
  	  		<AppBarComponent/>		  	
  		  </MuiThemeProvider>
          
        {/* change the <a>s to <Link>s */}
        {/*<ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>*/}

        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
        
        <HekluBottomNavigation/>        
      </div>
    )
  }
})

ReactDOM.render(
	<Router history={hashHistory}>
	    <Route path="/" component={App}>
	    	<IndexRoute component={LightsPanelComponent} />
	      <Route path="lights" component={LightsPanelComponent} />
	      <Route path="about" component={AboutComponent} />	      
	      <Route path="console" component={ConsolePanelComponent} />
	    </Route>
  	</Router>
	,
  	document.getElementById('root')
);
