import { RFValue } from 'react-native-responsive-fontsize';

const phoneScreenHeight = 667;

export const theme = {
  colors: {
    primary: '#62A856',
    secondary: '#AFDA51',
    textPrimary: '#707070',
    textSecondary: '#404040',
    border: '#000000',
    background: '#FAFAFA',
    cardPrimary: '#FFFFFF',
    cardSecondary: '#CE2929',
    skeleton: '#EAEAEA',
  },
  fonts: {
    Inter_Regular: 'Inter-Regular',
    OpenSans_Regular: 'OpenSans-Regular',
    OpenSans_SemiBold: 'OpenSans-SemiBold',
    OpenSans_Bold: 'OpenSans-Bold',
  },
  responsiveValue: RFValue(1, phoneScreenHeight),
};
