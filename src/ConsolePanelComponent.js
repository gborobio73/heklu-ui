import React from 'react';
import ConsoleComponent from './ConsoleComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MediaQuery from 'react-responsive';
import SwitchesComponent from './SwitchesComponent';

const styles = {
  panel:{
    maxWidth: 800,
  },   
  consoleLandscape: {
      float: 'right',
      width: '58%',       
  }, 
  consolePortrait: {
      float: 'right',
      width: '100%',
      marginBottom: 60,
  }, 
  lights: {
    marginRight: 25,
    float: "left",
    width: "38%",
    maxWidth: 250,
    marginBottom: 60,
  },
};

const ConsolePanelComponent = () => (
  <div>
    <MuiThemeProvider >
      <div style={styles.panel}>
        <MediaQuery minWidth={640}>
          <div style={styles.lights}><SwitchesComponent /></div>
        </MediaQuery>                      
        <MediaQuery minWidth={640}>
          {(matches) => {
            if (matches) { //landscape
              return <div style={styles.consoleLandscape} ><ConsoleComponent /></div> ;
            } else { //portrait
              return <div style={styles.consolePortrait}><ConsoleComponent/> </div>;
            }     
          }}
        </MediaQuery>
      </div>
      
    </MuiThemeProvider>
	</div>
);

export default ConsolePanelComponent;


