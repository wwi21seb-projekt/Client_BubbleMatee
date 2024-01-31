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
export {
	fetchNextPostsFeed,
	fetchNextPostsUser,
	searchPostByHashtag
} from './apiRequest/loadPosts';
export { loadUser, loadSearchedUser } from './apiRequest/loadUser';
export { subscribe, unsubscribe } from './apiRequest/postSubscriptions';
export { tokenExpired } from './token/tokenExpired';
export { getCurrentUser } from './token/getUser';
export { checkAuth } from './token/checkAuth';
export { globalConfig } from './config/config';
