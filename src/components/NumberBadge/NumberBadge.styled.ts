import styled from "styled-components";
import { device } from "../../utils/breakpoints.ts";

export const NumberBadgeContainer = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 1rem;
  background-color: black;
  color: white;
  border-radius: 50%;

  @media ${device.mobileL} {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
  }
`;
