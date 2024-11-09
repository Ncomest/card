import styled from "styled-components";

const Component = styled.div`
  text-align: center;
`;
const Image = styled.img`
  width: 90%;
  margin: 0 auto;
  height: 100%;
`;
const Helper = ({ isOpen }: any) => {
  return (
    <Component style={{ display: isOpen ? "block" : "none" }}>
        <Image src="/image/t_shirt.JPG" /> {/*временная заглушка*/}
    </Component>
  );
};

export default Helper;
