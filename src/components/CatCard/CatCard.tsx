import { Button, Card, CardActions, CardHeader } from '@mui/material';
import React from 'react';
import { NextLinkComposed } from '~/components/Link/Link';
import { SanityImage } from '~/components/SanityImage/SanityImage';

type CatCardProps = {
  name: string;
  imageUrl: string;
  slug: string;
};

const CatCard: React.FC<CatCardProps> = ({ imageUrl, name, slug }) => (
  <Card
    sx={{
      width: 320,
    }}
  >
    <SanityImage alt={name} src={imageUrl} height={180} width={320} />
    <CardHeader
      sx={{
        '& .MuiCardHeader-content': {
          maxWidth: `100%`,
        },
      }}
      title={name}
      titleTypographyProps={{
        noWrap: true,
        style: {
          maxWidth: `100%`,
        },
      }}
      style={{ maxWidth: `100%` }}
    />
    <CardActions style={{ display: `flex`, flexDirection: `row-reverse` }}>
      <Button
        variant="outlined"
        color="secondary"
        component={NextLinkComposed}
        to={`/cats/${slug}`}
      >
        View Bobtail
      </Button>
    </CardActions>
  </Card>
);

export default CatCard;
