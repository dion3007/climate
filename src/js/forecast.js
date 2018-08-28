import React, { Component } from "react";
import axios from "axios";

const URL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Jakarta&mode=json&units=metric&cnt=5&APPID=481e3bc28e5264e5607c2b65b449bfc1";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    var _this = this;
    axios.get(URL)
    .then(function(res){
      _this.setState({
        items: res.data.list
      });
    })
    .catch(function(e) {
      console.log("ERROR ", e);
    })
  }

  render() {

    const day = this.state.items.map(function(list, i) {
      var test = list.temp.day;
      return <p key={i}>{test}</p>
    });

    const variance = this.state.items.map(function(list, i) {
      return <p key={i}>{list.temp.max-list.temp.min}</p>
    });

    const datesa = this.state.items.map(function(list, i) {
        var date = new Date(list.dt*1000);
        var days = date.getDay();
        var month = date.getMonth();
        var year = date.getFullYear();
        var final = days + '-' + month + '-' + year;
    return <p key={i}>{final}</p>
    });

    return (
    <table>
        <tr>
        <th>Jakarta</th>
        <th>Temperatur</th>
        <th>Variance</th>
        </tr>
        <tr>
        <td>{datesa}</td>
        <td>{day}</td>
        <td>{variance}</td>
        </tr>
    </table>

    );
  }
}