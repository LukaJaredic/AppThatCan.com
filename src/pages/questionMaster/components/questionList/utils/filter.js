export const filterQuestions = (questions, filters) => {
  let filteredQuestions = questions;
  if (filters.search)
    filteredQuestions = filteredQuestions.filter(
      (q) =>
        q?.title?.includes(filters.search) || q?.text?.includes(filters.search)
    );
  if (filters.views)
    filteredQuestions = filteredQuestions.filter(
      (q) => q.views >= filters.views
    );

  if (filters.minSolutions)
    filteredQuestions = filteredQuestions.filter(
      (q) =>
        q.comments.filter((c) => c.isSolution).length >= filters.minSolutions
    );

  if (filters.maxSolutions)
    filteredQuestions = filteredQuestions.filter(
      (q) =>
        q.comments.filter((c) => c.isSolution).length <= filters.maxSolutions
    );

  if (filters.minDevs)
    filteredQuestions = filteredQuestions.filter(
      (q) => q.workingOnSolution?.length >= filters.minDevs
    );

  if (filters.maxDevs)
    filteredQuestions = filteredQuestions.filter(
      (q) =>
        q.comments.filter((c) => c.isSolution).length <= filters.maxSolutions
    );

  return filteredQuestions;
};
