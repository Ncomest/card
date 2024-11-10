import HeaderRules from "./header_rules.component";

const Position = ({ isOpen, title }: any) => {
  return (
    <div>
      <HeaderRules title={title} isOpen={isOpen} />
      <div style={{ display: isOpen ? "block" : "none" }}>Position</div>
    </div>
  );
};

export default Position;
