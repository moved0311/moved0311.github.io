import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Container = styled.ul`
  display: inline-flex;
  margin-left: 5px;
  flex-wrap: wrap;
`
const StyledTag = styled.li`
  border-radius: 4px;
  border: 1px solid grey;
  padding: 2px 6px;
  margin-right: 5px;
  font-size: 70%;
  font-weight: bold;
  background: #007acc;
  color: white;
  list-style: none;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`
const Categories = ({ categories }) => {
  return (
    <Container>
      {categories.map(({ tag, totalCount }) => (
        <StyledLink key={tag} to={`/tags/${tag}`}>
          <StyledTag>{`${tag} (${totalCount})`}</StyledTag>
        </StyledLink>
      ))}
    </Container>
  )
}
export default Categories
