import { Button, Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import React from 'react';
import Layout from '~/components/Layout/Layout';
import { NextLinkComposed } from '~/components/Link/Link';
import { CustomTheme } from '~/styles/theme';

const useStyles = makeStyles<CustomTheme>((theme) => ({
  root: {
    ...theme.mixins.containerStyles(theme),
    marginTop: 20,
    marginBottom: 20,
  },
  backgroundImage: {
    backgroundImage: `url(/assets/heroImage.png)`,
    backgroundSize: `cover`,
    backgroundPosition: `center`,
    color: `#fff`,
    height: 300,
  },
  ctaCard: {
    padding: 20,
    marginTop: -75,
  },
  storyCard: {
    padding: 60,
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <Layout
      title="Oztoca - American Bobtail Cat Breeder"
      description="American Bobtail Cat Breeder"
    >
      <div className={classes.backgroundImage} />
      <Grid container spacing={6} className={classes.root} direction="column">
        <Grid item xs={12} sm={8} style={{ alignSelf: `center` }}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12}>
              <Typography variant="h3" align="center">
                Welcome to Oztoca
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" paragraph>
                American Bobtail Cat Breeder
              </Typography>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Button
                component={NextLinkComposed}
                to={{
                  pathname: `/kittens`,
                }}
                variant="contained"
                color="primary"
              >
                View Our Kittens
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Card elevation={1} className={classes.storyCard}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                Our Story
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} container spacing={3}>
              <Grid item xs={12}>
                <Typography>
                  Top quality American Bobtail cats and kittens are available at
                  Oztoca’s American Bobtails, a CFA and TICA registered cat
                  breeder in Kansas.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  Raised on a farm and breeding beautiful cats since 2005,
                  animals have always been a large part of my life. As a member
                  of the CFA breed council, I breed healthy and lovable American
                  Bobtails, guaranteed.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  The American Bobtail is a medium to large-sized, naturally
                  occurring bobtailed cat. The sweet personality and unique
                  physical features of the American Bobtail sets this breed
                  apart from other cats.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        <Grid item xs={12} md={10} style={{ alignSelf: `center` }}>
          <Card elevation={1} className={classes.storyCard}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Typography variant="h4" align="center">
                  Our Story
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} container spacing={3}>
                <Grid item xs={12}>
                  <Typography>
                    Top quality American Bobtail cats and kittens are available
                    at Oztoca’s American Bobtails, a CFA and TICA registered cat
                    breeder in Kansas.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    Raised on a farm and breeding beautiful cats since 2005,
                    animals have always been a large part of my life. As a
                    member of the CFA breed council, I breed healthy and lovable
                    American Bobtails, guaranteed.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    The American Bobtail is a medium to large-sized, naturally
                    occurring bobtailed cat. The sweet personality and unique
                    physical features of the American Bobtail sets this breed
                    apart from other cats.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    American Bobtails are very intelligent, making them easy to
                    train and eager to please. They are also extremely
                    interactive, following you around from room to room and
                    playing fetch with a ball.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    To ensure a smooth transition for my cats into your home, I
                    raise the cats in my own home as a part of my family. I
                    would love to share one of my cats with you.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    Providing extreme attention to my cats, I take ample time to
                    ensure their health and happiness, in turn offering
                    satisfaction to my clients. I am committed to providing a
                    good experience for everyone.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    Call 805-358-4547 or email me at oztocabobtails@gmail.com
                    with any questions or concerns!
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} container spacing={3}>
                <Grid item xs={12}>
                  <Typography>
                    Let’s say you love the Golden Retriever’s personality, but
                    his size and energy level are a bit more than you can
                    handle.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    American Bobtail lovers say you should take a look at their
                    cat instead.
                  </Typography>
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                  <Image
                    src="/assets/bigKitty.jpeg"
                    alt="Karen with big kitty"
                    height={209}
                    width={200}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    He’s a lover with a heart of gold who is devoted to his
                    people, follows them around, loves to play, walks nicely on
                    a leash (after training, of course), and welcomes guests
                    with a purr. This is a smart cat who enjoys puzzle toys,
                    learning tricks, and playing fetch.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    He isn’t as vocal as some breeds, but he communicates his
                    pleasure with chirps, clicks, and trills, as well as the
                    standard purr and meow.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    The American Bobtail has an adaptable nature, so he’s a good
                    traveler. Long-distance truckers and Rovers find him to be
                    an excellent companion.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    The cats have also found a niche with some psychotherapists
                    because of their loving and intuitive nature.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    That same adaptability and kindness makes him a good family
                    companion and suited to a variety of lifestyles, from
                    relaxed to rowdy.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={10} style={{ alignSelf: `center` }}>
          <Card elevation={1} className={classes.storyCard} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
