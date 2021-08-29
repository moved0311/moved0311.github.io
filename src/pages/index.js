import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Contact from "../components/contact"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Tag from "../components/tags/tag"
import Categories from "../components/categories"
import { rhythm } from "../utils/typography"
import _ from "lodash"

const BlogIndex = ({ data, location }) => {
  const siteTitle = _.get(data, "site.siteMetadata.title", "")
  const posts = _.get(data, "allMarkdownRemark.edges", [])
  const categories = _.get(data, "allMarkdownRemark.group", [])
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Contact />
      <Bio />
      <Categories categories={categories} />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        const tags = _.get(node, "frontmatter.tags", [])
        const isDraft = node.frontmatter.draft
        return (
          <article key={node.fields.slug} hidden={isDraft}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>

              {tags && <Tag>{tags}</Tag>}
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            draft
          }
        }
      }
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`
