import { Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { CustomTheme } from '~/styles/theme';
import { SanityClient } from '../services/SanityClient';
import tipData from '../pages/tipsData';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
  },
  container: {
    margin: 20,
    width: '80%',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    width: '100%',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
}));

type TipsProps = {
  tips: any;
};

//TODO: add tips from backend

export async function getStaticProps() {
  const tips = await SanityClient.fetch(`*[_type == 'Tips']{
  Title,
  Description,
  }`);

  return {
    props: {
      tips: tips,
    },
  };
}

const Tips: React.FC<TipsProps> = ({ tips }) => {
  const classes = useStyles();

  return (
    <Layout title="Tips" description="Tips">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        direction="column"
        item
        xs={12}
      >
        <Card className={classes.container}>
          <Typography variant="h2" style={{ textAlign: 'center' }}>
            Bobtail Tips
          </Typography>
        </Card>
        <Grid container spacing={2} style={{ padding: 10 }} item xs={12}>
          {tipData.map((tip: any, index) => (
          <Grid item xs={12} md={6} lg={4}>
            <Card className={classes.card}>
              <Typography variant="h4" style={{paddingBottom: 16, textAlign: 'center'}}>{tip.title}</Typography>
              {tip.description.map((description: string, index: number) => (
                <>
                
                <Typography variant="body2"  style={{paddingBottom: 16, textAlign: 'center'}}> <ArrowRightOutlinedIcon />{description}</Typography>
                </>
              ))}
            </Card>
          </Grid>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Tips;
