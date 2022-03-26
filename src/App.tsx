//@ts-ignore
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import {MessagePageContainer} from "./components/Content/messagePageContainer";
import ProfilePageContainer from "./ProfilePage/ProfilePageContainer";
// import {ProfilePageContainer} from "./ProfilePage/ProfilePageContainer";


const App = () => {

    // @ts-ignore
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


                        {/*<Route exact path='/profile' component={<ProfilePageContainer/>}/>*/}

                        {/*<Route exact path='/content1' element={<MessagePageContainer/>*/}
                        {/*}/>*/}


                </div>
            </div>
            <div className='Footer-wrapper'>
                <div className='Footer'><Footer/></div>
            </div>
        </div>
    );
}

export default App;





