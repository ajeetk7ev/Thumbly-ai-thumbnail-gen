"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImageUrl("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setImageUrl(data.image);
    } catch (err) {
      console.error("Error generating thumbnail:", err);
    }
    setPrompt("");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-28 dark:bg-slate-900 text-slate-900 dark:text-slate-100 sm:mt-16 p-4 md:p-8">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">🔮 AI Thumbnail Magic</h1>
        <p className="mb-6 text-base md:text-lg text-slate-600 dark:text-slate-300">
          Turn your creative prompt into a professional thumbnail with the power of AI. Fast, smart, and uniquely yours.
        </p>

        <div className=" hidden sm:grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">⚡ Fast Results</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Your thumbnail is generated in seconds, so you can move fast.
            </p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">🎨 Unique Styles</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Every output is AI-crafted based on your prompt—no duplicates.
            </p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-2">🧠 Smart AI</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              We use advanced models to understand your intent and theme.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 mb-6 w-full">
          <Input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Gamer streaming with neon lights"
            className="flex-1 text-base px-4 py-3 rounded-xl w-full"
          />
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || loading}
            className="text-base px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-transform w-full sm:w-auto"
          >
            {loading ? "Generating..." : "Generate"}
          </Button>
        </div>

        <div className="text-sm text-slate-500 dark:text-slate-400 mb-10">
          ✨ Use powerful prompts like "Futuristic tech city background" or "Minimal workspace desk with coffee"
        </div>

        {imageUrl && (
          <Card className="mt-8 bg-slate-100 dark:bg-slate-800">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">🎉 Your AI-Generated Thumbnail</h2>
              <img
                src={imageUrl}
                alt="Generated thumbnail"
                className="mx-auto w-full max-w-xl rounded-xl shadow-md"
              />
              <div className="mt-4 w-full flex justify-center">
                <a href={imageUrl} download="thumbnail.png">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 transition"
                  >
                    <Download className="w-4 h-4" />
                    Download Thumbnail
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}
