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

class Table extends React.Component
{
  render()
  {
    const { list, pattern, onDismiss } = this.props;

    return (
      list.filter(
        filterByTerm(pattern)
      )
      .map(
        (item) =>
        <div key={ item.objectID }>
          <span> <a href={ item.url }>{ item.title }</a> </span>
          <span>{ item.author }</span>
          <span>{ item.num_comments }</span>
          <span>{ item.points }</span>
          <span>
            <Button onClick={ () => onDismiss(item.objectID) }>
              Dismiss
            </Button>
          </span>
        </div>
      )
    );
  }
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
      <div className="App">
        <Search value={searchTerm} onChange={this.onSearchChange}>
          Search
        </Search>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss}></Table>
      </div>
    );
  }
}

export default App;
