import { styled } from '@stitches/react';

export const HeaderWrapper = styled('div', {
  background: '#18AD86',
  lineHeight: '55px',
  width: '100%',
  top: '0px',
  position: 'fixed',
  textAlign: 'center',
});

export const IconWrapper = styled('div', {
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  background: '#3de1b6',

  svg: {
    fill: 'rgb(5 86 33)',
  },
});

export const BackButtonWrapper = styled('div', {
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  background: '#3de1b6',

  svg: {
    fill: 'rgb(5 86 33)',
  },
});
