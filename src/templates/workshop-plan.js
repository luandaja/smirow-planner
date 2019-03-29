import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'
import Layout from '../components/Layout'
import Container from '../components/Container'
import PageTitle from '../components/PageTitle'
import SEO from '../components/SEO'
import CardFeedList from '../components/CardFeedList'

const PageTemplate = ({ data }) => {
  const title = `Plan de trabajo - ${data.contentfulWorkshop.title}`
  const { slug } = data.contentfulDayPlan
  const postNode = data.contentfulDayPlan
  postNode.metaDescription = null
  const columns = [
    {
      header: 'Valor',
      accessor: 'sessionValue',
      icon: 'hand victory',
      suggestedTime: '',
      isLink: true,
    },
    {
      header: 'Aprendizaje significativo',
      accessor: 'sessionInitialThought',
      icon: 'exclamation',
      suggestedTime: '5 min',
    },
    {
      header: 'Dinámica',
      accessor: 'sessionGame',
      icon: 'gem',
      suggestedTime: '15 min',
      isLink: true,
    },
    {
      header: 'Reflexión',
      accessor: 'sessionGameThought',
      icon: 'leaf',
      suggestedTime: '5 min',
    },
    {
      header: 'Actividad principal',
      accessor: 'sessionMainWork',
      icon: 'pin',
      suggestedTime: '4 min',
      isArray: true,
    },
    {
      header: 'Reflexión',
      accessor: 'sessionMainWorkThought',
      icon: 'star',
      suggestedTime: '10 min',
    },
    {
      header: 'Compromiso',
      accessor: 'sessionCommitment',
      icon: 'handshake outline',
      suggestedTime: '10 min',
    },
  ]

  const tableData = data.allContentfulDayPlan.edges
    .map(item => ({
      date: item.node.date,
      sessionValue: item.node.sessionValue.title.replace('Valor: ', ''),
      sessionValueLink: item.node.sessionValue.slug,
      sessionInitialThought:
        item.node.sessionInitialThought.childMarkdownRemark.html,
      sessionGame: item.node.sessionGame.title.replace('Dinámica: ', ''),
      sessionGameLink: item.node.sessionGame.slug,
      sessionGameThought: item.node.sessionGameThought.childMarkdownRemark.html,
      sessionMainWork: item.node.sessionMainWork.map(item => (
        <Link to={item.slug} key={item.slug}>
          {item.title.replace('Actividad: ', '')}{' '}
        </Link>
      )),
      sessionMainWorkThought:
        item.node.sessionMainWorkThought.childMarkdownRemark.html,
      sessionCommitment: item.node.sessionCommitment.childMarkdownRemark.html,
    }))
    .sort(item => item.date)

  console.log(tableData)
  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO pagePath={slug} postNode={postNode} pageSEO />

      <Container>
        <PageTitle>{title}</PageTitle>
        <CardFeedList data={tableData} feedContent={columns} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    allContentfulDayPlan(filter: { workshop: { slug: { eq: $slug } } }) {
      edges {
        node {
          date
          sessionValue {
            title
            slug
          }
          sessionInitialThought {
            childMarkdownRemark {
              html
            }
          }

          sessionGame {
            title
            slug
          }
          sessionGameThought {
            childMarkdownRemark {
              html
            }
          }

          sessionMainWork {
            title
            slug
          }

          sessionMainWorkThought {
            childMarkdownRemark {
              html
            }
          }

          sessionCommitment {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    contentfulDayPlan(workshop: { slug: { eq: $slug } }) {
      title
      slug
      body: childContentfulDayPlanSessionInitialThoughtTextNode {
        childMarkdownRemark {
          html
          excerpt(pruneLength: 320)
        }
      }
    }
    contentfulWorkshop(slug: { eq: $slug }) {
      title
    }
  }
`

export default PageTemplate
