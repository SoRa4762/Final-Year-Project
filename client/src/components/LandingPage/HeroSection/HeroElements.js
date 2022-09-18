import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight, MdArrowForward } from "react-icons/md";

export const HeroContainer = styled.div`
  background: #0c0c0c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 100vh;
  position: relative;
  z-index: 1;

  :before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)),
      linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
    z-index: 2;
  }
`;

export const HeroBG = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const VideoBG = styled.video`
  width: 100%;
  height: 100vh;
  -o-object-fit: cover;
  object-fit: cover;
  background: #232a34;
`;

export const HeroContent = styled.div`
  z-index: 3;
  max-width: 1200px;
  position: absolute;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeroH1 = styled.h1`
  color: #fff;
  font-size: 48px;
  text-align: center;

  @media screen and (max-width: 720px) {
    font-size: 40px;
  }

  @media screen and (max-width: 330px) {
    font-size: 32px;
  }
`;

export const HeroH2 = styled.h2`
  color: #fff;
  margin-top: 18px;
  font-size: 1.8rem;
  text-align: center;

  @media screen and (max-width: 720px) {
    margin-top: 11px;
    font-size: 1.5rem;
  }

  @media screen and (max-width: 330px) {
    font-size: 1.23rem;
  }
`;

export const HeroP = styled.p`
  margin-top: 24px;
  color: #fff;
  font-size: 22.5px;
  text-align: center;
  max-width: 330px;

  @media screen and (max-width: 720px) {
    margin-top: 18px;
    font-size: 1.3rem;
  }

  @media screen and (max-width: 330px) {
    font-size: 1rem;
  }
`;

export const HeroBtnWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeroBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 720px) {
    padding: 12px 30px;
  }
`;

export const HeroBtnLink = styled(Link)`
  border-radius: 50px;
  background: #01bf71;
  white-space: nowrap;
  text-decoration: none;
  box-shadow: none;
  padding: 14px 48px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #d45439;
    text-decoration: none;
    color: #fff;
  }
`;

export const ArrowForward = styled(MdArrowForward)`
  margin-left: 8px;
  font-size: 20px;
`;

export const ArrowRight = styled(MdKeyboardArrowRight)`
  margin-left: 8px;
  font-size: 20px;
`;
