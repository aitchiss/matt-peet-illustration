import React from 'react';
import { graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown';
import Layout from '../components/Layout/Layout';
import globalStyles from '../components/global.module.css';
import aboutStyles from './about.module.css';

export const AboutPageTemplate = ({ content }) => {
  return (
    <main className={aboutStyles.wrapper}>
      <h1 className={globalStyles.visuallyHidden}>About</h1>
      <ReactMarkdown source={content} />
    </main>
  );
};

const AboutPage = ({ data = {} }) => {
  const { about = { nodes: [] }, home = { nodes: [] } } = data;
  const { frontmatter: homeDetail = {} } = home.nodes[0];
  const { headerLogo, socialLinks } = homeDetail;

  const { frontmatter = {} } = about.nodes[0];

  return (
    <Layout headerLogoUrl={headerLogo.publicURL} socialLinks={socialLinks}>
      <AboutPageTemplate content={frontmatter.content} />
    </Layout>
  );
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    about: allMarkdownRemark(filter: { id: { eq: $id } }) {
      nodes {
        frontmatter {
          content
        }
      }
    }
    home: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "index-page" } } }
    ) {
      nodes {
        frontmatter {
          headerLogo {
            publicURL
          }
          socialLinks {
            description
            faIcon
            url
          }
        }
      }
    }
  }
`;
