import React, { Component } from 'react';
import ChivoTable from './ChivoTable';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack'
import Typography from '@material-ui/core/Typography';

const theme = createTheme({

  palette: {
    primary: {
      main: '#0b1864',
    },
  },
});


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();

  }
	
render(){

	return(
		
    		<Grid
			  container
			  spacing={0}
			  direction="column"
			  alignItems="center"
			  justifyContent="center"
			  style={{ minHeight: '100vh'}}
			>

			  <Grid item xs={3}>
			  </Grid>   
			   <Grid 

			   item xs={5}
			   style={{minHeight: '40vh', minWidth: '35vh', backgroundColor: 'white',borderRadius:'18px'}}>
			    <Typography style={{ fontWeight: 600 ,  textSlign: 'left',margin: '1rem'}}>
		        Tus balances
		      </Typography>
			  
			   <ChivoTable />
			    <Stack 
			    spacing={4} 
			    direction="row"
			    justifyContent="center"
  				alignItems="center">
			   <ThemeProvider theme={theme}>
               <Button color="primary" variant="contained">Recibir</Button>
              </ThemeProvider>
			 <ThemeProvider theme={theme}>
               <Button color="primary" variant="contained">Enviar</Button>
              </ThemeProvider>	  
              </Stack>          
			  </Grid>   
			  <Grid item xs={3}>
			  
			  </Grid>   
			</Grid> 
  	
)}
}

export default Main;