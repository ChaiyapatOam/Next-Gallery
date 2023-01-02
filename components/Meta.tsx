import Head from 'next/head'
import React from 'react'
import { MetaType } from '../types'

type Props = {}

const Meta = (meta: MetaType) => {
  return (
    <Head>
    <title>{meta.title}</title>
  </Head>
  )
}

export default Meta