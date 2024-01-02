export type OldArabicOptions = {
	replaceMidNoonWithBah?: boolean;
};

const defaultOldArabicOptions: OldArabicOptions = {
	replaceMidNoonWithBah: true,
};

export function fillDefaultOptions(options: OldArabicOptions): OldArabicOptions {
	return {
		...defaultOldArabicOptions,
		...options,
	};
}
