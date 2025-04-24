import { useDispatch, useSelector } from "react-redux";
import ThreadsList from "../components/ThreadsList";
import { useEffect, useState } from "react";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import { Layout, Typography, Button } from "antd";
import {
  asyncAddThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteThread,
} from "../states/threads/action";
import ThreadInput from "../components/ThreadInput";
import CategoriesList from "../components/CategoriesList";

const { Footer } = Layout;
const { Title } = Typography;

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);

  const [selectedCategory, setSelectedCategory] = useState("all");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onAddThread = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body }))
      .then(() => {
        dispatch(asyncPopulateUsersAndThreads());
      })
      .catch((error) =>
        console.log("Error populating users and threads:", error)
      );
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

  const categories = [
    ...new Set(threads.filter((thread) => thread?.category).map((thread) => thread.category)),
  ];

  // Filter threads by category (defaults to "all")
  const filteredThreads = threads
    .filter((thread) => thread && thread.category)
    .filter((thread) =>
      selectedCategory === "all" ? true : thread.category === selectedCategory
    )
    .filter((thread) => thread && thread.ownerId)
    .map((thread) => ({
      ...thread,
      user: users.find((user) => user.id === thread.ownerId) || null,
      authUser: authUser?.id ?? null,
    }));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <CategoriesList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <ThreadInput addThread={onAddThread} />
      <ThreadsList
        threads={filteredThreads}
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
