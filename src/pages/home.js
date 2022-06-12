import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CourseList } from "../data/courseList";

const Container = styled.div`
  margin: auto;
  max-width: 36rem;
  padding: 0 22px;

  & form {
    display: flex;
    margin-bottom: 24px;
  }
`;

const Header = styled.div`
  display: flex;
  height: 100px;
  align-items: flex-end;
`;

const Logo = styled.div`
  color: #764af1;
  font-size: 25px;
  font-weight: 800;
  margin-bottom: 22px;
`;

const Search = styled.input`
  padding: 12px 20px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #d1d1d1;

  &:focus {
    outline: none;
  }
`;

const CourseListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Course = styled.div`
  padding: 26px;
  display: flex;
  flex-direction: column;
  background-color: #f2f2f5;
  border-radius: 16px;
  cursor: pointer;

  & h3 {
    font-size: 15px;
    margin-bottom: 6px;
    font-weight: 600;
  }

  & p {
    font-size: 13px;
    font-weight: 500;
    color: #525e75;
  }
`;

const Home = () => {
  return (
    <Container>
      <Header>
        <Logo>오늘도 러닝</Logo>
      </Header>
      <form>
        <Search placeholder="코스를 검색하세요"></Search>
      </form>
      <CourseListContainer>
        {CourseList.map((course) => (
          <Link key={course.id} to={`/course/${course.id}`}>
            <Course>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </Course>
          </Link>
        ))}
      </CourseListContainer>
    </Container>
  );
};

export default Home;
