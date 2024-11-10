import styled from "styled-components";

const Component = styled.div`
  display: inline-flex;
  align-items: start;
  gap: 5px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #000;
  /* white-space: nowrap; */
`;

const Txt = styled.p`
  /* letter-spacing: 1px; */
  font-size: 16px;
  font-weight: 400;
  color: #313131;
`;

const Icon = styled.div``;

interface IProps {
  // icon?: HTMLElement | undefined;
  title: string;
  text: string;
}

const Text = ({
  title,
  text,
}: //  icon
IProps) => {
  return (
    <Component>
      {/* <Icon>{icon}</Icon> */}
      <Title>
        {title}: <Txt>{text}</Txt>
      </Title>
    </Component>
  );
};

export default Text;
