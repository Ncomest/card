import { StyledButton } from "../../style/global.style";
import styled from "styled-components";

const Button = styled(StyledButton)``;


interface SelectDeckProps {
 onClick?: (e: any) => void;
 text: string;
}

const ButtonDarkStone: React.FC<SelectDeckProps> = ({ onClick, text }) => {
 return (
  <Button onClick={onClick}>
   <span>{text}</span>
  </Button>
 );
};

export default ButtonDarkStone;
