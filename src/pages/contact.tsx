import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { CustomTheme } from '~/styles/theme';

const useStyles = makeStyles<CustomTheme>((theme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
  },
}));

// eslint-disable-next-line @typescript-eslint/ban-types
type ContactProps = {};

const Contact: React.FC<ContactProps> = () => {
  const classes = useStyles();
  return (
    <Layout title="Contact" description="Contact us">
      <div className={classes.root}>
        <Typography variant="h3">Contact</Typography>
      </div>
    </Layout>
  );
};

export default Contact;
