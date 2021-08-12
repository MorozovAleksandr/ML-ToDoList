import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import './DatePicker.css';
import ruLocale from "date-fns/locale/ru";
import format from "date-fns/format";
import AlarmIcon from '@material-ui/icons/Alarm';

const localeMap = {
    ru: ruLocale,
};

class RuLocalizedUtils extends DateFnsUtils {
    getCalendarHeaderText(date) {
        return format(date, "LLLL", { locale: this.locale });
    }

    getDatePickerHeaderText(date) {
        return format(date, "dd MMMM", { locale: this.locale });
    }
}

const localeUtilsMap = {
    ru: RuLocalizedUtils,
};

const localeFormatMap = {
    ru: "d MMM yyyy",
};

const localeCancelLabelMap = {
    ru: "отмена",
};

export default function DatePicker({ date, time, eventSaveTime, eventSaveDate, eventSaveDateOrTime }) {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(date);
    const [selectedTime, setSelectedTime] = React.useState(time);

    const handleDateChange = (date) => {
        eventSaveDateOrTime(date, selectedTime);
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        eventSaveDateOrTime(selectedDate, time);
        setSelectedTime(time);
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    }

    return (
        <div onClick={stopPropagation} className="DatePicker">
            <MuiPickersUtilsProvider onClick={stopPropagation} utils={localeUtilsMap.ru} locale={localeMap.ru}>
                <Grid container onClick={stopPropagation} justifyContent="space-around">
                    <KeyboardDatePicker className="DatePicker__item"
                        margin="normal"
                        id="date-picker-dialog"
                        label="Дата"
                        format={localeFormatMap.ru}
                        cancelLabel={localeCancelLabelMap.ru}
                        value={selectedDate}
                        onClick={stopPropagation}
                        onChange={handleDateChange}
                        autoComplete="off"
                        DialogProps={{
                            'className': 'DatePicker__pickers'
                        }}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker className="DatePicker__item DatePicker__item_time"
                        margin="normal"
                        id="time-picker"
                        clearable
                        ampm={false}
                        label="Время"
                        cancelLabel={localeCancelLabelMap.ru}
                        autoComplete="off"
                        onClick={stopPropagation}
                        value={selectedTime}
                        onChange={handleTimeChange}
                        keyboardIcon={<AlarmIcon />}
                        DialogProps={{
                            'className': 'DatePicker__pickers'
                        }}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        </div>
    );
}