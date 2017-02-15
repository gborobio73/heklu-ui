import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
const aboutIcon = <FontIcon className="material-icons">contact_mail</FontIcon>;

const styles = {
	about: { 
	},
	navbar: {
      position: 'fixed',
      bottom:0,
      left:0,
      width: '100%',  
      zIndex: 99,
    },
};

const AboutComponent = () => (
    <MuiThemeProvider >
    	<div>
        <div style={styles.about}>
          <h4>Welcome to Heklu.</h4>
        </div>	
        <Paper zDepth={3} style={styles.navbar} className="navbar-screen">
            <BottomNavigation selectedIndex={0}>
              <BottomNavigationItem
                label="About"
                icon={aboutIcon}                
              />
            </BottomNavigation>
          </Paper>
          </div>
     </MuiThemeProvider>
);

export default AboutComponent;