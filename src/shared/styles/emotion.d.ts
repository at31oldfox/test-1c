import '@emotion/react';

import { borderRadius, colors, fontSize, fontWeight, spacing } from './tokens';

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof colors;
    borderRadius: typeof borderRadius;
    fontSize: typeof fontSize;
    fontWeight: typeof fontWeight;
    spacing: typeof spacing;
  }
}
