import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 20px 15px;
`
const Title = styled.div`
  padding: 0px 15px 10px;
  font-size: 18px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    display: block;
    left: 5px;
    top: 5px;
    height: 18px;
    width: 4px;
    background-color: #1890ff;
  }
`

function Paragraph({ title, content }) {

  return (
    <Container>
      <Title>{title}</Title>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Container>
  )
}

export default Paragraph
