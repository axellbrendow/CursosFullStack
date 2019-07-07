import React from 'react';
import Button from '../Button';

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
