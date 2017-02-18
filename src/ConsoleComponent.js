import React from 'react';
import Paper from 'material-ui/Paper';
import Stomp from 'stompjs';

const styles = {
  consolePannel:{
    //display: 'none'
  },
	paper: {
    color: 'rgb(0, 187, 9)',
    letterSpacing: '0.12em',
    textShadow: '0 0 2px rgba(1, 210, 36, 0.75)',   
    background: 'black',
    margin: '0 5px 0 5px',
    display: 'flex',
	},
	console:{		

  	width: '100%',
  	resize: 'none',
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
    this.state = {
  		console: '', 
  		errorBar: {
  	        open: false, 
  	        message:''
        	}
    };

    styles.consolePannel.display ='none';
  }

  writeMessageToConsole(message){
    var currentConsole = this.state.console;
    currentConsole = currentConsole+ '\r\n[heklu ~]$ ' + message ; 
    this.setState({console: currentConsole});
    this.refs.console.scrollTop = this.refs.console.scrollHeight;
  }

  reconnect(){
    if(stompClient === null || stompClient === undefined || !stompClient.connected){
      this.connectToTopic();
    }
  }

  componentDidMount() {
  	this.connectToTopic();
    //this.interval = setInterval(() => this.reconnect(), 5000);
  };

  connectToTopic(){
    var protocol = (document.location.protocol === "http:") ? "ws:": "wss:";
    var port = (window.location.hostname === 'localhost') ? ':8080': '';
    var socket = new WebSocket(protocol +'//' + window.location.hostname + port + '/heklu-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, 
      (frame) => {
          this.writeMessageToConsole('Connected.'); 
          stompClient.subscribe('/topic/console',  (message)=> {
            var theMessage =JSON.parse(message.body).string;     
            this.writeMessageToConsole(theMessage);       
          });
          stompClient.subscribe('/topic/heartbeat',  (message)=> {
             console.log("Received "+message.body);
          });
      },(message) =>{
          console.log(message);
          this.writeMessageToConsole("Connection lost.");
          this.showErrorWithText('Disconnected.');
        });
  }

  componentWillUnmount() {
  	if(stompClient !== null) stompClient.disconnect();
  }
	
  showErrorWithText(text){
    this.props.onError(text);
  }
  render() {
    return (      
      <div style={styles.consolePannel} id="consolePannel">		
  			<Paper style={styles.paper} className="paper-container" zDepth={3} >
  				<div ref="console" style={styles.console} >        
            <span>{this.state.console}</span><br/>
            <span>[heklu ~]$ </span><span className="blink">_</span>
          </div>
  			</Paper>
		</div>     
    );
  }
}

export default ConsoleComponent;