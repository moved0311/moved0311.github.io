import React from "react"
import { Link } from "gatsby"

import Bio from "../bio"
import Layout from "../layout"
import SEO from "../seo"
import Tag from "./tag"
import _ from "lodash"
import { rhythm } from "../../utils/typography"

const TagPageTemplate = ({ posts, siteTitle, rest }) => {
  const { location } = rest
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
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
export default TagPageTemplate
