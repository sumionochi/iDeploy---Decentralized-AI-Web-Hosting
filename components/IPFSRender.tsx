import React, { useState, useEffect } from "react";

interface IPFSRenderProps {
  ipfsUrl: string;
}

const IPFSRender: React.FC<IPFSRenderProps> = ({
  ipfsUrl,
}) => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(ipfsUrl);
        const htmlContent = await response.text();
        setContent(htmlContent);
      } catch (error) {
        console.error("Error fetching IPFS content:", error);
        setContent("<p>Error loading content</p>");
      }
    };

    fetchContent();
  }, [ipfsUrl]);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default IPFSRender;