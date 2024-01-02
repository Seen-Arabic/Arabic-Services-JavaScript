import * as constants from './constants';
import * as script from './scripts';
import * as utils from './utils';
import { OldArabicOptions } from './options';

export const ArabicServices = {
	constants,
	utils,
	...script,
};

export type { OldArabicOptions };
