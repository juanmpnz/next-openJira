import React, { ChangeEvent, useContext, useState } from "react";
import { Layout } from "@/components/layouts";
import {
  Grid,
  CardHeader,
  Avatar,
  capitalize,
  Card,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
} from "@mui/material";
import { NextPage } from "next";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Entry, EntryStatus } from "@/interfaces";

interface Props {
  entry: Entry;
}

const validStatus = ["pending", "in-progress", "finished"];

const EntryPage: NextPage<Props> = ({ entry }) => {
  const router = useRouter();
  const { onEntryUpdated, onEntryDeleted } = useContext(EntriesContext);
  const { enqueueSnackbar } = useSnackbar();
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touch, setTouch] = useState(false);

  const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTouch(false);
    setInputValue(event.target.value);
  };

  const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    const updateEntry = {
      ...entry,
      status,
      description: inputValue,
    };
    onEntryUpdated(updateEntry);
    enqueueSnackbar("Tarea actualizada");
  };

  const onDeleteEntry = () => {
    const { _id } = entry;
    onEntryDeleted(_id as string);
    enqueueSnackbar("Tarea eliminada");
    return router.push("/");
  };

  return (
    <Layout title="Entrie">
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title="Tarea"
              subheader={dateFunction.getFormatDistanceToNow(entry.createdAt)}
            />
            <CardContent>
              <TextField
                onBlur={() => setTouch(true)}
                value={inputValue}
                fullWidth
                sx={{ marginTop: 2, marginBottom: 1 }}
                autoFocus
                multiline
                placeholder="Nueva tarea"
                onChange={onTextFieldChange}
                error={touch && !inputValue}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onRadioChange}>
                  {validStatus.map((option, i) => (
                    <FormControlLabel
                      key={i}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                disabled={!inputValue}
                onClick={onSave}
                variant="contained"
                fullWidth
                startIcon={<SaveAltIcon />}
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{ position: "fixed", bottom: 30, rigth: 30 }}
        onClick={onDeleteEntry}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { dbEntries } from "@/database";
import { EntriesContext } from "@/context/entries";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { dateFunction } from "@/utils";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    // validacion lado servidor
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
function onEntryDeleted(arg0: { _id: any }) {
  throw new Error("Function not implemented.");
}
