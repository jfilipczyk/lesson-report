# Lesson report

Creates CSV report based on calendar data (in ICS format).

It groups calendar events by event summary and calculates number of events (lessons) and total time in given time period.

In case when a customer pays for lessons for more than one student (like parent for all his children), teacher should create event summaries using pattern:

```
[grouping name]#[additional description]
```
f.e.
```
Smith family#Billy
Smith family#Jane
```

## Technical note

App is based on [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)

## License
MIT
