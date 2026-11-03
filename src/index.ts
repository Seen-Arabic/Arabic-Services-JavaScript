import * as constants from './constants';
import { OldArabicOptions } from './options';
import * as script from './scripts';
import * as utils from './utils';

// Named exports for Tree Shaking
export * from './constants';
export * from './options';
export * from './scripts';
export * from './utils';

// Full object export for backward compatibility
export const ArabicServices = {
	constants,
	utils,
	...script,
};

export default ArabicServices;

export type { OldArabicOptions };
