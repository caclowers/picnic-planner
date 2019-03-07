import React, { Component } from 'react';
import '../../src/App.css';



class Table extends Component {

  render() {

    return (
        <thead>
          <tr>
          <th>
            <p>What?</p>
          </th>
          <th>
            <p>How Many?</p>
          </th>
          <th>
            <p>Got it?</p>
          </th>
        </tr>
        </thead>
    );
  }
}

export default Table;