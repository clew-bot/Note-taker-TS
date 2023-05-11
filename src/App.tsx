import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NewNote } from "./NewNote";
import { useLocalStorage } from "./useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { NoteList } from "./NoteList";
import { NoteLayout } from "./NoteLayout";
import { Note } from "./Note";
import { EditNote } from "./EditNote";

export type RawNote = {
  id: string;
} & RawNoteData;

export type Note = {
  id: string
} & NoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  label: string
  id: string
}


function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  
  const onUpdateNote = (id: string, { tags, ...data}: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return {...note, ...data, tagIds: tags.map(tag => tag.id)}

        } else {
          return note
        }
      })
    })
  }

  const onAddTag = (tag: Tag) => {
    setTags(prevTags => [...prevTags, tag])
}
  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note, tags: tags.filter(tag => {
          return note.tagIds.includes(tag.id)
        })
      }
    })
  }, [notes, tags])


  const onCreateNote = (data: NoteData) => {
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id: uuidV4(), tagIds: data.tags.map(tag => tag.id)}]
    })
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList availableTags={tags} notes={notesWithTags}/>}></Route>
        <Route path="/new" element={<NewNote onAddTag={onAddTag} availableTags={tags} onSubmit={onCreateNote}/>}></Route>
        <Route path="/:id" element={<NoteLayout notes={notesWithTags}/>}>
          <Route index element={<Note/>} />
          <Route path="edit" element={<EditNote onAddTag={onAddTag} availableTags={tags} onSubmit={onUpdateNote}/>} />
        </Route>

        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
