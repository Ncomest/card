import type { ReactElement } from "react";
import type React from "react";
import styled from "styled-components";

const Component = styled.div`
  display: flex;
  gap: 5px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SideStatusState = ({
  icon,
  text,
}: {
  icon: ReactElement;
  text: string;
}) => {
  return (
    <Component>
      <Icon>{icon}</Icon>
      <p>{text}</p>
    </Component>
  );
};
