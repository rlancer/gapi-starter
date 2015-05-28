'use strict'

var React = require('react');
var actions = require('../shared.js').actions;
var emitter = actions.emitter;
var googleApiLoader = require('../actions/GoogleAPILoader');


module.exports = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {
        var _this = this;

        googleApiLoader.authLoaded(function () {
            _this.setState({authLoaded: true});

            googleApiLoader.getAuth2().currentUser.listen(function (user) {
                _this.setState({finishedLoading: true});
                _this.setState({isLoggedIn: user.getBasicProfile() ? true : false});
                if (user.getBasicProfile()) {
                    var profile = user.getBasicProfile();
                    var profileProxy = {};
                    profileProxy.id = profile.getId();
                    profileProxy.name = profile.getName();
                    profileProxy.thumb = profile.getImageUrl();
                    profileProxy.email = profile.getEmail();
                    _this.setState({loggedInUser: profileProxy});
                }
            });
        });

        googleApiLoader.clientsLoaded(function () {
            _this.setState({clientsLoaded: true});
        });
    },
    toggleSignIn: function () {
        if (!googleApiLoader.getAuth2().isSignedIn.get())
            googleApiLoader.getAuth2().signIn();
    },
    render: function () {

        var loggedInUserThumb = null;

        if (this.state.loggedInUser)
            loggedInUserThumb = <img src={this.state.loggedInUser.thumb} />

        var toggleLoginButton = <button onClick={this.toggleSignIn}>Login to Google</button>

        if (this.state.finishedLoading) {

            if (this.state.isLoggedIn) {
                return <div>{loggedInUserThumb}</div>
            }
            else
                return toggleLoginButton;
        }
        else {
            return <div>Loading</div>
        }
    }
});
