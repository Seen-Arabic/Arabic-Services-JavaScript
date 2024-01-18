export type OldArabicOptions = {
	replaceMidNoonWithBah?: boolean;
	replaceMidYahWithBah?: boolean;
};

const defaultOldArabicOptions: OldArabicOptions = {
	replaceMidNoonWithBah: true,
	replaceMidYahWithBah: false,
};

export function fillDefaultOptions(options: OldArabicOptions): OldArabicOptions {
	return {
		...defaultOldArabicOptions,
		...options,
	};
}
