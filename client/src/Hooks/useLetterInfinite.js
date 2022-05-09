import { useCallback, useEffect, useState } from "react";
import axios from "../misc/axios";

const useLetterInfinite = (skip, sort) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [letters, setLetters] = useState([]);
  const [isEnd, setIsEnd] = useState(false);

  const getLetters = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    let res;
    try {
      if (sort === "newest") {
        res = await axios.get(`/letter/?new=true&skip=${skip}`);
      } else if (sort === "oldest") {
        res = await axios.get(`/letter/?old=true&skip=${skip}`);
      } else if (sort === "most_liked") {
        res = await axios.get(`/letter/?mostLike=true&skip=${skip}`);
      }
      setLetters((prev) => {
        return [...prev, ...res.data];
      });
      setIsEnd(res.data?.length === 0);
      setIsLoading(false);
      //setSkip(res.data?.length);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  }, [skip, sort]);

  useEffect(() => {
    setLetters([]);
  }, [sort]);

  useEffect(() => {
    getLetters();
  }, [skip, getLetters]);

  return { isLoading, isError, letters, isEnd };
};

export default useLetterInfinite;
