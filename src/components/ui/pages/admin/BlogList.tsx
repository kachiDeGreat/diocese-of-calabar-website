import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase";
import toast, { Toaster } from "react-hot-toast";
import { PlusCircle, Edit2, Trash2, Image as ImageIcon } from "lucide-react";
import styles from "./BlogList.module.css";
import SEO from "../../page-components/SEO";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  createdAt: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogsData: BlogPost[] = [];
      querySnapshot.forEach((doc) => {
        blogsData.push({ id: doc.id, ...doc.data() } as BlogPost);
      });
      // Sort by creation date descending
      blogsData.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime(),
      );
      setBlogs(blogsData);
    } catch (error) {
      toast.error("Failed to fetch blogs.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteDoc(doc(db, "blogs", id));
        setBlogs(blogs.filter((b) => b.id !== id));
        toast.success("Blog deleted successfully");

        try {
          await fetch(
            "https://api.vercel.com/v1/integrations/deploy/prj_xk0yxZNWLStlhjpD2YqmQcMAUwXK/sE4TUBDOEM",
            { method: "POST" },
          );
          // console.log("Vercel deploy triggered successfully");
          toast.success("Site rebuild started!");
        } catch (err) {
          // console.error("Failed to trigger Vercel deploy", err);
          toast.error("Failed to start site rebuild.");
        }
      } catch (error) {
        toast.error("Failed to delete blog.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <SEO title="Manage Blogs | Admin" description="Manage blog posts" />
      <Toaster position="top-right" />

      <div className={styles.header}>
        <h1 className={styles.title}>Blog Posts</h1>
        <Link to="/admin/blog/create" className={styles.createBtn}>
          <PlusCircle size={20} />
          Create Post
        </Link>
      </div>

      {isLoading ? (
        <div className={styles.loadingState}>Loading blogs...</div>
      ) : blogs.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>There are no blog posts yet.</h3>
          <p>Click "Create Post" to publish your first blog.</p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Post</th>
                <th>Category</th>
                <th>Date Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <div className={styles.blogInfo}>
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className={styles.coverImage}
                        />
                      ) : (
                        <div
                          className={styles.coverImage}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ImageIcon size={20} color="#9ca3af" />
                        </div>
                      )}
                      <div className={styles.blogTitle}>
                        {blog.title || "Untitled"}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.categoryBadge}>
                      {blog.category || "Uncategorized"}
                    </span>
                  </td>
                  <td className={styles.dateText}>{blog.date}</td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        onClick={() => navigate(`/admin/blog/edit/${blog.id}`)}
                        className={styles.editBtn}
                        title="Edit Post"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id, blog.title)}
                        className={styles.deleteBtn}
                        title="Delete Post"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
