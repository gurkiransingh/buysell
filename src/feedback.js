import React from 'react';

class Feedback extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='feedback-container'>
                <div className='feedback'>
                    <p className='title'>Help us improve !</p>
                    <div className='persuation'>
                        E nondimeno fragilita come giudice in il. Priegano non tanto nome procuratore come impermutabile sue, fallo essaudisce manifestamente mentre che come. Noi noi prieghi novellare uomini i a ripararci. Ammirabile in se priegano in nostra ancora incominciare verso suo. Potremmo discenda quegli la piú, viviamo come una da cosa cominciamento..
                    </div>
                    <div className='form'>
                        <textarea placeholder='Please type in here ...'></textarea>
                        <button><span>Submit</span></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Feedback;