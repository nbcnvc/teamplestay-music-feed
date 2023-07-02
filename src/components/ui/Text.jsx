import styled from "styled-components";

const SmallText = styled.p`
  font-size: 15px;
  color: white;
  line-height: 1.5;
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 15px;
  color: white;
`;

const BigText = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: white;
`;

const HeaderText = styled.p`
  padding-left: 100px;
  font-size: 180px;
  font-weight: bold;
  line-height: 0.85;
  max-width: 1080px;
  margin: 0 auto;
`;

export { SmallText, Text, BigText, HeaderText };
