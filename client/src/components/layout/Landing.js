import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'
import LandingDock from './LandingDock'
import { isMobile } from 'react-device-detect'
import { Canvas } from 'react-three-fiber'
import Lights from './three-lights'
import Content from './three-content'

class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        let dockContent;
        if (!isMobile) {
            dockContent = (
                <div>
                    <LandingDock />
                </div>
            );
        };
        return (
            <div className="landing">
                <Canvas shadowMap camera={{ position: [0, 0, 100], fov: 100 }}>
                    <Lights />
                    <Content />
                </Canvas>
                <div className="overlay padding text-dark">
                    <div className="container">
                        <div className="row landing-msg">
                            <div className="center col-md-12 text-center">
                                <h1 className="display-4">Developers Collaboration Platform
                                </h1>
                                <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers or simply collaborate with them</p>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
                {dockContent}
            </div>
        )
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);
