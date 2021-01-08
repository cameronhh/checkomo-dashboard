import React from 'react';
import PropTypes from 'prop-types';
import { matchPath, withRouter } from 'react-router';
import { Button } from 'grommet';

// A simple component that shows the pathname of the current location
class RoutedButton extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
  };

  onClick = (event) => {
    const { history, path } = this.props;
    event.preventDefault();
    if (this.props.setShowSidebar) {
      this.props.setShowSidebar(false); // poh tay toe
    }
    history.push(path);
  };

  render() {
    const { active, exact, match, location, history, path, strict, ...rest } = this.props;
    const pathMatch = matchPath(location.pathname, { exact, path, strict });
    return (
      <Button
        focusIndicator={false}
        active={active && !!pathMatch}
        onClick={this.onClick}
        {...rest}
      />
    );
  }
}

export default withRouter(RoutedButton);
