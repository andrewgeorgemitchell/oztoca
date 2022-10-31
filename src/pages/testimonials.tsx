import { Card, Grid, Typography } from '@mui/material';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { SanityClient } from '../services/SanityClient';

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

const Testimonials: React.FC<testimonialProps> = ({ testimonials }) => (
  <Layout title="Testimonials" description="Testimonials">
    <Grid
      container
      spacing={3}
      direction="column"
      sx={{
        paddingLeft: `17%`,
        paddingRight: `17%`,
        ml: `0px !important`,
        mt: `30px !important`,
        mb: `30px !important`,
        width: `100% !important`,
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

export default Testimonials;
