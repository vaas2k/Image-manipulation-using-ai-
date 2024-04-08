import React from 'react'
import { Text } from '@chakra-ui/react'
const HeaderCred = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  return (
    <>
      <Text fontSize={'25px'} className="h2-bold text-dark-600">{title}</Text>
      {subtitle && <p className="p-16-regular mt-4">{subtitle}</p>}
    </>
  )
}

export default HeaderCred