import { ComponentProps, FC } from 'react'
import BaseModal from 'styled-react-modal'
import styled from 'styled-components'
import { theme } from '../theme'

const StyledModal = styled(BaseModal)``

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 20rem;
  max-width: 40rem;
  padding: 2rem;
  border-radius: 0.25rem;
  background-color: ${theme.grey[1]};
  max-height: 90vh;

  ${theme.dropShadow1}

  > .content {
    overflow-y: auto;
  }

  > .title {
    font-weight: bold;
    margin-top: -0.5rem;
    font-size: 1.2rem;
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
