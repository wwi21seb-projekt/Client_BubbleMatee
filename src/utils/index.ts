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

export { calculatePassedTime } from './globalFunctions/timeCalculations';
export { fetchNextPosts } from './loadPosts/loadPosts';
