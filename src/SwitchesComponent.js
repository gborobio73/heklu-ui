import React from 'react';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import ErrorBarComponent from './ErrorBarComponent.js';
import Stomp from 'stompjs';

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

var stompClient;
//var url ='https://agent.electricimp.com/SmkBeMW_hTdc';
var url ='/switch';

class SwitchesComponent extends React.Component {

  constructor(props) {
    super(props);

    console.log("Switches component.");
    
    this.state = {switches: []};
    var switches =[];
    for (var i = 0; i <9; i++) {
      switches[i] = false;
    };
    this.state = {
      switches: switches, 
      errorBar: {
        open: false, 
        message:''
      },      
    };
    this.connectToTopic();
  }

  processSwitchMessage (message) {
    var newSwitchState = JSON.parse(message.body);
    var id = (newSwitchState.index === -1) ? 8 : newSwitchState.index 
    this.setSwitchTo(id, newSwitchState.state);
  }

  resolveTopicHost(){
    var protocol = (document.location.protocol === "http:") ? "ws:": "wss:";
    var port = (window.location.hostname === 'localhost') ? ':8080': '';
    return protocol +'//' + window.location.hostname + port + '/heklu-websocket';
  }

  connectClient(stompClient){
    var self = this;
    stompClient.connect({}, 
      function (frame) {
        stompClient.subscribe('/topic/switches', function (message) {
            self.processSwitchMessage(message);
        });
        stompClient.subscribe('/topic/heartbeat', function (message) {
            console.log("Received "+message.body);
        });
      }, 
      function(message) {
        console.log(message);
        self.showErrorWithText('Disconnected.');
      });
  }

  connectToTopic(){
    var host = this.resolveTopicHost();
    var socket = new WebSocket(host);
    stompClient = Stomp.over(socket);
    this.connectClient(stompClient);
  }
  
  componentDidMount() {    
    var self= this;
    fetch(url)
      .then(function(response) {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(function(response) { 
          var all = self.calculateAllToggle(response);
          response.push(all);
          self.setState({switches: response});          
      })
      .catch(function(error) {
        self.showErrorWithText(error.message);
      });
  }

  componentWillUnmount() {
    if(stompClient !== null && stompClient !== undefined)  stompClient.disconnect();
  }

  calculateAllToggle(switches){
    if (switches.slice(0, 8).some((element, index, array)=> element === false)) {
      return false;       
    }
    return true;      
  }

  setSwitchTo(id, newState){
    if(this.state.switches[id] !== newState){
      var switches = this.state.switches.slice() //new copy;    
      switches[id]= newState;
      if(parseInt(id, 10) === 8){
        for (var i = 0; i <switches.length; i++) {
          switches[i] = newState;
        };
        this.setState({switches: switches});
      }
      else{
        switches[8] = this.calculateAllToggle(switches);
        this.setState({switches: switches});
      }      
    }          
  }

  parseErrorMessage(request){
    try{
      var error = JSON.parse(request.responseText);
      return error.message;
    }catch(e){
      return "Snap! Something went wrong."
    }
  }

  showError(request){
    this.showErrorWithText(this.parseErrorMessage(request));
  }  

  showErrorWithText(text){
    this.setState({
      errorBar: {open: true, message: text},
    });
  }

  handleToggle (event){
    var self= this; 
    var id = event.target.getAttribute('data-id');
    var newState = !self.state.switches[id];
    self.setSwitchTo(id, newState);    
    var index = (parseInt(id,10) === 8) ? -1: id;    
    var req = { index : parseInt(index, 10), state: newState};
    fetch( url, {
      method: 'POST',
      body: JSON.stringify(req),      
    }).then(function(response) {
        if(response.ok) {
          return response;
        }
        throw new Error('Network response was not ok.');
      })
      .then(function(response) { 
        stompClient.send("/app/send", {}, JSON.stringify(req));
      })
      .catch(function(error) {
        self.showErrorWithText(error.message );
        self.setSwitchTo(id, !newState);        
      }); 
  } 

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
              style={styles.switch}
              data-id={8} 
              toggled={this.state.switches[8]}
              onToggle={(event)=>this.handleToggle(event)}
            />  
          </div>          
        </Paper>        
        <ErrorBarComponent
          open={this.state.errorBar.open}
          message={this.state.errorBar.message}          
        />
      </div>  

    )
  }
}

export default SwitchesComponent;