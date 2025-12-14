import styled from "styled-components";

type TButton = "system" | "game";
type TSize = "s" | "m" | "l" | "xl" | "xxl";
interface IButtonStyledProps {
  $size: TSize;
}

const sizeMap = {
  s: {
    fontSize: "12px",
    padding: "2px 4px",
  },
  m: {
    fontSize: "14px",
    padding: "4px 8px",
  },
  l: {
    fontSize: "16px",
    padding: "6px 12px",
  },
  xl: {
    fontSize: "18px",
    padding: "8px 16px",
  },
  xxl: {
    fontSize: "20px",
    padding: "10px 20px",
  },
};

const ButtonStyled = styled.button<IButtonStyledProps>`
  cursor: pointer;
  font-size: ${(props) => sizeMap[props.$size].fontSize || "16px"};
  padding: ${(props) => sizeMap[props.$size].padding || "4px 8px"};
`;

const ButtonStyledSystem = styled(ButtonStyled)``;
const ButtonStyledGame = styled(ButtonStyled)`
  background: linear-gradient(180deg, #5a4a2c, #3d341f);
  border: 1px solid #7a693f;
  color: #f0e8d0;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.08),
    0 2px 10px rgba(0, 0, 0, 0.6);

  &:hover {
    background: linear-gradient(180deg, #645433, #453c23);
    border-color: #8a7a4b;
  }
`;

interface IButton {
  type: TButton;
  children: string;
  size?: TSize;
}

function Button({ type, children, size = "m" }: IButton) {
  const buttonComponents = {
    system: ButtonStyledSystem,
    game: ButtonStyledGame,
  };

  const SelectedButton = buttonComponents[type];

  return (
    <SelectedButton $size={size}>
      <span>{children}</span>
    </SelectedButton>
  );
}

export default Button;
