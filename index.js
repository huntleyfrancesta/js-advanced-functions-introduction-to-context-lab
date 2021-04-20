// Your code here
let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(empAttributes) {
    return empAttributes.map(function(row) {
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(empRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    empRecord.timeInEvents.push({
        type: 'TimeIn',
        date,
        hour: parseInt(hour, 10)
    })

    return empRecord
}

let createTimeOutEvent = function(empRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    empRecord.timeOutEvents.push({
        type: 'TimeOut',
        date,
        hour: parseInt(hour, 10)
    })

    return empRecord

}

let hoursWorkedOnDate = function(empRecord, timeInput) {
    let inTime = empRecord.timeInEvents.find(function(event) {
        return event.date === timeInput
    })
    let outTime = empRecord.timeOutEvents.find(function(event) {
        return event.date === timeInput
    })
    return (outTime.hour - inTime.hour) / 100
}

let wagesEarnedOnDate = function(empRecord, dateInput) {
    let payWage = hoursWorkedOnDate(empRecord, dateInput) * empRecord.payPerHour
    return payWage
}

let allWagesFor = function(empRecord) {
    let daysWorked = empRecord.timeInEvents.map((event) => {
        return event.date
    })
    let payTotal = daysWorked.reduce((memo, days) => {
        return memo + wagesEarnedOnDate(empRecord, days)
    }, 0)
    return payTotal
}

let findEmployeeByFirstName = function(empRecordArr, firstName) {
    return empRecordArr.find((empRecord) => {
        return empRecord.firstName == firstName
    })
}

let calculatePayroll = function(empRecordArr) {
    return empRecordArr.reduce(function(memo, payPeriod) {
        return memo + allWagesFor(payPeriod)
    }, 0)
}