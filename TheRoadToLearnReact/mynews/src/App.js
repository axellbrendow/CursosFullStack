import React from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HITS_PER_PAGE = 100;

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

let url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}&${PARAM_HPP}${DEFAULT_HITS_PER_PAGE}`;

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

function Search({ value, onChange, onSubmit, children })
{
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange}></input>
      <Button type="submit">
        { children }
      </Button>
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
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Number of comments</th>
          <th>Points</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
      {
        list.filter(
          filterByTerm(pattern)
        )
        .map(
          (item) =>
          <tr key={ item.objectID }>
            <td style={ largeColumn }>
              <a href={ item.url }>{ item.title }</a>
            </td>
            <td style={ midColumn }>{ item.author }</td>
            <td style={ smallColumn }>{ item.num_comments }</td>
            <td style={ smallColumn }>{ item.points }</td>
            <td style={ smallColumn }>
              <Button onClick={ () => onDismiss(item.objectID) }
                className="button-inline">
                Dismiss
              </Button>
            </td>
          </tr>
        )
      }
      </tbody>
    </table>
  );
}

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  setSearchTopStories(result)
  {
    const { hits, page } = result;
    
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [ ...oldHits, ...hits ];
    
    this.setState({ result: { hits: updatedHits, page } });
  }

  fetchSearchTopStories(searchTerm, page = 0)
  {
    url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HITS_PER_PAGE}`;

    fetch(url).then((response) => response.json())
      .then((json) => this.setSearchTopStories(json))
      .catch(error => error);
  }
  
  componentDidMount()
  {
    const { searchTerm } = this.state;
    
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss(id)
  {
    const updatedList = this.state.result.hits.filter(
      (item) => item.objectID != id
    );

    this.setState(
      {
        // No create-react-app, o operador de spread ... cria uma cópia das propriedades do objeto
        result: { ...this.state.result, hits: updatedList }
      }
    );
  }

  onSearchChange(event)
  {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event)
  {
    const { searchTerm } = this.state;
    
    this.fetchSearchTopStories(searchTerm);
    
    event.preventDefault();
  }
  
  render()
  {
    const {result, searchTerm} = this.state;
    const page = (result && result.page) || 0;
    let element = null;

    if (result)
    {
      element = (
        <div className="page">
          <div className="interactions"> 
            <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
              Search
            </Search>
          </div>
          {
            result ?
            <Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss}></Table> : null
          }
          <div className="interactions"> 
            <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
              more
            </Button>
          </div>
        </div>
      );
    }

    return element;
  }
}

export default App;
