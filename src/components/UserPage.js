import React, { Component } from 'react';
import axios from 'axios';
import '../../src/App.css';
// import Table from './Table.js';


class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      things: [
        {
          name: '',
          number: '',
          person: '',
          completed: false
        }
      ]
    }
  }

  getThings = function () {
    axios({
        url: '/picnic-planner',
        method: 'GET'
    }).then(function (response) {
        let tasks = response.data;
        console.log('line 13: tasks:', tasks);
    }).catch(function (error) {
        console.log('line 15: GET request error', error);
    });
  };
        componentDidMount(){
          this.getThings();
        }
 
  
  handleChangeFor = propertyName => (event) => {
    this.setState({
      ...this.state,
      ...this.state.things,
      [propertyName]: event.target.value,
    })
  };

  render() {
    let thingList = this.state.things.map((thing, index) => {
      return (
        <tr key="index">
          <td>
            {thing.name}
          </td>
          <td>
            {thing.number}
          </td>
          <td>
            {thing.person}
          </td>
        </tr>
      )
    })
console.log('state', this.state);
    
return (
      
      <div>
        <form id="formDiv">
          <input type="text" placeholder="add thing" onSubmit={this.handleChangeFor('name')}/>
          <input type="text" placeholder="how many?" onSubmit={this.handleChangeFor('number')}/>
          <input type="text" placeholder="who" onSubmit={this.handleChangeFor('person')}/>
          <input type="submit" name="submit" value="go" onClick={this.addThing}/>
        </form>
        {/* <Table /> */}
        <table>
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
          <tbody>
            {thingList}
          </tbody>
        </table>
      
      </div>
     
    );
  }
}

export default UserPage;