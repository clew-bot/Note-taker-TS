import { Form, Stack, Row, Col } from "react-bootstrap";
import CreateableReactSelect from "react-select/creatable"

export function NoteForm() {
  return (
    <Form>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreateableReactSelect isMulti/>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
              <Form.Label>Body</Form.Label>
              <Form.Control type="text" placeholder="Description" required as="textarea" rows={15} />
            </Form.Group>
            <Stack direction="horizontal" gap={2}>
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
                <button type="button" className="btn btn-secondary">
                    Cancel
                </button>
                </Stack>
      </Stack>
    </Form>
  );
}
