import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { CustomTheme } from '~/styles/theme';

const useStyles = makeStyles<CustomTheme>((theme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
    marginTop: 50,
  },
}));

// eslint-disable-next-line @typescript-eslint/ban-types
type TestimonialsProps = {};

const Testimonials: React.FC<TestimonialsProps> = () => {
  const classes = useStyles();
  return (
    <Layout title="Testimonials" description="Happy cat reviews">
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h3">Testimonials</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            I received my kitten Dalwhinnie aka “Whinnie” 2 days ago. I can’t
            say enough about how helpful Karen was in answering all my questions
            through the process. Due to my odd work/travel schedule I had to
            wait a few weeks after choosing her before I could actually receive
            her. Karen was kindly patient with us. Whinnie is the most
            beautiful, affectionate and laid back kitten, a true testament to
            the wonderful care & devotion Karen gave her. Her coat & cleanliness
            is immaculate and she is amazingly true to breed standard. It is a
            pleasure to see a breeder put quality & care first. My Whinnie is
            everything I could have hoped for & more! We adore her. Thank you
            Oztoca!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Sincerely,</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Eve Marie English</Typography>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Testimonials;
