import './NavBar.css'

function NavButtonComp(props) {

    
    console.log("props: ",props.name, "status isActive: ",props.isActive)
    let className=props.isActive?'activeClassName':undefined
    return (
         <button disabled={props.disabled} className={className}>{props.name}</button>                
    )     
}
export default NavButtonComp;
