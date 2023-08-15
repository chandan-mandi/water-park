import React, { useRef } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';

const AddBlog = () => {
    const imageRef = useRef();
    const titleRef = useRef();
    const dateRef = useRef();
    const descriptionRef = useRef();
    const handleAddBlog = e => {
        const image = imageRef.current.value;
        const title = titleRef.current.value;
        const date = dateRef.current.value;
        const description = descriptionRef.current.value;
        const newBlog = { image, title, description, date };
        console.log(newBlog);
        fetch('http://localhost:5050/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBlog)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Adding blogs Successful');
                    e.target.reset();
                }
            })
        e.preventDefault();
    };
    return (
        <div className="text-center w-100">
            <Form onSubmit={handleAddBlog}>
                <h2 className="add-blog-title mb-4">Add Blogs</h2>
                <FloatingLabel className="mb-2" controlId="floatingPassword1" label="Image URL">
                    <Form.Control type="text" ref={imageRef} placeholder="Image URL" />
                </FloatingLabel>
                <FloatingLabel className="mb-2" controlId="floatingPassword2" label="Blog Title">
                    <Form.Control type="text" ref={titleRef} placeholder="Blog Title" />
                </FloatingLabel>
                <FloatingLabel className="mb-2" controlId="floatingPassword3" label="Date">
                    <Form.Control type="date" ref={dateRef} placeholder="Date" />
                </FloatingLabel>
                <FloatingLabel className="mb-2" controlId="floatingPassword4" label="Blog Description">
                    <Form.Control type="text" ref={descriptionRef} placeholder="Blog Description" />
                </FloatingLabel>
                <Button className="px-5 py-2" type="submit" variant="primary">Add Blog</Button>
            </Form>
            <Toaster />
        </div>
    );
};

export default AddBlog;