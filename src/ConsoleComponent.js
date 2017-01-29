import React from 'react';
import Paper from 'material-ui/Paper';

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
class ConsoleComponent extends React.Component{

  constructor(props) {
    super(props);
    this.state = {console: '$ connected.\r\n$ 197.345.6.234 turn switch 1 ON\r\n'};
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