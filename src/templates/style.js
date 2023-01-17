import styled from "styled-components"

const PostContent = styled.section`
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

  .language-text {
    color: #e38e00;
    background-color: inherit;
    border: 1px solid #dcdcdc;
    padding: 0 4px;
  }
`

export default PostContent
