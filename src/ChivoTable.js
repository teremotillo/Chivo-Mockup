import React, { Component } from 'react';
import {TableContainer, Table, TableHead,TableRow, TableCell, TableBody, Button, InputBase} from '@material-ui/core';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
const theme = createTheme({

  palette: {
    primary: {
       main: orange[500],
    },
    secondary: {
      main: '#20047E1'
    },
  },
});


let priceBTC = 0; 
let fullDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
class ChivoTable extends React.Component{
  constructor(props){
      super(props);
      this.getSpotPrice = this.getSpotPrice.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this)
      this.state = {
        BTCPrice: 0,
        input: 0,
        balance: 100
      };
  }
  componentDidMount(){
    this.interval = setInterval(() => {            
          this.getSpotPrice();        
      }, 4000);
  }
  handleSubmit(e){
    e.preventDefault();
    
    if(typeof parseFloat(this.state.input) === 'number'){
    let sum = this.state.balance + parseFloat(this.state.input);
    this.setState({ balance: sum});
    }
    else{
      alert("Enter a number")
    }
  }
  handleChange(e) {
    this.setState({ input: e.target.value });
    console.log("NEW DATA", e.target);
    console.log("this state", this.state);
  }
  priceBTC = this.getSpotPrice();

componentWillUnmount() {
    clearInterval(this.interval);
  }

  calculateBTCPrice(){
    return this.state.balance * this.state.BTCPrice;
  }
  async getSpotPrice(){
  let price = null;
  try {
      const  data  = await axios.get('https://api.coinbase.com/v2/prices/BTC-USD/spot');
      price = data;
      console.log('price: ',price.data.data)
      const newPrice = price.data.data.amount;
      console.log("new price ",newPrice)
       this.setState({BTCPrice: newPrice})
    } catch (error) {      
        console.log(error);  
    }
  }
render(){
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="a dense table" style={{borderBottom: "none"}}>
        <TableHead>
          <TableRow container >
            <TableCell style={{borderBottom:"none"}}> 
              <ThemeProvider theme={theme}>
               <Button color="primary" variant="contained">USD</Button>
              </ThemeProvider></TableCell>
            <TableCell align="right" style={{borderBottom:"none"}}>
            <ThemeProvider theme={theme}>
               <Button style={{backgroundColor: '#FF5722', color: 'white'}} variant="contained">BTC</Button>
              </ThemeProvider></TableCell>

          </TableRow>
          <TableRow>
           <TableCell style={{borderBottom:"none"}}> 
           <Typography style={{fontWeight: 600, color: 'black',textSlign: 'left'}}>
         $ {this.state.balance}
          </Typography>
          </TableCell>
           <TableCell style={{fontSize:'12px',borderBottom:"none", color:'grey'}}> 
                   <Typography style={{fontWeight: 600}} >
         BTC:{(this.state.balance/this.state.BTCPrice).toFixed(8)}
        </Typography>
        </TableCell>
        </TableRow>
          <TableRow>
          <Typography style={{ fontWeight: 600 ,  textSlign: 'left',margin: '1rem 0.5rem'}}  justify="space-between">
       Transacciones
      </Typography>
          
          </TableRow>
          <TableRow>
           <TableCell style={{borderBottom:"none"}}> 
           <Typography style={{ color: 'grey',textSlign: 'left'}}>
          {fullDate.toLocaleDateString("en-US", options)}
          </Typography>
          </TableCell>
           <TableCell style={{borderBottom:"none", color:'red'}}> 
                   <Typography style={{ margin: '1rem 0.5rem'}} >
         BTC:{this.state.BTCPrice}
        </Typography>
        </TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}       
            >
              <TableCell component="th" scope="row" style={{borderBottom:"none"}}>
                {row.tipo}
              </TableCell>
              <TableCell align="right" style={{borderBottom:"none"}}>{row.amount}</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
      <form onSubmit={this.handleSubmit} style={{flexGrow: 1}}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Agrega Mas Fondos $$"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={this.handleChange}
            type="number"
            style={{margin:'0 80px 0  0'}}
          />
          <Button
          color="secondary" 
          variant="contained"
          style={{align: 'right'}}
          type="submit"> Agrega</Button>
          </form>
    </TableContainer>)
  }
}

export default ChivoTable;

const columns = [
  { field: 'USD', headerName: 'USD', width: 130 },
  { field: 'BTC', headerName: 'BTC', width: 130 },
];

const rows = [
  {id:1, tipo: 'Enviaste Dolares', amount:  35 },
  {id:2, tipo: 'Enviaste Bitcoin', amount: 42 },
  {id:3, tipo: 'Enviaste Dolares', amount:  45 },
  {id:4, tipo: 'Enviaste Bitcoin', amount: 2 },
];