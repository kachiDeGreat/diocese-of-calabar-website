import React, { useState, useRef, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import toast, { Toaster } from "react-hot-toast";
import styles from "./CreateBlogPost.module.css";
import { ArrowLeft, Eye, Send, Image as ImageIcon, X } from "lucide-react";

export default function CreateBlogPost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);

  const quillRef = useRef<ReactQuill>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const docRef = doc(db, "blogs", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setTitle(data.title || "");
            setCategory(data.category || "");
            setCoverImageUrl(data.image || "");
            setContent(data.content || "");
          }
        } catch (error) {
          toast.error("Failed to fetch blog data.");
        }
      };
      fetchBlog();
    }
  }, [id]);

  const uploadToCloudinary = async (file: File) => {
    if (file.size > 1.5 * 1024 * 1024) {
      throw new Error("File size exceeds 1.5MB limit.");
    }
    const cloudName = "dt2gk3gcn";
    const imageFormData = new FormData();
    imageFormData.append("file", file);
    imageFormData.append("upload_preset", "synod_preset");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: imageFormData,
      },
    );
    if (!response.ok) {
      throw new Error("Failed to upload image");
    }
    const data = await response.json();
    return data.secure_url;
  };

  // Custom Image Handler for React Quill
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

      if (file.size > 1.5 * 1024 * 1024) {
        toast.error("Image file size exceeds 1.5MB limit.");
        return;
      }

      const id = toast.loading("Uploading image...");
      try {
        const downloadURL = await uploadToCloudinary(file);

        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "image", downloadURL);
          quill.setSelection(range.index + 1, 0);
        }
        toast.success("Image uploaded", { id });
      } catch (error) {
        // console.error("Image upload failed:", error);
        toast.error("Failed to upload image", { id });
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 1.5 * 1024 * 1024) {
        toast.error("Cover image size exceeds 1.5MB limit.");
        // Clear the input
        e.target.value = "";
        return;
      }
      setCoverImageFile(file);
      // Create local preview URL
      const objectUrl = URL.createObjectURL(file);
      setCoverImageUrl(objectUrl);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !content) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!coverImageUrl && !coverImageFile) {
      toast.error("Please provide a cover image.");
      return;
    }

    setIsPublishing(true);
    const toastId = toast.loading("Publishing blog post...");

    try {
      let finalCoverUrl = coverImageUrl;

      // Upload cover image if it's a file
      if (coverImageFile) {
        finalCoverUrl = await uploadToCloudinary(coverImageFile);
      }

      const slug = generateSlug(title);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
        .format(new Date())
        .toUpperCase();

      const blogData = {
        title,
        category,
        image: finalCoverUrl,
        date: formattedDate,
        slug,
        content,
        updatedAt: new Date().toISOString(),
      };

      if (isEditMode && id) {
        await updateDoc(doc(db, "blogs", id), blogData);
        toast.success("Blog post updated successfully!", { id: toastId });
      } else {
        await addDoc(collection(db, "blogs"), {
          ...blogData,
          createdAt: new Date().toISOString(),
        });
        toast.success("Blog post published successfully!", { id: toastId });
      }

      try {
        await fetch(
          "https://api.vercel.com/v1/integrations/deploy/prj_xk0yxZNWLStlhjpD2YqmQcMAUwXK/sE4TUBDOEM",
          { method: "POST" },
        );
        // console.log("Vercel deploy triggered successfully");
        toast.success("Site rebuild started!", { id: "deploy" });
      } catch (err) {
        // console.error("Failed to trigger Vercel deploy", err);
        toast.error("Failed to start site rebuild.", { id: "deploy" });
      }

      setPublishedSlug(slug);
      setShowLinkModal(true);
      setIsPublishing(false);
    } catch (error) {
      console.error("Failed to publish:", error);
      toast.error("Failed to publish blog post.", { id: toastId });
      setIsPublishing(false);
    }
  };

  const copyLink = () => {
    if (publishedSlug) {
      navigator.clipboard.writeText(`https://blog.anglicandioceseofcalabar.org/news/${publishedSlug}`);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-right" />

      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back
        </button>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.previewBtn}
            onClick={() => setShowPreview(true)}
          >
            <Eye size={20} />
            <span>Preview</span>
          </button>
          <button
            type="submit"
            form="blogForm"
            className={styles.publishBtn}
            disabled={isPublishing}
          >
            <Send size={18} />
            {isPublishing
              ? "Saving..."
              : isEditMode
                ? "Update Post"
                : "Publish"}
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <form
          id="blogForm"
          onSubmit={handlePublish}
          className={styles.formSection}
        >
          <div className={styles.formGroup}>
            <label>Post Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter an engaging title..."
              className={styles.titleInput}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. News, Devotion, Events"
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Cover Image</label>
            <div className={styles.coverUploadArea}>
              {coverImageUrl ? (
                <div className={styles.coverPreviewContainer}>
                  <img
                    src={coverImageUrl}
                    alt="Cover preview"
                    className={styles.coverPreview}
                  />
                  <button
                    type="button"
                    className={styles.removeCoverBtn}
                    onClick={() => {
                      setCoverImageUrl("");
                      setCoverImageFile(null);
                    }}
                  >
                    <X size={16} /> Remove
                  </button>
                </div>
              ) : (
                <label className={styles.uploadLabel}>
                  <ImageIcon size={32} className={styles.uploadIcon} />
                  <span>Click to upload cover image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    className={styles.hiddenInput}
                  />
                </label>
              )}
            </div>
            <div className={styles.orDivider}>OR</div>
            <input
              type="url"
              value={coverImageFile ? "" : coverImageUrl}
              onChange={(e) => {
                setCoverImageFile(null);
                setCoverImageUrl(e.target.value);
              }}
              placeholder="Paste an image URL here..."
              className={styles.input}
              disabled={!!coverImageFile}
            />
          </div>

          <div className={styles.editorGroup}>
            <label>Post Content</label>
            <div className={styles.editorWrapper}>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                className={styles.quillEditor}
                placeholder="Write your amazing blog post here..."
              />
            </div>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Preview Mode</h2>
              <button
                onClick={() => setShowPreview(false)}
                className={styles.closeBtn}
              >
                <X size={24} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.previewContainer}>
                {coverImageUrl && (
                  <img
                    src={coverImageUrl}
                    alt="Cover"
                    className={styles.previewCover}
                  />
                )}
                <div className={styles.previewMeta}>
                  <span className={styles.previewCategory}>
                    {category || "Category"}
                  </span>
                  <span className={styles.previewDate}>
                    {new Intl.DateTimeFormat("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                      .format(new Date())
                      .toUpperCase()}
                  </span>
                </div>
                <h1 className={styles.previewTitle}>
                  {title || "Untitled Blog Post"}
                </h1>
                <div
                  className="quill-content"
                  dangerouslySetInnerHTML={{
                    __html: content || "<p>Nothing to preview yet.</p>",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Link Modal */}
      {showLinkModal && publishedSlug && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{ maxWidth: '500px' }}>
            <div className={styles.modalHeader}>
              <h2>Blog Published Successfully!</h2>
              <button
                onClick={() => setShowLinkModal(false)}
                className={styles.closeBtn}
              >
                <X size={24} />
              </button>
            </div>
            <div className={styles.modalBody} style={{ padding: '20px', textAlign: 'center' }}>
              <p style={{ marginBottom: '15px' }}>Your blog post is live. You can copy the link below:</p>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
                <input 
                  type="text" 
                  readOnly 
                  value={`https://blog.anglicandioceseofcalabar.org/news/${publishedSlug}`} 
                  className={styles.input} 
                  style={{ marginBottom: 0 }}
                />
                <button onClick={copyLink} className={styles.publishBtn} style={{ padding: '10px 15px', whiteSpace: 'nowrap' }}>
                  Copy Link
                </button>
              </div>
              <button 
                onClick={() => navigate("/admin/dashboard")} 
                className={styles.backBtn}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
