import { StyledButton } from "../../style/global.style";
import styled from "styled-components";

const Button = styled(StyledButton)`
  cursor: pointer;
`;

const ButtonDarkStone = ({
  onClick,
  text,
}: {
  onClick: (e: any) => void;
  text: string;
}) => {
  return (
    <Button onClick={onClick}>
      <span>{text}</span>
    </Button>
  );
};

export default ButtonDarkStone;
