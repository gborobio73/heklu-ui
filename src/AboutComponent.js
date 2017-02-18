import React from 'react';
import Paper from 'material-ui/Paper';

const styles = {
	about: { 
	},
	paper: { 		
	},	
};

class AboutComponent extends React.Component{
	constructor(props) {
	    super(props);
	    styles.about.display ='none';
  	};

  	render() {
	    return (
	    	<div style={styles.about} id="aboutPannel">			          
		        <Paper zDepth={3} style={styles.paper} className="paper-container">
		        	Welcome to Heklu.
		        </Paper>	
			</div>
		    
	    )
	}
}

export default AboutComponent;