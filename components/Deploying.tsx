'use client'

import React, { useState } from "react";
import IPFSRender from "./IPFSRender";
import { Button } from "@/components/ui/button";
import { Check, Copy, Code, Eye, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DeployingProps {
  deployedUrl: string;
}

export default function Deploying({ deployedUrl }: DeployingProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [showSourceCode, setShowSourceCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showIPFSContent, setShowIPFSContent] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(deployedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(deployedUrl);
      const text = await response.text();
      setContent(text);
    } catch (error) {
      console.error("Failed to fetch content:", error);
      setContent("Error fetching content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewPreview = async () => {
    if (!content) await fetchContent();
    setShowPreview(true);
    setShowSourceCode(false);
  };

  const handleViewSourceCode = async () => {
    if (!content) await fetchContent();
    setShowSourceCode(true);
    setShowPreview(false);
  };

  return (
    <Card className="w-full mt-10 mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Deployment Status</span>
          <Badge className="bg-teal-500">Deployed</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Your content has been deployed successfully!
          </p>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={handleCopyUrl}
          >
            {copied ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            {copied ? "Copied!" : "Copy URL"}
          </Button>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={handleViewPreview}
            variant={showPreview ? "default" : "outline"}
          >
            <Eye className="h-4 w-4 mr-2" /> View Preview
          </Button>
          <Button
            onClick={handleViewSourceCode}
            variant={showSourceCode ? "default" : "outline"}
          >
            <Code className="h-4 w-4 mr-2" /> View Source Code
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-semibold">IPFS URL:</span>
          <a
            href={deployedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center"
          >
            {deployedUrl}
            <ExternalLink className="h-4 w-4 ml-1" />
          </a>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowIPFSContent(!showIPFSContent)}
          >
            {showIPFSContent ? "Hide" : "Show"} IPFS Content
          </Button>
        </div>

        {showIPFSContent && (
          <Card>
            <CardHeader>
              <CardTitle>IPFS Content Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <IPFSRender ipfsUrl={deployedUrl} />
            </CardContent>
          </Card>
        )}

        {isLoading && (
          <div className="text-center">
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        )}

        {!isLoading && (showPreview || showSourceCode) && (
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {showPreview && (
                <div className="w-full aspect-video bg-background text-foreground p-4 overflow-auto">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              )}
              {showSourceCode && (
                <pre className="text-left p-4 overflow-auto h-[60vh] bg-muted">
                  <code>{content}</code>
                </pre>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Deployed URL:</h3>
            <p className="text-primary break-all">{deployedUrl}</p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

