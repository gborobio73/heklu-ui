import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory } from 'react-router'

const recentsIcon = <FontIcon className="material-icons">lightbulb_outline</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">speaker_notes</FontIcon>;
const aboutIcon = <FontIcon className="material-icons">contact_mail</FontIcon>;

const styles = {
    navbar: {
      position: 'fixed',
      bottom:0,
      left:0,
      width: '100%'
    },    
};
class HekluBottomNavigation extends Component {
  constructor() {
    super();
  }
  state = {
    selectedIndex: 0,
  };

  handleTouchTap = (index) =>{    
    this.setState({selectedIndex: index})
    switch(index) {
      case 0:
          browserHistory.push('/lights');
          break;
      case 1:
          //browserHistory.push('/console');
          break;
      case 2:
          browserHistory.push('/about');
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
                label="Lights"
                icon={recentsIcon}
                onTouchTap={() => this.handleTouchTap(0)}
              />
              <BottomNavigationItem
                label="Console"
                icon={favoritesIcon}
                onTouchTap={() => this.handleTouchTap(1)}
              />
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