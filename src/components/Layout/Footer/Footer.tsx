import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Link from '~/components/Link/Link';
import { NavLink } from '../Header/HeaderLink.type';

type FooterProps = {
  links: NavLink[];
};

const Footer: React.FC<FooterProps> = ({ links }) => (
  <Box
    sx={{
      width: `100%`,
      paddingLeft: `2%`,
      paddingRight: `2%`,
      borderTop: `1px solid #e0e0e0`,
      paddingTop: 3,
    }}
  >
    <Grid container spacing={3}>
      <Grid item xs={12} container spacing={8} justifyContent="center">
        {links.map(({ subLinks, label, link }) => (
          <Grid
            item
            key={label}
            style={{ width: `initial` }}
            container
            wrap="nowrap"
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            {(subLinks ?? []).length > 0 ? (
              <>
                {subLinks?.map(({ label: subLabel, link: subLink }) => (
                  <Grid
                    item
                    xs={12}
                    key={subLabel}
                    style={{
                      flexBasis: `inherit`,
                    }}
                  >
                    <Link
                      href={{
                        pathname: subLink,
                      }}
                      color="inherit"
                      underline="none"
                    >
                      {subLabel}
                    </Link>
                  </Grid>
                ))}
              </>
            ) : (
              <Grid item xs={12}>
                <Link
                  href={{
                    pathname: link,
                  }}
                  color="inherit"
                  underline="none"
                >
                  {label}
                </Link>
              </Grid>
            )}
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="inherit" align="center">
          Copyright © {new Date().getFullYear()}
        </Typography>
      </Grid>
    </Grid>
  </Box>
);

export default Footer;
