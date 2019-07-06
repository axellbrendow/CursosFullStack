import React from 'react';

export default class Button extends React.Component {
    render() {
      const { onClick, className = '', children, } = this.props;
  
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
  