

export const validateId = (id: number): boolean =>{
	return (id && typeof id === 'number' && Number.isInteger(id) && id > 0);
};

export const validateString = (...string: string[]): boolean => {
	return (string.filter(string => !string || typeof string !== 'string').length == 0);
};

export const validateObj = (obj: Object, ...nullProperties: string[]) =>{
	return obj && Object.keys(obj).every(key => {
		if(nullProperties.includes(key)) return true;
		return obj[key];
	});
};
export default {
	validateId,
	validateObj,
	validateString
};