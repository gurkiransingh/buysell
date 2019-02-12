import React from 'react';
import { Route } from 'react-router-dom';
import Sell from './sell';
import Buy from './buy';
import ItemDetails from './item-details';
import Feedback from './feedback';
import Profile from "./profile";
import SubHeader from './sub-header';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props);
        if (!this.props.isLogged && !this.props.userId) {
            this.props.history.push('/login');
          }
    }
    render() {
        return (
            <div>
             <Route
                path={this.props.match.path}
                component={props => (
                <SubHeader {...props} />
                )}
              />
                <Route
                    exact path={this.props.match.path}
                    component={Profile}
                />
                <Route
                    path={`${this.props.match.path}/sell`}
                    component={Sell}
                />
                <Route
                    exact
                    path={`${this.props.match.path}/buy`}
                    component={props => (
                    <Buy {...props}  />
                    )}
                />
                <Route
                    path={`${this.props.match.path}/buy/1234`}
                    component={props => (
                    <ItemDetails {...props}/>
                    )}
                />
                <Route
                path={`${this.props.match.path}/feedback`}
                    component={Feedback}
                />
            </div>
        )
    }
}

export default UserProfile;