import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import voting from './Voting';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Mainpage from './Mainpage';



class App extends Component {

  state = {
    name: '',
    Identity: '',
    display_register: 'initial',
    display_main:'initial',
    show:'none'
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    this.setState({Identity:this.state.name});
  };

  onClickRegister = async(id) => {
    const accounts = await web3.eth.getAccounts();
    this.setState({message: 'Waiting'});
    if (this.state.name){   
      this.setState({
        display_register : "none",
        display_main : "initial",
        show:"initial"
      });
      
    }

    await voting.methods.setIdentity(id).send({
      from: accounts[0],
    });
    this.setState({message: 'Done'});
  };

  submitForm (e) {
    e.preventDefault();
    
  }
  render() {
    return (
     
      <div className="App">
        <header className="App-header">
          <h1 className="App-title1">DECENTRALIZED VOTING SYSTEM</h1>
          <h1 className="App-title">WHO IS THE MOST FAVORITE ANIME CHARACTER?</h1>
        </header>
        <div style={{display:this.state.display_register}}>
        <form className="mainform" onSubmit={this.submitForm.bind(this)}>
        <Grid container spacing={16} justify="center">
          <Grid item xs={12}>
          <TextField
            id="outlined-name"
            label="ID"
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
            variant="outlined"
          />
          &ensp;
          <div>
          <Button variant="contained" color="primary" type="submit"
                  onClick={() => this.onClickRegister(this.state.Identity)}
          >
          Register
          </Button>
          </div>
          </Grid>
        </Grid>
        </form>
        </div>
      <div style={{display:this.state.show}}>
            <p>Login as {this.state.name}</p>
        </div>
        <div style={{display:this.state.display_main}}>
          <Mainpage></Mainpage>
        </div>
      </div>
    );
  }
}

export default App;