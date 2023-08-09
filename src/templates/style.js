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
    /* color: #ff6363; */
    /* background-color: #ffebeb; */
    color: #ff4545;
    background-color: #fff2f2;
    padding: 0 4px;
    text-shadow: none;
  }
`

export default PostContent
