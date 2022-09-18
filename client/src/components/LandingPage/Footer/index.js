import React from "react";
import { animateScroll as scroll } from "react-scroll";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import {
  FooterContainer,
  FooterWrap,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkTitle,
  FooterLink,
  FooterLinkItems,
  BottomFooter,
  BottomFooterWrap,
  FooterLogo,
  WebsiteRights,
  SocialIcons,
  SocialIconLink,
} from "./FooterElements";

function Footer() {
  const toggleLanding = () => {
    scroll.scrollToTop();
  };

  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>About Us</FooterLinkTitle>
              <FooterLink to="/signIn">How it Works</FooterLink>
              <FooterLink to="/signIn">Testimonials</FooterLink>
              <FooterLink to="/signIn">Credits</FooterLink>
              <FooterLink to="/signIn">Terms of Service</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>About Us</FooterLinkTitle>
              <FooterLink to="/signIn">How it Works</FooterLink>
              <FooterLink to="/signIn">Testimonials</FooterLink>
              <FooterLink to="/signIn">Credits</FooterLink>
              <FooterLink to="/signIn">Terms of Service</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>About Us</FooterLinkTitle>
              <FooterLink to="/signIn">How it Works</FooterLink>
              <FooterLink to="/signIn">Testimonials</FooterLink>
              <FooterLink to="/signIn">Credits</FooterLink>
              <FooterLink to="/signIn">Terms of Service</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>About Us</FooterLinkTitle>
              <FooterLink to="/signIn">How it Works</FooterLink>
              <FooterLink to="/signIn">Testimonials</FooterLink>
              <FooterLink to="/signIn">Credits</FooterLink>
              <FooterLink to="/signIn">Terms of Service</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>
        <BottomFooter>
          <BottomFooterWrap>
            <FooterLogo to="/" onClick={toggleLanding}>
              Konnichiwa
            </FooterLogo>
            <WebsiteRights>
              Ragat ra Sambandha © {new Date().getFullYear()} All rights
              reserved.
            </WebsiteRights>
            <SocialIcons>
              <SocialIconLink href="/" target="_blank" aria-label="Facebook">
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank" aria-label="Instagram">
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank" aria-label="Twitter">
                <FaTwitter />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank" aria-label="Youtube">
                <FaYoutube />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank" aria-label="Linkedin">
                <FaLinkedin />
              </SocialIconLink>
            </SocialIcons>
          </BottomFooterWrap>
        </BottomFooter>
      </FooterWrap>
    </FooterContainer>
  );
}

export default Footer;
