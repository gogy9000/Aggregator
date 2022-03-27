
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import {MessagePageContainer} from "./components/Content/messagePageContainer";
import ProfilePage from "./ProfilePage/ProfilePage";
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
                      <Route  path='/' element={<ProfilePage/>}/>
                        <Route path='/profile' element={<ProfilePage/>}/>

                        <Route  path='/content1' element={<MessagePageContainer/>}/>


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





