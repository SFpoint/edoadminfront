// change date format from 'dd-mm-yyyy hh:mm:ss' to 'yyyy-mm-dd hh:mm:ss'
export const formatDateToISOString = stringFromServer => {
	// return stringFromServer.replace( /(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})/, "$3-$2-$1 $4:$5:$6")
	// return new Date(stringFromServer).toLocaleString().replace(/\./g,'-').replace(/\,/g,'') || '-'
}