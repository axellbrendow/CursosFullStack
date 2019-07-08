import React from 'react';
import Button from '../Button';

// O React vem com um checador de tipos embutido: PropTypes.
import PropTypes from 'prop-types';

function filterByTerm(searchTerm)
{
  return (item) =>
  {
    let include = false;

    if (searchTerm && item && item.title)
    {
      include = item.title.toLocaleLowerCase()
        .includes( searchTerm.toLocaleLowerCase() );
    }

    return include;
  };
}

export default function Table({ list, pattern, onDismiss })
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
          <tr key={ item.objectID } className="table-row">
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

Table.propTypes =
{
  list: PropTypes.arrayOf(
    PropTypes.shape(
      {
        objectID: PropTypes.number.isRequired,
        author: PropTypes.string,
        url: PropTypes.string,
        num_comments: PropTypes.number,
        points: PropTypes.number
      }
    )
  ).isRequired,

  onDismiss: PropTypes.func.isRequired
};