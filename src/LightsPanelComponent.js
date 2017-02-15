import React from 'react';
import SwitchesComponent from './SwitchesComponent';
import ConsoleComponent from './ConsoleComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HekluBottomNavigation from './HekluBottomNavigation';

const LightsPanelComponent = () => (
  <div>
    <MuiThemeProvider >
    <div>
      <ConsoleComponent /> 
      <SwitchesComponent />         
    </div>
     
    </MuiThemeProvider>
    <div >
      <HekluBottomNavigation />        
    </div>  
	</div>
);

export default LightsPanelComponent;


