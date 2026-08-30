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
`;

const PStyle = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #313131;
`;

const IconStyle = styled.img`
  height: 20px;
  width: 20px;
`;

type TGlossaryItemProps = {
  title?: string;
  text?: string;
  icons?: string;
};

export const GlossaryItem = ({ title, text, icons }: TGlossaryItemProps) => {
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
