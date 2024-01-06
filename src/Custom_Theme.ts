import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const CustomTheme: CustomThemeConfig = {
	name: 'my-custom-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '255 255 255',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '0 0 0',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #64F1FD
		'--color-primary-50': '232 253 255', // #e8fdff
		'--color-primary-100': '224 252 255', // #e0fcff
		'--color-primary-200': '216 252 255', // #d8fcff
		'--color-primary-300': '193 249 254', // #c1f9fe
		'--color-primary-400': '147 245 254', // #93f5fe
		'--color-primary-500': '100 241 253', // #64F1FD
		'--color-primary-600': '90 217 228', // #5ad9e4
		'--color-primary-700': '75 181 190', // #4bb5be
		'--color-primary-800': '60 145 152', // #3c9198
		'--color-primary-900': '49 118 124', // #31767c
		// secondary | #033C85
		'--color-secondary-50': '217 226 237', // #d9e2ed
		'--color-secondary-100': '205 216 231', // #cdd8e7
		'--color-secondary-200': '192 206 225', // #c0cee1
		'--color-secondary-300': '154 177 206', // #9ab1ce
		'--color-secondary-400': '79 119 170', // #4f77aa
		'--color-secondary-500': '3 60 133', // #033C85
		'--color-secondary-600': '3 54 120', // #033678
		'--color-secondary-700': '2 45 100', // #022d64
		'--color-secondary-800': '2 36 80', // #022450
		'--color-secondary-900': '1 29 65', // #011d41
		// tertiary | #082846
		'--color-tertiary-50': '218 223 227', // #dadfe3
		'--color-tertiary-100': '206 212 218', // #ced4da
		'--color-tertiary-200': '193 201 209', // #c1c9d1
		'--color-tertiary-300': '156 169 181', // #9ca9b5
		'--color-tertiary-400': '82 105 126', // #52697e
		'--color-tertiary-500': '8 40 70', // #082846
		'--color-tertiary-600': '7 36 63', // #07243f
		'--color-tertiary-700': '6 30 53', // #061e35
		'--color-tertiary-800': '5 24 42', // #05182a
		'--color-tertiary-900': '4 20 34', // #041422
		// success | #84cc16
		'--color-success-50': '237 247 220', // #edf7dc
		'--color-success-100': '230 245 208', // #e6f5d0
		'--color-success-200': '224 242 197', // #e0f2c5
		'--color-success-300': '206 235 162', // #ceeba2
		'--color-success-400': '169 219 92', // #a9db5c
		'--color-success-500': '132 204 22', // #84cc16
		'--color-success-600': '119 184 20', // #77b814
		'--color-success-700': '99 153 17', // #639911
		'--color-success-800': '79 122 13', // #4f7a0d
		'--color-success-900': '65 100 11', // #41640b
		// warning | #FF9727
		'--color-warning-50': '255 239 223', // #ffefdf
		'--color-warning-100': '255 234 212', // #ffead4
		'--color-warning-200': '255 229 201', // #ffe5c9
		'--color-warning-300': '255 213 169', // #ffd5a9
		'--color-warning-400': '255 182 104', // #ffb668
		'--color-warning-500': '255 151 39', // #FF9727
		'--color-warning-600': '230 136 35', // #e68823
		'--color-warning-700': '191 113 29', // #bf711d
		'--color-warning-800': '153 91 23', // #995b17
		'--color-warning-900': '125 74 19', // #7d4a13
		// error | #F72C33
		'--color-error-50': '254 223 224', // #fedfe0
		'--color-error-100': '253 213 214', // #fdd5d6
		'--color-error-200': '253 202 204', // #fdcacc
		'--color-error-300': '252 171 173', // #fcabad
		'--color-error-400': '249 107 112', // #f96b70
		'--color-error-500': '247 44 51', // #F72C33
		'--color-error-600': '222 40 46', // #de282e
		'--color-error-700': '185 33 38', // #b92126
		'--color-error-800': '148 26 31', // #941a1f
		'--color-error-900': '121 22 25', // #791619
		// surface | #0255B5
		'--color-surface-50': '217 230 244', // #d9e6f4
		'--color-surface-100': '204 221 240', // #ccddf0
		'--color-surface-200': '192 213 237', // #c0d5ed
		'--color-surface-300': '154 187 225', // #9abbe1
		'--color-surface-400': '78 136 203', // #4e88cb
		'--color-surface-500': '2 85 181', // #0255B5
		'--color-surface-600': '2 77 163', // #024da3
		'--color-surface-700': '2 64 136', // #024088
		'--color-surface-800': '1 51 109', // #01336d
		'--color-surface-900': '1 42 89' // #012a59
	}
};
