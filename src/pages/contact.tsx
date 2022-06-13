import { Avatar, Button, Card, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ContactForm from '~/components/ContactForm/ContactForm';
import Layout from '~/components/Layout/Layout';
// eslint-disable-next-line @typescript-eslint/ban-types
type ContactProps = {};

const Contact: React.FC<ContactProps> = () => {
  const router = useRouter();

  const [contactDetails, setContactDetails] = useState<boolean>(false);

  return (
    <Layout title="Contact" description="Contact us">
      <Grid
        container
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        item
        sx={{
          width: `100% `,
          paddingRight: `2%`,
          justifyContent: `center`,
        }}
      >
        <Grid item xs={12}>
          <Card
            sx={{
              padding: 2,
              margin: 2,
              borderRadius: 2,
              boxShadow: `0px 0px 10px rgba(0, 0, 0, 0.1)`,
              maxWidth: 800,
            }}
          >
            <Typography variant="h4" align="center" paragraph>
              Contact Us
            </Typography>
            <Grid
              container
              spacing={2}
              item
              xs={12}
              style={{ paddingBottom: `30px` }}
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                item
                xs={12}
                lg={4}
                md={6}
                style={{ display: `flex`, justifyContent: `center` }}
              >
                <Avatar
                  alt="contact"
                  src="/assets/ContactOztoca.jpg"
                  style={{ width: 200, height: 200, margin: 10 }}
                />
              </Grid>
              <Grid item xs={12} lg={8} md={6}>
                <Typography variant="body2" paragraph>
                  All of our kittens are healthy and happy at affordable prices.
                </Typography>
                <Typography variant="body2" paragraph>
                  For serious inquiries please fill out the form below.
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>E-mail:{` `}</strong>
                  {`oztocabobtails@gmail.com`
                    .split(``)
                    .map((char) => (contactDetails ? char : `*`))}
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Mobile: </strong>

                  {`805-358-4547`
                    .split(``)
                    .map((char) => (contactDetails ? char : `*`))}
                </Typography>
                {!contactDetails && (
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => {
                      setContactDetails(true);
                    }}
                  >
                    Click to view contact details
                  </Button>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ContactForm src={router.asPath} />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Contact;
