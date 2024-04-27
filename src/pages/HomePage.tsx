import { useUserStore } from '../stores';

const HomePage = () => {
    const userStore = useUserStore();

    return (
        <div>
            {userStore.isLoggedIn ? (
                <p>Logged in</p>
            ) : (
                <p>Not logged in</p>
            )}
            <h1>I am HomePage</h1>
        </div>
    );
};

export default HomePage;