import './App.css';
import { Button, CssBaseline, AppBar, Grid, Box, Container, Paper, TextField } from '@material-ui/core';
import {FormControl,FormLabel, RadioGroup, Radio, FormControlLabel} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
const convertRaw = require('raw-guid-converter').convertRaw
const convertGuid = require('raw-guid-converter').convertString

const useStyles = makeStyles((theme) => ({
  appBarSpacer: {
    marginTop: '10vh'
  },
  controls:{
    marginTop: '1.5vh',
    marginBottom: '1vh'

  }
}))

function App() {
  const classes = useStyles();
  const [_inputText, setInputText] = useState()
  const [_outputText, setOutputText] = useState()
  const [_inputType, setInputType] = useState('raw')

  const convertHandler = () =>{
    let result = ''
    debugger
    if (_inputText){
      if(_inputType=='raw'){
        result = _inputText.split("\n").filter(id=>id?true:false).map((id)=>convertRaw(id))
      }else{        
        result = _inputText.split("\n").filter(id=>id?true:false).map((id)=>convertGuid(id).toLowerCase())
      }
      result = result.join("\n")
    }
    setOutputText(result)
  }


  return (
    <div className="App">
      <header>
        {/* <CssBaseline /> */}
        <AppBar>
          <p>Oracle Raw to GUID Converter</p>
        </AppBar>
        <CssBaseline />
        <Container maxWidth="lg" >
          <div className={classes.appBarSpacer}></div>
          <Grid container spacing={3}>
            {/* From */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper >
                <TextField label={_inputType==='raw'?'Raw':'Guid'}  value={_inputText} multiline rows={10} variant="outlined" fullWidth onInput={(e)=>setInputText(e.target.value)}></TextField>
              </Paper>
            </Grid>
            {/* Controls */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper>
                <FormControl component="fieldset" className={classes.controls}>
                  <FormLabel component="legend" >Converter input</FormLabel>
                  <RadioGroup aria-label="input_type" name="input_type" value={_inputType}  onChange={(e)=>{setInputType(e.currentTarget.value)}}>
                    <FormControlLabel value="raw" control={<Radio />} label="Raw" />
                    <FormControlLabel value="guid" control={<Radio />} label="GUID" />
                  </RadioGroup>
                  <Button variant="contained" color="primary" onClick={convertHandler}>Convert</Button>
                </FormControl>
              </Paper>
            </Grid>
            {/* To */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper >
                <TextField label={_inputType==='raw'?'Guid':'Raw'} value={_outputText} multiline rows={10} variant="outlined" fullWidth onInput={(e)=>setOutputText(e.target.value)}></TextField>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </header>
    </div>
  );
}

export default App;
