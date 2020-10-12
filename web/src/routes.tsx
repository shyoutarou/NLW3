import React from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/app" exact component={OrphanagesMap} />
        </BrowserRouter>
    )
}

export default Routes