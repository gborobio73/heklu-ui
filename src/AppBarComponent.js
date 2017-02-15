import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router';

const styles = {
  app_bar: {
    marginBottom: 10,
  },
};

const LightsMenu = (props) => (
  
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Home" containerElement={<Link to="/home" />} />
    <MenuItem primaryText="About" containerElement={<Link to="/about" />} />
  </IconMenu>
);

LightsMenu.muiName = 'IconMenu';
/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class AppBarComponent extends Component {
  state = {
    logged: true,
  };

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  render() {
    return (
      <div>
        <AppBar
          title="Heklu  "
          style={styles.app_bar}
          //iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          showMenuIconButton={false}
          iconElementRight={<LightsMenu />}
        />        
      </div>
    );
  }
}

export default AppBarComponent;