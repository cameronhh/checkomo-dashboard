import React from 'react';
import PropTypes from 'prop-types';
import { matchPath, withRouter } from 'react-router';
import { Anchor } from 'grommet';

// A simple component that shows the pathname of the current location
class RoutedAnchor extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
  };

  onClick = (event) => {
    const { history, path } = this.props;
    event.preventDefault();
    history.push(path);
  };

  render() {
    const { active, exact, match, location, history, path, strict, ...rest } = this.props;
    const pathMatch = matchPath(location.pathname, { exact, path, strict });
    return <Anchor active={active && !!pathMatch} onClick={this.onClick} {...rest} />;
  }
}

export default withRouter(RoutedAnchor);
