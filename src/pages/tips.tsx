import { Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { CustomTheme } from '~/styles/theme';
import { SanityClient } from '../services/SanityClient';

const tipData = [
  {
    title: `How do I introduce your kitten to other pets?`,
    description: [
      `Let your new kitten settle in before you attempt to introduce it to other pets you have.`,
      `The introduction needs to be slow and at each of the animals pace. Some pets will become firm friends almost immediately, however, it is common for resident pets to be upset at the arrival of a new pet for a few days. `,
      `This is completely normal behavior and needs to be met with sensitivity and understanding. The worst thing you can do is rush the situation.`,
      `We like to introduce a new kitten to other cats while playing with a toy, it distracts each of the animals from being intensely interested in one another and they learn quickly that their new companion is fun.`,
    ],
  },
  {
    title: `How do I let my kitten settle into their new home?`,
    description: [
      `Your kitten may be unsettled for a few days and miss its mother and littermates. So it is up to you to help ease the kittens transition into your new home.`,
      `Once your new kitten arrives home, confine your kitten to one room with a litter tray, food, water and a comfortable bed. A plastic cat carrier with the door propped open works very well for this purpose.`,
      `Give him/her some time to become familiar with their surroundings. Cats are fastidiously clean animals and it is necessary to make sure the food and water bowls be kept as far away from the litter tray as possible.`,
      `After a few days and when the kitten is well settled, you can gradually increase the area your kitten can explore`,
    ],
  },
  {
    title: `What should I do before my kitten arrives?`,
    description: [
      `Not only is it important to kitten proof your home but it is also strongly urged that you check out the list of plants that are toxic & non-toxic to cats. If you have plants that are toxic to cats ensure they are out of reach.`,
      `There are safe alternatives for your kitten to nibble on should they want some greenery. See attached link for a list of non-poisonous plants.`,
      `https://www.aspca.org/pet-care/animal-poison-control/cats-plant-list`,
    ],
  },
];

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
  },
  container: {
    margin: 20,
    width: `80%`,
    justifyContent: `center`,
    padding: 10,
  },
  card: {
    width: `100%`,
    padding: 10,
    margin: 10,
    backgroundColor: `#fff`,
    borderRadius: 10,
    boxShadow: `0px 0px 10px rgba(0, 0, 0, 0.1)`,
  },
}));

type TipsProps = {
  tips: any;
};

// TODO: add tips from backend

export async function getStaticProps() {
  const tips = await SanityClient.fetch(`*[_type == 'Tips']{
  Title,
  Description,
  }`);

  return {
    props: {
      tips,
    },
  };
}

const Tips: React.FC<TipsProps> = () => {
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
          <Typography variant="h2" style={{ textAlign: `center` }}>
            Bobtail Tips
          </Typography>
        </Card>
        <Grid container spacing={2} style={{ padding: 10 }} item xs={12}>
          {tipData.map((tip: any) => (
            <Grid key={tip.title} item xs={12} md={6} lg={4}>
              <Card className={classes.card}>
                <Typography
                  variant="h4"
                  style={{ paddingBottom: 16, textAlign: `center` }}
                >
                  {tip.title}
                </Typography>
                {tip.description.map((description: string) => (
                  <>
                    <Typography
                      key={description}
                      variant="body2"
                      style={{ paddingBottom: 16, textAlign: `center` }}
                    >
                      {` `}
                      <ArrowRightOutlinedIcon />
                      {description}
                    </Typography>
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
