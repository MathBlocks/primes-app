// Shamelessly adapted from OpenZeppelin-contracts test utils

import {
  bufferToHex,
  keccak256,
  keccakFromString,
} from 'ethereumjs-util'
import { hexToBytes, soliditySha3 } from 'web3-utils'
import { useAsync } from 'react-use'
import { useState } from 'react'

// Merkle tree called with 32 byte hex values
export class MerkleTree {
  private readonly elements: Buffer[]

  private readonly layers: Buffer[][]

  private static bufArrToHexArr(arr: Buffer[]): string[] {
    if (arr.some((el) => !Buffer.isBuffer(el))) {
      throw new Error('Array is not an array of buffers')
    }

    return arr.map((el) => `0x${el.toString('hex')}`)
  }

  private static sortAndConcat(...args: Buffer[]): Buffer {
    return Buffer.concat([...args].sort(Buffer.compare))
  }

  private static getPairElement(
    idx: number,
    layer: Buffer[],
  ): null | Buffer {
    const pairIdx = idx % 2 === 0 ? idx + 1 : idx - 1

    if (pairIdx < layer.length) {
      return layer[pairIdx] as Buffer
    }
    return null
  }

  private static bufIndexOf(
    el: string | Buffer,
    arr: Buffer[],
  ): number {
    let hash

    // Convert element to 32 byte hash if it is not one already
    if (el.length !== 32 || !Buffer.isBuffer(el)) {
      hash = keccakFromString(el as string)
    } else {
      hash = el
    }

    for (let i = 0; i < arr.length; i++) {
      if (hash.equals(arr[i])) {
        return i
      }
    }

    return -1
  }

  private static getNextLayer(elements: Buffer[]): Buffer[] {
    return elements.reduce<Buffer[]>((layer, el, idx, arr) => {
      if (idx % 2 === 0) {
        // Hash the current element with its pair element
        layer.push(MerkleTree.combinedHash(el, arr[idx + 1]))
      }

      return layer
    }, [])
  }

  private static combinedHash(
    first: Buffer,
    second: Buffer,
  ): Buffer {
    if (!first) {
      return second
    }
    if (!second) {
      return first
    }

    return keccak256(MerkleTree.sortAndConcat(first, second))
  }

  private getLayers(): Buffer[][] {
    if (this.elements.length === 0) {
      return [['']] as unknown as Buffer[][]
    }

    const layers = []
    layers.push(this.elements)

    // Get next layer until we reach the root
    while (layers[layers.length - 1].length > 1) {
      layers.push(MerkleTree.getNextLayer(layers[layers.length - 1]))
    }

    return layers
  }

  private bufDedup(): Buffer[] {
    return this.elements.filter((el, idx) => {
      return idx === 0 || !this.elements[idx - 1].equals(el)
    })
  }

  constructor(elements: string[]) {
    this.elements = elements
      .filter((el) => el)
      .map((el) => Buffer.from(hexToBytes(el)))

    // Sort elements
    this.elements.sort(Buffer.compare)

    // Deduplicate elements
    this.elements = this.bufDedup()

    // Create layers
    this.layers = this.getLayers()
  }

  public get root(): Buffer {
    return this.layers[this.layers.length - 1][0]
  }

  public get hexRoot() {
    return bufferToHex(this.root)
  }

  public getProof(el: Buffer): Buffer[] {
    let idx = MerkleTree.bufIndexOf(el, this.elements)

    if (idx === -1) {
      throw new Error('Element does not exist in Merkle tree')
    }

    return this.layers.reduce((proof, layer) => {
      const pairElement = MerkleTree.getPairElement(idx, layer)

      if (pairElement) {
        proof.push(pairElement)
      }

      idx = Math.floor(idx / 2)

      return proof
    }, [])
  }

  // external call - convert to buffer
  public getHexProof(_el: string): string[] {
    const el = Buffer.from(hexToBytes(_el))

    const proof = this.getProof(el)

    return MerkleTree.bufArrToHexArr(proof)
  }
}

export const createTreeWithAccounts = (
  accounts: string[],
): MerkleTree => {
  const elements = accounts.map((account) =>
    soliditySha3(account),
  ) as string[]
  return new MerkleTree(elements)
}

export const createWhitelistTree = (
  allocations: Record<string, [number, number]>,
): MerkleTree => {
  const elements = Object.entries(allocations).map(
    ([account, [batch0Cap, batch1Cap]]) =>
      soliditySha3(account, batch0Cap, batch1Cap),
  ) as string[]
  return new MerkleTree(elements)
}

export const getAccountProof = (
  tree: MerkleTree,
  account: string,
  batch0Cap: number,
  batch1Cap: number,
) => {
  const element = soliditySha3(
    account,
    batch0Cap,
    batch1Cap,
  ) as string
  return tree.getHexProof(element)
}

const EMPTY_WHITELIST_PROOF = {
  batch0Cap: 0,
  batch1Cap: 0,
  proof: [],
}

export const useWhitelistProof = (account?: string) => {
  const [proof, setProof] = useState<{
    batch0Cap: number
    batch1Cap: number
    proof: string[]
  }>(EMPTY_WHITELIST_PROOF)

  useAsync(async () => {
    if (!account) {
      setProof(EMPTY_WHITELIST_PROOF)
      return
    }

    try {
      const response = await fetch(
        `${window.location.origin}/whitelist.json`,
      )

      const json = (await response.json()) as Record<
        string,
        [number, number]
      >

      if (!json[account]) {
        setProof(EMPTY_WHITELIST_PROOF)
        return
      }

      const [batch0Cap, batch1Cap] = json[account]
      const tree = createWhitelistTree(json)
      const proof = getAccountProof(
        tree,
        account,
        batch0Cap,
        batch1Cap,
      )

      setProof({ batch0Cap, batch1Cap, proof })
    } catch (error) {
      console.error(error)
    }
  }, [account])

  return proof
}

export const useAttributesProof = (tokenId?: number) => {
  const [proof, setProof] = useState<
    { value: number; proof: string[] } | undefined
  >()

  useAsync(async () => {
    if (!tokenId) return
    try {
      const response = await fetch(
        `${window.location.origin}/attribute-proofs/${tokenId}.json`,
      )
      const json = (await response.json()) as {
        value: string
        proof: string[]
      }
      setProof({ value: parseInt(json.value), proof: json.proof })
    } catch (error) {
      console.error(error)
    }
  }, [setProof, tokenId])

  return proof
}
