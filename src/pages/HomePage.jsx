import { useDispatch, useSelector } from "react-redux";
import ThreadsList from "../components/ThreadsList";
import { useEffect } from "react";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
function HomePage() {
    const {
        threads = [],
        users = [],
        authUser,
    } = useSelector((states) => states)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncPopulateUsersAndThreads())
    }, [dispatch])

    const threadList = threads.map((thread) => ({
        ...thread,
        user: users.find((user) => user.id === thread.ownerId),
        authUser: authUser.id,
      }));

    return (
        <section>
            <h1>ini Halaman HomePage</h1>
            <ThreadsList threads={threadList}/>
        </section>
      );
}

export default HomePage