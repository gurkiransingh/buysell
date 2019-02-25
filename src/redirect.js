import React from 'react';

class Redirect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.location.state.data
        }
    }

    componentDidMount() {
        console.log(this.props.location.state);
        let form = document.getElementById('f1');
        form.submit();
    }

    render() {
        return(
            <form method="post" action="https://securegw-stage.paytm.in/theia/processTransaction" name="f1" id='f1'> 
            {
                Object.keys(this.state.data).map(key => <input  readOnly key={key} name={key} value={this.state.data[key]} />)
            }
            </form>
        )
    }
}

export default Redirect;