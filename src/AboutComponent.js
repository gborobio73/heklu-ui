import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
	about: { 
	},
};

const AboutComponent = () => (
    <MuiThemeProvider >
        <div style={styles.about}>
          <h3>Welcome to Lights.</h3>
        </div>	
     </MuiThemeProvider>
);

export default AboutComponent;