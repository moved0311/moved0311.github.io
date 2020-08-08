import React from "react"
import styled from "styled-components"

const Container = styled.ul`
  display: inline-flex;
  margin-left: 5px;
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

const Tag = ({ children }) => {
  return (
    <Container>
      {children && children.map(tag => <StyledTag key={tag}>{tag}</StyledTag>)}
    </Container>
  )
}

export default Tag
