import { useDispatch, useSelector } from "react-redux";
import ThreadsList from "../components/ThreadsList";
import { useEffect } from "react";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import { Layout } from "antd";
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
        <Layout style={{ minHeight: "100vh" }} >
            <ThreadsList threads={threadList}/>
        </Layout>
        
      );
}

export default HomePage