import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Theme } from "@mui/material";
import createStyles from '@mui/styles/createStyles';
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import ProgressView from "../../common/components/ProgressView";
import { DatabaseType } from "../models";
import {MiscService} from "../services/MiscService";

interface Props {
  dbType: DatabaseType;
  db: string;
  setIsConfigured: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,

    content: {
      maxWidth: 1500,
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

export const ConfigureDb: React.FunctionComponent<Props> = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { dbType, db, setIsConfigured, setErrorMessage } = props;

  const handleConfigureDb = () => {
    setLoading(true);
    MiscService.configureDatabase(dbType, db)
      .then((r) => {
        setIsConfigured(r);
        setLoading(false);
      })
      .catch((e) => {
        setErrorMessage(`[ERROR] Failed to Configure ${db}. Please try again.`);
        setLoading(false);
      });
  };

  return (
    <Box
      className={[classes.content, classes.toolbar].join(" ")}
      mt={10}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Paper>
        {loading ? (
          <ProgressView />
        ) : (
          <div style={{ padding: "10px" }}>
            <Typography variant={"h6"}>Database not configured </Typography>
            {dbType == DatabaseType.SQLSERVER && (
              <Button variant="contained" onClick={() => handleConfigureDb()}>
                Configure Now{" "}
              </Button>
            )}

            <Button
              style={{ margin: "16px" }}
              variant={"contained"}
              onClick={() => history.push("/")}
            >
              {" "}
              Back to Home
            </Button>
          </div>
        )}
      </Paper>
    </Box>
  );
};
