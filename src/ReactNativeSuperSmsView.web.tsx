import * as React from 'react';

import { ReactNativeSuperSmsViewProps } from './ReactNativeSuperSms.types';

export default function ReactNativeSuperSmsView(props: ReactNativeSuperSmsViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
