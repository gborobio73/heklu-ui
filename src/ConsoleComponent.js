import React from 'react';
//import RaisedButton from 'material-ui/RaisedButton';
//import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';

const styles = {
  	console: {
  		float: "right",
  		width: "59%",
  	},
  	paper: {
	  	paddingLeft: 10,
	  	paddingRight: 10,
	  	paddingTop: 10,
	  	paddingBottom: 10,
	},
};

const ConsoleComponent = () => (
	<div style={styles.console}>		
		<Paper style={styles.paper} zDepth={3} >
	    	Something happened
	    </Paper>
	</div>

);

export default ConsoleComponent;