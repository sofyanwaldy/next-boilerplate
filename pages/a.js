import React from 'react'
import { withRouter } from 'next/router'

const a = (props, qry) => {
  // const {router} = props
  console.log(props)
  console.log(qry)
  return (
    <div>
      a
    </div>
  )
}

// console.log(a)
a.getInitialProps = ({quer}) => {
  console.log('query', quer)
  return {
    qry: quer
  }
}
  
export default a