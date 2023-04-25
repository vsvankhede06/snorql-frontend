import React , { FunctionComponent, useState } from "react";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Button, InputAdornment, CircularProgress } from '@material-ui/core';

interface Props {
    handleClose: () => void;
    handleSubmit: (description: string, repeatInterval: number, endTime: string, queryElapsedTime: number, dataRetentionPeriodInDays: number) => boolean;
    metricId: string;
    metricName: string;
    databaseName: string;
    configuredByName: string;
    configuredByEmail: string;
    submitLoading: boolean;
    minimumRepeatInterval?: number;
}

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2),
  
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '300px',
      },
      '& .MuiButtonBase-root': {
        margin: theme.spacing(2),
      },
    },
  }));

export const LongRunningQueriesTriggerForm: FunctionComponent<Props> = (props: Props) => {
    const today = new Date()
    const tempToday = new Date()
    var weekAheadDate = new Date(tempToday.setDate(tempToday.getDate() + 7))
    weekAheadDate.setHours(weekAheadDate.getHours() + 5); weekAheadDate.setMinutes(weekAheadDate.getMinutes() + 30);
    today.setHours(today.getHours() + 5); today.setMinutes(today.getMinutes() + 30);
    const weekAheadString = weekAheadDate.toISOString().slice(0,16)
    const todayString = today.toISOString().slice(0,16)
    const { handleClose, handleSubmit, metricId, metricName, databaseName, configuredByEmail, configuredByName, submitLoading, minimumRepeatInterval } = props
    const classes = useStyles();
    const [repeatInterval, setRepeatInterval] = useState(3600);
    const [dataRetentionPeriodInDays, setRetentionPeriod] = useState(7);
    const [endTime, setEndTime] = useState(weekAheadString); // useState(today.substring(0, today.length - 8));
    const [description, setDescription] = useState('');
    const [elapsedTime, setElapsedTime] = useState(10);

    const handleSubmitForm = (event:any) => { 
        event.preventDefault()
        handleSubmit(description, repeatInterval, endTime, elapsedTime, dataRetentionPeriodInDays);
    }

    return (
        <form className={classes.root} onSubmit={handleSubmitForm}>
            <TextField
                label="Database Name"
                variant="outlined"
                required
                value={databaseName}
                InputProps={{
                    readOnly: true,
                }}
                onChange={e => null}
            />
            <TextField
                label="Metric Name"
                variant="outlined"
                required
                value={metricName}
                InputProps={{
                    readOnly: true,
                }}
                onChange={e => null}
            />
            <TextField
                label="Configured By"
                variant="outlined"
                required
                value={`${configuredByName} (${configuredByEmail})`}
                InputProps={{
                    readOnly: true,
                }}
                onChange={e => null}
            />
            <TextField
                label="Description"
                variant="outlined"
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <TextField
                type="number"
                label="Repeat Interval"
                variant="outlined"
                required
                InputProps={{
                    endAdornment: <InputAdornment position="end">seconds</InputAdornment>,
                    inputProps: { min: minimumRepeatInterval }
                  }}
                value={repeatInterval}
                onChange={(e) => setRepeatInterval(Number(e.target.value))}
            />
            <TextField
                type="number"
                label="Query elapsed Time"
                variant="outlined"
                required
                InputProps={{
                    endAdornment: <InputAdornment position="end">seconds</InputAdornment>,
                }}
                value={elapsedTime}
                onChange={(e) => { setElapsedTime(Number(e.target.value))} }
            />
            <TextField
                type="datetime-local"
                label="End Date Time"
                variant="outlined"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                InputProps={{
                    inputProps: { min: todayString }
                }}
            />
            <TextField
                type="number"
                label="Retention Period"
                variant="outlined"
                required
                InputProps={{
                    endAdornment: <InputAdornment position="end">days</InputAdornment>,
                    inputProps: { min: 1 }
                  }}
                value={dataRetentionPeriodInDays}
                onChange={e => setRetentionPeriod(Number(e.target.value))}
            />
            <div>
                <div>
                <Button variant="contained" onClick={handleClose}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" disabled={submitLoading}>
                    {submitLoading ? <CircularProgress/> : 'Add Data Recording'}
                </Button>
                </div>
            </div>
        </form>
    );
}