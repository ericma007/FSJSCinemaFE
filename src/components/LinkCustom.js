import { Link} from "react-router-dom"

function LinkCustomComp({to,enableLink,children,handleClick}) {    
  if(enableLink){
     return (
      <Link to={to} onClick={handleClick}>
           {children}
      </Link>)
  }
  return (
      <>{children}</>
  )
}

export default LinkCustomComp;