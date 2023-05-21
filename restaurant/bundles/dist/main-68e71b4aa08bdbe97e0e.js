/*! For license information please see main-68e71b4aa08bdbe97e0e.js.LICENSE.txt */
                    restaurants: restaurantByKeyword(keyword: $keyword, onlyNew: $onlyNew, rating: $rating) {
                        id,
                        name,
                        added,
                        visited,
                        rating,
                        tags,
                        neighborhood {
                            id,
                            name,
                            level
                        },
                        notes
                    }
                }`,variables(){return{keyword:this.filterString,onlyNew:this.filterVisited,rating:2*this.filterRating}}}}},D8,[],!1,null,"227179ae",null);$8.options.__file="src/components/list.vue";const N8=$8.exports;var U8=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",[t._v("\n    Add a Restaurant\n    \n")])};U8._withStripped=!0;var G8=L8({name:"restAdd",data:()=>({}),computed:{},methods:{}},U8,[],!1,null,"56e6ce41",null);G8.options.__file="src/components/add.vue";const q8=G8.exports;var W8=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"menubar bg-dark text-white"},[n("h1",[t._v("Lieblingsrestaurants")]),t._v(" "),n("b-nav",{attrs:{pills:"",align:"right"}},t._l(t.menuitems,(function(e){return n("b-nav-item",{key:e.name,attrs:{active:t.activeitem==e.name},on:{click:function(n){return t.navClick(e.name)}}},[n("b-icon",{attrs:{icon:e.icon}})],1)})),1)],1)};W8._withStripped=!0;const Z8={name:"menubar",data:()=>({}),computed:{menuitems(){return this.$store.getters.menuitems},activeitem(){return this.$store.getters.activeitem}},methods:{navClick:function(t){this.$store.commit("activeitem",t)}}};n(829);var X8=L8(Z8,W8,[],!1,null,"a380d422",null);X8.options.__file="src/components/menu.vue";const Q8={name:"App",components:{menubar:X8.exports,restList:N8,restAdd:q8,restMap:P8},computed:{activeitem(){return this.$store.getters.activeitem}}};n(922);var Y8=L8(Q8,C8,[],!1,null,"7ba5bd90",null);Y8.options.__file="src/App.vue";const K8=Y8.exports;n(949),n(20);const J8=new Oa({defaultClient:new ke({link:Ie({uri:"/graphql"}),cache:new On})});t.default.use(O),t.default.use(Oa),t.default.use(k8),t.default.use(S8);const t6=new O.Store({state:{menuitems:[{name:"restList",icon:"list-ul"},{name:"restAdd",icon:"plus-circle"},{name:"restMap",icon:"pin-map"}],activeitem:"restList",restaurants:[{id:1,name:"this",rating:7,neighborhood:[{name:"Ehrenfeld",level:1},{name:"Neu-Ehrenfeld",level:2}]},{id:2,name:"is"},{id:3,name:"mock",rating:5},{id:4,name:"data",rating:10}]},getters:{menuitems:t=>t.menuitems,activeitem:t=>t.activeitem,restaurants:t=>t.restaurants},mutations:{activeitem(t,e){t.activeitem=e}},actions:{fetchAllRestaurantsAsync({commit:t}){console.log("hello")}}});new t.default({el:"#app",template:"<App/>",components:{App:K8},store:t6,apolloProvider:J8})})()})();