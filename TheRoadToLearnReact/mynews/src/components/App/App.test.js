import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from '.';
import Search from '../Search';
import Button from '../Button';
import Table from '../Table';
import { exportAllDeclaration } from '@babel/types';

describe('App',
  () =>
  {
    it('renders without crashing', // teste simples do componente
      () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
      }
    );

    test('has a valid snapshot', // teste do test-renderer com snapshot
      () =>
      {
        const component = renderer.create( <App/> );
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
      }
    );
  }
);

describe('Search',
  () =>
  {
    it('renders without crashing', // teste simples do componente
      () => {
        const div = document.createElement('div');
        ReactDOM.render(<Search>Search</Search>, div);
        ReactDOM.unmountComponentAtNode(div);
      }
    );

    test('has a valid snapshot', // teste do test-renderer com snapshot
      () =>
      {
        const component = renderer.create( <Search>Search</Search> );
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
      }
    );
  }
);

describe('Button',
  () =>
  {
    it('renders without crashing', // teste simples do componente
      () => {
        const div = document.createElement('div');
        ReactDOM.render(<Button>Give Me More</Button>, div);
        ReactDOM.unmountComponentAtNode(div);
      }
    );

    test('has a valid snapshot', // teste do test-renderer com snapshot
      () =>
      {
        const component = renderer.create( <Button>Give Me More</Button> );
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
      }
    );
  }
);

describe('Table',
  () =>
  {
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

    it('renders without crashing', // teste simples do componente
      () => {
        const div = document.createElement('div');
        ReactDOM.render(<Table list={list}/>, div);
        ReactDOM.unmountComponentAtNode(div);
      }
    );

    test('has a valid snapshot', // teste do test-renderer com snapshot
      () =>
      {
        const component = renderer.create( <Table list={list}/> );
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();
      }
    );
  }
);
