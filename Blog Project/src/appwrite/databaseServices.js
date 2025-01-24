import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    database;
    storage;

    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("AppWrite Service :: CreatePost error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("AppWrite Service :: UpdatePost error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("AppWrite Service :: deletePost error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )      
        } catch (error) {
            console.log("AppWrite Service :: getPost error", error);
            return false;
        }
    }

    async getAllPosts(queries = [Query.equal("status","active")]) {
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
            
        } catch (error) {
            console.log("AppWrite Service :: getAllPosts error", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwriteStorageId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("AppWrite Service :: uploadFile error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.appwriteStorageId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("AppWrite Service :: deleteFile error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            config.appwriteStorageId,
            fileId
        )
    }
}

const service = new Service();

export default service