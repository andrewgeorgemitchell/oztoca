import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import React from 'react';
import Link from '~/components/Link/Link';
import { CustomTheme } from '~/styles/theme';
import { NavLink } from './HeaderLink.type';
// eslint-disable-next-line import/no-cycle
import HeaderLink from './HeaderLink/HeaderLink';

const useStyles = makeStyles<CustomTheme>((theme) => ({
  root: {
    height: 100,
    width: `100%`,
    position: `sticky`,
    top: `0px`,
    borderBottom: `1px solid #e0e0e0`,
    zIndex: 1000,
  },
  container: {
    height: 100,
    margin: 0,
    ...theme.mixins.containerStyles(theme),
    width: `100%`,
  },
}));

type HeaderProps = {
  links: NavLink[];
};

const Header: React.FC<HeaderProps> = ({ links }) => {
  const classes = useStyles();

  return (
    <nav
      className={classes.root}
      style={{
        backgroundColor: `#bdb9b9`,
      }}
    >
      <Grid
        className={classes.container}
        container
        direction="row"
        wrap="nowrap"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid
          item
          container
          style={{
            margin: 0,
          }}
        >
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
          wrap="nowrap"
        >
          {links.map(({ label, link, subLinks }) => (
            <Grid item key={`${link}-headerLink`}>
              <HeaderLink
                link={{
                  label,
                  link,
                  subLinks,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </nav>
  );
};

export default Header;
