import React from 'react';

// O React vem com um checador de tipos embutido: PropTypes.
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  render() {
    const { onClick, className, children } = this.props;
    
    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  className: ''
};