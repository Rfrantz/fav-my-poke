import { styled } from '@stitches/react';

export const PokemonItemWrap = styled('div', {
  boxShadow: 'rgb(0 0 0 / 20%) -1px 2px 5px;',
  width: '100%',
  paddingInlineEnd: '18px',
  background: 'white',
  '@media(min-width: 912px)': {
    height: '250px',
    justifyContent: 'space-between',
    width: 'calc(25% - 48px)',
    marginRight: '12px',
    paddingInlineEnd: '0',
    paddingBlockEnd: '18px',
  },
});

export const PokemonImageWrapper = styled('div', {
  width: '40%',
  textAlign: 'center',
  '> img': {
    width: '100%',
    maxWidth: '200px',
  },

  '@media(min-width: 912px)': {
    width: '100%',
    '> img': {
      width: '100%',
      height: '160px',
      maxWidth: '200px',
    },
  },
});

export const PokemonNameWrapper = styled('div', {
  width: '60%',
  paddingInlineStart: '12px',

  span: {
    fontSize: '20px',
  },

  '@media(min-width: 912px)': {
    width: '100%',
    textAlign: 'center',
    marginStart: '0',

    span: {
      fontSize: '18px',
    },
  },
});
