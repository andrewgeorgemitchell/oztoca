import { Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { CustomTheme } from '~/styles/theme';
import { SanityClient } from '../services/SanityClient';

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

type testimonialProps = {
  testimonials: any;
};

export async function getStaticProps() {
  const testimonials = await SanityClient.fetch(
    `*[_type == 'testimonial'] {
      author,
      description,

    }`,
  );
  return {
    props: {
      testimonials,
    },
  };
}

// TODO: add testimonials from backend

const Testimonials: React.FC<testimonialProps> = ({ testimonials }) => {
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
              {testimonials.map((testimonial: any) => (
                <Grid item xs={6} lg={10} md={6} key={testimonial.author}>
                  <Typography
                    style={{
                      paddingBottom: `3%`,
                      fontSize: 15,
                      fontWeight: 300,
                    }}
                  >
                    {testimonial.description}
                  </Typography>

                  <Typography style={{ fontWeight: 600 }}>
                    {testimonial.author}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Testimonials;
