
import {IN_AD_ID_PRO, IN_AD_ID_DEV} from '@env';
import { useEffect, useState } from 'react';

import {InterstitialAd, AdEventType} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? IN_AD_ID_DEV : IN_AD_ID_PRO;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

export default function interstitialAds() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    const unsubscribeOpened = interstitial.addAdEventListener(
      AdEventType.OPENED,
      () => {
        if (Platform.OS === 'ios') {
          StatusBar.setHidden(true);
        }
      },
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        if (Platform.OS === 'ios') {
          StatusBar.setHidden(false);
        }
      },
    );

    // Start loading the interstitial straight way
    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeOpened();
      unsubscribeClosed();
    };
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return interstitial.show();
}
