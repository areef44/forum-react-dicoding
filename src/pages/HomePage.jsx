import { useDispatch, useSelector } from "react-redux";
import ThreadsList from "../components/ThreadsList";
import { useEffect } from "react";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import { Layout, Typography } from "antd";
import {
  asyncAddThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteThread,
} from "../states/threads/action";
import ThreadInput from "../components/ThreadInput";

const { Footer } = Layout;
const { Title } = Typography

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onAddThread = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body }));
    dispatch(asyncPopulateUsersAndThreads()); 
  };

  const onUpVote = (id) => {
    const thread = threads.find((thread) => thread.id === id);
    const isThreadUpVoted = thread.upVotesBy.includes(authUser.id);

    if (isThreadUpVoted) {
      dispatch(asyncNeutralVoteThread(id));
    } else {
      dispatch(asyncUpVoteThread(id));
    }
  };

  const onDownVote = (id) => {
    const thread = threads.find((thread) => thread.id === id);
    const isThreadDownVoted = thread.downVotesBy.includes(authUser.id);

    if (isThreadDownVoted) {
      dispatch(asyncNeutralVoteThread(id));
    } else {
      dispatch(asyncDownVoteThread(id));
    }
  };

  if (!authUser || threads.length === 0 || users.length === 0) {
    return <div>Loading...</div>;
  }
  
  const threadList = threads
  .filter((thread) => thread && thread.ownerId)
  .map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId) || null,
    authUser: authUser?.id ?? null,
  }));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ThreadInput addThread={onAddThread}/>
      <ThreadsList
        threads={threadList}
        upVoteBy={onUpVote}
        downVoteBy={onDownVote}
      />
      <Footer style={{ textAlign: "center", backgroundColor: "#1677ff" }}>
        <Title level={5} style={{ color: "white" }}>
          Muhammad Arif @2025
        </Title>
      </Footer>
    </Layout>
    
  );
}

export default HomePage;
