import React from 'react';
import Paper from 'material-ui/Paper';
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
    this.state = {console: ''};

  }

  writeMessageToConsole(message){
    var currentConsole = this.state.console;
    currentConsole = currentConsole + '\r\n$ > ' + message;
    this.setState({console: currentConsole});
  }

  componentDidMount() {
  	var self = this;
    var protocol = (document.location.protocol === "http:") ? "ws:": "wss:";
    var port = (window.location.hostname === 'localhost') ? '8080': '8000';
    var socket = new WebSocket(protocol +'//' + window.location.hostname +':' +port + '/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        //console.log('Connected: ' + frame);
        self.writeMessageToConsole('connected'); 
        stompClient.subscribe('/topic/console', function (message) {
            self.writeMessageToConsole(JSON.parse(message.body).string);            
        });
    });
  }

  componentWillUnmount() {
  	if(stompClient !== null) stompClient.disconnect();
  }

  render() {
    return (      
        <div >		
		<Paper style={styles.paper} zDepth={3} >
			<textarea style={styles.console} readOnly value={this.state.console}>
			</textarea>
		</Paper>
	</div>     
    );
}

}
export default ConsoleComponent;