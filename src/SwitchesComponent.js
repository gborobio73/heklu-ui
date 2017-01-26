import React from 'react';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import $ from 'jquery'; 

const styles = {
  lights: {
    float: "left",
  	width: "39%",
  	maxWidth: 250,
  },
  toggle: {
    marginBottom: 32,
  },
  paper: {
  	paddingLeft: 10,
  	paddingRight: 10,
  	paddingTop: 10,
  	paddingBottom: 10,
  	
  },
  switches: {
  	//maxWidth: 100,
  	//display: "block",
  	//marginLeft: "auto",
  	//marginRight: "auto",
  },
  
};
var backend='';
if (window.location.port === '3000') {
  backend ='http://localhost:8080';
}
/*
state:
switches: array of 8 positions, indicating tru or false
*/
class SwitchesComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {switches: []};
    var switches =[];
    for (var i = 0; i <8; i++) {
      switches[i] = false;
    }
    this.state = {switches: switches, all: false};
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

  handleToggle (event){
    var id = event.target.getAttribute('data-id');
    var switches = this.state.switches.slice() //new copy;
    var newState = !this.state.switches[id];
    switches [id]= newState;
    this.setState({switches: switches});
    if (switches.some((element, index, array)=> element === false)) {
      this.setState({ all: false });
    }
    var switchNum = parseInt(id)+1;
    console.log('toggling '+ newState +' switch #' + switchNum);  
    $.ajax({
      url: backend + '/switch/set',
      type: 'PUT',
      data: JSON.stringify({'id': id, 'state': newState}),       
      contentType: 'application/json',
      success: function(response) { 
        console.log(JSON.stringify(response));         
      },
      error: function(request, status, error) {
        //TODO: set to previous state? 
        console.log('Status: ' + JSON.stringify(status) ); 
        console.log('Error: ' +JSON.stringify(request) ); 
      }
    });
     
  } 

  handleToggleAll (event){
    var newState = !this.state.all;
    this.setState({all: newState});
    console.log('toggling all to'+ newState );  
    var switches = this.state.switches.slice();
    for (var i = 0; i <8; i++) {
      switches[i] = newState;
    }
    this.setState({switches: switches});
    $.ajax({
      url: backend + '/switch/set',
      type: 'PUT',
      data: JSON.stringify({'id': -1, 'state': newState}),       
      contentType: 'application/json',
      success: function(response) { 
        console.log(JSON.stringify(response));         
      },
      error: function(request, status, error) {
        //TODO: set to previous state? 
        console.log('Status: ' + JSON.stringify(status) ); 
        console.log('Error: ' +JSON.stringify(request) ); 
      }
    });
  } 

  render() {
    return (
        <div style={styles.lights}>
        <Paper style={styles.paper} zDepth={3} >
          <div style={styles.switches}>
            <Toggle label="One" 
              data-id={0} 
              toggled={this.state.switches[0]}
              onToggle={(event)=>this.handleToggle(event)}
            />
            <Toggle label="Two" 
              data-id={1} 
              toggled={this.state.switches[1]}
              onToggle={(event)=>this.handleToggle(event)}
            />
            <Toggle label="Three" 
              data-id={2} 
              toggled={this.state.switches[2]}
              onToggle={(event)=>this.handleToggle(event)}
            />
            <Toggle label="Four" 
              data-id={3} 
              toggled={this.state.switches[3]}
              onToggle={(event)=>this.handleToggle(event)}
            />
            <Toggle label="Five" 
              data-id={4} 
              toggled={this.state.switches[4]}
              onToggle={(event)=>this.handleToggle(event)}
            />
            <Toggle label="Six" 
              data-id={5} 
              toggled={this.state.switches[5]}
              onToggle={(event)=>this.handleToggle(event)}
            />
            <Toggle label="Seven" 
              data-id={6} 
              toggled={this.state.switches[6]}
              onToggle={(event)=>this.handleToggle(event)}
            />
            <Toggle label="Eight" 
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
      </div>  
    )
  }
}

export default SwitchesComponent;