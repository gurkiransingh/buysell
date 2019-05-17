import React from 'react';
import Axios from 'axios';
import ReactTooltip from 'react-tooltip';
import { toast } from 'react-toastify';
import AddressList from './addressList';
import Modal from 'react-responsive-modal';

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
        this.addAddress = this.addAddress.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.fName = this.fName.bind(this);
        this.lName = this.lName.bind(this);
        this.handleChange = this.handleChange.bind(this);   
        this.fNameEdit = this.fNameEdit.bind(this);
        this.lNameEdit = this.lNameEdit.bind(this);
        this.landmarkEdit = this.landmarkEdit.bind(this);
        this.addr1Edit = this.addr1Edit.bind(this);
        this.addr2Edit = this.addr2Edit.bind(this);
        this.cityEdit = this.cityEdit.bind(this);
        this.stateEdit = this.stateEdit.bind(this);
        this.zipEdit = this.zipEdit.bind(this);
        this.submitEdittedAddress = this.submitEdittedAddress.bind(this);
        this.makeDefault = this.makeDefault.bind(this);

        this.state = {
            personal : this.props.pInfo,
            disablePersonal: true,
            loader: false,
            showAdd: false,
            addresses: [
                {
                    firstname: '',
                    lastname: '',
                    addr1: '',
                    addr2: '',
                    landmark: '',
                    city: '',
                    state: '',
                    zip: '',
                    default: false
                }
            ],
            addressToAdd: {
                fName: '',
                lName: '',
                addr1: '',
                addr2: '',
                landmark: '',
                city: '',
                state: '',
                zip: ''
            },
            currentIndex: -1,
            open: false,
            addressToEdit: {
                fName: '',
                lName: '',
                addr1: '',
                addr2: '',
                landmark: '',
                city: '',
                state: '',
                zip: '',
                index: null
            }
        }

        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);

    }

    onOpenModal(info) {
        this.setState({ 
            open: true,
            addressToEdit: info
        });
      };
     
    onCloseModal (){
    this.setState({ open: false });
    };

    componentDidMount() {
        this.setState({
            loader: true
        })
        Axios.post('http://localhost:5000/getAddresses', {userId: this.props.match.params.id})
            .then((res) => {
                this.setState({
                    addresses: res.data
                })
                this.setState({
                    loader: false
                })
            })

    }

    toggleForm() {
        let state = this.state.showAdd;
        this.setState({
            showAdd: !state
        })
    }

    handleAddr1(e) {
        this.setState({
            addressToAdd: Object.assign(this.state.addressToAdd, { addr1: e.target.value })
        })
    }
    handleAddr2(e) {
        this.setState({
            addressToAdd: Object.assign(this.state.addressToAdd, { addr2: e.target.value })
        })
    }
    handleCity(e) {
        this.setState({
            addressToAdd: Object.assign(this.state.addressToAdd, { city: e.target.value })
        })
    }
    landmark(e) {
        this.setState({
            addressToAdd: Object.assign(this.state.addressToAdd, { landmark: e.target.value })
        })
    }
    handleState(e) {
        this.setState({
            addressToAdd: Object.assign(this.state.addressToAdd, { state: e.target.value })
        })
    }
    handleZip(e){
        this.setState({
            addressToAdd: Object.assign(this.state.addressToAdd, { zip: e.target.value })
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
    handlePhone(e) {
        var obj = Object.assign({}, this.state.personal);
        obj.number = e.target.value;
        this.setState({
            personal: obj
        })
    }

    fName(e) {
        this.setState({
            addressToAdd: Object.assign(this.state.addressToAdd, { fName: e.target.value })
        })
    }

    lName(e) {
        this.setState({
            addressToAdd: Object.assign(this.state.addressToAdd, { lName: e.target.value })
        })
    }

    fNameEdit(e) {
        this.setState({
            addressToEdit: Object.assign(this.state.addressToEdit, { fName: e.target.value })
        })
    }

    lNameEdit(e) {
        this.setState({
            addressToEdit: Object.assign(this.state.addressToEdit, { lName: e.target.value })
        })
    }

    addr1Edit(e) {
        this.setState({
            addressToEdit: Object.assign(this.state.addressToEdit, { addr1: e.target.value })
        })
    }

    addr2Edit(e) {
        this.setState({
            addressToEdit: Object.assign(this.state.addressToEdit, { addr2: e.target.value })
        })
    }

    landmarkEdit(e) {
        this.setState({
            addressToEdit: Object.assign(this.state.addressToEdit, { landmark: e.target.value })
        })
    }

    cityEdit(e) {
        this.setState({
            addressToEdit: Object.assign(this.state.addressToEdit, { city: e.target.value })
        })
    }

    stateEdit(e) {
        this.setState({
            addressToEdit: Object.assign(this.state.addressToEdit, { state: e.target.value })
        })
    }

    zipEdit(e) {
        this.setState({
            addressToEdit: Object.assign(this.state.addressToEdit, { zip: e.target.value })
        })
    }

    handleChange(i) {
        this.setState({
          currentIndex: i
        });
      };


      makeDefault(index) {
          console.log(index);
        this.setState({
            loader: true
        })
        Axios.post('http://localhost:5000/makeDeafult', {index: index, userId: this.props.match.params.id})
            .then((res) => {
                this.setState({
                    loader: false,
                    addresses: res.data
                })
            })
      }

    handlePersonalChanges() {
        this.setState({
            disablePersonal: true,
            loader: true
        })
        Axios.post('http://localhost:5000/changePersonalChanges', {personal: this.state.personal, userId: this.props.match.params.id})
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
                }, () => {
                    return toast.success('Changes changed successfully !', {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                })
                this.props.getUserInfo(true);
            })
    }

    addAddress() {
        this.setState({
            disableAddress: true,
            loader: true
        });

        Axios.post('http://localhost:5000/addAddress', {address: this.state.addressToAdd, userId: this.props.match.params.id})
            .then((res) => {
                this.setState({
                    loader: false
                })
                this.setState({
                    addresses: res.data
                })
                this.props.getUserInfo(true);
            })
    }

    submitEdittedAddress() {
        this.setState({
            loader: true
        });

        Axios.post('http://localhost:5000/editAddress', {address: this.state.addressToEdit, userId: this.props.match.params.id})
            .then((res) => {
                this.setState({
                    loader: false
                })
                this.setState({
                    addresses: res.data
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
        const { currentIndex } = this.state;

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
                                <div className='add-address'><i data-tip data-for='addAddress' onClick={this.toggleForm} className="fa fa-plus-circle" aria-hidden="true"></i>
                                <ReactTooltip id='addAddress' type='info' effect='float'>
                                  <span>Add another address</span>
                                </ReactTooltip>
                                </div>
                            { this.state.showAdd &&
                            (<div className='form'>
                                <div className='pair'>
                                    <label htmlFor='fName'>First Name</label>
                                    <input type='text' onChange={this.fName} value={this.state.addressToAdd.fName || ''} disabled={this.state.disableAddress}/>
                                </div>
                                <div className='pair'>
                                    <label htmlFor='lName'>Last Name</label>
                                    <input type='text' onChange={this.lName} value={this.state.addressToAdd.lName || ''} disabled={this.state.disableAddress}/>
                                </div>
                                <div className='pair'>
                                    <label htmlFor='address1'>Address 1</label>
                                    <input type='text' onChange={this.handleAddr1} value={this.state.addressToAdd.addr1 || ''} disabled={this.state.disableAddress}/>
                                </div>
                                <div className='pair'>
                                    <label htmlFor='address2'>Address 2</label>
                                    <input type='text' onChange={this.handleAddr2} value={this.state.addressToAdd.addr2 || ''} disabled={this.state.disableAddress}/>
                                </div>
                                <div className='pair'>
                                    <label htmlFor='landmark'>Lankmark</label>
                                    <input type='text' onChange={this.landmark} value={this.state.addressToAdd.landmark || ''} disabled={this.state.disableAddress}/>
                                </div>
                                <div className='pair'>
                                    <label htmlFor='city'>City</label>
                                    <input type='text' onChange={this.handleCity} value={this.state.addressToAdd.city || ''} disabled={this.state.disableAddress}/>
                                </div>
                                <div className='pair'>
                                    <label htmlFor='state'>State</label>
                                    <input type='text' onChange={this.handleState} value={this.state.addressToAdd.state || ''} disabled={this.state.disableAddress}/>
                                </div>
                                <div className='pair'>
                                    <label htmlFor='zip'>ZIP/Postal Code</label>
                                    <input type='text' onChange={this.handleZip} value={this.state.addressToAdd.zip || ''} disabled={this.state.disableAddress}/>
                                </div>
                                <button className='save' onClick={this.addAddress}>Add</button>
                             </div>)
                            }
                            <div className='accordion'>
                            {   
                                this.state.addresses.map((v,i) => {
                                    let header = `${v.lastname}, ${v.firstname}`;
                                    return <AddressList
                                        header={header}
                                        firstname={v.firstname}
                                        lastname={v.lastname}
                                        addr1={v.addr1}
                                        addr2={v.addr2}
                                        landmark={v.landmark}
                                        city={v.city}
                                        state={v.state}
                                        zip={v.zip}
                                        default={v.default}
                                        makeDefault={this.makeDefault.bind(this)}
                                        handleChange={this.handleChange.bind(this, i)}
                                        key={i}
                                        index={i}
                                        currentIndex={currentIndex}
                                        onOpenModal={this.onOpenModal.bind(this)}
                                    />
                                })
                            }
                            </div>
                            <div>
                                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                                <div className='modal-address-form'>
                                    <div className='pair'>
                                        <label htmlFor='fName'>First Name</label>
                                        <input type='text'  onChange={this.fNameEdit} value={this.state.addressToEdit.fName || ''}/>
                                    </div>
                                    <div className='pair'>
                                        <label htmlFor='lName'>Last Name</label>
                                        <input type='text'  onChange={this.lNameEdit} value={this.state.addressToEdit.lName || ''}/>
                                    </div>
                                    <div className='pair'>
                                        <label htmlFor='address1'>Address 1</label>
                                        <input type='text'  onChange={this.addr1Edit} value={this.state.addressToEdit.addr1 || ''}/>
                                    </div>
                                    <div className='pair'>
                                        <label htmlFor='address2'>Address 2</label>
                                        <input type='text'  onChange={this.addr2Edit} value={this.state.addressToEdit.addr2 || ''}/>
                                    </div>
                                    <div className='pair'>
                                        <label htmlFor='landmark'>Lankmark</label>
                                        <input type='text'  onChange={this.landmarkEdit} value={this.state.addressToEdit.landmark || ''}/>
                                    </div>
                                    <div className='pair'>
                                        <label htmlFor='city'>City</label>
                                        <input type='text'  onChange={this.cityEdit} value={this.state.addressToEdit.city || ''}/>
                                    </div>
                                    <div className='pair'>
                                        <label htmlFor='state'>State</label>
                                        <input type='text' onChange={this.stateEdit} value={this.state.addressToEdit.state || ''}/>
                                    </div>
                                    <div className='pair'>
                                        <label htmlFor='zip'>ZIP</label>
                                        <input type='text'  onChange={this.zipEdit} value={this.state.addressToEdit.zip || ''}/>
                                    </div>
                                    <button className='save' onClick={this.submitEdittedAddress}><span>Save</span></button>
                                </div>
                                </Modal>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateInfo;


