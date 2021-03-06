import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import NoteCard from "../components/NoteCard";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Masonry from "react-masonry-css";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const handleDelete = async (id) => {
    fetch("http://localhost:8000/notes/" + id, {
      method: "Delete",
    });

    const newNote = notes.filter((note) => note.id != id);
    setNotes(newNote);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }
  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
