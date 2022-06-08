import { ChevronRight } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import { PortableText } from '@portabletext/react';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { SanityClient } from '../services/SanityClient';

type TipsProps = {
  tips: any;
};

export async function getStaticProps() {
  const tips = await SanityClient.fetch(`*[_type == 'tip']{
  title,
  description,
  }`);

  return {
    props: {
      tips,
    },
    revalidate: 10,
  };
}

const Tips: React.FC<TipsProps> = ({ tips }) => (
  <Layout title="Tips" description="Tips">
    <Grid
      sx={{
        ml: `0px !important`,
        mt: `30px !important`,
        mb: `30px !important`,
        width: `100% !important`,
        paddingLeft: `2%`,
        paddingRight: `2%`,
      }}
      container
      spacing={3}
      direction="column"
    >
      <Grid item xs={12}>
        <Typography variant="h4">Our Tips:</Typography>
      </Grid>
      <Grid container spacing={2} sx={{ padding: 10 }} item xs={12}>
        {tips.map((tip: any) => (
          <Grid key={tip.title} item xs={12} md={12} lg={12}>
            <Accordion
              sx={{
                display: `flex`,
                flexDirection: `column`,
                padding: `0px 16px`,
              }}
            >
              <AccordionSummary expandIcon={<ChevronRight />}>
                <Typography variant="h4">{tip.title}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: `flex`,
                  flexDirection: `column`,
                  padding: 0,
                }}
              >
                <PortableText value={tip.description} />
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Layout>
);

export default Tips;
