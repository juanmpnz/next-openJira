import React, { useContext, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { EntriesContext } from "@/context/entries";
import { UiContext } from "@/context/ui";
export const NewEntrie = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { setIsAddingEntry, isAddingEntry } = useContext(UiContext);
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const handleClickForm = () => setIsAddingEntry(true);

  const handleClickCancel = () => {
    setInputValue("");
    setIsAddingEntry(false);
    setTouched(false)
  };

  const handleClickAdd = () => {
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setInputValue("");
  };

  return (
    <>
      {isAddingEntry ? (
        <Box padding={1}>
          <TextField
            fullWidth
            placeholder="Ingresa tarea"
            autoFocus
            multiline
            helperText="Agrega un valor"
            label="Ingresa tarea"
            error={inputValue.length <= 0 && touched}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setTouched(!touched)}
          />
        </Box>
      ) : (
        <Box padding={1} display={"flex"} justifyContent={"center"}>
          <Button
            onClick={handleClickForm}
            fullWidth
            startIcon={<ControlPointIcon />}
            variant="outlined"
          >
            Agregar tarea
          </Button>
        </Box>
      )}

      <Box padding={1} display={"flex"} justifyContent={"flex-end"} >
        <Button
          onClick={handleClickAdd}
          endIcon={<SaveIcon />}
          variant="outlined"
          sx={{marginRight: 2}}
        >
          Guardar
        </Button>
        <Button
          onClick={handleClickCancel}
          endIcon={<SaveIcon />}
          variant="outlined"
        >
          Cancelar
        </Button>
      </Box>
    </>
  );
};
