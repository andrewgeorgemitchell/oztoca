import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import React, { useMemo } from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const useStyles = makeStyles(() => ({
  root: {
    display: `flex`,
    flexDirection: `column`,
    minHeight: `100vh`,
    overflowX: `hidden`,
  },
}));

type LayoutProps = {
  title: string;
  description: string;
  tags?: Array<{
    name: string;
    content: string;
  }>;
};

const Layout: React.FC<LayoutProps> = ({
  title,
  description,
  tags,
  children,
}) => {
  const classes = useStyles();

  const NavLinks = useMemo(
    () => [
      {
        label: `Kittens`,
        link: `/cats`,
      },
      {
        label: `Adults`,
        link: `/cats`,
        // subLinks: [
        //   {
        //     label: `Queens`,
        //     link: `/queens`,
        //   },
        //   {
        //     label: `Studs`,
        //     link: `/studs`,
        //   },
        //   {
        //     label: `Champions`,
        //     link: `/champions`,
        //   },
        // ],
      },
      {
        label: `Testimonials`,
        link: `/testimonials`,
      },
      {
        label: `Tips`,
        subLinks: [
          {
            label: `New Kitten Tips`,
            link: `/new-kitten-tips`,
          },
        ],
      },
      {
        label: `Gallery`,
        link: `/gallery`,
      },
      {
        label: `Contact`,
        link: `/contact`,
      },
    ],
    [],
  );

  return (
    <div className={classes.root}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {tags?.map(({ name, content }) => (
          <meta key={name} name={name} content={content} />
        ))}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header links={NavLinks} />
      <main style={{ width: `100%`, flexGrow: 2, background: `#fff` }}>
        {children}
      </main>
      <Footer links={NavLinks} />
    </div>
  );
};

export default Layout;
