import React, { Component } from 'react';
import axios from 'axios';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      accounting_id: '',
      password: '',
      password_confirmation: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    axios.post(
      "http://172.19.47.8:3001/registrations", {
        user: {
          name: this.state.name,
          email: this.state.email,
          accounting_id: this.state.accounting_id,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
        }
      },
      {
        withCredentials: true,
      }
    ).then( response => {
      if (response.data.status === 'created') {
        this.props.handleSuccessfulAuth(response.data);
      }
    }).catch(err => {
      console.log(err);
    });

    console.log("form submitted");
    e.preventDefault();
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input
            type='name'
            name='name'
            placeholder='name'
            value={this.state.name}
            onChange={this.handleChange}
            required
          />

          <input
            type='email'
            name='email'
            placeholder='email'
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type='accounting_id'
            name='accounting_id'
            placeholder='accounting_id'
            value={this.state.accounting_id}
            onChange={this.handleChange}
            required
          />

          <input
            type='password'
            name='password'
            placeholder='password'
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <input
            type='password'
            name='password_confirmation'
            placeholder='password_confirmation'
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <button type='submit'>Register</button>
        </form>
      </div>
    );
  }
}