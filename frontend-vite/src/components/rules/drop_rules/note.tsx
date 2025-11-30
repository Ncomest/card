import HeaderRules from "./header_rules.component";

const Note = ({ isOpen, title }: any) => {
  return (
    <div>
      <HeaderRules title={title} isOpen={isOpen} />
      <div style={{ display: isOpen ? "block" : "none" }}>
        <textarea cols={30} rows={10}></textarea>
      </div>
    </div>
  );
};

export default Note;
