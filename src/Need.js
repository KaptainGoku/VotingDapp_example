import React, { Component } from 'react';

import './App.css';
import web3 from './web3';

import election from './election';
import { Thumbnail, Image, Grid, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ipfs from './ipfs'
//import image
import thinh from './images/thinh.jpg'
import thong from './images/thong.png';
import my from './images/my.png';
import kien from './images/kien.png';
import trung from './images/trung.png';
import quan from './images/quan.jpg';
import nam from './images/nam.jpg';

class App extends Component {
  state = {
    owner:'',
    idWinner:0,
    candidates1:[],
    candidates2:[],
    candidates3:[],
    candidates4:[],
    candidates5:[],
    candidates6:[],
    candidates7:[],
    candidatesCount:'',
    value:'',
    ipfsHash:null,
    message:'Choose candidates',
    id:'',
  };
  async componentWillMount() {
    console.log(election);
    console.log(election.methods.candidates1);
    const owner = await election.methods.owner().call();
    const candidatesCount = await election.methods.candidatesCount().call();
    const candidates1 = await election.methods.candidates(1).call();
    const candidates2 = await election.methods.candidates(2).call();
    const candidates3 = await election.methods.candidates(3).call();
    const candidates4 = await election.methods.candidates(4).call();
    const candidates5 = await election.methods.candidates(5).call();
    const candidates6 = await election.methods.candidates(6).call();
    const candidates7 = await election.methods.candidates(7).call();
    const idWinner = await election.methods.idWinner().call();
    const candidates = [candidates1,candidates2,candidates3,candidates4,candidates5,candidates6,candidates7]
    this.setState({owner, idWinner, candidates, candidates1, candidates2, candidates3, candidates4, candidates5, candidates6, candidates7, candidatesCount});
  }
  reloadImage(pThis) {
      // To prevent this from being executed over and over
      pThis.onerror = null;

      // Refresh the src attribute, which should make the
      // browsers reload the iamge.
      pThis.src = pThis.src;
  }
  //Take file input from user
  captureFile =(event) => {
          event.stopPropagation()
          event.preventDefault()
          const file = event.target.files[0]
          let reader = new window.FileReader()
          reader.readAsArrayBuffer(file)
          reader.onloadend = () => this.convertToBuffer(reader)
        };
  //Convert the file to buffer to store on IPFS
   convertToBuffer = async(reader) => {
        //file is converted to a buffer for upload to IPFS
          const buffer = await Buffer.from(reader.result);
        //set this buffer-using es6 syntax
          this.setState({buffer});
      };
      onSubmit = async (event) => {
            event.preventDefault();
      //bring in user's metamask account address
            const accounts = await web3.eth.getAccounts();
          //obtain contract address from storehash.js
            const ethAddress= await election.options.address;
            this.setState({ethAddress});

          //save document to IPFS,return its hash#, and set hash# to state
            await ipfs.add(this.state.buffer, (err, ipfsHash) => {
              console.log(err,ipfsHash);
              //setState by setting ipfsHash to ipfsHash[0].hash
              this.setState({message: 'Sending IPFS'});
              this.setState({ ipfsHash:ipfsHash[0].hash });
              // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
              //return the transaction hash from the ethereum contract
              election.methods.setHash(this.state.ipfsHash).send({
                from: accounts[0]
              }, (error, transactionHash) => {
                console.log(transactionHash);
                this.setState({transactionHash});
              });
              this.state.link = "https://gateway.ipfs.io/ipfs/" + this.state.ipfsHash;
            })
          };
  onClickVote = async(id) => {
    const accounts = await web3.eth.getAccounts();
    this.setState({message: 'Waiting'});
    await election.methods.vote(id).send({
      from: accounts[0],
    });
    this.setState({message: 'You have been elected!'})
  }
  onFinish = async() => {
    const accounts = await web3.eth.getAccounts();
    this.setState({message: 'Waiting winner'});
    await election.methods.killVote().send({
      from: accounts[0],
    });
    alert("Chúc mừng " + this.state.candidates[this.state.idWinner-1].name + " đã chiến thắng");
    this.setState({message: 'Winner'});
  };

  render() {
    return (
      <div className="App">
        <h2>Election</h2>
        <p>
          This is election is managed by {this.state.owner}.
          There are currently {this.state.candidatesCount} candidates.
        </p>
        <h2>Candidates List</h2>
        <Grid>
          <Row>
            <Col xs={6} md={3}>

              <Image src={this.state.link} onerror="reloadImage(this)" width="200" height="200"/>
              <hr/>
              <Button bsStyle="warning" onClick={() => this.onClickVote(this.state.candidates1[0])}>{this.state.candidates1[1]}</Button>
              <br/>
              Vote: {this.state.candidates1.voteCount}

              <form onSubmit={this.onSubmit}>
                <input
                  type = "file"
                  onChange = {this.captureFile}
                />
                 <Button
                 bsStyle="primary"
                 type="submit">
                 Thêm ảnh
                 </Button>
              </form>
              <h5>{this.state.ipfsHash}</h5>
              <h5>{this.state.link}</h5>
            </Col>
            <Col xs={6} md={3}>
              <Image src={nam} width="200" height="200"/>
              <hr/>
              <Button bsStyle="warning" onClick={() => this.onClickVote(this.state.candidates[1].id)}>{this.state.candidates2[1]}</Button>
              <br/>
              Vote: {this.state.candidates2[2]}
            </Col>
            <Col xs={6} md={3}>
              <Image src={my} width="200" height="200"/>
              <hr/>
              <Button bsStyle="warning" onClick = {() => this.onClickVote(this.state.candidates[2].id)}>{this.state.candidates3[1]}</Button>
              <br/>
              Vote: {this.state.candidates3[2]}
            </Col>
            <Col xs={6} md={3}>
              <Image src={trung} width="200" height="200"/>
              <hr/>
              <Button bsStyle="warning" onClick = {() => this.onClickVote(this.state.candidates[3].id)}>{this.state.candidates4[1]}</Button>
              <br/>
              Vote: {this.state.candidates4[2]}
            </Col>
          </Row>
          <Row>

            <Col xs={6} md={3}>
              <Image src={kien} width="200" height="200"/>
              <hr/>
              <Button bsStyle="warning" onClick = {() => this.onClickVote(this.state.candidates[4].id)}>{this.state.candidates4.name}</Button>
              <br/>
              Vote: {this.state.candidates5[2]}
            </Col>
            <Col xs={6} md={3}>
              <Image src={thong} width="200" height="200"/>
              <hr/>
              <Button bsStyle="warning" onClick = {() => this.onClickVote(this.state.candidates[5].id)}>{this.state.candidates6[1]}</Button>
              <br/>
              Vote: {this.state.candidates6[2]}
            </Col>
            <Col xs={6} md={3}>
              <Image src={quan} width="200" height="200"/>
              <hr/>
              <Button bsStyle="warning" onClick = {() => this.onClickVote(this.state.candidates[6].id)}>{this.state.candidates7[1]}</Button>
              <br/>
              Vote: {this.state.candidates7[2]}
            </Col>
          </Row>
        </Grid>
        <hr/>
        <h2>{this.state.message}</h2>
        <hr/>
        { <Button bsStyle="primary" onClick = {this.onFinish}>Kết thúc bầu cử</Button> }
      </div>

    );
  }
}

export default App;