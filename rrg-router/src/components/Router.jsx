import { Children, useEffect, useState } from "react"
import { EVENT } from "../utils/consts"
import { match } from 'path-to-regexp'
import { getCurrentPath } from "../utils/getCurrentPath"

export function Router({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
    const [currentPath, setCurentPath] = useState(getCurrentPath())

    useEffect(() => {
        const onLocationChange = () => {
            setCurentPath(getCurrentPath())
        }

        window.addEventListener(EVENT.PUSHSTATE, onLocationChange)
        window.addEventListener(EVENT.POPSTATE, onLocationChange)

        return () => {
            window.removeEventListener(EVENT.PUSHSTATE, onLocationChange)
            window.removeEventListener(EVENT.POPSTATE, onLocationChange)
        }
    }, [])

    let routeParams = {}

    const routerFromChildren = Children.map(children, ({ props, type }) => {
        const { name } = type
        const isRoute = name === 'Route'

        // return isRoute ? props : null

        if (!isRoute) return null

        return props
    })

    const routesToUse = routes.concat(routerFromChildren).filter(Boolean)

    const Page = routesToUse.find(({ path }) => {
        if (path === currentPath) return true

        // hemos usado path-to-regexp
        // para detectar rutas dinamicas
        // ejemplo --> /search/:query  (:query es una ruta dinamica) 
        const matcherUrl = match(path, { decode: decodeURIComponent })
        const matched = matcherUrl(currentPath)
        if (!matched) return false

        routeParams = matched.params
        return true
    })?.Component
    return Page
        ? <Page routeParams={routeParams} />
        : <DefaultComponent routeParams={routeParams} />
}