import {Route, Routes} from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import {MessagePageContainer} from "./components/MessagePage/messagePageContainer";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import {FriendsPageFunctionalComponent} from "./components/FriendsPage/FriendsPageFunctionalComponent";
import FriendsPageClassComponents from "./components/FriendsPage/FriendsPageClassComponents";
// import {ProfilePageContainer} from "./ProfilePage/ProfilePageContainer";


const App = () => {


    // @ts-ignore
    return (


        <div className='generalSettings'>

            <div className='Header-wrapper'>
                <div className='Header'><Header/></div>
            </div>
            <div className='NavBar-wrapper'>
                <div className='NavBar'><NavBar/></div>
            </div>
            <div className='Content-wrapper'>
                <div className='Content'>

                    <Routes>
                        <Route path='/' element={<ProfilePage/>}/>
                        <Route path='/profile' element={<ProfilePage/>}/>
                        <Route path='/messenger' element={<MessagePageContainer/>}/>
                        <Route path='/friend' element={<FriendsPageFunctionalComponent/>}/>
                        <Route path='/friends' element={<FriendsPageClassComponents/>}/>


                    </Routes>
                </div>
            </div>
            <div className='Footer-wrapper'>
                <div className='Footer'><Footer/></div>
            </div>
        </div>
    );
}

export default App;





