export {
	determineIconType,
	containsBigLetter,
	containsNumber,
	containsSmallLetter,
	containsSpecialCharacter,
	passwordLongEnough,
	passwordValid,
	passwordsMatch
} from './login/passwordValidations';

export {
	getUserInfoColors,
	getUserInfoIcons,
	isValidEmail,
	isValidNickname,
	isValidUsername
} from './login/userInfoValidation';

export { getErrorMessage } from './errorMessages/errorMessages';

export { tokenExpired } from './token/tokenExpired';
export { getCurrentUser } from './token/getUser';
export { checkAuth } from './token/checkAuth';
