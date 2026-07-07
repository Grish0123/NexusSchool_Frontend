import { useEffect, useRef, useState } from "react";
import { apiUrl, endpoints } from "../config/api";
import {
  admissionFaqs,
  careerItems,
  clubs,
  courses,
  defaultAdmissionRequirements,
  defaultAdmissionSteps,
  defaultAdmissionVideo,
  defaultContactCampuses,
  defaultHomeAdvantages,
  defaultHomeMoments,
  defaultPageHeroes,
  defaultTestimonials,
  galleryAlbums,
  heroSlides,
  leadership,
  media,
  notices,
  videoMedia
} from "../utils/content";
import { careerImages } from "../data/siteImages";
import styles from "./AdminPage.module.scss";

const tabs = ["Home", "About", "Admission", "Notices", "Courses", "Clubs", "Gallery", "Careers", "Contact"];

const schemas = {
  aboutHeroSlides: [["title", "Title"], ["copy", "Copy", "textarea"], ["image_url", "Image URL", "image"]],
  aboutJourneyImages: [["image_url", "Image URL", "image"]],
  admissionRequirements: [["text", "Requirement"]],
  admissionSteps: [["step_number", "Step"], ["title", "Title"], ["description", "Description", "textarea"], ["image_url", "Image URL", "image"]],
  clubs: [["name", "Name"], ["category", "Category"], ["description", "Description", "textarea"], ["image_url", "Image URL", "image"]],
  contactCampuses: [["name", "Name"], ["tagline", "Tagline"], ["address", "Address"], ["phone", "Phone"], ["email", "Email"], ["website", "Website"]],
  careerItems: [["title", "Title"], ["category", "Category"], ["description", "Description", "textarea"], ["image_url", "Image URL", "image"]],
  careerPhotos: [["image_url", "Image URL", "image"]],
  courses: [["title", "Title"], ["category", "Category"], ["description", "Description", "textarea"], ["image_url", "Image URL", "image"]],
  courseDetails: [
    ["key", "Detail key"],
    ["heroEyebrow", "Hero eyebrow"],
    ["heroTitle", "Hero title"],
    ["heroCopy", "Hero copy", "textarea"],
    ["heroImage", "Hero image", "image"],
    ["introEyebrow", "Intro eyebrow"],
    ["introTitle", "Intro title"],
    ["introCopy", "Intro copy", "textarea"],
    ["benefitOneTitle", "Benefit 1 title"],
    ["benefitOneImage", "Benefit 1 image", "image"],
    ["benefitOneItems", "Benefit 1 items, one per line", "textarea"],
    ["benefitTwoTitle", "Benefit 2 title"],
    ["benefitTwoImage", "Benefit 2 image", "image"],
    ["benefitTwoItems", "Benefit 2 items, one per line", "textarea"],
    ["bottomSectionEyebrow", "Bottom section eyebrow"],
    ["bottomSectionTitle", "Bottom section title"],
    ["bottomSectionImage", "Bottom section image", "image"],
    ["bottomSectionItems", "Bottom section items, one per line", "textarea"],
    ["extraSectionOneEyebrow", "Extra section 1 eyebrow"],
    ["extraSectionOneTitle", "Extra section 1 title"],
    ["extraSectionOneImage", "Extra section 1 image", "image"],
    ["extraSectionOneItems", "Extra section 1 items, one per line", "textarea"],
    ["extraSectionTwoEyebrow", "Extra section 2 eyebrow"],
    ["extraSectionTwoTitle", "Extra section 2 title"],
    ["extraSectionTwoImage", "Extra section 2 image", "image"],
    ["extraSectionTwoItems", "Extra section 2 items, one per line", "textarea"],
    ["finalEyebrow", "Final eyebrow"],
    ["finalTitle", "Final title"],
    ["finalCopy", "Final copy", "textarea"]
  ],
  faqs: [["question", "Question"], ["answer", "Answer", "textarea"]],
  galleryAlbums: [["title", "Title"], ["image", "Cover image", "image"], ["images", "Images, one per line", "textarea"]],
  homeAdvantages: [["title", "Title"], ["copy", "Copy", "textarea"], ["image_url", "Image URL", "image"]],
  homeHeroSlides: [["title", "Title"], ["subtitle", "Subtitle", "textarea"], ["image_url", "Image URL", "image"]],
  homeMoments: [["title", "Title"], ["subtitle", "Subtitle"], ["image_url", "Image URL", "image"]],
  homeStats: [["number", "Number"], ["label", "Label"]],
  leadership: [["title", "Role title"], ["author", "Name"], ["message", "Message", "textarea"], ["image_url", "Image URL", "image"]],
  notices: [["date", "Date"], ["title", "Title"], ["content", "Content", "textarea"], ["attachments", "Image URL", "image"]],
  pageHeroes: [["title", "Title"], ["eyebrow", "Eyebrow"], ["copy", "Copy", "textarea"], ["image_url", "Image URL", "image"]],
  socialLinks: [["platform_name", "Platform"], ["url", "URL"]],
  testimonials: [["title", "Title"], ["quote", "Quote", "textarea"], ["image_url", "Image URL", "image"]]
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function linesToText(value = []) {
  return Array.isArray(value) ? value.join("\n") : String(value || "");
}

function textToLines(value = "") {
  return linesToText(value)
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function uploadCmsImage(file) {
  const body = new FormData();
  body.append("file", file);
  const response = await fetch(apiUrl(endpoints.cmsUpload), {
    body,
    credentials: "include",
    method: "POST"
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Upload failed");
  return result.url;
}

function createCms(data) {
  const cms = data.cms || {};
  const pageHeroes = Object.entries({ ...defaultPageHeroes, ...(cms.pageHeroes || {}) }).map(([key, value]) => ({ key, ...value }));

  return {
    aboutHeroSlides: cms.aboutHeroSlides?.length ? clone(cms.aboutHeroSlides) : [
      { ...defaultPageHeroes.about, image_url: "/About%20page/a1.jpeg" },
      { copy: "Students grow through discipline, confidence, achievement, and meaningful school experiences.", image_url: "/About%20page/a2.jpeg", title: "A learning culture built with care." },
      { copy: "Nexus brings families, teachers, and students together around strong values and bright futures.", image_url: "/About%20page/award-stage.webp", title: "Every learner has a story here." }
    ],
    aboutJourneyImages: cms.aboutJourneyImages?.length ? clone(cms.aboutJourneyImages) : [
      { image_url: "/About%20page/Our%20Journey/j1.jpeg" },
      { image_url: "/About%20page/Our%20Journey/j2.jpeg" },
      { image_url: "/About%20page/Our%20Journey/j3.jpeg" }
    ],
    admissionRequirements: cms.admissionRequirements?.length ? clone(cms.admissionRequirements) : defaultAdmissionRequirements.map((text) => ({ text })),
    admissionSteps: cms.admissionSteps?.length ? clone(cms.admissionSteps) : clone(defaultAdmissionSteps),
    admissionVideo: videoMedia(cms.admissionVideo || data.admission?.heroVideo || defaultAdmissionVideo),
    careerItems: cms.careerItems?.length ? clone(cms.careerItems) : careerItems(data).map((item) => ({ ...item })),
    careerPhotos: cms.careerPhotos?.length ? clone(cms.careerPhotos) : careerImages.map((image_url) => ({ image_url })),
    clubs: cms.clubs?.length ? clone(cms.clubs) : clubs(data).map((item) => ({ ...item })),
    contactCampuses: cms.contactCampuses?.length ? clone(cms.contactCampuses) : clone(data.contactCampuses?.length ? data.contactCampuses : defaultContactCampuses),
    courses: cms.courses?.length ? clone(cms.courses) : courses(data).map((item) => ({ ...item })),
    courseDetails: cms.courseDetails?.length ? clone(cms.courseDetails) : [],
    faqs: cms.faqs?.length ? clone(cms.faqs) : admissionFaqs(data).map((item) => ({ ...item })),
    galleryAlbums: cms.galleryAlbums?.length ? clone(cms.galleryAlbums) : galleryAlbums(data).map((album) => ({ ...album, images: linesToText(album.images) })),
    homeAbout: cms.homeAbout || data.home?.about_section || {},
    homeAdvantages: cms.homeAdvantages?.length ? clone(cms.homeAdvantages) : clone(defaultHomeAdvantages),
    homeHeroSlides: cms.homeHeroSlides?.length ? clone(cms.homeHeroSlides) : heroSlides(data).map((item) => ({ ...item })),
    homeMoments: cms.homeMoments?.length ? clone(cms.homeMoments) : clone(defaultHomeMoments),
    homeStats: cms.homeStats?.length ? clone(cms.homeStats) : (data.home?.stats || [
      { label: "Years of Excellence", number: "20+" },
      { label: "Students Nurtured", number: "2500+" },
      { label: "Expert Educators", number: "50+" },
      { label: "Awards & Achievements", number: "30+" }
    ]),
    identity: {
      address: data.config?.address || "",
      email: data.config?.contact_email || "",
      phone: data.config?.contact_phone?.[0] || "",
      schoolName: data.config?.school_name || "",
      tagline: data.config?.tagline || "",
      ...(cms.identity || {})
    },
    leadership: cms.leadership?.length ? clone(cms.leadership) : leadership(data).map((item) => ({ ...item })),
    mapEmbedUrl: cms.mapEmbedUrl || data.mapEmbedUrl || "",
    notices: cms.notices?.length ? clone(cms.notices) : notices(data).map((item) => ({ ...item })),
    pageHeroes,
    socialLinks: cms.socialLinks?.length ? clone(cms.socialLinks) : (data.social || []).map((item) => ({ ...item })),
    testimonials: cms.testimonials?.length ? clone(cms.testimonials) : clone(defaultTestimonials)
  };
}

function emptyItem(type, fields) {
  if (type === "notices") return { date: new Date().toISOString().slice(0, 10), title: "", content: "", attachments: "" };
  if (type === "admissionSteps") return { step_number: "", title: "", description: "", image_url: "" };
  return Object.fromEntries(fields.map(([key]) => [key, ""]));
}

function courseKeyFromTitle(title = "") {
  if (/montessori/i.test(title) && /\bipc\b/i.test(title)) return "montessori-ipc";
  if (/\bncc\b/i.test(title) || /digi/i.test(title)) return "ncc-digi-school";
  if (/cambridge/i.test(title)) return "cambridge-assessment-english";
  return "";
}

function Field({ field, item, onChange }) {
  const [key, label, type] = field;
  const value = item[key] || "";
  const [uploading, setUploading] = useState(false);

  async function uploadImage(file) {
    if (!file) return;
    setUploading(true);
    try {
      onChange(key, await uploadCmsImage(file));
    } catch (error) {
      window.alert(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <label className={type === "textarea" ? styles.wideField : ""}>
      <span>{label}</span>
      {type === "textarea" ? (
        <textarea value={value} onChange={(event) => onChange(key, event.target.value)} />
      ) : (
        <input value={value} onChange={(event) => onChange(key, event.target.value)} />
      )}
      {type === "image" && (
        <div className={styles.imageTools}>
          <input accept="image/*" className={styles.fileInput} type="file" onChange={(event) => uploadImage(event.target.files?.[0])} />
          {uploading && <small>Uploading...</small>}
          {value && <img className={styles.imagePreview} src={media(value)} alt="" />}
        </div>
      )}
    </label>
  );
}

function GalleryManager({ cms, onDirty, setCms }) {
  const [activeAlbum, setActiveAlbum] = useState(0);
  const [activeImage, setActiveImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const albums = cms.galleryAlbums || [];
  const album = albums[activeAlbum] || albums[0] || {};
  const images = textToLines(album.images || album.image);
  const collage = [images[0] || album.image, ...images.slice(1, 8)].filter(Boolean);

  function updateAlbum(index, patch) {
    onDirty("galleryAlbums");
    setCms((current) => ({
      ...current,
      galleryAlbums: current.galleryAlbums.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item)
    }));
  }

  function updateImages(nextImages, closeModal = true) {
    const cleanImages = nextImages.filter(Boolean);
    updateAlbum(activeAlbum, {
      image: cleanImages[0] || "",
      images: cleanImages.join("\n")
    });
    if (closeModal) setActiveImage(null);
  }

  async function replaceImage(file) {
    if (!file || activeImage === null) return;
    setUploading(true);
    try {
      const url = await uploadCmsImage(file);
      const nextImages = [...images];
      nextImages[activeImage] = url;
      updateImages(nextImages);
    } catch (error) {
      window.alert(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function addImage(file) {
    if (!file) return;
    setUploading(true);
    try {
      updateImages([...images, await uploadCmsImage(file)]);
    } catch (error) {
      window.alert(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function removeImage() {
    if (activeImage === null) return;
    if (!window.confirm("Remove this image from the gallery album?")) return;
    updateImages(images.filter((_, index) => index !== activeImage));
  }

  return (
    <>
      <section className={styles.panel}>
        <div className={styles.panelHead}>
          <div>
            <span>Visual manager</span>
            <h3>Gallery preview</h3>
          </div>
          <label className={styles.addImageButton}>
            Add image
            <input accept="image/*" type="file" onChange={(event) => addImage(event.target.files?.[0])} />
          </label>
        </div>

        <div className={styles.galleryAlbumTabs}>
          {albums.map((item, index) => (
            <button className={index === activeAlbum ? styles.galleryAlbumActive : ""} key={`${item.title}-${index}`} onClick={() => setActiveAlbum(index)} type="button">
              {item.title || `Album ${index + 1}`}
            </button>
          ))}
        </div>

        <div className={styles.galleryAdminFields}>
          <label>
            <span>Album title</span>
            <input value={album.title || ""} onChange={(event) => updateAlbum(activeAlbum, { title: event.target.value })} />
          </label>
          <label>
            <span>Cover image</span>
            <input value={album.image || ""} onChange={(event) => updateAlbum(activeAlbum, { image: event.target.value })} />
          </label>
        </div>

        <div className={styles.galleryCmsStage}>
          {collage[0] && (
            <button className={styles.galleryCmsMain} onClick={() => setActiveImage(0)} type="button">
              <img src={media(collage[0])} alt={album.title || "Gallery image"} />
            </button>
          )}
          {collage.slice(1).map((image, index) => (
            <button className={`${styles.galleryCmsSide} ${styles[`galleryCmsSide${index + 1}`]}`} key={`${image}-${index}`} onClick={() => setActiveImage(index + 1)} type="button">
              <img src={media(image)} alt="" />
            </button>
          ))}
        </div>
        {uploading && <p className={styles.status}>Uploading image...</p>}
      </section>

      {activeImage !== null && images[activeImage] && (
        <div className={styles.galleryModal} role="dialog" aria-modal="true" onClick={() => setActiveImage(null)}>
          <div className={styles.galleryModalCard} onClick={(event) => event.stopPropagation()}>
            <button className={styles.modalCloseButton} type="button" onClick={() => setActiveImage(null)} aria-label="Close popup">
              ×
            </button>
            <img src={media(images[activeImage])} alt="Selected gallery item" />
            <label>
              <span>Image path</span>
              <input value={images[activeImage]} onChange={(event) => {
                const nextImages = [...images];
                nextImages[activeImage] = event.target.value;
                updateImages(nextImages, false);
              }} />
            </label>
            <div className={styles.galleryModalActions}>
              <a href={media(images[activeImage])} target="_blank" rel="noreferrer">Open</a>
              <label>
                Change
                <input accept="image/*" type="file" onChange={(event) => replaceImage(event.target.files?.[0])} />
              </label>
              <button className={styles.removeButton} type="button" onClick={removeImage}>Remove</button>
              <button type="button" onClick={() => setActiveImage(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <EditorList cms={cms} fields={schemas.galleryAlbums} onDirty={onDirty} setCms={setCms} title="Gallery albums" type="galleryAlbums" />
    </>
  );
}

const careerPhotoPositions = [
  ["0", "clamp(96px, 12vw, 150px)", "clamp(72px, 7vw, 118px)", "clamp(88px, 9vw, 144px)"],
  ["10%", "clamp(52px, 6vw, 78px)", "clamp(72px, 7vw, 118px)", "clamp(88px, 9vw, 144px)"],
  ["20%", "clamp(112px, 13vw, 162px)", "clamp(82px, 8vw, 132px)", "clamp(88px, 9vw, 144px)"],
  ["32%", "clamp(58px, 7vw, 88px)", "clamp(72px, 7vw, 118px)", "clamp(88px, 9vw, 144px)"],
  ["43%", "clamp(92px, 10vw, 132px)", "clamp(72px, 7vw, 118px)", "clamp(88px, 9vw, 144px)"],
  ["calc(68% - clamp(72px, 7vw, 118px))", "clamp(52px, 6vw, 78px)", "clamp(72px, 7vw, 118px)", "clamp(88px, 9vw, 144px)"],
  ["calc(79% - clamp(72px, 7vw, 118px))", "clamp(112px, 13vw, 162px)", "clamp(72px, 7vw, 118px)", "clamp(88px, 9vw, 144px)"],
  ["calc(90% - clamp(72px, 7vw, 118px))", "clamp(52px, 6vw, 78px)", "clamp(72px, 7vw, 118px)", "clamp(88px, 9vw, 144px)"],
  ["calc(100% - clamp(72px, 7vw, 118px))", "clamp(112px, 13vw, 164px)", "clamp(72px, 7vw, 118px)", "clamp(88px, 9vw, 144px)"],
  ["calc(92% - clamp(72px, 7vw, 118px))", "clamp(196px, 20vw, 254px)", "clamp(72px, 7vw, 118px)", "clamp(88px, 9vw, 144px)"]
];

function CareersManager({ cms, onDirty, setCms }) {
  const [activePhoto, setActivePhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const photos = cms.careerPhotos || [];
  const activeImage = activePhoto !== null ? photos[activePhoto]?.image_url : "";

  function updatePhoto(index, value, closeModal = false) {
    onDirty("careerPhotos");
    setCms((current) => ({
      ...current,
      careerPhotos: current.careerPhotos.map((item, itemIndex) => itemIndex === index ? { ...item, image_url: value } : item)
    }));
    if (closeModal) setActivePhoto(null);
  }

  async function replacePhoto(file) {
    if (!file || activePhoto === null) return;
    setUploading(true);
    try {
      updatePhoto(activePhoto, await uploadCmsImage(file), true);
    } catch (error) {
      window.alert(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function addPhoto(file) {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadCmsImage(file);
      onDirty("careerPhotos");
      setCms((current) => ({ ...current, careerPhotos: [...current.careerPhotos, { image_url: url }] }));
    } catch (error) {
      window.alert(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function removePhoto() {
    if (activePhoto === null) return;
    if (!window.confirm("Remove this career photo?")) return;
    onDirty("careerPhotos");
    setCms((current) => ({
      ...current,
      careerPhotos: current.careerPhotos.filter((_, index) => index !== activePhoto)
    }));
    setActivePhoto(null);
  }

  return (
    <>
      <section className={styles.panel}>
        <div className={styles.panelHead}>
          <div>
            <span>{photos.length} photos</span>
            <h3>Career photo collage</h3>
          </div>
          <label className={styles.addImageButton}>
            Add photo
            <input accept="image/*" type="file" onChange={(event) => addPhoto(event.target.files?.[0])} />
          </label>
        </div>
        <div className={styles.careerCmsStage}>
          <div className={styles.careerCmsText}>
            <span>Careers</span>
            <h3>Work with people who shape futures</h3>
          </div>
          {photos.map((photo, index) => {
            const [left, top, width, height] = careerPhotoPositions[index % careerPhotoPositions.length];
            return (
              <button
                className={styles.careerPhotoButton}
                key={`${photo.image_url}-${index}`}
                onClick={() => setActivePhoto(index)}
                style={{ "--career-left": left, "--career-top": top, "--career-width": width, "--career-height": height }}
                type="button"
              >
                <img src={media(photo.image_url)} alt={`Career photo ${index + 1}`} />
              </button>
            );
          })}
        </div>
        {uploading && <p className={styles.status}>Uploading photo...</p>}
      </section>

      <EditorList cms={cms} fields={schemas.careerItems} onDirty={onDirty} setCms={setCms} title="Career cards" type="careerItems" />

      {activePhoto !== null && activeImage && (
        <div className={styles.galleryModal} role="dialog" aria-modal="true" onClick={() => setActivePhoto(null)}>
          <div className={styles.galleryModalCard} onClick={(event) => event.stopPropagation()}>
            <button className={styles.modalCloseButton} type="button" onClick={() => setActivePhoto(null)} aria-label="Close popup">
              ×
            </button>
            <img src={media(activeImage)} alt="Selected career item" />
            <label>
              <span>Image path</span>
              <input value={activeImage} onChange={(event) => updatePhoto(activePhoto, event.target.value)} />
            </label>
            <div className={styles.galleryModalActions}>
              <a href={media(activeImage)} target="_blank" rel="noreferrer">Open</a>
              <label>
                Change
                <input accept="image/*" type="file" onChange={(event) => replacePhoto(event.target.files?.[0])} />
              </label>
              <button className={styles.removeButton} type="button" onClick={removePhoto}>Remove</button>
              <button type="button" onClick={() => setActivePhoto(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CourseManager({ cms, onDirty, setCms }) {
  const [activeDetailKey, setActiveDetailKey] = useState("");
  const coursesList = cms.courses || [];
  const activeCourse = coursesList.find((course) => courseKeyFromTitle(course.title) === activeDetailKey) || {};
  const detailIndex = (cms.courseDetails || []).findIndex((detail) => detail.key === activeDetailKey);
  const activeDetail = detailIndex >= 0 ? cms.courseDetails[detailIndex] : null;

  function updateCourse(index, key, value) {
    onDirty("courses");
    setCms((current) => ({
      ...current,
      courses: current.courses.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item)
    }));
  }

  function updateDetail(key, value) {
    if (!activeDetail) return;
    onDirty("courseDetails");
    setCms((current) => ({
      ...current,
      courseDetails: current.courseDetails.map((item, itemIndex) => itemIndex === detailIndex ? { ...item, [key]: value } : item)
    }));
  }

  return (
    <>
      <section className={styles.panel}>
        <div className={styles.panelHead}>
          <div>
            <span>{coursesList.length} courses</span>
            <h3>Courses</h3>
          </div>
          <button type="button" onClick={() => {
            onDirty("courses");
            setCms((current) => ({ ...current, courses: [...current.courses, emptyItem("courses", schemas.courses)] }));
          }}>Add course</button>
        </div>
        <div className={styles.courseCmsGrid}>
          {coursesList.map((course, index) => {
            const detailKey = courseKeyFromTitle(course.title);
            return (
              <article className={styles.courseCmsCard} key={`${course.title}-${index}`}>
                <img src={media(course.image_url || course.image)} alt={course.title} />
                <div className={styles.courseCmsBody}>
                  <label><span>Category</span><input value={course.category || ""} onChange={(event) => updateCourse(index, "category", event.target.value)} /></label>
                  <label><span>Title</span><input value={course.title || ""} onChange={(event) => updateCourse(index, "title", event.target.value)} /></label>
                  <label><span>Description</span><textarea value={course.description || ""} onChange={(event) => updateCourse(index, "description", event.target.value)} /></label>
                  <Field field={["image_url", "Image", "image"]} item={course} onChange={(key, value) => updateCourse(index, key, value)} />
                  <div className={styles.courseCmsActions}>
                    {detailKey && <button type="button" onClick={() => setActiveDetailKey(detailKey)}>View Details</button>}
                    <button className={styles.removeButton} type="button" onClick={() => {
                      if (!window.confirm(`Remove ${course.title || "this course"}?`)) return;
                      onDirty("courses");
                      setCms((current) => ({ ...current, courses: current.courses.filter((_, itemIndex) => itemIndex !== index) }));
                    }}>Remove</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {activeDetailKey && activeDetail && (
        <div className={styles.galleryModal} role="dialog" aria-modal="true" onClick={() => setActiveDetailKey("")}>
          <div className={`${styles.galleryModalCard} ${styles.courseDetailModal}`} onClick={(event) => event.stopPropagation()}>
            <button className={styles.modalCloseButton} type="button" onClick={() => setActiveDetailKey("")} aria-label="Close popup">
              ×
            </button>
            <div className={styles.panelHead}>
              <div>
                <span>View Details</span>
                <h3>{activeCourse.title || activeDetail.heroEyebrow}</h3>
              </div>
              <button type="button" onClick={() => setActiveDetailKey("")}>Close</button>
            </div>
            <div className={styles.courseDetailGrid}>
              {schemas.courseDetails.filter(([key]) => key !== "key").map((field) => (
                <Field field={field} item={activeDetail} key={field[0]} onChange={updateDetail} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function EditorList({ cms, fields, onDirty = () => {}, setCms, title, type }) {
  const items = cms[type] || [];
  const updateItem = (index, key, value) => {
    onDirty(type);
    setCms((current) => ({
      ...current,
      [type]: current[type].map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item)
    }));
  };

  return (
    <section className={styles.panel}>
      <div className={styles.panelHead}>
        <div>
          <span>{items.length} items</span>
          <h3>{title}</h3>
        </div>
        <button type="button" onClick={() => {
          onDirty(type);
          setCms((current) => ({ ...current, [type]: [...current[type], emptyItem(type, fields)] }));
        }}>Add</button>
      </div>
      <div className={styles.list}>
        {items.map((item, index) => (
          <article className={styles.editorRow} key={`${type}-${index}`}>
            <div className={styles.rowNumber}>{String(index + 1).padStart(2, "0")}</div>
            <div className={styles.fieldGrid}>
              {fields.map((field) => (
                <Field field={field} item={item} key={field[0]} onChange={(key, value) => updateItem(index, key, value)} />
              ))}
            </div>
            <button className={styles.removeButton} type="button" onClick={() => {
              if (!window.confirm(`Remove ${title} ${index + 1}? This cannot be undone until you reload without saving.`)) return;
              onDirty(type);
              setCms((current) => ({ ...current, [type]: current[type].filter((_, itemIndex) => itemIndex !== index) }));
            }}>Remove</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AdminPage({ data }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const workspaceRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [login, setLogin] = useState({ password: "", username: "admin" });
  const [cms, setCms] = useState(() => createCms(data));
  const [dirty, setDirty] = useState(() => new Set());

  const markDirty = (key) => {
    setDirty((current) => {
      const next = new Set(current);
      next.add(key);
      return next;
    });
  };

  useEffect(() => {
    fetch(apiUrl(endpoints.cmsSession), { credentials: "include" })
      .then((response) => response.json())
      .then((session) => setAuthenticated(Boolean(session.authenticated)))
      .catch(() => setAuthenticated(false));
  }, []);

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
    workspaceRef.current?.scrollTo?.({ left: 0, top: 0 });
  }, [activeTab]);

  async function submitLogin(event) {
    event.preventDefault();
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setStatus("Checking login...");
    try {
      const response = await fetch(apiUrl(endpoints.cmsLogin), {
        body: JSON.stringify(login),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        method: "POST"
      });
      if (!response.ok) {
        if (response.status >= 500) {
          setStatus("Login failed. Start the backend server on port 3000, then try again.");
          return;
        }
        setStatus("Login failed. Check username and password.");
        return;
      }
      setAuthenticated(true);
      setStatus("");
    } catch {
      setStatus("Login failed. Start the backend server, then try again.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function saveCms(event) {
    event.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    setStatus("Saving...");
    const payload = { ...(data.cms || {}) };
    dirty.forEach((key) => {
      if (key === "galleryAlbums") {
        payload.galleryAlbums = cms.galleryAlbums.map((album) => ({ ...album, images: linesToText(album.images) }));
        return;
      }
      if (key === "pageHeroes") {
        payload.pageHeroes = Object.fromEntries(cms.pageHeroes.map(({ key: heroKey, ...item }) => [heroKey, item]));
        return;
      }
      if (key === "admissionVideo") {
        payload.admissionVideo = videoMedia(cms.admissionVideo);
        return;
      }
      payload[key] = cms[key];
    });
    try {
      const response = await fetch(apiUrl(endpoints.cms), {
        body: JSON.stringify(payload),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        method: "POST"
      });

      if (response.ok) {
        setDirty(new Set());
        setStatus("Saved successfully. Refresh the site to see changes.");
      } else {
        setStatus("Save failed.");
      }
    } catch {
      setStatus("Save failed.");
    } finally {
      setIsSaving(false);
    }
  }

  if (!authenticated) {
    return (
      <main className={styles.loginShell}>
        <form className={styles.loginCard} onSubmit={submitLogin}>
          <span>Website CMS</span>
          <h1>Nexus Admin</h1>
          <label><span>Username</span><input value={login.username} onChange={(event) => setLogin({ ...login, username: event.target.value })} /></label>
          <label><span>Password</span><input type="password" value={login.password} onChange={(event) => setLogin({ ...login, password: event.target.value })} /></label>
          <button disabled={isLoggingIn}>{isLoggingIn ? "Logging in..." : "Login"}</button>
          {status && <p className={styles.status}>{status}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className={styles.adminShell}>
      <aside className={styles.sidebar}>
        <h1>Nexus CMS</h1>
        <nav>
          {tabs.map((tab) => <button className={activeTab === tab ? styles.active : ""} key={tab} onClick={() => setActiveTab(tab)} type="button">{tab}</button>)}
        </nav>
        <a href="/" data-link>View Site</a>
      </aside>
      <form className={styles.workspace} onSubmit={(event) => event.preventDefault()} ref={workspaceRef}>
        <header className={styles.topbar}>
          <div>
            <span>Editing</span>
            <h2>{activeTab}</h2>
          </div>
          <div className={styles.saveArea}>
            {status && <p className={`${styles.topStatus} ${status.includes("failed") ? styles.topStatusError : ""}`}>{status}</p>}
            <button className={isSaving ? styles.savingButton : ""} disabled={isSaving} onClick={saveCms} type="button">
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </header>

        {activeTab === "Home" && (
          <>
            <EditorList cms={cms} fields={schemas.homeHeroSlides} onDirty={markDirty} setCms={setCms} title="Hero slides" type="homeHeroSlides" />
            <EditorList cms={cms} fields={schemas.homeStats} onDirty={markDirty} setCms={setCms} title="Stats" type="homeStats" />
            <EditorList cms={cms} fields={schemas.homeMoments} onDirty={markDirty} setCms={setCms} title="Nexus moments" type="homeMoments" />
            <EditorList cms={cms} fields={schemas.homeAdvantages} onDirty={markDirty} setCms={setCms} title="Advantages" type="homeAdvantages" />
            <EditorList cms={cms} fields={schemas.testimonials} onDirty={markDirty} setCms={setCms} title="Testimonials" type="testimonials" />
          </>
        )}

        {activeTab === "About" && (
          <>
            <EditorList cms={cms} fields={schemas.aboutHeroSlides} onDirty={markDirty} setCms={setCms} title="About hero slides" type="aboutHeroSlides" />
            <EditorList cms={cms} fields={schemas.aboutJourneyImages} onDirty={markDirty} setCms={setCms} title="Journey images" type="aboutJourneyImages" />
            <EditorList cms={cms} fields={schemas.leadership} onDirty={markDirty} setCms={setCms} title="Leadership messages" type="leadership" />
          </>
        )}
        {activeTab === "Admission" && (
          <>
            <section className={styles.panel}>
              <div className={styles.panelHead}><div><span>Video</span><h3>Admission hero video</h3></div></div>
              <label><span>Video URL</span><input value={cms.admissionVideo} onChange={(event) => {
                markDirty("admissionVideo");
                setCms((current) => ({ ...current, admissionVideo: event.target.value }));
              }} /></label>
            </section>
            <EditorList cms={cms} fields={schemas.admissionSteps} onDirty={markDirty} setCms={setCms} title="Admission process" type="admissionSteps" />
            <EditorList cms={cms} fields={schemas.admissionRequirements} onDirty={markDirty} setCms={setCms} title="Requirements" type="admissionRequirements" />
            <EditorList cms={cms} fields={schemas.faqs} onDirty={markDirty} setCms={setCms} title="FAQs" type="faqs" />
          </>
        )}
        {activeTab === "Notices" && <EditorList cms={cms} fields={schemas.notices} onDirty={markDirty} setCms={setCms} title="Notices" type="notices" />}
        {activeTab === "Courses" && <CourseManager cms={cms} onDirty={markDirty} setCms={setCms} />}
        {activeTab === "Clubs" && <EditorList cms={cms} fields={schemas.clubs} onDirty={markDirty} setCms={setCms} title="Clubs" type="clubs" />}
        {activeTab === "Gallery" && <GalleryManager cms={cms} onDirty={markDirty} setCms={setCms} />}
        {activeTab === "Careers" && <CareersManager cms={cms} onDirty={markDirty} setCms={setCms} />}
        {activeTab === "Contact" && (
          <>
            <section className={styles.panel}>
              <div className={styles.panelHead}><div><span>Map</span><h3>Google map embed</h3></div></div>
              <label><span>Map embed URL</span><input value={cms.mapEmbedUrl} onChange={(event) => {
                markDirty("mapEmbedUrl");
                setCms((current) => ({ ...current, mapEmbedUrl: event.target.value }));
              }} /></label>
            </section>
            <EditorList cms={cms} fields={schemas.contactCampuses} onDirty={markDirty} setCms={setCms} title="Campuses" type="contactCampuses" />
            <EditorList cms={cms} fields={schemas.socialLinks} onDirty={markDirty} setCms={setCms} title="Social links" type="socialLinks" />
          </>
        )}

        {status && <p className={styles.status}>{status}</p>}
      </form>
    </main>
  );
}
