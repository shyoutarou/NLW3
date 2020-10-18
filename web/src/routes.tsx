import React from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import Orphanage from './pages/Orphanage'
import CreateOrphanage from './pages/CreateOrphanage'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import RedefinePassword from './pages/RedefinePassword'


const Routes = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={RedefinePassword} />
            <Route path="/app" exact component={OrphanagesMap} />
            <Route path="/orphanages/create" exact component={CreateOrphanage} />
            <Route path="/orphanage/:id" exact component={Orphanage} />
        </BrowserRouter>
    )
}

export default Routes