import React from 'react';
import Paper from 'material-ui/Paper';
import ErrorBarComponent from './ErrorBarComponent.js';
import Stomp from 'stompjs';

const styles = {
	paper: {
  	paddingLeft: 10,
  	paddingRight: 10,
  	paddingTop: 10,
  	paddingBottom: 10,
    color: 'rgb(0, 187, 9)',
    //color: '#1ff042',
    letterSpacing: '0.12em',
    textShadow: '0 0 2px rgba(1, 210, 36, 0.75)',   
    background: 'black',
	},
	console:{
		height: 370,
  	width: '100%',
  	resize: 'none',
  	//border: '2px solid',
    border: 'none',
    whiteSpace: 'pre-wrap',
    overflow: 'overlay',
    fontSize: '0.7em',
	}

};

var stompClient;

class ConsoleComponent extends React.Component{

  constructor(props) {
    super(props);
    
    console.log("Console component.");

    this.state = {
		console: '', 
		errorBar: {
	        open: false, 
	        message:''
      	}
      };
  }

  writeMessageToConsole(message){
    var currentConsole = this.state.console;
    //currentConsole = currentConsole.slice(0, -1) + message + '\r\n$ > _' ; 
    currentConsole = currentConsole+ '\r\n[heklu ~]$ ' + message ; 
    this.setState({console: currentConsole});
    //this.refs.console.innerHtml= 'aaaa';
    this.refs.console.scrollTop = this.refs.console.scrollHeight;
  }

  componentDidMount() {
  	var self = this;       
    var protocol = (document.location.protocol === "http:") ? "ws:": "wss:";
    var port = (window.location.hostname === 'localhost') ? ':8080': '';
    var socket = new WebSocket(protocol +'//' + window.location.hostname + port + '/heklu-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, 
    	function (frame) {
	        self.writeMessageToConsole('Connected.'); 
	        stompClient.subscribe('/topic/console', function (message) {
	          var theMessage =JSON.parse(message.body).string;
            self.writeMessageToConsole(theMessage);                
        	});
          stompClient.subscribe('/topic/heartbeat', function (message) {
             console.log("Received "+message.body);
          });
    	},function(message) {
          console.log(message);
          self.writeMessageToConsole("Connection lost.");
        	self.showErrorWithText('Disconnected.');
      	});
  }

  componentWillUnmount() {
  	if(stompClient !== null) stompClient.disconnect();
  }
	
  showErrorWithText(text){
    this.setState({
      errorBar: {open: true, message: text},
    });
  }
  render() {
    return (      
        <div >		
			<Paper style={styles.paper} zDepth={3} >
				{/*<textarea ref="console" style={styles.console} readOnly value={this.state.console}>
				</textarea>*/}
        <div ref="console" style={styles.console} >        
          <span>{this.state.console}</span><br/>
          <span>[heklu ~]$ </span><span className="blink">_</span> <span className="cursor"> </span>
        </div>
			</Paper>
			<ErrorBarComponent
          open={this.state.errorBar.open}
          message={this.state.errorBar.message}          
        />
		</div>     
    );
  }

}
export default ConsoleComponent;