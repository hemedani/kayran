export const todo = true;
// import { useBlogCategoriesQuery } from "@satek/rehooks";
// import { fetchBlogCategoriesThunk } from "@satek/states";
// import React, { useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { BlogNav } from "./BlogNav";

// export const NavBar = () => {
//   const dispatch = useDispatch();

//   const fetchCategoriesCallback = useCallback(
//     (
//         variables: getBlogCategoriesVariables
//         ) =>
//       dispatch(fetchBlogCategoriesThunk(variables)),
//     [dispatch]
//   );

//   const Response = useBlogCategoriesQuery(
//     { Parsing: BlogNav },
//     useSelector,
//     fetchCategoriesCallback
//   );

//   return <>{Response}</>;
// };
