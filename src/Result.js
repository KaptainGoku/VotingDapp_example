import React, {
  Component
} from 'react';
import voting from './Voting';
import './main.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Result extends Component {
  state = {
    name: '',
    owner: '',
    idWinner: 0,
    candidates1: [],
    candidates2: [],
    candidates3: [],
    candidates4: [],
    candidates5: [],
    candidates6: [],
    candidatesCount: '',
  };


  async componentWillMount() {
    //console.log(voting);
    //console.log(voting.methods.candidates1);
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
    const candidates = [candidates1, candidates2, candidates3, candidates4, candidates5, candidates6, candidates7]
    this.setState({
      owner,
      idWinner,
      candidates,
      candidates1,
      candidates2,
      candidates3,
      candidates4,
      candidates5,
      candidates6,
      candidates7,
      candidatesCount
    });
  }

  render(){
  
    return (
      <Paper >
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell numeric>Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {this.state.candidates1[1]}
                  </TableCell>
                  <TableCell numeric>{this.state.candidates1[2]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {this.state.candidates2[1]}
                  </TableCell>
                  <TableCell numeric>{this.state.candidates2[2]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {this.state.candidates3[1]}
                  </TableCell>
                  <TableCell numeric>{this.state.candidates3[2]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {this.state.candidates4[1]}
                  </TableCell>
                  <TableCell numeric>{this.state.candidates4[2]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {this.state.candidates5[1]}
                  </TableCell>
                  <TableCell numeric>{this.state.candidates5[2]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {this.state.candidates6[1]}
                  </TableCell>
                  <TableCell numeric>{this.state.candidates6[2]}</TableCell>
                </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
  

export default Result;