var React = require("react");
var ReactDOM = require("react-dom");
class MainContent extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (<div>Start Content Here</div>);
	}

}

ReactDOM.render(<MainContent />,document.getElementById("pageContent"));
