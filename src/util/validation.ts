
const validateId = (id: number): boolean =>{
	return (id && typeof id === 'number' && Number.isInteger(id) && id > 0);
};

const validateString = (...string: string[]): boolean => {
	return (string.filter(string => !string || typeof string !== 'string').length == 0);
};

const validateObj = (obj: Object, ...nullProperties: string[]) =>{
	return obj && Object.keys(obj).every(key => {
		if(key ==  'id') return validateId(obj['id']);
		if(nullProperties.includes(key)) return true;
	});
};

export {
	validateId,
	validateString,
	validateObj
};