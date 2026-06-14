import React from 'react';

interface FileIconProps {
  ext?: string;
  className?: string;
}

export const FileIcon: React.FC<FileIconProps> = ({ ext = 'pdf', className }) => {
  const normalizedExt = ext.toLowerCase();

  // Common defs shared by all icons
  const renderDefs = (isTxt: boolean) => {
    const clipId = isTxt ? 'page-clip-20' : 'page-clip-24';
    const pagePath = isTxt
      ? "M5 0.375H10.2578C10.9537 0.37512 11.6211 0.651542 12.1133 1.14355L16.8564 5.88672C17.3485 6.37887 17.6249 7.04628 17.625 7.74219V17C17.625 18.4497 16.4497 19.625 15 19.625H5C3.55025 19.625 2.375 18.4497 2.375 17V3C2.375 1.55025 3.55025 0.375 5 0.375Z"
      : "M6 0.450195H12.3096C13.1449 0.450287 13.9455 0.782403 14.5361 1.37305L20.2275 7.06348C20.8182 7.65418 21.1503 8.45564 21.1504 9.29102V20.4004C21.1502 22.1399 19.7396 23.5498 18 23.5498H6C4.26061 23.5496 2.8508 22.1398 2.85059 20.4004V3.59961C2.8508 1.86022 4.26061 0.450408 6 0.450195Z";

    return (
      <defs>
        {/* LIGHT MODE FILTER SHADOWS */}
        <filter id="page-shadow-light" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0.6" dy="1.2" stdDeviation="0.8" floodOpacity="0.18" floodColor="#000000"/>
        </filter>
        <filter id="fold-shadow-light" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="-0.4" dy="0.4" stdDeviation="0.6" floodOpacity="0.22" floodColor="#000000"/>
        </filter>

        {/* DARK MODE FILTER SHADOWS */}
        <filter id="page-shadow-dark" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0.6" dy="1.2" stdDeviation="1.0" floodOpacity="0.45" floodColor="#000000"/>
        </filter>
        <filter id="fold-shadow-dark" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="-0.4" dy="0.4" stdDeviation="0.8" floodOpacity="0.5" floodColor="#000000"/>
        </filter>

        {/* LIGHT MODE GRADIENTS */}
        <linearGradient id="page-grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#fafafa" />
          <stop offset="100%" stopColor="#e5e7eb" />
        </linearGradient>
        <linearGradient id="fold-grad-light" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="40%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        {/* DARK MODE GRADIENTS */}
        <linearGradient id="page-grad-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="70%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="fold-grad-dark" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="40%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>

        {/* Diagonal gloss reflection sheen */}
        <linearGradient id="glare-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="31%" stopColor="#ffffff" stopOpacity="0.0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
        </linearGradient>

        {/* Banner Vertical 3D extrusion gradients */}
        <linearGradient id="banner-grad-pdf" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff5a6a" />
          <stop offset="100%" stopColor="#db1c2e" />
        </linearGradient>
        <linearGradient id="banner-grad-xls" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#29e37c" />
          <stop offset="100%" stopColor="#14a050" />
        </linearGradient>
        <linearGradient id="banner-grad-jpg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5d83ff" />
          <stop offset="100%" stopColor="#1e44db" />
        </linearGradient>
        <linearGradient id="banner-grad-png" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5d83ff" />
          <stop offset="100%" stopColor="#1e44db" />
        </linearGradient>
        <linearGradient id="banner-grad-svg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
        <linearGradient id="banner-grad-txt" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9ca3af" />
          <stop offset="100%" stopColor="#4b5563" />
        </linearGradient>
        <linearGradient id="banner-grad-default" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        <clipPath id={clipId}>
          <path d={pagePath} />
        </clipPath>

        {/* EMBEDDED CSS STYLE TAG FOR AUTOMATIC THEMING */}
        <style>{`
          .doc-page-path {
            fill: url(#page-grad-light);
            stroke: #cbd5e1;
            filter: url(#page-shadow-light);
          }
          .dark .doc-page-path {
            fill: url(#page-grad-dark);
            stroke: #334155;
            filter: url(#page-shadow-dark);
          }
          
          .doc-fold-path {
            fill: url(#fold-grad-light);
            stroke: #cbd5e1;
            filter: url(#fold-shadow-light);
          }
          .dark .doc-fold-path {
            fill: url(#fold-grad-dark);
            stroke: #334155;
            filter: url(#fold-shadow-dark);
          }
        `}</style>
      </defs>
    );
  };

  if (normalizedExt === 'txt') {
    // 20x20 viewBox
    return (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ filter: 'drop-shadow(0px 1.5px 3px rgba(0,0,0,0.06))' }}
      >
        {renderDefs(true)}
        
        {/* Main 3D shaded sheet page with drop shadow */}
        <path 
          d="M5 0.375H10.2578C10.9537 0.37512 11.6211 0.651542 12.1133 1.14355L16.8564 5.88672C17.3485 6.37887 17.6249 7.04628 17.625 7.74219V17C17.625 18.4497 16.4497 19.625 15 19.625H5C3.55025 19.625 2.375 18.4497 2.375 17V3C2.375 1.55025 3.55025 0.375 5 0.375Z" 
          className="doc-page-path"
          strokeWidth="0.75"
        />

        {/* Folded paper flap with bottom-left cast shadow */}
        <path 
          d="M11.5 0.5V4.5C11.5 5.60457 12.3954 6.5 13.5 6.5H17.5 L11.5 0.5Z" 
          className="doc-fold-path"
          strokeWidth="0.75"
        />

        {/* 3D vertical gradient banner */}
        <path 
          d="M0 11C0 9.89543 0.895431 9 2 9H13C14.1046 9 15 9.89543 15 11V15C15 16.1046 14.1046 17 13 17H2C0.89543 17 0 16.1046 0 15V11Z" 
          fill="url(#banner-grad-txt)"
        />

        {/* Outlined/vector letters */}
        <path d="M1.71875 11.6074V11H4.91016V11.6074H3.67383V15H2.95508V11.6074H1.71875ZM6.24086 11L7.12172 12.4648H7.15297L8.03773 11H8.86391L7.63148 13L8.88344 15H8.04359L7.15297 13.5449H7.12172L6.23109 15H5.39516L6.65883 13L5.41078 11H6.24086ZM9.36697 11.6074V11H12.5584V11.6074H11.3221V15H10.6033V11.6074H9.36697" fill="white"/>

        {/* Glare glass sheen reflection overlay */}
        <g clipPath="url(#page-clip-20)">
          <rect width="20" height="20" fill="url(#glare-grad)" pointerEvents="none" />
        </g>
      </svg>
    );
  }

  // 24x24 viewBox for others (pdf, xls/xlsx, jpg/jpeg, png, svg)
  let bannerFill = 'url(#banner-grad-pdf)';
  let bannerPath = 'M0 12.4C0 11.0745 1.07452 10 2.4 10H15.2C16.5255 10 17.6 11.0745 17.6 12.4V18C17.6 19.3255 16.5255 20.4 15.2 20.4H2.4C1.07452 20.4 0 19.3255 0 18V12.4Z';
  let innerContent: React.ReactNode = null;

  if (normalizedExt === 'xls' || normalizedExt === 'xlsx') {
    bannerFill = 'url(#banner-grad-xls)';
    bannerPath = 'M0 12.4C0 11.0745 1.07452 10 2.4 10H14.2C15.5255 10 16.6 11.0745 16.6 12.4V18C16.6 19.3255 15.5255 20.4 14.2 20.4H2.4C1.07452 20.4 0 19.3255 0 18V12.4Z';
    innerContent = (
      <path d="M2.9998 12.4L4.05684 14.1578H4.09434L5.15606 12.4H6.14746L4.66855 14.8L6.1709 17.2H5.16309L4.09434 15.4539H4.05684L2.98809 17.2H1.98496L3.50137 14.8L2.00371 12.4H2.9998ZM6.96208 17.2V12.4H7.83161V16.471H9.94567V17.2H6.96208ZM13.441 13.7195C13.4191 13.5148 13.3269 13.3554 13.1644 13.2414C13.0035 13.1273 12.7941 13.0703 12.5363 13.0703C12.355 13.0703 12.1995 13.0976 12.0699 13.1523C11.9402 13.207 11.841 13.2812 11.7722 13.375C11.7035 13.4687 11.6683 13.5757 11.6667 13.696C11.6667 13.796 11.6894 13.8828 11.7347 13.9562C11.7816 14.0296 11.8449 14.0921 11.9245 14.1437C12.0042 14.1937 12.0925 14.2359 12.1894 14.2703C12.2863 14.3046 12.3839 14.3335 12.4824 14.357L12.9324 14.4695C13.1136 14.5117 13.2878 14.5687 13.455 14.6406C13.6238 14.7125 13.7745 14.8031 13.9074 14.9125C14.0417 15.0218 14.148 15.1539 14.2261 15.3085C14.3042 15.4632 14.3433 15.6445 14.3433 15.8523C14.3433 16.1335 14.2714 16.3812 14.1277 16.5953C13.9839 16.8078 13.7761 16.9742 13.5042 17.0945C13.2339 17.2132 12.9066 17.2726 12.5222 17.2726C12.1488 17.2726 11.8245 17.2148 11.5495 17.0992C11.2761 16.9835 11.062 16.8148 10.9074 16.5929C10.7542 16.371 10.6714 16.1007 10.6589 15.782H11.5144C11.5269 15.9492 11.5785 16.0882 11.6691 16.1992C11.7597 16.3101 11.8777 16.3929 12.023 16.4476C12.1699 16.5023 12.3339 16.5296 12.5152 16.5296C12.7042 16.5296 12.8699 16.5015 13.012 16.4453C13.1558 16.3875 13.2683 16.3078 13.3495 16.2062C13.4308 16.1031 13.4722 15.9828 13.4738 15.8453C13.4722 15.7203 13.4355 15.6171 13.3636 15.5359C13.2917 15.4531 13.191 15.3843 13.0613 15.3296C12.9331 15.2734 12.7831 15.2234 12.6113 15.1796L12.0652 15.039C11.6699 14.9375 11.3574 14.7835 11.1277 14.5773C10.8995 14.3695 10.7855 14.0937 10.7855 13.75C10.7855 13.4671 10.862 13.2195 11.0152 13.007C11.1699 12.7945 11.38 12.6296 11.6456 12.5125C11.9113 12.3937 12.212 12.3343 12.548 12.3343C12.8886 12.3343 13.187 12.3937 13.4433 12.5125C13.7011 12.6296 13.9035 12.7929 14.0503 13.0023C14.1972 13.2101 14.273 13.4492 14.2777 13.7195H13.441Z" fill="white" />
    );
  } else if (normalizedExt === 'pdf') {
    bannerFill = 'url(#banner-grad-pdf)';
    bannerPath = 'M0 12.4C0 11.0745 1.07452 10 2.4 10H15.2C16.5255 10 17.6 11.0745 17.6 12.4V18C17.6 19.3255 16.5255 20.4 15.2 20.4H2.4C1.07452 20.4 0 19.3255 0 18V12.4Z';
    innerContent = (
      <path d="M2.27324 17.2V12.4H4.07324C4.44199 12.4 4.75137 12.4687 5.00137 12.6062C5.25293 12.7437 5.44277 12.9328 5.5709 13.1734C5.70059 13.4125 5.76543 13.6843 5.76543 13.989C5.76543 14.2968 5.70059 14.5703 5.5709 14.8093C5.44121 15.0484 5.24981 15.2367 4.99668 15.3742C4.74355 15.5101 4.43184 15.5781 4.06152 15.5781H2.86855V14.8632H3.94434C4.15996 14.8632 4.33652 14.8257 4.47402 14.7507C4.61152 14.6757 4.71309 14.5726 4.77871 14.4414C4.8459 14.3101 4.87949 14.1593 4.87949 13.989C4.87949 13.8187 4.8459 13.6687 4.77871 13.539C4.71309 13.4093 4.61074 13.3085 4.47168 13.2367C4.33418 13.1632 4.15684 13.1265 3.93965 13.1265H3.14277V17.2H2.27324ZM8.27927 17.2H6.6527V12.4H8.31208C8.78864 12.4 9.19802 12.496 9.5402 12.6882C9.88395 12.8789 10.148 13.1531 10.3324 13.5109C10.5168 13.8687 10.609 14.2968 10.609 14.7953C10.609 15.2953 10.516 15.725 10.33 16.0843C10.1457 16.4437 9.87927 16.7195 9.53083 16.9117C9.18395 17.1039 8.76677 17.2 8.27927 17.2ZM7.52223 16.4476H8.23708C8.57145 16.4476 8.85036 16.3867 9.0738 16.2648C9.29723 16.1414 9.4652 15.9578 9.5777 15.714C9.6902 15.4687 9.74645 15.1625 9.74645 14.7953C9.74645 14.4281 9.6902 14.1234 9.5777 13.8812C9.4652 13.6375 9.2988 13.4554 9.07849 13.3351C8.85973 13.2132 8.58786 13.1523 8.26286 13.1523H7.52223V16.4476ZM11.5671 17.2V12.4H14.6421V13.1289H12.4367V14.432H14.4312V15.1609H12.4367V17.2H11.5671Z" fill="white" />
    );
  } else if (normalizedExt === 'jpg' || normalizedExt === 'jpeg') {
    bannerFill = 'url(#banner-grad-jpg)';
    bannerPath = 'M0 12.4C0 11.0745 1.07452 10 2.4 10H15.2C16.5255 10 17.6 11.0745 17.6 12.4V18C17.6 19.3255 16.5255 20.4 15.2 20.4H2.4C1.07452 20.4 0 19.3255 0 18V12.4Z';
    innerContent = (
      <path d="M4.16699 12.4H5.02949V15.775C5.02793 16.0843 4.96231 16.3507 4.83262 16.5742C4.70293 16.796 4.52168 16.9671 4.28887 17.0875C4.05762 17.2062 3.78809 17.2656 3.48027 17.2656C3.19902 17.2656 2.9459 17.2156 2.7209 17.1156C2.49746 17.014 2.32012 16.864 2.18887 16.6656C2.05762 16.4671 1.99199 16.2203 1.99199 15.925H2.85684C2.8584 16.0546 2.88652 16.1664 2.94121 16.2601C2.99746 16.3539 3.0748 16.4257 3.17324 16.4757C3.27168 16.5257 3.38496 16.5507 3.51309 16.5507C3.65215 16.5507 3.77012 16.5218 3.86699 16.464C3.96387 16.4046 4.0373 16.3171 4.0873 16.2015C4.13887 16.0859 4.16543 15.9437 4.16699 15.775V12.4ZM6.10485 17.2V12.4H7.90485C8.2736 12.4 8.58298 12.4687 8.83298 12.6062C9.08454 12.7437 9.27438 12.9328 9.40251 13.1734C9.5322 13.4125 9.59704 13.6843 9.59704 13.989C9.59704 14.2968 9.5322 14.5703 9.40251 14.8093C9.27282 15.0484 9.08141 15.2367 8.82829 15.3742C8.57516 15.5101 8.26345 15.5781 7.89313 15.5781H6.70016V14.8632H7.77595C7.99157 14.8632 8.16813 14.8257 8.30563 14.7507C8.44313 14.6757 8.5447 14.5726 8.61032 14.4414C8.67751 14.3101 8.7111 14.1593 8.7111 13.989C8.7111 13.8187 8.67751 13.6687 8.61032 13.539C8.5447 13.4093 8.44235 13.3085 8.30329 13.2367C8.16579 13.1632 7.98845 13.1265 7.77126 13.1265H6.97438V17.2H6.10485ZM13.6999 13.9328C13.6609 13.8062 13.607 13.6929 13.5382 13.5929C13.471 13.4914 13.3898 13.4046 13.2945 13.3328C13.2007 13.2609 13.0929 13.207 12.971 13.171C12.8492 13.1335 12.7163 13.1148 12.5726 13.1148C12.3148 13.1148 12.0851 13.1796 11.8835 13.3093C11.682 13.439 11.5234 13.6296 11.4078 13.8812C11.2937 14.1312 11.2367 14.4359 11.2367 14.7953C11.2367 15.1578 11.2937 15.4648 11.4078 15.7164C11.5218 15.9679 11.6804 16.1593 11.8835 16.2906C12.0867 16.4203 12.3226 16.4851 12.5913 16.4851C12.8351 16.4851 13.046 16.4382 13.2242 16.3445C13.4038 16.2507 13.5421 16.1179 13.639 15.946C13.7359 15.7726 13.7843 15.5695 13.7843 15.3367L13.9812 15.3671H12.6781V14.6875H14.6257V15.264C14.6257 15.675 14.5382 16.0304 14.3632 16.3304C14.1882 16.6304 13.9476 16.8617 13.6413 17.0242C13.3351 17.1851 12.9835 17.2656 12.5867 17.2656C12.1445 17.2656 11.7562 17.1664 11.4218 16.9679C11.089 16.7679 10.8288 16.4843 10.6413 16.1171C10.4554 15.7484 10.3624 15.3109 10.3624 14.8046C10.3624 14.4171 10.4171 14.071 10.5265 13.7664C10.6374 13.4617 10.7921 13.2031 10.9906 12.9906C11.189 12.7765 11.4218 12.614 11.689 12.5031C11.9562 12.3906 12.2468 12.3343 12.5609 12.3343C12.8265 12.3343 13.0742 12.3734 13.3038 12.4515C13.5335 12.5281 13.7374 12.6375 13.9156 12.7796C14.0953 12.9218 14.2429 13.0906 14.3585 13.2859C14.4742 13.4812 14.5499 13.6968 14.5859 13.9328H13.6999Z" fill="white" />
    );
  } else if (normalizedExt === 'png') {
    bannerFill = 'url(#banner-grad-png)';
    bannerPath = 'M0 12.4C0 11.0745 1.07452 10 2.4 10H15.2C16.5255 10 17.6 11.0745 17.6 12.4V18C17.6 19.3255 16.5255 20.4 15.2 20.4H2.4C1.07452 20.4 0 19.3255 0 18V12.4Z';
    innerContent = (
      <text
        x="8.8"
        y="17.2"
        fill="white"
        fontFamily="Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize="5.7"
        fontWeight="900"
        textAnchor="middle"
        letterSpacing="-0.2"
      >
        PNG
      </text>
    );
  } else if (normalizedExt === 'svg') {
    bannerFill = 'url(#banner-grad-svg)';
    bannerPath = 'M0 12.4C0 11.0745 1.07452 10 2.4 10H15.2C16.5255 10 17.6 11.0745 17.6 12.4V18C17.6 19.3255 16.5255 20.4 15.2 20.4H2.4C1.07452 20.4 0 19.3255 0 18V12.4Z';
    innerContent = (
      <text
        x="8.8"
        y="17.2"
        fill="white"
        fontFamily="Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize="5.7"
        fontWeight="900"
        textAnchor="middle"
        letterSpacing="-0.2"
      >
        SVG
      </text>
    );
  } else {
    // Default fallback to generic document sheet layout
    bannerFill = 'url(#banner-grad-default)';
    bannerPath = 'M0 12.4C0 11.0745 1.07452 10 2.4 10H15.2C16.5255 10 17.6 11.0745 17.6 12.4V18C17.6 19.3255 16.5255 20.4 15.2 20.4H2.4C1.07452 20.4 0 19.3255 0 18V12.4Z';
    innerContent = (
      <text
        x="8.8"
        y="17.2"
        fill="white"
        fontFamily="Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize="5.5"
        fontWeight="900"
        textAnchor="middle"
        letterSpacing="-0.1"
      >
        {normalizedExt.toUpperCase().substring(0, 3)}
      </text>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: 'drop-shadow(0px 1.5px 3px rgba(0,0,0,0.06))' }}
    >
      {renderDefs(false)}

      {/* Main 3D page layout with page-shadow filter */}
      <path 
        d="M6 0.450195H12.3096C13.1449 0.450287 13.9455 0.782403 14.5361 1.37305L20.2275 7.06348C20.8182 7.65418 21.1503 8.45564 21.1504 9.29102V20.4004C21.1502 22.1399 19.7396 23.5498 18 23.5498H6C4.26061 23.5496 2.8508 22.1398 2.85059 20.4004V3.59961C2.8508 1.86022 4.26061 0.450408 6 0.450195Z" 
        className="doc-page-path"
        strokeWidth="0.9"
      />

      {/* Folded paper flap closed with L13.8 0.6Z and shadow filter */}
      <path 
        d="M13.7998 0.599976V5.39997C13.7998 6.72546 14.8743 7.79998 16.1998 7.79998H20.9998 L13.7998 0.599976Z" 
        className="doc-fold-path"
        strokeWidth="0.9"
      />

      {/* Banner vertical 3D gradient */}
      <path d={bannerPath} fill={bannerFill}/>
      
      {/* Text or Outlined glyps */}
      {innerContent}

      {/* Gloss reflection glare clipped to page shape */}
      <g clipPath="url(#page-clip-24)">
        <rect width="24" height="24" fill="url(#glare-grad)" pointerEvents="none" />
      </g>
    </svg>
  );
};
