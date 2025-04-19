import { useDispatch, useSelector } from "react-redux";
import ThreadsList from "../components/ThreadsList";
import { useEffect } from "react";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import { Layout } from "antd";
import { asyncDownVoteThread, asyncNeutralVoteThread, asyncUpVoteThread } from "../states/threads/action";
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

    const onUpVote = (id) => {
        const thread = threads.find((thread) => thread.id === id)
        const isThreadUpVoted = thread.upVotesBy.includes(authUser.id)

        if(isThreadUpVoted){
            dispatch(asyncNeutralVoteThread(id))
        }else{
            dispatch(asyncUpVoteThread(id))
        }
    }

    const onDownVote = (id) => {
        const thread = threads.find((thread) => thread.id === id)
        const isThreadDownVoted = thread.downVotesBy.includes(authUser.id)

        if(isThreadDownVoted){
            dispatch(asyncNeutralVoteThread(id))
        }else{
            dispatch(asyncDownVoteThread(id))
        }
    }

    const threadList = threads.map((thread) => ({
        ...thread,
        user: users.find((user) => user.id === thread.ownerId),
        authUser: authUser.id,
      }));

    return (
        <Layout style={{ minHeight: "100vh" }} >
            <ThreadsList threads={threadList} upVoteBy={onUpVote} downVoteBy={onDownVote}/>
        </Layout>
        
      );
}

export default HomePage