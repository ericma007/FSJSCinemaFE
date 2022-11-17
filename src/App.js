import './App.css';
import { BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom';
import LoginComp from "./security/Login";
import LogoutComp from "./security/Logout";
import SavePwdComp from './security/SavePwd';
import RequireAuthControllerComp from './security/RequireAuthController';
import NotFoundComp from './security/NotFound';
import HeaderComp from './Header'
import UserManagementComp from './users/UserManagement';
import UserListComp from './users/UserList'
import EditUserComp from './users/EditUser';
import ReduxContextProviderComp from './ReduxContext';
import { LoginContextProvider } from './security/context';
import AddUserComp from './users/AddUser';
import UserNavBarComp from './users/UserNavBar'
import TestComp from './Test';
import MovieManagementComp from './movies/MovieManagement';
import MovieNavBarComp from './movies/MovieNavBar';
import MovieListComp from './movies/MovieList';
import AddMovieComp from './movies/AddMovie';
import EditMovieComp from './movies/EditMovie';
import SubscriberListComp from './subscriptions/SubscriberList';
import SubscriptionNavBarComp from './subscriptions/SubscriptionNavBar';
import SubscriptionManagementComp from './subscriptions/SubscriptionManagement';
import AddSubscriberComp from './subscriptions/AddSubscriber'
import EditSubscriberComp from './subscriptions/EditSubscriber'
import NavBarComp from './NavBar';

function App() {
  
  return (
    <div>
    <Router>
      <HeaderComp/>
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>}/>
          <Route path="logout" element={<LogoutComp/>}/>
          <Route element={<LoginContextProvider/>}>
              <Route element={<ReduxContextProviderComp/>}>
                  <Route path="login" element={<LoginComp />}/>
                  <Route path="first-login" element={<SavePwdComp />}/> 
                  <Route path="loading" element={<>Loading</>}/>
                  <Route path="test" element={<TestComp />}/>
                  <Route  element={<RequireAuthControllerComp/>}>
                      <Route element={<NavBarComp/>} >                    
                        <Route path="user" element={<UserManagementComp/>}>
                            <Route element={<UserNavBarComp/>} >
                              <Route index element={<Navigate to="list"/>}/>
                              <Route path="list" element={<UserListComp/>} />
                              <Route path="adduser" element={<AddUserComp/>} />
                            </Route>
                            <Route path="edituser/:userId" element={<EditUserComp/>}/>
                        </Route>
                        <Route path="subscriptions" element={<SubscriptionManagementComp/>}>
                            <Route element={<SubscriptionNavBarComp/>} >
                               <Route index element={<Navigate to="list"/>}/>  
                               <Route path="list" element={<SubscriberListComp/>}/>
                               <Route path="addsubscription" element={<AddSubscriberComp/>} />
                            </Route>
                            <Route path="editsubscriber/:subId" element={<EditSubscriberComp/>}/>
                        </Route>
                        <Route path="movies" element={<MovieManagementComp/>}>             
                            <Route element={<MovieNavBarComp/>} >
                               <Route index element={<Navigate to="list"/>}/>  
                               <Route path="list" element={<MovieListComp />}/>
                               <Route path="addmovie" element={<AddMovieComp/>} />
                            </Route>
                            <Route path="editmovie/:movieId" element={<EditMovieComp/>}/>
                        </Route>
                        <Route path="contactadmin" element={<>"Contact Admin"</>}/>
                        <Route path="*" element={<NotFoundComp/>}/>
                      </Route>
                </Route> 
            </Route> 
          </Route>
        </Routes>                            
    </Router>
         
    </div>
  );
}

export default App;
