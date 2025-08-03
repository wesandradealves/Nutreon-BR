"use client";

import { Container } from './styles';
import 'hamburgers/dist/hamburgers.css';
// import { useState, useEffect, useCallback, useRef } from 'react';
import classNames from 'classnames';
import Props from './typo';
// import { debounce } from "lodash";

const Header = ({ scrollPosition }: Props) => {
  // const [expanded, setExpand] = useState<boolean>(false);

  // const debouncedResize = useRef(
  //   debounce(() => setExpand(false), 200)
  // ).current;

  // useEffect(() => {
  //   if (scrollPosition) {
  //     setExpand(false);
  //   }
  // }, [scrollPosition]);

  // useEffect(() => {
  //   window.addEventListener('resize', debouncedResize);

  //   return () => {
  //     window.removeEventListener('resize', debouncedResize);
  //   };
  // }, [debouncedResize]);
  
  // const handleLinkClick = () => {
  //   setExpand(false);
  // };

  return (
    <Container
      className={classNames("w-full fixed top-0 left-0 z-50 header", {
        'scrolled': scrollPosition > 0,
      })}
    >
    </Container>
  );
};

export default Header;
