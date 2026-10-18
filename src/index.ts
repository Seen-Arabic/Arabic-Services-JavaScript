import * as constants from './constants/index.js';
import { OldArabicOptions } from './options.js';
import * as script from './scripts/index.js';
import * as utils from './utils/index.js';

// Named exports for Tree Shaking
export * from './constants/index.js';
export * from './options.js';
export * from './scripts/index.js';
export * from './utils/index.js';

// Full object export for backward compatibility
export const ArabicServices = {
	constants,
	utils,
	...script,
};

export default ArabicServices;

export type { OldArabicOptions };
export type { AffixOptions } from './scripts/index.js';
