import React, { useState, useEffect } from "react";
import axios from "axios";
import geditorConfig from "./geditor_config"; // Adjust the path to your geditorConfig file
import defaultContent from "./d_Content"; // Adjust the path to your default content

const Content = () => {
  const [isNewPage, setIsNewPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState("");
  const [cssContent, setCssContent] = useState("");

  const websiteId = localStorage.getItem("selectedWebsiteId"); // Website ID
  const pageId = window.location.pathname.split("/").pop(); // Page ID from URL

  useEffect(() => {
    const fetchPageData = async () => {
      console.log("Fetching page data from the backend...");
      console.log("Website ID:", websiteId);
      console.log("Page ID:", pageId);

      try {
        const response = await axios.post("http://localhost:8080/api/page/status", {
          websiteId,
          pageId,
        });

        console.log("Response from server:", response.data);

        if (response.data.status === "new") {
          console.log("Page status: new");
          setIsNewPage(true);
        } else if (response.data.status === "existing") {
          console.log("Page status: existing");
          console.log("HTML Content:", response.data.content.html);
          console.log("CSS Content:", response.data.content.css);

          setHtmlContent(response.data.content.html || "");
          setCssContent(response.data.content.css || "");
        } else {
          console.warn("Unexpected status received:", response.data.status);
        }
      } catch (error) {
        console.error("Error fetching page data:", error);
      } finally {
        console.log("Finished fetching page data");
        setLoading(false);
      }
    };

    fetchPageData();
  }, [websiteId, pageId]);

  useEffect(() => {
    if (!loading) {
      console.log("Initializing editor...");
      const content = isNewPage
        ? { components: defaultContent.components, style: defaultContent.style }
        : { components: htmlContent, style: cssContent };

      console.log("Editor Content:", content);

      // Make sure the editor gets initialized after loading content
      geditorConfig([], pageId, content); // Pass content to geditorConfig
    }
  }, [loading, isNewPage, htmlContent, cssContent, pageId]);

  if (loading) {
    console.log("Loading page...");
    return <div>Loading...</div>;
  }

  console.log("Rendering Content Component...");
  return (
    <div>
      {isNewPage ? (
        <div>This is a new page. Start adding your content!</div>
      ) : (
        <div>
          <style>{cssContent}</style>
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px" }}
          />
        </div>
      )}
      <div id="editor" style={{ border: "1px solid #ccc", height: "500px" }}></div>
    </div>
  );
};

export default Content;
