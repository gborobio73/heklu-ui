import React from 'react';
import SwitchesComponent from './SwitchesComponent';
import ConsoleComponent from './ConsoleComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MediaQuery from 'react-responsive';

const styles = {
  panel:{
    //maxWidth: 800,
  },
  lights: {
    marginRight: 25,
    float: "left",
    width: "28%",
    maxWidth: 250,
    marginBottom: 60,
  },
  lightsPortrait: {
    marginRight: 25,
    float: "left",
    width: "100%",
    marginBottom: 60,
  },
  switches:{
    marginRight: 25,
  }, 
  console: {
    float: 'right',
    width: '68%',
    marginBottom: 60,
  }, 
};

const LightsPanelComponent = () => (
  <div>
    <MuiThemeProvider >
      <div style={styles.panel}>
        <MediaQuery minWidth={640}>
          {(matches) => {
            if (matches) { //landscape
              return <div style={styles.lights} ><SwitchesComponent /></div> ;
            } else { //portrait
              return <div style={styles.lightsPortrait}><SwitchesComponent/> </div>;
            }     
          }}
        </MediaQuery>
        <MediaQuery minWidth={641}>
          <div style={styles.console}><ConsoleComponent/> </div>
        </MediaQuery>
      </div>      
    </MuiThemeProvider>
	</div>
);

export default LightsPanelComponent;


