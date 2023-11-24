import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatedRoutes} from './AnimatedRoutes';
import '../App.css';

function App() {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    )
}

export default App;