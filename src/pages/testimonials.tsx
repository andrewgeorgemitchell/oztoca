import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Typography } from '@mui/material';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { CustomTheme, DefaultTheme } from '~/styles/theme';
import { SanityClient } from '../services/SanityClient';

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 0,
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

const Testimonials: React.FC<testimonialProps> = ({ testimonials }) => {
  const classes = useStyles();

  return (
    <Layout title="Testimonials" description="Testimonials">
      <Grid
        container
        spacing={3}
        direction="column"
        sx={{
          ...DefaultTheme.mixins.containerStyles(DefaultTheme),
          ml: `0px !important`,
          mt: `30px !important`,
          mb: `30px !important`,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h4">Our Testimonials:</Typography>
        </Grid>
        {testimonials.map((testimonial: any) => (
          <Grid item xs={12} key={testimonial.author}>
            <Card
              sx={{
                padding: 4,
                borderRadius: 2,
              }}
            >
              <Typography paragraph>{testimonial.description}</Typography>
              <Typography style={{ fontWeight: 600 }}>
                {testimonial.author}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Testimonials;
