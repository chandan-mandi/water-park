import React, { useEffect, useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Navigation/Navigation';
import NavTop from '../../Shared/NavTop/NavTop';

const FullBlog = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5050/blogs/${blogId}`)
            .then(res => res.json())
            .then(data => {
                setBlog(data)
            })
    }, [blogId]);
    return (
        <>
            <NavTop />
            <Navigation />
            <Container className="my-5">
                <Image fluid src={blog.image} />
                <h2 className="my-2">{blog.title}</h2>
                <h5 className="my-2">Publishing Date: <span className="text-info">{blog.date}</span></h5>
                <p className="text-secondary">{blog.description}</p>
            </Container>
            <Footer />
        </>
    );
};

export default FullBlog;