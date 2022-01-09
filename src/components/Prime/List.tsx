import { FC, ReactChild } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 1rem 0;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }
`

export const List: FC<{
  title: string
  items: { id: string; value: ReactChild }[]
}> = ({ title, items }) => (
  <Container>
    <h3>{title}</h3>
    <ul>
      {items.length ? (
        items.map((item) => <li key={item.id}>{item.value}</li>)
      ) : (
        <li>None</li>
      )}
    </ul>
  </Container>
)
