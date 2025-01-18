import {BANNER_AD_ID_DEV, BANNER_AD_ID_PRO} from '@env';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

const BannerAds = () => {

  const adUnitId = __DEV__ ? BANNER_AD_ID_DEV : BANNER_AD_ID_PRO;

  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.FULL_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
};

export default BannerAds;
