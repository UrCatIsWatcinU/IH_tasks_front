export default (context, inject) => {
    // всё для даты
    const now = () => new Date();
    inject('now', now);

    const timeLocalOffset = now().getTimezoneOffset() * 60;

    const getWordInCorrectCase = (num, nominative, genitive, moreGenetive) => 
        num == 1 || num == -1 ? nominative :
        num < 5 && num > 1  ? genitive :
        moreGenetive;
    
    const dateFormaters = {
        short: Intl.DateTimeFormat(undefined, {
            hour: 'numeric',
            minute: 'numeric',
        }),
        long: Intl.DateTimeFormat(undefined, {
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: 'numeric',
            weekday: 'short'
        }),
        left: {
            format: (date) => {
                date = date - now();
                const hoursCount = Math.trunc(date / (60 * 60 * 1e3));

                if(hoursCount){
                    if(hoursCount / 24 > 2){
                        const daysCount = Math.trunc(hoursCount / 24)
                        const lastDigit = daysCount > 9 && daysCount < 21 ? 9 : daysCount % 10 || daysCount;
                        
                        return `${daysCount} ${getWordInCorrectCase(lastDigit, 'день', 'дня', 'дней')}`
                    }

                    const lastDigit = hoursCount > 9 && hoursCount < 21 ? 9 : hoursCount % 10 || hoursCount;
                    
                    return `${hoursCount} ${getWordInCorrectCase(lastDigit, 'час', 'часа', 'часов')}`
                }else{
                    const minutesCount = Math.trunc(date / (60 * 1e3));
                    const lastDigit = minutesCount > 9 && minutesCount < 21 ? 9 : minutesCount % 10 || minutesCount;

                    return `${minutesCount} ${getWordInCorrectCase(lastDigit, 'минута', 'минуты', 'минут')}`
                }
            }
        }
    };
    dateFormaters.longLeft = {
        format(date){
            let dayDesc; 
            
            const betweenNowAndSelected = date.getDate() - now().getDate();

            dayDesc =
            betweenNowAndSelected === undefined ? 'Когда-то' :  
            betweenNowAndSelected === 0 ? 'Сегодня' :
            betweenNowAndSelected === 1 ? 'Завтра' :
            betweenNowAndSelected === 2 ? 'Послезавтра' :
            'Через ' + dateFormaters.left.format(date);

            return dayDesc;
        }
    }

    inject('parseDate', (date, format) => {
        const parsedDate = typeof(date) == 'object' ? date : new Date((date - timeLocalOffset) * 1e3);
        return format && dateFormaters[format] ? dateFormaters[format].format(parsedDate) : parsedDate
    });
}