import { Outlet} from "react-router-dom";
import {Provider} from "react-redux"
import {createStore} from "redux"
import appReducer from './appReducer';


function ReduxContextProviderComp()  {    
    const appStore = createStore(appReducer)
        
    return(
            <Provider store={appStore}>
                <Outlet/>
            </Provider>
        
    )

}
export default ReduxContextProviderComp;