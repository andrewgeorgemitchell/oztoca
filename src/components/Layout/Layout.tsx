import Head from 'next/head';
import React from 'react';

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
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {tags?.map(({ name, content }) => (
        <meta key={name} name={name} content={content} />
      ))}
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {children}
  </>
);

export default Layout;
