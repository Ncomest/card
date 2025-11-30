import { StyledButton } from "../../style/global.style";
import styled from "styled-components";

const Button = styled(StyledButton)`
  margin: 0;
`;

interface SelectDeckProps {
  text: string;
}

const ButtonDark2: React.FC<SelectDeckProps> = ({ text }) => {
  return (
    <Button>
      <span>{text}</span>
    </Button>
  );
};

export default ButtonDark2;
