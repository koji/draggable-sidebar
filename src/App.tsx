import React from "react";
import styled from "styled-components";
import { Sidebar } from "./components/Sidebar";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const MainContainer = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 1rem;
  color: #333;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Sidebar initialWidth={258} minWidth={150} maxWidth={600} />
      <MainContainer>Main Content</MainContainer>
    </AppContainer>
  );
};

export default App
