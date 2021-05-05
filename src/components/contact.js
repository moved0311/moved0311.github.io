/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"

const Link = styled.a`
  text-decoration: none;
  color: white;
`
const CommunityContainer = styled.div`
  width: 150px;
  height: 32px;
  justify-content: space-between;
  display: flex;
  margin-bottom: 30px;
`

const Contact = () => {
  const data = useStaticQuery(graphql`
    query ContactQuery {
      githubDark: file(absolutePath: { regex: "/github-dark.png/" }) {
        childImageSharp {
          fixed(width: 32, height: 32) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      facebook: file(absolutePath: { regex: "/facebook-dark.png/" }) {
        childImageSharp {
          fixed(width: 32, height: 32) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      linkedin: file(absolutePath: { regex: "/linkedin.png/" }) {
        childImageSharp {
          fixed(width: 32, height: 32) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      cv: file(absolutePath: { regex: "/cv.png/" }) {
        childImageSharp {
          fixed(width: 32, height: 32) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
            facebook
            linkedin
          }
        }
      }
    }
  `)

  const { social } = data.site.siteMetadata
  return (
    <div>
      <CommunityContainer>
        <Link href={social.github} target="_blank">
          <Image fixed={data.githubDark.childImageSharp.fixed} />
        </Link>
        <Link href={social.facebook} target="_blank">
          <Image fixed={data.facebook.childImageSharp.fixed} />
        </Link>
        <Link href={social.linkedin} target="_blank">
          <Image fixed={data.linkedin.childImageSharp.fixed} />
        </Link>
        <Link href="resume.pdf" target="_blank">
          <Image fixed={data.cv.childImageSharp.fixed} />
        </Link>
      </CommunityContainer>
    </div>
  )
}

export default Contact
