import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { hashHistory } from 'react-router';
import MediaQuery from 'react-responsive';

const switchesIcon = <FontIcon className="material-icons">lightbulb_outline</FontIcon>;
const consoleIcon = <FontIcon className="material-icons">speaker_notes</FontIcon>;
const aboutIcon = <FontIcon className="material-icons">contact_mail</FontIcon>;

const styles = {
    navbar: {
      position: 'fixed',
      bottom:0,
      left:0,
      width: '100%',
      maxWidth: 680,
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
          hashHistory.push('/lights');
          break;
      case 1:
          hashHistory.push('/console');
          break;
      case 2:
          hashHistory.push('/about');
          break;
      default:
          break;
    }
    
  }

  render() {
    return (      
        <MuiThemeProvider >
          <Paper zDepth={3} style={styles.navbar}>
            <BottomNavigation selectedIndex={this.state.selectedIndex} >
              <BottomNavigationItem
                label="Switches"
                icon={switchesIcon}
                onTouchTap={() => this.handleTouchTap(0)}
              />
              <MediaQuery maxWidth={641}>
                <BottomNavigationItem
                  label="Console"
                  icon={consoleIcon}
                  onTouchTap={() => this.handleTouchTap(1)}
                />
              </MediaQuery>              
              <BottomNavigationItem
                label="About"
                icon={aboutIcon}                
                onTouchTap={() => this.handleTouchTap(2)}
              />
            </BottomNavigation>
          </Paper>
        </MuiThemeProvider >      
    );
  }
}

export default HekluBottomNavigation;