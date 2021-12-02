import { FC, useEffect, useMemo } from 'react'
import { useToggle } from 'react-use'

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloProvider as BaseApolloProvider,
} from '@apollo/client'
import {
  persistCache,
  LocalStorageWrapper,
} from 'apollo3-cache-persist'
import { RetryLink } from '@apollo/client/link/retry'
import { onError } from '@apollo/client/link/error'
import ApolloLinkTimeout from 'apollo-link-timeout'

import { useGraphQlEndpoints } from '../../config'

const retryIf = (error: { statusCode: number }) => {
  const doNotRetryCodes = [500, 400]
  return !!error && !doNotRetryCodes.includes(error.statusCode)
}

const cache = new InMemoryCache()

export const ApolloProvider: FC = ({ children }) => {
  const graphQLEndpoints = useGraphQlEndpoints()
  const [persisted, setPersisted] = useToggle(false)

  useEffect(() => {
    persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
    })
      .then(() => {
        setPersisted(true)
      })
      .catch((error) => {
        setPersisted(true)
        console.error(error)
      })
  }, [setPersisted])

  const client = useMemo<
    ApolloClient<NormalizedCacheObject> | undefined
  >(() => {
    if (!graphQLEndpoints || !persisted) return undefined

    const timeoutLink = new ApolloLinkTimeout(30000)

    const httpLink = new HttpLink({ uri: graphQLEndpoints.subgraph })

    const retryLink = new RetryLink({
      delay: { initial: 1e3, max: 5e3, jitter: true },
      attempts: { max: 1, retryIf },
    })

    const errorLink = onError(({ networkError, graphQLErrors }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, ..._error }) => {
          console.error(message, _error)
        })
      }

      if (networkError) {
        console.error(networkError.message)
      }
    })

    const link = ApolloLink.from([
      errorLink,
      retryLink,
      timeoutLink,
      httpLink,
    ])

    return new ApolloClient<NormalizedCacheObject>({
      cache,
      link,
    })
  }, [graphQLEndpoints, persisted])

  return client ? (
    <BaseApolloProvider client={client}>
      {children}
    </BaseApolloProvider>
  ) : (
    <div>Loading...</div>
  )
}
