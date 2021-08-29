import React from "react"
import { graphql } from "gatsby"
import _ from "lodash"
import TagPageTemplate from "../../components/tags/tagPageTemplate"

const TagPage = ({ data, ...rest }) => {
  const siteTitle = _.get(data, "site.siteMetadata.title", "")
  const posts = _.get(data, "allMarkdownRemark.edges", [])
  return <TagPageTemplate posts={posts} siteTitle={siteTitle} rest={rest} />
}
export default TagPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: "Gatsby" } } }
    ) {
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
