var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var _ = require("lodash");


var pure = require('./pure.js');
var Route = require('./Route.js');
var _isEqual = require('lodash').isEqual;

module.exports = {
    name: 'router',
    route: null,
    channels: ['router.navigation'],
    init(definition, done) {

        var core = this;

        /**
         * @module router
         */
        var router = {
             /**
             * The route object
             */
            route: null,

            /**
             * The query object
             */
            query: null,
             /**
             * @function
             * @memberof router
             * @description get a query property.
             */
            get() {
                if (!router.route) return null;
                return router.route.get.apply(router.route, arguments)
            },
            /**
             * @function
             * @description set a query property.
             */
            set() {
                if (!router.route) return null;
                return router.route.set.apply(router.route, arguments)
            },
            /**
             * @function
             * @description remove a query property.
             */
            remove() {
                if (!router.route) return null;
                return router.route.remove.apply(router.route, arguments)
            },

            /**
             * @function
             * @description push a value to a query property.
             */
            push(path, value) {
                if (!router.route) return null;
                var existing = router.route.get(path);
                if(!existing) existing = [];
                existing.push(value);
                router.route.set(path, existing);
                return existing;
            },

             /**
             * @function
             * @description pop a value from a query property.
             */
            pop(path, value) {
                if (!router.route) return null;
                var existing = router.route.get(path);
                if(!existing) return [];
                if(!core.isArray(existing)){
                    return console.warn(`router - cannot pop from non array, route property '${ path.toString() }' is of type ${ core.typeOf(existing) }`)
                }
                existing = existing.filter(function(v){
                    if(v === value) return false;
                    if(core.isObject(v) && core.isObject(value)){
                        if(_isEqual(v, value)) return false;
                    }
                    return true;
                });
                router.route.set(path, existing);
                return existing;
            },

            /**
             * @function
             * @description update a value in an array query property.
             */
            update(path, selector, data) {
                if (!router.route) return null;
                var existing = router.route.get(path);
                if(!existing) {
                    existing = [];
                }
                if(!core.isArray(existing)){
                    return console.warn(`router - cannot update in a non array, route property '${ path.toString() }' is of type ${ core.typeOf(existing) }`)
                }
                var assigned = false;
                existing = existing.map(function(v){
                    if(v === selector) {
                        assigned = true;
                        return core.assign({}, v, data);
                    }
                    if(core.isObject(v) && core.isObject(selector)){
                        for(var m in selector){
                            if(selector[m] !== v[m]){ return v; }
                        }
                        assigned = true;
                        return core.assign({}, v, data);
                    }
                    return v;
                });
                if(!assigned){
                    existing.push(core.assign({}, selector, data))
                }
                router.route.set(path, existing);
                return existing;
            },

            /**
             * @function
             * @description route to a url.
             */
            to() {
                if (!router.route) return null;
                return router.route.to.apply(router.route, arguments)
            },

            getParams(url) {
                let u = url;
                if(typeof url === "undefined") {
                    u = location.hash;
                }

                try {
                    return JSON.parse(decodeURIComponent(u.substring(u.lastIndexOf("/") + 1)));
                }
                catch(e) {
                    return {};
                }
            },

            /**
             * @function
             * @description route to a url.
             */
            link(url, query) {
                if(!url){
                    return '#';
                }
                if(url.indexOf('/') !== 0){
                    url = '/' + url;
                }
                if(url.lastIndexOf('/') !== (url.length - 1)){
                    url = url + '/';
                }
                url = '#' + url;
                if(query){
                    try{
                        var s = encodeURIComponent(JSON.stringify(query));
                        url = url + s;
                    }
                    catch(err){
                        console.error(`cannot stringify query from ${ core.typeOf(query) }`)
                    }
                }
                return url;
            },

            keyHasChanged(key){
                var a = router.lastQuery && router.lastQuery[key];
                var b = router.query && router.query[key];
                if(a === b){ return false; }
                return !pure.equals(a, b);
            },

            hasOnlyChanged(keys){
                if(!Array.isArray(keys)){
                    keys = [keys];
                }
                var lastKeys = router.lastQuery && Object.keys(router.lastQuery);
                var currentKeys = router.query && Object.keys(router.query);
                if(!lastKeys || !currentKeys){
                    return false;
                }
                lastKeys.map(key => {
                    if(currentKeys.indexOf(key) === -1){
                        currentKeys.push(key);
                    }
                })
                for(var i = 0; i < currentKeys.langth; i++){
                    if(router.keyHasChanged(currentKeys[i])){
                        if(keys.indexOf(currentKeys[i]) === -1){
                            return false;
                        }
                    }
                }
                return true;
            },

            getUrlQuery(url){
                return router.parseUrl(url).query;
            },

            parseUrl(url){
                let result = { path: [], query: {} };
                if(!url){ return result; }
                let queryStart = url.indexOf('{');
                if((queryStart === -1) && (url.indexOf('%7B') > -1)){  // '%7B' = encoded '{'
                    url = decodeURIComponent(url);
                    queryStart = url.indexOf('{');
                }
                if(queryStart > -1){
                    try {
                        let urlString = url.slice(0, queryStart);
                        let queryString = url.slice(queryStart);
                        result.path = urlString.split('/').filter(t => t);
                        result.query = JSON.parse(queryString) || {};
                    } catch (err) {
                        console.error(err);
                        result.error = err;
                        return result;
                    }
                }
                else{
                    result.path = url.split('/').filter(t => t);
                }
                return result;
            },

            navigationCount: 0
        };

        var Router = createReactClass({
            propTypes: {
                components: PropTypes.object,
                routes: PropTypes.array,
                defaultRoute: PropTypes.string,
                onNavigation: PropTypes.func,
            },
            getInitialState() {
                router.element = this;
                return {
                    route: null
                };
            },
            getDefaultProps(){
                return {
                    components: core.components
                };
            },
            onHashChange() {
                var hash = decodeURIComponent(location.hash.substr(1));
                var queryStart = hash.indexOf('{');
                var name, urlArray, urlString, query, queryString;
                if (queryStart > -1) {
                    try {
                        urlString = hash.slice(0, queryStart);
                        queryString = hash.slice(queryStart);
                        query = JSON.parse(queryString);
                        Route.prototype.query = query;
                    } catch (err) {
                        alert('cannot parse json url, your address is not correct');
                        return;
                    }
                } else {
                    urlString = hash;
                    Route.prototype.query = {};
                }
                urlArray = urlString.split('/').filter(n => n);
                var topRoute = {
                    map: this.props.routes ? {
                        children: this.props.routes
                    } : null,
                };
                var route = new Route(urlArray, topRoute, this);
                if (!route.component) {
                    return (location.hash = this.props.defaultRoute);
                }
                router.navigationCount++;
                this.setRoute(route);
            },

            setRoute(route) {
                var hash = location.hash.substr(1);
                var newHash = pure.routeToUrl(route);
                if (newHash !== hash) { // fix url in address bar
                    history.replaceState(null, null, '#' + decodeURIComponent(newHash));
                }
                router.lastQuery = router.query;
                router.query = JSON.parse(JSON.stringify(route.get()));
                this.route = router.route = route;
                if (this.props.onNavigation) this.props.onNavigation(route, Route);
                core.fire('router.navigation', route);
                core.emit('router.navigation', route);
                this.setState({
                    route: route
                });
            },
            toRoute(route, silent, newTab) {
                if (newTab) {
                    let href = window.location.href;
                    let base = window.location.origin;
                    if (href.indexOf('#') != -1) {
                        base = href.split('#')[0] + '#';
                    }
                    let hash = pure.routeToUrl(route);
                    window.open(base + hash);
                } else if (silent) {
                    this.setRoute(route);
                } else {
                    location.hash = pure.routeToUrl(route);
                }
            },
            setQuery(query, silent) {
                var route = this.route;
                route.query = query;
                this.toRoute(route, silent);
            },

            componentDidMount() {
                window.addEventListener('hashchange', this.onHashChange);
                this.onHashChange();
                router.element = this;
            },
            componentWillUnmount() {
                window.removeEventListener('hashchange', this.onHashChange);
            },
            renderRoute(route, id) {
                if (!route.name) return null;
                var component = pure.lookup(this.props.components, route.component);
                if (!component) return null;
                var children = route.children || [];
                var props = {
                    key: id,
                    route: route,
                    ...route.query
                };
                return React.createElement(component, props, children.map((child, i) => {
                    return this.renderRoute(child, `${id}.${i}`);
                }));
            },
            render() {
                var route = this.route;
                if (!route) return null;
                return this.renderRoute(route, '0');
            }
        });


        Router.pure = pure;
        router.Router = Router;
        done(router);
    }
};