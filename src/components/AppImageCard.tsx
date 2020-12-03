import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9 // 126.25%
      backgroundSize: 'contain'
    },
  }),
);
type AppImageCardProps = {url: string};

export const AppImageCard = ({url}: AppImageCardProps) => {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia
        className={classes.media}
        image={url}
      />
    </Card>
  );
}
