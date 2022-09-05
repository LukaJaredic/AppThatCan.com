import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getProfile } from "../../services/user";
import Loader from "../../components/Loader";
import classes from "./Profile.module.scss";
import QuestionList from "../questionMaster/components/questionList/QuestionList";
import SolutionList from "./components/SolutionList";

const Profile = () => {
  const { id } = useParams();
  const profileRef = useRef(id);
  const { data, isError, isLoading, isFetching, refetch } = useQuery(
    ["user", profileRef.current],
    () => getProfile(id),
    {
      staleTime: 100000,
      cacheTime: 100000,
    }
  );

  useEffect(() => {
    refetch();
  }, [id]);

  if (isLoading) return <Loader />;
  if (isError) return <h1>An error has occurred, please try again later</h1>;
  const profile = data?.data;

  return (
    <div className={classes.page}>
      <div className={classes.basicInformation}>
        <div className={classes.leftSide}>
          <h2 className={classes.cardTitle}>Basic information</h2>
          <p className={classes.info}>Username: {profile.username}</p>
          <p className={classes.info}>
            Email: <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          <p className={classes.info}>Posts: {profile.posts.length}</p>
          <p className={classes.info}>
            Solution worked/working on: {profile.work.length}
          </p>
        </div>
      </div>
      <div className={classes.posts}>
        <h2 className={classes.cardTitle}>Posts</h2>
        <QuestionList
          fetchedQuestions={profile.posts}
          emptyMessage="This user has no posts."
          filters={{}}
        />
      </div>
      <div className={classes.solutions}>
        <h2 className={classes.cardTitle}>Solutions</h2>
        <SolutionList
          solutions={profile.work}
          author={{ _id: profile._id, username: profile.username }}
        />
      </div>
    </div>
  );
};

export default Profile;
