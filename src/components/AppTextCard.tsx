import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
export {}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: '20px'
  },
  title: {
    fontSize: 14,
  },
});

type AppTextCardProps = {body: string};

export const AppTextCard = ({body}: AppTextCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
}
