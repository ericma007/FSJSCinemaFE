export const URLCINEMASERVER="http://localhost:8001/api/users"
export const URLSUBSCRIPTIONSERVERPROXY="http://localhost:8001/api/subscriptions"
export const URLMOVIESSERVERPROXY=URLSUBSCRIPTIONSERVERPROXY
export const USERLISTPAGE="/user/list"
export const SUBSCRIPTIONPAGE="/subscriptions"
export const MOVIEPAGE="/movies"
export const MOVIELISTPAGE="/movies/list"
export const APPLANDINGPAGE="/loading"
export const CONTACTADMIN="/contactadmin"

export const PERMISSION_READ_SUBSCRIPTION="RS"
export const PERMISSION_CREATE_SUBSCRIPTION="CS"
export const PERMISSION_DELETE_SUBSCRIPTION="DS"
export const PERMISSION_UPDATE_SUBSCRIPTION="US"
export const PERMISSION_READ_MOVIE="RM"
export const PERMISSION_CREATE_MOVIE="CM"
export const PERMISSION_DELETE_MOVIE="DM"
export const PERMISSION_UPDATE_MOVIE="UM"
export const PERMISSION_LIST_ARR=[PERMISSION_READ_SUBSCRIPTION,
                                  PERMISSION_CREATE_SUBSCRIPTION,
                                  PERMISSION_DELETE_SUBSCRIPTION,PERMISSION_UPDATE_SUBSCRIPTION,
                                  PERMISSION_READ_MOVIE,PERMISSION_CREATE_MOVIE,
                                  PERMISSION_DELETE_MOVIE,
                                  PERMISSION_UPDATE_MOVIE]

export const PERMISSION_DESC_MAP=new Map([["RS","View Subscriptions"],
                                        ['CS',"Create Subscriptions"],
                                        ["DS","Delete Subscriptions"],
                                        ['US',"Update Subscriptions"],
                                        ['RM',"View Movies"],
                                        ['CM',"Create Movies"],
                                        ["DM","Delete Movies"],
                                        ['UM',"Update Movies"]])