import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/databaseServices"

function AllPost() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getAllPosts().then((post) => {
            setPosts(post.documents)
        })
    }, [])
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div> 
    )
}

export default AllPost
