import React from 'react';
import Axios from 'axios';
import ReactTooltip from 'react-tooltip';

class UpdateInfo extends React.Component {
    constructor(props) {
        super(props);

        this.handleAddr1 = this.handleAddr1.bind(this);
        this.handleAddr2 = this.handleAddr2.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleState = this.handleState.bind(this);
        this.handleZip = this.handleZip.bind(this);
        this.enablePersonal = this.enablePersonal.bind(this);
        this.enableAddress = this.enableAddress.bind(this);
        this.landmark = this.landmark.bind(this);
        this.handlePersonalChanges = this.handlePersonalChanges.bind(this);
        this.handleAddressChanges = this.handleAddressChanges.bind(this);
        this.toggleForm = this.toggleForm.bind(this);

        this.state = {
            personal : this.props.pInfo,
            address: this.props.aInfo,
            disablePersonal: true,
            loader: false,
            showAdd: false,
            addresses: [
                {
                    address: 'Gurkiran Singh Randhawa, Gali behari da depot chander nagar batala 143505',
                    default: true
                },
                {
                    address: 'Gurkiran Singh Randhawa, Gali behari da depot chander nagar batala 143505',
                    default: false
                }
            ]
        }
    }

    componentDidMount() {
    }

    toggleForm() {
        let state = this.state.showAdd;
        this.setState({
            showAdd: !state
        })
    }

    handleAddr1(e) {
        var obj = Object.assign({}, this.state.address);
        obj.addr1 = e.target.value;
        this.setState({
            address: obj
        })
    }
    handleAddr2(e) {
        var obj = Object.assign({}, this.state.address);
        obj.addr2 = e.target.value;
        this.setState({
            address: obj
        })
    }
    handleCity(e) {
        var obj = Object.assign({}, this.state.address);
        obj.city = e.target.value;
        this.setState({
            address: obj
        })
    }
    handleEmail(e) {
        var obj = Object.assign({}, this.state.personal);
        obj.email = e.target.value;
        this.setState({
            personal: obj
        })
    }
    handleFirstName(e) {
        var obj = Object.assign({}, this.state.personal);
        obj.firstName = e.target.value;
        this.setState({
            personal: obj
        })
    }
    handleLastName(e) {
        var obj = Object.assign({}, this.state.personal);
        obj.lastName = e.target.value;
        this.setState({
            personal: obj
        })
    }
    landmark(e) {
        var obj = Object.assign({}, this.state.address);
        obj.landmark = e.target.value;
        this.setState({
            adderss: obj
        })
    }
    handlePhone(e) {
        var obj = Object.assign({}, this.state.personal);
        obj.number = e.target.value;
        this.setState({
            personal: obj
        })
    }
    handleState(e) {
        var obj = Object.assign({}, this.state.address);
        obj.state = e.target.value;
        this.setState({
            address: obj
        })
    }
    handleZip(e){
        var obj = Object.assign({}, this.state.address);
        obj.zip = e.target.value;
        this.setState({
            address: obj
        })
    }

    handlePersonalChanges() {
        this.setState({
            disablePersonal: true,
            loader: true
        })
        Axios.post('/changePersonalChanges', {personal: this.state.personal, userId: this.props.match.params.id})
            .then((res) => {
                this.setState({
                    loader: false
                })
                let obj = {
                    firstName: res.data.firstname,
                    lastName: res.data.lastname,
                    email: res.data.email,
                    number: res.data.phone
                }
                this.setState({ 
                    personal: obj
                })
                this.props.getUserInfo(true);
            })
    }

    handleAddressChanges() {
        this.setState({
            disableAddress: true,
            loader: true
        });

        Axios.post('/changeAddressChanges', {address: this.state.address, userId: this.props.match.params.id})
            .then((res) => {
                this.setState({
                    loader: false
                })
                let obj = {
                    addr1: res.data.addr1,
                    addr2: res.data.addr2,
                    city: res.data.city,
                    state: res.data.state,
                    zip: res.data.zip
                }
                this.setState({
                    adderss: obj
                })
                this.props.getUserInfo(true);
            })
    }

    enablePersonal() {
            this.setState({
                disablePersonal: false
            })
        }

    enableAddress() {
        this.setState({
            disableAddress: false
        })
    }

    render() {
        return (
            <div className={'update-info-container' + (this.state.loader ? 'fade' : '')}>
            {
                this.state.loader ? (<div className='spinner spinner-1'></div>) : null
            }
                <h2 className='main-header'>Update your info</h2>
                <div className='container'>
                    <div>
                        <div className='header'>
                             <i className="fas fa-info"></i><span>Personal</span>
                        </div>
                        <div className='personal'>
                            <div className='pair'> 
                                <label htmlFor='firstName'>First Name</label>
                                <input type='text' onChange={this.handleFirstName}  value={this.state.personal.firstName} disabled={this.state.disablePersonal}/></div>                   
                            <div className='pair'>
                                <label htmlFor='lastName'>Last Name</label>
                                <input type='text' onChange={this.handleLastName} value={this.state.personal.lastName} disabled={this.state.disablePersonal}/>
                            </div>
                            <div className='pair'>
                                <label htmlFor='email'>E-mail</label>
                                <input type='email' onChange={this.handleEmail} value={this.state.personal.email}  disabled={this.state.disablePersonal}/>
                            </div>
                            <div className='pair'>
                                <label htmlFor='number'>Phone Number</label>
                                <input type='text' onChange={this.handlePhone} value={this.state.personal.number}  disabled={this.state.disablePersonal}/>
                            </div>
                            {
                            this.state.disablePersonal ? 
                                (<button className='edit' onClick={this.enablePersonal}>Edit</button>) :
                                 (<button className='save' onClick={this.handlePersonalChanges}>Save Changes</button>)
                            }

                        </div>
                    </div>
                    <div>
                        <div className='header'>
                        <i className="fa fa-address-card" aria-hidden="true"></i><span>Mailing Address</span>
                        </div>
                        <div className='address'>
                            <div className='container'> 
                                <div data-tip data-for='addAddress' className='add-address' onClick={this.toggleForm}><i class="fa fa-plus-circle" aria-hidden="true"></i>
                                <ReactTooltip id='addAddress' type='info' effect='float'>
                                  <span>Add another address</span>
                                </ReactTooltip>
                                </div>
                            { this.state.showAdd &&
                            (<div className='form'>
                                <div className='pair'>
                                    <label htmlFor='address1'>Address 1</label>
                                    <input type='text' onChange={this.handleAddr1} value={this.state.address.addr1 || ''} disabled={this.state.disableAddress}/>
                                </div>
                                <div className='pair'>
                                    <label htmlFor='address2'>Address 2</label>
                                    <input type='text' onChange={this.handleAddr2} value={this.state.address.addr2 || ''} disabled={this.state.disableAddress}/>
                                </div>
                                <div className='pair'>
                                    <label htmlFor='landmark'>Lankmark</label>
                                    <input type='text' onChange={this.landmark} value={this.state.address.landmark || ''} disabled={this.state.disableAddress}/>
                                </div>
                                <div className='pair'>
                                    <label htmlFor='city'>City</label>
                                    <input type='text' onChange={this.handleCity} value={this.state.address.city || ''} disabled={this.state.disableAddress}/>
                                </div>
                                <div className='pair'>
                                    <label htmlFor='state'>State</label>
                                    <input type='text' onChange={this.handleState} value={this.state.address.state || ''} disabled={this.state.disableAddress}/>
                                </div>
                                <div className='pair'>
                                    <label htmlFor='zip'>ZIP/Postal Code</label>
                                    <input type='text' onChange={this.handleZip} value={this.state.address.zip || ''} disabled={this.state.disableAddress}/>
                                </div>
                                <button className='save' onClick={this.handleAddressChanges}>Add</button>
                             </div>)
                            }
                            {
                                this.state.addresses.map((v,i) => {
                                    return (
                                        <div className='addresses' key={i}>
                                            <div className='value'>
                                              <span>{i+1}</span><span>{v.address}</span>
                                            </div>
                                            <div className='def'>
                                            {
                                                v.default ? (<span>Default</span>) : ( <span>Make Default</span>)
                                            }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateInfo;