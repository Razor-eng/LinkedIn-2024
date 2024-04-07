import moment from "moment/moment"

export const getCurrentTimeStamp = (time) => {
    return moment().format(time);
}