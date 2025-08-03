"use client";

import styled, {createGlobalStyle} from "styled-components";
import { pxToRem } from "@/utils";

export const GlobalStyle = createGlobalStyle `
    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }

    html,
    body,
    div,
    span,
    object,
    iframe,
    figure,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    code,
    em,
    img,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    b,
    u,
    i,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    main,
    canvas,
    embed,
    footer,
    header,
    nav,
    section,
    video,
    button {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        text-size-adjust: none;
        text-decoration: none;
    }
    
    button {
        background: none;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
    }
    
    a {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
    }

    html,
    body {
        line-height: 1.4;
        font-family: 'Montserrat', sans-serif;
        font-optical-sizing: auto;
        font-style: normal;
        overflow-x: hidden;
        font-size: ${pxToRem(16)};
        * { 
            transition: 30ms ease-in-out all;
        }
    }

    blockquote,
    q {
        quotes: none;
    }

    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
        content: "";
        content: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
        * {
            background-color: transparent;
            vertical-align: middle;
        }
    }

    input {
        -webkit-appearance: none;
        appearance: none; 
        border-radius: 0;
        font-family: inherit;
    }    

    .pace {
        &-progress {
            background-color: ${props => props.theme.colors.primary} !important;
        }
    } 

    ol,
    ul {
        list-style: none !important;
        line-height: 1.6;
        margin: 0;
        padding: 0;
    }
    
    li {
        list-style: none !important;
        list-style-type: none !important;
    }
    
    /* Reset específico para classes do Bootstrap */
    .nav,
    .nav-pills,
    .navbar-nav,
    .dropdown-menu {
        list-style: none !important;
        padding-left: 0 !important;
        margin-bottom: 0 !important;
    }
    
    .nav li,
    .navbar-nav li,
    .dropdown-menu li {
        list-style: none !important;
        list-style-type: none !important;
        &::before {
            content: none !important;
        }
    }
    
    /* Force remove any pseudo-element bullets */
    ul li::before,
    ol li::before {
        content: none !important;
    }
    
    /* Ensure Font Awesome icons show properly */
    .fa,
    .fas,
    .far,
    .fab {
        display: inline-block;
        font-style: normal;
        font-variant: normal;
        text-rendering: auto;
        line-height: 1;
    }

    .container {
        padding-left: 24px;
        padding-right: 24px;
    }

`;

export const App = styled.div `
`;