import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteReportInDb } from '../../../api-service';
import { deleteReport } from '../../../redux/actions';

export default function ReportsDashCard ({text, icon, dbId,handleStreamSelect}) {
  const dispatch = useDispatch();

  function elementClicked () {
    handleStreamSelect(text);
  }
  const handleDelete = () => {
    // console.log(dbId);
    deleteReportInDb(dbId);
    dispatch(deleteReport(dbId));
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
            View Report
          </Button>
          <Button onClick={handleDelete} size="small" color="secondary">
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
