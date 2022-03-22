class MyDate {
    static isLeapYear(year) {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }

    static numDaysInMonth(month, year) {
        switch (month) {
            case 2:
                return MyDate.isLeapYear(year) ? 29 : 28;
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            default:
                console.error(`Error: Invalid month: ${month}`);
        }
    }

    constructor(day, month, year) {
        this.day = day;
        this.month = month;
        this.year = year;
    }

    // Can only add less than a month's worth of days
    addDays(days) {
        this.day += days;

        const numDaysInThisMonth = MyDate.numDaysInMonth(this.month);
        if (this.day > numDaysInThisMonth) {
            this.day -= numDaysInThisMonth;
            this.month++;

            if (this.month > 12) {
                this.month = 1;
                this.year++;
            }
        }
    }
}

// First Sunday
const date = new MyDate(6, 1, 1901)

let count = 0;
while (date.year <= 2000) {
    date.addDays(7);

    if (date.day === 1) {
        count++;
    }
}

console.log(count)
