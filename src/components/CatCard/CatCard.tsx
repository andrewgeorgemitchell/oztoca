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
  cardHeader: {
    '& .MuiCardHeader-content': {
      maxWidth: `100%`,
    },
  },
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
      <CardHeader
        className={classes.cardHeader}
        title={name}
        titleTypographyProps={{
          noWrap: true,
          style: {
            maxWidth: `100%`,
          },
        }}
        style={{ maxWidth: `100%` }}
      />
      <CardActions style={{ display: `flex`, flexDirection: `row-reverse` }}>
        <Button
          variant="outlined"
          color="secondary"
          component={NextLinkComposed}
          to={`/cats/${slug}`}
        >
          View Bobtail
        </Button>
      </CardActions>
    </Card>
  );
};

export default CatCard;
