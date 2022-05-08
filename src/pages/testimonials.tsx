import { Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { CustomTheme } from '~/styles/theme';

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
    marginTop: 30,
  },
  card: {
    padding: 30,
    margin: 10,
    borderRadius: 10,
  },
}));

// TODO: add testimonials from backend

const Testimonials: React.FC = () => {
  const classes = useStyles();
  return (
    <Layout title="Testimonials" description="Testimonials">
      <Grid className={classes.root} container spacing={3} direction="column">
        <Grid item xs={12}>
          <Typography
            variant="h1"
            style={{
              fontSize: 30,
              fontWeight: 500,
              color: `#333`,
              lineHeight: `1em`,
              letterSpacing: 2,
              marginBottom: 10,
            }}
          >
            Our Testimonials:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={6} lg={10} md={6}>
                <Typography
                  style={{ paddingBottom: `3%`, fontSize: 15, fontWeight: 300 }}
                >
                  I received my kitten Dalwhinnie aka “Whinnie” 2 days ago. I
                  can’t say enough about how helpful Karen was in answering all
                  my questions through the process. Due to my odd work/travel
                  schedule I had to wait a few weeks after choosing her before I
                  could actually receive her. Karen was kindly patient with us.
                  Whinnie is the most beautiful, affectionate and laid back
                  kitten, a true testament to the wonderful care & devotion
                  Karen gave her. Her coat & cleanliness is immaculate and she
                  is amazingly true to breed standard. It is a pleasure to see a
                  breeder put quality & care first. My Whinnie is everything I
                  could have hoped for & more! We adore her. Thank you Oztoca!
                </Typography>

                <Typography style={{ fontWeight: 600 }}>
                  Eve Marie English
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Testimonials;
