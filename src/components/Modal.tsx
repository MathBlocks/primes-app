import { ComponentProps, FC } from 'react'
import BaseModal from 'styled-react-modal'
import styled from 'styled-components'

const StyledModal = styled(BaseModal)``

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 20rem;
  max-width: 40rem;
  padding: 2rem;
  border-radius: 0.25rem;
  border: 1px white solid;
  background-color: black;
  max-height: 90vh;

  > .content {
    overflow-y: auto;
  }

  > .title {
    font-weight: bold;
    font-size: 1.4rem;
    text-align: center;
  }
`

export const Modal: FC<
  { title?: string } & ComponentProps<typeof BaseModal>
> = ({
  afterClose,
  afterOpen,
  allowScroll,
  backgroundProps,
  beforeClose,
  beforeOpen,
  children,
  isOpen,
  onBackgroundClick,
  onEscapeKeydown,
  title,
}) => {
  return (
    <StyledModal
      afterClose={afterClose}
      afterOpen={afterOpen}
      allowScroll={allowScroll}
      backgroundProps={backgroundProps}
      beforeClose={beforeClose}
      beforeOpen={beforeOpen}
      isOpen={isOpen}
      onBackgroundClick={onBackgroundClick}
      onEscapeKeydown={onEscapeKeydown}
    >
      <Inner>
        <div className="title">{title}</div>
        <div className="content">{children}</div>
      </Inner>
    </StyledModal>
  )
}
