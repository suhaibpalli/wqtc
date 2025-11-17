// components/sections/ImageGallerySection.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

/**
 * Replaced image gallery -> YouTube video gallery.
 * - Fetches videos from /api/library (same endpoint used elsewhere in the app)
 * - Shows YouTube thumbnail using img.youtube.com/vi/<id>/hqdefault.jpg
 * - Clicking tile opens modal with lazy iframe
 *
 * Note: /api/library returns objects with `youTube_link`, `title`, `surah_name` etc.
 */

type VideoRecord = {
  id: number;
  title: string;
  youTube_link: string;
  surah_name?: string | null;
  starting_ayah?: number | null;
  ending_ayah?: number | null;
  created_date?: string;
};

export default function ImageGallerySection() {
  const [videos, setVideos] = useState<VideoRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<VideoRecord | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    setLoading(true);
    try {
      // Fetch latest 8 videos, same POST shape other parts of app use
      const res = await fetch("/api/library", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort: "DESC", limit: 8 }),
      });
      const data = await res.json();
      setVideos(data.result || []);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }

  // Extract YouTube ID from common URL forms
  const getYouTubeId = (url: string) => {
    if (!url) return "";
    const match =
      url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?/]+)/,
      ) || url.match(/youtube\.com\/shorts\/([^?]+)/);
    return match ? match[1] : "";
  };

  // thumbnail url helper (img.youtube.com is allowed in next.config)
  const getThumb = (ytId: string) =>
    ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "";

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#e0def4]">
              Recent Videos
            </h2>
            <button
              onClick={fetchVideos}
              className="text-sm text-[#e0def4] hover:text-[#cdabff] transition-colors"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-[#e0def4]/80">Loading videos…</div>
          ) : videos.length === 0 ? (
            <div className="text-center py-12 text-[#e0def4]/80">
              No videos found.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {videos.map((video, idx) => {
                const id = getYouTubeId(video.youTube_link || "");
                const thumb = getThumb(id);
                return (
                  <motion.button
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04 }}
                    whileHover={{ scale: 1.03, zIndex: 10 }}
                    onClick={() => setActiveVideo(video)}
                    className="relative aspect-square overflow-hidden rounded-2xl shadow-xl cursor-pointer border border-transparent hover:border-[#cdabff]/20 focus:outline-none"
                    aria-label={`Play ${video.title}`}
                  >
                    {thumb ? (
                      <Image
                        src={thumb}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#2b2130] text-[#e0def4] p-4 text-center">
                        <div>
                          <div className="font-semibold">{video.title}</div>
                          <div className="text-xs mt-1 text-[#e0def4]/70">
                            Thumbnail unavailable
                          </div>
                        </div>
                      </div>
                    )}

                    {/* overlay play icon + meta */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end">
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-[#e0def4]/90">
                            {video.surah_name ? video.surah_name : ""}
                            {video.starting_ayah ? ` • ${video.starting_ayah}${video.ending_ayah ? `-${video.ending_ayah}` : ''}` : ''}
                          </div>
                          <div className="px-2 py-1 bg-[#cdabff]/10 text-[#cdabff] rounded-md text-xs font-medium">
                            ▶ Play
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-[#e0def4] line-clamp-2">
                          {video.title}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setActiveVideo(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 max-w-4xl w-full mx-auto"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-6 -right-6 bg-[#453142] text-[#faf9f7] rounded-full p-2 shadow-lg z-20"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="bg-black rounded-2xl overflow-hidden aspect-video">
              {/* Lazy-load iframe; use start time if provided */}
              <VideoPlayerInline video={activeVideo} />
            </div>

            <div className="mt-4 bg-[#fff0] rounded-b-2xl p-4 text-[#e0def4]">
              <h3 className="font-semibold text-lg">{activeVideo.title}</h3>
              <div className="text-sm mt-1 text-[#e0def4]/80">
                {activeVideo.surah_name ? activeVideo.surah_name : ""}
                {activeVideo.starting_ayah ? ` • Ayah ${activeVideo.starting_ayah}${activeVideo.ending_ayah ? ` - ${activeVideo.ending_ayah}` : ''}` : ""}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

/**
 * Inline player component — extracts ID, appends start time if available.
 */
function VideoPlayerInline({ video }: { video: VideoRecord }) {
  const getYouTubeId = (url: string) => {
    if (!url) return "";
    const match =
      url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?/]+)/,
      ) || url.match(/youtube\.com\/shorts\/([^?]+)/);
    return match ? match[1] : "";
  };

  const id = getYouTubeId(video.youTube_link || "");
  // Try parse time_start_ayah or time_start strings like "1:23" -> seconds
  const parseStart = (t?: string | null) => {
    if (!t) return 0;
    const m = t.trim().match(/(\d+):(\d+)/);
    if (m) return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
    const secs = parseInt(t, 10);
    return isNaN(secs) ? 0 : secs;
  };
  const start = parseStart((video as any).time_start_ayah || (video as any).time_start || null);
  const src = id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0${start ? `&start=${start}` : ""}` : "";

  // If id missing, show fallback
  if (!id) {
    return (
      <div className="flex items-center justify-center h-full text-[#e0def4]">
        Video URL invalid
      </div>
    );
  }

  return (
    <iframe
      title={video.title}
      src={src}
      className="w-full h-full"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}
