import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { CustomTheme } from '~/styles/theme';

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
    marginTop: 30,
  },
}));

type TestimonialsProps = {};

const Testimonials: React.FC<TestimonialsProps> = () => {
  const classes = useStyles();
  return (
    <Layout title="Testimonials" description="Testimonials">
      <div className={classes.root}>
        <Typography variant="h3">Testimonials</Typography>
      </div>
    </Layout>
  );
};

export default Testimonials;
