import React from 'react';
import SwitchesComponent from './SwitchesComponent';
import ConsoleComponent from './ConsoleComponent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HekluBottomNavigation from './HekluBottomNavigation';
import AboutComponent from './AboutComponent'
import ErrorBarComponent from './ErrorBarComponent.js';

const styles = {
  panel: { 
    marginBottom: 70
  },  
};

class LightsPanelComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorBar: {
        open: false, 
        message:''
      },      
    };
  }
  showErrorWithText(text){
    this.setState({
      errorBar: {open: true, message: text},
    });
  }
  render() {
    return (
      <div style={styles.panel} >
          <MuiThemeProvider >
          <div>
            <ConsoleComponent onError={this.showErrorWithText.bind(this)} /> 
            <SwitchesComponent onError={this.showErrorWithText.bind(this)} />   
            <AboutComponent />  
            <ErrorBarComponent
              open={this.state.errorBar.open}
              message={this.state.errorBar.message}          
            />                 
          </div>
          </MuiThemeProvider>
          <div >
            <HekluBottomNavigation />        
          </div>  
        </div> 
    )
  }
}

export default LightsPanelComponent;


