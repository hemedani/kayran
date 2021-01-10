import { deviceMedia, Input, blogColors } from "@kayran/shared-components";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  SearchIcon as Icon,
  SearchIconPath as Path,
} from "../icons/SearchIcon";
import { NavSearchResultCard as Card } from "./NavSearchResult";
import { fakePosts } from "../../../../fakeData/PostsFakeData";

export const NavSearch = () => {
  const [searchInput, setSearchInput] = useState("");

  const [searchResult, setSearchResult] = useState([
    fakePosts[0],
    fakePosts[2],
    fakePosts[4],
  ]);
  return (
    <Wrapper>
      <NavInput onChange={onChangeInput(setSearchInput)} />
      <Icon>
        <Path />
      </Icon>
      <ResultWrapper>
        {
          //TODO: replace index with short id
          searchResult.map((result, index) => (
            <Card {...result} key={index} />
          ))
        }
      </ResultWrapper>
    </Wrapper>
  );
};

const onChangeInput = (callback: (value: string) => void) => (
  e: React.ChangeEvent<HTMLInputElement>
) => callback(e.target.value);

const expandFrame = keyframes`
  from{
    flex: 0;
  }
  to{
    flex:1 1 auto;
  }
`;

const NavInput = styled(Input).attrs({
  placeholder: " برای جست و جو تایپ کنید ...",
})`
  /* animation:  */
  color: ${blogColors.neutralDarker};
  background: none;
  font-family: "Estedad";
  font-weight: lighter;
  border: 0.1rem solid ${blogColors.neutralLighter};
  border-radius: 2rem;

  justify-content: center;
  flex: 1 1 auto;

  padding: 0 0.5rem 0 2rem;
  height: 0.5rem;
  overflow: hidden;

  display: none;
  ~ ${Icon} {
    display: none;
  }
  @media ${deviceMedia.sm} {
    display: flex;
    ~ ${Icon} {
      display: inline-block;
    }
  }

  &:focus {
    border: 0.1rem solid ${blogColors.primary};
  }
  &:focus ~ ${Icon} > ${Path} {
    fill: ${blogColors.primary};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  align-items: center;

  position: relative;
  margin: 1rem 0;
`;

export const ResultWrapper = styled.div`
  flex-direction: column;
  border-radius: 0.5rem;
  position: absolute;
  top: 3.4rem;
  display: none;
  width: 21rem;
  z-index: 1;
  background-color: ${blogColors.white};
`;
