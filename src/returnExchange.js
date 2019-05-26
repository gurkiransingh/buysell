import React from 'react';
import Axios from 'axios';
import ItemsList from './itemsList';
import Modal from 'react-responsive-modal';

class ReturnExchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            currentIndex: -1,
            items: [],
            selectedItemToReturn: null,
            open: false,
            orderItems: null
        }
        this.items = [];

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.markAsReturn = this.markAsReturn.bind(this);
    }

    markAsReturn() {
        Axios.post('/markAsReturn', {item: this.state.selectedItemToReturn})
            .then((res) =>{
                console.log(res);
                if(res.data === true) {
                    this.fetchDetails();
                }
            })
    }

    onCloseModal (){
        this.setState({ open: false });
        };

    handleChange(i) {
        this.setState({
            currentIndex: i
          });
    }

    handleSelect(id) {
        this.setState({
            selectedItemToReturn: id,
            open: true
        })
    }

    fetchDetails() {
        Axios.post('/getItemDetails', {items: this.props.itemsBought})
        .then((res) => {
            console.log(res);
            this.setState({
                items: res.data,
                open: false
            })
        })
    }


    componentDidMount() {
        this.fetchDetails();
    }

    render() {
        return (
                <div className={'returns-container ' + (this.state.loader ? 'fade' : '')}>
                {
                    this.state.loader ? (<div className='spinner spinner-1'></div>) : null
                }
                    <div className='accordion'>
                        {
                            this.state.items.map((item, i) => (
                                <ItemsList 
                                    question={item.name}
                                    answer={item}
                                    handleChange={this.handleChange.bind(this, i)}
                                    key={i}
                                    index={i}
                                    currentIndex={this.state.currentIndex}
                                    handleSelect = {this.handleSelect.bind(this)}
                                />
                            ))
                        }
                    </div>
                    <Modal open={this.state.open} onClose={this.onCloseModal} center>
                        <div className='return-modal-container'>
                            <p>Here to display instrutions about the return policy or other info</p>
                            <div>
                                <button onClick={this.markAsReturn}>Yes</button>
                                <button onClick={() => this.setState({open: false})}>No</button>
                            </div>
                        </div>
                        <div>{this.state.selectedItemToReturn}</div>
                  </Modal>
                </div>
        )
    }
}

export default ReturnExchange;