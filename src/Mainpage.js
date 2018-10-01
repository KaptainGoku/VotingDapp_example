import React, { Component } from 'react';
import './main.css';
import web3 from './web3';
import voting from './Voting';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Result from './Result';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  box: {
    borderRadius:'2px', 
    boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    margin:'15px',
    border:'1px solid',
    height:'100%'
  },
  check: {
    margin: "0 47%"
  },
  button: {
    margin:'1em 43% 1em'
  }
});

class Mainpage extends Component {

  state = {
    name: '',
    display_result:'initial',
    owner:'',
    idWinner:0,
    candidates1:[],
    candidates2:[],
    candidates3:[],
    candidates4:[],
    candidates5:[],
    candidates6:[],
    candidatesCount:'',
    value:'',
    ipfsHash:null,
    message:'Choose candidates',
    id:'',
  };
  async componentWillMount() {
    console.log(voting);
    console.log(voting.methods.candidates1);
    const owner = await voting.methods.owner().call();
    const candidatesCount = await voting.methods.candidatesCount().call();
    const candidates1 = await voting.methods.candidates(1).call();
    const candidates2 = await voting.methods.candidates(2).call();
    const candidates3 = await voting.methods.candidates(3).call();
    const candidates4 = await voting.methods.candidates(4).call();
    const candidates5 = await voting.methods.candidates(5).call();
    const candidates6 = await voting.methods.candidates(6).call();
    const candidates7 = await voting.methods.candidates(7).call();
    const idWinner = await voting.methods.idWinner().call();
    const candidates = [candidates1,candidates2,candidates3,candidates4,candidates5,candidates6,candidates7]
    this.setState({owner, idWinner, candidates, candidates1, candidates2, candidates3, candidates4, candidates5, candidates6, candidates7, candidatesCount});
  }

  submitForm (e) {
    e.preventDefault();
  }

  onClickVote = async(id) => {
    const accounts = await web3.eth.getAccounts();
    this.setState({message: 'Waiting'});
    await voting.methods.vote(id).send({
      from: accounts[0],
    });
    this.setState({message: 'You have been elected!'})
  };

  render() {
    const { classes } = this.props; 
    return (
      <div>
      <form className="mainform" onSubmit={this.submitForm.bind(this)}>
      <Grid container spacing={16} justify="center">
          <Grid item xs={12} sm={4} md={4} lg={3} className={classes.box}>
            <img src="./goku.jpeg" className="imgbox" alt="" style={{width:"100%", height:"300px"}}></img>
            <div className={classes.text}>
              <h2>{this.state.candidates1[1]}</h2>
              <p  style={{color: "grey"}}>ABC &amp; XYZ</p>
              <p>Lorem ipsum dolor sit amet</p>
              <p>example@example.com</p>
            </div>
            <div className={classes.button}>
              <Button variant="contained" color="secondary" type="submit" 
                onClick={() =>{this.onClickVote(this.state.candidates1.id)}}
              >
                VOTE
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3} className={classes.box}>
            <img src="./nuto.png" className="imgbox" alt="" style={{width:"100%", height:"300px"}}></img>
            <div className={classes.text}>
              <h2>{this.state.candidates2[1]}</h2>
              <p  style={{color: "grey"}}>ABC &amp; XYZ</p>
              <p>Lorem ipsum dolor sit amet</p>
              <p>example@example.com</p>
            </div>
            <div className={classes.button}>
              <Button variant="contained" color="secondary" type="submit"
                onClick={() => this.onClickVote(this.state.candidates2.id)}
              >
                VOTE
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3} className={classes.box}>
            <img src="./Doraemon.png" className="imgbox" alt="" style={{width:"100%", height:"300px"}}></img>
            <div className={classes.text}>
              <h2>{this.state.candidates3[1]}</h2>
              <p  style={{color: "grey"}}>ABC &amp; XYZ</p>
              <p>Lorem ipsum dolor sit amet</p>
              <p>example@example.com</p>
            </div>
            <div className={classes.button}>
              <Button variant="contained" color="secondary" type="submit"
              onClick={() => this.onClickVote(this.state.candidates3.id)}
              >
                VOTE
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3} className={classes.box}>
            <img src="./c.jpg" className="imgbox" alt="" style={{width:"100%", height:"300px"}}></img>
            <div className={classes.text}>
              <h2>{this.state.candidates4[1]}</h2>
              <p  style={{color: "grey"}}>ABC &amp; XYZ</p>
              <p>Lorem ipsum dolor sit amet</p>
              <p>example@example.com</p>
            </div>
            <div className={classes.button}>
              <Button variant="contained" color="secondary" type="submit"
              onClick={() => this.onClickVote(this.state.candidates4.id)}
              >
                VOTE
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3} className={classes.box}>
            <img src="./Inuyasha.png" className="imgbox" alt="" style={{width:"100%", height:"300px"}}></img>
            <div className={classes.text}>
              <h2>{this.state.candidates5[1]}</h2>
              <p  style={{color: "grey"}}>ABC &amp; XYZ</p>
              <p>Lorem ipsum dolor sit amet</p>
              <p>example@example.com</p>
            </div>
            <div className={classes.button}>
              <Button variant="contained" color="secondary" type="submit"
              onClick={() => this.onClickVote(this.state.candidates5.id)}>
                VOTE
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={3} className={classes.box}>
            <img src="./v.jpg" className="imgbox" alt="" style={{width:"100%", height:"300px"}}></img>
            <div className={classes.text}>
              <h2>{this.state.candidates6[1]}</h2>
              <p  style={{color: "grey"}}>ABC &amp; XYZ</p>
              <p>Lorem ipsum dolor sit amet</p>
              <p>example@example.com</p>
            </div>
            <div className={classes.button}>
              <Button variant="contained" color="secondary" type="submit"
              onClick={() => this.onClickVote(this.state.candidates6.id)}
              >
                VOTE
              </Button>
            </div>
          </Grid>
      </Grid>
      </form>
      <br/>
      <div style={{display:this.state.display_result}}>
      <Result></Result>
      </div>
      </div>
    );
  }
}

export default withStyles(styles)(Mainpage);