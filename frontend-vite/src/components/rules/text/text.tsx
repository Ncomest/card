import styled from "styled-components";

const ComponentStyle = styled.div`
  display: inline-flex;
  align-items: start;
  gap: 5px;
`;

const ContainerStyle = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #000;
  /* white-space: nowrap; */
`;

const PStyle = styled.p`
  /* letter-spacing: 1px; */
  font-size: 16px;
  font-weight: 400;
  color: #313131;
`;

const IconStyle = styled.img`
  height: 20px;
  width: 20px;
`;

interface IProps {
  icons?: any;
  title?: string;
  text?: string;
}

const Text = ({ title, text, icons }: IProps) => {
  return (
    <ComponentStyle>
      <ContainerStyle>
        {title} {icons && <IconStyle src={icons} alt={icons} />}
        {text && ":"}
        <PStyle>{text}</PStyle>
      </ContainerStyle>
    </ComponentStyle>
  );
};

export default Text;
