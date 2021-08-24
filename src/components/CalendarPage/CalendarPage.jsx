import React, { useEffect, useState } from 'react';
import './CalendarPage.css';
import { Calendar, ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import CalendarPageTasks from './CalendarPageTasks/CalendarPageTasks';
import moment from 'moment';
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';

const CalendarPage = ({ lists }) => {

    const getTasks = (lists) => {
        let tasksWithDate = [];
        lists.forEach(list => {
            list.toDoList.forEach(task => {
                if (task.date) {
                    tasksWithDate.push(task);

                }
            })
        })

        return tasksWithDate;
    }

    const [tasks, setTasks] = useState(getTasks(lists));
    const [currentDate, setCurrentDate] = useState([new Date().getDate(), new Date().getMonth(), new Date().getFullYear()]);

    useEffect(() => {
        setTasks(getTasks(lists));
    }, [lists]);

    function onPanelChange(value, mode) {

    }

    const onClickDate = (date, month, year) => {
        setCurrentDate([date, month, year]);
    }

    const getListData = (value) => {
        let listData;

        const checkDate = tasks.some((el) => {
            return ((new Date(el.date)).getMonth() === value._d.getMonth()) && (new Date(el.date).getDate() === value._d.getDate() && (new Date(el.date).getFullYear() === value._d.getFullYear()))
        });

        if (checkDate) {
            listData = [
                {
                    date: value._d.getDate(),
                    month: value._d.getMonth(),
                    year: value._d.getFullYear(),
                    className: 'calendarDay activeCalendarDay',
                }
            ]
        } else {
            listData = [
                {
                    date: value._d.getDate(),
                    month: value._d.getMonth(),
                    year: value._d.getFullYear(),
                    className: 'calendarDay',
                }
            ]
        }

        return listData || [];
    }

    function dateFullCellRender(value) {
        const listData = getListData(value);

        return listData.map(item => {
            return <div key={item.date} onClick={() => onClickDate(item.date, item.month, item.year)} className={item.className} >{item.date}</div>
        });
    }
    moment.locale('ru-ru');
    return (
        <div className="CalendarPage">
            <h1 className="CalendarPage__title">
                Главная
            </h1>
            <ConfigProvider locale={locale}>
                <Calendar className="Calendar" dateFullCellRender={dateFullCellRender} fullscreen={false} onPanelChange={onPanelChange} />
            </ConfigProvider>
            <CalendarPageTasks tasks={tasks} date={currentDate} />
        </div>
    );
};

const mapStateToProps = ({ lists }) => {
    return {
        lists
    }
}

export default connect(mapStateToProps)(CalendarPage);