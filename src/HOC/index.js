import React from 'react'

import Layout from '../components/Layout'

const withLayout = Component => props => <Layout>
    <Component {...props}/>
</Layout>

export { withLayout }
