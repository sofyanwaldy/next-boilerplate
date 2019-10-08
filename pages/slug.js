const Slug = (props) => {
  console.log(props)
  return (
    <>
    test
    </>
  )
}
Slug.getInitialProps = async ({ query: { slug } }) => {
  return { slug }
}
export default Slug
