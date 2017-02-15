import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import $ from "jquery";

const switchesIcon = <FontIcon className="material-icons">lightbulb_outline</FontIcon>;
const consoleIcon = <FontIcon className="material-icons">speaker_notes</FontIcon>;

const styles = {
    navbar: {
      position: 'fixed',
      bottom:0,
      left:0,
      width: '100%',  
      zIndex: 99,
    },    
};
class HekluBottomNavigation extends Component {
  state = {
    selectedIndex: 0,
  };

  handleTouchTap = (index) =>{    
    this.setState({selectedIndex: index})
    switch(index) {
      case 0:
          $( "#switchesPannel" ).show();
          $( "#consolePannel" ).hide();
          break;
      case 1:
          $( "#switchesPannel" ).hide();
          $( "#consolePannel" ).show();
          break;
      default:
          break;
    }    
  }

  render() {
    return (      
      <div >
        <MuiThemeProvider >
          <Paper zDepth={3} style={styles.navbar} className="navbar-screen">
            <BottomNavigation selectedIndex={this.state.selectedIndex} >
              <BottomNavigationItem
                label="Switches"
                icon={switchesIcon}
                onTouchTap={() => this.handleTouchTap(0)}
              />
              <BottomNavigationItem
                  label="Console"
                  icon={consoleIcon}
                  onTouchTap={() => this.handleTouchTap(1)}
              />
            </BottomNavigation>
          </Paper>
        </MuiThemeProvider >      
      </div>
    );
  }
}

export default HekluBottomNavigation;