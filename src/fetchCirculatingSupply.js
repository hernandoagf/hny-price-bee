const gql = require('graphql-tag')
const { GraphQLWrapper } = require('@aragon/connect-thegraph')

const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/onbjerg/honey'

const CIRC_SUPPLY_QUERY = gql`
  query {
    total: holder(id: "0x0000000000000000000000000000000000000000") {
      amount
    }
    pool: holder(id: "0x4ba7362f9189572cbb1216819a45aba0d0b2d1cb") {
      amount
    }
  }
`

const fetchData = async () => {
  const graphqlClient = new GraphQLWrapper(SUBGRAPH_URL)
  const result = await graphqlClient.performQuery(CIRC_SUPPLY_QUERY)

  if (!result.data) return undefined
  return result
}

exports.getCircSupply = async () => {
  const res = await fetchData()
  const circSupply = (Math.abs(res.data.total.amount) - res.data.pool.amount) / 1e18

  // eslint-disable-next-line
  return circSupply
}
