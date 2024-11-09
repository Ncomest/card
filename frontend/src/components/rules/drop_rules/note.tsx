const Note = ({ isOpen }: any) => {
  return <div style={{ display: isOpen ? "block" : "none" }}>Note</div>;
};

export default Note;
