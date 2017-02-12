import React from 'react';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import Stomp from 'stompjs';

const styles = {
  	paper: {
	  	paddingLeft: 10,
	  	paddingRight: 10,
	  	paddingTop: 10,
	  	paddingBottom: 10,
	},
	console:{
		height: 345,
    	width: '100%',
    	resize: 'none',
    	border: 'none',
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
    currentConsole = currentConsole + '\r\n$ > ' + message;
    this.setState({console: currentConsole});
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
	        self.writeMessageToConsole('connected'); 
	        stompClient.subscribe('/topic/console', function (message) {
	          var theMessage =JSON.parse(message.body).string;
            self.writeMessageToConsole(theMessage);                
        	});
          stompClient.subscribe('/topic/heartbeat', function (message) {
             console.log("Received "+message.body);
          });
    	},function(message) {
          console.log(message);
        	self.showErrorWithText('Disconnected; please refresh the page.');
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
  handleErrorBarClose (event){
    this.setState({
      errorBar: {open: false, message: ''},
    });
  };

  render() {
    return (      
        <div >		
			<Paper style={styles.paper} zDepth={3} >
				<textarea ref="console" style={styles.console} readOnly value={this.state.console}>
				</textarea>
			</Paper>
			<Snackbar
	          open={this.state.errorBar.open}
	          message={this.state.errorBar.message}
	          autoHideDuration={7000}
	          onRequestClose={(event)=>this.handleErrorBarClose(event)}
	        />
		</div>     
    );
  }

}
export default ConsoleComponent;