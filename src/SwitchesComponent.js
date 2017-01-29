import React from 'react';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import Snackbar from 'material-ui/Snackbar';

import $ from 'jquery'; 

const styles = {  
  toggle: {
    marginBottom: 32,
  },
  paper: {
  	paddingLeft: 10,
  	paddingRight: 10,
  	paddingTop: 10,
  	paddingBottom: 10,
  	
  },
  switch: {
    marginBottom: 15,
  },
  
};
var backend='';
if (window.location.port === '3000') {
  backend ='http://localhost:8080';
}

class SwitchesComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {switches: []};
    var switches =[];
    for (var i = 0; i <8; i++) {
      switches[i] = false;
    }
    this.state = {
      switches: switches, 
      all: false, 
      errorBar: {
        open: false, 
        message:''
      }
    }
  }

  componentDidMount() {
    $.ajax({
        url: backend+'/switch',
        type: 'GET',        
        success: function(response) { 
          console.log(JSON.stringify(response)); 
        }
    });
  }

  togglleAllTo(newState){
    console.log('toggling all to '+ newState );  
    var switches = this.state.switches.slice();
    for (var i = 0; i <8; i++) {
      switches[i] = newState;
    }
    this.setState({switches: switches});
    this.setState({all: newState});
  }

  setSwitchTo(id, newState){
    var switches = this.state.switches.slice() //new copy;    
    switches[id]= newState;
    this.setState({switches: switches});
    if (switches.some((element, index, array)=> element === false)) {
      this.setState({ all: false });
    }
    if (switches.every((element, index, array)=> element === true)) {
      this.setState({ all: true });
    }
  }

  parseErrorMessage(request){
    try{
      var error = JSON.parse(request.responseText);
      return error.message;
    }catch(e){
      return "Snap! Something went wrong. Refresh page."
    }
  }

  showError(request){
    this.setState({
      errorBar: {open: true, message: this.parseErrorMessage(request)},
    });
  }

  handleToggle (event){
    var id = event.target.getAttribute('data-id');
    var newState = !this.state.switches[id];
    this.setSwitchTo(id, newState);
    var self= this;
    $.ajax({
      url: backend + '/switch/set',
      type: 'PUT',
      data: JSON.stringify({'id': id, 'state': newState}),       
      contentType: 'application/json',
      success: function(response) { 
        console.log(JSON.stringify(response));         
      },
      error: function(request, status, error) {
        self.setSwitchTo(id, !newState);
        self.showError(request);              
      }
    });
     
  } 

  handleToggleAll (event){
    var newState = !this.state.all;
    this.togglleAllTo(newState)
    var self= this;
    $.ajax({
      url: backend + '/switch/set',
      type: 'PUT',
      data: JSON.stringify({'id': -1, 'state': newState}),       
      contentType: 'application/json',
      success: function(response) { 
        console.log(JSON.stringify(response));         
      },
      error: function(request, status, error) {
        self.togglleAllTo(!newState);  
        self.showError(request);              
      }
    });
  } 

  handleErrorBarClose (event){
    this.setState({
      errorBar: {open: false, message: ''},
    });
  };

  render() {
    return (
      <div >
        <Paper style={styles.paper} zDepth={3} >
          <div >
            <Toggle label="One" 
              style={styles.switch}
              data-id={0} 
              toggled={this.state.switches[0]}
              onToggle={(event)=>this.handleToggle(event)}
            />
            <Toggle label="Two" 
              style={styles.switch}
              data-id={1} 
              toggled={this.state.switches[1]}
              onToggle={(event)=>this.handleToggle(event)}
            />
            <Toggle label="Three" 
              style={styles.switch}
              data-id={2} 
              toggled={this.state.switches[2]}
              onToggle={(event)=>this.handleToggle(event)}
            />
            <Toggle label="Four" 
              style={styles.switch}
              data-id={3} 
              toggled={this.state.switches[3]}
              onToggle={(event)=>this.handleToggle(event)}
            />
            <Toggle label="Five" 
              style={styles.switch}
              data-id={4} 
              toggled={this.state.switches[4]}
              onToggle={(event)=>this.handleToggle(event)}
            />
            <Toggle label="Six" 
              style={styles.switch}
              data-id={5} 
              toggled={this.state.switches[5]}
              onToggle={(event)=>this.handleToggle(event)}
            />
            <Toggle label="Seven" 
              style={styles.switch}
              data-id={6} 
              toggled={this.state.switches[6]}
              onToggle={(event)=>this.handleToggle(event)}
            />
            <Toggle label="Eight" 
              style={styles.switch}
              data-id={7} 
              toggled={this.state.switches[7]}
              onToggle={(event)=>this.handleToggle(event)}
            /> 
            <br/>
            <Toggle label="All" 
              data-id={-1} 
              toggled={this.state.all}
              onToggle={(event)=>this.handleToggleAll(event)}
            />  
          </div>          
        </Paper>        
        <Snackbar
          open={this.state.errorBar.open}
          message={this.state.errorBar.message}
          autoHideDuration={7000}
          onRequestClose={(event)=>this.handleErrorBarClose(event)}
        />
      </div>  

    )
  }
}

export default SwitchesComponent;