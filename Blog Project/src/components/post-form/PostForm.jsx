import React, {useCallback, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {Button, Input, RTE, Select} from '../index'
import appwriteService from '../../appwrite/databaseServices'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { use } from 'react'

function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            category: post?.category || "",
            featuredImage: post?.featuredImage || "",
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const onSubmit = async (data) => {
        if (post) {
            const fileUpload = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (fileUpload) {
                await appwriteService.deleteFile(post.featuredImage);
            }
            
            const updatedPost = await appwriteService.updatePost(post.$id, {
                ...data, featuredImage: fileUpload ? fileUpload.$id : undefined,
            });
            
            if (updatedPost) {
                navigate(`/post/${updatedPost.$id}`);    
            }
        }
        else {
            try {
                const fileUpload = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                const newPost = await appwriteService.createPost({
                    ...data, featuredImage: fileUpload ? fileUpload.$id : undefined, userId: userData.$id
                });

                if (newPost) {
                    navigate(`/post/${newPost.$id}`);
                }
            } catch (error) {  throw error; }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d]+/g, "-")
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm
