import type { ReactElement } from "react";
import styled from "styled-components";

const Component = styled.div`
  display: flex;
  gap: 5px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`;

export const SideStatusState = ({
  icon,
  state,
}: {
  icon: ReactElement;
  state: number | string;
}) => {
  return (
    <Component>
      <Icon>{icon}</Icon>
      <span>{state}</span>
    </Component>
  );
};
