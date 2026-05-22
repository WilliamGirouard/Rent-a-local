import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from './Navbar';
import { useLoaderData } from 'react-router-dom';
import Spinner from './ui/Spinner';

export default function MainLayout() {
    const user = useLoaderData();
    const nav = useNavigation();

    if (nav.state === "loading") {
        return <Spinner item='page' />
    }
    return (
        <div>
            <Navbar user={user}/>
            <div style={{ paddingTop: '20px' }}>
                <Outlet context={{ user }} />
            </div>
        </div>
    );  
}