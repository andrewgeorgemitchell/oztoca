import { Avatar, Card, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { CustomTheme } from '~/styles/theme';
import ContactForm from '~/components/ContactForm/ContactForm';
import { fontSize } from '@mui/system';

const useStyles = makeStyles<CustomTheme>((theme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
}));

// eslint-disable-next-line @typescript-eslint/ban-types
type ContactProps = {};

const Contact: React.FC<ContactProps> = () => {
  const classes = useStyles();
  return (
    <Layout title="Contact" description="Contact us">
      <Grid
        container
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        className={classes.container}
        item
      >
        <Grid item xs={12}>
          <Card className={classes.card}>
            <Typography variant="h3" style={{paddingBottom: '15px', textAlign: 'center'}}>Contact Us</Typography>
            <Grid container spacing={2} item xs={12} style={{paddingBottom: '30px'}} justifyContent='center' alignItems="center">
              <Grid item xs={12} lg={4} md={6} style={{display: 'flex', justifyContent: 'center'}} >
                {/* @ts-ignore */}
                <Avatar
                  alt="contact"
                  src="/assets/ContactOztoca.jpg"
                  style={{ width: 200, height: 200, margin: 10 }}
                />
              </Grid>
              <Grid item xs={12} lg={8} md={6}>
                <Typography variant="h5" style={{paddingBottom: '25px', fontSize: 18, fontWeight: 350}}>
                  All of our kittens are healthy and happy at affordable prices.
                </Typography>                
                <Typography variant="h5" style={{paddingBottom: '25px', fontSize: 18, fontWeight: 350}}>
                  For serious inquiries please fill out the form below.
                </Typography>
                <Typography variant="h5" style={{paddingBottom: '5px', fontSize: 18, fontWeight: 350}}>
                  E-mail: <a href="mailto:" style={{color: 'rgb(126,0,0)'}} >
                  oztocabobtails@gmail.com </a>
                </Typography>
                <Typography variant="h5" style={{fontSize: 18, fontWeight: 350}} >
                  Mobile: 805-358-4547
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ContactForm />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Contact;
