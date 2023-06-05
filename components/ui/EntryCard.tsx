import React, { FC, DragEvent, useContext } from "react";

import { Entry } from "@/interfaces";
import {
  CardActions,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { UiContext } from "@/context/ui";
import { useRouter } from "next/router";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const router = useRouter()
  const {startDragging, endDragging } = useContext(UiContext)
 
  const onDrawStart = (event: DragEvent) => {
    startDragging()
    event.dataTransfer.setData("text", entry._id as string);
  };

  const onDragEnd = () => endDragging()

  const onClick = () => {
    router.push(`/entries/${entry._id}`)
  }

  return (
    <Card onClick={onClick} sx={{ marginBottom: 1 }} draggable onDragStart={onDrawStart} onDragEnd={onDragEnd}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry?.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">Hace 30 min</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
