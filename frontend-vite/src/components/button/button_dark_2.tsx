import { StyledButton } from "../../style/global.style";
import styled from "styled-components";

const Button = styled(StyledButton)`
  margin: 0;
`;

const ButtonDark2 = ({ text }: { text: string }) => {
  return (
    <Button>
      <span>{text}</span>
    </Button>
  );
};

export default ButtonDark2;
