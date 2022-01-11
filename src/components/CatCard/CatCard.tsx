import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { NextLinkComposed } from '../Link/Link';

const useStyles = makeStyles({
  root: {},
});

type CatCardProps = {
  name: string;
  imageUrl: string;
  slug: string;
};

const CatCard: React.FC<CatCardProps> = ({ imageUrl, name, slug }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia component="img" height="194" image={imageUrl} />
      <CardHeader title={name} />
      <CardActions style={{ display: `flex`, flexDirection: `row-reverse` }}>
        <Button
          variant="outlined"
          color="primary"
          component={NextLinkComposed}
          to={`/cats/${slug}`}
        >
          View Kitten
        </Button>
      </CardActions>
    </Card>
  );
};

export default CatCard;
