import { Form, Stack, Row, Col } from "react-bootstrap";
import CreateableReactSelect from "react-select/creatable";
import { Link } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";


type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [ selectedTags, setSelectedTags ] = useState<Tag[]>([])
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags
    }
    )
    navigate("..");
}


  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} type="text" placeholder="Enter title" required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreateableReactSelect 
              onCreateOption={label => {
                const newTag = { id: uuidV4(), label}
                onAddTag(newTag)
                setSelectedTags(prevTags => [...prevTags, newTag])
              }}
              value={selectedTags.map(tag => {
                return { label: tag.label, value: tag.id}
              })} 
              options={availableTags.map(tag => {
                return { label: tag.label, value: tag.id}
              }
                )}
              onChange={tags => {
                setSelectedTags(tags.map(tag => {
                    return { label: tag.label, id: tag.value}
                }))
              }}
              isMulti />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            ref={markdownRef}
            type="text"
            placeholder="Description"
            required
            as="textarea"
            rows={15}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <Link to="..">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
