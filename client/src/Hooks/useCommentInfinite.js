import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../misc/axios";

const useCommentInfinite = (skip, commentPost) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [comments, setComments] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const { letterid } = useParams();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    setComments([]);
  }, []);

  const getComments = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await axios.get(`/comment/${letterid}/?skip=${skip}`);
      setComments((prev) => {
        return [...prev, ...res.data];
      });
      setIsEnd(res.data?.length === 0);
      setIsLoading(false);
      //setSkip(res.data?.length);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  }, [skip, letterid]);

  const postComment = useCallback(async () => {
    setIsError(false);
    try {
      const res = await axios.post(`/comment/${letterid}`, {
        text: commentPost,
        letterId: letterid,
        userId: user,
      });
      setComments([res.data, ...comments]);
      setIsError(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  }, [commentPost, comments, user, letterid]);

  useEffect(() => {
    getComments();
  }, [skip, getComments]);

  return { isLoading, isError, comments, isEnd, postComment };
};

export default useCommentInfinite;
