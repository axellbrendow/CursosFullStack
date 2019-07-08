import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'; // Jest
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './index';
import Search from '../Search';
import Button from '../Button';
import Table from '../Table';
import { exportAllDeclaration } from '@babel/types';

Enzyme.configure( { adapter: new Adapter() } );

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

        ReactDOM.render(
          <Button onClick={ () => console.log('Give Me More clicked!') }>
              Give Me More
          </Button>,
           div
        );

        ReactDOM.unmountComponentAtNode(div);
      }
    );

    test('has a valid snapshot', // teste do test-renderer com snapshot
      () =>
      {
        const component = renderer.create(
          <Button onClick={ () => console.log('Give Me More clicked!') }>
              Give Me More
          </Button>
        );

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

        ReactDOM.render(
          <Table list={list} onDismiss={ () => console.log('Dismiss!') }/>,
          div
        );

        ReactDOM.unmountComponentAtNode(div);
      }
    );

    test('has a valid snapshot', // teste do test-renderer com snapshot
      () =>
      {
        const component = renderer.create(
          <Table list={list} onDismiss={ () => console.log('Dismiss!') }/>
        );

        const tree = component.toJSON();
        
        expect(tree).toMatchSnapshot();
      }
    );

    it('shows two items in list',
      () =>
      {
        // shallow renderiza o componente sem renderizar os componentes filhos.
        // esse é o teste de unidade, ou seja, apenas 1 componente (uma unidade).
        const element = shallow(
          <Table list={list} pattern="R"
           onDismiss={ () => console.log('Dismiss!') }/>
        );
        
        expect( element.find('.table-row').length ).toBe(2);
      }
    );

    /*
    Existem outros dois métodos de renderização além do shallow:
    - mount()
    - render()

    Ambos renderizam os filhos do componente. A diferença entre mount() e render()
    é que mount() dá acesso aos métodos de ciclo de vida do componente e render
    não.
    */
  }
);
