import { styled } from '@stitches/react';

export const DetailsWrapper = styled('div', {
  minHeight: '100vh',
  marginBlockStart: '20px',
  overflow: 'hidden',
});

export const PokemonImageWrapper = styled('div', {
  textAlign: 'center',
  width: '70%',

  img: {
    width: '100%',
  },

  '@media(min-width: 768px)': {
    width: '33%',
  },
});

export const TextWrapper = styled('div', {
  display: 'block',
  width: '100%',
});

export const TextSmall = styled('span', {
  display: 'block',
  width: '100%',
  color: '#333',
  fontSize: '12px',
});

export const InfoWrapper = styled('div', {
  display: 'block',
  width: '100%',
  paddingBlockEnd: '100px',
});
