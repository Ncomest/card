import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";

type TButton = "system" | "game";

type TSize = "s" | "m" | "l" | "xl" | "xxl";

export interface IButton {
  type: TButton;
  children: string | React.ReactNode;
  size?: TSize;
  onClick?: () => void;
}

const sizeMap: Record<TSize, { fontSize: string; padding: string }> = {
  s: { fontSize: "12px", padding: "2px 4px" },
  m: { fontSize: "14px", padding: "4px 8px" },
  l: { fontSize: "16px", padding: "6px 12px" },
  xl: { fontSize: "18px", padding: "8px 16px" },
  xxl: { fontSize: "20px", padding: "10px 20px" },
};

const GameButton = styled(MuiButton)({
  background: "linear-gradient(180deg, #2c2f36, #1b1c20)",
  border: "1px solid #5e6a7a",
  color: "#bccee5",
  boxShadow: "0 0 0 rgba(120, 150, 200, 0)",
  "&:hover": {
    background: "linear-gradient(180deg, #343842, #1f2025)",
    boxShadow: "0 0 14px rgba(160, 190, 255, 0.25)",
  },
  "&:active": {
    boxShadow: "0 0 14px rgba(7, 62, 213, 0.25)",
  },
});

const SystemButton = styled(MuiButton)({
  background: "linear-gradient(180deg, #5a4a2c, #3d341f)",
  border: "1px solid #7a693f",
  color: "#f0e8d0",
  boxShadow:
    "inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 2px 10px rgba(0, 0, 0, 0.6)",
  "&:hover": {
    background: "linear-gradient(180deg, #645433, #453c23)",
    borderColor: "#8a7a4b",
  },
});
export const Button = ({ type, children, size = "m", onClick }: IButton) => {
  const ButtonComponent = type === "game" ? GameButton : SystemButton;
  const { fontSize, padding } = sizeMap[size];
  return (
    <ButtonComponent
      role="button"
      onClick={onClick}
      disableRipple={false}
      sx={{ fontSize, padding }}
    >
      {children}
    </ButtonComponent>
  );
};
