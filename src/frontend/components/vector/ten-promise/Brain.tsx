interface Props {
  className?: string;
}

export default function Brain({ className }: Props) {
  return (
    <svg
      className={className}
      width="40"
      height="41"
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.259 6.39559C13.623 5.36262 15.2881 4.80548 16.999 4.80959C17.479 4.80959 17.861 5.05959 18.083 5.23159C18.331 5.42759 18.563 5.67759 18.771 5.92759C18.9185 6.10672 18.9991 6.33156 18.999 6.56359V13.8096H16.829C16.5931 13.1424 16.129 12.58 15.5185 12.222C14.9081 11.8639 14.1908 11.7331 13.4933 11.8528C12.7958 11.9725 12.1631 12.3349 11.7069 12.8759C11.2508 13.417 11.0006 14.1019 11.0006 14.8096C11.0006 15.5173 11.2508 16.2022 11.7069 16.7433C12.1631 17.2843 12.7958 17.6467 13.4933 17.7664C14.1908 17.8861 14.9081 17.7553 15.5185 17.3972C16.129 17.0391 16.5931 16.4768 16.829 15.8096H18.999V34.6396C18.9991 34.7877 18.9663 34.9339 18.903 35.0677C18.8398 35.2016 18.7475 35.3197 18.633 35.4136C17.709 36.1696 16.473 36.8096 14.999 36.8096C12.627 36.8096 10.861 35.6136 9.71902 34.1836C8.89854 33.1647 8.33658 31.9626 8.08102 30.6796C7.30398 30.4724 6.58352 30.093 5.97302 29.5696C4.86902 28.6236 3.99902 27.0896 3.99902 24.8096C3.99902 23.6956 4.07302 22.6896 4.23902 21.8096H10.499C11.771 21.8096 12.819 22.7596 12.979 23.9876C12.3139 24.2283 11.7552 24.6963 11.4017 25.3089C11.0481 25.9215 10.9223 26.6393 11.0466 27.3356C11.1708 28.0319 11.5372 28.6619 12.0808 29.1144C12.6245 29.5669 13.3105 29.8127 14.0178 29.8085C14.7252 29.8043 15.4082 29.5503 15.9464 29.0913C16.4847 28.6324 16.8434 27.998 16.9593 27.3003C17.0753 26.6025 16.9409 25.8862 16.5801 25.2779C16.2192 24.6696 15.655 24.2083 14.987 23.9756C14.9027 22.843 14.3933 21.7842 13.5609 21.0115C12.7285 20.2388 11.6348 19.8095 10.499 19.8096H4.88102C5.18702 19.2136 5.59702 18.7096 6.13102 18.3516C6.2661 18.2622 6.40785 18.1833 6.55502 18.1156C5.98702 16.4516 6.13502 14.5036 6.68302 12.9736C7.03302 11.9896 7.58902 11.0596 8.35302 10.4396C8.85702 10.0296 9.45702 9.75959 10.113 9.70759C10.401 8.34159 11.211 7.21159 12.261 6.39559H12.259ZM20.999 29.8096H22.499C23.6925 29.8096 24.8371 29.3355 25.681 28.4916C26.5249 27.6477 26.999 26.5031 26.999 25.3096V21.6396C27.6662 21.4037 28.2286 20.9395 28.5867 20.3291C28.9447 19.7187 29.0755 19.0014 28.9558 18.3039C28.8361 17.6064 28.4738 16.9736 27.9327 16.5175C27.3916 16.0613 26.7067 15.8112 25.999 15.8112C25.2913 15.8112 24.6064 16.0613 24.0654 16.5175C23.5243 16.9736 23.1619 17.6064 23.0422 18.3039C22.9226 19.0014 23.0533 19.7187 23.4114 20.3291C23.7695 20.9395 24.3318 21.4037 24.999 21.6396V25.3096C24.999 26.6896 23.879 27.8096 22.499 27.8096H20.999V6.56359C20.9989 6.33156 21.0795 6.10672 21.227 5.92759C21.433 5.67759 21.667 5.42759 21.915 5.23159C22.135 5.05959 22.517 4.80959 22.999 4.80959C24.71 4.80548 26.3751 5.36262 27.739 6.39559C28.789 7.21159 29.599 8.34159 29.885 9.70759C30.541 9.75759 31.141 10.0296 31.645 10.4396C32.409 11.0596 32.965 11.9896 33.315 12.9736C33.863 14.5036 34.011 16.4536 33.443 18.1136C33.587 18.1816 33.729 18.2616 33.867 18.3536C34.417 18.7196 34.835 19.2436 35.143 19.8616C35.749 21.0716 35.999 22.7596 35.999 24.8096C35.999 27.0916 35.129 28.6236 34.025 29.5696C33.4145 30.093 32.6941 30.4724 31.917 30.6796C31.717 31.7956 31.157 33.0876 30.279 34.1836C29.139 35.6136 27.371 36.8096 24.999 36.8096C23.527 36.8096 22.289 36.1696 21.367 35.4136C21.2522 35.3199 21.1595 35.2019 21.0959 35.068C21.0323 34.9342 20.9992 34.7878 20.999 34.6396V29.8096ZM13.999 13.8096C13.7338 13.8096 13.4795 13.915 13.2919 14.1025C13.1044 14.29 12.999 14.5444 12.999 14.8096C12.999 15.0748 13.1044 15.3292 13.2919 15.5167C13.4795 15.7042 13.7338 15.8096 13.999 15.8096C14.2642 15.8096 14.5186 15.7042 14.7061 15.5167C14.8937 15.3292 14.999 15.0748 14.999 14.8096C14.999 14.5444 14.8937 14.29 14.7061 14.1025C14.5186 13.915 14.2642 13.8096 13.999 13.8096ZM13.999 25.8096C13.7338 25.8096 13.4795 25.9149 13.2919 26.1025C13.1044 26.29 12.999 26.5444 12.999 26.8096C12.999 27.0748 13.1044 27.3292 13.2919 27.5167C13.4795 27.7042 13.7338 27.8096 13.999 27.8096C14.2642 27.8096 14.5186 27.7042 14.7061 27.5167C14.8937 27.3292 14.999 27.0748 14.999 26.8096C14.999 26.5444 14.8937 26.29 14.7061 26.1025C14.5186 25.9149 14.2642 25.8096 13.999 25.8096ZM25.999 19.8096C26.2642 19.8096 26.5186 19.7042 26.7061 19.5167C26.8937 19.3292 26.999 19.0748 26.999 18.8096C26.999 18.5444 26.8937 18.29 26.7061 18.1025C26.5186 17.9149 26.2642 17.8096 25.999 17.8096C25.7338 17.8096 25.4795 17.9149 25.2919 18.1025C25.1044 18.29 24.999 18.5444 24.999 18.8096C24.999 19.0748 25.1044 19.3292 25.2919 19.5167C25.4795 19.7042 25.7338 19.8096 25.999 19.8096Z"
        fill="currentColor"
      />
    </svg>
  );
}
