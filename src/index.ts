import * as constants from './constants';
import { OldArabicOptions } from './options';
import * as script from './scripts';
import * as utils from './utils';

export const ArabicServices = {
	constants,
	utils,
	...script,
};

export type { OldArabicOptions };
