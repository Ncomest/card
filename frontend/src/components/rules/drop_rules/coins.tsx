import HeaderRules from "./header_rules.component";

interface IisOpen {
  title: string;
  isOpen: string | null | boolean;
}

const Coins = ({ isOpen, title }: IisOpen) => {
  return (
    <div>
      <HeaderRules title={title} isOpen={isOpen} />
      <div style={{ display: isOpen ? "block" : "none" }}>Coins inner text</div>
    </div>
  );
};

export default Coins;
