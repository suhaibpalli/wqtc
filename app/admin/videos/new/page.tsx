'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import type { Surah } from '@/types/video';

export default function NewVideoPage() {
  const router = useRouter();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    surah_no: '',
    surah_name: '',
    starting_ayah: '',
    ending_ayah: '',
    time_start_ayah: '',
    youTube_link: '',
    keywords: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSurahs();
  }, []);

  const fetchSurahs = async () => {
    try {
      const res = await fetch('/api/surah');
      const data = await res.json();
      setSurahs(data.result || []);
    } catch (error) {
      console.error('Error fetching surahs:', error);
    }
  };

  const handleSurahChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const surahId = e.target.value;
    const selectedSurah = surahs.find(s => s.id === Number(surahId));
    
    setFormData({
      ...formData,
      surah_no: surahId,
      surah_name: selectedSurah?.name || ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('Video added successfully!');
        router.push('/admin/videos');
      } else {
        const error = await res.json();
        alert(`Failed to add video: ${error.msg || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Error adding video');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Button
        onClick={() => router.back()}
        variant="outline"
        className="mb-4 border-[#453142] text-[#453142]"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#453142]">
            Add New Video
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block font-medium mb-2 text-[#453142]">
                Video Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-[#453142]/20 rounded-md focus:ring-2 focus:ring-[#453142] focus:border-transparent"
                placeholder="Enter video title"
              />
            </div>

            {/* Surah Dropdown */}
            <div>
              <label className="block font-medium mb-2 text-[#453142]">
                Select Surah *
              </label>
              <select
                value={formData.surah_no}
                onChange={handleSurahChange}
                required
                className="w-full px-4 py-2 border border-[#453142]/20 rounded-md focus:ring-2 focus:ring-[#453142] focus:border-transparent"
              >
                <option value="">-- Select Surah --</option>
                {surahs.map((surah) => (
                  <option key={surah.id} value={surah.id}>
                    {surah.id}. {surah.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Starting & Ending Ayah */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2 text-[#453142]">
                  Starting Ayah *
                </label>
                <input
                  type="number"
                  value={formData.starting_ayah}
                  onChange={(e) => setFormData({ ...formData, starting_ayah: e.target.value })}
                  required
                  min="1"
                  className="w-full px-4 py-2 border border-[#453142]/20 rounded-md focus:ring-2 focus:ring-[#453142] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block font-medium mb-2 text-[#453142]">
                  Ending Ayah
                </label>
                <input
                  type="number"
                  value={formData.ending_ayah}
                  onChange={(e) => setFormData({ ...formData, ending_ayah: e.target.value })}
                  min="1"
                  className="w-full px-4 py-2 border border-[#453142]/20 rounded-md focus:ring-2 focus:ring-[#453142] focus:border-transparent"
                />
              </div>
            </div>

            {/* Time Start Ayah */}
            <div>
              <label className="block font-medium mb-2 text-[#453142]">
                Time Start (e.g., 1:23)
              </label>
              <input
                type="text"
                value={formData.time_start_ayah}
                onChange={(e) => setFormData({ ...formData, time_start_ayah: e.target.value })}
                className="w-full px-4 py-2 border border-[#453142]/20 rounded-md focus:ring-2 focus:ring-[#453142] focus:border-transparent"
                placeholder="1:23"
              />
            </div>

            {/* YouTube Link */}
            <div>
              <label className="block font-medium mb-2 text-[#453142]">
                YouTube Link *
              </label>
              <input
                type="url"
                value={formData.youTube_link}
                onChange={(e) => setFormData({ ...formData, youTube_link: e.target.value })}
                required
                className="w-full px-4 py-2 border border-[#453142]/20 rounded-md focus:ring-2 focus:ring-[#453142] focus:border-transparent"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            {/* Keywords */}
            <div>
              <label className="block font-medium mb-2 text-[#453142]">
                Keywords (comma separated)
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                className="w-full px-4 py-2 border border-[#453142]/20 rounded-md focus:ring-2 focus:ring-[#453142] focus:border-transparent"
                placeholder="quran, translation, tafsir"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-[#453142] hover:bg-[#5a3f54] text-[#faf9f7]"
              >
                {submitting ? 'Saving...' : 'Save Video'}
              </Button>
              <Button
                type="button"
                onClick={() => router.back()}
                variant="outline"
                className="flex-1 border-[#453142] text-[#453142]"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
