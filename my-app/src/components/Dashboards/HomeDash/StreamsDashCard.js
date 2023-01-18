import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react'

export default function StreamsDashCard ({text, icon, handleStreamSelect}) {
  function elementClicked () {
    handleStreamSelect(text);
  }
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card >
        <CardContent>
          {icon}
          <Typography variant="h6">{text}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={elementClicked} size="small" color="primary">
            View Stream
          </Button>
          <Button size="small" color="primary">
            Create Report
          </Button>
          <Button size="small" color="secondary">
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
