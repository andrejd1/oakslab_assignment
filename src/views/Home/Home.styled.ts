import styled from "styled-components";
import { device } from "../../utils/breakpoints.ts";

export const PhaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 3rem;
`;

export const PhaseHeaderContainer = styled.div<{ $canUndoPhase: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 1rem;

  ${(props) =>
    props.$canUndoPhase &&
    `
    cursor: pointer;
  `}

  > div:nth-child(2) > h4 {
    color: ${(props) => (props.$canUndoPhase ? "steelblue" : "gray")};
    margin-left: 1rem;
  }

  @media ${device.mobileL} {
    flex-direction: column;
    justify-content: center;

    > div:nth-child(2) > h4 {
      margin-left: 0;
    }
  }
`;

export const PhaseHeaderTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media ${device.mobileL} {
    flex-direction: column;
    justify-content: center;
  }
`;
