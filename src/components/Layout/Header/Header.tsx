import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import React from 'react';
import Link, { NextLinkComposed } from '~/components/Link/Link';
import { CustomTheme } from '~/styles/theme';

const useStyles = makeStyles<CustomTheme>((theme) => ({
  root: {
    height: 100,
    position: `sticky`,
    top: `0px`,
  },
  container: {
    height: 100,
    margin: 0,
    ...theme.mixins.containerStyles(theme),
  },
}));

export type NavLink = {
  label: string;
  link?: string;
  subLinks?: NavLink[];
};

type HeaderProps = {
  links: NavLink[];
};

const Header: React.FC<HeaderProps> = ({ links }) => {
  const classes = useStyles();

  return (
    <nav className={classes.root}>
      <Grid
        className={classes.container}
        container
        direction="row"
        wrap="nowrap"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item container>
          <Link
            href={{
              pathname: `/`,
            }}
            color="inherit"
            underline="none"
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Image
                  src="/logo.svg"
                  alt="Bobtail Kitten Logo"
                  width={75}
                  height={75}
                />
              </Grid>
              <Grid item>
                <Typography variant="h3" color="inherit">
                  bobtail kitten
                </Typography>
              </Grid>
            </Grid>
          </Link>
        </Grid>
        <Grid
          item
          container
          spacing={1}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item>
            {links.map(({ label, link }) => (
              <Button
                key={link}
                component={NextLinkComposed}
                to={{
                  ...(link?.includes(`?`)
                    ? {
                        pathname: link.split(`?`)[0],
                        query: {
                          ...Object.fromEntries(
                            new URLSearchParams(link.split(`?`)[1]),
                          ),
                        },
                      }
                    : {
                        pathname: link,
                      }),
                }}
              >
                {label}
              </Button>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </nav>
  );
};

export default Header;
