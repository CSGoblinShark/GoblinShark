import { hot } from 'react-hot-loader/root';
import Signup from './components/Signup.jsx'

const App = () => {

    return (
        <div className="">
            <p className="text-2xl bg-red-300">Hello! We are setting up a real world application!   </p>
            <Signup/> 
        </div>
    )
}

export default hot(App);