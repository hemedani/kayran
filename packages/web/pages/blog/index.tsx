import { deviceMedia, Page as CPage } from "@kayran/shared-components";
import React from "react";
import styled from "styled-components";
import { BlogPostList } from "../../components/blogComponents/post/BlogPostList";
import { Promotion } from "../../components/blogComponents/promotion/Promotion";
import { BlogNav as Nav } from "../../components/blogComponents/nav/BlogNav";
// import { BlogArticle } from "./pages/BlogArticle";
// import { BlogCreateArticle } from "./pages/BlogCreateArticle";
// import { BlogHome } from "./pages/BlogHome";
// import { BlogQuestions } from "./pages/BlogQuestions";

export const Blog: React.FC = () => {
  return (
    <Page>
      <Nav />
      <Main>
        <Promotion data={[]} />
        <BlogPostList />
      </Main>
    </Page>
  );
};

const Page = styled(CPage)`
  flex-direction: column;
  overflow: auto;
`;

const Main = styled.main`
  padding: 1rem 1rem;
  flex-direction: column;
  direction: rtl;

  @media ${deviceMedia.lg} {
    padding: 2rem 4rem;
  }
`;

export default Blog;

// <Main>
//   <Switch>
//     <Route exact path={`${path}`} component={BlogHome} />
//     <Route path={`${path}/posts/:id`} component={BlogArticle} />
//     <Route path={`${path}/post/create`} component={BlogCreateArticle} />
//     <Route path={`${path}/questions`} component={BlogQuestions} />
//     <Redirect to="/404" />
//   </Switch>
// </Main>
