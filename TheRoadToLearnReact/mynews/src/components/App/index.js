import React from 'react';
import axios from 'axios';

// O React vem com um checador de tipos embutido: PropTypes.
import PropTypes from 'prop-types';

// import React from '../../../node_modules/react';
// import axios from '../../../node_modules/axios';
import Button from '../Button';
import Search from '../Search';
import Table from '../Table';
import logo from '../../logo.svg';
import './index.css';

import {
  DEFAULT_QUERY,
  DEFAULT_HITS_PER_PAGE,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
} from '../../constants';
import {Link} from "react-router-dom";

let url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}&${PARAM_HPP}${DEFAULT_HITS_PER_PAGE}`;

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY
    };

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  needsToSearchTopStories(searchTerm)
  {
    return !this.state.results[searchTerm];
  }
  
  setSearchTopStories(result)
  {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    
    const oldHits = (results && results[searchKey]) ? results[searchKey].hits : [];
    const updatedHits = [ ...oldHits, ...hits ];
    
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  fetchSearchTopStories(searchTerm, page = 0)
  {
    url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HITS_PER_PAGE}`;

    axios(url).then( (result) => this.setSearchTopStories(result.data) )
      .catch( (error) => this.setState( { error } ) );
  }
  
  componentDidMount()
  {
    const { searchTerm } = this.state;
    
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss(id)
  {
    const { results, searchKey } = this.state;
    const { hits, page } = results[searchKey];
    
    const updatedList = hits.filter(
      (item) => item.objectID !== id
    );

    this.setState(
      {
        // No create-react-app, o operador de spread ... cria uma cópia das propriedades do objeto
        results: {
          ...results,
          [searchKey]: { hits: updatedList, page }
        }
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
    
    this.setState({ searchKey: searchTerm });
    
    if (this.needsToSearchTopStories(searchTerm))
    {
      this.fetchSearchTopStories(searchTerm);
    }
    
    event.preventDefault();
  }
  
  render()
  {
    const { searchTerm, results, searchKey, error } = this.state;
    const resultsForCurrentKey = results && results[searchKey];
    
    const page = (
      resultsForCurrentKey && results[searchKey].page
    ) || 0;
    
    const list = (
      resultsForCurrentKey && results[searchKey].hits
    ) || [];
    
    let element = null;

    if (resultsForCurrentKey)
    {
      element = (
        <div className="page">
          <div className="interactions"> 
            <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
              Search
            </Search>
            <Link to={"/about"}>About</Link>
          </div>
          
          {
            error ?
            <p>Something went wrong.</p> :
            <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss}/>
          }
          
          <div className="interactions"> 
            <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
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

export {
  Button,
  Search,
  Table
};