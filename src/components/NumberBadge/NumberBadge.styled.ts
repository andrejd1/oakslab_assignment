import styled from "styled-components";
import { device } from "../../utils/breakpoints.ts";

export const NumberBadgeContainer = styled.div`
  min-width: 3rem;
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 1rem;
  background-color: black;
  color: white;
  border-radius: 50%;

  @media ${device.mobileL} {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;
