import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import rehypeReact from "rehype-react"
import styled from "styled-components"

const StyledSection = styled.section`
  pre {
    background: white;
    border: 1px solid #eee;
  }

  h2 {
    position: relative;

    ::before {
      content: "";
      width: 6px;
      height: 30px;
      background-color: #007acc;
      position: absolute;
      left: -16px;
      top: 1px;
    }
  }
`
const Time = styled.span`
  font-size: 0.83255rem;
  line-height: 1.75rem;
  margin-left: 10px;
`

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const renderAst = new rehypeReact({
    createElement: React.createElement,
  }).Compiler

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
            }}
          >
            {post.frontmatter.date}
            {post.frontmatter.lastUpdate && (
              <Time>({post.frontmatter.lastUpdate}更新)</Time>
            )}
          </p>
        </header>
        <StyledSection>{renderAst(post.htmlAst)}</StyledSection>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      htmlAst
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        lastUpdate(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
