import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDeleteClick(e) {
        this.props.deleteAccount();
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;
        const currHour = new Date().getHours();

        let dashboardContent;
        let welcomeMsg;

        if (currHour >= 12 && currHour < 18) {
            welcomeMsg = (
                "Good Afternoon!! "
            )
        } else if (currHour >= 18) {
            welcomeMsg = (
                "Good Evening!! "
            )
        } else {
            welcomeMsg = (
                "Good Morning!! "
            )
        }

        if (profile === null || loading) {
            dashboardContent = <Spinner />;
        } else {
            // Check if logged in user has profile data
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            <Link to={`/profile/${profile.handle}`}>
                                <button type="button" class="btn btn-outline-link">{welcomeMsg}{user.name}</button>
                            </Link>
                            <Link to="/edit-profile" className="btn btn-light float-right">
                                <i className="fas fa-user mr-2" />
                                Edit Profile
                            </Link>
                            <br />
                            <button
                                onClick={this.onDeleteClick.bind(this)}
                                className="btn btn-danger float-right"
                            >
                                Delete My Account
                            </button>
                        </p>
                    </div>
                );
            } else {
                // User is logged in but has no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>You have not setup your profile yet...</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">
                            Create Profile
                        </Link>
                    </div>
                );
            }
        }

        return (
            <div className="dashboard padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
    Dashboard
);
