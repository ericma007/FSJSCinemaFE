export function displayNavButton(isActive,name) {
    return <button type="button"  style={(isActive)?{backgroundColor:"yellow",color:"black"}:undefined}>{name}</button>
}

