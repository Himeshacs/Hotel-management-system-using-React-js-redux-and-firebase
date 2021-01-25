import React, { Component } from 'react'
import { Grid, TextField } from '@material-ui/core';

export default class WeddingMenuTemplate extends Component {
  render() {
    return (
<div id="wedding-section">
 <Grid container spacing={1}>
        <label id='Welcome-Drink'>Welcome Drink</label> 
        <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        id="Wlitem1"
        label="Welcome Drink"
        name="Wlitem1"
        onChange={this.props.handleChangeItem}
        autoFocus
      /> 
    <Grid item xs={5}>
    <label id='Main-dishes'>Main Dishes</label> 
     <Grid item>
      <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        id="Mditem1"
        label="Main dish 1"
        name="Mditem1"
        autoComplete="name"
        onChange={this.props.handleChangeItem}
        autoFocus
      />
      </Grid>
      <Grid item>
      <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        id="Mditem2"
        label="Main dish 2"
        name="Mditem2"
        onChange={this.props.handleChangeItem}
        autoComplete="name"
        autoFocus
      />
      </Grid>
      <Grid item>
      <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        id="Mditem3"
        label="Main dish 3"
        name="Mditem3"
        onChange={this.props.handleChangeItem}
        autoComplete="name"
        autoFocus
      />
      </Grid>
      </Grid>
      <Grid item xs={5}>
      <label id='Dishes'>Dishes</label> 
      <Grid item>
      <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        id="Sditem1"
        label="Dish 1"
        onChange={this.props.handleChangeItem}
        name="Sditem1"
      />
      </Grid>
      <Grid item>
      <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        id="Sditem2"
        label="Dish 2"
        onChange={this.props.handleChangeItem}
        name="Sditem2"
      />
      </Grid>
      <Grid item>
      <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        id="Sditem3"
        label="Dish 3"
        onChange={this.props.handleChangeItem}
        name="Sditem3"
      />
      </Grid>
      </Grid>
      <Grid item>
    <label id='Dessert'>Dessert</label> 
      <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        id="Dsitem1"
        label="Dessert 1"
        onChange={this.props.handleChangeItem}
        name="Dsitem1"
      />
            <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        id="Dsitem2"
        label="Dessert 2"
        onChange={this.props.handleChangeItem}
        name="Dsitem2"
      />
            <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        id="Dsitem3"
        label="Dessert 3"
        onChange={this.props.handleChangeItem}
        name="Dsitem3"
      />
      </Grid>
      </Grid>
      </div>
    )
  }
}
