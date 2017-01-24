import React from 'react';
import SwitchesComponent from './SwitchesComponent';
import ConsoleComponent from './ConsoleComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  lights:{
    maxWidth: 800,
  },
  switches:{
    marginRight: 25,
  }, 
  console:{}, 
};

const LightsComponent = () => (
  <div>
    <MuiThemeProvider >
      <div style={styles.lights}>
        <SwitchesComponent style={styles.switches}/>
        <ConsoleComponent/>
      </div>
      
    </MuiThemeProvider>
	</div>
);

export default LightsComponent;


