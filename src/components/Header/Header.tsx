import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { BackButtonWrapper, HeaderWrapper, IconWrapper } from './header.styles';

type HeaderArgs = {
  page: string;
};

export const Header = ({ page }: HeaderArgs) => {
  const navigateTo = useNavigate();

  const handleFavoriteAction = useCallback(() => {
    navigateTo('/favorites');
  }, []);

  return (
    <HeaderWrapper className="d-flex justify-content-between align-items-center px-4">
      <BackButtonWrapper onClick={() => navigateTo('/home')}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
        </svg>
      </BackButtonWrapper>

      <span>{page}</span>

      <IconWrapper onClick={handleFavoriteAction}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
        </svg>
      </IconWrapper>
    </HeaderWrapper>
  );
};
