import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const styles = {
    errorbar: {
      
    },    
};

class ErrorBarComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state ={
      open: this.props.open, 
      message:this.props.message
    }    
  }
  
  componentDidMount() {         
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {
    this.state ={
      open: nextProps.open, 
      message:nextProps.message
    }
  }

  handleErrorBarClose (event){
    this.setState({
      open: false, 
      message: '',
    });
  };

  handleActionTouchTap = () => {
    this.setState({
       open: false, 
       message: '',
    });
    location.reload();
  };

  render() {
    return (
    <div>
      <Snackbar
          open={this.state.open}
          message={this.state.message}
          action="refresh"
          onRequestClose={(event)=>this.handleErrorBarClose(event)}
          onActionTouchTap={this.handleActionTouchTap}
          style={styles.errorbar}
        />  
    </div>     
      
    )
  }
}

export default ErrorBarComponent;