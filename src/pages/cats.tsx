import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { CustomTheme } from '~/styles/theme';

const useStyles = makeStyles<CustomTheme>((theme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
  },
}));

type CatsProps = {
  type?: string;
};

const Cats: React.FC<CatsProps> = ({ type }) => {
  const classes = useStyles();
  return (
    <Layout title="Cats" description="Cats available">
      <div className={classes.root}>
        <Typography variant="h3">{type} Cats</Typography>
      </div>
    </Layout>
  );
};

export default Cats;
