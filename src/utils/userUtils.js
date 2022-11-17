import {PERMISSION_CREATE_MOVIE, PERMISSION_CREATE_SUBSCRIPTION, 
        PERMISSION_UPDATE_SUBSCRIPTION, PERMISSION_DELETE_MOVIE, 
        PERMISSION_DELETE_SUBSCRIPTION, PERMISSION_LIST_ARR,
        PERMISSION_READ_MOVIE,PERMISSION_READ_SUBSCRIPTION, 
        PERMISSION_UPDATE_MOVIE } from "../const"

const indexPermission=function(permission) {
    return PERMISSION_LIST_ARR.findIndex(x=>x===permission) 
}

const canReadSubscription=function (permissionCheckArr) {

    return permissionCheckArr[indexPermission(PERMISSION_READ_SUBSCRIPTION)]
}

const canAddSubscription=function (permissionCheckArr) {

    return permissionCheckArr[indexPermission(PERMISSION_CREATE_SUBSCRIPTION)]
}

const canDeleteSubscription=function (permissionCheckArr) {

    return permissionCheckArr[indexPermission(PERMISSION_DELETE_SUBSCRIPTION)]
}

const canUpdateSubscription=function (permissionCheckArr) {

    return permissionCheckArr[indexPermission(PERMISSION_UPDATE_SUBSCRIPTION)]
}

const canReadMovie=function (permissionCheckArr) {

    return permissionCheckArr[indexPermission(PERMISSION_READ_MOVIE)]
}

const canAddMovie=function (permissionCheckArr) {

    return permissionCheckArr[indexPermission(PERMISSION_CREATE_MOVIE)]
}

const canDeleteMovie=function (permissionCheckArr) {

    return permissionCheckArr[indexPermission(PERMISSION_DELETE_MOVIE)]
}

const canUpdateMovie=function (permissionCheckArr) {

    return permissionCheckArr[indexPermission(PERMISSION_UPDATE_MOVIE)]
}



const canModifySubscription=function(permissionCheckArr) {

    return canAddSubscription(permissionCheckArr)
    || canDeleteSubscription(permissionCheckArr)
    || canUpdateSubscription(permissionCheckArr)
}

const canModifyMovie=function(permissionCheckArr) {
    return canAddMovie(permissionCheckArr)
    || canDeleteMovie(permissionCheckArr)
    || canUpdateMovie(permissionCheckArr)
}

const convertPermissionCheckBoxToList= function (permissionCheckArr) {
    return PERMISSION_LIST_ARR.filter((x,index)=>permissionCheckArr[index]===true)
}

const convertPermissionListToCheckBox= function (permissionArr) {
    let permissionCheckArr= new Array(PERMISSION_LIST_ARR.length).fill(false)

    return permissionCheckArr.map((x,index)=>permissionArr.includes(PERMISSION_LIST_ARR[index]))
}

export  {canReadSubscription,canReadMovie,canUpdateSubscription,canDeleteSubscription, canModifySubscription,canModifyMovie,canUpdateMovie, canDeleteMovie, canAddMovie,indexPermission,
        convertPermissionListToCheckBox, convertPermissionCheckBoxToList}