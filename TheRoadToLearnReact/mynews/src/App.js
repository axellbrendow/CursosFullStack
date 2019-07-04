import React from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

class Button extends React.Component {
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

function Search({ value, onChange, children })
{
  return (
    <form>
      { children }
      <input type="text" value={value} onChange={onChange}></input>
    </form>
  );
}

function filterByTerm(searchTerm)
{
  return (item) => item.title.toLocaleLowerCase().includes( searchTerm.toLocaleLowerCase() );
}

function Table({ list, pattern, onDismiss })
{
  const largeColumn = { width: '40%' };
  const midColumn = { width: '30%' };
  const smallColumn = { width: '10%' };

  return (
    <div className="table">
    {
      list.filter(
        filterByTerm(pattern)
      )
      .map(
        (item) =>
        <div key={ item.objectID }>
          <span style={ largeColumn }>
            <a href={ item.url }>{ item.title }</a>
          </span>
          <span style={ midColumn }>{ item.author }</span>
          <span style={ smallColumn }>{ item.num_comments }</span>
          <span style={ smallColumn }>{ item.points }</span>
          <span style={ smallColumn }>
            <Button onClick={ () => onDismiss(item.objectID) }
              className="button-inline">
              Dismiss
            </Button>
          </span>
        </div>
      )
    }
    </div>
  );
}

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      list: list,
      searchTerm: ''
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id)
  {
    const updatedList = this.state.list.filter(
      (item) => item.objectID != id
    );

    this.setState({ list: updatedList });
  }

  onSearchChange(event)
  {
    this.setState({ searchTerm: event.target.value });
  }

  render()
  {
    const {list, searchTerm} = this.state;

    return (
      <div className="page">
      	<div className="interactions"> 
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
          <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss}></Table>
      </div>
    );
  }
}

export default App;
