import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { CustomTheme } from '~/styles/theme';

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
  },
}));

type TipsProps = {};

const Tips: React.FC<TipsProps> = () => {
  const classes = useStyles();
  return (
    <Layout title="Tips" description="Tips">
      <div className={classes.root}>
        <h3>Tips</h3>
      </div>
    </Layout>
  );
};

export default Tips;
